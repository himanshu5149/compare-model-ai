import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(''); setTimeout(() => setDone(false), 3500); }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-orb" style={{ top: -60, left: '30%', width: 350, height: 350, background: 'rgba(232,196,160,.08)' }} />
      <div className="newsletter-orb" style={{ bottom: -40, right: '25%', width: 280, height: 280, background: 'rgba(160,160,196,.08)' }} />

      <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
        <div className="newsletter-icon">✉️</div>
        <h2 className="newsletter-title">Stay in the Loop 💌</h2>
        <p className="newsletter-sub">
          Weekly leaderboard updates, new model rankings, and evaluation insights — right to your inbox.
        </p>
        <form className="newsletter-form" onSubmit={submit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">
            {done ? '✓ Subscribed!' : '✦ Subscribe'}
          </button>
        </form>
        <p className="newsletter-fine">No spam, unsubscribe anytime. We respect your inbox 💛</p>
      </div>
    </section>
  );
}
