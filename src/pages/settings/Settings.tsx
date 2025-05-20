
import React from "react";
import { motion } from "framer-motion";

const Settings: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="container mx-auto py-8"
  >
    <h1 className="text-3xl font-bold mb-4">Settings</h1>
    <p className="text-muted-foreground">Manage your account and preferences here.</p>
  </motion.div>
);

export default Settings;
