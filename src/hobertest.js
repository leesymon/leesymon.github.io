import React, { useState } from "react";
import { motion } from "framer-motion";

const MyComponent = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ backgroundColor: isHovered ? "blue" : "red" }}
      transition={{ duration: 0.5 }}
      style={{ width: 200, height: 200 }}
    >
      Hover me!
    </motion.div>
  );
};

export default MyComponent;
