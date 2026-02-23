"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;    // ✅ time before animation starts
  onView?: boolean;
}

export default function AnimatedWrapper({
  children,
  className,
  delay = 0,
  onView = true,
  ...props
}: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={onView ? undefined : { opacity: 1, y: 0 }}
      whileInView={onView ? { opacity: 1, y: 0 } : undefined}
      viewport={onView ? { once: true, amount: 0.2 } : undefined}
      transition={{
        duration: 0.5,  // ✅ constant animation speed
        delay,          // ✅ true start delay
        ease: "easeOut",
      }}
      // transition={{
      //   type: "spring",
      //   damping: 6,
      //   mass: 0.5,
      //   bounce: 0.6,
      //   delay
      // }}      
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
