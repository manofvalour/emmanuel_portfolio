import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Proof Statement</p>

        <h1 className={styles.headline}>
          I design reproducible benchmark experiments that help ML engineers
          make <span className={styles.accent}>evidence-based</span> systems decisions.
        </h1>

        <p className={styles.body}>
          Every project begins with a falsifiable engineering question,
          controls the variables that matter, and measures the trade-offs
          that determine which approach to use under real-world constraints.
        </p>

        <p className={styles.body}>
          I&apos;m building this portfolio for Staff ML Systems Engineers and
          AI Research Engineers who value rigorous experimental methodology.
          If your team makes engineering decisions from evidence rather than
          intuition, I&apos;d like to contribute.
        </p>
      </div>
    </section>
  );
}