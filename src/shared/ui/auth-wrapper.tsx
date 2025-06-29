import { type PropsWithChildren } from "react";

import Link from "next/link";

import {
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
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {isShowSocial && <div>Social</div>}
      <CardContent>{children}</CardContent>
      <CardFooter>
        {backButtonLabel && (
          <Button variant="outline" asChild className="w-full font-normal">
            <Link href={backButtonHref ?? "/"}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}