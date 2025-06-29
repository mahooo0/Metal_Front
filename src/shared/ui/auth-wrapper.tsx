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

type AuthWrapperProps = {
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
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <Card className="w-[400px] shrink-0">
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
