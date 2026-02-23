import { ArrowUpRight, CircleCheck, CircleHelp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import AnimatedWrapper from "@/components/animated-wrapper";
import { PricingTable } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const tooltipContent = {
  reminders: "Smart reminders before deadlines so you don’t submit late.",
  priority: "Assignments are ranked so you always know what to do next.",
  parsing:
    "Paste a syllabus and Syllabye pulls out assignments, dates, and categories automatically.",
  dashboard: "One place for everything—no more bouncing between Canvas and Gradescope.",
};

const plans = [
  // {
  //   name: "Free",
  //   price: 0,
  //   description: "Start organized in minutes. Great for lighter course loads.",
  //   features: [
  //     { title: "Track up to 1 course" },
  //     { title: "Unlimited assignments" },
  //     { title: "Daily + weekly deadline view" },
  //     { title: "Unified dashboard", tooltip: tooltipContent.dashboard },
  //   ],
  // },
  {
    name: "Pro",
    price: 39,
    isRecommended: true,
    description: "Full deadline control. Unlimited assignments.",
    features: [
      { title: "Track 5 courses" },
      { title: "Unlimited assignments" },
      { title: "Syllabus parsing", tooltip: tooltipContent.parsing },
      { title: "Smart reminders", tooltip: tooltipContent.reminders },
      { title: "Priority sorting", tooltip: tooltipContent.priority },
      { title: "Unified dashboard", tooltip: tooltipContent.dashboard },
      { title: "Early access to new features" },
    ],
    isPopular: true,
  },
  // {
  //   name: "Pro+",
  //   price: 39,
  //   description:
  //     "For heavy course loads. More visibility, more automation, less stress.",
  //   features: [
  //     { title: "Everything in Pro, but better" },
  //     { title: "Track 10 courses" },
  //     { title: "Advanced priority insights", tooltip: tooltipContent.priority },
  //     { title: "More frequent reminders", tooltip: tooltipContent.reminders },
  //     { title: "Extra course organization tools" },
  //     { title: "Early access to new features" },
  //   ],
  // },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-background py-24">
      <AnimatedWrapper delay={0.1}>
      <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl mb-4">
        Pricing
      </h2>
      <p className="text-md md:text-lg text-paragraph mt-3 max-w-2xl mb-8">
        For the price of <span className="underline decoration-orange-500">lunch</span>? 🤔 Sign me up!
      </p>
      </AnimatedWrapper>
      {/* <AnimatedWrapper delay={0.3}>
      <div className="mx-auto mt-12 grid max-w-(--breakpoint-lg) grid-cols-1 items-center gap-8 sm:mt-16 lg:grid-cols-1 lg:gap-0">
        {plans.map((plan) => (
          <div
            className={cn("relative rounded-lg border bg-background p-6 px-8", {
              "z-1 overflow-hidden px-10 py-10 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.07)] lg:-mx-2":
                plan.isPopular,
            })}
            key={plan.name}
          > */}
            {/* {plan.isPopular && (
              <Badge className="absolute right-0 top-0 rounded-none rounded-bl-lg px-5 py-1 uppercase">
                Most Popular
              </Badge>
            )} */}

            {/* <h3 className="font-medium text-lg">{plan.name}</h3> */}
{/* 
            <p className="mt-2 font-semibold text-4xl">
              {`$${plan.price}`}
              {plan.price !== 0 && (
                <span className="ml-1.5 font-normal text-muted-foreground text-sm">
                  /4 years
                </span>
              )}
            </p>

            <p className="mt-4 text-muted-foreground text-sm">
              {plan.description}
            </p>
            <Separator className="my-8" />

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li className="flex items-start gap-1.5" key={feature.title}>
                  <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature.title}</span>

                  {feature.tooltip && (
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <CircleHelp className="mt-1 h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>{feature.tooltip}</TooltipContent>
                    </Tooltip>
                  )}
                </li>
              ))}
            </ul>

            <Button
              className="mt-6 w-full rounded-lg text-base"
              size="lg"
              variant={plan.isPopular ? "default" : "outline"}
            >
              {plan.price === 0 ? "Get Started Free" : "Upgrade"}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            
          </div>
        ))}
      </div>
      </AnimatedWrapper> */}
      
      {/* uses dark mode the pricing table */}
      <AnimatedWrapper delay={0.1} className="w-full">
      <PricingTable
        appearance={{
          baseTheme: dark,
        }}
      />
      </AnimatedWrapper>
      <AnimatedWrapper delay={0.4}>
      <p className="mt-4 text-xs text-muted-foreground max-w-xl">
        Cancel anytime. Your courses and assignments stay private.
      </p>
      </AnimatedWrapper>
    </section>
  );
};

export default Pricing;
