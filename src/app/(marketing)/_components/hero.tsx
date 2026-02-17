import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleChevronRight, Target, BarChart3, Clock } from "lucide-react";
import AnimatedWrapper from "@/components/animated-wrapper";

export function Hero() {
  return (
    <section className="py-24 mt-20" id="hero">
      <div className="">
      <AnimatedWrapper delay={0.1}>
      <h1 className="text-2xl md:text-3xl font-semibold leading-none max-w-lg scroll-mt-20">
        One{" "}
        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 dark:bg-blue-500/10 rounded-lg align-middle mb-2">
          <Target className="dark:text-blue-600 text-white" size={20} />
        </span>{" "}
        source of truth for all your{" "}
        <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-500 dark:bg-emerald-500/10 rounded-lg align-middle mb-2">
          <BarChart3 className="dark:text-emerald-600 text-white" size={20} />
        </span>{" "}
        assignment deadlines{" "}
        <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-500 dark:bg-orange-500/10 rounded-lg align-middle mb-2">
          <Clock className="dark:text-orange-600 text-white" size={20} />
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
      <Button asChild className="mt-10 text-lg p-5 bg-foreground text-background hover:bg-secondary-foreground hover:text-background rounded-xl">
        <Link href="/auth/login">Get Started Free <CircleChevronRight strokeWidth={3} size={28}/></Link>
      </Button>
      </AnimatedWrapper>
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
    </section>
  );
}