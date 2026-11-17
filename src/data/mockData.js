// HACKGUARD AI - Realistic Master Mock Dataset
// Supports Admin Command Center, Participant Journey, and Judge Assessment

export const mockHackathons = [
  {
    id: "hack-ai-defense-2026",
    title: "Global AI Defense & Trust Challenge",
    slug: "ai-defense-2026",
    tagline: "Building resilient autonomous infrastructure and AI-native security shields",
    category: "Cybersecurity & AI",
    status: "active", // upcoming, active, evaluation, completed
    currentStage: "level_2", // registration, level_1, level_2, finalized
    bannerUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    description: "The premier competitive hackathon focused on evaluating next-generation automated defense systems, privacy-preserving machine learning, and AST code integrity engines.",
    shortDescription: "Automated defense, smart contract security, and verifiable neural agent auditing.",
    startDate: "2026-11-10T09:00:00Z",
    endDate: "2026-11-25T18:00:00Z",
    registrationDeadline: "2026-11-15T23:59:59Z",
    level1Deadline: "2026-11-18T18:00:00Z",
    level2Deadline: "2026-11-24T23:59:59Z",
    minTeamSize: 2,
    maxTeamSize: 4,
    qualificationThreshold: 75.0,
    totalPrizePool: "$45,000",
    rules: [
      "All code submitted for Level 2 must execute within the HackGuard Docker Sandbox without external telemetry bypasses.",
      "AST code analysis will be performed against public repositories and all concurrent team submissions.",
      "Teams must include runnable reproduction scripts and automated test suites.",
      "Plagiarism similarity index exceeding 60% triggers mandatory manual review by the lead evaluator."
    ],
    rubricL1: [
      { id: "r1_prob", name: "Problem Statement & Relevance", weight: 20, maxMarks: 20 },
      { id: "r1_sol", name: "Novelty & Innovation Approach", weight: 30, maxMarks: 30 },
      { id: "r1_feas", name: "Technical Feasibility & Architecture", weight: 30, maxMarks: 30 },
      { id: "r1_pitch", name: "Clarity of Pitch Deck & Intro Video", weight: 20, maxMarks: 20 }
    ],
    rubricL2: [
      { id: "r2_code", name: "Code Architecture & AST Modularity", weight: 25, maxMarks: 25 },
      { id: "r2_exec", name: "Docker Container Execution & Test Pass Rate", weight: 25, maxMarks: 25 },
      { id: "r2_sec", name: "Defensive Robustness & Error Handling", weight: 20, maxMarks: 20 },
      { id: "r2_impact", name: "Functional Impact & Demo Validation", weight: 30, maxMarks: 30 }
    ],
    registeredTeamsCount: 48,
    activeSubmissionsCount: 38,
    qualifiedTeamsCount: 16,
    organizer: "CyberShield Foundation & OpenGov Tech",
  },
  {
    id: "hack-quantum-edge-2026",
    title: "Quantum Edge & Microkernel Hackathon",
    slug: "quantum-edge-2026",
    tagline: "High-performance low-latency decentralized computing at the physical edge",
    category: "Systems & Edge",
    status: "active",
    currentStage: "level_1",
    bannerUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    description: "Designing real-time fault-tolerant embedded runtimes, post-quantum cryptographic primitives, and verifiable lightweight hypervisors.",
    shortDescription: "Embedded microkernels, post-quantum encryption, and hardware-accelerated consensus.",
    startDate: "2026-11-20T10:00:00Z",
    endDate: "2026-12-05T20:00:00Z",
    registrationDeadline: "2026-11-22T23:59:59Z",
    level1Deadline: "2026-11-26T18:00:00Z",
    level2Deadline: "2026-12-04T23:59:59Z",
    minTeamSize: 1,
    maxTeamSize: 3,
    qualificationThreshold: 70.0,
    totalPrizePool: "$30,000",
    rules: [
      "Submissions must compile under standard LLVM / Rust embedded toolchains.",
      "Level 1 idea evaluations require architecture block diagrams."
    ],
    rubricL1: [
      { id: "rq1_1", name: "Novelty in Edge Architecture", weight: 30, maxMarks: 30 },
      { id: "rq1_2", name: "Algorithmic Efficiency", weight: 40, maxMarks: 40 },
      { id: "rq1_3", name: "Specification Documentation", weight: 30, maxMarks: 30 }
    ],
    rubricL2: [
      { id: "rq2_1", name: "Memory Safety & Determinism", weight: 35, maxMarks: 35 },
      { id: "rq2_2", name: "Benchmark Execution Speed", weight: 35, maxMarks: 35 },
      { id: "rq2_3", name: "Documentation & Tests", weight: 30, maxMarks: 30 }
    ],
    registeredTeamsCount: 32,
    activeSubmissionsCount: 21,
    qualifiedTeamsCount: 0,
    organizer: "Quantum Edge Consortium",
  },
  {
    id: "hack-health-ai-2026",
    title: "BioTrust Medical AI Sprint",
    slug: "biotrust-medical-ai",
    tagline: "Verifiable diagnostic AI models with zero synthetic hallucinations",
    category: "Healthcare AI",
    status: "completed",
    currentStage: "finalized",
    bannerUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    description: "Evaluating explainable clinical diagnostic models with automated bias audit engines and strict DICOM compliance standards.",
    shortDescription: "Explainable clinical models, automated bias auditing, and HIPAA-compliant pipelines.",
    startDate: "2026-10-01T08:00:00Z",
    endDate: "2026-10-18T18:00:00Z",
    registrationDeadline: "2026-10-04T23:59:59Z",
    level1Deadline: "2026-10-08T18:00:00Z",
    level2Deadline: "2026-10-16T23:59:59Z",
    minTeamSize: 2,
    maxTeamSize: 4,
    qualificationThreshold: 78.0,
    totalPrizePool: "$50,000",
    rules: [
      "Synthetic test data only. No unredacted PHI permitted."
    ],
    rubricL1: [],
    rubricL2: [],
    registeredTeamsCount: 64,
    activeSubmissionsCount: 52,
    qualifiedTeamsCount: 22,
    organizer: "National BioInformatics Alliance",
  }
];

export const mockUsers = {
  admin: {
    id: "usr-admin-01",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@hackguard.io",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    title: "Chief Competition Director",
    organization: "HackGuard Technical Committee",
  },
  participant: {
    id: "usr-part-01",
    name: "Alex Rivera",
    email: "alex.rivera@polytech.edu",
    role: "participant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    teamId: "team-nexus-def",
    teamName: "Team Nexus Shield",
    title: "Lead Systems Engineer",
    institution: "Institute of Advanced Computing",
  },
  judge: {
    id: "usr-judge-01",
    name: "Prof. Marcus Thorne",
    email: "m.thorne@cyber-institute.org",
    role: "judge",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    expertise: ["AST Analysis", "Docker Sandboxing", "Cryptography", "Distributed Systems"],
    assignedHackathons: ["hack-ai-defense-2026"],
    evaluatedCount: 14,
    pendingCount: 4,
  }
};

export const mockTeams = [
  {
    id: "team-nexus-def",
    hackathonId: "hack-ai-defense-2026",
    name: "Team Nexus Shield",
    joinCode: "NX-8842",
    createdAt: "2026-11-11T14:20:00Z",
    leaderId: "usr-part-01",
    leaderName: "Alex Rivera",
    members: [
      { id: "usr-part-01", name: "Alex Rivera", role: "Team Leader", email: "alex.rivera@polytech.edu", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
      { id: "usr-part-02", name: "Siddharth Verma", role: "Security Researcher", email: "sid.v@polytech.edu", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
      { id: "usr-part-03", name: "Klara Lindqvist", role: "ML Infrastructure", email: "k.lindqvist@polytech.edu", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" }
    ],
    status: "level_2_in_progress", // registered, level_1_submitted, level_1_qualified, level_2_submitted, finalized
    level1Score: 88.5,
    level1Qualified: true,
    qualificationReason: "Exceptional formal verification schema and clear defense threat model.",
    level2Score: null,
    rank: 2,
    projectTitle: "SentinelMesh: Autonomous AST Invariant Verifier",
  },
  {
    id: "team-aether-sec",
    hackathonId: "hack-ai-defense-2026",
    name: "Aether Dynamics",
    joinCode: "AD-5129",
    createdAt: "2026-11-11T16:00:00Z",
    leaderId: "usr-part-04",
    leaderName: "Chen Wei",
    members: [
      { id: "usr-part-04", name: "Chen Wei", role: "Team Leader", email: "chen.wei@mit.edu", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" },
      { id: "usr-part-05", name: "Zoe Kravitz", role: "Fullstack Architect", email: "zoe.k@mit.edu", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80" }
    ],
    status: "level_2_submitted",
    level1Score: 94.0,
    level1Qualified: true,
    qualificationReason: "Top tier proposal with mathematically grounded adversarial training protocols.",
    level2Score: 92.4,
    rank: 1,
    projectTitle: "NeuralArmor: Realtime Weight Poisoning Mitigator",
  },
  {
    id: "team-cipher-core",
    hackathonId: "hack-ai-defense-2026",
    name: "CipherCore Labs",
    joinCode: "CC-9011",
    createdAt: "2026-11-12T10:15:00Z",
    leaderId: "usr-part-06",
    leaderName: "David O'Connor",
    members: [
      { id: "usr-part-06", name: "David O'Connor", role: "Team Leader", email: "david.oc@oxford.ac.uk", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" }
    ],
    status: "level_2_submitted",
    level1Score: 84.0,
    level1Qualified: true,
    qualificationReason: "Rigorous sandbox isolation specification and clean threat matrices.",
    level2Score: 81.5,
    rank: 3,
    projectTitle: "ZeroJail: Hardware-Enforced eBPF Sandbox",
  },
  {
    id: "team-shadow-guard",
    hackathonId: "hack-ai-defense-2026",
    name: "ShadowGuard Squad",
    joinCode: "SG-3321",
    createdAt: "2026-11-12T11:45:00Z",
    leaderId: "usr-part-07",
    leaderName: "Tanya Morozova",
    members: [
      { id: "usr-part-07", name: "Tanya Morozova", role: "Team Leader", email: "tanya.m@kyiv.tech", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" }
    ],
    status: "flagged_plagiarism",
    level1Score: 79.0,
    level1Qualified: true,
    qualificationReason: "Approved on initial idea review; high AST similarity flagged in Level 2.",
    level2Score: null,
    rank: 16,
    projectTitle: "DefendX: Micro-Agent Perimeter Defender",
  }
];

export const mockSubmissions = [
  {
    id: "sub-nx-l1-001",
    teamId: "team-nexus-def",
    teamName: "Team Nexus Shield",
    hackathonId: "hack-ai-defense-2026",
    stage: "level_1",
    status: "evaluated", // submitted, evaluating, evaluated, qualified, rejected
    submittedAt: "2026-11-14T19:30:00Z",
    title: "SentinelMesh: Autonomous AST Invariant Verifier",
    problem: "Existing AI development pipelines suffer from silent bytecode and source tampering. Traditional static linters fail to detect semantic obfuscation injected via untrusted package dependencies.",
    solution: "SentinelMesh constructs control-flow dependency graphs from the source Abstract Syntax Tree (AST) in real-time, enforcing symbolic execution invariants before deployment into production runtime clusters.",
    innovation: "Combines fast tree-sitter AST queries with symbolic smt solver checks, achieving 99.4% detection of logic-bomb payload vectors in sub-100ms compilation phases.",
    technologies: ["Rust", "Tree-Sitter", "Z3 SMT Solver", "Docker", "Wasm"],
    deckFileName: "SentinelMesh_L1_PitchDeck_v2.pdf",
    deckFileSize: 4820100, // ~4.6 MB
    deckUrl: "#preview-pdf",
    videoFileName: "SentinelMesh_Intro_Demo_1080p.mp4",
    videoFileSize: 34100500, // ~32.5 MB
    videoDuration: 184, // 3:04
    videoUrl: "#preview-video",
    overallScore: 88.5,
    qualified: true,
    aiScore: 89.0,
    judgeScore: 88.0,
    evaluatedAt: "2026-11-15T11:20:00Z",
  },
  {
    id: "sub-nx-l2-002",
    teamId: "team-nexus-def",
    teamName: "Team Nexus Shield",
    hackathonId: "hack-ai-defense-2026",
    stage: "level_2",
    status: "in_evaluation", // draft, submitted, docker_running, ast_analyzing, judge_review, completed
    submittedAt: "2026-11-17T22:15:00Z",
    title: "SentinelMesh: Autonomous AST Invariant Verifier (Technical Implementation)",
    description: "Production-ready Rust engine with full Docker sandboxing test runner, benchmark suite against 120 synthetic vulnerable repositories, and web dashboard integration.",
    repoUrl: "https://github.com/nexus-shield/sentinelmesh-core",
    commitHash: "9a2f7c4b18de82fa0",
    archiveFileName: "sentinelmesh-v1.0-release.tar.gz",
    archiveFileSize: 12450000,
    demoVideoUrl: "https://youtu.be/dummy-sentinelmesh-demo",
    demoVideoDuration: 295,
    techStack: ["Rust 1.82", "Docker Engine 27.2", "Axum HTTP", "React 18", "Postgres"],
    buildInstructions: "cargo build --release && ./scripts/run_sandboxed_benchmarks.sh",
    dockerExecution: {
      status: "passed", // running, passed, failed, timeout
      exitCode: 0,
      executionDurationSec: 42.8,
      memoryUsageMb: 248.5,
      cpuUtilizationPct: 78.2,
      testsTotal: 44,
      testsPassed: 44,
      testsFailed: 0,
      containerId: "hg-sandbox-e83fa99b",
      image: "rust:1.82-bookworm-slim",
      logs: [
        "[HACKGUARD-RUNNER] Spawning isolated rootless Docker sandbox hg-sandbox-e83fa99b...",
        "[HACKGUARD-RUNNER] Cgroup limits enforced: Memory: 1024MB, CPU Quota: 2 cores, Network: DENIED.",
        "[CARGO BUILD] Compiling sentinelmesh-ast-parser v1.0.0 (/workspace/core/ast)",
        "[CARGO BUILD] Compiling sentinelmesh-verifier v1.0.0 (/workspace/verifier)",
        "[CARGO BUILD] Finished release [optimized] target(s) in 24.12s",
        "[TEST RUNNER] Running target/release/deps/test_invariant_suite-9d821",
        "running 44 tests",
        "test tests::ast::test_tree_sitter_rust_syntax ... ok",
        "test tests::ast::test_control_flow_graph_cycles ... ok",
        "test tests::solver::test_smt_symbolic_path_reduction ... ok",
        "test tests::sandbox::test_prevent_unauthorized_syscall_read ... ok",
        "test tests::stress::test_benchmark_10k_loc_under_120ms ... ok",
        "test result: ok. 44 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 18.42s",
        "[HACKGUARD-RUNNER] Sandboxed execution clean exit with code 0."
      ]
    },
    plagiarism: {
      similarityPercentage: 11.4,
      riskLevel: "low", // low, moderate, high, critical
      matchedTeam: "OpenSource AST Base (Tree-Sitter Official)",
      matchedFilesCount: 2,
      astFingerprintScore: 0.94,
      status: "cleared",
      summary: "High structural originality. Matched tokens correspond to standard Tree-Sitter API boilerplate headers in ast_visitor.rs."
    },
    aiEvaluation: {
      overallScore: 91.2,
      criteria: [
        { name: "Code Architecture & Modularity", score: 23.5, max: 25 },
        { name: "Docker Execution & Test Pass Rate", score: 25.0, max: 25 },
        { name: "Defensive Robustness & Error Handling", score: 18.5, max: 20 },
        { name: "Functional Impact & Demo Validation", score: 24.2, max: 30 }
      ],
      summary: "SentinelMesh demonstrates exceptional engineering rigor. The Rust codebase exhibits idiomatic ownership semantics, zero unsafe blocks in critical parsing passes, and well-isolated AST transformation modules.",
      strengths: [
        "Fully isolated rootless execution with strict cgroup isolation constraints.",
        "Deterministic SMT solver timeouts preventing denial-of-service on malicious inputs.",
        "Comprehensive automated test coverage (44/44 unit and stress test passes)."
      ],
      weaknesses: [
        "Memory footprint during large 100,000+ line AST synthesis peaks at 248MB; could leverage incremental stream parsing.",
        "Error diagnostic messages on malformed syntax could be more granular for end-users."
      ],
      actionableSuggestions: [
        "Implement memory arena allocations for transient tree nodes.",
        "Expose a structured JSON diagnostic stream alongside terminal stderr."
      ],
      citations: [
        "File: core/src/ast/visitor.rs:L48 - Clean non-recursive visitor pattern prevents call-stack exhaustion.",
        "File: verifier/src/engine.rs:L112 - Hardened invariant verification loop with monotonic clock guards."
      ]
    },
    judgeReview: {
      judgeId: "usr-judge-01",
      judgeName: "Prof. Marcus Thorne",
      status: "pending_submission", // pending, saved_draft, submitted
      scores: [
        { criterionId: "r2_code", criterionName: "Code Architecture & AST Modularity", maxMarks: 25, enteredMarks: 24, remarks: "Extremely clean modularization; Rust AST bindings are exemplary." },
        { criterionId: "r2_exec", criterionName: "Docker Container Execution & Test Pass Rate", maxMarks: 25, enteredMarks: 25, remarks: "Flawless container execution in 42s with zero warnings." },
        { criterionId: "r2_sec", criterionName: "Defensive Robustness & Error Handling", maxMarks: 20, enteredMarks: 18, remarks: "Solid failure modes; good syscall containment." },
        { criterionId: "r2_impact", criterionName: "Functional Impact & Demo Validation", maxMarks: 30, enteredMarks: 26, remarks: "Very convincing live demonstration and documentation." }
      ],
      totalJudgeScore: 93.0,
      feedback: "One of the strongest technical submissions in this event. The architectural separation of parser and invariant verifier makes it production-viable.",
      isOverride: true,
      overrideReason: "AI scored functional impact at 24.2, but manual verification of the live demo video revealed sophisticated edge-case handling worthy of 26 marks."
    }
  },
  {
    id: "sub-sg-l2-004",
    teamId: "team-shadow-guard",
    teamName: "ShadowGuard Squad",
    hackathonId: "hack-ai-defense-2026",
    stage: "level_2",
    status: "flagged_plagiarism",
    submittedAt: "2026-11-17T20:40:00Z",
    title: "DefendX: Micro-Agent Perimeter Defender",
    description: "Multi-agent coordinator with automated intrusion honeypots.",
    repoUrl: "https://github.com/shadow-guard/defendx-agent",
    commitHash: "4c11b09fa311",
    dockerExecution: {
      status: "passed",
      exitCode: 0,
      executionDurationSec: 35.1,
      memoryUsageMb: 180,
      cpuUtilizationPct: 55,
      testsTotal: 18,
      testsPassed: 18,
      testsFailed: 0,
      logs: ["[HACKGUARD-RUNNER] Tests passed with exit code 0."]
    },
    plagiarism: {
      similarityPercentage: 78.4,
      riskLevel: "critical",
      matchedTeam: "Public GitHub (HoneyPy / Autonomous-Agent-Toolkit)",
      matchedFilesCount: 6,
      astFingerprintScore: 0.22,
      status: "under_review",
      summary: "Severe AST token overlap detected across agent_dispatcher.py and honeypot_handler.py. Control flow graph is 89% identical to an existing MIT-licensed open source framework with variable renames.",
      matchedCodeRegions: [
        {
          file: "agent/dispatcher.py",
          submissionCode: `def dispatch_incident_packet(self, packet_stream, risk_threshold):\n    for event in packet_stream:\n        score = self.evaluator.compute_entropy(event.payload)\n        if score > risk_threshold:\n            quarantine_node(event.source_ip)\n            self.audit_log.append(event.id)`,
          sourceCode: `def dispatch_packet_event(self, raw_stream, min_confidence):\n    for item in raw_stream:\n        metric = self.scanner.compute_entropy(item.data)\n        if metric > min_confidence:\n            isolate_endpoint(item.origin_ip)\n            self.history.append(item.id)`,
          similarity: 91.5
        }
      ]
    },
    aiEvaluation: {
      overallScore: 68.0,
      criteria: [
        { name: "Code Architecture & Modularity", score: 18.0, max: 25 },
        { name: "Docker Execution & Test Pass Rate", score: 25.0, max: 25 },
        { name: "Defensive Robustness & Error Handling", score: 12.0, max: 20 },
        { name: "Functional Impact & Demo Validation", score: 13.0, max: 30 }
      ],
      summary: "High algorithmic similarity to pre-existing open repositories. While container execution succeeded, novel contribution in code logic is minimal.",
      strengths: ["Docker file is cleanly configured."],
      weaknesses: ["Massive AST duplication with external honey-agent package.", "Lack of original consensus logic."],
      actionableSuggestions: ["Provide documented attribution or re-implement core dispatcher algorithm."],
      citations: ["File: agent/dispatcher.py:L14 - Exact structural duplicate of PyHoneypot Core."]
    },
    judgeReview: {
      judgeId: "usr-judge-01",
      judgeName: "Prof. Marcus Thorne",
      status: "saved_draft",
      scores: [],
      totalJudgeScore: null,
      feedback: "Review on hold pending plagiarism committee investigation.",
      isOverride: false,
      overrideReason: ""
    }
  }
];

export const mockLeaderboard = [
  {
    rank: 1,
    previousRank: 2,
    teamId: "team-aether-sec",
    teamName: "Aether Dynamics",
    projectTitle: "NeuralArmor: Realtime Weight Poisoning Mitigator",
    members: ["Chen Wei", "Zoe Kravitz"],
    level1Score: 94.0,
    level2Score: 92.4,
    codePassRate: 100,
    plagiarismSimilarity: 6.2,
    totalWeightedScore: 93.2,
    status: "finalized",
    badge: "Gold Shield Candidate"
  },
  {
    rank: 2,
    previousRank: 1,
    teamId: "team-nexus-def",
    teamName: "Team Nexus Shield",
    projectTitle: "SentinelMesh: Autonomous AST Invariant Verifier",
    members: ["Alex Rivera", "Siddharth Verma", "Klara Lindqvist"],
    level1Score: 88.5,
    level2Score: 92.1,
    codePassRate: 100,
    plagiarismSimilarity: 11.4,
    totalWeightedScore: 90.7,
    status: "evaluated",
    badge: "Silver Shield Candidate"
  },
  {
    rank: 3,
    previousRank: 4,
    teamId: "team-cipher-core",
    teamName: "CipherCore Labs",
    projectTitle: "ZeroJail: Hardware-Enforced eBPF Sandbox",
    members: ["David O'Connor"],
    level1Score: 84.0,
    level2Score: 81.5,
    codePassRate: 95.5,
    plagiarismSimilarity: 8.9,
    totalWeightedScore: 82.8,
    status: "evaluated",
    badge: "Bronze Shield Candidate"
  },
  {
    rank: 4,
    previousRank: 3,
    teamId: "team-veritas-net",
    teamName: "Veritas Net",
    projectTitle: "VeriChain: Byzantine Fault Tolerant Model Registry",
    members: ["Amara Okafor", "Liam Evans"],
    level1Score: 82.0,
    level2Score: 79.5,
    codePassRate: 90.0,
    plagiarismSimilarity: 14.1,
    totalWeightedScore: 80.5,
    status: "evaluated",
    badge: "Honorable Mention"
  },
  {
    rank: 5,
    previousRank: 5,
    teamId: "team-hyper-secure",
    teamName: "HyperSecure IO",
    projectTitle: "Attestor: SGX Enclave AI Verification",
    members: ["Hanna Schmidt", "Felix Bauer"],
    level1Score: 78.5,
    level2Score: 77.0,
    codePassRate: 88.0,
    plagiarismSimilarity: 18.3,
    totalWeightedScore: 77.6,
    status: "evaluated",
    badge: "Finalist"
  }
];

export const mockActivityFeed = [
  {
    id: "act-01",
    type: "submission_received",
    title: "Level 2 Submission Received",
    description: "Team Nexus Shield pushed release commit 9a2f7c4 to SentinelMesh.",
    timestamp: "12 minutes ago",
    badge: "Level 2"
  },
  {
    id: "act-02",
    type: "docker_completed",
    title: "Docker Sandbox Execution Passed",
    description: "44/44 unit and invariant tests passed for hg-sandbox-e83fa99b in 42.8s.",
    timestamp: "10 minutes ago",
    badge: "Container"
  },
  {
    id: "act-03",
    type: "plagiarism_flagged",
    title: "AST Similarity Warning Flagged",
    description: "ShadowGuard Squad flagged with 78.4% AST structural match against PyHoneypot.",
    timestamp: "2 hours ago",
    badge: "AST Engine"
  },
  {
    id: "act-04",
    type: "judge_assigned",
    title: "Judge Assigned to Review",
    description: "Prof. Marcus Thorne assigned to SentinelMesh technical evaluation.",
    timestamp: "3 hours ago",
    badge: "Evaluation"
  },
  {
    id: "act-05",
    type: "team_qualified",
    title: "Team Qualified for Level 2",
    description: "Aether Dynamics achieved 94.0 in Level 1 and unlocked Technical Stage.",
    timestamp: "1 day ago",
    badge: "Stage Progression"
  }
];
