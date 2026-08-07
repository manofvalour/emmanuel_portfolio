import { useRouter } from 'next/router';
import Link from 'next/link';
import investigations from '../../data/investigations';
import styles from './CaseStudy.module.css';

export default function CaseStudyPage({ investigation }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading…</p>;
  }

  const { caseStudy } = investigation;

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          ← Back
        </Link>

        <h1 className={styles.title}>{caseStudy.title}</h1>

        <p className={styles.body}>{caseStudy.intro}</p>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.whatIBuilt.heading}</h2>
          <p className={styles.body}>{caseStudy.whatIBuilt.body}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.unmeasuredCalls.heading}</h2>
          <ul className={styles.list}>
            {caseStudy.unmeasuredCalls.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.emphasis}>{caseStudy.unmeasuredCalls.closing}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.benchmark.heading}</h2>
          <p className={styles.body}>{caseStudy.benchmark.body}</p>
          <p className={styles.body}>{caseStudy.benchmark.gradingNote}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.findings.heading}</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>My assumption</th>
                <th>What the data showed</th>
              </tr>
            </thead>
            <tbody>
              {caseStudy.findings.rows.map((row) => (
                <tr key={row.assumption}>
                  <td>{row.assumption}</td>
                  <td>{row.reality}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.emphasis}>{caseStudy.findings.closing}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.outcome.heading}</h2>
          <p className={styles.body}>{caseStudy.outcome.body}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.nextTime.heading}</h2>
          <p className={styles.body}>{caseStudy.nextTime.body}</p>
        </section>
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = investigations.map((investigation) => ({
    params: { slug: investigation.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const investigation = investigations.find((inv) => inv.slug === params.slug);

  return { props: { investigation } };
}