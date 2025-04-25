import { createContext } from "react";
import MotionContextType from "../interfaces/MotionContextType";

const MotionContext = createContext<MotionContextType>({
  wrapMotion: (children) => <>{children}</>,
});

export default MotionContext;