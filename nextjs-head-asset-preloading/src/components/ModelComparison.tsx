import { useState } from 'react';

const models = [
  { name: 'Gemini 3.1', color: '#4285F4', elo: 1347, code: 92, image: 88, video: 85, audio: 82 },
  { name: 'Claude Opus 4', color: '#D4A574', elo: 1329, code: 89, image: 78, video: 72, audio: 85 },
  { name: 'GPT-5', color: '#10A37F', elo: 1314, code: 88, image: 91, video: 89, audio: 79 },
  { name: 'Grok 4.2', color: '#1D1D1F', elo: 1298, code: 85, image: 74, video: 78, audio: 76 },
  { name: 'Llama 4 Scout', color: '#0668E1', elo: 1281, code: 82, image: 71, video: 69, audio: 72 },
  { name: 'Mistral Large 3', color: '#FF7000', elo: 1265, code: 80, image: 68, video: 65, audio: 70 },
  { name: 'DeepSeek R2', color: '#7C3AED', elo: 1251, code: 84, image: 72, video: 68, audio: 74 },
  { name: 'Qwen 3.5 Max', color: '#DC2626', elo: 1238, code: 79, image: 70, video: 66, audio: 71 },
];

const categories = [
  { key: 'elo', label: 'Elo Rating', max: 1400 },
  { key: 'code', label: 'Code', max: 100 },
  { key: 'image', label: 'Image', max: 100 },
  { key: 'video', label: 'Video', max: 100 },
  { key: 'audio', label: 'Audio', max: 100 },
];

export default function ModelComparison() {
  const [modelA, setModelA] = useState(models[0]);
  const [modelB, setModelB] = useState(models[2]);

  const getBarWidth = (value: number, max: number) => (value / max) * 100;

  return (
    <section className="comparison-section">
      <div className="comparison-inner">
        <div className="comparison-header">
          <span className="comparison-badge">⚔️ Compare</span>
          <h2 className="comparison-title">Head-to-Head Comparison</h2>
          <p className="comparison-sub">See how top models stack up against each other across categories</p>
        </div>

        <div className="comparison-card">
          {/* Model Selectors */}
          <div className="comparison-selectors">
            <div className="comparison-selector">
              <label>Model A</label>
              <select
                value={modelA.name}
                onChange={(e) => setModelA(models.find(m => m.name === e.target.value) || models[0])}
              >
                {models.map(m => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
              <div className="selector-badge" style={{ background: modelA.color }}>
                {modelA.name.slice(0, 2).toUpperCase()}
              </div>
            </div>

            <div className="comparison-vs">VS</div>

            <div className="comparison-selector">
              <label>Model B</label>
              <select
                value={modelB.name}
                onChange={(e) => setModelB(models.find(m => m.name === e.target.value) || models[2])}
              >
                {models.map(m => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
              <div className="selector-badge" style={{ background: modelB.color }}>
                {modelB.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Comparison Bars */}
          <div className="comparison-bars">
            {categories.map(cat => {
              const valA = modelA[cat.key as keyof typeof modelA] as number;
              const valB = modelB[cat.key as keyof typeof modelB] as number;
              const widthA = getBarWidth(valA, cat.max);
              const widthB = getBarWidth(valB, cat.max);
              const winner = valA > valB ? 'A' : valB > valA ? 'B' : 'tie';

              return (
                <div key={cat.key} className="comparison-row">
                  <div className="comparison-bar-left">
                    <span className={`comparison-value ${winner === 'A' ? 'winner' : ''}`}>
                      {cat.key === 'elo' ? valA : `${valA}%`}
                    </span>
                    <div className="comparison-bar-track">
                      <div
                        className="comparison-bar-fill left"
                        style={{ width: `${widthA}%`, background: modelA.color }}
                      />
                    </div>
                  </div>

                  <div className="comparison-label">
                    {cat.label}
                    {winner !== 'tie' && (
                      <span className="comparison-winner" style={{ color: winner === 'A' ? modelA.color : modelB.color }}>
                        {winner === 'A' ? '◀' : '▶'}
                      </span>
                    )}
                  </div>

                  <div className="comparison-bar-right">
                    <div className="comparison-bar-track">
                      <div
                        className="comparison-bar-fill right"
                        style={{ width: `${widthB}%`, background: modelB.color }}
                      />
                    </div>
                    <span className={`comparison-value ${winner === 'B' ? 'winner' : ''}`}>
                      {cat.key === 'elo' ? valB : `${valB}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="comparison-summary">
            <div className="summary-item" style={{ borderColor: modelA.color }}>
              <span className="summary-logo" style={{ background: modelA.color }}>
                {modelA.name.slice(0, 2).toUpperCase()}
              </span>
              <span>{modelA.name}</span>
              <span className="summary-wins">
                {categories.filter(c => (modelA[c.key as keyof typeof modelA] as number) > (modelB[c.key as keyof typeof modelB] as number)).length} wins
              </span>
            </div>
            <div className="summary-item" style={{ borderColor: modelB.color }}>
              <span className="summary-logo" style={{ background: modelB.color }}>
                {modelB.name.slice(0, 2).toUpperCase()}
              </span>
              <span>{modelB.name}</span>
              <span className="summary-wins">
                {categories.filter(c => (modelB[c.key as keyof typeof modelB] as number) > (modelA[c.key as keyof typeof modelA] as number)).length} wins
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
