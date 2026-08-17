const investigations = [
  {
    slug: 'multi-agent-rag-benchmark',
    title: 'Multi-Agent RAG System',
    subtitle: 'Reducing hallucination in retrieval-augmented generation',
    summary:
      "Built a 7-agent pipeline stacking every known technique — HyDE, multi-query, reranking, parallel generation, consensus, verification. Then benchmarked 16 configurations across 432 runs and found half of it wasn't earning its place. The winning setup is smaller than what I built.",
    tags: ['Reranker', 'HyDE', 'RAGAS eval', '432-run benchmark'],
    repoUrl: 'https://github.com/manofvalour/Multiagent_RAG_system',
    previewChart: {
      src: '/images/rag-benchmark/pareto_frontier.png',
      alt: 'Scatter plot of median latency vs quality with a Pareto frontier line connecting non-dominated configs.',
      caption: 'Pareto-optimal configs: D (fastest), F (middle ground), F (highest quality).',
    },
    caseStudy: {
      title: 'Benchmarking My Own Assumptions: A 7-Agent RAG System That Got Smaller After 432 Experiments',

      hook: 'If more techniques reduce hallucination, stacking them should make the system more reliable.',

      intro: [
        "I built a retrieval-augmented generation system around that idea. The resulting system had seven agents. HyDE and multi-query expansion improved retrieval. A reranker narrowed the context. Multiple generators produced candidate answers. A consensus stage selected an answer, followed by verification and confidence scoring.",
        "It looked like a stronger system. I wasn't sure it was a better one. So I stopped adding components and benchmarked the architecture I had built.",
      ],

      github_link: "https://github.com/manofvalour/Multiagent_RAG_system.",

      problem: {
        heading: 'Problem',
        body: "The system had accumulated several techniques for improving retrieval and reducing hallucination: HyDE query expansion, multi-query expansion, reranking, parallel generation, consensus, claim verification, confidence scoring. Each had a reasonable justification in isolation. The problem was that I didn't know which ones were actually earning their place in the pipeline. More components meant more LLM calls, more latency, more failure modes, and more complexity to maintain.",
        question: 'Which configuration gives me the best trade-off between answer quality and latency?',
      },

      hypothesis: {
        heading: 'Hypothesis',
        statement: 'Adding more retrieval and generation safeguards should improve answer quality enough to justify their additional cost.',
        predictions: [
          'The reranker will improve quality at some latency cost.',
          'Three generators will produce better answers than one.',
          'More query variants will improve retrieval.',
          'Combining HyDE and multi-query will be safer than either alone.',
        ],
        closing: "I also had a custom grounding score I expected to provide a useful signal for measuring whether answers were supported by retrieved evidence. These were assumptions. The benchmark was designed to test them.",
      },

      experiment: {
        heading: 'Experiment',
        body: 'I converted the architecture into a full-factorial experiment, varying three factors:',
        factorsTable: {
          headers: ['Factor', 'Levels'],
          rows: [
            ['Reranker', 'ON / OFF'],
            ['Generators', '1 / 3'],
            ['Query expansion', 'HyDE / multi-query / both / off'],
          ],
        },
        workload: '16 configurations, each answering the same 27 evaluation queries: 16 × 27 = 432 runs.',
        metrics: {
          performance: ['Mean latency', 'Median latency', 'P95 latency', 'Maximum latency'],
          quality: ['Faithfulness', 'Answer relevancy', 'Context precision', 'Context recall', 'Claim support'],
          diagnostics: ['Hallucination risk', 'Custom grounding score'],
        },
        closing: "For the final ranking, I combined normalized latency and quality into a balanced composite score, then checked the Pareto frontier and ran a weight sweep to make sure the result wasn't caused by one arbitrary weighting choice.",
      },

      results: {
        heading: 'Results',
        intro: 'The three factors I varied — reranker, generators, and query expansion — had very different effects on latency, and only a marginal effect on quality:',
        leverChart1: {
            src:"/images/rag-benchmark/latency_by_lever.png",
            alt:"Bar charts showing average latency by reranker, generators, and query expansion.",
            caption:"Latency effect of each lever.",
        },

        leverChart2: {
            src:"/images/rag-benchmark/quality_by_lever.png",
            alt:"Bar charts showing average relevancy and recall by expansion, reranker, and generators.",
            caption:"Quality effect of each lever.",
        },

        reranker: {
          heading: '1. The reranker was the biggest lever',
          body: 'I expected the reranker to cost latency, since it added another model call. Instead, it did the opposite: average latency fell from 16.6s to 9.2s when enabled — roughly a 45% reduction. Reranking also improved context precision and claim support without reducing faithfulness.',
          table: {
            headers: ['Reranker', 'Average latency'],
            rows: [
              ['ON', '9,175 ms'],
              ['OFF', '16,628 ms'],
            ],
          },
          explanation: "Retrieval initially produced up to 18 chunks. The reranker narrowed those to 5. The additional ranking step was cheaper than making the generator process a larger, noisier context. The reranker wasn't just a quality component — it reduced the amount of work the generator had to do.",
          chart: {
            src: '/images/rag-benchmark/per_config_latency.png',
            alt: 'Bar chart of median latency per configuration with P95 tail markers.',
            caption: "Latency per config (median vs. P95 tail) — reranker-ON configs cluster at the low end on both.",
          },
        },

        expansion: {
          heading: '2. More query expansion was not better',
          body: 'I expected additional query formulations to improve retrieval coverage. The benchmark showed diminishing returns.',
          table: {
            headers: ['Expansion', 'Average latency'],
            rows: [
              ['Off', '10,864 ms'],
              ['HyDE', '12,094 ms'],
              ['Both', '14,252 ms'],
              ['Multi-query', '14,398 ms'],
            ],
          },
          body2: 'HyDE provided the strongest retrieval-quality trade-off. Multi-query increased latency without a meaningful precision or recall improvement. Combining both added even more latency and produced the worst faithfulness among the expansion strategies.',
          surprise: "I assumed more query variants → more retrieved evidence → better answers. The data suggested something more nuanced: more query variants → more retrieval work, unless the additional queries actually produce better evidence. I wouldn't treat retrieval techniques as additive improvements — their value depends on what the rest of the pipeline is already doing.",
        },

        generators: {
          heading: '3. Three generators barely justified their cost',
          body: 'The system used parallel generation and consensus because I expected multiple independent answers to make the final answer more reliable. There was a small improvement in context recall — 0.979 with one generator, 0.983 with three — but small relative to the extra generation work. The overall winning configuration used one generator.',
          closing: "That changed how I thought about the consensus stage. It wasn't necessarily wrong. It just wasn't earning its cost in this workload.",
        },

        groundingMetric: {
          heading: '4. My grounding metric was broken',
          body: "This was the most important failure in the experiment. I'd built a custom LLM-based grounding judge scoring answers 1–5, intended as a primary signal for hallucination. Instead: 314 of 432 answers (73%) received the worst possible score. Mean was 1.61/5. The Spearman correlation with RAGAS faithfulness was approximately ρ = 0.091 — essentially no relationship.",
          chart: {
            src: '/images/rag-benchmark/grounding_vs_faithfulness.png',
            alt: 'Left: grounding grade distribution flat at 1.0. Right: faithfulness vs grounding scatter showing no relationship.',
            caption: 'Grounding judge output: flat distribution, zero correlation with RAGAS faithfulness.',
          },
          
          rootCause: 'A parser bug: a raw digit regex was extracting digits from larger numbers, while arbitrary-format failures were coerced to the worst score.',
          lesson: "A metric can look sophisticated and still be useless. I had a custom judge, a numerical score, a seemingly objective measurement — but the pipeline underneath it was broken. I excluded grounding from the ranking. That wasn't a failure of the benchmark. Finding the broken metric was one of the results.",
        },

        hallucinationRisk: {
          heading: "5. The pipeline's hallucination-risk label also disagreed with the quality metrics",
          body: 'I tracked a LOW / MEDIUM / HIGH hallucination-risk label produced by the pipeline, expecting configs with better factual quality to show lower risk. Instead, reranked configurations often showed more HIGH risk labels despite higher claim support and similar or better faithfulness.',
          example: 'Configuration F — the eventual winner — had 16 LOW, 6 MEDIUM, 5 HIGH.',
          chart: {
            src: '/images/rag-benchmark/hallucination_risk_mix.png',
            alt: 'Stacked bar chart of LOW/MEDIUM/HIGH hallucination risk labels per configuration.',
            caption: 'Hallucination risk mix per config — reranker-ON configs (A–H) show more HIGH flags despite stronger factual quality.',
          },
          closing: "That told me the pipeline's heuristic hallucination label wasn't reliable enough for model selection. Again, the lesson was about measurement quality, not just model quality.",
        },
      },

      winner: {
        heading: 'Which configuration actually won?',
        body: 'After measuring the individual effects, I ranked all 16 configurations using a balanced objective: 50% latency, 50% quality.',
        rankingTable: {
          headers: ['Rank', 'Configuration', 'Composite'],
          rows: [
            ['1', 'F — Reranker ON · 1 generator · HyDE', '0.962'],
            ['2', 'H — Reranker ON · 1 generator · Off', '0.726'],
            ['3', 'D — Reranker ON · 3 generators · Off', '0.697'],
            ['4', 'C — Reranker ON · 3 generators · Multi-query', '0.650'],
            ['5', 'J — Reranker OFF · 3 generators · HyDE', '0.581'],
          ],
        },
        compositeChart: {
          src: '/images/rag-benchmark/pareto_frontier_and_composite.png',
          alt: 'Horizontal bar chart of balanced composite score per configuration.',
          caption: 'Balanced composite score per configuration.',
        },
        qualityNote: "Before trusting that ranking, it's worth checking the raw RAGAS quality metrics the composite is actually built from:",
        qualityChart: {
          src: '/images/rag-benchmark/ragas_quality.png',
          alt: 'Grouped bar chart of faithfulness, answer relevancy, context precision, and context recall per configuration.',
          caption: 'RAGAS quality metrics across all 16 configurations.',
        },
        paretoNote: "The result wasn't simply 'F has the highest score' — I also checked the speed vs. quality Pareto frontier.",
        paretoChart: {
          src: '/images/rag-benchmark/pareto_frontier.png',
          alt: 'Scatter plot of median latency vs quality with a Pareto frontier line connecting non-dominated configs.',
          caption: 'Pareto-optimal configs: D (fastest), H (middle ground), F (highest quality).',
        },
        closing: 'F remained the winner across three of four latency/quality weightings, only losing to D when the objective became heavily latency-dominated. That gave me more confidence the recommendation wasn\u2019t just an artifact of a 50/50 weighting.',
      },

      finalDecision: {
        heading: 'The final decision',
        body: 'The configuration I would ship: Reranker ON + 1 generator + HyDE.',
        table: {
          headers: ['Objective', 'Configuration', 'Result'],
          rows: [
            ['Fastest', 'D — ON · 3 · off', '4,142 ms median'],
            ['Highest quality', 'F — ON · 1 · HyDE', '0.900 quality'],
            ['Balanced', 'F — ON · 1 · HyDE', '0.962 composite'],
          ],
        },
        closing: 'The winning system is smaller than the system I originally built. That\u2019s the result I cared about most.',
      },

      explanation: {
        heading: 'Explanation',
        body: [
          "The original architecture was based on a reasonable intuition: if one technique helps, several should help more. The benchmark showed why that intuition was incomplete — the techniques interact.",
          "A better reranker reduced the amount of irrelevant context reaching the generator, making the system faster despite adding another processing stage. Once retrieval improved, adding more generators provided little additional value. Similarly, more query expansion strategies increased retrieval work without a corresponding improvement in useful evidence.",
          "The individual techniques weren't necessarily bad — their marginal value changed once other components were present. That's why testing each component in isolation wouldn't have been enough. I needed to test the combinations.",
          "The experiment also changed how I think about evaluation. My custom grounding metric looked useful until I compared it against an established quality signal. The pipeline's hallucination-risk label similarly disagreed with the factual quality metrics. So the benchmark didn't just answer which architecture is best — it also answered which measurements I can trust when making that decision.",
        ],
      },

      nextTime: {
        heading: "What I'd do differently",
        body: "I would build the measurement harness before adding the fourth technique. I spent too much time making the system more sophisticated before proving I could reliably measure whether the sophistication was helping. If I repeated the project, I'd change the order:",
        steps: [
          'Define the engineering question.',
          'Build the evaluation harness.',
          'Validate every metric on manually inspected examples.',
          'Establish a simple baseline.',
          'Add one architectural lever at a time.',
          'Run the factorial benchmark once the measurement pipeline is trustworthy.',
          'Use the benchmark to decide what belongs in the production architecture.',
        ],
        closing: "I'd also add automated tests around every custom evaluator and parser before using its output in model selection. The grounding metric was the clearest example — a sophisticated judge undone by a small parsing bug.",
        lesson: 'Measurement is part of the system. And the broader lesson is simpler: I don\u2019t want to build the most sophisticated RAG system I can. I want to know which complexity earns its place.',
      },
    },
  },
];

export default investigations;