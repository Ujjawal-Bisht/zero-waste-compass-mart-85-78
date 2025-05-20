
import React from "react";
import { motion } from "framer-motion";

const SupportChat: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="container mx-auto py-8"
  >
    <h1 className="text-3xl font-bold mb-4">Support Chat</h1>
    <p className="text-muted-foreground">
      Live chat support will be available here soon! For now, please email support@example.com for help.
    </p>
  </motion.div>
);

export default SupportChat;
