import Link from 'next/link';
import styles from './InvestigationCard.module.css';

export default function InvestigationCard({ investigation }) {
  const { slug, title, subtitle, summary, tags } = investigation;

  return (
    <Link href={`/investigations/${slug}`} className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.summary}>{summary}</p>

      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>

      <span className={styles.link}>Full case study →</span>
    </Link>
  );
}