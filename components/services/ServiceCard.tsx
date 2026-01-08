import Link from "next/link";
import * as Icons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent =
    Icons[service.icon as keyof typeof Icons] || Icons.Briefcase;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary h-full flex flex-col">
      <CardHeader>
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          {/* @ts-ignore */}
          <IconComponent className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4 flex-1">{service.excerpt}</p>
        {service.pricing && (
          <p className="text-sm font-semibold text-primary mb-4">
            Цена: {service.pricing}
          </p>
        )}
        <Button asChild className="w-full">
          <Link href={`/uslugi/${service.slug.current}`}>
            Повече информация
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
