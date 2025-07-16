import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import ChatWindow from './ChatWindow';

const ChatLauncher = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            
            <AnimatePresence>
                {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
            </AnimatePresence>

            
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 w-16 h-16 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-lg z-[1001]"
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'robot'}
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <AiOutlineClose className="w-8 h-8" /> : <FaRobot className="w-8 h-8" />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </>
    );
};

export default ChatLauncher;