import { motion } from "framer-motion";
import { contentVariant } from "@/utils/animation";

const AnimationCards = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <motion.div
      variants={contentVariant}
      animate="active"
      initial="inactive"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimationCards;
