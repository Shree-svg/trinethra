const express = require('express');
const router = express.Router();
const { buildPrompt } = require('./promptBuilder');
const { generateFromOllama } = require('./ollamaClient');

/**
 * Strips markdown code blocks and backticks from the LLM output.
 * Helps prevent JSON parsing errors if LLM outputs extra formatting.
 */
function cleanLLMResponse(rawText) {
  let clean = rawText.trim();
  
  // Remove markdown code fences (e.g. ```json ... ``` or ``` ... ```)
  clean = clean.replace(/^```(?:json)?\s*/i, '');
  clean = clean.replace(/\s*```$/, '');
  
  // Strip outer single or triple backticks if they remain
  clean = clean.replace(/^`+|`+$/g, '');
  
  return clean.trim();
}

router.post('/analyze', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'A transcript string is required in the request body.' });
  }

  const prompt = buildPrompt(transcript);
  let attempts = 2;
  let lastError = null;
  let lastRawResponse = '';

  for (let i = 1; i <= attempts; i++) {
    try {
      lastRawResponse = await generateFromOllama(prompt);
      const cleaned = cleanLLMResponse(lastRawResponse);
      const parsedData = JSON.parse(cleaned);
      return res.json(parsedData);
    } catch (error) {
      console.warn(`JSON parsing attempt ${i} failed. Error: ${error.message}`);
      lastError = error;
    }
  }

  console.error('All JSON parsing attempts failed. Raw response was:', lastRawResponse);
  return res.status(500).json({
    error: 'Failed to retrieve a parseable JSON response from the LLM after retries.',
    details: lastError ? lastError.message : 'Unknown error',
    rawResponse: lastRawResponse
  });
});

module.exports = router;

