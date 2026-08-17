import styles from './TableOfContents.module.css';

const sections = [
  { id: 'problem', label: 'Problem' },
  { id: 'hypothesis', label: 'Hypothesis' },
  { id: 'experiment', label: 'Experiment' },
  { id: 'results', label: 'Results' },
  { id: 'winner', label: 'Which config won' },
  { id: 'final-decision', label: 'Final decision' },
  { id: 'explanation', label: 'Explanation' },
  { id: 'next-time', label: "What I'd change" },
];

export default function TableOfContents() {
  return (
    <nav className={styles.toc}>
      <p className={styles.label}>On this page</p>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}