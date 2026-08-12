import { useRouter } from 'next/router';
import Link from 'next/link';
import investigations from '../../data/investigations';
import DataTable from '../../components/DataTable';
import Figure from '../../components/Figure';
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
          <h2 className={styles.heading}>{caseStudy.stack.heading}</h2>
          <ul className={styles.list}>
            {caseStudy.stack.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.whatIBuilt.heading}</h2>
          <p className={styles.body}>{caseStudy.whatIBuilt.body}</p>
          <ol className={styles.orderedList}>
            {caseStudy.whatIBuilt.architecture.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.experimentDesign.heading}</h2>
          <p className={styles.body}>{caseStudy.experimentDesign.body}</p>
          <DataTable
            headers={caseStudy.experimentDesign.factorsTable.headers}
            rows={caseStudy.experimentDesign.factorsTable.rows}
          />
          <p className={styles.body}>{caseStudy.experimentDesign.workload}</p>
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
          <Figure
            src={caseStudy.benchmark.groundingChart.src}
            alt={caseStudy.benchmark.groundingChart.alt}
            caption={caseStudy.benchmark.groundingChart.caption}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.results.heading}</h2>

          <h3 className={styles.subheading}>Latency</h3>
          <p className={styles.body}>{caseStudy.results.latency.intro}</p>
          <DataTable
            headers={caseStudy.results.latency.table.headers}
            rows={caseStudy.results.latency.table.rows}
          />
          <Figure
            src={caseStudy.results.latency.chart.src}
            alt={caseStudy.results.latency.chart.alt}
            caption={caseStudy.results.latency.chart.caption}
          />
          <DataTable
            headers={caseStudy.results.latency.mainEffectsTable.headers}
            rows={caseStudy.results.latency.mainEffectsTable.rows}
          />
          <Figure
            src={caseStudy.results.latency.mainEffectsChart.src}
            alt={caseStudy.results.latency.mainEffectsChart.alt}
            caption={caseStudy.results.latency.mainEffectsChart.caption}
          />

          <h3 className={styles.subheading}>Quality</h3>
          <p className={styles.body}>{caseStudy.results.quality.intro}</p>
          <Figure
            src={caseStudy.results.quality.chart.src}
            alt={caseStudy.results.quality.chart.alt}
            caption={caseStudy.results.quality.chart.caption}
          />
          <DataTable
            headers={caseStudy.results.quality.table.headers}
            rows={caseStudy.results.quality.table.rows}
          />

          <h3 className={styles.subheading}>Hallucination risk</h3>
          <p className={styles.body}>{caseStudy.results.hallucinationRisk.intro}</p>
          <Figure
            src={caseStudy.results.hallucinationRisk.chart.src}
            alt={caseStudy.results.hallucinationRisk.chart.alt}
            caption={caseStudy.results.hallucinationRisk.chart.caption}
          />
          <DataTable
            headers={caseStudy.results.hallucinationRisk.table.headers}
            rows={caseStudy.results.hallucinationRisk.table.rows}
          />
          <p className={styles.emphasis}>{caseStudy.results.hallucinationRisk.closing}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.findings.heading}</h2>
          <DataTable
            headers={['My assumption', 'What the data showed']}
            rows={caseStudy.findings.rows.map((row) => [row.assumption, row.reality])}
          />
          <p className={styles.emphasis}>{caseStudy.findings.closing}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.paretoAndComposite.heading}</h2>
          <p className={styles.body}>{caseStudy.paretoAndComposite.body}</p>
          <Figure
            src={caseStudy.paretoAndComposite.paretoChart.src}
            alt={caseStudy.paretoAndComposite.paretoChart.alt}
            caption={caseStudy.paretoAndComposite.paretoChart.caption}
          />
          <DataTable
            headers={caseStudy.paretoAndComposite.compositeTable.headers}
            rows={caseStudy.paretoAndComposite.compositeTable.rows}
          />
          <Figure
            src={caseStudy.paretoAndComposite.compositeChart.src}
            alt={caseStudy.paretoAndComposite.compositeChart.alt}
            caption={caseStudy.paretoAndComposite.compositeChart.caption}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.outcome.heading}</h2>
          <p className={styles.body}>{caseStudy.outcome.body}</p>
          <DataTable
            headers={caseStudy.outcome.conclusionTable.headers}
            rows={caseStudy.outcome.conclusionTable.rows}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>{caseStudy.caveats.heading}</h2>
          <p className={styles.body}>{caseStudy.caveats.body}</p>
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