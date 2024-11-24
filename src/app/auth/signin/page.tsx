"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/users";

  return (
    <div className="container mx-auto py-8 min-h-[calc(100vh-8rem)]">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => signIn("google", { callbackUrl })}
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
