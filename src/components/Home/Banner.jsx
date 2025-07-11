import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/Axios';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Banner = () => {
    const { data: banners = [], isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/banners');
            return res.data;
        }
    });

    if (isLoading) return <div className="h-[90vh] flex items-center justify-center"><LoadingSpinner /></div>;
    if (banners.length === 0) return null;

    return (
        <div className="w-full h-[70vh] md:h-screen">
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="w-full h-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner._id}>
                        <div className="relative w-full h-full">
                            <img src={banner.image} alt={banner.titlePart1} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                            
                            
                            <div className="absolute inset-0 z-10 flex flex-col justify-center items-start text-left text-white p-8 md:p-24">
                                <motion.h1
                                    key={banner._id} 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-4xl md:text-6xl font-extrabold"
                                >
                                    {banner.titlePart1}
                                    
                                    <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        {banner.titlePart2}
                                    </span>
                                </motion.h1>
                                <motion.p 
                                    key={`${banner._id}-desc`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="mt-6 text-lg md:text-xl max-w-xl"
                                >
                                    {banner.description}
                                </motion.p>
                                <motion.div
                                    key={`${banner._id}-btn`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    
                                    <Link to={banner.link} className="btn btn-lg mt-8 text-white border-none bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300">
                                        {banner.buttonText}
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;