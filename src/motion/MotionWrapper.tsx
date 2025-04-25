import { AnimatePresence, motion, AnimationProps } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
  animationType?: "fade" | "slide" | "scale" | "zoom" | "custom";
  duration?: number;
  customAnimation?: AnimationProps;
}

function MotionWrapper({
  children,
  animationType = "fade",
  duration = 0.5,
  customAnimation = {},
}: Readonly<MotionWrapperProps>) {
  let motionProps: AnimationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration },
  };

  switch (animationType) {
    case "fade":
      motionProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration },
      };
      break;
    case "slide":
      motionProps = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration },
      };
      break;
    case "scale":
      motionProps = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration },
      };
      break;
    case "zoom":
      motionProps = {
        initial: { opacity: 0, scale: 1.2 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.2 },
        transition: { duration },
      };
      break;
    case "custom":
      motionProps = {
        ...customAnimation,
        transition: { duration },
      };
      break;
    default:
      break;
  }

  return (
    <AnimatePresence mode="wait">
      {children && (
        <motion.div key="motionContent" {...motionProps}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MotionWrapper;








// import { AnimatePresence, motion } from "framer-motion";

// interface MotionWrapperProps {
//   children: React.ReactNode;
// }

// function MotionWrapper({ children }: Readonly<MotionWrapperProps>) {
//   return (
//     <AnimatePresence mode="wait">
//       {children && (
//         <motion.div
//           key="motionContent"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.5 }}
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// export default MotionWrapper;