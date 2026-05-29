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
2. Provide concrete text evidence/quotes from the transcript.
3. Map observations to the 8 KPIs.
4. Highlight gaps or areas of improvement.
5. Provide follow-up questions to clarify performance or details.
6. Return ONLY a valid, raw JSON object. Do not include markdown code block formatting (such as \`\`\`json ... \`\`\`), no prefixing text, and no suffixing text.

### Required JSON Schema:
{
  "score": {
    "value": 7, // (Integer 1-10)
    "label": "Good / Proficient", // Matching label from rubric
    "band": "Core Performer", // Band name (e.g. Underperforming, Core Performer, High Performer)
    "justification": "Detailed justification paragraph summarizing the transcript evaluation.",
    "confidence": "High", // High, Medium, or Low
    "biasesDetected": [
      "Any cognitive/evaluator biases detected in the supervisor's tone or statements (e.g., Recency bias, Halo effect, Leniency bias, or none)"
    ]
  },
  "evidence": [
    {
      "quote": "Direct quote from the transcript",
      "signal": "Positive", // Positive, Negative, or Neutral
      "dimension": "execution", // execution, systems_building, kpi_impact, change_management
      "layer": "Communication", // Operational layer (e.g., Systems, Comm, Process adherence)
      "interpretation": "Detailed analysis of what this quote indicates about performance."
    }
  ],
  "kpiMapping": [
    {
      "kpi": "lead_conversion", // key identifier from the 8 KPIs
      "label": "Lead Conversion Rate", // Human-readable label
      "evidence": "Detailed observation on how they hit or missed this KPI",
      "dependencyType": "personal" // "system" (tooling/process issue) or "personal" (individual behavior/skill)
    }
  ],
  "gaps": [
    {
      "dimension": "systems_building", // execution, systems_building, kpi_impact, change_management
      "label": "Lack of Structured CRM Logging", // Title of the gap
      "detail": "Detailed explanation of the gap and its impact."
    }
  ],
  "followUpQuestions": [
    {
      "question": "What is the specific follow-up question to clarify the gap?",
      "targetGap": "Lack of Structured CRM Logging", // Title of the gap this question addresses
      "expectedSignal": "What specific indicators or answers to look for in the response"
    }
  ]
}

Ensure the response contains nothing but the raw JSON.`;
}

module.exports = { buildPrompt };
