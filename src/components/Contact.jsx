import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
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

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">For More Information & Enrollment</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Contact Person</h3>
            <p>Mr. Phani Babu (Marketing Head)</p>
            <h3>Phone Number</h3>
            <p><a href="tel:+919177726263">+91 91777 26263</a></p>
            <h3>Email</h3>
            <p>prepsprintcareers@gmail.com</p>

          </div>
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
                <button type="submit" className="btn">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
