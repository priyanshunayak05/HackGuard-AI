import apiClient from './api';
import { mockSubmissions } from '../data/mockData';

export const plagiarismService = {
  async getFlaggedSubmissions() {
    try {
      const data = await apiClient.get('/plagiarism/flagged');
      return data;
    } catch {
      return new Promise((resolve) => {
        setTimeout(() => {
          const flagged = mockSubmissions.filter(
            (s) => s.plagiarism && s.plagiarism.similarityPercentage > 15
          );
          resolve(flagged);
        }, 150);
      });
    }
  },

  async updateReviewStatus(submissionId, { action, notes }) {
    try {
      const data = await apiClient.post(`/plagiarism/${submissionId}/action`, { action, notes });
      return data;
    } catch {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const sub = mockSubmissions.find((s) => s.id === submissionId);
          if (!sub || !sub.plagiarism) return reject(new Error('Record not found'));
          
          sub.plagiarism.status = action; // 'confirmed_concern' | 'cleared' | 'under_review'
          sub.plagiarism.reviewerNotes = notes;
          resolve({ success: true, status: action, notes });
        }, 200);
      });
    }
  }
};
