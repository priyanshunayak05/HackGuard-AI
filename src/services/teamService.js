import apiClient from './api';
import { mockTeams } from '../data/mockData';

let localTeams = [...mockTeams];

export const teamService = {
  async getByHackathon(hackathonId) {
    try {
      const data = await apiClient.get('/teams', { params: { hackathonId } });
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(localTeams.filter((t) => t.hackathonId === hackathonId));
        }, 150);
      });
    }
  },

  async getById(id) {
    try {
      const data = await apiClient.get(`/teams/${id}`);
      return data;
    } catch {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const found = localTeams.find((t) => t.id === id);
          if (found) resolve({ ...found });
          else reject(new Error('Team not found'));
        }, 150);
      });
    }
  },

  async createTeam(payload) {
    try {
      const data = await apiClient.post('/teams', payload);
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
          const newTeam = {
            id: `team-${Date.now()}`,
            joinCode: `HG-${randomCode}`,
            createdAt: new Date().toISOString(),
            status: 'registered',
            level1Qualified: false,
            rank: localTeams.length + 1,
            members: [
              {
                id: payload.leaderId || 'usr-part-01',
                name: payload.leaderName || 'Current User',
                role: 'Team Leader',
                email: 'user@example.com',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
              },
            ],
            ...payload,
          };
          localTeams = [newTeam, ...localTeams];
          resolve(newTeam);
        }, 250);
      });
    }
  },

  async joinTeamByCode(joinCode, user) {
    try {
      const data = await apiClient.post('/teams/join', { joinCode });
      return data;
    } catch {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const target = localTeams.find(
            (t) => t.joinCode.trim().toUpperCase() === joinCode.trim().toUpperCase()
          );
          if (!target) {
            return reject(new Error('Invalid team join code. Please verify the 6-character code with your team lead.'));
          }
          if (target.members.length >= 4) {
            return reject(new Error('Team has already reached maximum capacity of 4 members.'));
          }
          const alreadyMember = target.members.some((m) => m.id === user.id);
          if (alreadyMember) {
            return resolve(target);
          }
          target.members.push({
            id: user.id,
            name: user.name,
            role: 'Member',
            email: user.email,
            avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          });
          resolve({ ...target });
        }, 300);
      });
    }
  },
};
