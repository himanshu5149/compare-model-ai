import { useEffect, useState, useRef } from 'react';

interface StatProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, duration, suffix = '', prefix = '' }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const stepTime = duration / end;
          const timer = setInterval(() => {
            start += Math.ceil(end / 50);
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="live-stat-number">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export default function LiveStats() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="live-stats">
      <div className="live-stats-inner">
        <div className="live-stats-header">
          <div className={`live-indicator ${pulse ? 'pulse' : ''}`}>
            <span className="live-dot" />
            <span>Live Stats</span>
          </div>
          <p className="live-stats-sub">Updated in real-time from our evaluation network</p>
        </div>

        <div className="live-stats-grid">
          <div className="live-stat-card">
            <div className="live-stat-icon">🎯</div>
            <AnimatedCounter end={2847593} duration={2000} />
            <div className="live-stat-label">Total Evaluations</div>
            <div className="live-stat-change up">+12,847 today</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-icon">🤖</div>
            <AnimatedCounter end={156} duration={1500} />
            <div className="live-stat-label">Models Ranked</div>
            <div className="live-stat-change up">+3 this week</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-icon">👥</div>
            <AnimatedCounter end={48291} duration={1800} />
            <div className="live-stat-label">Human Evaluators</div>
            <div className="live-stat-change up">+847 this month</div>
          </div>
          <div className="live-stat-card">
            <div className="live-stat-icon">⚡</div>
            <AnimatedCounter end={99} duration={1200} suffix="%" />
            <div className="live-stat-label">Accuracy Rate</div>
            <div className="live-stat-change flat">Verified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
