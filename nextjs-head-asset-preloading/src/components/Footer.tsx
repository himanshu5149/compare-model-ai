export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-accent" />
      <div className="footer-inner">
        {/* Top */}
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Sentient<span className="accent">.ai</span></div>
            <p className="footer-brand-desc">
              The world's most realistic AI model evaluations. Built with care, powered by humans.
            </p>
          </div>
          <div className="footer-socials">
            {['X', 'LinkedIn', 'YouTube', 'Discord'].map(s => (
              <a key={s} href="#" className="footer-social">{s}</a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <span className="footer-link-label">For all labs</span>
            <a href="mailto:hello@sentient.ai" className="footer-link-text">Get in touch</a>
          </div>
          <div>
            <span className="footer-link-label">Join us</span>
            <a href="#" className="footer-link-text">Careers</a>
          </div>
          <div>
            <span className="footer-link-label">Read more</span>
            <a href="#resources" className="footer-link-text">Blog</a>
          </div>
          <div>
            <span className="footer-link-label">Follow us online</span>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {['X', 'LinkedIn', 'YouTube'].map(s => (
                <a key={s} href="#" className="footer-link-text">{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span className="footer-legal">Made with ♥ by the Sentient team · © 2025</span>
          <div>
            <a href="#" className="footer-legal">Terms of Service</a>
            <a href="#" className="footer-legal">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
