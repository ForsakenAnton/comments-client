import { ReactNode, JSX } from "react";

export default interface MotionProviderValue {
  wrapMotion: (children: ReactNode, key?: string | number, animationType?: string) => JSX.Element;
}