import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mattress layer data based on your images
  const mattressLayers = [
    {
      id: 1,
      name: "Gel-Infused Memory Foam",
      shortName: "GEL-INFUSED MEMORY FOAM",
      description: "Premium gel-infused memory foam that contours to your body shape, providing exceptional pressure relief and heat dissipation. The gel particles actively work to pull heat away from your body, keeping you cool throughout the night.",
      thickness: "2 inches",
      benefits: ["Pressure relief", "Temperature regulation", "Body contouring"],
      color: "#5B7B9A",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/48/MemoryFoam-fast.jpg",
      layerImage: "https://www.ikea.com.hk/dairyfarm/hk/pageImages/page__en_hk_1640767060__152278126.jpeg"
    },
    {
      id: 2,
      name: "Latex Hybrid Comfort Layer",
      shortName: "LATEX HYBRID COMFORT LAYER",
      description: "Natural latex blended with responsive foam creates a buoyant, supportive surface that gently cradles your body while maintaining proper spinal alignment. Highly breathable and naturally hypoallergenic.",
      thickness: "1.5 inches",
      benefits: ["Natural breathability", "Responsive support", "Hypoallergenic"],
      color: "#D4A574",
      image: "https://s.alicdn.com/@sc04/kf/H4979158b14f84e12ba3669758c629a2b9/Hotel-Thailand-Tpe-Silicone-Organic-Layer-Rubber-Bed-Pure-100-Natural-100-Latex-Mattress-king-Queen-Size.jpg",
      layerImage: "https://m.media-amazon.com/images/I/71DLjp3yDBL._AC_UF350,350_QL80_.jpg"
    },
    {
      id: 3,
      name: "Open-Cell Ventilated Layer",
      shortName: "OPEN-CELL VENTILATED",
      description: "Advanced open-cell structure allows maximum airflow through the mattress, preventing heat buildup and moisture accumulation. Each cell is designed to promote continuous air circulation.",
      thickness: "1 inch",
      benefits: ["Maximum airflow", "Moisture wicking", "Temperature neutral"],
      color: "#8DB6CE",
      image: "https://ecoterrabeds.com/cdn/shop/articles/latex_topper_thumbnail_16aa95e2-4b0e-4c74-a702-bb629aef40a7.jpg?v=1684509301",
      layerImage: "https://www.plushbeds.com/cdn/shop/articles/29112959074.png?v=1773030524"
    },
    {
      id: 4,
      name: "High-Density Transition Foam",
      shortName: "HIGH-DENSITY TRANSITION FOAM",
      description: "Acts as a bridge between the comfort layers and support core, providing graduated support that prevents sagging while ensuring proper spinal alignment. Prevents you from feeling the support coils.",
      thickness: "1.5 inches",
      benefits: ["Graduated support", "Prevents sagging", "Motion isolation"],
      color: "#7BA67B",
      image: "https://www.americanmicroinc.com/wp-content/uploads/2023/02/01-high-density-foam-vs-polyurethane-foam.jpg",
      layerImage: "https://i.postimg.cc/vZV9wGVW/Gemini-Generated-Image-ymtdxdymtdxdymtd.jpg"
    },
    {
      id: 5,
      name: "Pocketed Individual Coils",
      shortName: "POCKETED INDIVIDUAL COILS",
      description: "Individually wrapped coils work independently to provide targeted support where you need it most. Each coil responds to your body's movement without disturbing your partner's sleep.",
      thickness: "6 inches",
      benefits: ["Targeted support", "Zero motion transfer", "Edge support"],
      color: "#A0A0A0",
      image: "https://cdn.shopify.com/s/files/1/0389/7812/5956/files/2_6.jpg?v=1752475994",
      layerImage: "https://m.media-amazon.com/images/I/71Jcm-ziRtL.jpg"
    }
  ];


  // Full mattress images (replace with your actual images)
  const fullMattressImages = [
    "https://www.rentomojo.com/blog/wp-content/uploads/2025/08/what-is-a-memory-foam-mattress.png",
    "https://i.postimg.cc/t4xPG9xW/Gemini-Generated-Image-lnp16flnp16flnp1.jpg",
    "https://i.postimg.cc/vZV9wGVW/Gemini-Generated-Image-ymtdxdymtdxdymtd.jpg"
  ];

  const [currentFullImage, setCurrentFullImage] = useState(0);

  const handleLayerClick = (layer) => {
    setSelectedLayer(layer);
    setIsExpanded(true);
  };

  const closeExpanded = () => {
    setIsExpanded(false);
    setSelectedLayer(null);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-badge">EST. 2024</div>
          <h1>Ortthiva</h1>
          <div className="hero-tagline">Good Sleep • Good Health • Better Life</div>
          <p>Crafted for Better Alignment. Designed for Better Sleep.</p>
          <div className="hero-cta">
            <Link to="/products" className="hero-btn primary">Explore Collection</Link>
            <a href="#story" className="hero-btn secondary">Our Story</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Sleepers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Warranty</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Non-Toxic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story" id="story">
        <div className="container">
          <div className="story-content">
            <div className="section-badge">Our Journey</div>
            <h2>The Ortthiva <span>Story</span></h2>
            <p>Ortthiva was born from a single belief: <strong>better alignment leads to better sleep, and better sleep leads to a better life</strong>. As a premium mattress manufacturing brand, we've dedicated ourselves to engineering sleep solutions that merge orthopedic precision with luxurious comfort.</p>
            <p>While others cut corners, we layer excellence — from high-density foams and breathable fabrics to doctor-recommended spinal support. Every Ortthiva mattress is crafted to provide the perfect balance of pressure relief and long-lasting durability, ensuring you wake up refreshed, revitalized, and ready to embrace each day.</p>
            <div className="story-highlight">
              <div className="highlight-icon">🇮🇳</div>
              <div className="highlight-text">
                <strong>Proudly Made in India</strong>
                <span>Crafted in state-of-the-art facilities with safe, non-toxic materials</span>
              </div>
            </div>
          </div>
          <div className="story-image">
            <div className="image-overlay">
            </div>
          </div>
        </div>
      </section>

      {/* Mattress Layering Visualization Section - NEW */}
      <section className="mattress-layers-section">
        <div className="container">
          <div className="section-badge center">Engineering Excellence</div>
          <h2>What's Inside an <span>Ortthiva Mattress</span></h2>
          <p className="section-subtitle">
            Premium materials layered with precision for optimal comfort and support
          </p>

          {/* Full Mattress View */}
          <div className="full-mattress-view">
            <div className="full-mattress-header">
              <h3>The Complete Mattress</h3>
              <p>5 carefully engineered layers working in perfect harmony</p>
            </div>
            <div className="full-mattress-carousel">
              <button 
                className="carousel-nav prev-image"
                onClick={() => setCurrentFullImage((prev) => (prev - 1 + fullMattressImages.length) % fullMattressImages.length)}
              >
                ❮
              </button>
              <div className="full-mattress-image">
                <img src={fullMattressImages[currentFullImage]} alt="Ortthiva Complete Mattress" />
                <div className="mattress-badge">
                  <span>5 Layers</span>
                  <span>Premium Construction</span>
                </div>
              </div>
              <button 
                className="carousel-nav next-image"
                onClick={() => setCurrentFullImage((prev) => (prev + 1) % fullMattressImages.length)}
              >
                ❯
              </button>
              <div className="carousel-dots">
              {fullMattressImages.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentFullImage === index ? 'active' : ''}`}
                  onClick={() => setCurrentFullImage(index)}
                />
              ))}
            </div>
            </div>
          </div>

{/* Multi-Layer Stack View */}
<div className="multi-layer-view">
  <h3>The Layer Stack</h3>
  <p>Click on any layer to explore its features</p>
  
  
  {/* Inner Layers Stack */}
  <div className="layer-stack">
    {mattressLayers.map((layer, index) => (
      <div 
        key={layer.id}
        className={`layer-item ${selectedLayer?.id === layer.id ? 'active' : ''}`}
        style={{ borderLeftColor: layer.color }}
        onClick={() => handleLayerClick(layer)}
      >
        <div className="layer-number">{mattressLayers.length - index}</div>
        <div className="layer-image-thumb">
          <img src={layer.image} alt={layer.name} />
        </div>
        <div className="layer-info">
          <h4>{layer.shortName}</h4>
          <span className="layer-thickness">{layer.thickness}</span>
        </div>
        <div className="layer-arrow">→</div>
      </div>
    ))}
  </div>
</div>
{/* Expanded Layer Details Modal */}
{isExpanded && selectedLayer && (
  <div className="layer-expanded-modal" onClick={closeExpanded}>
    <div className="layer-expanded-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-modal" onClick={closeExpanded}>×</button>
      
      {/* Layer Image Section */}
      <div className="expanded-layer-visual">
        <div className="expanded-layer-image">
          <img 
            src={selectedLayer.isOuter ? selectedLayer.image : selectedLayer.layerImage || selectedLayer.image} 
            alt={selectedLayer.name}
          />
        </div>
      </div>
      
      <div className="expanded-layer-details">
        <h3>{selectedLayer.name}</h3>
        {!selectedLayer.isOuter && (
          <div className="layer-spec">
            <span className="spec-label">Thickness:</span>
            <span className="spec-value">{selectedLayer.thickness}</span>
          </div>
        )}
        {selectedLayer.isOuter && (
          <div className="layer-spec">
            <span className="spec-label">Type:</span>
            <span className="spec-value">Removable & Washable Cover</span>
          </div>
        )}
        <p className="layer-description">{selectedLayer.description}</p>
        <div className="layer-benefits">
          <h4>Key Benefits</h4>
          <ul>
            {selectedLayer.benefits.map((benefit, i) => (
              <li key={i}>✓ {benefit}</li>
            ))}
          </ul>
        </div>
        <div className="expanded-cta">
          <Link to="/products" className="btn-view-layer">
            Shop Mattresses with {selectedLayer.isOuter ? 'This Cover' : 'This Layer'}
          </Link>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="section-badge center">Our Purpose</div>
          <h2>Mission & Vision</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To transform sleep health across India by delivering orthopedically engineered mattresses that provide exceptional spinal alignment, pressure relief, and lasting comfort — all at honest value.</p>
              <div className="mission-stats">
                <div>✓ 50,000+ Lives Transformed</div>
                <div>✓ 98% Customer Satisfaction</div>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To become India's most trusted mattress brand, recognized for our uncompromising quality, doctor-recommended designs, and commitment to helping every sleeper achieve their best rest.</p>
              <div className="mission-stats">
                <div>✓ #1 Orthopedic Mattress Brand</div>
                <div>✓ 500+ Cities Served</div>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💎</div>
              <h3>Core Values</h3>
              <p>Orthopedic Excellence • Premium Quality • Skin-Friendly Comfort • Durability & Safety • Customer Wellness First</p>
              <div className="mission-stats">
                <div>✓ ISO Certified</div>
                <div>✓ Doctor Recommended</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="container">
          <div className="section-badge center">Why Choose Us</div>
          <h2>Ortthiva Stands Apart</h2>
          <p className="section-subtitle">
            Engineered with precision. Designed for perfection.
          </p>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">🛏️</div>
              <h3>Orthopedic Support</h3>
              <p>Engineered to maintain proper spine alignment, reducing back pain and promoting healthier sleep posture.</p>
              <div className="feature-tag">Doctor Approved</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">⏳</div>
              <h3>Long-Lasting Durability</h3>
              <p>Premium materials and rigorous construction ensure your mattress maintains its shape and support for years.</p>
              <div className="feature-tag">5+ Years Warranty</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🩺</div>
              <h3>Doctor Recommended</h3>
              <p>Trusted by healthcare professionals for its therapeutic benefits and quality craftsmanship.</p>
              <div className="feature-tag">1000+ Doctors Trust</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🇮🇳</div>
              <h3>Made in India</h3>
              <p>Crafted in our state-of-the-art facilities with safe, non-toxic materials and strict quality checks.</p>
              <div className="feature-tag">Proudly Indian</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🌙</div>
              <h3>Enhanced Sleep Comfort</h3>
              <p>Advanced comfort layers adapt to your body shape, delivering pressure relief and uninterrupted deep sleep.</p>
              <div className="feature-tag">Luxury Comfort</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">💨</div>
              <h3>Breathable Cooling Design</h3>
              <p>Built with airflow-friendly materials that help regulate temperature and keep you cool throughout the night.</p>
              <div className="feature-tag">Cool Sleep Tech</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5<span>+</span></div>
              <div className="stat-label">Years Warranty</div>
              <div className="stat-desc">Comprehensive coverage</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50k<span>+</span></div>
              <div className="stat-label">Happy Sleepers</div>
              <div className="stat-desc">Across India</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100<span>%</span></div>
              <div className="stat-label">Non-Toxic</div>
              <div className="stat-desc">Safe materials</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8<span>hrs</span></div>
              <div className="stat-label">Better Sleep</div>
              <div className="stat-desc">Guaranteed rest</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="about-testimonials">
        <div className="container">
          <div className="section-badge center">Testimonials</div>
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-icon">“</div>
              <p>After using Ortthiva mattress, my back pain has significantly reduced. The orthopedic support is truly amazing!</p>
              <div className="customer-info">
                <div className="customer-avatar">RK</div>
                <div className="customer-details">
                  <h4>Rahul Kumar</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">“</div>
              <p>The breathable fabric keeps me cool all night. Best investment I've made for my health.</p>
              <div className="customer-info">
                <div className="customer-avatar">SP</div>
                <div className="customer-details">
                  <h4>Sunita Patel</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">“</div>
              <p>Quality is top-notch. The durability and comfort are unmatched. Highly recommended!</p>
              <div className="customer-info">
                <div className="customer-avatar">AM</div>
                <div className="customer-details">
                  <h4>Amit Mehta</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Rediscover Deep Sleep?</h2>
          <p>Join 50,000+ happy sleepers who wake up refreshed with Ortthiva's orthopedic comfort.</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn-primary">Explore Mattresses</Link>
            <a href="tel:+918054080555" className="btn-primary">Request a Callback</a>
          </div>
          <div className="cta-features">
            <span>✓ Free Delivery</span>
            <span>✓ 100 Night Trial</span>
            <span>✓ Easy Returns</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;