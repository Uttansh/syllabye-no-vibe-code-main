import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const sections = [
  {
    title: "Company",
    links: [
      { title: "About", href: "/#about" },
      { title: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { title: "Docs", href: "/#docs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/#privacy" },
      { title: "Terms of Service", href: "/#terms" },
      { title: "Cookie Policy", href: "/#cookies" },
      { title: "Security", href: "/#security" },
      { title: "Licenses", href: "/#licenses" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-background pt-24 pb-12">
      <div className="mx-auto max-w-screen-xl">
        <div className="">
          <div className="flex justify-between gap-12">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-2xl font-semibold">
                Syllabye
              </Link>
              <p className="text-muted-foreground mt-1.5">
                Start optimizing today!
              </p>
            </div>
            {sections.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-lg font-semibold">{title}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-6 pt-6 pb-4 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-sm font-medium">
            &copy; {new Date().getFullYear()} Syllabye. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;