import { useState } from 'react';

const faqs = [
  {
    q: "How do you ensure evaluation quality?",
    a: "Every evaluation goes through multiple human reviewers with domain expertise. We use consensus mechanisms and statistical validation to ensure reliability. Our inter-rater agreement exceeds 94%.",
  },
  {
    q: "How often are leaderboards updated?",
    a: "Our leaderboards update in real-time as new evaluations are completed. Elo ratings are recalculated continuously, and you'll see changes reflected within minutes of new data.",
  },
  {
    q: "Can my AI lab participate in evaluations?",
    a: "Absolutely! We partner with frontier labs to ensure comprehensive model coverage. Contact us to discuss integration — we offer both public leaderboard placement and private evaluation services.",
  },
  {
    q: "What makes your methodology different?",
    a: "Unlike automated benchmarks, we focus on human preference alignment. Real users evaluate outputs across realistic tasks, capturing nuances that synthetic tests miss. Our methodology is peer-reviewed and open.",
  },
  {
    q: "Do you evaluate open-source models?",
    a: "Yes! We evaluate both proprietary and open-source models. Our leaderboards include Llama, Mistral, Qwen, and many community models alongside closed-source offerings.",
  },
  {
    q: "How do you handle evaluation bias?",
    a: "We implement blind evaluation protocols — reviewers don't know which model produced each output. We also continuously monitor for demographic and stylistic biases in our reviewer pool.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-header">
          <span className="faq-badge">❓ FAQ</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-sub">Everything you need to know about our evaluation platform</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <span className="faq-icon">{openIndex === i ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Still have questions?</p>
          <a href="mailto:hello@sentient.ai" className="faq-contact">
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  );
}
