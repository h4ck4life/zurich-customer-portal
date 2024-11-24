"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navigationLinks = [
  { href: "/#", label: "Insurance" },
  { href: "/#", label: "Claims" },
  { href: "/#", label: "Portfolio" },
];

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Zurich Portal
          </Link>
        </div>

        {/* Desktop Navigation - Only shown when authenticated */}
        {session && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <Button variant="outline" asChild>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/api/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu - Only shown when authenticated */}
        {session && (
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Zurich Portal</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/api/auth/signout">Sign Out</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        {/* Mobile Sign In Button - Only shown when not authenticated */}
        {!session && (
          <div className="md:hidden">
            <Button variant="outline" asChild>
              <Link href="/api/auth/signin">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
