import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedWrapper from "@/components/animated-wrapper";

const faqs = [
  {
    question: "Can I track assignments from Canvas, Gradescope, and other platforms?",
    answer:
      "Yes! Whether your assignments are on Canvas, Gradescope, in your syllabus, or anywhere else, you can add them all to Syllabye. Paste your syllabus to automatically extract deadlines, or manually add assignments from any source. Everything syncs to one unified dashboard.",
  },
  {
    question: "How do I make sure I never miss a deadline?",
    answer:
      "Syllabye shows you all assignments due today, this week, and what's coming up — all in one place. You can see deadlines across all your courses at a glance, so you don't have to check multiple platforms. Set up reminders to get notified before assignments are due.",
  },
  {
    question: "What types of assignments can I track?",
    answer:
      "You can track any type of assignment: homework, projects, exams, quizzes, labs, presentations, papers, and more. If it has a due date, you can add it to Syllabye and see it alongside all your other deadlines.",
  },
  {
    question: "Can I track multiple courses at once?",
    answer:
      "Yes! Add as many courses as you need. Each course maintains its own assignments and deadlines, but you can see everything in one unified dashboard. No more switching between Canvas for one class and Gradescope for another.",
  },
  {
    question: "How does the syllabus parsing work?",
    answer:
      "Simply paste your syllabus text or upload a PDF. Our AI extracts assignment deadlines, grading categories, weights, and policies like late penalties automatically. You can review and edit anything before it's finalized, and add additional assignments from other sources.",
  },
  {
    question: "What if I have assignments that aren't in my syllabus?",
    answer:
      "No problem! You can manually add assignments from Canvas, Gradescope, or any other source. Syllabye is your one source of truth — combine assignments from your syllabus with assignments from other platforms in one place.",
  },
  {
    question: "Is my course data private?",
    answer:
      "Absolutely. Your courses, assignments, grades, and syllabi are private to your account. We never share your academic data with anyone.",
  },
];


export default function FAQSection() {
return (
  <section id="faq" className="py-24">
  <AnimatedWrapper delay={0.1}>
  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
      Frequently Asked Questions
  </h2>
  </AnimatedWrapper>
  <AnimatedWrapper delay={0.2}>
  <p className="text-md md:text-lg text-paragraph mb-10">
      Everything you need to know about managing your courses and grades.
  </p>
  </AnimatedWrapper>
  <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
      <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-md">
          {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-md text-gray-400">
          {faq.answer}
          </AccordionContent>
      </AccordionItem>
      ))}
  </Accordion>
  </section>
);
}