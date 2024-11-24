"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideLogIn } from "lucide-react";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/users";

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-md px-4">
        <Card className="w-full">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your Zurich portal account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full py-6 text-base"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <LucideLogIn className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Need help?{" "}
          <a
            href="#"
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}