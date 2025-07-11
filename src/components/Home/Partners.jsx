import React from 'react';
import { motion } from 'framer-motion';

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
    <section className="py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-4">
          Trusted by Industry{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Leaders
          </span>
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          We collaborate with innovative companies to deliver next-generation learning experiences.
        </p>

        {/* Marquee */}
        <div className="relative mt-12 w-full overflow-hidden">
          <motion.div
            className="flex gap-12"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[180px] flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 md:h-14 lg:h-16 object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </motion.div>

          {/* Edge gradient overlays */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-base-100 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-base-100 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
