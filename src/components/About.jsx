import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://img.freepik.com/free-vector/coworking-concept-illustration_114360-5921.jpg?ga=GA1.1.2034555587.1732518228&semt=ais_hybrid&w=740"
            alt="Training Program"
          />
        </div>

        {/* Text Content Section */}
        <div className="about-content">
          <h2>About The Program</h2>
          <p>
           <strong>PrepSprint is a 6-month training program that helps students and job seekers gain the technical and professional skills needed for jobs. It includes online classes, offline exams, practical projects, expert guidance, and mock interviews to make participants job-ready and confident.</strong>
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default About;
