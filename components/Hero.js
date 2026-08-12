import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Portfolio — ML Systems Engineering</p>
          <h1 className={styles.name}>Emmanuel Ajala</h1>
          <p className={styles.role}>Reproducible benchmarks for ML systems decisions</p>

          <p className={styles.proof}>
            I design reproducible benchmark experiments that help ML engineers make{' '}
            <span className={styles.emphasis}>evidence-based systems decisions</span>. Every
            project begins with a falsifiable engineering question, controls the variables
            that matter, and measures the trade-offs that determine which approach to use
            under real-world constraints.
          </p>
          <p className={styles.proof}>
            If your team makes engineering decisions from evidence rather 
            than intuition, I&apos;d like to contribute.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/#work" className={styles.cta}>
              View investigations
            </Link>
            <Link href="#method" className={styles.ctaSecondary}>
              Read the methodology →
            </Link>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelLabel}>
            <span>RAG Benchmark — latency vs. quality</span>
            <span className={styles.panelId}>16 configs</span>
          </div>

          <svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="10" x2="40" y2="180" stroke="var(--color-hairline)" strokeWidth="1" />
            <line x1="40" y1="180" x2="360" y2="180" stroke="var(--color-hairline)" strokeWidth="1" />

            <text x="200" y="205" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--color-muted)">
              MEDIAN LATENCY (ms) →
            </text>
            <text
              x="14"
              y="95"
              textAnchor="middle"
              fontFamily="IBM Plex Mono"
              fontSize="10"
              fill="var(--color-muted)"
              transform="rotate(-90 14 95)"
            >
              QUALITY →
            </text>

            {/* Pareto frontier: D → H → F, in order of increasing latency */}
            <path d="M 68 145 L 78 138 L 130 55" fill="none" stroke="var(--color-main)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Off-frontier configs */}
            <circle cx="185" cy="98" r="4" fill="var(--color-muted)" />
            <circle cx="220" cy="128" r="4" fill="var(--color-muted)" />
            <circle cx="320" cy="105" r="4" fill="var(--color-muted)" />

            {/* Frontier: D, H */}
            <circle cx="68" cy="145" r="4" fill="var(--color-main)" />
            <circle cx="78" cy="138" r="4" fill="var(--color-main)" />

            {/* Winner: F */}
            <circle cx="130" cy="55" r="5.5" fill="var(--color-accent)" stroke="var(--color-bg)" strokeWidth="1.5" />
            <line x1="130" y1="55" x2="130" y2="32" stroke="var(--color-accent)" strokeWidth="1" />
            <text x="130" y="24" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--color-accent)">
              F — selected
            </text>
          </svg>

          <p className={styles.panelCaption}>
            <b>Controlled:</b> reranker, generator count, query expansion. <b>Measured:</b>{' '}
            432 runs across 16 configurations — full case study below.
          </p>
        </div>
      </div>
    </section>
  );
}