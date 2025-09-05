"use client";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useCallback } from "react";

export default function TiltLink({
  href,
  children,
  radius = 0.6,
}: {
  href: string;
  children: React.ReactNode;
  radius?: number;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const s  = useMotionValue(1);

  const rotateX = useTransform(rx, [-1, 1], [8 * radius, -8 * radius]); 
  const rotateY = useTransform(ry, [-1, 1], [-10 * radius, 10 * radius]);
  const scale   = useTransform(s, [1, 1.02], [1, 1.02]);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; 
    const py = (e.clientY - r.top) / r.height; 
    ry.set(px * 2 - 1); 
    rx.set(py * 2 - 1);
  }, [rx, ry]);

  const onLeave = useCallback(() => {
    rx.set(0); ry.set(0); s.set(1);
  }, [rx, ry, s]);

  const onEnter = useCallback(() => {
    s.set(1.02);
  }, [s]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      className="block will-change-transform"
    >
      {children}
    </motion.a>
  );
}
