# HackGuard AI — Frontend Application

<p align="center">
  <img src="public/shield-brand.svg" width="96" height="96" alt="HackGuard AI Shield Logo" />
</p>

<p align="center">
  <strong>Original "HackGuard Command Center" Visual Identity & Frontend Implementation</strong><br />
  Secure AI-Powered Hackathon Hosting & Automated Evaluation Engine.
</p>

---

## 🛡️ Executive Overview

The **HackGuard AI Frontend** is built using React 18, Vite, and Tailwind CSS. It delivers an engineering-centric command center experience with dedicated role workspaces for **Admin / Organizer**, **Participant / Team**, and **Judge / Evaluator**.

### Key Modules
1. **Public Experience & Discovery**:
   - Hero with interactive product-interface composition (active telemetry, Docker test passes, stage tracker, live leaderboard).
   - 4-step workflow: `01 Organize` &rarr; `02 Compete` &rarr; `03 Evaluate` &rarr; `04 Recognize`.
   - Dual-stage visual flow diagram.
   - Searchable hackathon directory with category filters.
   - Instant role-switching presets for testing Admin, Participant, and Judge workspaces.
2. **Admin Command Center (`/admin`)**:
   - Metrics, participation velocity charts, qualification funnels, and realtime activity stream.
   - Multi-section hackathon creator wizard (Basic Info, Schedule, Participation, Rubric weights, Review).
   - Participants & Teams management with contextual inspection drawers.
   - AST Plagiarism Review Center with side-by-side code diffing and audit actions.
   - Official leaderboard with final winner approval workflow.
3. **Participant Workspace (`/participant`)**:
   - Personalized competition overview with prominent Next Action CTA.
   - Team management with 6-character invitation code generation & join validation.
   - 5-step Level 1 Idea submission wizard.
   - Unlocked Level 2 Technical workspace with Docker test runner integration and verification checklists.
4. **Judge Workspace (`/judge`)**:
   - Priority review queue of technical submissions.
   - Comprehensive assessment workspace with Docker test logs and AST similarity indicators.
   - Judge Scoring Panel with AI reference comparison and mandatory override reason logging for score divergences.

---

## 🎨 Design System

- **Palette**: Graphite (`#111827`), Deep Slate (`#183B56`), Signal Blue (`#2563EB`), Soft Background (`#F5F6F8`), White (`#FFFFFF`), Border (`#E2E6EC`), Success (`#15966B`), Warning (`#D97706`), Danger (`#DC2626`), AI Indicator (`#6557C8`).
- **Typography**: Inter with JetBrains Mono for tabular numerals, scores, hashes, and container metrics.
- **Radii**: 6–8px buttons/inputs, 8–10px cards, 10–12px modals.

---

## 🚀 Development Scripts

```bash
# 1. Install dependencies
npm install

# 2. Run Vite dev server (http://localhost:5173)
npm run dev

# 3. Build optimized production bundle
npm run build
```

---

© 2026 HackGuard AI. All rights reserved.
