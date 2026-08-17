import { useRouter } from 'next/router';
import Link from 'next/link';
import investigations from '../../data/investigations';
import DataTable from '../../components/DataTable';
import Figure from '../../components/Figure';
import TableOfContents from '../../components/TableOfContents';
import styles from './CaseStudy.module.css';

export default function CaseStudyPage({ investigation }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading…</p>;
  }

  const { caseStudy } = investigation;

  return (
    <article className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <Link href="/" className={styles.back}>
            ← Back
          </Link>

          <h1 className={styles.title}>{caseStudy.title}</h1>
          <p className={styles.hook}>{caseStudy.hook}</p>

          {caseStudy.intro.map((paragraph, i) => (
            <p key={i} className={styles.body}>
              {paragraph}
            </p>
          ))}

          <section id="problem" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.problem.heading}</h2>
            <p className={styles.body}>{caseStudy.problem.body}</p>
            <p className={styles.question}>{caseStudy.problem.question}</p>
          </section>

          <section id="hypothesis" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.hypothesis.heading}</h2>
            <p className={styles.question}>{caseStudy.hypothesis.statement}</p>
            <ul className={styles.list}>
              {caseStudy.hypothesis.predictions.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className={styles.body}>{caseStudy.hypothesis.closing}</p>
          </section>

          <section id="experiment" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.experiment.heading}</h2>
            <p className={styles.body}>{caseStudy.experiment.body}</p>
            <DataTable headers={caseStudy.experiment.factorsTable.headers} rows={caseStudy.experiment.factorsTable.rows} />
            <p className={styles.emphasis}>{caseStudy.experiment.workload}</p>
            <p className={styles.body}>{caseStudy.experiment.closing}</p>
          </section>

          <section id="results" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.results.heading}</h2>
            <p className={styles.body}>{caseStudy.results.intro}</p>
            <Figure {...caseStudy.results.leverChart} />

            <h3 className={styles.subheading}>{caseStudy.results.reranker.heading}</h3>
            <p className={styles.body}>{caseStudy.results.reranker.body}</p>
            <DataTable headers={caseStudy.results.reranker.table.headers} rows={caseStudy.results.reranker.table.rows} />
            <p className={styles.body}>{caseStudy.results.reranker.explanation}</p>
            <Figure {...caseStudy.results.reranker.chart} />

            <h3 className={styles.subheading}>{caseStudy.results.expansion.heading}</h3>
            <p className={styles.body}>{caseStudy.results.expansion.body}</p>
            <DataTable headers={caseStudy.results.expansion.table.headers} rows={caseStudy.results.expansion.table.rows} />
            <p className={styles.body}>{caseStudy.results.expansion.body2}</p>
            <p className={styles.emphasis}>{caseStudy.results.expansion.surprise}</p>

            <h3 className={styles.subheading}>{caseStudy.results.generators.heading}</h3>
            <p className={styles.body}>{caseStudy.results.generators.body}</p>
            <p className={styles.emphasis}>{caseStudy.results.generators.closing}</p>

            <h3 className={styles.subheading}>{caseStudy.results.groundingMetric.heading}</h3>
            <p className={styles.body}>{caseStudy.results.groundingMetric.body}</p>
            <Figure {...caseStudy.results.groundingMetric.chart} />
            <p className={styles.body}>{caseStudy.results.groundingMetric.rootCause}</p>
            <p className={styles.emphasis}>{caseStudy.results.groundingMetric.lesson}</p>

            <h3 className={styles.subheading}>{caseStudy.results.hallucinationRisk.heading}</h3>
            <p className={styles.body}>{caseStudy.results.hallucinationRisk.body}</p>
            <p className={styles.body}>{caseStudy.results.hallucinationRisk.example}</p>
            <Figure {...caseStudy.results.hallucinationRisk.chart} />
            <p className={styles.emphasis}>{caseStudy.results.hallucinationRisk.closing}</p>
          </section>

          <section id="winner" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.winner.heading}</h2>
            <p className={styles.body}>{caseStudy.winner.body}</p>
            <DataTable headers={caseStudy.winner.rankingTable.headers} rows={caseStudy.winner.rankingTable.rows} />
            <Figure {...caseStudy.winner.compositeChart} />
            <p className={styles.body}>{caseStudy.winner.qualityNote}</p>
            <Figure {...caseStudy.winner.qualityChart} />
            <p className={styles.body}>{caseStudy.winner.paretoNote}</p>
            <Figure {...caseStudy.winner.paretoChart} />
            <p className={styles.body}>{caseStudy.winner.closing}</p>
          </section>

          <section id="final-decision" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.finalDecision.heading}</h2>
            <p className={styles.body}>{caseStudy.finalDecision.body}</p>
            <DataTable headers={caseStudy.finalDecision.table.headers} rows={caseStudy.finalDecision.table.rows} />
            <p className={styles.emphasis}>{caseStudy.finalDecision.closing}</p>
          </section>

          <section id="explanation" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.explanation.heading}</h2>
            {caseStudy.explanation.body.map((paragraph, i) => (
              <p key={i} className={styles.body}>
                {paragraph}
              </p>
            ))}
          </section>

          <section id="next-time" className={styles.section}>
            <h2 className={styles.heading}>{caseStudy.nextTime.heading}</h2>
            <p className={styles.body}>{caseStudy.nextTime.body}</p>
            <ol className={styles.orderedList}>
              {caseStudy.nextTime.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className={styles.body}>{caseStudy.nextTime.closing}</p>
            <p className={styles.emphasis}>{caseStudy.nextTime.lesson}</p>
          </section>
        </div>

        <TableOfContents />

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