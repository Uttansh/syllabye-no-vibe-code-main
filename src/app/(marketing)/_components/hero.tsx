import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleChevronRight, Target, BarChart3, Clock } from "lucide-react";
import AnimatedWrapper from "@/components/animated-wrapper";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import AnimatedLogoCloud from "./logoCloud";
export function Hero() {
  return (
    <section className="py-24" id="hero">
      <div className="mx-auto">
      <AnimatedWrapper delay={0.1}>
      <h1 className="text-2xl md:text-3xl font-semibold leading-none max-w-lg scroll-mt-20">
        One{" "}
        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg align-middle mb-2">
          <Target className="dark:text-blue-400  text-blue-500" size={20} />
        </span>{" "}
        source of truth for all your{" "}
        <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg align-middle mb-2">
          <BarChart3 className="dark:text-emerald-400 text-emerald-500" size={20} />
        </span>{" "}
        assignment deadlines{" "}
        <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-lg align-middle mb-2">
          <Clock className="dark:text-orange-400 text-orange-500" size={20} />
        </span>{" "}
        so you never miss a due date
      </h1>
      </AnimatedWrapper>
      <AnimatedWrapper delay={0.2}>
      <p className="text-md md:text-lg text-paragraph mt-6 max-w-2xl">
        Stop juggling Canvas, Gradescope, your syllabus, and scattered reminders. 
        Track every assignment — homework, projects, exams, labs — in one unified 
        dashboard. Never miss a deadline again.
      </p>
      </AnimatedWrapper>
      <AnimatedWrapper delay={0.3}>
      <SignedOut>
      <Button asChild className="mt-10 text-lg p-5 bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 hover:cursor-pointer rounded-md">
        <Link href="/sign-in">
          Get Started Free <CircleChevronRight strokeWidth={3} size={28}/>
        </Link>
      </Button>
      </SignedOut>
      <SignedIn>
      <Button asChild className="mt-10 text-lg p-5 bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 hover:cursor-pointer rounded-md">
        <Link href="/dashboard">
          Go To Dashboard <CircleChevronRight strokeWidth={3} size={28}/>
        </Link>
      </Button>
      </SignedIn>
      </AnimatedWrapper>
      <AnimatedLogoCloud className="mt-15"/>
      </div>
    
      {/* <div className="relative w-full mt-30 flex justify-center shadow-[0_0.5_250px_rgba(255,255,255,0.10)]"> */}
        {/* Light mode image */}
        {/* <Image
          src="/images/image.png"
          alt="dashboard-image"
          width={840}
          height={600}
          className="w-full max-w-4xl h-auto block dark:hidden"
        /> */}

        {/* Dark mode image */}
        {/* <Image
          src="/images/image.png"
          alt="dashboard-image-dark"
          width={840}
          height={600}
          className="w-full max-w-4xl h-auto hidden dark:block"
        /> */}
      {/* </div> */}


      
      {/* <div className="mt-6 flex gap-4">
        <div className="w-1 bg-accent rounded-full flex-shrink-0"></div>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 py-2">
          Whether it's a Canvas quiz, Gradescope homework, or a project from your syllabus, 
          everything syncs to one place. See what's due today, this week, and what's coming up — 
          all without switching between platforms.
        </p>
      </div> */}
      {/* <AnimatedWrapper delay={0.4}>
      <div className="mt-14 w-full hidden md:block">
        <HeroAssignmentsDemo />
      </div>
      </AnimatedWrapper> */}
    </section>
  );
}