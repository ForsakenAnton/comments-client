import { JSX } from "react";

export default interface MotionContextType {
  wrapMotion: (
    children: React.ReactNode,
    key?: string | number,
    animationType?: string
  ) => JSX.Element;
}
