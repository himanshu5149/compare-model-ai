const pointers = [
  { name: 'Gemini 3.1', color: '#A0C3C4', x: '22%', y: '22%', delay: '0s', rotate: 20 },
  { name: 'Grok 4.2', color: '#BC976A', x: '72%', y: '18%', delay: '-1.7s', rotate: -75 },
  { name: 'GPT-5', color: '#AAB788', x: '35%', y: '62%', delay: '-3.4s', rotate: -15 },
  { name: 'Opus 4', color: '#A0C3C4', x: '64%', y: '58%', delay: '-5.1s', rotate: -65 },
];

export default function BenchmarkCTA() {
  return (
    <section className="bench-cta">
      <div className="bench-cta-card">
        <div className="bench-cta-grid" />
        <div className="bench-cta-orb1" />
        <div className="bench-cta-orb2" />

        <span className="bench-cta-badge">✦ For AI Labs</span>

        <h2 className="bench-cta-title">
          Looking to be on the leaderboard?<br />
          <span className="accent">Contact us!</span>
        </h2>

        <p className="bench-cta-body">
          Join the many AI labs that have partnered with Sentient.ai for
          the most trusted, human-driven evaluations in the industry.
        </p>

        {/* Interactive stage */}
        <div className="bench-stage">
          {/* Rings */}
          <div className="bench-ring" style={{ width: 360, height: 360 }} />
          <div className="bench-ring" style={{ width: 260, height: 260 }} />
          <div className="bench-ring" style={{ width: 160, height: 160 }} />
          <div className="bench-center-dot" />

          {/* Cursor pointers */}
          {pointers.map(p => (
            <div
              key={p.name}
              className="bench-pointer"
              style={{ left: p.x, top: p.y, animationDelay: p.delay }}
            >
              {/* Cursor SVG */}
              <svg
                className="bench-cursor-svg"
                width="24" height="28" viewBox="0 0 30 34" fill="none"
                style={{ transform: `rotate(${p.rotate}deg)` }}
              >
                <path
                  d="M24.83 2.06c.53-.36 1.24.05 1.19.69L23.78 28.03c-.05.76-1.07.99-1.44.32l-5.87-10.52a.76.76 0 00-.68-.39L3.74 17.62c-.76.01-1.07-.98-.44-1.41L24.83 2.06z"
                  fill={p.color} stroke="#fff" strokeWidth="1.15"
                />
              </svg>

              {/* Pill label */}
              <div className="bench-pill" style={{ background: p.color }}>
                <div className="bench-pill-avatar">
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="bench-pill-name">{p.name}</span>
              </div>
            </div>
          ))}
        </div>

        <a href="mailto:hello@sentient.ai" className="bench-contact">
          <span style={{ color: 'var(--color-gold)' }}>→</span>
          Contact us
        </a>
      </div>
    </section>
  );
}
