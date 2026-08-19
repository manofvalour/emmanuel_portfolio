import investigations from '../data/investigations';
import InvestigationCard from './InvestigationCard';
import styles from './Work.module.css';

export default function Work() {
  const [featured, ...rest] = investigations;

  return (
    <section id="work" className={styles.work}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Investigations</h2>

        {featured && (
          <div className={styles.featured}>
            <InvestigationCard investigation={featured} featured />
          </div>
        )}

        {rest.length > 0 && (
          <div className={styles.grid}>
            {rest.map((investigation) => (
              <InvestigationCard key={investigation.slug} investigation={investigation} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}