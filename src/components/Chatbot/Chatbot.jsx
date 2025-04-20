import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import ChatMessage from './ChatMessage';
import botGif from './bot.gif'; // You'll need to add a GIF file

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! 👋 How can I help you today?", 
      sender: 'bot',
      avatar: botGif
    },
    { 
      text: "Here are some things you can ask about:", 
      sender: 'bot',
      type: 'index',
      avatar: botGif
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const courseList = [
    "GitHub – Version Control Mastery",
    "Programming for Problem Solving",
    "Data Structures & Algorithms",
    "HTML, CSS & JavaScript",
    "React JS + MERN Stack",
    "Placement Preparation & Mock Interviews"
  ];

  const courseDetails = {
    "GitHub – Version Control Mastery": "🛠 Learn Git, GitHub, branches, merge, and versioning best practices.",
    "Programming for Problem Solving": "💡 Focuses on Python/Java fundamentals, logic building, and coding basics.",
    "Data Structures & Algorithms": "📚 Covers arrays, linked lists, stacks, queues, trees, and more.",
    "HTML, CSS & JavaScript": "🎨 Build beautiful, responsive websites with HTML, CSS, and JS.",
    "React JS + MERN Stack": "⚛️ Dive deep into MongoDB, Express, React, and Node.js to build full-stack apps.",
    "Placement Preparation & Mock Interviews": "🎯 Get ready with mock interviews, aptitude, and HR/Tech rounds."
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const question = inputValue.toLowerCase();
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    setIsTyping(true);
    setInputValue('');

    setTimeout(() => {
      handleBotResponse(question);
      setIsTyping(false);
    }, 1000);
  };

  const handleBotResponse = (question) => {
    let response = {
      text: "😕 Sorry, I didn't understand that. Try asking about the program, highlights, courses, duration, fee, or contact.",
      avatar: botGif
    };

    if (question.includes('about') || question.includes('program')) {
      response.text = "📘 PrepSprint is a 6-month immersive training program designed to bridge academic knowledge and industry readiness.";
    } else if (question.includes('highlight') || question.includes('feature')) {
      response.text = "✅ 100% Placement Assistance\n🟡 Trained by IIITH Grads\n🟢 Project-Based Learning\n🟣 Online/Offline Exams\n🟩 FREE Soft Skills Training";
    } else if (question.includes('course') || question.includes('subject')) {
      response.text = "📚 We offer the following courses. Please select one to know more:";
      setShowCourseOptions(true);
    } else if (question.includes('duration') || question.includes('long')) {
      response.text = "⏳ The program runs for 6 months, designed for deep skill development.";
    } else if (question.includes('fee') || question.includes('price') || question.includes('cost')) {
      response.text = "💰 The total fee is ₹2.5 Lakhs, including training, evaluation, projects, and placement support.";
    } else if (question.includes('contact') || question.includes('phone') || question.includes('reach')) {
      response.text = "📞 Contact Mr. Phani Babu at +91 91777 26263 for more information.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, response]);
    }, 500);
  };

  const handleIndexClick = (label) => {
    setMessages(prev => [...prev, { text: label, sender: 'user' }]);
    setIsTyping(true);
    setTimeout(() => {
      handleBotResponse(label.toLowerCase());
      setIsTyping(false);
    }, 1000);
  };

  const handleCourseSelect = (course) => {
    const detail = courseDetails[course];
    setMessages(prev => [
      ...prev,
      { text: `📘 ${course}`, sender: 'user' },
      { text: detail, sender: 'bot', avatar: botGif }
    ]);
    setShowCourseOptions(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!open) return null;

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <img src={botGif} alt="Bot" className="header-bot-avatar" />
          <h3>PrepSprint Assistant</h3>
        </div>
        <button onClick={onClose} className="close-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <React.Fragment key={idx}>
            <ChatMessage 
              text={msg.text} 
              sender={msg.sender} 
              avatar={msg.avatar}
              typing={msg.sender === 'bot' && idx === messages.length - 1 && isTyping}
            />
            {msg.type === 'index' && (
              <div className="index-options">
                {['About Program', 'Highlights', 'Courses', 'Duration', 'Contact'].map((option, i) => (
                  <button key={i} onClick={() => handleIndexClick(option)}>{option}</button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
        {showCourseOptions && (
          <div className="course-options">
            {courseList.map((course, index) => (
              <button key={index} onClick={() => handleCourseSelect(course)}>{course}</button>
            ))}
          </div>
        )}
        {isTyping && messages[messages.length - 1].sender === 'user' && (
          <ChatMessage 
            text="" 
            sender="bot" 
            avatar={botGif}
            typing={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping}>
          {isTyping ? (
            <div className="dots-animation">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
