import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";

// Mock the Separator component
vi.mock("@/components/ui/separator", () => ({
  Separator: () => <hr data-testid="separator" />,
}));

describe("Footer", () => {
  it("renders company section correctly", () => {
    render(<Footer />);
    expect(
      screen.getByRole("heading", { name: "Zurich Insurance" })
    ).toBeDefined();
    expect(screen.getByText("Protecting what matters most")).toBeDefined();
  });

  it("renders Quick Links section correctly", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "Quick Links" })).toBeDefined();
    expect(screen.getByText("About Us")).toBeDefined();
    expect(screen.getByText("Contact")).toBeDefined();
    expect(screen.getByText("Careers")).toBeDefined();
  });

  it("renders Products section correctly", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "Products" })).toBeDefined();
    expect(screen.getByText("Life Insurance")).toBeDefined();
    expect(screen.getByText("Home Insurance")).toBeDefined();
    expect(screen.getByText("Car Insurance")).toBeDefined();
  });

  it("renders Legal section correctly", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "Legal" })).toBeDefined();
    expect(screen.getByText("Privacy Policy")).toBeDefined();
    expect(screen.getByText("Terms of Service")).toBeDefined();
    expect(screen.getByText("Cookie Policy")).toBeDefined();
  });

  it("renders separator", () => {
    render(<Footer />);
    expect(screen.getByTestId("separator")).toBeDefined();
  });

  it("renders copyright text with current year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 1));

    render(<Footer />);
    expect(
      screen.getByText("© 2024 Zurich Insurance. All rights reserved.")
    ).toBeDefined();

    vi.useRealTimers();
  });

  it("renders footer with correct structure", () => {
    const { container } = render(<Footer />);

    // Check main container
    const footerElement = container.querySelector("footer");
    expect(footerElement).toBeDefined();
    expect(footerElement?.classList.contains("w-full")).toBe(true);
    expect(footerElement?.classList.contains("border-t")).toBe(true);

    // Check grid layout
    const gridContainer = container.querySelector("div.grid");
    expect(gridContainer?.classList.contains("grid-cols-1")).toBe(true);
    expect(gridContainer?.classList.contains("md:grid-cols-4")).toBe(true);
  });
});
