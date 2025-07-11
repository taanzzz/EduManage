import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaUsers, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import axiosSecure from './../../api/Axios';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const Stats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['site-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/public/stats');
      return res.data;
    },
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const chartData = [
    { name: 'Active Learners', value: stats?.totalUsers || 0, icon: <FaUsers /> },
    { name: 'Expert-Led Courses', value: stats?.totalClasses || 0, icon: <FaChalkboardTeacher /> },
    { name: 'Enrollments', value: stats?.totalEnrollments || 0, icon: <FaUserGraduate /> },
  ];

  const gradients = [
    { id: 'grad1', colors: ['#38BDF8', '#8B5CF6'] },   
    { id: 'grad2', colors: ['#EC4899', '#2DD4BF'] },   
    { id: 'grad3', colors: ['#10B981', '#818CF8'] },   
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-gray-900 font-semibold">
          <p>{name}</p>
          <p className="text-xl">{value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontWeight="700"
        fontSize={14}
        className="drop-shadow-md"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 bg-gradient-to-b from-base-100 via-base-200 to-base-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Gradient Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="w-full h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {gradients.map((grad) => (
                    <linearGradient
                      key={grad.id}
                      id={grad.id}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={grad.colors[0]} />
                      <stop offset="100%" stopColor={grad.colors[1]} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={90}
                  paddingAngle={5}
                  label={renderCustomizedLabel}
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`slice-${index}`}
                      fill={`url(#${gradients[index].id})`}
                      className="cursor-pointer hover:brightness-110 transition duration-300"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Right: Numeric Stats */}
          <div className="space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-5xl font-extrabold text-base-content leading-tight"
            >
              Join a Global Community of{' '}
              <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Lifelong Learners
              </span>
            </motion.h2>

            <div className="space-y-6">
              {chartData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  className="flex items-center gap-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-base-300"
                >
                  <div className="p-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-3xl shadow-md">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-base-content">
                      {isLoading
                        ? '0'
                        : <CountUp end={stat.value} duration={2.5} startOnMount={inView} />}
                    </div>
                    <div className="text-lg font-medium text-base-content/70 mt-1">
                      {stat.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;
