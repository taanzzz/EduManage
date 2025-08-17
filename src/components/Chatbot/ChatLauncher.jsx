import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { HiSparkles } from "react-icons/hi2";
import axiosSecure from '../../api/Axios';
import { AuthContext } from '../../contexts/AuthProvider';
import { useTheme } from '../../hooks/useTheme';


// Lottie Animation Component
const LottieAnimation = ({ src, className }) => {
  const ref = useRef(null);


  useEffect(() => {
    import('@lottiefiles/lottie-player');
  }, []);


  return (
    <lottie-player
      ref={ref}
      src={src}
      background="transparent"
      speed="1"
      className={className}
      loop
      autoplay
    />
  );
};


// Chat Window Component
const ChatWindow = ({ onClose }) => {
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { role: 'model', text: `Hi ${user?.displayName || 'there'}! How can I assist you with our courses?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const demoQuestions = [
    "How many courses are available?",
    "Who are the instructors?",
    "Tell me about the Web Development course.",
  ];


  const handleSendMessage = async (e, predefinedQuestion = '') => {
    if (e) e.preventDefault();
    const messageToSend = predefinedQuestion || input;
    if (!messageToSend.trim()) return;


    const userMessage = { role: 'user', text: messageToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!predefinedQuestion) setInput('');
    setIsLoading(true);


    try {
      const historyForAPI = messages.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
      const res = await axiosSecure.post('/api/chat', { message: messageToSend, history: historyForAPI });
      const modelMessage = { role: 'model', text: res.data.response };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting.' }]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }}
      className={`fixed z-[1000] bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[calc(100vw-48px)] max-w-sm h-[75vh] max-h-[600px] ${getThemeClasses.cardBackground} backdrop-blur-xl rounded-3xl ${getThemeClasses.shadowLg} flex flex-col border ${
        isDark ? 'border-slate-700/50' : 'border-gray-200/50'
      } overflow-hidden ${hoverGlow}`}
    >
      {/* Header */}
      <div className={`p-4 ${
        isDark
          ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500'
          : 'bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500'
      } text-white rounded-t-3xl flex justify-between items-center relative overflow-hidden`}>

        {/* Background animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
            backgroundSize: '20px 20px'
          }}
        />


        <div className="flex items-center gap-3 relative z-10">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <HiSparkles className="text-white text-2xl drop-shadow-lg" />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg drop-shadow-md">EduManage AI</h3>
            <p className="text-xs text-white/80">Your Learning Assistant</p>
          </div>
        </div>


        <motion.button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 relative z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes className="text-lg" />
        </motion.button>
      </div>


      {/* Messages */}
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`chat-bubble text-sm shadow-lg px-4 py-3 transition-all duration-300 relative overflow-hidden ${
                msg.role === 'user'
                  ? `${
                      isDark
                        ? 'bg-gradient-to-br from-cyan-500 to-teal-500'
                        : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    } text-white`
                  : `${getThemeClasses.cardBackground} ${getThemeClasses.primaryText} border ${
                      isDark ? 'border-slate-600/50' : 'border-gray-200/50'
                    }`
              } max-w-[85%]`}
            >
              {/* Shimmer effect for AI messages */}
              {msg.role === 'model' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              )}
              <span className="relative z-10">{msg.text}</span>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            className="chat chat-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={`chat-bubble ${getThemeClasses.cardBackground} border ${
              isDark ? 'border-slate-600/50' : 'border-gray-200/50'
            } flex items-center gap-2`}>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      isDark ? 'bg-cyan-400' : 'bg-green-500'
                    }`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <span className={`text-sm ${getThemeClasses.mutedText}`}>AI is thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>


      {/* Demo Questions */}
      {messages.length === 1 && (
        <motion.div
          className={`p-4 border-t ${
            isDark ? 'border-slate-700/50' : 'border-gray-200/50'
          } space-y-3`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className={`text-sm text-center ${getThemeClasses.mutedText} font-medium`}>
            Quick questions to get started:
          </p>
          <div className="space-y-2">
            {demoQuestions.map((q, i) => (
              <motion.button
                key={i}
                onClick={(e) => handleSendMessage(e, q)}
                className={`w-full text-left px-4 py-3 ${getThemeClasses.cardBackground} hover:${
                  isDark ? 'bg-slate-700' : 'bg-gray-100'
                } ${getThemeClasses.primaryText} rounded-xl text-sm transition-all duration-200 border ${
                  isDark ? 'border-slate-600/30 hover:border-cyan-400/50' : 'border-gray-200/50 hover:border-green-400/50'
                } ${hoverGlow}`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {q}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}


      {/* Input Area */}
      <div className={`p-4 border-t ${
        isDark ? 'border-slate-700/50' : 'border-gray-200/50'
      } ${getThemeClasses.cardBackground}`}>
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our courses..."
            className={`flex-1 px-4 py-3 ${getThemeClasses.cardBackground} ${getThemeClasses.primaryText} placeholder:${getThemeClasses.mutedText} border ${
              isDark ? 'border-slate-600/50 focus:border-cyan-400/50' : 'border-gray-300/50 focus:border-green-400/50'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-${
              isDark ? 'cyan' : 'green'
            }-400/30 transition-all duration-200 backdrop-blur-sm`}
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            className={`px-4 py-3 ${
              isDark
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
            } text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane className="text-lg" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};


// Main ChatLauncher Component
const ChatLauncher = () => {
    const { isDark, getThemeClasses, hoverGlow } = useTheme();
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            {/* Chat Window */}
            <AnimatePresence mode="wait">
                {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
            </AnimatePresence>


            {/* Floating Chat Button */}
            <motion.div
                className="fixed top-150 bottom-6 right-6 z-[1001]"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5
                }}
            >
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-16 h-16 md:w-18 md:h-18 lg:w-90 lg:h-90 text-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 ${
                        isOpen
                            ? 'bg-transparent'
                            : `${isDark ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500' : 'bg-gradient-to-br from-green-500 via-emerald-500 to-lime-500'} ${getThemeClasses.shadowLg} group ${hoverGlow}`
                    }`}
                    aria-label={isOpen ? "Close Chat" : "Open Chat"}
                    whileHover={{
                        scale: 1.1,
                        rotate: isOpen ? 180 : 360,
                        boxShadow: !isOpen ? (isDark
                            ? "0 0 30px rgba(6, 182, 212, 0.4)"
                            : "0 0 30px rgba(34, 197, 94, 0.4)") : 'none'
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Background animation */}
                    {!isOpen && (
                        <motion.div
                            className="absolute inset-0 opacity-20"
                            animate={{
                                rotate: [0, 360]
                            }}
                            transition={{
                                duration: 20,
                                ease: 'linear',
                                repeat: Infinity,
                            }}
                            style={{
                                background: 'conic-gradient(from 0deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.3) 100%)'
                            }}
                        />
                    )}


                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isOpen ? 'close' : 'robot'}
                            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10"
                        >
                            {isOpen ? (
                                <FaTimes className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 drop-shadow-lg" />
                            ) : (
                                <div className="w-15 h-15 md:w-9 md:h-9 lg:w-80 lg:h-80">
                                    <LottieAnimation
                                        src="https://res.cloudinary.com/dwkj2w1ds/raw/upload/v1754731759/Robot_Futuristic_Ai_animated_cpocf8.json"
                                        className="w-full h-full"
                                    />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>


                    {/* Pulse effect */}
                    {!isOpen && (
                        <>
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-white/30"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-white/20"
                                animate={{
                                    scale: [1, 2, 1],
                                    opacity: [0.3, 0, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                            />
                        </>
                    )}
                </motion.button>


                {/* Floating notification dot */}
                {!isOpen && (
                    <motion.div
                        className={`absolute -top-1 -right-1 w-4 h-4 ${
                            isDark ? 'bg-cyan-400' : 'bg-green-400'
                        } rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <motion.div
                            className="w-2 h-2 bg-white rounded-full"
                            animate={{
                                opacity: [1, 0, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                )}
            </motion.div>
        </>
    );
};


export default ChatLauncher;