import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

export default interface MotionContextType {
  wrapMotion: (
    children: ReactNode,
    key?: string | number,
    animationType?: string
  ) => JSX.Element;
}