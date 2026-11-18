# HackGuard AI — Secure Hackathon Hosting & Automated Evaluation Engine

<p align="center">
  <img src="frontend/public/shield-brand.svg" width="96" height="96" alt="HackGuard AI Shield Logo" />
</p>

<p align="center">
  <strong>Original "HackGuard Command Center" Platform Architecture</strong><br />
  Secure AI-Powered Hackathon Hosting & Automated Evaluation Engine.
</p>

---

## 🛡️ Overview

HackGuard AI is an automated hackathon hosting and evaluation engine designed to assess technology submissions with mathematical and architectural rigor.

### Key Capabilities
- **Two-Level Evaluation Gating**:
  - **Level 1**: Idea & Feasibility Screening with AI Rubric Calibration.
  - **Level 2**: Technical Implementation evaluated inside isolated Docker Sandboxes with Tree-Sitter AST Structural Plagiarism Detection.
- **Three Dedicated Workspaces**:
  - **Admin Command Center**: Complete control over hackathons, participant rosters, team formations, and live leaderboard finalization.
  - **Participant Workspace**: Personalized dashboard, invitation codes (`NX-XXXX`), multi-step Level 1 wizard, and Level 2 technical code submission workspace.
  - **Judge Assessment Workspace**: Calibrated manual rubric scoring with container test execution inspection and mandatory justification for score overrides.

---

## 📁 Repository Branches

- **`main`**: Default base repository branch.
- **`priyanshu`**: Development branch containing the complete **`frontend/`** React 18 + Vite + Tailwind CSS application.

---

## 🚀 Frontend Quick Start (on branch `priyanshu`)

```bash
# Switch to the frontend branch
git checkout priyanshu

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

© 2026 HackGuard AI. Developed for universities, enterprise hackathons, and high-assurance evaluation.

