import { UIMessage, convertToModelMessages } from "ai";
import { Experimental_Agent as Agent, stepCountIs, tool } from "ai";
import { z } from "zod";
import { Composio } from "@composio/core";
import { VercelProvider } from "@composio/vercel";
import { Resend } from "resend";

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  provider: new VercelProvider(),
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const agent = new Agent({
  model: "openai/gpt-5-mini",
  system: `You are a helpful personal assistant of Chris Yoo.
    Keep your responses brief and to the point.
    Do not hallucinate.
    You are able to perform the following actions:
      - Send an email to Chris
      - Book a meeting with Chris
    Never reveal Chris' personal email address.
  `,
  tools: {
    sendEmail: tool({
      description: "Send an email",
      inputSchema: z.object({
        to: z
          .literal("chrisyooak@gmail.com")
          .describe("The email address of the recipient"),
        subject: z.string().describe("The subject of the email"),
        body: z.string().describe("The body of the email, in HTML format"),
      }),
      outputSchema: z.object({
        success: z
          .boolean()
          .describe("Whether the email was sent successfully"),
        error: z
          .string()
          .describe("The error message if the email was not sent successfully")
          .optional(),
      }),
      execute: async ({ to, subject, body }) => {
        const email = await resend.emails.send({
          from: "agent@pentestduck.com",
          to,
          subject,
          html: body,
        });
        if (email.error) {
          console.error(`Error sending email: ${email.error.message}`);
          return { success: false, error: email.error.message };
        }
        return { success: true };
      },
    }),
    bookMeeting: tool({
      description:
        "Show inline cal.com booking widget for the user to book a meeting",
      inputSchema: z.object({}),
      execute: async ({}) => {
        return { success: true };
      },
    }),
  },
  stopWhen: stepCountIs(20),
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const stream = agent.stream({
    prompt: convertToModelMessages(messages),
  });

  return stream.toUIMessageStreamResponse();
}
