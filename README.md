# HackGuard AI — Secure Hackathon Hosting & Automated Evaluation Engine

<p align="center">
  <img src="frontend/public/shield-brand.svg" width="96" height="96" alt="HackGuard AI Shield Logo" />
</p>

<p align="center">
  <strong>Original "HackGuard Command Center" Platform Architecture</strong><br />
  Secure AI-Powered Hackathon Hosting & Automated Evaluation Engine.
</p>

---

## 📁 Repository Structure

```
HackGuard-AI/
├── frontend/                     # Full React 18 + Vite + Tailwind frontend application
│   ├── public/                   # Static assets & brand vectors (shield-brand.svg)
│   ├── src/
│   │   ├── components/
│   │   │   ├── brand/            # BrandLogo, StatusBadge, MetricCard
│   │   │   ├── common/           # Button, Input, Select, Modal, Drawer, Table, Tabs, Toast
│   │   │   ├── evaluation/       # Level 1 Wizard, Level 2 Workspace, AI Analysis Report, Docker Terminal, AST Plagiarism View, Judge Scoring Panel
│   │   │   ├── layout/           # AdminLayout, ParticipantLayout, JudgeLayout, Header, Sidebar, PublicNavbar, PublicFooter
│   │   │   └── leaderboard/      # PodiumTopThree, LeaderboardTable, LiveWebSocketIndicator
│   │   ├── context/              # AuthContext (Role Switcher), HackathonContext (Telemetry & State)
│   │   ├── data/                 # Realistic Master Mock Dataset
│   │   ├── pages/
│   │   │   ├── public/           # LandingPage, DiscoverPage, HackathonDetailPage, LoginPage, RegisterPage
│   │   │   ├── admin/            # Dashboard, Hackathons, CreateHackathon, Participants, Teams, Submissions, Queue, Judges, Plagiarism, Leaderboard, Analytics, Settings
│   │   │   ├── participant/      # Workspace, Discover, Registrations, Team, Submissions, Results, Leaderboard, Profile
│   │   │   └── judge/            # Overview, AssignedEvents, ReviewQueue, ProjectDetail, EvaluatedProjects, FeedbackHistory, Profile
│   │   ├── services/             # Centralized Axios API client and domain service modules
│   │   ├── utils/                # cn utility, formatters, validators
│   │   ├── App.jsx               # Master React Router with all role-based workspaces
│   │   ├── main.jsx              # React DOM entry point
│   │   └── index.css             # Tailwind design tokens & subtle scrollbar styles
│   ├── package.json              # Frontend scripts & dependencies
│   ├── tailwind.config.js        # Command Center color palette & typography tokens
│   └── vite.config.js            # Vite configuration with optimized manual chunking
├── README.md                     # Project documentation
└── .gitignore                    # Monorepo git ignore rules
```

---

## 🚀 Quick Start for Frontend

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

---

© 2026 HackGuard AI. Developed for universities, enterprise hackathons, and high-assurance evaluation.
