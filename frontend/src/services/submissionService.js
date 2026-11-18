import apiClient from './api';
import { mockSubmissions } from '../data/mockData';

let localSubmissions = [...mockSubmissions];

export const submissionService = {
  async getSubmissions(hackathonId, stage = null) {
    try {
      const params = {};
      if (hackathonId) params.hackathonId = hackathonId;
      if (stage) params.stage = stage;
      const data = await apiClient.get('/submissions', { params });
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          let list = [...localSubmissions];
          if (hackathonId) list = list.filter((s) => s.hackathonId === hackathonId);
          if (stage) list = list.filter((s) => s.stage === stage);
          resolve(list);
        }, 150);
      });
    }
  },

  async getById(id) {
    try {
      const data = await apiClient.get(`/submissions/${id}`);
      return data;
    } catch {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const found = localSubmissions.find((s) => s.id === id);
          if (found) resolve({ ...found });
          else reject(new Error('Submission not found'));
        }, 150);
      });
    }
  },

  async submitLevel1(formData) {
    try {
      const data = await apiClient.post('/submissions/level-1', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newSub = {
            id: `sub-l1-${Date.now().toString().slice(-4)}`,
            stage: 'level_1',
            status: 'submitted',
            submittedAt: new Date().toISOString(),
            overallScore: null,
            qualified: false,
            deckFileName: formData.deckFile?.name || 'PitchDeck.pdf',
            deckFileSize: formData.deckFile?.size || 3500000,
            videoFileName: formData.videoFile?.name || 'IntroVideo.mp4',
            videoFileSize: formData.videoFile?.size || 25000000,
            videoDuration: 180,
            ...formData,
          };
          localSubmissions = [newSub, ...localSubmissions];
          resolve(newSub);
        }, 400);
      });
    }
  },

  async submitLevel2(formData) {
    try {
      const data = await apiClient.post('/submissions/level-2', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newSub = {
            id: `sub-l2-${Date.now().toString().slice(-4)}`,
            stage: 'level_2',
            status: 'docker_running',
            submittedAt: new Date().toISOString(),
            archiveFileName: formData.archiveFile?.name || 'project-source.zip',
            archiveFileSize: formData.archiveFile?.size || 8500000,
            dockerExecution: {
              status: 'running',
              testsTotal: 25,
              testsPassed: 0,
              testsFailed: 0,
              logs: ['[HACKGUARD-RUNNER] Initializing isolated Docker worker...', '[CARGO BUILD] Compiling packages...'],
            },
            plagiarism: {
              similarityPercentage: 8.5,
              riskLevel: 'low',
              status: 'scanning',
            },
            ...formData,
          };
          localSubmissions = [newSub, ...localSubmissions];
          resolve(newSub);
        }, 500);
      });
    }
  },
};

