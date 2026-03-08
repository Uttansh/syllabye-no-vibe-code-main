import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
export function Navbar() {
  const navLinks = [
    { href: "/#workflow", label: "Workflow" },
    { href: "/#comparison", label: "Why Us?" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <nav className="w-full max-w-4xl py-3 mx-auto">
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
        <SignedOut>
          <Button asChild className="text-lg p-5 bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 hover:cursor-pointer rounded-xl">
            <Link href="/sign-in">Log in</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button asChild className="text-lg p-5 bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 hover:cursor-pointer rounded-xl">
            <Link href="/dashboard">My Dashboard</Link>
          </Button>
        </SignedIn>
        </div>
      </nav>
    </div>
  );
}