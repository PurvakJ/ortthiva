import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Import from correct paths
import Home from './pages/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Admin from './components/Admin';
import BookAppointment from './components/BookAppointment';
import './App.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Particle Effect Component
function Particles() {
  useEffect(() => {
    const particles = [];
    const particleContainer = document.querySelector('.loader-background');
    
    if (!particleContainer) return;
    
    // Create 30 particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 3 + 's';
      particle.style.animationDuration = 2 + Math.random() * 2 + 's';
      particleContainer.appendChild(particle);
      particles.push(particle);
    }
    
    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);
  
  return null;
}

// Loading Screen Component - Enhanced with all effects
function LoadingScreen({ onLoad }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Show letters one by one (ORTTHIVA - 8 letters)
    let index = 0;
    const letterInterval = setInterval(() => {
      if (index < 8) {
        setCurrentLetterIndex(index);
        index++;
      } else {
        clearInterval(letterInterval);
      }
    }, 120);

    // Simulate loading percentage
    const percentageInterval = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) {
          return prev + Math.floor(Math.random() * 10) + 1;
        }
        clearInterval(percentageInterval);
        return 100;
      });
    }, 200);

    // After 3.5 seconds, start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3200);

    // After 3.8 seconds, complete loading
    const completeTimer = setTimeout(() => {
      if (onLoad) {
        onLoad();
      }
    }, 3800);

    return () => {
      clearInterval(letterInterval);
      clearInterval(percentageInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoad]);

  // Array of letters for the word ORTTHIVA
  const letters = ['O', 'R', 'T', 'T', 'H', 'I', 'V', 'A'];

  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      {/* Background decoration */}
      <div className="loader-background">
        <span>PREMIUM MATTRESSES</span>
        <span>ORTHOPEDIC SUPPORT</span>
        <span>BETTER SLEEP • BETTER LIFE</span>
        <span>GOOD SLEEP • GOOD HEALTH</span>
        <span>QUALITY CRAFTSMANSHIP</span>
      </div>
      
      {/* Floating icons */}
      <div className="furniture-icon">🛌</div>
      <div className="furniture-icon">🩺</div>
      <div className="furniture-icon">🌀</div>
      <div className="furniture-icon">💨</div>
      <div className="furniture-icon">⭐</div>
      <div className="furniture-icon">🛏️</div>
      <div className="furniture-icon">🌿</div>
      <div className="furniture-icon">✨</div>

      {/* Particle Effects */}
      <Particles />

      <div className="loader-content">
        {/* Logo */}
        <div className="logo-wrapper">
          <div className="loader-logo">
            <img 
              src="https://i.postimg.cc/sgCTQHsz/Whats-App-Image-2026-05-07-at-18-40-33-removebg-preview.png" 
              alt="Ortthiva Logo" 
            />
          </div>
          <div className="logo-ring"></div>
          <div className="logo-ring-outer"></div>
        </div>
        
        {/* Text container with sequential letter reveal */}
        <div className="text-container">
          {letters.map((letter, index) => (
            <span 
              key={index} 
              className={`letter ${currentLetterIndex >= index ? 'revealed' : ''}`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div className="tagline-container">
          <span className="tagline">Better Alignment. Better Sleep. Better You.</span>
        </div>

        {/* Loading bar */}
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div className="loading-bar-progress"></div>
          </div>
          <div className="loading-percentage">
            <span>{Math.min(percentage, 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Layout component that conditionally shows Navbar and Footer
function Layout({ children }) {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  
  return (
    <div className="App">
      {!isAdminPage && <Navbar />}
      <main className={`main-content ${isAdminPage ? 'admin-main' : ''}`}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);
    setHasLoaded(true);
  };

  // Prevent showing loading screen again on page navigation
  if (loading && !hasLoaded) {
    return <LoadingScreen onLoad={handleLoadingComplete} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/products" element={
          <Layout>
            <Products />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="/reviews" element={
          <Layout>
            <Reviews />
          </Layout>
        } />
        <Route path="/book-appointment" element={
          <Layout>
            <BookAppointment />
          </Layout>
        } />
        <Route path="/admin" element={
          <Layout>
            <Admin />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;