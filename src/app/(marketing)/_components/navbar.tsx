import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const navLinks = [
    { href: "/#workflow", label: "Workflow" },
    { href: "/#comparison", label: "Why Us?" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 dark:bg-background/50 bg-muted/10 backdrop-blur-md border-b">
      <nav className="w-full max-w-4xl mx-auto py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Syllabye 👋</h1>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-base font-medium transition-colors dark:hover:bg-muted rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        {/* <Button asChild className="text-lg p-5 bg-foreground text-background hover:bg-secondary-foreground hover:text-background rounded-xl">
            <Link href="/auth/login">Log in</Link>
        </Button> */}
        <Button asChild className="text-lg p-5 bg-foreground hover:cursor-pointer text-background hover:bg-secondary-foreground hover:text-background rounded-xl">
          <Link href="/sign-in">Log in</Link>
        </Button>
        </div>
      </nav>
    </div>
  );
}