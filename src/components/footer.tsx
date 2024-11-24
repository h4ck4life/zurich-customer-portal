import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/40">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Zurich Insurance</h4>
            <p className="text-sm text-muted-foreground">
              Protecting what matters most
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Life Insurance</li>
              <li>Home Insurance</li>
              <li>Car Insurance</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zurich Insurance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
