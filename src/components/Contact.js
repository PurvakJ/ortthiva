import React, { useState } from 'react';
import { bookAppointment } from '../api';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    mattressType: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await bookAppointment(formData);
      setSubmitted(true);
      setFormData({ 
        name: '', 
        phone: '', 
        email: '', 
        message: '',
        preferredDate: '',
        preferredTime: '',
        mattressType: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappNumber = '917696329012'; // Remove + for WhatsApp API
  const whatsappMessage = encodeURIComponent("Hello Ortthiva, I'm interested in your premium mattresses. I would like to know more about your products and consultation services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-badge">Ortthiva Sleep Consultancy</div>
          <div className="hero-icon">🛌</div>
          <h1>Contact <span>Ortthiva</span></h1>
          <p>Experience the perfect blend of orthopedic support and luxurious comfort</p>
          <div className="hero-buttons">
            <a href="tel:+917696329012" className="hero-call-btn">
              📞 Call Now: +91 76963 29012
            </a>
            <a href="tel:+917696341505" className="hero-call-btn">
              📞 Call Now: +91 76963 41505
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hero-wa-btn">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Our Experts</h3>
              <p><strong>
                <a href="tel:+917696329012">+91 76963 29012</a>
                <br></br>
                <a href="tel:+917696341505">
              +91 76963 41505
            </a>
              </strong></p>
              <small>Mon-Sat, 10 AM - 7 PM</small>
              <small>Sunday: Closed</small>
            </div>
            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>WhatsApp Support</h3>
              <p><strong>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </strong></p>
              <small>Quick responses for queries</small>
              <small>Share your sleep concerns</small>
            </div>
            <div className="info-card">
              <div className="info-icon">🕒</div>
              <h3>Showroom Hours</h3>
              <p><strong>Monday - Saturday:</strong><br />10:00 AM - 7:00 PM<br />
              <strong>Sunday:</strong><br />By Appointment Only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            <div className="form-info">
              <div className="form-info-badge">Free Consultation</div>
              <h2>Book Your <span>Sleep Assessment</span></h2>
              <p>Schedule a free consultation with our sleep experts at Ortthiva Experience Center. Get personalized mattress recommendations based on your sleep posture and comfort needs.</p>
              <div className="benefits-list">
                <h4>Why book with Ortthiva:</h4>
                <ul>
                  <li>✓ Free spinal alignment assessment</li>
                  <li>✓ Try our orthopedic mattress collection</li>
                  <li>✓ Doctor-recommended solutions</li>
                  <li>✓ Exclusive consultation offers</li>
                  <li>✓ Free delivery & installation</li>
                  <li>✓ 5+ years comprehensive warranty</li>
                  <li>✓ 100% non-toxic materials</li>
                </ul>
              </div>
              <div className="trust-badge">
                <span>🏆 Trusted by 50,000+ Sleepers</span>
                <span>🩺 Recommended by Doctors</span>
              </div>
            </div>

            <div className="form-wrapper">
              {submitted && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  Consultation booked successfully! Our sleep expert will contact you within 24 hours at <strong>{formData.phone}</strong>.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name <span>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number <span>*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Which mattress type interests you?</label>
                  <select
                    name="mattressType"
                    value={formData.mattressType}
                    onChange={handleChange}
                  >
                    <option value="">Select mattress type</option>
                    <option value="orthopedic">Orthopedic Support Mattress</option>
                    <option value="memory_foam">Memory Foam Mattress</option>
                    <option value="latex">Natural Latex Mattress</option>
                    <option value="hybrid">Hybrid Mattress</option>
                    <option value="not_sure">Not sure - Need consultation</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    >
                      <option value="">Select time slot</option>
                      <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                      <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                      <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
                      <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                      <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                      <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                      <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Tell us about your sleep concerns</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Share your sleep issues, back pain concerns, or specific requirements. Our experts will help you find the perfect mattress for better sleep."
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner"></span> Booking...
                    </>
                  ) : (
                    'Schedule Free Consultation →'
                  )}
                </button>
              </form>

              <div className="form-footer-note">
                <p>✨ Our sleep experts will contact you within 24 hours to confirm your appointment and understand your sleep needs better.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-badge">Visit Us</div>
          <h2>Find Our <span>Experience Center</span></h2>
          <p className="map-subtitle">Jawaharke Road, Sadar Mansa Near Ganga Oil Mill, Mansa (151505)</p>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1727.9033196986102!2d75.3960125750419!3d29.984986497437443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39111ed2fd22ed47%3A0xcf705314bc7a433b!2sSadar%2C%20Mansa%2C%20Punjab%20151505!5e0!3m2!1sen!2sin!4v1778162967413!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ortthiva Experience Center Location"
            ></iframe>
          </div>
          <div className="map-directions">
            <a 
              href="https://maps.google.com/?q=Near+Haryali+Pump+Maur+Mandi+Bathinda" 
              target="_blank" 
              rel="noopener noreferrer"
              className="directions-btn"
            >
              🗺️ Get Directions to Experience Center →
            </a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-directions-btn"
            >
              💬 Ask for Directions on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="contact-trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🩺</span>
              <div>
                <h4>Doctor Recommended</h4>
                <p>Trusted by healthcare professionals</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🇮🇳</span>
              <div>
                <h4>Made in India</h4>
                <p>Premium quality craftsmanship</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div>
                <h4>5+ Year Warranty</h4>
                <p>Comprehensive coverage</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <div>
                <h4>50,000+ Happy Sleepers</h4>
                <p>Across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;