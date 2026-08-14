import { useState } from 'react';

const votePairs = [
  {
    prompt: "Create a landing page for a coffee shop",
    outputA: { model: 'GPT-5', preview: '☕ Artisan Roast\nWarm colors, hero image, menu grid, contact form' },
    outputB: { model: 'Claude Opus 4', preview: '🫖 Bean & Brew\nMinimalist design, parallax scroll, story section' },
  },
  {
    prompt: "Generate a logo for a tech startup",
    outputA: { model: 'Gemini 3.1', preview: '🔷 Abstract geometric mark\nGradient blues, modern sans-serif' },
    outputB: { model: 'Grok 4.2', preview: '⚡ Dynamic lettermark\nBold lines, monochrome, tech feel' },
  },
  {
    prompt: "Write a Python function to sort a list",
    outputA: { model: 'DeepSeek R2', preview: 'def quicksort(arr):\n  # Efficient recursive impl\n  # O(n log n) average' },
    outputB: { model: 'Mistral Large 3', preview: 'def merge_sort(arr):\n  # Stable sort algorithm\n  # With detailed comments' },
  },
];

export default function QuickVote() {
  const [currentPair, setCurrentPair] = useState(0);
  const [voted, setVoted] = useState<'A' | 'B' | null>(null);
  const [votes, setVotes] = useState({ A: 0, B: 0 });
  const [totalVotes, setTotalVotes] = useState(0);

  const pair = votePairs[currentPair];

  const handleVote = (choice: 'A' | 'B') => {
    if (voted) return;
    setVoted(choice);
    setVotes(v => ({ ...v, [choice]: v[choice] + 1 }));
    setTotalVotes(t => t + 1);

    // Auto advance after 2 seconds
    setTimeout(() => {
      setVoted(null);
      setCurrentPair((currentPair + 1) % votePairs.length);
    }, 2000);
  };

  const getVotePercent = (side: 'A' | 'B') => {
    const total = votes.A + votes.B;
    if (total === 0) return 50;
    return Math.round((votes[side] / total) * 100);
  };

  return (
    <section className="quickvote-section">
      <div className="quickvote-inner">
        <div className="quickvote-header">
          <span className="quickvote-badge">🎮 Quick Vote</span>
          <h2 className="quickvote-title">Which is better?</h2>
          <p className="quickvote-sub">Help train our evaluation model with your preferences</p>
        </div>

        <div className="quickvote-card">
          <div className="quickvote-prompt">
            <span className="prompt-label">Prompt:</span>
            <span className="prompt-text">"{pair.prompt}"</span>
          </div>

          <div className="quickvote-options">
            <button
              className={`quickvote-option ${voted === 'A' ? 'selected' : ''} ${voted === 'B' ? 'not-selected' : ''}`}
              onClick={() => handleVote('A')}
              disabled={!!voted}
            >
              <div className="option-header">
                <span className="option-label">Option A</span>
                {voted && <span className="option-model">{pair.outputA.model}</span>}
              </div>
              <div className="option-preview">{pair.outputA.preview}</div>
              {voted && (
                <div className="option-result">
                  <div className="result-bar" style={{ width: `${getVotePercent('A')}%` }} />
                  <span className="result-percent">{getVotePercent('A')}%</span>
                </div>
              )}
            </button>

            <div className="quickvote-vs">
              <span>VS</span>
            </div>

            <button
              className={`quickvote-option ${voted === 'B' ? 'selected' : ''} ${voted === 'A' ? 'not-selected' : ''}`}
              onClick={() => handleVote('B')}
              disabled={!!voted}
            >
              <div className="option-header">
                <span className="option-label">Option B</span>
                {voted && <span className="option-model">{pair.outputB.model}</span>}
              </div>
              <div className="option-preview">{pair.outputB.preview}</div>
              {voted && (
                <div className="option-result">
                  <div className="result-bar" style={{ width: `${getVotePercent('B')}%` }} />
                  <span className="result-percent">{getVotePercent('B')}%</span>
                </div>
              )}
            </button>
          </div>

          <div className="quickvote-footer">
            <span className="vote-count">🗳️ {totalVotes} votes cast this session</span>
            <span className="vote-hint">{voted ? 'Next prompt loading...' : 'Click to vote!'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
