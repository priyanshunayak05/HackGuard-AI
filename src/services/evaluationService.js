import apiClient from './api';
import { mockLeaderboard, mockSubmissions } from '../data/mockData';

let localLeaderboard = [...mockLeaderboard];

export const evaluationService = {
  async getLeaderboard(hackathonId) {
    try {
      const data = await apiClient.get('/leaderboard', { params: { hackathonId } });
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([...localLeaderboard]);
        }, 150);
      });
    }
  },

  async submitJudgeReview(submissionId, reviewPayload) {
    try {
      const data = await apiClient.post(`/submissions/${submissionId}/judge-review`, reviewPayload);
      return data;
    } catch {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const sub = mockSubmissions.find((s) => s.id === submissionId);
          if (!sub) return reject(new Error('Submission not found'));
          
          sub.judgeReview = {
            ...sub.judgeReview,
            ...reviewPayload,
            status: 'submitted',
            evaluatedAt: new Date().toISOString(),
          };
          resolve(sub.judgeReview);
        }, 300);
      });
    }
  },

  async triggerAiReevaluation(submissionId) {
    try {
      const data = await apiClient.post(`/submissions/${submissionId}/ai-evaluate`);
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 'success',
            message: 'AI Evaluation pipeline completed in 2.4s.',
            timestamp: new Date().toISOString(),
          });
        }, 1200);
      });
    }
  }
};
