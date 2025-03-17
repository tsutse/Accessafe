import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import AccessibilityWidget from "@/components/accessibility/AccessibilityWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const DemoPage: React.FC = () => {
  // Current domain - update this when moving to production
  const currentDomain = "https://accessafe.co";
  const embeddableScript = `<script src="${currentDomain}/dist/hebrew-a11y.min.js" defer></script>`;
  const advancedScript = `<script src="${currentDomain}/dist/hebrew-a11y.min.js" data-position="bottom-left" defer></script>`;
  const [activeTab, setActiveTab] = useState("basic");
  const [isScrolled, setIsScrolled] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);

  // Features for the animated display
  const features = [
    "התאמת גודל טקסט",
    "ניגודיות גבוהה",
    "מצב שחור-לבן",
    "הדגשת קישורים",
    "ניווט מקלדת",
    "הקראת טקסט",
  ];

  // Subtle floating animation for the hero graphics
  const floatAnimation = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "translateY(-10px)" });
        await next({ transform: "translateY(0px)" });
      }
    },
    config: { duration: 2000 },
  });

  // Rotate through features in the hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to copy appropriate script based on selected tab
  const copyScript = (advanced = false) => {
    const scriptToCopy = advanced ? advancedScript : embeddableScript;
    navigator.clipboard
      .writeText(scriptToCopy)
      .then(() => {
        alert("הקוד הועתק ללוח!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("העתקה נכשלה, נסה להעתיק ידנית");
      });
  };

  return (
    <div dir="rtl" lang="he" className="min-h-screen font-heebo">
      {/* Sticky Header with Nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-sm shadow-md" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-10 h-10 flex items-center justify-center mr-3 overflow-hidden"
                >
                  <img 
                    src="/logo-large.png" 
                    alt="לוגו נגישות עברית" 
                    className="w-full h-full object-contain object-center max-w-full max-h-full" 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl md:text-2xl font-bold bg-gradient-to-l from-blue-600 to-indigo-700 bg-clip-text text-transparent"
                >
                  נגישות עברית
                </motion.h1>
              </div>
            </div>

            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ul className="flex space-x-1 space-x-reverse">
                <li>
                  <a
                    href="#features"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    תכונות
                  </a>
                </li>
                <li>
                  <a
                    href="#embed"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    הטמעה
                  </a>
                </li>
                <li>
                  <a
                    href="/wcag-compliance"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    תקן WCAG
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    תנאי שימוש
                  </a>
                </li>
              </ul>
            </motion.nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Elements */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-16 pb-24">
        {/* Abstract geometric shapes for tech aesthetic */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <animated.div
            style={floatAnimation}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          ></animated.div>
          <animated.div
            style={floatAnimation}
            className="absolute top-1/3 right-1/3 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          ></animated.div>
          <div className="absolute top-0 left-0 right-0 h-1/2">
            <svg
              className="absolute left-0 w-full"
              viewBox="0 0 1440 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.05"
                d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,181.3C672,171,768,181,864,197.3C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                fill="url(#paint0_linear)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="720"
                  y1="0"
                  x2="720"
                  y2="320"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3B82F6"></stop>
                  <stop offset="1" stopColor="#4F46E5"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Main hero content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-right"
            >
              <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 border-none">
                תואם תקן ישראלי 5568
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-l from-blue-600 to-indigo-700 bg-clip-text text-transparent leading-tight">
                כלי נגישות מתקדם
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  לאתרים בעברית
                </span>
              </h1>

              <div className="mb-6 h-16 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featureIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg md:text-xl text-gray-600"
                  >
                    {features[featureIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-end gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
                >
                  <a href="#embed">התחל להטמיע</a>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300">
                  <a href="/implementation-example">צפה בדוגמה</a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <animated.div
                  style={floatAnimation}
                  className="absolute -z-10 right-0 top-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 -translate-y-1/4"
                ></animated.div>

                {/* Device mockup */}
                <div className="relative mx-auto max-w-sm md:max-w-md">
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                    {/* Browser-like header */}
                    <div className="bg-gray-100 p-2 border-b border-gray-200 flex items-center">
                      <div className="flex space-x-1.5 space-x-reverse mr-2">
                        <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-center text-xs text-gray-500">
                        עמוד דוגמה
                      </div>
                    </div>

                    {/* Website mockup */}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="w-24 h-6 bg-blue-600 rounded"></div>
                        <div className="flex space-x-2 space-x-reverse">
                          <div className="w-6 h-6 bg-gray-200 rounded"></div>
                          <div className="w-6 h-6 bg-gray-200 rounded"></div>
                        </div>
                      </div>

                      <div className="h-5 bg-gray-200 rounded-full w-4/5 mb-3"></div>
                      <div className="h-5 bg-gray-200 rounded-full w-full mb-3"></div>
                      <div className="h-5 bg-gray-200 rounded-full w-5/6 mb-6"></div>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-md"></div>
                        </div>
                        <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-md"></div>
                        </div>
                      </div>

                      <div className="h-8 bg-blue-500 rounded-md w-1/2 mx-auto"></div>
                    </div>
                  </div>

                  {/* Accessibility Widget Button */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-lg flex items-center justify-center text-white border border-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a4 4 0 0 1 4 4M5 10a7 7 0 0 1 7-7"></path>
                      <path d="M5 10a7 7 0 0 0 7 7"></path>
                      <path d="M12 17a7 7 0 0 0 7-7"></path>
                      <path d="M12 17v5"></path>
                      <line x1="5" y1="10" x2="19" y2="10"></line>
                    </svg>
                  </motion.div>

                  {/* Accessibility panel mockup - Realistic placement */}
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="absolute bottom-4 right-16 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="bg-gradient-to-l from-blue-600 to-indigo-700 text-white p-2">
                      <h3 className="font-bold text-xs">הגדרות נגישות</h3>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-100 rounded-full mr-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="w-8 h-4 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-100 rounded-full mr-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-14"></div>
                        </div>
                        <div className="w-8 h-4 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-100 rounded-full mr-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-12"></div>
                        </div>
                        <div className="w-8 h-4 bg-blue-400 rounded-full"></div>
                      </div>
                      <div className="h-5 bg-blue-500 rounded w-full mt-3"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            >
              תכונות ויתרונות
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-lg text-gray-600"
            >
              כלי הנגישות מציע מגוון רחב של תכונות המסייעות לעמוד בדרישות התקן
              הישראלי (5568) ותקן WCAG 2.0 ברמת AA
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Feature Card 1 */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100 transition transform hover:scale-105"
            >
              <div className="w-12 h-12 mb-6 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">התאמה ויזואלית</h3>
              <p className="text-gray-600 mb-4">
                אפשרויות להתאמת הצגת התוכן: גודל טקסט, ניגודיות, שחור-לבן והדגשת
                קישורים.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-blue-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>שליטה בגודל הטקסט</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-blue-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>מצב ניגודיות גבוהה</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-blue-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>הדגשת אלמנטים חשובים</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 shadow-lg border border-indigo-100 transition transform hover:scale-105"
            >
              <div className="w-12 h-12 mb-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">קל להטמעה</h3>
              <p className="text-gray-600 mb-4">
                מתממשק בצורה חלקה עם כל אתר קיים ללא השפעה על ביצועים או צורך
                בשינויים נוספים.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-indigo-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>שורת קוד אחת להטמעה</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-indigo-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>משתלב בכל אתר בעברית</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-indigo-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>אין צורך בידע טכני עמוק</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg border border-purple-100 transition transform hover:scale-105"
            >
              <div className="w-12 h-12 mb-6 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">תאימות לתקנים</h3>
              <p className="text-gray-600 mb-4">
                עומד בדרישות תקן ישראלי 5568 ובתקן הבינלאומי WCAG 2.0 ברמת AA.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-purple-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>עומד בתקן ישראלי 5568</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-purple-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>תואם WCAG 2.0 AA</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-4 w-4 text-purple-500 ml-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>תמיכה במגוון אתגרי נגישות</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Embed Code Section */}
      <section
        id="embed"
        className="py-20 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            >
              הטמעה פשוטה וקלה
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-lg text-gray-600"
            >
              העתק את הקוד להטמעה והוסף אותו לאתר שלך כדי לספק חוויית נגישות
              מלאה למשתמשים
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="bg-amber-50 border-r-4 border-amber-400 p-4 mb-6 rounded-md">
                <h3 className="font-bold text-amber-800 mb-2">
                  כתב ויתור חשוב
                </h3>
                <p className="text-sm text-amber-700">
                  הורדת והטמעת קוד הנגישות מהווה הסכמה לכתב הויתור המשפטי. בעל
                  האתר נושא באחריות הבלעדית לעמידה בדרישות החוק.
                </p>
                <a
                  href="/terms.html"
                  target="_blank"
                  className="text-amber-800 font-bold mt-2 inline-block hover:underline"
                >
                  קרא את כתב הויתור המלא ותנאי השימוש
                </a>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">קוד בסיסי</TabsTrigger>
                  <TabsTrigger value="advanced">קוד מתקדם</TabsTrigger>
                </TabsList>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 text-blue-700 text-sm">
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-blue-500 mt-0.5 ml-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <strong className="block font-medium mb-1">
                        הטמעה פשוטה
                      </strong>
                      <p>
                        העתק את הקוד והדבק אותו באתר שלך, בין תגיות{" "}
                        <code className="bg-blue-100 px-1 rounded">
                          &lt;head&gt;
                        </code>{" "}
                        או בסוף ה-
                        <code className="bg-blue-100 px-1 rounded">
                          &lt;body&gt;
                        </code>
                        .
                      </p>
                      <p className="mt-2 text-xs bg-blue-100 p-2 rounded">
                        הערה: הדומיין הנוכחי הינו זמני לסביבת פיתוח ויוחלף
                        בדומיין קבוע בעת מעבר לייצור.
                      </p>
                    </div>
                  </div>
                </div>

                <TabsContent value="basic" className="mt-4">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-auto text-left ltr-text font-mono">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">HTML</span>
                      <button
                        onClick={() => copyScript(false)}
                        className="text-xs bg-gray-800 hover:bg-gray-700 text-white py-1 px-2 rounded transition"
                      >
                        העתק
                      </button>
                    </div>
                    <pre className="text-sm break-all whitespace-pre-wrap">
                      {embeddableScript}
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="advanced" className="mt-4">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-auto text-left ltr-text font-mono">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">HTML</span>
                      <button
                        onClick={() => copyScript(true)}
                        className="text-xs bg-gray-800 hover:bg-gray-700 text-white py-1 px-2 rounded transition"
                      >
                        העתק
                      </button>
                    </div>
                    <pre className="text-sm break-all whitespace-pre-wrap">
                      {advancedScript}
                    </pre>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    תכונה data-position יכולה להיות: bottom-right (ברירת מחדל),
                    bottom-left, top-right, או top-left
                  </p>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  onClick={() => copyScript(activeTab === "advanced")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg"
                >
                  <span>העתק קוד להטמעה</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/implementation-example">צפה בדוגמה מלאה</a>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -z-10 w-full h-full scale-90 blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full"
                ></motion.div>
                <div className="bg-white p-6 rounded-xl shadow-xl border border-blue-100">
                  <div className="text-center mb-4">
                    <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      3 צעדים פשוטים להטמעה
                    </h3>
                  </div>

                  <ol className="space-y-6 relative my-8">
                    <li className="relative pr-10 mb-6">
                      <div className="absolute right-0 top-2 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div className="border-r border-blue-200 pr-3 mr-4">
                        <h4 className="font-bold text-gray-900 mb-1">
                          העתק את קוד ההטמעה
                        </h4>
                        <p className="text-sm text-gray-600">
                          בחר את הגרסה הבסיסית או המתקדמת והעתק את קוד ה-HTML
                        </p>
                      </div>
                    </li>
                    <li className="relative pr-10 mb-6">
                      <div className="absolute right-0 top-2 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div className="border-r border-blue-200 pr-3 mr-4">
                        <h4 className="font-bold text-gray-900 mb-1">
                          הוסף לקוד האתר
                        </h4>
                        <p className="text-sm text-gray-600">
                          הדבק את הקוד בתגית &lt;head&gt; או &lt;body&gt; של
                          האתר שלך
                        </p>
                      </div>
                    </li>
                    <li className="relative pr-10">
                      <div className="absolute right-0 top-2 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div className="border-r border-blue-200 pr-3 mr-4">
                        <h4 className="font-bold text-gray-900 mb-1">
                          בדוק את התוצאה
                        </h4>
                        <p className="text-sm text-gray-600">
                          רענן את האתר וודא שכפתור הנגישות מופיע כנדרש
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WCAG Compliance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            >
              תאימות לתקנים
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-lg text-gray-600"
            >
              הכלי פותח בהתאם לדרישות תקן ישראלי 5568 ותקן WCAG 2.0 ברמת AA
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center ml-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    רכיבי תאימות עיקריים
                  </h3>
                </div>

                <ul className="space-y-4">
                  <li className="flex">
                    <div className="ml-3 text-blue-600">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        תפעול באמצעות מקלדת
                      </p>
                      <p className="text-sm text-gray-600">
                        תמיכה מלאה בניווט באמצעות מקלדת לפי סעיפים 2.1.1 ו-2.1.2
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="ml-3 text-blue-600">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">התאמה לתצוגה</p>
                      <p className="text-sm text-gray-600">
                        אפשרויות להגדלת טקסט וניגודיות לפי סעיפים 1.4.3, 1.4.4
                        ו-1.4.8
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="ml-3 text-blue-600">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        תמיכה בטכנולוגיות מסייעות
                      </p>
                      <p className="text-sm text-gray-600">
                        תואם קוראי מסך ועזרים אחרים לפי סעיפים 4.1.1 ו-4.1.2
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8">
                  <Button asChild variant="outline" className="border-blue-300">
                    <a
                      href="/wcag-compliance"
                      className="inline-flex items-center"
                    >
                      למידע נוסף על תאימות לתקן
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative h-full">
                <div className="absolute inset-0 flex items-center justify-center bg-blue-600 overflow-hidden">
                  <div className="w-full h-full opacity-10">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 400 400"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <circle
                          cx="200"
                          cy="200"
                          r="150"
                          stroke="white"
                          strokeWidth="6"
                        />
                        <circle
                          cx="200"
                          cy="200"
                          r="100"
                          stroke="white"
                          strokeWidth="6"
                        />
                        <circle
                          cx="200"
                          cy="200"
                          r="50"
                          stroke="white"
                          strokeWidth="6"
                        />
                        <line
                          x1="0"
                          y1="200"
                          x2="400"
                          y2="200"
                          stroke="white"
                          strokeWidth="6"
                        />
                        <line
                          x1="200"
                          y1="0"
                          x2="200"
                          y2="400"
                          stroke="white"
                          strokeWidth="6"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                    <div className="bg-white text-blue-600 rounded-full p-3 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">תקן ישראלי 5568</h3>
                    <p className="max-w-xs text-blue-100 mb-6">
                      הכלי פותח בהתאם לדרישות תקן ישראלי 5568 (קווים מנחים
                      לנגישות תכנים באינטרנט)
                    </p>
                    <Badge className="bg-white text-blue-600 border-none px-3 py-1">
                      WCAG 2.0 AA
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 text-white text-xl font-bold">
                  <span aria-hidden="true">א</span>
                </div>
                <h3 className="text-xl font-bold">נגישות עברית</h3>
              </div>
              <p className="text-gray-400 mb-6">
                כלי נגישות מתקדם לאתרים בעברית בהתאם לתקן הישראלי 5568.
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">קישורים חשובים</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/implementation-example"
                    className="text-gray-400 hover:text-white transition"
                  >
                    דוגמת יישום
                  </a>
                </li>
                <li>
                  <a
                    href="/wcag-compliance"
                    className="text-gray-400 hover:text-white transition"
                  >
                    תאימות WCAG
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-400 hover:text-white transition"
                  >
                    תנאי שימוש וכתב ויתור
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">הורדה והטמעה</h3>
              <p className="text-gray-400 mb-4">
                הורד את הכלי והטמע אותו באתר שלך בשורת קוד אחת.
              </p>
              <Button
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-none"
                asChild
              >
                <a href="#embed">העתק קוד להטמעה</a>
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              כלי נגישות לאתרים בעברית &copy; 2025 - כל הזכויות שמורות
            </p>
          </div>
        </div>
      </footer>

      {/* Accessibility Widget */}
      <AccessibilityWidget position="bottom-right" />
    </div>
  );
};

export default DemoPage;
