import { ReactNode, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import MotionContext from "./motionContext";
import { animationOptions } from "./animationOptions";

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider = ({ children }: Readonly<MotionProviderProps>) => {
  const wrapMotion = useCallback(
    (
      children: ReactNode,
      key: string | number = "motion",
      animationType: string = "fade"
    ) => {
      const motionProps = animationOptions[animationType] || animationOptions.fade;

      return <motion.div key={key} {...motionProps}>{children}</motion.div>;
    },
    []
  );

  const motionContextValue = useMemo(() => {
    return { wrapMotion };
  }, [wrapMotion]);

  return (
    <MotionContext.Provider value={motionContextValue}>
      {children}
    </MotionContext.Provider>
  );
};
