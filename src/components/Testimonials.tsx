import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Sentient's evaluations have become our north star for model development. The human-driven approach catches nuances that automated benchmarks miss.",
    author: "Dr. Sarah Chen",
    role: "Head of Research",
    company: "DeepMind",
    color: '#4285F4',
  },
  {
    quote: "Finally, evaluations that reflect real-world usage. We've integrated Sentient metrics into our CI/CD pipeline for every model release.",
    author: "Marcus Rodriguez",
    role: "VP of Engineering",
    company: "OpenAI",
    color: '#10A37F',
  },
  {
    quote: "The granular category breakdowns helped us identify specific weaknesses in our code generation that we'd never have found otherwise.",
    author: "Emily Nakamura",
    role: "ML Lead",
    company: "Anthropic",
    color: '#D4A574',
  },
  {
    quote: "Transparent methodology, reproducible results, and a team that truly understands what frontier labs need. Highly recommended.",
    author: "James O'Connor",
    role: "Chief Scientist",
    company: "xAI",
    color: '#1D1D1F',
  },
  {
    quote: "We've seen a 23% improvement in user satisfaction since we started optimizing against Sentient's human preference scores.",
    author: "Priya Sharma",
    role: "Product Director",
    company: "Meta AI",
    color: '#0668E1',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    if (index === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  };

  const t = testimonials[current];

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="testimonials-header">
          <span className="testimonials-badge">💬 Testimonials</span>
          <h2 className="testimonials-title">Trusted by Leading Labs</h2>
        </div>

        <div className="testimonial-carousel">
          <div className={`testimonial-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="testimonial-quote">
              <span className="quote-mark">"</span>
              {t.quote}
            </div>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: t.color }}>
                {t.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="author-info">
                <div className="author-name">{t.author}</div>
                <div className="author-role">{t.role} at {t.company}</div>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <div className="testimonial-nav">
            <button
              className="nav-btn"
              onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="nav-btn"
              onClick={() => goTo((current + 1) % testimonials.length)}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
