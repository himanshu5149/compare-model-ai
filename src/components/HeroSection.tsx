import { useState, useEffect, useRef } from 'react';

const phrases = [
  "What's the limit?",
  "Who builds the best?",
  "Can AI see beauty?",
  "Push every boundary.",
  "Evaluate everything.",
];

export default function HeroSection() {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let t: number;
    if (!deleting && charIdx < phrase.length) {
      t = window.setTimeout(() => { setText(phrase.slice(0, charIdx + 1)); setCharIdx(charIdx + 1); }, 55 + Math.random() * 45);
    } else if (!deleting && charIdx === phrase.length) {
      t = window.setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && charIdx > 0) {
      t = window.setTimeout(() => { setText(phrase.slice(0, charIdx - 1)); setCharIdx(charIdx - 1); }, 28);
    } else {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx]);

  // Sparkles
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 10 + Math.random() * 70,
      size: 10 + Math.random() * 14,
      delay: i * 0.7,
    }));
    setSparkles(arr);
  }, []);

  return (
    <section className="hero">
      {/* Background arches */}
      <div className="hero-bg">
        <img src="/images/hero-arches.jpg" alt="" className="hero-arches" />
        <img src="/images/hero-arches-mobile.jpg" alt="" className="hero-arches-mobile" />
        <div className="hero-overlay" />
      </div>

      {/* Sparkle decorations */}
      <div ref={sparklesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {sparkles.map(s => (
          <span
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: s.size,
              color: 'rgba(188,151,106,.25)',
              animation: `sparkle ${3 + s.delay * 0.3}s ease-in-out ${s.delay}s infinite`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge anim-fade-up">
          <span className="hero-badge-dot" />
          Product Lab — Live Evaluations
        </div>

        <h1 className="hero-headline anim-fade-up" style={{ animationDelay: '.12s' }}>
          <span aria-hidden="true">{text}</span>
          <i className="hero-caret" aria-hidden="true" />
          <span className="sr-only">What's the limit?</span>
        </h1>

        <p className="hero-sub anim-fade-up" style={{ animationDelay: '.24s' }}>
          The world's most realistic AI model evaluations.<br />
          Trusted by the leading frontier labs.
        </p>

        <div className="anim-fade-up" style={{ animationDelay: '.36s', display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#leaderboards" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 28px', background: 'var(--color-charcoal)', color: '#fff',
            fontSize: 14, fontWeight: 600, borderRadius: 16, textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,.14)', transition: 'all .2s',
          }}>
            Explore Leaderboards <span>→</span>
          </a>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 28px', background: 'rgba(255,255,255,.65)',
            backdropFilter: 'blur(10px)', color: 'var(--color-charcoal)',
            fontSize: 14, fontWeight: 600, borderRadius: 16, textDecoration: 'none',
            border: '1px solid rgba(214,209,201,.6)', transition: 'all .2s',
          }}>
            Get in Touch
          </a>
        </div>

        {/* Stats */}
        <div className="anim-fade-up" style={{
          animationDelay: '.52s', marginTop: 52,
          display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
        }}>
          {[
            { val: '2M+', label: 'Evaluations' },
            { val: '150+', label: 'Models Ranked' },
            { val: '9', label: 'Lab Partners' },
            { val: '98%', label: 'Accuracy' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700,
                letterSpacing: -1, color: 'var(--color-charcoal)',
              }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'rgba(41,44,51,.4)', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
