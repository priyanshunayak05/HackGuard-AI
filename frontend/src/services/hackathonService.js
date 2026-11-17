import apiClient from './api';
import { mockHackathons } from '../data/mockData';

let localHackathons = [...mockHackathons];

export const hackathonService = {
  async getAll() {
    try {
      const data = await apiClient.get('/hackathons');
      return data;
    } catch {
      // Fallback to local development state
      return new Promise((resolve) => {
        setTimeout(() => resolve([...localHackathons]), 150);
      });
    }
  },

  async getById(id) {
    try {
      const data = await apiClient.get(`/hackathons/${id}`);
      return data;
    } catch {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const found = localHackathons.find((h) => h.id === id || h.slug === id);
          if (found) resolve({ ...found });
          else reject(new Error('Hackathon not found'));
        }, 150);
      });
    }
  },

  async create(payload) {
    try {
      const data = await apiClient.post('/hackathons', payload);
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newHackathon = {
            id: `hack-${Date.now()}`,
            registeredTeamsCount: 0,
            activeSubmissionsCount: 0,
            qualifiedTeamsCount: 0,
            status: 'active',
            currentStage: 'registration',
            ...payload,
          };
          localHackathons = [newHackathon, ...localHackathons];
          resolve(newHackathon);
        }, 300);
      });
    }
  },

  async update(id, updates) {
    try {
      const data = await apiClient.put(`/hackathons/${id}`, updates);
      return data;
    } catch {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = localHackathons.findIndex((h) => h.id === id);
          if (index !== -1) {
            localHackathons[index] = { ...localHackathons[index], ...updates };
            resolve({ ...localHackathons[index] });
          } else {
            reject(new Error('Hackathon not found'));
          }
        }, 200);
      });
    }
  }
};

