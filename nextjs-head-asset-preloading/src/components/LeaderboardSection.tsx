import { useState, useEffect, useRef } from 'react';

const tabs = [
  { label: 'Code', icon: '⟨/⟩' },
  { label: 'Image', icon: '🖼' },
  { label: 'Video', icon: '▶' },
  { label: 'Audio', icon: '♫' },
  { label: 'Slides', icon: '▤' },
  { label: 'More', icon: '✦' },
];

const sidebarData: Record<string, { group: string; items: string[] }[]> = {
  Code: [
    { group: 'Web Dev (Non-Agentic)', items: ['Overall', 'Website', 'UI Component', 'Game Dev', 'Data Viz', '3D Design', 'Image → Web', 'Video → Web'] },
    { group: 'Web Dev (Agentic)', items: ['Full-Stack', 'Frontend', 'Image → Frontend'] },
    { group: 'Game Dev', items: ['Agentic', 'HTML', 'Godot'] },
    { group: 'Mobile Dev', items: ['Android', 'React Native'] },
  ],
  Image: [
    { group: 'Generation', items: ['Overall', 'Photorealistic', 'Artistic', 'Logo Design'] },
    { group: 'Editing', items: ['Inpainting', 'Style Transfer'] },
  ],
  Video: [
    { group: 'Generation', items: ['Overall', 'Short Form', 'Long Form', 'Animation'] },
  ],
  Audio: [
    { group: 'Speech & Music', items: ['Overall', 'TTS', 'Voice Clone', 'Music Generation'] },
  ],
  Slides: [
    { group: 'Presentations', items: ['Overall', 'Business', 'Educational'] },
  ],
  More: [
    { group: 'Creative', items: ['SVG Art', 'ASCII Art', 'Diagrams', 'Charts'] },
  ],
};

interface Model {
  name: string;
  color: string;
  elo: number;
  winRate: string;
  change: number;
}

const modelsMap: Record<string, Model[]> = {
  Code: [
    { name: 'Gemini 3.1', color: '#4285F4', elo: 1347, winRate: '78.2%', change: 3 },
    { name: 'Claude Opus 4', color: '#D4A574', elo: 1329, winRate: '75.1%', change: 1 },
    { name: 'GPT-5', color: '#10A37F', elo: 1314, winRate: '72.8%', change: -1 },
    { name: 'Grok 4.2', color: '#1D1D1F', elo: 1298, winRate: '70.4%', change: 2 },
    { name: 'Llama 4 Scout', color: '#0668E1', elo: 1281, winRate: '67.9%', change: -2 },
    { name: 'Mistral Large 3', color: '#FF7000', elo: 1265, winRate: '65.1%', change: 0 },
    { name: 'DeepSeek R2', color: '#7C3AED', elo: 1251, winRate: '63.3%', change: 4 },
    { name: 'Qwen 3.5 Max', color: '#DC2626', elo: 1238, winRate: '61.0%', change: -1 },
    { name: 'Cohere Command', color: '#39A0ED', elo: 1224, winRate: '58.7%', change: 0 },
    { name: 'Yi Lightning', color: '#F59E0B', elo: 1212, winRate: '56.5%', change: -3 },
  ],
  Image: [
    { name: 'Imagen 4', color: '#4285F4', elo: 1389, winRate: '82.1%', change: 0 },
    { name: 'DALL·E 4', color: '#10A37F', elo: 1356, winRate: '78.4%', change: 2 },
    { name: 'Midjourney v7', color: '#5865F2', elo: 1341, winRate: '75.9%', change: -1 },
    { name: 'Ideogram 3', color: '#7C3AED', elo: 1318, winRate: '72.3%', change: 1 },
    { name: 'Flux 2 Ultra', color: '#1D1D1F', elo: 1295, winRate: '69.8%', change: -1 },
    { name: 'Stable Diff XL2', color: '#FF7000', elo: 1271, winRate: '66.5%', change: 0 },
    { name: 'Reve Gen 2', color: '#06B6D4', elo: 1258, winRate: '64.1%', change: 3 },
    { name: 'Aurora v2', color: '#D4A574', elo: 1242, winRate: '61.8%', change: -2 },
    { name: 'Firefly 4', color: '#E11D48', elo: 1228, winRate: '59.2%', change: 1 },
    { name: 'Kandinsky 4', color: '#F59E0B', elo: 1215, winRate: '57.0%', change: -1 },
  ],
  Video: [
    { name: 'Veo 3', color: '#4285F4', elo: 1401, winRate: '84.2%', change: 1 },
    { name: 'Sora 2', color: '#10A37F', elo: 1372, winRate: '80.5%', change: -1 },
    { name: 'Kling 2.5', color: '#0668E1', elo: 1345, winRate: '76.1%', change: 0 },
    { name: 'Runway Gen-4', color: '#7C3AED', elo: 1321, winRate: '73.4%', change: 2 },
    { name: 'Pika 2.5', color: '#FF7000', elo: 1298, winRate: '70.2%', change: -1 },
    { name: 'Hailuo v2', color: '#1D1D1F', elo: 1274, winRate: '67.8%', change: 1 },
    { name: 'Luma Ray 3', color: '#DC2626', elo: 1251, winRate: '64.5%', change: -2 },
    { name: 'Wan Video 2', color: '#D4A574', elo: 1229, winRate: '61.1%', change: 0 },
    { name: 'Hotshot v3', color: '#39A0ED', elo: 1210, winRate: '58.4%', change: 3 },
    { name: 'Synthesia 5', color: '#F59E0B', elo: 1194, winRate: '55.9%', change: -1 },
  ],
  Audio: [
    { name: 'Gemini Audio', color: '#4285F4', elo: 1378, winRate: '81.0%', change: 0 },
    { name: 'ElevenLabs v3', color: '#10A37F', elo: 1351, winRate: '77.3%', change: 1 },
    { name: 'Suno v5', color: '#7C3AED', elo: 1328, winRate: '74.6%', change: -1 },
    { name: 'Udio 2', color: '#FF7000', elo: 1305, winRate: '71.2%', change: 2 },
    { name: 'Bark 3', color: '#0668E1', elo: 1282, winRate: '68.5%', change: -1 },
    { name: 'Whisper v4', color: '#1D1D1F', elo: 1259, winRate: '65.1%', change: 0 },
    { name: 'Lyria 2', color: '#DC2626', elo: 1236, winRate: '62.4%', change: 1 },
    { name: 'MusicGen 3', color: '#D4A574', elo: 1214, winRate: '59.8%', change: -3 },
    { name: 'Voicebox 2', color: '#39A0ED', elo: 1198, winRate: '57.1%', change: 0 },
    { name: 'AudioCraft+', color: '#F59E0B', elo: 1183, winRate: '54.6%', change: 2 },
  ],
  Slides: [
    { name: 'Gemini Slides', color: '#4285F4', elo: 1365, winRate: '79.8%', change: 1 },
    { name: 'GPT-5 Deck', color: '#10A37F', elo: 1340, winRate: '76.2%', change: -1 },
    { name: 'Claude Slides', color: '#D4A574', elo: 1315, winRate: '73.1%', change: 0 },
    { name: 'Gamma AI v3', color: '#7C3AED', elo: 1291, winRate: '69.5%', change: 2 },
    { name: 'Beautiful.ai 2', color: '#FF7000', elo: 1268, winRate: '66.8%', change: -1 },
    { name: 'Pitch AI', color: '#0668E1', elo: 1245, winRate: '63.4%', change: 0 },
    { name: 'Tome v4', color: '#1D1D1F', elo: 1222, winRate: '60.1%', change: -2 },
    { name: 'SlidesAI Pro', color: '#DC2626', elo: 1199, winRate: '57.5%', change: 1 },
    { name: 'Prezi AI', color: '#39A0ED', elo: 1180, winRate: '54.8%', change: 0 },
    { name: 'Canva AI v3', color: '#F59E0B', elo: 1165, winRate: '52.2%', change: -1 },
  ],
  More: [
    { name: 'Claude Opus 4', color: '#D4A574', elo: 1358, winRate: '80.5%', change: 2 },
    { name: 'Gemini 3.1', color: '#4285F4', elo: 1335, winRate: '77.1%', change: -1 },
    { name: 'GPT-5', color: '#10A37F', elo: 1312, winRate: '74.0%', change: 0 },
    { name: 'Grok 4.2', color: '#1D1D1F', elo: 1289, winRate: '70.5%', change: 1 },
    { name: 'DeepSeek R2', color: '#7C3AED', elo: 1266, winRate: '67.2%', change: -2 },
    { name: 'Llama 4', color: '#0668E1', elo: 1243, winRate: '64.6%', change: 0 },
    { name: 'Mistral Large', color: '#FF7000', elo: 1220, winRate: '61.3%', change: 1 },
    { name: 'Qwen 3.5', color: '#DC2626', elo: 1198, winRate: '58.7%', change: -1 },
    { name: 'Command R+', color: '#39A0ED', elo: 1180, winRate: '56.0%', change: 0 },
    { name: 'Yi Lightning', color: '#F59E0B', elo: 1165, winRate: '53.5%', change: 3 },
  ],
};

export default function LeaderboardSection() {
  const [activeTab, setActiveTab] = useState('Code');
  const [activeCat, setActiveCat] = useState('Overall');
  const [showElo, setShowElo] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [animKey, setAnimKey] = useState(0);
  const barsRef = useRef<HTMLDivElement>(null);

  const sidebar = sidebarData[activeTab] || sidebarData.Code;
  const models = modelsMap[activeTab] || modelsMap.Code;
  const maxElo = models[0]?.elo || 1400;
  const minElo = (models[models.length - 1]?.elo || 1100) - 60;

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setActiveCat(sidebarData[tab]?.[0]?.items[0] || 'Overall');
    setAnimKey(k => k + 1);
  };

  const toggleGroup = (group: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  // Animate bars on mount / tab change
  const [barsVisible, setBarsVisible] = useState(false);
  useEffect(() => {
    setBarsVisible(false);
    const t = setTimeout(() => setBarsVisible(true), 80);
    return () => clearTimeout(t);
  }, [animKey]);

  const rankIcon = (i: number) => {
    if (i === 0) return <span className="lb-rank gold">🥇</span>;
    if (i === 1) return <span className="lb-rank silver">🥈</span>;
    if (i === 2) return <span className="lb-rank bronze">🥉</span>;
    return <span className="lb-rank">{i + 1}</span>;
  };

  return (
    <section className="lb-section" id="leaderboards">
      <div className="lb-section-inner">
        <h2 className="lb-section-title">Top Leaderboards</h2>
        <p className="lb-section-sub">Real-time rankings powered by human evaluations</p>

        {/* Tabs */}
        <div className="lb-tabs">
          {tabs.map(t => (
            <button
              key={t.label}
              className={`lb-tab ${activeTab === t.label ? 'active' : ''}`}
              onClick={() => switchTab(t.label)}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="lb-panel">
          {/* Sidebar */}
          <aside className="lb-rail">
            {sidebar.map(g => (
              <div key={g.group}>
                <div
                  className={`lb-group-title ${collapsedGroups.has(g.group) ? 'collapsed' : ''}`}
                  onClick={() => toggleGroup(g.group)}
                >
                  {g.group}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {!collapsedGroups.has(g.group) && g.items.map(item => (
                  <button
                    key={item}
                    className={`lb-rail-item ${activeCat === item ? 'active' : ''}`}
                    onClick={() => { setActiveCat(item); setAnimKey(k => k + 1); }}
                  >
                    <span className="lb-rail-dot" />
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </aside>

          {/* Card */}
          <div className="lb-card">
            <div className="lb-card-head">
              <div className="lb-card-title">
                <div className="lb-card-title-icon">🏆</div>
                <span>{activeCat} — {activeTab}</span>
              </div>
              <a href="#" className="lb-expand">
                Expand
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="lb-card-controls">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(41,44,51,.4)', marginRight: 'auto' }}>
                <svg viewBox="0 0 38 35" fill="none" width="20" height="18">
                  <path d="M1 12.6c1.7.1 3.2.8 4 2 .3.5.5 1 .6 1.6.1-.6.4-1.1.7-1.5 1-1.2 2.4-1.7 4.2-1.7.4 1.7.2 3.2-.7 4.4-.8 1-2 1.6-3.5 1.7h-.8l-.8-.1c-1.4-.2-2.6-.9-3.3-2C.5 15.8.5 14.3 1 12.6z" fill="#292C33"/>
                  <path d="M37 12.6c-1.7.1-3.2.8-4 2-.3.5-.5 1-.6 1.6-.1-.6-.4-1.1-.7-1.5-1-1.2-2.4-1.7-4.2-1.7-.4 1.7-.2 3.2.7 4.4.8 1 2 1.6 3.5 1.7h.8l.8-.1c1.4-.2 2.6-.9 3.3-2 .8-1.2.9-2.8.4-4.4z" fill="#292C33"/>
                </svg>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
                  Benchmark Lab <span style={{ fontSize: 9, opacity: .5, marginLeft: 3 }}>by Sentient.ai</span>
                </span>
              </div>

              <button
                className={`lb-filter-btn`}
                style={{ cursor: 'default' }}
              >
                All Models
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div className="lb-toggle">
                <button
                  className={`lb-toggle-btn ${showElo ? 'active' : ''}`}
                  onClick={() => setShowElo(true)}
                >Elo Rating</button>
                <button
                  className={`lb-toggle-btn ${!showElo ? 'active' : ''}`}
                  onClick={() => setShowElo(false)}
                >Win Rate</button>
              </div>
            </div>

            {/* Bar chart */}
            <div className="lb-bars" ref={barsRef} key={animKey}>
              {models.map((m, i) => {
                const pct = ((m.elo - minElo) / (maxElo - minElo)) * 100;
                return (
                  <div key={m.name} className="lb-bar-col">
                    <div
                      className="lb-bar"
                      style={{
                        height: barsVisible ? `${Math.max(pct, 12)}%` : '0%',
                        background: `${m.color}22`,
                        borderLeft: `3px solid ${m.color}`,
                        transitionDelay: `${i * 0.04}s`,
                      }}
                    >
                      <div className="lb-bar-tooltip">
                        <strong>{m.name}</strong>
                        <div style={{ opacity: .6, marginTop: 2 }}>Elo: {m.elo} · WR: {m.winRate}</div>
                      </div>
                    </div>
                    <span className="lb-bar-label" style={{ background: m.color }}>
                      {m.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Model list */}
            <div className="lb-list">
              {models.map((m, i) => (
                <div key={m.name} className="lb-row">
                  {rankIcon(i)}
                  <span className="lb-model-logo" style={{ background: m.color }}>
                    {m.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="lb-model-name">{m.name}</span>
                  <span className={`lb-model-change ${m.change > 0 ? 'up' : m.change < 0 ? 'down' : 'flat'}`}>
                    {m.change > 0 ? `↑${m.change}` : m.change < 0 ? `↓${Math.abs(m.change)}` : '—'}
                  </span>
                  <span className="lb-model-score">
                    {showElo ? m.elo : m.winRate}
                  </span>
                  <div className="lb-model-bar-wrap">
                    <div
                      className="lb-model-bar-fill"
                      style={{
                        width: barsVisible
                          ? `${showElo ? ((m.elo - minElo) / (maxElo - minElo)) * 100 : parseFloat(m.winRate)}%`
                          : '0%',
                        background: m.color,
                        transitionDelay: `${i * 0.03}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
