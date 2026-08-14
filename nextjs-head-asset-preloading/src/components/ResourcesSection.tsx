export default function ResourcesSection() {
  const resources = [
    {
      title: 'Blog',
      desc: 'Insights, model deep-dives, and evaluation stories from our research team.',
      image: '/images/resource-blog.jpg',
      tag: '📖 Read',
      tagColor: '#A0C3C4',
    },
    {
      title: 'Our Evals',
      desc: 'Browse our comprehensive suite of AI model evaluation products and benchmarks.',
      image: '/images/resource-evals.jpg',
      tag: '📊 Explore',
      tagColor: '#BC976A',
    },
    {
      title: 'Methodology',
      desc: 'Learn how our human-driven evaluation framework produces trustworthy results.',
      image: '/images/resource-methodology.jpg',
      tag: '🔬 Learn',
      tagColor: '#AAB788',
    },
  ];

  return (
    <section className="resources-section" id="resources">
      <div className="resources-inner">
        <h2 className="resources-title">Resources</h2>
        <p className="resources-sub">Check out our blog, methodology page, product lab, and more below!</p>

        <div className="resources-grid">
          {resources.map(r => (
            <a href="#" key={r.title} className="resource-card">
              <div style={{ overflow: 'hidden' }}>
                <img src={r.image} alt={r.title} loading="lazy" />
              </div>
              <div className="resource-card-body">
                <span className="resource-card-tag" style={{ background: r.tagColor }}>{r.tag}</span>
                <h3 className="resource-card-title">{r.title}</h3>
                <p className="resource-card-desc">{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
