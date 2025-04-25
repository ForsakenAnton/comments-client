import { MotionContext } from "framer-motion";
import { useContext } from "react";

export const useMotion = () => {
  return useContext(MotionContext);
}