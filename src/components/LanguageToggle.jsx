import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/language";

/**
 * Floating button that switches the invitation between Hindi and English.
 * It shows the language the guest will switch to.
 */
const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      aria-label={language === "hi" ? "Switch to English" : "हिंदी में देखें"}
      className="fixed top-4 left-4 z-50 flex items-center gap-1.5 rounded-full border border-rose-100/50 bg-white/80 px-3 py-2.5 text-sm font-semibold text-rose-500 shadow-lg backdrop-blur-sm"
    >
      <Languages className="h-4 w-4" />
      {language === "hi" ? "English" : "हिंदी"}
    </motion.button>
  );
};

export default LanguageToggle;
