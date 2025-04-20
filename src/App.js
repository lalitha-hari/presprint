import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Highlights from './components/Highlights';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import botGif from './components/Chatbot/bot.gif';
import DialogForm from './components/DialogForm'; 

function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true); 

  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Highlights />
      <Courses />
      <Contact />
      <Footer />
      <Chatbot open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      <button 
        className="chatbot-toggle"
        onClick={() => setChatbotOpen(!chatbotOpen)}
      >
        <img 
          src={botGif}
          alt="Chatbot"
          style={{ width: "100px", height: "100px" }} 
        />
      </button>

      {/* Dialog shown when dialogOpen is true */}
      <DialogForm open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}

export default App;
