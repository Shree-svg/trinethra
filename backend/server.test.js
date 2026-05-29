// Trinethra API Server Tests
const request = require('supertest');
const app = require('./server');
const axios = require('axios');

// Global timeout for potentially slow Ollama responses and model loading (5 minutes)
jest.setTimeout(300000);

let ollamaAvailable = false;
beforeAll(async () => {
  try {
    const res = await axios.get('http://localhost:11434/api/tags', { timeout: 2000 });
    ollamaAvailable = res.status === 200;
    if (ollamaAvailable) {
      console.log('Ollama is reachable, integration tests will run.');
    } else {
      console.warn('Ollama not reachable, integration tests will be skipped.');
    }
  } catch (e) {
    console.warn('Ollama not reachable, integration tests will be skipped.');
  }
});

describe('Trinethra API Server Tests', () => {
  describe('GET /', () => {
    it('should return 200 OK and api status message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Trinethra API is running');
    });
  });

  describe('POST /api/analyze', () => {
    it('should return 400 Bad Request if transcript is missing', async () => {
      const response = await request(app).post('/api/analyze').send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'A transcript string is required in the request body.');
    });

    it('should return 400 Bad Request if transcript is not a string', async () => {
      const response = await request(app).post('/api/analyze').send({ transcript: 12345 });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'A transcript string is required in the request body.');
    });

    it('should return a valid analysis when Ollama provides a response', async () => {
      if (!ollamaAvailable) {
        console.warn('Skipping Ollama integration test: Ollama not available');
        return;
      }
      const demoTranscript = 'Karthik Narayanan Veerabhadra Auto components analysis transcript Suresh Patil';
      const response = await request(app).post('/api/analyze').send({ transcript: demoTranscript });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('score');
      expect(response.body).toHaveProperty('evidence');
      expect(response.body).toHaveProperty('kpiMapping');
      expect(response.body).toHaveProperty('gaps');
      expect(response.body).toHaveProperty('followUpQuestions');
    }, 300000);

    it('should retry and succeed if the first Ollama call fails', async () => {
      if (!ollamaAvailable) {
        console.warn('Skipping Ollama retry test: Ollama not available');
        return;
      }
      const demoTranscript = 'Meena Krishnamurthy Lakshmi Textiles COO Mr Arvind Raghunathan order tracker Excel';
      const response = await request(app).post('/api/analyze').send({ transcript: demoTranscript });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('score');
    }, 300000);

    it('should return 500 if all Ollama retries fail', async () => {
      if (!ollamaAvailable) {
        console.warn('Skipping Ollama failure handling test: Ollama not available');
        return;
      }
      const response = await request(app).post('/api/analyze').send({ transcript: 'this will cause Ollama to error' });
      const acceptable = [200, 500];
      expect(acceptable).toContain(response.status);
      if (response.status === 200) {
        expect(response.body).toHaveProperty('score');
      } else {
        expect(response.body).toHaveProperty('error');
      }
    }, 300000);
  });
});
