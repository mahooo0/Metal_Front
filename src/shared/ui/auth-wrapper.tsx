import { type PropsWithChildren } from "react";

import Link from "next/link";

import {
  AuthSocials,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";

import { cn } from "../lib/utils";

type AuthWrapperProps = {
  className?: string;
  heading?: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  isShowSocial?: boolean;
};

export function AuthWrapper({
  children,
  heading,
  description,
  backButtonLabel,
  backButtonHref,
  isShowSocial = false,
  className,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <Card className={cn(" border-none shadow-none shrink-0", className)}>
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isShowSocial && <AuthSocials />}
        {children}
      </CardContent>
      <CardFooter>
        {backButtonLabel && (
          <Button variant="link" asChild className="w-full font-normal">
            <Link href={backButtonHref ?? "/"}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
