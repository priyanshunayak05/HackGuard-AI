import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HackathonProvider } from './context/HackathonContext';
import { ToastProvider } from './components/common/Toast';
import ProtectedRoute from "./routes/ProtectedRoute";

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import ParticipantLayout from './components/layout/ParticipantLayout';
import JudgeLayout from './components/layout/JudgeLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import DiscoverPage from './pages/public/DiscoverPage';
import HackathonDetailPage from './pages/public/HackathonDetailPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHackathons from './pages/admin/AdminHackathons';
import CreateHackathonPage from './pages/admin/CreateHackathonPage';
import AdminParticipants from './pages/admin/AdminParticipants';
import AdminTeams from './pages/admin/AdminTeams';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import AdminEvaluationQueue from './pages/admin/AdminEvaluationQueue';
import AdminJudges from './pages/admin/AdminJudges';
import AdminPlagiarismReview from './pages/admin/AdminPlagiarismReview';
import AdminLeaderboard from './pages/admin/AdminLeaderboard';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Participant Pages
import ParticipantWorkspace from './pages/participant/ParticipantWorkspace';
import ParticipantDiscover from './pages/participant/ParticipantDiscover';
import ParticipantRegistrations from './pages/participant/ParticipantRegistrations';
import ParticipantTeam from './pages/participant/ParticipantTeam';
import ParticipantSubmissions from './pages/participant/ParticipantSubmissions';
import ParticipantResults from './pages/participant/ParticipantResults';
import ParticipantLeaderboard from './pages/participant/ParticipantLeaderboard';
import ParticipantProfile from './pages/participant/ParticipantProfile';

// Judge Pages
import JudgeOverview from './pages/judge/JudgeOverview';
import JudgeAssignedEvents from './pages/judge/JudgeAssignedEvents';
import JudgeReviewQueue from './pages/judge/JudgeReviewQueue';
import JudgeProjectDetail from './pages/judge/JudgeProjectDetail';
import JudgeEvaluatedProjects from './pages/judge/JudgeEvaluatedProjects';
import JudgeFeedbackHistory from './pages/judge/JudgeFeedbackHistory';
import JudgeProfile from './pages/judge/JudgeProfile';

export default function App() {
  return (
    <AuthProvider>
      <HackathonProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Admin Workspace - Admin Only */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="hackathons" element={<AdminHackathons />} />
                      <Route path="hackathons/create" element={<CreateHackathonPage />} />
                      <Route path="participants" element={<AdminParticipants />} />
                      <Route path="teams" element={<AdminTeams />} />
                      <Route path="submissions" element={<AdminSubmissions />} />
                      <Route path="evaluation-queue" element={<AdminEvaluationQueue />} />
                      <Route path="judges" element={<AdminJudges />} />
                      <Route path="plagiarism" element={<AdminPlagiarismReview />} />
                      <Route path="leaderboard" element={<AdminLeaderboard />} />
                      <Route path="analytics" element={<AdminAnalytics />} />
                      <Route path="settings" element={<AdminSettings />} />
                  </Route>
              </Route>

              {/* Participant Workspace - Candidate Only */}
              <Route element={<ProtectedRoute allowedRoles={["participant"]} />}>
                  <Route path="/participant" element={<ParticipantLayout />}>
                      <Route index element={<ParticipantWorkspace />} />
                      <Route path="discover" element={<ParticipantDiscover />} />
                      <Route path="registrations" element={<ParticipantRegistrations />} />
                      <Route path="team" element={<ParticipantTeam />} />
                      <Route path="submissions" element={<ParticipantSubmissions />} />
                      <Route path="results" element={<ParticipantResults />} />
                      <Route path="leaderboard" element={<ParticipantLeaderboard />} />
                      <Route path="profile" element={<ParticipantProfile />} />
                  </Route>
              </Route>

              {/* Judge Workspace - Judge Only */}
              <Route element={<ProtectedRoute allowedRoles={["judge"]} />}>
                  <Route path="/judge" element={<JudgeLayout />}>
                      <Route index element={<JudgeOverview />} />
                      <Route path="assigned" element={<JudgeAssignedEvents />} />
                      <Route path="review-queue" element={<JudgeReviewQueue />} />
                      <Route path="project/:id" element={<JudgeProjectDetail />} />
                      <Route path="evaluated" element={<JudgeEvaluatedProjects />} />
                      <Route path="feedback-history" element={<JudgeFeedbackHistory />} />
                      <Route path="profile" element={<JudgeProfile />} />
                  </Route>
              </Route>


              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ToastProvider>
      </HackathonProvider>
    </AuthProvider>
  );
}

