const request = require('supertest');
const app = require('./server');

// Mock the Ollama client so tests run without a live Ollama instance
jest.mock('./ollamaClient', () => ({
  generateFromOllama: jest.fn(),
}));

const { generateFromOllama } = require('./ollamaClient');

// Sample valid LLM response matching the expected schema
const MOCK_LLM_RESPONSE = JSON.stringify({
  score: {
    value: 7,
    band: 'Performance',
    biasesDetected: ['Presence Bias'],
  },
  evidence: [
    {
      quote: 'He helps me with production tracking.',
      signal: 'Positive',
      dimension: 'execution',
      layer: 'Task Execution',
      interpretation: 'Demonstrates hands-on involvement in operational workflows.',
    },
  ],
  kpiMapping: [
    {
      kpi: 'Process Improvement',
      observation: 'Suggested relocating the deburring station.',
      signal: 'Positive',
    },
  ],
  gaps: [
    {
      area: 'Initiative',
      observation: 'Does not push back or suggest alternatives.',
    },
  ],
  followUpQuestions: [
    {
      question: 'Can you describe a time the employee proposed an alternative approach?',
      lookingFor: 'Evidence of independent thinking',
      expectedSignal: 'Evidence of independent thinking',
    },
  ],
});

describe('Trinethra API Server Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return 200 OK and api status message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Trinethra API is running');
    });
  });

  describe('POST /api/analyze', () => {
    it('should return 400 Bad Request if transcript is missing', async () => {
      const response = await request(app)
        .post('/api/analyze')
        .send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'A transcript string is required in the request body.');
    });

    it('should return 400 Bad Request if transcript is not a string', async () => {
      const response = await request(app)
        .post('/api/analyze')
        .send({ transcript: 12345 });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'A transcript string is required in the request body.');
    });

    it('should return a valid analysis when Ollama responds with valid JSON', async () => {
      generateFromOllama.mockResolvedValue(MOCK_LLM_RESPONSE);

      const response = await request(app)
        .post('/api/analyze')
        .send({ transcript: 'Karthik helps me with production tracking on the factory floor.' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('score');
      expect(response.body.score.value).toBe(7);
      expect(response.body.score.band).toBe('Performance');
      expect(response.body.evidence.length).toBeGreaterThan(0);
      expect(response.body.kpiMapping.length).toBeGreaterThan(0);
      expect(response.body.gaps.length).toBeGreaterThan(0);
      expect(response.body.followUpQuestions.length).toBeGreaterThan(0);
      expect(generateFromOllama).toHaveBeenCalledTimes(1);
    });

    it('should retry and succeed if the first Ollama call fails', async () => {
      generateFromOllama
        .mockRejectedValueOnce(new Error('Transient LLM error'))
        .mockResolvedValueOnce(MOCK_LLM_RESPONSE);

      const response = await request(app)
        .post('/api/analyze')
        .send({ transcript: 'Meena made an order tracker spreadsheet for the factory.' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('score');
      expect(generateFromOllama).toHaveBeenCalledTimes(2);
    });

    it('should return 500 if all Ollama retries fail', async () => {
      generateFromOllama.mockRejectedValue(new Error('Ollama is down'));

      const response = await request(app)
        .post('/api/analyze')
        .send({ transcript: 'Anil manages daily production meetings at Prabhat Foods.' });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.details).toContain('Ollama is down');
      expect(generateFromOllama).toHaveBeenCalledTimes(2);
    });
  });
});
