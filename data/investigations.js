const investigations = [
  {
    slug: 'multi-agent-rag-benchmark',
    title: 'Multi-Agent RAG System',
    subtitle: 'Reducing hallucination in retrieval-augmented generation',
    summary:
      "Built a 7-agent pipeline stacking every known technique — HyDE, multi-query, reranking, parallel generation, consensus, verification. Then benchmarked 16 configurations across 432 runs and found half of it wasn't earning its place. The winning setup is smaller than what I built.",
    tags: ['Reranker', 'HyDE', 'RAGAS eval', '432-run benchmark'],
    caseStudy: {
      title: 'Multi-Agent RAG: Benchmarking My Own Assumptions',

      intro:
        "I built a 7-agent RAG system on one idea: if you stack every known technique for reducing hallucination — HyDE, multi-query expansion, reranking, parallel generation with consensus, a verification pass — the system should get more reliable, not less. More retrieval quality, less hallucination. That was the theory.",

      stack: {
        heading: 'Stack',
        items: [
          'Embeddings: all-MiniLM-L6-v2 (384-dim)',
          'Vector store: Qdrant (HNSW, cosine similarity)',
          'Reranker: jinaai/jina-reranker-v3 (cross-encoder)',
          'Generation: Groq, openai/gpt-oss-120b',
          'Judging: RAGAS scored via Gemini; grounding judge via Groq',
        ],
      },

      whatIBuilt: {
        heading: 'What I built',
        body: "A 7-agent pipeline: dual query expansion (HyDE + multi-query) feeds retrieval, a reranker agent narrows the chunks, an odd number of models generate in parallel, a consensus agent picks the best answer, and a verification agent checks it's grounded before it ships.",
        architecture: [
          'Cache',
          'Query Expansion (HyDE + multi-query)',
          'Chunk Retrieval (top 18)',
          'Reranker Agent (narrows to top 5)',
          'Consensus Agent (1 or 3 parallel generators)',
          'Claim Verification',
          'Confidence Scoring',
          'Response (+ cache + RAGAS eval)',
        ],
      },

      experimentDesign: {
        heading: 'Experiment design',
        body: 'To find out which of these techniques actually earned their place, I ran a full factorial benchmark: every combination of three levers, tested against the same fixed set of 27 queries.',
        factorsTable: {
          headers: ['Factor', 'Levels'],
          rows: [
            ['Reranker', 'ON / OFF'],
            ['Consensus generators', '1 / 3'],
            ['Query expansion', 'both / hyde / multi_query / off'],
          ],
        },
        workload:
          '2 × 2 × 4 = 16 configurations, each run against all 27 queries — 432 query runs total. Measured latency (mean, median, p95, max) and RAGAS quality metrics (faithfulness, answer relevancy, context precision, context recall) alongside claim support, confidence, and a hallucination-risk label.',
      },

      unmeasuredCalls: {
        heading: 'Two calls I made without data',
        items: [
          'Cut parallel generators from 5 to 3 — cost and latency weren\u2019t worth the fifth model.',
          'Swapped a strong reranker for a smaller one — output looked about the same, so I called it a wash.',
        ],
        closing: 'Both reasonable. Neither measured.',
      },

      benchmark: {
        heading: 'The benchmark',
        body: 'Full factorial test: reranker on/off × 1 or 3 generators × 4 expansion strategies. 16 configs, 27 queries each, 432 runs. Measured latency and RAGAS quality metrics.',
        gradingNote:
          "I'd also built a custom grounding judge — my proudest piece. The benchmark found it broken: a regex parser meant to extract a 1–5 grade was instead capturing stray digits inside larger numbers, and coercing any answer it couldn't parse to the worst possible grade. 314 of 432 answers (73%) landed on a flat 1.0, with a mean of 1.61/5. Its correlation with actual faithfulness: 0.091 — statistically indistinguishable from zero. Excluded it from ranking entirely. Measure it, or you don't know.",
        groundingChart: {
          src: '/images/rag-benchmark/grounding_vs_faithfulness.png',
          alt: 'Left: grounding grade distribution flat at 1.0. Right: faithfulness vs grounding scatter showing no relationship.',
          caption: 'Grounding judge output: flat distribution, zero correlation with RAGAS faithfulness.',
        },
      },

      results: {
        heading: 'Results',

        latency: {
          intro:
            'Latency here is dominated by external LLM API time, so median and p95 matter more than the mean. Sorted fastest to slowest by median:',
          table: {
            headers: ['Config', 'Reranker', 'Gen', 'Expansion', 'Median (ms)', 'P95 (ms)'],
            rows: [
              ['D', 'ON', '3', 'off', '4,143', '9,232'],
              ['H', 'ON', '1', 'off', '4,246', '19,505'],
              ['J', 'OFF', '3', 'hyde', '4,716', '13,222'],
              ['F', 'ON', '1', 'hyde', '5,427', '12,958'],
              ['E', 'ON', '1', 'both', '5,564', '11,957'],
              ['C', 'ON', '3', 'multi_query', '5,867', '8,481'],
              ['I', 'OFF', '3', 'both', '6,961', '44,925'],
              ['B', 'ON', '3', 'hyde', '7,036', '54,397'],
              ['A', 'ON', '3', 'both', '8,277', '21,876'],
              ['P', 'OFF', '1', 'off', '8,957', '28,253'],
              ['G', 'ON', '1', 'multi_query', '12,312', '28,301'],
              ['L', 'OFF', '3', 'off', '15,992', '46,988'],
              ['K', 'OFF', '3', 'multi_query', '16,031', '28,625'],
              ['O', 'OFF', '1', 'multi_query', '17,098', '30,593'],
              ['M', 'OFF', '1', 'both', '20,581', '51,353'],
              ['N', 'OFF', '1', 'hyde', '21,193', '39,499'],
            ],
          },
          chart: {
            src: '/images/rag-benchmark/per_config_latency.png',
            alt: 'Bar chart of median latency per configuration with P95 tail markers.',
            caption: 'Median latency (bars) vs P95 tail (dots) across all 16 configurations.',
          },
          mainEffectsTable: {
            headers: ['Lever', 'Level', 'Avg latency (ms)'],
            rows: [
              ['Reranker', 'ON', '9,175'],
              ['Reranker', 'OFF', '16,628'],
              ['Generators', '1', '13,908'],
              ['Generators', '3', '11,895'],
              ['Expansion', 'off', '10,864'],
              ['Expansion', 'hyde', '12,094'],
              ['Expansion', 'both', '14,252'],
              ['Expansion', 'multi_query', '14,398'],
            ],
          },
          mainEffectsChart: {
            src: '/images/rag-benchmark/per_lever_analysis.png',
            alt: 'Six-panel grid showing average latency, relevancy, and recall broken out by each lever independently.',
            caption: 'Main effects: how each lever moves latency, relevancy, and recall in isolation.',
          },
        },

        quality: {
          intro: 'RAGAS quality metrics, normalized 0–1, per configuration:',
          chart: {
            src: '/images/rag-benchmark/ragas_quality.png',
            alt: 'Grouped bar chart of faithfulness, answer relevancy, context precision, and context recall per configuration.',
            caption: 'RAGAS quality metrics across all 16 configurations.',
          },
          table: {
            headers: ['Config', 'Faithfulness', 'Relevancy', 'Precision', 'Recall', 'Claim Support', 'Quality'],
            rows: [
              ['F', '1.000', '0.882', '0.943', '0.981', '0.695', '0.900'],
              ['H', '0.953\u20131.000', '0.878', '0.857', '1.000', '0.561', '0.859'],
              ['D', '1.000', '0.884', '0.832', '1.000', '0.562', '0.855'],
              ['G', '0.994', '0.848', '0.892', '0.944', '0.565', '0.849'],
              ['B', '0.977', '0.893', '0.904', '0.982', '0.486', '0.848'],
              ['A', '0.951', '0.829', '0.876', '0.944', '0.553', '0.831'],
            ],
          },
        },

        hallucinationRisk: {
          intro:
            "The pipeline's own hallucination-risk label told a different story than the quality metrics. Every reranker=ON config carried more HIGH-risk flags than nearly every reranker=OFF config — while also scoring higher on claim support.",
          chart: {
            src: '/images/rag-benchmark/hallucination_risk_mix.png',
            alt: 'Stacked bar chart of LOW/MEDIUM/HIGH hallucination risk labels per configuration.',
            caption: 'Hallucination risk mix per config \u2014 reranker=ON configs (A\u2013H) show more HIGH flags despite higher measured faithfulness.',
          },
          table: {
            headers: ['Config', 'LOW', 'MED', 'HIGH', 'Low fraction'],
            rows: [
              ['F', '16', '6', '5', '0.593'],
              ['H', '12', '7', '8', '0.444'],
              ['D', '11', '8', '8', '0.407'],
              ['P', '11', '16', '0', '0.407'],
              ['I\u2013O (mostly OFF)', '8\u201310', '16\u201319', '0\u20132', '0.296\u20130.370'],
            ],
          },
          closing:
            "This is the second broken measurement the benchmark surfaced: the risk label disagrees with the factual quality metrics badly enough that it shouldn't be trusted for ranking either.",
        },
      },

      findings: {
        heading: 'What the data said — and where I was wrong',
        rows: [
          {
            assumption: 'Reranker swap trades quality for speed',
            reality: 'It wins on both — 45% faster, higher quality',
          },
          {
            assumption: '3 generators justify their cost',
            reality: '1 generator wins; consensus overhead barely helps recall',
          },
          {
            assumption: 'More query variants = better retrieval',
            reality: 'Multi-query adds latency, zero precision/recall gain',
          },
          {
            assumption: 'Combining HyDE + multi-query is safest',
            reality: "It's the worst config for faithfulness",
          },
        ],
        closing: 'HyDE alone, paired with the reranker, was the actual best performer.',
      },

      paretoAndComposite: {
        heading: 'Balanced ranking & Pareto frontier',
        body:
          'A composite score (50% latency, 50% quality) ranks all 16 configs. To make sure the winner wasn\u2019t a coincidence of that 50/50 weighting, I swept the latency weight from 0.3 to 0.9 \u2014 the top config held at three of four weights.',
        paretoChart: {
          src: '/images/rag-benchmark/pareto_frontier.png',
          alt: 'Scatter plot of median latency vs quality with a Pareto frontier line connecting non-dominated configs.',
          caption: 'Speed vs quality Pareto frontier \u2014 configs D, H, and F sit on the frontier.',
        },
        compositeTable: {
          headers: ['Rank', 'Config', 'Composite score'],
          rows: [
            ['1', 'F \u2014 ON \u00b7 1 \u00b7 hyde', '0.962'],
            ['2', 'H \u2014 ON \u00b7 1 \u00b7 off', '0.726'],
            ['3', 'D \u2014 ON \u00b7 3 \u00b7 off', '0.697'],
            ['4', 'C \u2014 ON \u00b7 3 \u00b7 multi_query', '0.650'],
            ['5', 'J \u2014 OFF \u00b7 3 \u00b7 hyde', '0.581'],
          ],
        },
        compositeChart: {
          src: '/images/rag-benchmark/pareto_frontier_and_composite.png',
          alt: 'Horizontal bar chart of balanced composite score per configuration.',
          caption: 'Balanced composite score per configuration, as generated in the analysis notebook.',
        },
      },

      outcome: {
        heading: 'Where it lands',
        body: "The winning config is smaller than what I built — reranker on, one generator, HyDE-only. The repo still shows the full original architecture; that's deliberate, it's the honest record of what I tested against. I'm updating the live pipeline to match the benchmark now.",
        conclusionTable: {
          headers: ['Criterion', 'Winner', 'Value'],
          rows: [
            ['Fastest (median latency)', 'D \u2014 ON \u00b7 3 \u00b7 off', '4,143 ms'],
            ['Highest quality', 'F \u2014 ON \u00b7 1 \u00b7 hyde', 'Quality score 0.900'],
            ['Balanced latency + quality', 'F \u2014 ON \u00b7 1 \u00b7 hyde', 'Composite 0.962'],
          ],
        },
      },

      caveats: {
        heading: 'Caveats',
        body:
          'Latency includes external LLM API variability and retries, so absolute timings are lab-specific rather than universal. The benchmark ran a fixed set of 27 queries \u2014 the reranker effect is the strongest, most repeatable finding here; conclusions on the smaller-margin comparisons should be revalidated on a larger, more diverse query set before treating them as settled.',
      },

      nextTime: {
        heading: 'What I\u2019d do differently',
        body: "If I did it again, I'd build the measurement harness before adding the fourth technique, not after the seventh. \u201cMore techniques\u201d was a hypothesis I let run for a long time before I ever checked it.",
      },
    },
  },
];

export default investigations;