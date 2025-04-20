import React, { useState } from 'react';
import './DialogForm.css';

const DialogForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    education: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://sheetdb.io/api/v1/np8l9o5dtpdn9', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          name: formData.name,
          email: formData.email,
          phonenumber: formData.phonenumber,
          education: formData.education,
          message: formData.message
        }]),
      });

      if (response.ok) {
        setSubmitted(true); // Show thank you message
        setFormData({
          name: '',
          email: '',
          phonenumber: '',
          education: '',
          message: ''
        }); // Reset form fields
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <button className="dialog-close" onClick={onClose}>
          &times;
        </button>

        <h2>Enrollment Form</h2>

        {/* Contact Form Inside Dialog */}
        <div className="contact-form">
          {submitted ? (
            <p className="thank-you">Thank you for your message!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Your Education"
                  required
                />
              </div>
              <button type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogForm;
