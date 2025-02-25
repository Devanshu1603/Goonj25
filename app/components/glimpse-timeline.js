"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { CircuitBoard, Cpu, QrCode, ChevronDown } from "lucide-react";
import Timeline from "./Timeline";

const TimelineEvent = ({
  year,
  title,
  description,
  highlights,
  achievements,
  icon: Icon,
  position,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: position % 2 === 0 ? -50 : 50,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className={`relative w-full flex
      ${position % 2 === 0 ? "md:justify-start" : "md:justify-end"}
      justify-start
      `}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`w-full md:w-[45%] p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 
      hover:bg-white/10 transition-all duration-300 ease-out
      hover:shadow-lg hover:shadow-cyan-500/10
      ${position % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}
      `}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4 group">
            {Icon && (
              <div className="p-2 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                <Icon className="text-orange-500 w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-300" />
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-orange-500 transition-colors duration-300">
              {title}
            </h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            <span className="text-sm md:text-base">
              {isExpanded ? "Collapse" : "Explore"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4 overflow-hidden"
            >
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Highlights Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-base md:text-lg font-semibold text-cyan-500 mb-3 flex items-center">
                    <span className="w-1 h-4 bg-cyan-500 rounded mr-2"></span>
                    Key Highlights
                  </h4>
                  <ul className="space-y-3">
                    {highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center space-x-2 group"
                      >
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></span>
                        <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Achievements Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-base md:text-lg font-semibold text-purple-500 mb-3 flex items-center">
                    <span className="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                    Major Achievements
                  </h4>
                  <ul className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center space-x-2 group"
                      >
                        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></span>
                        <span className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {achievement}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const GlimpseTimeline = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const timelineEvents = [
    {
      year: 2023,
      title: "Bollywood Bash",
      description:
        "The true essence of a society is reflected through its culture and festivals. Bollywood Bash, held on the 2nd, 3rd, and 4th of March, was a thrilling and vibrant experience with an enchanting Bollywood theme.",
      highlights: [
        "Goonj made a grand return after 3 years",
        "Night of laughter by comedian Vaibhav Arora",
        "Captivating performance by Gurnam Bhullar",
      ],
      achievements: ["9,000+ Attendees", "30+ Events"],
      icon: QrCode,
    },
    {
      year: 2024,
      title: "Yugantar",
      description:
        "A celebration of time—Past⏳, Present, and Future⌛—Yugantar fused technology and culture into a high-energy, passion-filled extravaganza.",
      highlights: [
        "Goonj was transformed into a Techno-Cultural Fest",
        "star performance by Kulwinder Billa",
        "Evening of joy with comedian Parvinder Singh",
      ],
      achievements: ["15,000+ Attendees", "50+ Events"],
      icon: CircuitBoard,
    },
    {
      year: 2025,
      title: "Techriti",
      description:
        "Reaching unprecedented heights with global collaborations, groundbreaking technological showcases, and a vision that transcends traditional boundaries.",
      highlights: [
        "'Khaab' tha sabka, aur ab sach hone jaa raha hai. AKHIL will be performing LIVE on 21st Feb! Get ready to groove to hits like “Khaab,” “Gani,” “Rukh,” and “Teri Kami”",
        "Band 'AAHRMB' will perform on February 20th.",
      ],
      achievements: [
        "20,000+ Expected Attendees",
        "60+ Exciting Events",
      ],
      icon: Cpu,
    },
  ];
  return (
    <div
      ref={containerRef}
      className="bg-[#0D0221] py-16 md:py-36 relative overflow-hidden"
    >
      {/* Background hover ball following mouse */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-indigo-900/10 animate-[pulse_10s_infinite]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,...')] opacity-5"></div>
      </div>

      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={ref}
      >
        {/* Section Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4"
          >
            Our Journey Through Years
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300"
          >
            The Evolution of our Goonj
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-16 md:w-24 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 mx-auto mt-4"
          />
        </motion.div>

        <Timeline timelineEvents={timelineEvents} />
      </div>
    </div>
  );
};

export default GlimpseTimeline;

