import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/Axios';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useTheme } from '../../hooks/useTheme';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
  
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/public/banners');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className={`h-[95vh] flex items-center justify-center ${getThemeClasses.pageBackground}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <div className="w-full h-[75vh] md:h-screen relative overflow-hidden">
      {/* Custom Swiper Styles */}
      <style jsx>{`
        .banner-swiper .swiper-pagination-bullet {
          background: ${isDark ? '#06B6D4' : '#22C55E'};
          opacity: 0.5;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }
        .banner-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.3);
          box-shadow: 0 0 20px ${isDark ? 'rgba(6, 182, 212, 0.6)' : 'rgba(34, 197, 94, 0.6)'};
        }
      `}</style>

      <Swiper
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        loop={true}
        autoplay={{ 
          delay: 6000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        modules={[EffectFade, Pagination, Autoplay]}
        className="banner-swiper w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            {/* Background Image with Advanced Overlay */}
            <div className="absolute inset-0">
              <motion.img
                src={banner.image}
                alt={banner.titlePart1}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 8, ease: "easeOut" }}
              />
              
              {/* Multi-layered overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
              <div className={`absolute inset-0 ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-900/60 via-transparent to-cyan-900/40' 
                  : 'bg-gradient-to-br from-gray-900/60 via-transparent to-green-900/40'
              }`}></div>
            </div>

            {/* Animated Background Effects */}
            <div className="absolute inset-0 opacity-20">
              <motion.div 
                className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl ${
                  isDark ? 'bg-cyan-500/30' : 'bg-green-500/30'
                }`}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                  x: [0, 30, 0],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              />
              <motion.div 
                className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl ${
                  isDark ? 'bg-teal-500/30' : 'bg-emerald-500/30'
                }`}
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                  x: [0, -40, 0],
                  y: [0, 15, 0]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: 3
                }}
              />
            </div>

            {/* Content with Advanced Animations */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
              <motion.h1
                key={banner._id}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  staggerChildren: 0.2
                }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl"
              >
                <motion.span 
                  className="block"
                  whileHover={{ scale: 1.02 }}
                >
                  {banner.titlePart1}
                </motion.span>
                <motion.span 
                  className={`block mt-3 ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400' 
                      : 'bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400'
                  } bg-clip-text text-transparent drop-shadow-lg`}
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%'] 
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  {banner.titlePart2}
                </motion.span>
              </motion.h1>

              <motion.p
                key={`${banner._id}-desc`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.4,
                  ease: "easeOut" 
                }}
                className="mt-8 text-base md:text-xl lg:text-2xl text-white/90 max-w-4xl drop-shadow-lg leading-relaxed font-medium"
              >
                {banner.description}
              </motion.p>

              <motion.div
                key={`${banner._id}-btn`}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -3
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={banner.link}
                    className={`mt-10 inline-block rounded-2xl px-10 py-4 md:px-12 md:py-5 text-white font-bold text-lg md:text-xl tracking-wide ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
                    } shadow-2xl hover:shadow-3xl transition-all duration-300 ${hoverGlow}`}
                  >
                    {banner.buttonText}
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                      }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${
                    isDark ? 'bg-cyan-400/40' : 'bg-green-400/40'
                  } blur-sm`}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() > 0.5 ? 25 : -25, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.8,
                  }}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;