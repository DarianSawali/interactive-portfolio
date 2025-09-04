"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

type Props = {
  style?: React.CSSProperties;
  text?: string;
  image?: string;
  containerRef: React.RefObject<HTMLDivElement>;
};

const transition: Transition = { type: "spring", stiffness: 420, damping: 36 };

function DraggableChip({ style, text, image, containerRef }: Props) {
  const common = {
    drag: true,
    dragConstraints: containerRef,
    dragElastic: 0.15,
    dragMomentum: true,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition,
    style: {
      ...style,
      willChange: "transform",
      touchAction: "none",
    } as React.CSSProperties,
    className:
      "absolute cursor-grab active:cursor-grabbing select-none transform-gpu ",
  };

  if (image && !text) {
    return (
      <motion.img
        src={image}
        alt=""
        {...common}
        className={`${common.className} w-20 sm:w-20 md:w-24 lg:w-28`}
      />
    );
  }

  return (
    <motion.div
      {...common}
      className={`${common.className} px-3 py-2 md:px-4 md:py-3 rounded-full ring-1 ring-white/10 text-sm md:text-base font-light bg-white/5 backdrop-blur-md shadow-lg text-white whitespace-nowrap`}
    >
      {text}
    </motion.div>
  );
}

export default memo(DraggableChip);
