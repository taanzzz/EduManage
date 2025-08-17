import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const logos = [
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155276/eye_bzkrzd.png", alt: "Google" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155284/photos_ipnlck.png", alt: "Microsoft" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155278/bing_yyuw9v.png", alt: "Amazon" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155278/medium_uq9fr2.png", alt: "Adobe" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155278/reddit_o7beqk.png", alt: "Samsung" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155278/vimeo_lfiesp.png", alt: "Cisco" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155277/bing_1_wcydgs.png", alt: "Citi" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155276/trello_hk68gd.png", alt: "Volkswagen" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155277/shutterstock_so1nop.png", alt: "Adobe" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155276/quora_j8hjdj.png", alt: "Samsung" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155275/slack_vzs9q4.png", alt: "Cisco" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155275/logo_1_tplmqe.png", alt: "Volkswagen" },
  { src: "https://res.cloudinary.com/dwkj2w1ds/image/upload/v1752155275/nike_gmzqp6.png", alt: "Volkswagen" },
];

const Partners = () => {
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

  const duplicatedLogos = [...logos, ...logos];

  const marqueeVariants = {
    animate: {
      x: [0, -logos.length * 180], // total width estimation
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className={`pt-16 pb-8 ${getThemeClasses.pageBackground} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className={`absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
        }`} />
        <div className={`absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl animate-pulse delay-2000 ${
          isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h2 className={`text-3xl md:text-4xl font-extrabold ${getThemeClasses.primaryText}`}>
            Trusted by Industry{' '}
            <span className={`${gradientText} drop-shadow-lg`}>
              Leaders
            </span>
          </h2>
        </motion.div>
        <motion.p 
          className={`text-lg ${getThemeClasses.secondaryText} max-w-2xl mx-auto leading-relaxed`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          We collaborate with innovative companies to deliver next-generation learning experiences.
        </motion.p>

        {/* Marquee */}
        <div className="relative mt-12 w-full overflow-hidden">
          <motion.div
            className="flex gap-12"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 w-[180px] flex items-center justify-center ${hoverGlow}`}
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`h-12 md:h-14 lg:h-16 object-contain opacity-70 hover:opacity-100 transition duration-300 ${
                    isDark ? 'brightness-125' : 'brightness-75'
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Edge gradient overlays */}
          <div className={`absolute top-0 left-0 w-24 h-full bg-gradient-to-r ${isDark ? 'from-slate-900' : 'from-white'} to-transparent z-10`} />
          <div className={`absolute top-0 right-0 w-24 h-full bg-gradient-to-l ${isDark ? 'from-slate-900' : 'from-white'} to-transparent z-10`} />
        </div>
      </div>
    </section>
  );
};

export default Partners;
