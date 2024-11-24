"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserList from "@/components/users-list";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/users");
    }
  }, [status, router]);

  // Show loading state
  if (status === "loading") {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Show unauthorized message
  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertDescription>Please sign in to view this page</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/auth/signin")}>
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Show user list for authenticated users
  return <UserList />;
}
