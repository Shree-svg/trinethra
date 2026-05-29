/**
 * Sends a POST request to a local Ollama instance running llama3.2.
 * @param {string} prompt - The prompt text to generate a completion for.
 * @returns {Promise<string>} The response text from the LLM.
 */
async function generateFromOllama(prompt) {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating from Ollama:', error);
    throw error;
  }
}

module.exports = { generateFromOllama };
