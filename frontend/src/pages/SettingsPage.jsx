import { motion } from "framer-motion";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

// Base fade/slide animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  }),
};

// Grid animation with staggered children
const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <motion.div
      className="h-screen container mx-auto px-4 pt-20 max-w-5xl"
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6">
        {/* Title */}
        <motion.div variants={fadeInUp} custom={0.1} className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </motion.div>

        {/* Theme Grid with staggered animation */}
        <motion.div
          variants={gridContainer}
          className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2"
        >
          {THEMES.map((t) => (
            <motion.button
              key={t}
              variants={gridItem}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Preview Section */}
        <motion.h3 variants={fadeInUp} custom={0.5} className="text-lg font-semibold mb-3">
          Preview
        </motion.h3>

        <motion.div
          variants={fadeInUp}
          custom={0.6}
          className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg"
        >
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <motion.div
                variants={fadeInUp}
                custom={0.7}
                className="bg-base-100 rounded-xl shadow-sm overflow-hidden"
              >
                {/* Chat Header */}
                <motion.div
                  variants={fadeInUp}
                  custom={0.8}
                  className="px-4 py-3 border-b border-base-300 bg-base-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </motion.div>

                {/* Chat Messages */}
                <motion.div
                  variants={fadeInUp}
                  custom={0.9}
                  className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100"
                >
                  {PREVIEW_MESSAGES.map((message, i) => (
                    <motion.div
                      key={message.id}
                      variants={fadeInUp}
                      custom={1 + i * 0.05}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Chat Input */}
                <motion.div
                  variants={fadeInUp}
                  custom={1.2}
                  className="p-4 border-t border-base-300 bg-base-100"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary h-10 min-h-0"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
