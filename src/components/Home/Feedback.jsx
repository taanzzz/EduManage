import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosSecure from '../../api/Axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { useTheme } from './../../hooks/useTheme';

const Feedback = () => {
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
  
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['all-feedback'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/public/feedback');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className={`py-20 ${getThemeClasses.pageBackground}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className={`py-20 text-center ${getThemeClasses.pageBackground}`}>
        <h3 className={`text-2xl font-bold ${getThemeClasses.primaryText}`}>
          No Feedback Available Yet
        </h3>
      </div>
    );
  }

  // Custom rating style for theme consistency
  const ratingStyle = {
    itemShapes: FaStar,
    activeFillColor: '#F59E0B',
    inactiveFillColor: isDark ? '#374151' : '#E5E7EB',
  };

  return (
    <div className={`py-20 md:py-24 ${getThemeClasses.pageBackground} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-10 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-cyan-500/20' : 'bg-green-500/20'
        }`} />
        <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
          isDark ? 'bg-teal-500/20' : 'bg-emerald-500/20'
        }`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDark ? 'bg-blue-500/15' : 'bg-lime-500/15'
        }`} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${getThemeClasses.primaryText} mb-4`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Straight from Our{' '}
            <span className={`${gradientText} drop-shadow-lg`}>
              Learners' Hearts
            </span>
          </motion.h2>
          <motion.p 
            className={`text-lg ${getThemeClasses.secondaryText} mt-6 max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover what our students are saying about their transformative learning journey with us.
          </motion.p>
        </motion.div>

        {/* Custom Swiper Styles */}
        <style jsx>{`
          .feedback-swiper .swiper-pagination-bullet {
            background: ${isDark ? '#06B6D4' : '#22C55E'};
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          .feedback-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            transform: scale(1.2);
            box-shadow: 0 0 15px ${isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(34, 197, 94, 0.5)'};
          }
        `}</style>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          loopFillGroupWithBlank={true}
          watchSlidesProgress={true}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            }
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="feedback-swiper py-8"
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={feedback._id} style={{ width: '350px', height: 'auto' }}>
              <motion.div 
                className={`card h-full ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} p-8 relative overflow-hidden ${hoverGlow}`}
                style={{ minHeight: '400px' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  rotateY: 5
                }}
              >
                {/* Quote Icon with Glow */}
                <motion.div
                  className="absolute top-6 left-6 z-10"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  <FaQuoteLeft className={`text-4xl ${
                    isDark ? 'text-cyan-500/20' : 'text-green-500/20'
                  } drop-shadow-lg`} />
                </motion.div>

                {/* Background Gradient Effect */}
                <div className={`absolute inset-0 opacity-10 ${
                  isDark 
                    ? 'bg-gradient-to-br from-cyan-500/10 to-teal-500/10' 
                    : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
                } blur-xl`} />

                <div className="flex flex-col h-full relative z-10">
                  {/* Review Text */}
                  <motion.p 
                    className={`italic my-6 text-base leading-relaxed ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent' 
                        : 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'
                    } font-medium`}
                    whileHover={{ scale: 1.02 }}
                  >
                    "{feedback.reviewText}"
                  </motion.p>

                  {/* Footer Section */}
                  <div className={`border-t ${
                    isDark ? 'border-slate-700/50' : 'border-gray-200/50'
                  } pt-6 mt-auto`}>
                    
                    {/* Rating */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="mb-4"
                    >
                      <Rating 
                        style={{ maxWidth: 120 }} 
                        value={feedback.rating} 
                        readOnly 
                        itemStyles={ratingStyle}
                      />
                    </motion.div>

                    {/* User Info */}
                    <motion.div 
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="avatar"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 10 
                        }}
                      >
                        <div className={`w-16 h-16 rounded-full ring-4 ring-offset-4 ${
                          isDark 
                            ? 'ring-cyan-400/40 ring-offset-slate-800' 
                            : 'ring-green-400/40 ring-offset-white'
                        } shadow-lg`}>
                          <img
                            src={feedback.userImage || 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png'}
                            alt={feedback.userName}
                            className="object-cover"
                          />
                        </div>
                      </motion.div>

                      <div className="text-sm">
                        <motion.h4 
                          className={`font-bold text-lg ${getThemeClasses.primaryText} mb-1`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {feedback.userName || 'Anonymous User'}
                        </motion.h4>
                        <p className={`text-xs ${getThemeClasses.mutedText} mb-2`}>
                          {feedback.userEmail || 'No Email Provided'}
                        </p>
                        <p className="text-xs font-medium">
                          <span className={getThemeClasses.mutedText}>Class: </span>
                          <span className={`font-semibold ${
                            isDark ? 'text-cyan-400' : 'text-green-600'
                          }`}>
                            {feedback.classTitle}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Shimmer Effect on Hover */}
                <div className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent' 
                    : 'bg-gradient-to-r from-transparent via-green-500/5 to-transparent'
                } animate-shimmer`} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Feedback;