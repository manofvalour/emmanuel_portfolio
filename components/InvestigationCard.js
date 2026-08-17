import Link from 'next/link';
import styles from './InvestigationCard.module.css';

export default function InvestigationCard({ investigation, featured = false }) {
  const { slug, title, subtitle, summary, tags, previewChart, repoUrl } = investigation;

  return (
    <article className={featured ? styles.cardFeatured : styles.card}>
      <div className={styles.textCol}>
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

        <Link href={`/investigations/${slug}`} className={styles.link}>
          View full write-up →
        </Link>
        
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkSecondary}
            >
              View repository ↗
            </a>
          )}

        <p className={styles.footerLine}>
          Questions about this approach?{' '}
          <Link href="/#contact" className={styles.footerLink}>
            Get in touch →
          </Link>
        </p>
      </div>

      {featured && previewChart && (
        <div className={styles.chartCol}>
          <img
            src={previewChart.src}
            alt={previewChart.alt}
            className={styles.chartImage}
          />
          <p className={styles.chartCaption}>{previewChart.caption}</p>
        </div>
      )}
    </article>
  );
}