// pages/Home.js or components/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getReviews, addReview } from '../api';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const phoneNumber = '+917696329012';
  const whatsappNumber = '917696329012';
  const whatsappMessage = encodeURIComponent("Hello Ortthiva, I'm interested in your premium mattresses. I'd like to know more about your products and consultation services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Carousel images for Ortthiva
  const carouselImages = [
    {
      url: "https://mysleepyhead.com/cdn/shop/files/Original_PDP_5.jpg?v=1768928275&width=1946",
      title: "Orthopedic Support",
      subtitle: "Perfect Spinal Alignment for Better Sleep"
    },
    {
      url: "https://www.duroflexworld.com/cdn/shop/files/2_2026e6ee-a9e8-4ff5-88c7-104fea9cefb8.jpg?v=1744560694",
      title: "Premium Memory Foam",
      subtitle: "Pressure Relief Technology"
    },
    {
      url: "https://www.rentomojo.com/blog/wp-content/uploads/2025/08/benefits-of-orthopedic-mattress.png",
      title: "Breathable Fabric",
      subtitle: "Cool & Comfortable Sleep Experience"
    },
    {
      url: "https://images-cdn.ubuy.co.in/669eeae2e620e2469e48f254-3-inch-memory-foam-mattress-topper.jpg",
      title: "Doctor Recommended",
      subtitle: "Trusted by Healthcare Professionals"
    }
  ];

  const getCategoryDisplayName = useCallback((categoryValue) => {
    const displayNames = {
      'orthopedic': 'Orthopedic Support',
      'memory-foam': 'Memory Foam',
      'latex': 'Natural Latex',
      'hybrid': 'Hybrid Mattress',
      'back-pain': 'Back Pain Relief',
      'couple': 'Couple Mattress',
      'kids': 'Kids Mattress',
      'luxury': 'Luxury Collection'
    };
    return displayNames[categoryValue] || 
           categoryValue?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }, []);

  const getCategoryIcon = useCallback((category) => {
    const icons = {
      'orthopedic': '🩺',
      'memory-foam': '🌀',
      'latex': '🌿',
      'hybrid': '✨',
      'back-pain': '💪',
      'couple': '💑',
      'kids': '🧸',
      'luxury': '👑'
    };
    return icons[category] || '🛌';
  }, []);

  const openWhatsApp = (productName) => {
    const message = encodeURIComponent(`Hello Ortthiva, I'm interested in the "${productName}" mattress. Could you please share more details and the best price?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  // Gallery items
  const galleryItems = [
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/0214/0030/products/topper-handpush-p-2560.jpg?v=1744411468",
      title: "M A T T R E S S",
      fullTitle: "MATTRESS",
      description: "Engineered for perfect spine alignment"
    },
    {
      id: 2,
      image: "https://static.independent.co.uk/2026/04/22/12/43/Emma-original-mattress.png",
      title: "M E M O R Y\nF O A M",
      fullTitle: "MEMORY FOAM",
      description: "Pressure-relieving comfort layers"
    },
    {
      id: 3,
      image: "https://m.media-amazon.com/images/I/81kvQCvqy-L.jpg",
      title: "B R E A T H\nF A B R I C",
      fullTitle: "BREATHABLE FABRIC",
      description: "Skin-friendly & moisture-wicking"
    },
    {
      id: 4,
      image: "https://sealy.in/cdn/shop/articles/Checking_the_memory_foam_layer_of_a_mattress.png?crop=center&height=1200&v=1763952574&width=1200",
      title: "L O N G\nL A S T",
      fullTitle: "LONG LASTING",
      description: "Premium durability & support"
    }
  ];

  // Features data
  const OrtthivaFeatures = [
    { icon: "🩺", title: "Orthopedic Support", description: "Engineered for proper spinal alignment and back pain relief" },
    { icon: "🌀", title: "Pressure Relief", description: "High-density foam layers cushion pressure points" },
    { icon: "⏳", title: "Long-Lasting", description: "Premium materials with 5+ years warranty" }
  ];

  // Product categories
  const categories = [
    { name: "Orthopedic", icon: "🩺", link: "/products?category=orthopedic", description: "Doctor-recommended spinal support" },
    { name: "Memory Foam", icon: "🌀", link: "/products?category=memory-foam", description: "Pressure-relieving comfort" },
    { name: "Latex", icon: "🌿", link: "/products?category=latex", description: "Natural & eco-friendly" },
    { name: "Hybrid", icon: "✨", link: "/products?category=hybrid", description: "Best of both worlds" }
  ];

  // Trust badges
  const trustBadges = [
    "5+ YEAR WARRANTY",
    "DOCTOR RECOMMENDED",
    "MADE IN INDIA",
    "PRESSURE RELIEF"
  ];

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      const validProducts = data.filter(product => product && product.id);
      
      // Get featured products (first 3 or all if less)
      const featured = validProducts.filter(p => p.featured === true);
      let productsToShow = featured.length >= 3 ? featured.slice(0, 3) : validProducts.slice(0, 3);
      
      setFeaturedProducts(productsToShow);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback products if API fails
      const fallbackProducts = [
        {
          id: 1,
          name: "Ortho Pro Plus",
          price: 24999,
          description: "Premium orthopedic mattress with 5-zone support system for perfect spinal alignment. Ideal for back pain relief.",
          images: ["https://mysleepyhead.com/cdn/shop/files/Original_PDP_5.jpg?v=1768928275&width=1946"],
          category: "orthopedic",
          featured: true
        },
        {
          id: 2,
          name: "Memory Cloud Deluxe",
          price: 29999,
          description: "Advanced memory foam mattress that contours to your body shape, providing pressure relief and motion isolation.",
          images: ["https://www.duroflexworld.com/cdn/shop/files/2_2026e6ee-a9e8-4ff5-88c7-104fea9cefb8.jpg?v=1744560694"],
          category: "memory-foam",
          featured: true
        },
        {
          id: 3,
          name: "Cool Breeze Hybrid",
          price: 34999,
          description: "Breathable hybrid mattress with gel-infused memory foam and pocket springs for optimal temperature regulation.",
          images: ["https://www.rentomojo.com/blog/wp-content/uploads/2025/08/benefits-of-orthopedic-mattress.png"],
          category: "hybrid",
          featured: true
        }
      ];
      setFeaturedProducts(fallbackProducts);
    }
  }, []);

  const loadReviews = useCallback(async () => {
    try {
      const allReviews = await getReviews();
      if (allReviews && Array.isArray(allReviews)) {
        // Get 3 random reviews
        const shuffled = [...allReviews];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setReviews(shuffled.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadReviews();
  }, [loadProducts, loadReviews]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProduct]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewFormData.name || !reviewFormData.comment) {
      alert('Please fill in all fields');
      return;
    }
    setReviewSubmitting(true);
    try {
      await addReview(reviewFormData);
      setReviewSuccess(true);
      setReviewFormData({ name: '', rating: 5, comment: '' });
      setTimeout(() => {
        setReviewSuccess(false);
        setShowReviewForm(false);
      }, 3000);
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div 
            className="carousel-slide"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} className="carousel-item">
                <div className="carousel-image-wrapper">
                  <img src={image.url} alt={image.title} className="carousel-image" loading={index === 0 ? "eager" : "lazy"} />
                  <div className="carousel-overlay">
                    <div className="carousel-content">
                      <span className="carousel-badge">Ortthiva Premium</span>
                      <h2>{image.title}</h2>
                      <p>{image.subtitle}</p>
                      <Link to="/products" className="btn-primary">Explore Collection →</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous slide">❮</button>
          <button className="carousel-btn next" onClick={nextSlide} aria-label="Next slide">❯</button>
          
          <div className="carousel-dots">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-badge">Better Alignment. Better Sleep. Better You.</div>
          <h1>Welcome to <span>Ortthiva</span></h1>
          <p>Experience the perfect blend of orthopedic precision and luxurious comfort. Every Ortthiva mattress is engineered to provide optimal spinal alignment, pressure relief, and lasting durability.</p>
          <div className="welcome-buttons">
            <Link to="/products" className="btn-primary">Shop Mattresses</Link>
            <Link to="/book-appointment" className="btn-secondary">Book Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-badge">Why Choose Us</div>
          <h2>The Ortthiva <span>Difference</span></h2>
          <div className="features-grid">
            {OrtthivaFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="parallax-section">
        <div className="parallax-overlay"></div>
        <div className="container">
          <div className="parallax-content">
            <span className="parallax-badge">Experience the Difference</span>
            <h2>Certified Orthopedic <span>Comfort</span></h2>
            <p>Every Ortthiva mattress is meticulously crafted with high-density memory foam and advanced pressure-relieving technology, providing you with the perfect balance of support and luxury for restorative sleep.</p>
            <div className="parallax-features">
              <div className="parallax-feature">
                <span>✓</span>
                <p>ISO Certified Materials</p>
              </div>
              <div className="parallax-feature">
                <span>✓</span>
                <p>Doctor Approved Design</p>
              </div>
              <div className="parallax-feature">
                <span>✓</span>
                <p>100% Made in India</p>
              </div>
            </div>
            <Link to="/products" className="btn-parallax">Shop Collection →</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-badge">Our Collection</div>
          <h2>Choose Your <span>Perfect Mattress</span></h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Same as Products component style */}
      <section className="featured-products">
        <div className="container">
          <div className="section-badge">Best Sellers</div>
          <h2>Featured <span>Mattresses</span></h2>
          <div className="products-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                  <div className="product-image-container">
                    {product.images && product.images[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="product-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = 'https://images.pexels.com/photos/4392274/pexels-photo-4392274.jpeg?auto=compress&cs=tinysrgb&w=600';
                        }}
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>🛌</span>
                      </div>
                    )}
                    {product.featured && (
                      <div className="product-badge">Bestseller</div>
                    )}
                    {product.images && product.images.length > 1 && (
                      <div className="image-count-badge">
                        +{product.images.length - 1}
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <span className="product-category">
                      {getCategoryIcon(product.category)} {getCategoryDisplayName(product.category)}
                    </span>
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-price">₹{product.price?.toLocaleString() || '0'}</div>
                    <p className="product-description">
                      {product.description && product.description.length > 70 
                        ? `${product.description.substring(0, 70)}...` 
                        : product.description || 'Premium orthopedic mattress for better sleep'}
                    </p>
                    <div className="product-features">
                      <span>✓ Orthopedic</span>
                      <span>✓ 5 Year Warranty</span>
                    </div>
                    <div className="product-footer">
                      <button className="view-details-btn">View Details →</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Loading our premium collection...</p>
                </div>
              </div>
            )}
          </div>
          <div className="view-all-container">
            <Link to="/products" className="btn-view-all">
              View All Mattresses →
            </Link>
          </div>
        </div>
      </section>

      {/* Product Modal - Same as Products component */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>×</button>
            
            <div className="product-detail-gallery">
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <div className="image-slider-container">
                  <div className="main-slider-image">
                    <img 
                      src={selectedProduct.images[currentImageIndex]} 
                      alt={`${selectedProduct.name} - ${currentImageIndex + 1}`}
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button className="slider-nav prev-nav" onClick={prevImage}>❮</button>
                        <button className="slider-nav next-nav" onClick={nextImage}>❯</button>
                      </>
                    )}
                  </div>
                  <div className="slider-dots">
                    {selectedProduct.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`slider-dot ${currentImageIndex === idx ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      />
                    ))}
                  </div>
                  <div className="thumbnail-strip">
                    {selectedProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`thumbnail ${currentImageIndex === idx ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="gallery-placeholder">
                  <span>🛌</span>
                </div>
              )}
            </div>
            
            <div className="product-detail-info">
              <span className="product-category-tag">
                {getCategoryIcon(selectedProduct.category)} {getCategoryDisplayName(selectedProduct.category)}
              </span>
              <h2>{selectedProduct.name}</h2>
              <div className="price-tag">₹{selectedProduct.price?.toLocaleString() || '0'}</div>
              <div className="delivery-info">
                <span>✓ Free Delivery</span>
                <span>✓ 5+ Year Warranty</span>
                <span>✓ 100 Night Trial</span>
                <span>✓ Easy Returns</span>
              </div>
              <p className="full-description">{selectedProduct.description || 'Experience the perfect blend of orthopedic support and luxurious comfort. Engineered for optimal spinal alignment and pressure relief.'}</p>
              <div className="contact-actions">
                <a href={`tel:${phoneNumber}`} className="call-now-btn">📞 Call for Best Price</a>
                <button onClick={() => openWhatsApp(selectedProduct.name)} className="wa-consult-btn">
                  💬 Chat on WhatsApp
                </button>
                <Link to="/book-appointment" className="consult-btn">Book Free Consultation →</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50k<span>+</span></div>
              <div className="stat-label">Happy Sleepers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5<span>+</span></div>
              <div className="stat-label">Years Warranty</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100<span>%</span></div>
              <div className="stat-label">Non-Toxic</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8<span>hrs</span></div>
              <div className="stat-label">Better Sleep</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <div className="gallery-container">
        {galleryItems.map((item) => (
          <div 
            key={item.id} 
            className="gallery-item"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="gallery-overlay">
              <h3>
                <span className="vertical-text">{item.title}</span>
                <span className="horizontal-text">{item.fullTitle}</span>
              </h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges Section */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            {trustBadges.map((badge, index) => (
              <div key={index} className="trust-badge">
                <span>✓</span>
                <p>{badge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Recommended Section */}
      <section className="doctor-section">
        <div className="container">
          <div className="doctor-content">
            <div className="doctor-icon">🩺</div>
            <h2>Doctor Recommended</h2>
            <p>Trusted by healthcare professionals across India for its therapeutic benefits and quality craftsmanship. Ortthiva mattresses are engineered to provide optimal spinal alignment and pressure relief.</p>
            <div className="doctor-stats">
              <div className="doctor-stat">
                <span>1000+</span>
                <p>Doctors Trust</p>
              </div>
              <div className="doctor-stat">
                <span>98%</span>
                <p>Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-badge">Testimonials</div>
          <h2>What Our <span>Customers Say</span></h2>
          
          <div className="review-form-wrapper">
            {!showReviewForm ? (
              <button className="btn-write-review" onClick={() => setShowReviewForm(true)}>
                ✍️ Write a Review
              </button>
            ) : (
              <div className="review-form-container">
                <h3>Share Your Ortthiva Experience</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={reviewFormData.name}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-btn ${star <= reviewFormData.rating ? 'active' : ''}`}
                          onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Your Review *"
                      value={reviewFormData.comment}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-submit" disabled={reviewSubmitting}>
                      {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => setShowReviewForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {reviewSuccess && (
            <div className="success-message">✓ Thank you for your valuable feedback!</div>
          )}

          <div className="reviews-grid">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">{review.name.charAt(0)}</div>
                      <div>
                        <h3>{review.name}</h3>
                        <div className="rating-stars">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                    </div>
                    {review.featured && <div className="featured-badge">★ Featured</div>}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="no-reviews">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
          
          <div className="view-all-reviews">
            <Link to="/reviews" className="btn-view-all">
              View All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready for Better Sleep?</h2>
          <p>Join 50,000+ happy sleepers who wake up refreshed with Ortthiva's orthopedic comfort.</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn-primary">Explore Mattresses</Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-wa">
              💬 Chat on WhatsApp
            </a>
          </div>
          <div className="cta-features">
  <span style={{ color: 'white' }}>✓ Free Delivery</span>
  <span style={{ color: 'white' }}>✓ 100 Night Trial</span>
  <span style={{ color: 'white' }}>✓ Easy Returns</span>
</div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="contact-bar">
        <div className="container">
          <div className="contact-bar-content">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Call Our Experts</h4>
                <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
              </div>
            </div>
            <div className="contact-divider"></div>
            <div className="contact-item">
              <span className="contact-icon">💬</span>
              <div>
                <h4>WhatsApp Us</h4>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat Now →</a>
              </div>
            </div>
            <div className="contact-divider"></div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Experience Center</h4>
                <p>Near Ganga Oil Mill, J.K. Road, Mansa</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;