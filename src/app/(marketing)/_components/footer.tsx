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
    <footer className="bg-background pt-20 pb-12 border-t">
  <div className="mx-auto max-w-6xl">
    
    {/* Top Section */}
    <div className="grid gap-12 md:grid-cols-4">
      
      {/* Brand */}
      <div className="space-y-3">
        <Link
          href="/"
          className="text-xl md:text-2xl font-semibold"
        >
          Syllabye
        </Link>
        <p className="text-muted-foreground text-sm">
          Start optimizing today!
        </p>
      </div>

      {/* Links */}
      {sections.map(({ title, links }) => (
        <div key={title}>
          <h3 className="text-base font-semibold mb-3">
            {title}
          </h3>
          <ul className="space-y-2">
            {links.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </div>

    {/* Bottom Section */}
    <div className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-muted-foreground text-xs sm:text-sm">
        © {new Date().getFullYear()} Syllabye. All rights reserved.
      </p>
    </div>

  </div>
</footer>
  );
};

export default Footer;