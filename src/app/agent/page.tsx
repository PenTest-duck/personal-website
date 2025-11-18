"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function AgentPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello, I'm a personal assistant for Chris. Ask me what I can do for you!",
            state: "done",
          },
        ],
      },
    ],
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = status === "submitted";

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput("");
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "auto",
      });
    })();
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto w-full mb-4">
      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
        <div className="space-y-6 pb-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-center space-y-2">
                <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold">
                  How can I help you today?
                </h2>
                <p className="text-muted-foreground">
                  Start a conversation to get started.
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => {
            // @ts-ignore
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-4 items-start",
                  isUser ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage
                    src={isUser ? undefined : "/images/pfp-pixelated.png"}
                  />
                  <AvatarFallback
                    className={cn(
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isUser ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>

                {/* Message Content */}
                <div
                  className={cn(
                    "flex flex-col gap-2 max-w-[80%]",
                    isUser ? "items-end" : "items-start"
                  )}
                >
                  <Card
                    className={cn(
                      "rounded-2xl shadow-sm",
                      isUser
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="whitespace-pre-wrap break-words">
                        {message.parts.map((part, i) => {
                          if (part.type === "text") {
                            return (
                              <div
                                key={`${message.id}-${i}`}
                                className="text-sm leading-relaxed"
                              >
                                {part.text}
                              </div>
                            );
                            // @ts-ignore
                          } else if (part.type.startsWith("tool-")) {
                            // @ts-ignore
                            const toolName = part.type.split("-")[1];
                            switch (toolName) {
                              case "bookMeeting":
                                return (
                                  <div
                                    key={`${message.id}-${i}`}
                                    className="text-sm leading-relaxed flex flex-col gap-2"
                                  >
                                    <Button
                                      className="max-w-fit"
                                      data-cal-link="chris-yoo-nieet9/15min"
                                      data-cal-config='{"theme":"auto"}'
                                    >
                                      Book 15 minutes
                                    </Button>
                                    <Button
                                      className="max-w-fit"
                                      data-cal-link="chris-yoo-nieet9/30min"
                                      data-cal-config='{"theme":"auto"}'
                                    >
                                      Book 30 minutes
                                    </Button>
                                    {/* <Cal
                                      calLink="chris-yoo-nieet9/30min"
                                      config={{
                                        theme: "auto",
                                      }}
                                    /> */}
                                  </div>
                                );
                            }
                            return (
                              <div
                                key={`${message.id}-${i}`}
                                className="text-sm leading-relaxed"
                              >
                                Called tool {toolName}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-4 items-start">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <Card className="rounded-2xl shadow-sm bg-muted text-muted-foreground border-border">
                  <CardContent className="p-4">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="flex flex-col gap-2 items-center">
        <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  placeholder="Type your message..."
                  onChange={(e) => setInput(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  disabled={isLoading}
                  className="pr-12 min-h-[52px] resize-none"
                />
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-[52px] w-[52px] shrink-0"
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
        <p className="text-sm text-muted-foreground">
          Your conversations are private.
        </p>
      </div>
    </div>
  );
}
