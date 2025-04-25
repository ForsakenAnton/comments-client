import { createContext } from "react";
import MotionContextType from "../interfaces/motionContextType";

const MotionContext = createContext<MotionContextType>({
  wrapMotion: (children) => <>{children} </>,
});

export default MotionContext;