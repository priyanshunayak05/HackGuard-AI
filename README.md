# HackGuard AI — Secure Hackathon Hosting & Automated Evaluation Engine

<p align="center">
  <img src="public/shield-brand.svg" width="96" height="96" alt="HackGuard AI Shield Logo" />
</p>

<p align="center">
  <strong>Original "HackGuard Command Center" Visual Identity & Full Frontend Implementation</strong><br />
  Combines competition management, technical code assessment, and secure execution infrastructure.
</p>

---

## 🛡️ Executive Overview

**HackGuard AI** is a specialized, institutional-grade platform for hosting technology hackathons and executing automated, objective multi-level evaluations. It departs fundamentally from generic SaaS templates and animated chatbots, providing a hardened, engineering-centric command center experience.

### Three Purpose-Built User Roles
1. **Admin / Organizer Command Center**: Full control over competition schedules, dual-stage rubric configuration, qualification gates, participant rosters, team formations, AST plagiarism audit queues, and live leaderboard finalization.
2. **Participant / Team Journey**: Tailored around the competitor lifecycle — team creation with unique invitation codes, Level 1 idea submissions, automatic qualification gate unlocking, and Level 2 code repository submissions.
3. **Judge / Evaluator Workspace**: Calibrated scoring environment displaying AI evaluation baselines alongside manual criterion entry, live demo inspection, container stdout/stderr log verification, and mandatory justification logging for score divergences.

---

## ⚙️ Two-Level Evaluation Mechanics

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LEVEL 1: IDEA & FEASIBILITY                     │
│  Participants submit: Project Title, Problem Statement, Architecture, │
│  PDF Pitch Deck, and 3-Minute Video Walkthrough                        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                   [ Automated AI Screening Engine ]
                   Grounded Rubric Evaluation
                                   │
                                   ▼
                       { Score >= 75.0 Threshold }
                                   │
                  ┌────────────────┴────────────────┐
                  ▼                                 ▼
           [ Stage Passed ]                  [ Stage Locked ]
           Level 2 Unlocked               Detailed Feedback & Audit
                  │
┌─────────────────┴──────────────────────────────────────────────────────┐
│                    LEVEL 2: TECHNICAL CODE EVALUATION                  │
│  Qualified teams submit: Git Repo URL / ZIP Archive, Build Specs,      │
│  and Verification Checklist                                            │
│                                                                        │
│  1. Isolated Docker Container Sandbox (cgroup CPU/RAM limits)          │
│  2. Tree-Sitter AST Structural Plagiarism Engine (CFG Graph Diff)      │
│  3. Automated Benchmark & Test Suite Execution (stdout/stderr)         │
│  4. Lead Judge Rubric Scoring with Calibration & Overrides             │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   REALTIME WEBSOCKET LIVE LEADERBOARD                  │
│  Rank, Weighted Score Calculation, Trend Shifts, Winner Certification │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Creative Direction & Brand System

- **Concept**: *HackGuard Command Center* — Confident, Technical, Organized, Precise, Modern, Trustworthy.
- **Palette**:
  - Primary Graphite: `#111827`
  - Deep Slate: `#183B56`
  - Signal Blue: `#2563EB`
  - Soft Background: `#F5F6F8`
  - White Surface: `#FFFFFF`
  - Border: `#E2E6EC`
  - Secondary Text: `#64748B`
  - Success: `#15966B`
  - Warning: `#D97706`
  - Danger: `#DC2626`
  - AI Processing Engine: `#6557C8`
- **Typography**: Inter with JetBrains Mono for tabular numerals, scores, metrics, container IDs, and AST hashes.
- **Shapes**: Restrained radii (buttons 6-8px, inputs 6-8px, cards 8-10px, modals 10-12px) with subtle borders over heavy drop shadows.

---

## 🚀 Key Implemented Modules & Workspaces

### 1. Public Landing Page & Directory
- Hero with **original interactive product-interface composition** demonstrating live Docker container execution, AST plagiarism scanner, and real-time leaderboard standings.
- 4-step workflow: `01 Organize` &rarr; `02 Compete` &rarr; `03 Evaluate` &rarr; `04 Recognize`.
- Dual-stage visual flow diagram built from frontend components.
- Searchable competition directory with domain and status filters.

### 2. Admin Command Center (`/admin`)
- Metric blocks with tabular numerals for active events, participants, teams, and pending tasks.
- Recharts participation velocity area charts and qualification funnel progression bars.
- Real-time activity telemetry feed and pending action dispatchers.
- Multi-section hackathon creation form (Basic Info, Schedule, Participation, Rubric weights, Review).
- Participant directory, Team management, Submission inspector drawer, and Plagiarism Review Center.

### 3. Participant Experience (`/participant`)
- Personalized dashboard with countdowns, stage badges, and visually prominent "Next Action" CTA.
- Team collaboration: Create team, generate join code, copy invitation code, and join with validation.
- **Level 1 Submission Wizard**: 5-step wizard (Idea Details &rarr; PDF Pitch Deck upload &rarr; Video upload &rarr; Review &rarr; Confirmation).
- **Level 2 Technical Workspace**: Shows unlocked state for qualified teams (&ge; 75.0 pts) with Git repo URL, commit pin, ZIP upload, build command input, and technical verification checklist.
- Detailed assessment results with AI report, Docker logs, and AST score.

### 4. Judge Assessment Workspace (`/judge`)
- Assessment queue of technical submissions.
- Deep project evaluation workspace:
  - Material viewer (repo links, demo videos).
  - AI evaluation report with strengths, limitations, and citations.
  - Interactive **Docker Sandbox Terminal** with stdout/stderr logs and pass/fail counts.
  - **Judge Scoring Panel**: Criterion entry, AI reference comparison, total calculation, and **mandatory override explanation** when diverging &ge; 3.0 points from AI baseline.

### 5. AST Semantic Plagiarism Engine (`/admin/plagiarism`)
- Side-by-side code diff viewer comparing submitted AST tokens with matched source files.
- Control flow graph similarity index and risk classification (Low, Moderate, High, Critical).
- Actions: Dismiss flag, confirm concern, or append reviewer audit notes.

### 6. Live Leaderboard (`/admin/leaderboard`, `/participant/leaderboard`)
- Top 3 engineering podium (Gold, Silver, Bronze Shield candidates).
- Full field rankings with search, sort by total score or rank, trend shifts (`+1`, `0`, `-2`), pass rates, and WebSocket telemetry pulse.
- Winner approval and certification dialog.

---

## 🛠️ Technology Stack

- **React 18** (Functional components, hooks, React Router v6)
- **Vite 6** (Optimized manual code chunking, lightning HMR)
- **Tailwind CSS 3** (Custom HackGuard Command Center color tokens)
- **Recharts 2** (Telemetry area charts, bar charts, and funnels)
- **Lucide React** (Consistent technical interface iconography)
- **Axios** (Centralized client with request/response interceptors)

---

## 💻 Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates production-optimized chunks in `dist/`.

---

## 🔑 Seamless Role Switching

You can switch between **Admin**, **Participant**, and **Judge** at any time using:
1. The **`ROLE:`** selector dropdown located in the top navigation header.
2. The instant role simulator buttons on the landing page hero and sign-in page.

---

© 2026 HackGuard AI. Developed for universities, enterprise hackathons, and high-assurance evaluation.
