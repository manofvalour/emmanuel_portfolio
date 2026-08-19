import styles from './MethodRow.module.css';

const steps = [
  {
    tag: 'Question',
    title: 'Start falsifiable',
    description: 'Every benchmark opens with a claim precise enough to be proven wrong.',
    active: true,
  },
  {
    tag: 'Control',
    title: 'Isolate variables',
    description: 'Hold everything constant except the one factor under test.',
    active: false,
  },
  {
    tag: 'Measure',
    title: 'Report the trade-off',
    description: 'Results show what to give up, not just what improved.',
    active: false,
  },
];

export default function MethodRow() {
  return (
    <section id="method" className={styles.method}>
      <div className={styles.container}>
        {steps.map((step) => (
          <div key={step.tag} className={`${styles.step} ${step.active ? styles.active : ''}`}>
            <p className={styles.tag}>{step.tag}</p>
            <h2 className={styles.title}>{step.title}</h2>
            <p className={styles.description}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}