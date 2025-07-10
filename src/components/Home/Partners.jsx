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
            x: [0, -1088], 
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
        <div className="py-20 bg-base-200">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-4">
                    Trusted by Industry <span className="text-primary">Leaders</span>
                </h2>
                <p className="text-lg text-base-content/70">
                    We partner with forward-thinking companies to provide best-in-class learning experiences.
        
                </p>
                
                {/* Marquee Container */}
                <div className="relative mt-12 w-full overflow-hidden">
                    
                    <motion.div
                        className="flex"
                        variants={marqueeVariants}
                        animate="animate"
                    >
                        {duplicatedLogos.map((logo, index) => (
                            <div key={index} className="flex-shrink-0" style={{ width: '150px' }}>
                                <img 
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className="h-10 mx-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer" 
                                />
                            </div>
                        ))}
                    </motion.div>
                    
                    
                    <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-base-200 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-base-200 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default Partners;