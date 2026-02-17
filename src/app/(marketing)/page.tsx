import { Hero } from "./_components/hero";
import WorkflowSection from "./_components/workflow";
import ComparisonSection from "./_components/comparison";
import FAQSection from "./_components/faq";
import Footer from "./_components/footer";
import { Navbar } from "./_components/navbar";
import PricingSection from "./_components/pricing";

export default function Home() { 
  return (
  <div className="max-w-4xl mx-auto">
    <Navbar />
    <Hero />
    <hr />
    <WorkflowSection />
    <hr />
    <ComparisonSection />
    <hr />
    <FAQSection />
    <hr />
    <PricingSection />
    <hr />
    <Footer />
  </div>
  );

}



