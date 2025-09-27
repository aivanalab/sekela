// Frontend API service configuration
import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://127.0.0.1:8000';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints mapping
export const apiEndpoints = {
  // Universities
  getUniversities: () => api.get('/universities/'),
  getUniversity: (id) => api.get(`/universities/${id}`),
  
  // Insights
  getRegionInsights: () => api.get('/insights/regions'),
  getTypeInsights: () => api.get('/insights/types'),
  getDifficultyInsights: () => api.get('/insights/difficulty'),
  
  // Wizard
  getRecommendations: (preferences) => api.post('/wizard/recommendations', preferences),
  
  // Scraper
  updateData: () => api.post('/scrape/'),
};

// Helper functions for common operations
export const universityService = {
  // Get all universities
  async fetchUniversities() {
    try {
      const response = await apiEndpoints.getUniversities();
      return response.data;
    } catch (error) {
      console.error('Error fetching universities:', error);
      throw error;
    }
  },

  // Get single university by ID
  async fetchUniversity(id) {
    try {
      const response = await apiEndpoints.getUniversity(id);
      return response.data;
    } catch (error) {
      console.error(`Error fetching university ${id}:`, error);
      throw error;
    }
  },

  // Get university recommendations
  async getRecommendations(preferences) {
    try {
      const response = await apiEndpoints.getRecommendations(preferences);
      return response.data;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  },

  // Update university data from external sources
  async updateData() {
    try {
      const response = await apiEndpoints.updateData();
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },
};

export const insightsService = {
  // Get all insights data
  async fetchAllInsights() {
    try {
      const [regions, types, difficulty] = await Promise.all([
        apiEndpoints.getRegionInsights(),
        apiEndpoints.getTypeInsights(),
        apiEndpoints.getDifficultyInsights(),
      ]);
      
      return {
        regions: regions.data,
        types: types.data,
        difficulty: difficulty.data,
      };
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  },

  // Get region-specific insights
  async fetchRegionInsights() {
    try {
      const response = await apiEndpoints.getRegionInsights();
      return response.data;
    } catch (error) {
      console.error('Error fetching region insights:', error);
      throw error;
    }
  },

  // Get type-specific insights
  async fetchTypeInsights() {
    try {
      const response = await apiEndpoints.getTypeInsights();
      return response.data;
    } catch (error) {
      console.error('Error fetching type insights:', error);
      throw error;
    }
  },

  // Get difficulty-specific insights
  async fetchDifficultyInsights() {
    try {
      const response = await apiEndpoints.getDifficultyInsights();
      return response.data;
    } catch (error) {
      console.error('Error fetching difficulty insights:', error);
      throw error;
    }
  },
};

export default api;
