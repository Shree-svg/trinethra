const express = require('express');
const router = express.Router();
const { buildPrompt } = require('./promptBuilder');
const { generateFromOllama } = require('./ollamaClient');

router.post('/analyze', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'A transcript string is required in the request body.' });
  }

  try {
    const prompt = buildPrompt(transcript);
    const rawResponse = await generateFromOllama(prompt);

    // Attempt to clean the response in case the LLM returned markdown code blocks
    let cleanResponse = rawResponse.trim();
    if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/, '').trim();
    }

    try {
      const parsedData = JSON.parse(cleanResponse);
      return res.json(parsedData);
    } catch (parseError) {
      console.error('Failed to parse Ollama response as JSON:', rawResponse);
      return res.status(500).json({
        error: 'Failed to parse LLM response as JSON.',
        rawResponse: rawResponse
      });
    }
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return res.status(500).json({ error: 'Failed to process transcript analysis.' });
  }
});

module.exports = router;
