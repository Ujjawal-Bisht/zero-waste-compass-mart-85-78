
import React from "react";
import { motion } from "framer-motion";

const Community: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="container mx-auto py-8"
  >
    <h1 className="text-3xl font-bold mb-4">Community</h1>
    <p className="text-muted-foreground">
      Welcome to the Community! Here you'll soon be able to discuss, help others, and connect with fellow users.
    </p>
  </motion.div>
);

export default Community;
