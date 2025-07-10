import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const AnimatedCounter = ({ value }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                transition: { duration: 0.5 }
            });
        }
    }, [controls, inView]);
    
    
    return (
        <motion.span ref={ref} initial={{ opacity: 0 }} animate={controls}>
            {value}
        </motion.span>
    );
};

export default AnimatedCounter;