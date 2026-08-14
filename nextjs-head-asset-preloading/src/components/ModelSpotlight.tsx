import { useState, useEffect } from 'react';

const spotlightModels = [
  {
    name: 'Gemini 3.1',
    tagline: 'The Multimodal Champion',
    description: 'Dominating across code, image, and reasoning tasks with unprecedented context length support.',
    color: '#4285F4',
    elo: 1347,
    badge: '👑 #1 Overall',
    strengths: ['128K context window', 'Native multimodal', 'Strong reasoning'],
    weeklyChange: '+15 Elo',
    trending: 'up',
  },
  {
    name: 'Claude Opus 4',
    tagline: 'The Creative Genius',
    description: 'Setting new standards in creative writing, nuanced understanding, and safe AI development.',
    color: '#D4A574',
    elo: 1329,
    badge: '🎨 Best Creative',
    strengths: ['200K context', 'Superior writing', 'Ethical design'],
    weeklyChange: '+8 Elo',
    trending: 'up',
  },
  {
    name: 'GPT-5',
    tagline: 'The Reliable Workhorse',
    description: 'Consistent performance across all categories with the most polished user experience.',
    color: '#10A37F',
    elo: 1314,
    badge: '⚡ Most Consistent',
    strengths: ['Low latency', 'Broad knowledge', 'Tool use'],
    weeklyChange: '+3 Elo',
    trending: 'flat',
  },
];

export default function ModelSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % spotlightModels.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const model = spotlightModels[activeIndex];

  return (
    <section className="spotlight-section">
      <div className="spotlight-inner">
        <div className="spotlight-header">
          <span className="spotlight-badge">🌟 Model Spotlight</span>
          <h2 className="spotlight-title">Featured This Week</h2>
        </div>

        <div
          className="spotlight-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background glow */}
          <div className="spotlight-glow" style={{ background: model.color }} />

          <div className="spotlight-content">
            <div className="spotlight-main">
              <div className="spotlight-model-badge" style={{ background: model.color }}>
                {model.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="spotlight-info">
                <span className="spotlight-rank-badge">{model.badge}</span>
                <h3 className="spotlight-model-name">{model.name}</h3>
                <p className="spotlight-tagline">{model.tagline}</p>
                <p className="spotlight-desc">{model.description}</p>

                <div className="spotlight-strengths">
                  {model.strengths.map((s, i) => (
                    <span key={i} className="strength-tag">{s}</span>
                  ))}
                </div>
              </div>

              <div className="spotlight-stats">
                <div className="spotlight-elo">
                  <span className="elo-value">{model.elo}</span>
                  <span className="elo-label">Elo Rating</span>
                </div>
                <div className={`spotlight-trend ${model.trending}`}>
                  <span className="trend-arrow">{model.trending === 'up' ? '↑' : model.trending === 'down' ? '↓' : '→'}</span>
                  <span className="trend-value">{model.weeklyChange}</span>
                  <span className="trend-label">This Week</span>
                </div>
              </div>
            </div>

            {/* Model selector dots */}
            <div className="spotlight-dots">
              {spotlightModels.map((m, i) => (
                <button
                  key={m.name}
                  className={`spotlight-dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  style={{ '--dot-color': m.color } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
