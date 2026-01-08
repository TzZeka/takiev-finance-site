import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  _key: string;
  icon: string;
  title: string;
  description: string;
}

interface MessagesSectionProps {
  messages: Message[];
}

export function MessagesSection({ messages }: MessagesSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Защо да изберете нас?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Нашият екип се отличава с професионализъм, иновативност и грижа към
            всеки клиент
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {messages.map((message) => {
            const IconComponent =
              Icons[message.icon as keyof typeof Icons] || Icons.CheckCircle;
            return (
              <Card
                key={message._key}
                className="border-2 hover:border-primary transition-colors duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {/* @ts-ignore */}
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-dark mb-3">
                      {message.title}
                    </h3>
                    <p className="text-muted-foreground">{message.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
