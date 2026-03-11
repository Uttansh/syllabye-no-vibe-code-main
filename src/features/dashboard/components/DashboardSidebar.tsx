"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { Bug, LogOut, Menu, MessageCircle, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SignOutButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Sparkles, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { deleteCourse } from "@/features/courses/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface SidebarCourse {
  id: string;
  name: string;
  number: string;
  assignmentsLeft: number;
  hasDueSoon: boolean;
}

const REPORT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc6xVuObtT7KDZy8CnVYDIU4dgF7ifZcxD1JB0eS5pe0BnFZQ/viewform?usp=publish-editor";
const FEEDBACK_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdYlEqWw5wbMnqG9637jAtqtJPoDH-IkLoTFO-mTUKUVZmJjA/viewform?usp=publish-editor";

export default function DashboardSidebar({
  courses,
  showUpgradeButton = true,
}: {
  courses: SidebarCourse[];
  showUpgradeButton?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const pathname = usePathname();

  const sidebarContent = (
    //increase text size of headings and links in the sidebar
    <div className="flex flex-col bg-card rounded-md border-2 border-border h-full xl:h-auto w-full xl:ml-2 xl:my-2">
      {/* Header */}
      <div className="px-4 py-3 border-b-2 border-border">
        <Link
          href="/dashboard"
          className="text-2xl font-semibold hover:underline underline xl:no-underline"
          onClick={() => setMobileOpen(false)}
        >
          My Dashboard
        </Link>
      </div>
  
      {/* Scrollable Content */}
      <ScrollArea className="flex-1 min-h-0 px-3 py-3">
        {/* Courses */}
        <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide mb-1 mt-2 mx-2">
          My Courses
        </h3>
  
        <div className="flex flex-col gap-1">
          {courses.length === 0 ? (
            <p className="py-2 px-2 text-md text-muted-foreground">Add a course to get started!</p>
          ) : (
            courses.map((course) => {
              const isActive =
                pathname === `/courses/${course.id}` ||
                pathname.startsWith(`/courses/${course.id}/`);
              const deleteCourseWithId = deleteCourse.bind(null, course.id);
              return (
              <div
                key={course.id}
                className={cn(
                  "flex items-center w-full gap-2 rounded-md px-2 py-1 text-md transition-colors",
                  isActive
                    ? "bg-neutral-100 dark:bg-neutral-500/20"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-500/20"
                )}
              >
                <Link
                  href={`/courses/${course.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 min-w-0"
                >
                  <div className="flex items-center gap-2">
                  <span className="truncate max-w-35 block text-md" title={course.name}>
                    {course.name}
                  </span>
                  {course.hasDueSoon && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TriangleAlert className="size-4 text-yellow-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Assignment due within 24 hours
                      </TooltipContent>
                    </Tooltip>
                  )}
                  </div>
                  <span className="text-md text-muted-foreground">
                    {course.number}
                  </span>
                  
                </Link>

                <div className="flex items-center shrink-0 hover:bg-neutral-100 dark:hover:bg-neutral-500/30 transition-colors rounded-md">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/courses/${course.id}`} onClick={() => setMobileOpen(false)}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/courses/${course.id}/edit`} onClick={() => setMobileOpen(false)}>
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <form action={deleteCourseWithId}>
                        <button type="submit" className="w-full">
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </button>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
            })
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide mb-3 mt-2 mx-2">
            Quick Actions
          </h3>
  
          <div className="flex flex-col gap-2 mx-2">
            <Link href="/courses/new" onClick={() => setMobileOpen(false)}>
              <Button className="group w-full text-md px-3 py-2 rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/30 justify-between">
                <span className="mr-2 text-md">Add Course</span>
                <Plus size={18} className="transition-transform group-hover:rotate-90" />
              </Button>
            </Link>
  
            <Link target="_blank" href={FEEDBACK_URL} onClick={() => setMobileOpen(false)}>
              <Button className="group w-full text-md px-3 py-2 rounded-md bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30 justify-between">
                <span className="mr-2 text-md">Request Feature</span>
                <MessageCircle size={18} className="transition-transform group-hover:-rotate-90" />
              </Button>
            </Link>
  
            <Link target="_blank" href={REPORT_URL} onClick={() => setMobileOpen(false)}>
              <Button className="group w-full text-md px-3 py-2 rounded-md bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 justify-between">
                <span className="mr-2 text-md">Report Problem</span>
                <Bug size={18} className="transition-transform group-hover:-rotate-90" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Connect options with Canvas, Gradescope, and Ed */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide mb-1 mt-2 mx-2">
            Sync With
          </h3>

          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => {
                setComingSoonOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between rounded-md py-1 px-2 text-md hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition cursor-pointer w-full text-left"
            >
              <span>Canvas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setComingSoonOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between rounded-md py-1 px-2 text-md hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition cursor-pointer w-full text-left"
            >
              <span>Gradescope</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setComingSoonOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between rounded-md py-1 px-2 text-md hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition cursor-pointer w-full text-left"
            >
              <span>Brightspace</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide mb-1 mt-2 mx-2">
            Remind me via
          </h3>

          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => {
                setComingSoonOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between rounded-md py-1 px-2 text-md hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition cursor-pointer w-full text-left"
            >
              <span>Email</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setComingSoonOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between rounded-md py-1 px-2 text-md hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition cursor-pointer w-full text-left"
            >
              <span>Text</span>
            </button>

            {/* <button
              type="button"
              onClick={() => {
                setComingSoonOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between rounded-md py-1 px-2 text-md hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition cursor-pointer w-full text-left"
            >
              <span>Telegram</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setComingSoonOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between rounded-md py-1 px-2 text-md hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition cursor-pointer w-full text-left"
            >
              <span>WhatsApp</span>
            </button> */}
          </div>
        </div>
      </ScrollArea>
      {/* Bottom Profile */}
      <div className="flex flex-col gap-2 px-5 py-4">
        
        <SignedIn>
          {showUpgradeButton && (
            <CheckoutButton
              planId="cplan_3A0uQKXN5ZI5Do2dUfSnmEtnULK"
              planPeriod="annual"
              newSubscriptionRedirectUrl="/dashboard"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between text-md w-full px-3 py-2 rounded-md bg-violet-100 text-violet-800 hover:bg-violet-200 dark:bg-violet-500/20 dark:text-violet-400 dark:hover:bg-violet-500/30 transition-colors"
              >
                <span>Upgrade</span>
                <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
              </button>
            </CheckoutButton>
          )}
        </SignedIn>
        <SignOutButton>
          <Button className="text-md w-full px-3 py-2 rounded-md bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 justify-between">
            Logout
            <LogOut size={18} />
          </Button>
        </SignOutButton>
      </div>
      <div className="border-t-2 border-border py-2 px-4">
        <div className="flex justify-between items-center gap-3 rounded-md px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-500/20 transition-colors">
        <UserButton
          appearance={{
            baseTheme: dark,
            elements: {
              userButtonTrigger:
                "rounded-md focus:outline-none focus:ring-0 w-full px-2 py-2",
              userButtonBox: "flex flex-row items focus:outline-none focus:ring-0 w-full",
              userButtonAvatarBox: "order-first",
              userButtonOuterIdentifier: "order-last text-sm font-medium text-foreground",
            },
          }}
          afterSignOutUrl="/"
          showName
        />
        </div>
      </div>
  
    </div>
  );

  return (
    <>
      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription>
              Feature is coming soon! Request a feature{" "}
              <Link
                href={FEEDBACK_URL}
                target="_blank"
                className="underline hover:no-underline"
              >
                here
              </Link>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setComingSoonOpen(false)}>Got it</Button>
        </DialogContent>
      </Dialog>

      {/* Desktop: sidebar in flex flow (xl only) */}
      <div className="hidden xl:flex w-full xl:min-w-0 h-screen">
        {sidebarContent}
      </div>

      {/* Mobile (below xl) */}

<div className="xl:hidden">
  {/* Hamburger */}
  <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
    <Button
      size="icon"
      onClick={() => setMobileOpen(true)}
      className="rounded-md border-2 border-border bg-neutral-100 dark:bg-neutral-500/20 text-neutral-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-500/30"
    >
      <Menu size={22} />
    </Button>
    <h1 className="text-2xl font-semibold ml-2">Syllabye 👋</h1>
  </div>


  {/* Overlay */}
  {mobileOpen && (
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setMobileOpen(false)}
    />
  )}

  {/* Sliding Sidebar */}
  <aside
    className={cn(
      "fixed top-0 left-0 z-50 h-full w-[280px] p-4 transition-transform duration-300",
      mobileOpen ? "translate-x-0" : "-translate-x-full"
    )}
  >
    {/* Close button */}
    <div className="absolute right-5 top-5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(false)}
      >
        <X size={22} />
      </Button>
    </div>

    {sidebarContent}
  </aside>
</div>
    </>
  );
}
