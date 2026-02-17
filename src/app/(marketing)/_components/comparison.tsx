import AnimatedWrapper from "@/components/animated-wrapper";

const rows = [
    {
      feature: "Assignment tracking",
      us: "✅ All assignments in one dashboard",
      them: "❌ Scattered on Canvas, Gradescope, etc.",
    },
    {
      feature: "Deadline visibility",
      us: "✅ See all due dates at a glance",
      them: "❌ Must check multiple platforms",
    },
    {
      feature: "Never miss a due date",
      us: "✅ Clear reminders and priority view",
      them: "❌ Easy to forget assignments",
    },
    {
      feature: "Multiple assignment types",
      us: "✅ Track homework, exams, projects, etc.",
      them: "❌ Limited to one platform at a time",
    },
    {
      feature: "Setup time",
      us: "✅ 2 minutes (paste syllabus)",
      them: "❌ Hours of manual entry across platforms",
    },
    {
      feature: "Daily priorities",
      us: "✅ See what's due today instantly",
      them: "❌ Manual checking of each platform",
    },
    {
      feature: "One source of truth",
      us: "✅ Unified dashboard for everything",
      them: "❌ Information spread everywhere",
    },
  ];
  
export default function ComparisonSection() {
return (
    <section id="comparison" className="py-24">
    <AnimatedWrapper delay={0.1}>
    <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl">
        One dashboard vs. checking everywhere
    </h2>
    </AnimatedWrapper>
    <AnimatedWrapper delay={0.2}>
    <p className="text-md md:text-lg text-paragraph mt-6 max-w-2xl">
        Stop switching between Canvas, Gradescope, your syllabus, and scattered reminders. 
        Get all your deadlines in one place and never miss an assignment again.
    </p>
    </AnimatedWrapper>  
    <div className="mt-10 overflow-hidden">
        <table className="w-full text-md">
        <thead className="">
            <tr>
            <th className="text-left py-4 font-medium">Feature</th>
            <th className="text-left py-4 font-medium">Syllabye</th>
            <th className="text-left py-4 font-medium">Traditional Tools</th>
            </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
            <tr key={row.feature} className="border-t">
                <td className="py-4">{row.feature}</td>
                <td className="py-4">{row.us}</td>
                <td className="py-4 text-gray-500">{row.them}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </section>
);
}
  
  