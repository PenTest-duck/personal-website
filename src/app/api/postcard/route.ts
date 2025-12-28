import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();

    if (!passcode) {
      return NextResponse.json(
        { error: "Passcode is required" },
        { status: 400 }
      );
    }

    const correctPasscode = process.env.POSTCARD_PASSCODE;
    const postcardUrl = process.env.POSTCARD_URL;

    if (!correctPasscode) {
      console.error("POSTCARD_PASSCODE environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (passcode !== correctPasscode) {
      return NextResponse.json(
        { error: "Incorrect passcode" },
        { status: 401 }
      );
    }

    if (!postcardUrl) {
      console.error("POSTCARD_URL environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: postcardUrl });
  } catch (error) {
    console.error("Error in postcard API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
