import { AnimationProps } from "framer-motion";

export const animationOptions: { [key: string]: AnimationProps } = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  },
  slide: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.5 },
  },
  zoom: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { duration: 0.5 },
  },
  bounce: {
    initial: { y: -30 },
    animate: { y: 0 },
    exit: { y: -30 },
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  rotate: {
    initial: { rotate: -90 },
    animate: { rotate: 0 },
    exit: { rotate: -90 },
    transition: { duration: 0.5 },
  },
};