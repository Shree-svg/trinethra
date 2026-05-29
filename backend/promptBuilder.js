/**
 * Builds a prompt instructing the LLM to evaluate a sales or performance transcript
 * against specific dimensions, a 1-10 rubric, and KPIs.
 * 
 * @param {string} transcript - The conversational transcript to evaluate.
 * @returns {string} The formatted prompt for the LLM.
 */
function buildPrompt(transcript) {
  return `You are an expert sales performance and operational auditor. Analyze the following transcript according to the strict criteria, rubric, and JSON format specified below.

### 1-10 Scoring Rubric:
- 1: Not Interested
- 2: Very Low Interest / Performance
- 3: Low Performance
- 4: Below Average
- 5: Average
- 6: Above Average
- 7: Good / Proficient
- 8: High Performer
- 9: Outstanding
- 10: Exceptional Performer

### 4 Assessment Dimensions:
- execution
- systems_building
- kpi_impact
- change_management

### 8 KPIs to Monitor:
- lead_generation
- lead_conversion
- upselling
- cross_selling
- nps
- pat (Process Adherence Time)
- tat (Turnaround Time)
- quality

### Transcript to Analyze:
"""
${transcript}
"""

### Instructions:
1. Carefully analyze the transcript against the 4 Assessment Dimensions and determine the overall score (1 to 10) based on the Rubric.
2. Provide concrete text evidence from the transcript.
3. Map relevant observations to any of the 8 KPIs.
4. Highlight gaps or areas of improvement.
5. Provide follow-up questions to clarify performance or details.
6. Return ONLY a valid, raw JSON object. Do not include markdown code block formatting (such as \`\`\`json ... \`\`\`), no prefixing text, and no suffixing text.

### Required JSON Schema:
{
  "score": 5, // (Integer 1-10)
  "evidence": "String detailing the exact quotes or text evidence supporting the assessment",
  "kpiMapping": {
    // Map any of the 8 KPIs to observed values, behaviors, or notes mentioned in the transcript.
    // e.g., "lead_conversion": "Observation notes", "quality": "Quality check observations"
  },
  "gaps": [
    "List of identified gaps or performance deficiencies"
  ],
  "followUpQuestions": [
    "List of follow-up questions to ask the candidate or agent"
  ]
}

Ensure the response contains nothing but the raw JSON.`;
}

module.exports = { buildPrompt };
