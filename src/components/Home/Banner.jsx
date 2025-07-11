import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/Axios';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    
    const { data: banners = [], isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/public/banners');
            return res.data;
        }
    });

    
    if (isLoading) {
        return (
            <div className="h-[85vh] flex items-center justify-center bg-base-200">
                <LoadingSpinner />
            </div>
        );
    }

    
    if (banners.length === 0) {
        return null;
    }

    return (
        <div className="w-full h-[60vh] md:h-[85vh] bg-base-200">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 80,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="w-full h-full"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner._id} className="w-[80%] md:w-[70%]">
                        <div className="relative w-full h-full">
                            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover rounded-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl"></div>
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                                <motion.h1
                                    key={banner.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="text-3xl md:text-5xl font-extrabold"
                                >
                                    {banner.title}
                                </motion.h1>
                                <motion.p 
                                    key={banner.description}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                    className="mt-4 text-lg max-w-lg"
                                >
                                    {banner.description}
                                </motion.p>
                                <motion.div
                                    key={banner.buttonText}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                >
                                    <Link to={banner.link} className="btn btn-primary btn-lg mt-6">
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