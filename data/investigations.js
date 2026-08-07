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
      whatIBuilt: {
        heading: 'What I built',
        body: "A 7-agent pipeline: dual query expansion (HyDE + multi-query) feeds retrieval, a reranker agent narrows the chunks, an odd number of models generate in parallel, a consensus agent picks the best answer, and a verification agent checks it's grounded before it ships.",
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
          "I'd also built a custom grounding judge — my proudest piece. The benchmark found it broken: a parser bug flattened most scores to the worst grade, with ~zero correlation to faithfulness. Excluded it. Measure it, or you don't know.",
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
      outcome: {
        heading: 'Where it lands',
        body: "The winning config is smaller than what I built — reranker on, one generator, HyDE-only. The repo still shows the full original architecture; that's deliberate, it's the honest record of what I tested against. I'm updating the live pipeline to match the benchmark now.",
      },
      nextTime: {
        heading: 'What I\u2019d do differently',
        body: "If I did it again, I'd build the measurement harness before adding the fourth technique, not after the seventh. \u201cMore techniques\u201d was a hypothesis I let run for a long time before I ever checked it.",
      },
    },
  },
];

export default investigations;