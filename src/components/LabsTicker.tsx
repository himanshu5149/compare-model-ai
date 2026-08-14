const labs = [
  { name: 'Google DeepMind', bg: '#4285F4', ini: 'GD' },
  { name: 'Meta AI', bg: '#0668E1', ini: 'M' },
  { name: 'OpenAI', bg: '#10A37F', ini: 'OA' },
  { name: 'xAI', bg: '#1D1D1F', ini: 'xA' },
  { name: 'Mistral', bg: '#FF7000', ini: 'Mi' },
  { name: 'Replit', bg: '#F26207', ini: 'Re' },
  { name: 'Ideogram', bg: '#7C3AED', ini: 'Id' },
  { name: 'Anthropic', bg: '#D4A574', ini: 'An' },
  { name: 'Reve', bg: '#06B6D4', ini: 'Rv' },
];

export default function LabsTicker() {
  const doubled = [...labs, ...labs, ...labs];
  return (
    <section className="labs-strip">
      <span className="labs-label">Referenced by</span>
      <div className="labs-ticker">
        <div className="labs-ticker-track">
          {doubled.map((lab, i) => (
            <span key={`${lab.name}-${i}`} className="ticker-item">
              <span className="ticker-logo" style={{ background: lab.bg }}>{lab.ini}</span>
              <span className="ticker-name">{lab.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
