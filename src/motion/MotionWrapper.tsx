// MotionWrapper.tsx
import { AnimatePresence, motion } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
}

function MotionWrapper({ children }: Readonly<MotionWrapperProps>) {
  return (
    <AnimatePresence mode="wait">
      {children && (
        <motion.div
          key="motionContent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export default MotionWrapper;
