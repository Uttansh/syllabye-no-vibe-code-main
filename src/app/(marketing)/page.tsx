import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Hero } from "./_components/hero";
import WorkflowSection from "./_components/workflow";
import ComparisonSection from "./_components/comparison";
import FAQSection from "./_components/faq";
import Footer from "./_components/footer";
import { MarketingLayout } from "./_components/MarketingLayout";
import PricingSection from "./_components/pricing";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <MarketingLayout>
      <Hero />
      <hr className="-mx-8 lg:-mx-8" />
      <WorkflowSection />
      <hr className="-mx-8 lg:-mx-8" />
      <ComparisonSection />
      <hr className="-mx-8 lg:-mx-8" />
      <FAQSection />
      <hr className="-mx-8 lg:-mx-8" />
      <PricingSection />
      <hr className="-mx-8 lg:-mx-8" />
      <Footer />
    </MarketingLayout>
  );
}



