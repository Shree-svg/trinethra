const request = require('supertest');
const app = require('./server');
const prebakedResponses = require('./prebakedResponses');

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

    it('should return prebaked evaluation for Karthik Narayanan demo transcript', async () => {
      const response = await request(app)
        .post('/api/analyze')
        .send({ transcript: 'Karthik Narayanan Veerabhadra Auto components analysis transcript Suresh Patil' });
      
      expect(response.status).toBe(200);
      expect(response.body.score.value).toBe(6);
      expect(response.body.score.band).toBe('Productivity');
      expect(response.body.score.biasesDetected).toContain('Presence Bias');
      expect(response.body.evidence.length).toBeGreaterThan(0);
      expect(response.body.kpiMapping.length).toBeGreaterThan(0);
    });

    it('should return prebaked evaluation for Meena Krishnamurthy demo transcript', async () => {
      const response = await request(app)
        .post('/api/analyze')
        .send({ transcript: 'Meena Krishnamurthy Lakshmi Textiles COO Mr Arvind Raghunathan order tracker Excel' });
      
      expect(response.status).toBe(200);
      expect(response.body.score.value).toBe(7);
      expect(response.body.score.band).toBe('Performance');
      expect(response.body.score.biasesDetected).toContain('Presence Bias');
      expect(response.body.evidence.length).toBeGreaterThan(0);
    });

    it('should return prebaked evaluation for Anil Menon demo transcript', async () => {
      const response = await request(app)
        .post('/api/analyze')
        .send({ transcript: 'Anil Menon Prabhat Foods cold chain incident Sunita Deshpande' });
      
      expect(response.status).toBe(200);
      expect(response.body.score.value).toBe(5);
      expect(response.body.score.band).toBe('Productivity');
      expect(response.body.score.biasesDetected).toContain('Helpfulness Bias');
    });
  });
});
