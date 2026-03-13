import { cn } from "@/lib/utils";
import Image from "next/image";

const logos = [
  { name: "Canvas", url: "/images/canvas.svg", width: 120, height: 40, className: "h-10 w-auto" },
  { name: "Gradescope", url: "/images/gradescope.svg", width: 120, height: 40, className: "mt-1 h-9 w-auto" },
  { name: "Google Classroom", url: "/images/classroom1.png", width: 1280, height: 172, className: "mt-1 h-8 w-auto auto" },
  { name: "Piazza", url: "/images/piazza.png", width: 120, height: 40, className: "-mt-9 h-30 w-auto" },
  { name: "Brightspace", url: "/images/brightspace2.png", width: 120, height: 40, className: " h-10 w-auto" },
];

export default function AnimatedLogoCloud({ className }: { className?: string }) {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className={cn("w-full pt-6", className)}>
      <div className="mx-auto w-full px-4 md:px-6">
        <div
          className="relative mt-6 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <div className="flex w-max shrink-0 gap-14 animate-logo-cloud will-change-transform">
            {duplicatedLogos.map((logo, idx) => (
              <Image
                key={`${logo.name}-${idx}`}
                src={logo.url}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={`${logo.className} shrink-0 brightness-0 dark:invert grayscale opacity-70`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
