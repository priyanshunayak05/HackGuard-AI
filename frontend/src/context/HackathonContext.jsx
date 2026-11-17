import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockHackathons, mockTeams, mockSubmissions, mockLeaderboard, mockActivityFeed } from '../data/mockData';

const HackathonContext = createContext(null);

export function HackathonProvider({ children }) {
  const [hackathons, setHackathons] = useState(mockHackathons);
  const [activeHackathonId, setActiveHackathonId] = useState(() => {
    return localStorage.getItem('hackguard_active_hackathon') || mockHackathons[0].id;
  });

  const [teams, setTeams] = useState(mockTeams);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [activities, setActivities] = useState(mockActivityFeed);
  const [isLiveConnected, setIsLiveConnected] = useState(true);

  const activeHackathon = hackathons.find((h) => h.id === activeHackathonId) || hackathons[0];

  const changeActiveHackathon = (id) => {
    setActiveHackathonId(id);
    localStorage.setItem('hackguard_active_hackathon', id);
  };

  const addHackathon = (newHackathon) => {
    setHackathons((prev) => [newHackathon, ...prev]);
    addActivity({
      id: `act-${Date.now()}`,
      type: 'hackathon_created',
      title: 'New Hackathon Published',
      description: `${newHackathon.title} is now open for registrations.`,
      timestamp: 'Just now',
      badge: 'Admin Action',
    });
  };

  const addSubmission = (sub) => {
    setSubmissions((prev) => [sub, ...prev]);
    addActivity({
      id: `act-${Date.now()}`,
      type: sub.stage === 'level_1' ? 'submission_l1' : 'submission_l2',
      title: `${sub.stage === 'level_1' ? 'Level 1 Idea' : 'Level 2 Technical'} Submitted`,
      description: `${sub.teamName} submitted project: ${sub.title}`,
      timestamp: 'Just now',
      badge: sub.stage === 'level_1' ? 'Level 1' : 'Level 2',
    });
  };

  const updateSubmission = (id, updates) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const addTeam = (team) => {
    setTeams((prev) => [team, ...prev]);
    addActivity({
      id: `act-${Date.now()}`,
      type: 'team_registered',
      title: 'New Team Registered',
      description: `${team.name} joined with code ${team.joinCode}`,
      timestamp: 'Just now',
      badge: 'Registration',
    });
  };

  const addActivity = (act) => {
    setActivities((prev) => [act, ...prev.slice(0, 19)]);
  };

  // Simulated live socket tick: subtle periodic update to demonstrate realtime state
  useEffect(() => {
    if (!isLiveConnected) return;
    const interval = setInterval(() => {
      // randomly adjust timestamp display or maintain heartbeat
    }, 15000);
    return () => clearInterval(interval);
  }, [isLiveConnected]);

  return (
    <HackathonContext.Provider
      value={{
        hackathons,
        activeHackathonId,
        activeHackathon,
        changeActiveHackathon,
        addHackathon,
        teams,
        addTeam,
        submissions,
        addSubmission,
        updateSubmission,
        leaderboard,
        setLeaderboard,
        activities,
        addActivity,
        isLiveConnected,
        setIsLiveConnected,
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
}

export function useHackathon() {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error('useHackathon must be used within a HackathonProvider');
  }
  return context;
}

