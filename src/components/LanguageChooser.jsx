import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import config from "@/config/config";
import { useLanguage } from "@/lib/language";

const options = [
  { value: "hi", label: "हिंदी", hint: "हिंदी में निमंत्रण देखें" },
  { value: "en", label: "English", hint: "View the invitation in English" },
];

/**
 * Full-screen pop-up shown when the site opens, asking the guest to pick
 * Hindi or English. Their previous choice is highlighted.
 */
const LanguageChooser = ({ onChoose }) => {
  const { language, setLanguage } = useLanguage();

  const handleChoose = (value) => {
    setLanguage(value);
    onChoose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-rose-950/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-chooser-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm overflow-hidden rounded-3xl border border-rose-100 bg-white text-center shadow-2xl"
      >
        <div className="bg-gradient-to-b from-rose-50 to-white px-6 pb-4 pt-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-rose-500 shadow-inner">
            <Languages className="h-7 w-7" />
          </div>
          <p className="mt-4 text-sm font-semibold text-amber-600">
            {config.data.invocation.hi}
          </p>
          <h2
            id="language-chooser-title"
            className="mt-2 font-serif text-2xl text-gray-800"
          >
            भाषा चुनें
            <span className="block text-lg text-gray-500">
              Choose your language
            </span>
          </h2>
        </div>

        <div className="space-y-3 px-6 pb-8 pt-2">
          {options.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChoose(option.value)}
              className={`w-full rounded-2xl border px-5 py-4 transition-colors ${
                language === option.value
                  ? "border-rose-500 bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-200/60"
                  : "border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
              }`}
            >
              <span className="block font-serif text-2xl">{option.label}</span>
              <span
                className={`mt-1 block text-xs ${
                  language === option.value ? "text-white/80" : "text-gray-500"
                }`}
              >
                {option.hint}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LanguageChooser;
