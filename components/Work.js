import investigations from '../data/investigations';
import InvestigationCard from './InvestigationCard';
import styles from './Work.module.css';

export default function Work() {
  return (
    <section className={styles.work}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h2 className={styles.heading}>Investigations</h2>

        <div className={styles.grid}>
          {investigations.map((investigation) => (
            <InvestigationCard key={investigation.slug} investigation={investigation} />
          ))}
        </div>
      </div>
    </section>
  );
}