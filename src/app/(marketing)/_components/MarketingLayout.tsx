"use client";

import { useState } from "react";
import { Navbar } from "./navbar";

export function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Navbar
        bannerDismissed={bannerDismissed}
        onBannerDismiss={() => setBannerDismissed(true)}
      />
      <main
        className={`max-w-5xl mx-auto px-4 lg:px-8 border-l border-r border-border transition-[padding] duration-200 ${
          bannerDismissed ? "pt-14" : "pt-28"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
