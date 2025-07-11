import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api/Axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { FaQuoteLeft } from "react-icons/fa";

const Feedback = () => {
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ['all-feedback'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/public/feedback');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="py-20"><LoadingSpinner /></div>;
  }

  if (feedbacks.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold">No Feedback Available Yet</h3>
      </div>
    );
  }

  return (
    <div className="py-20 md:py-24 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
            Straight from Our{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Learners' Hearts
            </span>
          </h2>
          <p className="text-lg text-base-content/70 mt-3">
            Discover what our students are saying about their learning journey with us.
          </p>
        </div>

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
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper py-4"
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback._id} style={{ width: '350px', height: 'auto' }}>
              <div className="card h-full bg-base-100 shadow-xl p-6 relative">
                <FaQuoteLeft className="text-4xl text-primary/10 absolute top-6 left-6" />
                <div className="flex flex-col h-full z-10">
                  <p className="italic my-6 text-base leading-relaxed bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    "{feedback.reviewText}"
                  </p>

                  <div className="border-t border-base-300/50 pt-4 mt-auto">
                    <Rating style={{ maxWidth: 120 }} value={feedback.rating} readOnly />

                    <div className="flex items-center gap-4 mt-4">
                      <div className="avatar">
                        <div className="w-14 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                          <img
                            src={feedback.userImage || 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png'}
                            alt={feedback.userName}
                          />
                        </div>
                      </div>

                      <div className="text-sm">
                        <h4 className="font-bold text-base-content">{feedback.userName || 'Anonymous User'}</h4>
                        <p className="text-xs text-gray-400">{feedback.userEmail || 'No Email Provided'}</p>
                        <p className="text-xs font-medium mt-1">
                          Class:{' '}
                          <span className="text-primary font-semibold">
                            {feedback.classTitle}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Feedback;
