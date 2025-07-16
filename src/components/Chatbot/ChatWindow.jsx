import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { HiSparkles } from "react-icons/hi2";
import axiosSecure from '../../api/Axios';
import { AuthContext } from '../../contexts/AuthProvider';

const ChatWindow = ({ onClose }) => {
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed z-[1000] bottom-24 right-5 w-[calc(100vw-40px)] max-w-sm h-[75vh] max-h-[600px] bg-white/20 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.2)] flex flex-col border border-white/30"
    >
      
      <div className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-3xl flex justify-between items-center">
        <div className="flex items-center gap-2 animate-pulse">
          <HiSparkles className="text-white text-2xl" />
          <h3 className="font-semibold text-lg">EduManage AI Assistance</h3>
        </div>
      </div>

      
      <div className="flex-1 px-4 py-2 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-purple-400">
        {messages.map((msg, index) => (
          <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div
              className={`chat-bubble text-sm shadow-md px-4 py-2 transition-all duration-300 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white'
                  : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat chat-start">
            <div className="chat-bubble bg-white/70">
              <span className="loading loading-dots loading-md text-purple-600"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      
      {messages.length === 1 && (
        <div className="p-4 border-t border-white/30 space-y-2">
          <p className="text-sm text-center text-white/70">Or try asking one of these:</p>
          {demoQuestions.map((q, i) => (
            <button
              key={i}
              onClick={(e) => handleSendMessage(e, q)}
              className="w-full text-left px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      
      <div className="p-4 border-t border-white/30 bg-white/5">
        <form onSubmit={handleSendMessage} className="join w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our courses..."
            className="input join-item w-full bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn join-item bg-gradient-to-tr from-purple-500 to-indigo-500 text-white hover:brightness-110 transition-all"
            disabled={isLoading || !input.trim()}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
