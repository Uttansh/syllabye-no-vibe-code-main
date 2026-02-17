import { FileText, Clock, Target, Calculator } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import AnimatedWrapper from "@/components/animated-wrapper";

export default function WorkflowSection() {
  return (
    <section className="py-24 scroll-mt-20" id="workflow">
      <AnimatedWrapper delay={0.1}> <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl">
        Track every assignment in one place
      </h2>
      </AnimatedWrapper>
      <AnimatedWrapper delay={0.2}>
      <p className="text-md md:text-lg text-paragraph mt-6 max-w-2xl">
        No more switching between Canvas, Gradescope, and your syllabus. All your assignments, 
        deadlines, and due dates sync to one dashboard — so you always know what's coming up.
      </p>
      </AnimatedWrapper>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-10">
        <AnimatedWrapper delay={0.1}>
        <Feature
          icon={<FileText />}
          title="All Assignment Types"
          text="Track homework, projects, exams, quizzes, labs, and more — from any platform or source."
        />
        </AnimatedWrapper>
        <AnimatedWrapper delay={0.2}>
        <Feature
          icon={<Clock />}
          title="Never Miss a Deadline"
          text="See what's due today, this week, and what's coming up. Get reminders before it's too late."
        />
        </AnimatedWrapper>
        <AnimatedWrapper delay={0.3}>
        <Feature
          icon={<Target />}
          title="One Source of Truth"
          text="Stop checking multiple platforms. Everything syncs to one unified dashboard."
        />
        </AnimatedWrapper>
        <AnimatedWrapper delay={0.4}>
        <Feature
          icon={<Calculator />}
          title="Smart Organization"
          text="Automatically organized by course with clear due dates and priority indicators."
        />
        </AnimatedWrapper>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="space-y-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-300/10 text-paragraph ">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-paragraph">{text}</p>
    </div>
  );
}
