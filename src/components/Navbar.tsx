import { useState, useEffect } from 'react';

const leaderboardTabs = [
  { label: 'Code', icon: '⟨/⟩' },
  { label: 'Image', icon: '🖼' },
  { label: 'Video', icon: '▶' },
  { label: 'Audio', icon: '♫' },
  { label: 'Slides', icon: '▤' },
  { label: 'More', icon: '✦' },
];

const codeGroups = [
  { title: 'Web Dev (Non-Agentic)', items: ['Overall', 'Website', 'UI Component', 'Game Dev', 'Data Visualization', '3D Design', 'Image to Website'] },
  { title: 'Web Dev (Agentic)', items: ['Full-Stack', 'Frontend', 'Image to Frontend'] },
  { title: 'Game Dev', items: ['Agentic', 'HTML', 'Godot'] },
  { title: 'Mobile Dev', items: ['Android (Kotlin)', 'React Native'] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdownTab, setActiveDropdownTab] = useState('Code');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">S</div>
          <span className="nav-logo-text">Sentient<span className="nav-logo-accent">.ai</span></span>
        </a>

        <div className="nav-links">
          <div className="nav-dropdown">
            <a href="#leaderboards" className="nav-link">
              Leaderboards
              <svg className="chevron" width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ marginLeft: 3 }}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="nav-dropdown-menu">
              <div className="dropdown-tabs">
                {leaderboardTabs.map(t => (
                  <button
                    key={t.label}
                    className={`dropdown-tab ${activeDropdownTab === t.label ? 'active' : ''}`}
                    onClick={() => setActiveDropdownTab(t.label)}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
              <div className="dropdown-groups">
                {codeGroups.map(g => (
                  <div key={g.title} className="dropdown-group">
                    <h4>{g.title}</h4>
                    <ul>
                      {g.items.map(item => (
                        <li key={item}><a href="#leaderboards">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a href="#contact" className="nav-link">Evaluations</a>
          <a href="#resources" className="nav-link">Blog</a>
          <a href="#contact" className="nav-link">Join Us</a>

          <a href="#leaderboards" className="nav-cta">
            <span style={{ color: '#BC976A' }}>✦</span>
            Benchmark Lab
          </a>
        </div>

        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <a href="#leaderboards" className="mobile-link" onClick={() => setMobileOpen(false)}>Leaderboards</a>
        <a href="#contact" className="mobile-link" onClick={() => setMobileOpen(false)}>Evaluations</a>
        <a href="#resources" className="mobile-link" onClick={() => setMobileOpen(false)}>Blog</a>
        <a href="#contact" className="mobile-link" onClick={() => setMobileOpen(false)}>Join Us</a>
        <a href="#leaderboards" className="mobile-link" onClick={() => setMobileOpen(false)}>Benchmark Lab</a>
      </div>
    </nav>
  );
}
