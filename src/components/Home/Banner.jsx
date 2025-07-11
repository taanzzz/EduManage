import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/Axios';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Shared/LoadingSpinner';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Banner = () => {
    const { data: banners = [], isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/banners');
            return res.data;
        }
    });

    if (isLoading) return <div className="h-[95vh] flex items-center justify-center"><LoadingSpinner /></div>;
    if (banners.length === 0) return null;

    return (
        <div className="w-full h-[75vh] md:h-screen relative">
            <Swiper
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[EffectFade, Pagination, Autoplay]}
                className="w-full h-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner._id}>
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={banner.image}
                                alt={banner.titlePart1}
                                className="w-full h-full object-cover brightness-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
                            <motion.h1
                                key={banner._id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: 'easeOut' }}
                                className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-xl"
                            >
                                {banner.titlePart1}
                                <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                    {banner.titlePart2}
                                </span>
                            </motion.h1>

                            <motion.p
                                key={`${banner._id}-desc`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.9, delay: 0.3 }}
                                className="mt-6 text-base md:text-xl text-white/90 max-w-2xl drop-shadow"
                            >
                                {banner.description}
                            </motion.p>

                            <motion.div
                                key={`${banner._id}-btn`}
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                            >
                                <Link
                                    to={banner.link}
                                    className="mt-8 inline-block rounded-full px-8 py-3 text-white font-semibold tracking-wide bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    {banner.buttonText}
                                </Link>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
