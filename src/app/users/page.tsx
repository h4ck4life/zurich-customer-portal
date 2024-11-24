"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

interface EmailState {
  [key: number]: {
    email: string;
    loading: boolean;
    visible: boolean;
  };
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailStates, setEmailStates] = useState<EmailState>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users?page=${page}`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: ApiResponse = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
      setCurrentPage(data.page);

      // Reset email states for new page
      setEmailStates({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const toggleEmailVisibility = async (userId: number) => {
    const currentState = emailStates[userId];

    // If we've already fetched the email, just toggle visibility
    if (currentState?.email) {
      setEmailStates((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          visible: !prev[userId].visible,
        },
      }));
      return;
    }

    // Fetch email from API
    try {
      setEmailStates((prev) => ({
        ...prev,
        [userId]: {
          email: "",
          loading: true,
          visible: true,
        },
      }));

      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch email");

      const data = await response.json();

      setEmailStates((prev) => ({
        ...prev,
        [userId]: {
          email: data.email,
          loading: false,
          visible: true,
        },
      }));
    } catch (err) {
      console.error("Error fetching email:", err);
      setEmailStates((prev) => ({
        ...prev,
        [userId]: {
          email: "Error loading email",
          loading: false,
          visible: true,
        },
      }));
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Users List</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>
                        {emailStates[user.id]?.loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading...
                          </div>
                        ) : emailStates[user.id]?.visible ? (
                          emailStates[user.id]?.email
                        ) : (
                          user.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleEmailVisibility(user.id)}
                          disabled={emailStates[user.id]?.loading}
                        >
                          {emailStates[user.id]?.visible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => fetchUsers(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {[1, 2].map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => fetchUsers(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => fetchUsers(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
