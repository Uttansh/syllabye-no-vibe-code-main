"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { X } from "lucide-react";

export function Navbar({
  bannerDismissed = false,
  onBannerDismiss,
}: {
  bannerDismissed?: boolean;
  onBannerDismiss?: () => void;
}) {
  const navLinks = [
    { href: "/#workflow", label: "Workflow" },
    { href: "/#comparison", label: "Why Us?" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-neutral-50 dark:bg-neutral-900 z-99 border-b border-neutral-200 dark:border-neutral-800">
      {!bannerDismissed && (
        <div className="flex items-center justify-center gap-2 text-lg text-center text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3 relative">
          <span>Now with <span className="font-semibold">Canvas</span> sync!</span>
          <button
            type="button"
            onClick={() => onBannerDismiss?.()}
            className="absolute right-2 p-1 rounded hover:bg-emerald-100/50 dark:hover:bg-emerald-500/20 transition-colors"
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
      <nav className="w-full max-w-5xl py-3 mx-auto px-4 lg:px-8 border-l border-r border-border">
        <div className="flex justify-between items-center px-4 lg:px-0">
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
          <Button asChild className="text-lg p-5 bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 hover:cursor-pointer rounded-md">
            <Link href="/sign-in">Log in</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button asChild className="text-lg p-5 bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 hover:cursor-pointer rounded-md">
            <Link href="/dashboard">My Dashboard</Link>
          </Button>
        </SignedIn>
        </div>
      </nav>
    </div>
  );
}