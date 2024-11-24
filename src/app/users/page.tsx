"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Eye, EyeOff, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RootState } from "@/store/store";
import { AppDispatch } from "@/store/store";
import {
  fetchUsers,
  fetchUserEmail,
  setEmailVisibility,
} from "@/store/features/userSlice";

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    users,
    loading,
    error,
    currentPage,
    totalPages,
    emailVisibility: emailStates,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    dispatch(fetchUsers(page));
  };

  const toggleEmailVisibility = async (userId: number) => {
    const currentState = emailStates[userId];

    // If we've already fetched the email, just toggle visibility
    if (currentState?.email) {
      dispatch(setEmailVisibility({ userId, visible: !currentState.visible }));
      return;
    }

    // Fetch email from API
    dispatch(fetchUserEmail(userId));
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8 min-h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto">
        <Card>
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
                          <TableCell className="font-medium">
                            {user.id}
                          </TableCell>
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

                <div className="mt-6 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1 || loading}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                  </Button>

                  <nav
                    role="navigation"
                    aria-label="pagination"
                    className="flex items-center gap-1"
                  >
                    {[1, 2].map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        disabled={loading}
                        className="h-8 w-8"
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </Button>
                    ))}
                  </nav>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages || loading}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
