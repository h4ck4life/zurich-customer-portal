/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./header";
import { useSession } from "next-auth/react";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

// Mock shadcn components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children }: any) => <button>{children}</button>,
}));

vi.mock("@/components/ui/navigation-menu", () => ({
  NavigationMenu: ({ children }: any) => <nav>{children}</nav>,
  NavigationMenuList: ({ children }: any) => <ul>{children}</ul>,
  NavigationMenuItem: ({ children }: any) => <li>{children}</li>,
  NavigationMenuLink: ({ children }: any) => <a>{children}</a>,
  navigationMenuTriggerStyle: () => "mock-style",
}));

vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: any) => <div data-testid="sheet">{children}</div>,
  SheetTrigger: ({ children }: any) => (
    <div data-testid="sheet-trigger">{children}</div>
  ),
  SheetContent: ({ children }: any) => (
    <div data-testid="sheet-content">{children}</div>
  ),
  SheetHeader: ({ children }: any) => (
    <div data-testid="sheet-header">{children}</div>
  ),
  SheetTitle: ({ children }: any) => <h2>{children}</h2>,
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Menu: () => <span data-testid="menu-icon">Menu</span>,
}));

const navigationItems = ["Insurance", "Claims", "Portfolio"];

describe("Header", () => {
  it("should render sign in button when not authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<Header />);
    const signInButtons = screen.getAllByText("Sign In");
    expect(signInButtons).toHaveLength(2);
  });

  it("should render navigation and sign out when authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    } as any);

    render(<Header />);

    // Check for both desktop and mobile sign out buttons
    const signOutButtons = screen.getAllByText("Sign Out");
    expect(signOutButtons).toHaveLength(2);

    // Check navigation items
    navigationItems.forEach((item) => {
      const links = screen.getAllByText(item);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it("should render logo", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<Header />);
    expect(screen.getByText("Zurich Portal")).toBeDefined();
  });

  it("should render mobile menu when authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    } as any);

    render(<Header />);
    expect(screen.getByTestId("sheet")).toBeDefined();
    expect(screen.getByTestId("menu-icon")).toBeDefined();
  });

  it("should not render mobile menu when not authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
    } as any);

    render(<Header />);
    expect(screen.queryByTestId("sheet")).toBeNull();
    expect(screen.queryByTestId("menu-icon")).toBeNull();
  });

  it("should render correct navigation items", () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    } as any);

    render(<Header />);

    // Check desktop navigation
    const desktopNav = screen.getAllByRole("listitem");
    expect(desktopNav).toHaveLength(3);

    // Check mobile navigation links
    navigationItems.forEach((item) => {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    });

    // Verify order of navigation items in mobile menu
    const mobileContent = screen.getByTestId("sheet-content");
    navigationItems.forEach((item, index) => {
      const links = screen.getAllByText(item);
      expect(links.some((link) => mobileContent.contains(link))).toBe(true);
    });
  });
});
