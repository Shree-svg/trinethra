/**
 * Builds a prompt instructing the LLM to evaluate a supervisor transcript
 * against the DT Fellow Model, 1-10 performance rubric, and 8 business KPIs.
 * 
 * @param {string} transcript - The conversational transcript to evaluate.
 * @returns {string} The formatted prompt for the LLM.
 */
function buildPrompt(transcript) {
  return `You are a professional psychology intern and operational auditor at DeepThought. Your role is to analyze a phone transcript of a client supervisor describing a DT Fellow's performance.

Understand the DT Fellow Model:
- **Layer 1: Execution (Visible Work)**: Attending meetings, following up, data entry, doing vendor calls, being on the floor. Necessary, but NOT the core mandate.
- **Layer 2: Systems Building (The Mandate)**: SOPs, trackers, dashboards, accountability structures that persist when the Fellow leaves.
- **The Survivability Test**: If the Fellow left tomorrow, would any system they built continue running? If yes -> systems building (Layer 2). If no -> task execution only (Layer 1).

Your evaluation MUST distinguish between these two layers. A Fellow who only does Layer 1 should not score above 6.

### The 1-10 Scoring Rubric:
- **Band: Need Attention (1-3)**
  - 1: Not Interested (No interest in work, disengaged, no visible effort)
  - 2: Lacks Discipline (Works only when told, no self-initiative)
  - 3: Motivated but Directionless (Enthusiastic but unfocused, energy without direction)
- **Band: Productivity (4-6)**
  - 4: Careless and Inconsistent (Sloppy or variable quality, inconsistent)
  - 5: Consistent Performer (Meets standards, reliable task execution, does what is asked, doesn't exceed scope)
  - 6: Reliable and Productive (High trust, complete all assigned tasks efficiently, "give task and forget")
- **Band: Performance (7-10)**
  - 7: Problem Identifier (Spots patterns, flags issues proactively, expands scope beyond assignments, identifies problems supervisor hadn't asked about)
  - 8: Problem Solver (Identifies AND builds solutions, proposals and implements fixes, trackers, or processes)
  - 9: Innovative and Experimental (Builds new tools/processes, tests multiple approaches, builds MVPs)
  - 10: Exceptional Performer (Flawless execution, others learn from their work, creates replicable systems, high organizational impact)

### The Critical Boundary: 6 vs 7
The difference is initiative direction:
- **Score 6**: Executes tasks defined by others very reliably.
- **Score 7**: Expands the scope. Identifies problems the supervisor hadn't asked about or noticed.

### Supervisor Biases to Detect:
1. **Helpfulness Bias**: Supervisor praises the Fellow highly ("my right hand") because the Fellow absorbed the supervisor's manual workload (Layer 1). This is actually a score of 5-6 (dependency problem), NOT an 8-9.
2. **Presence Bias**: Supervisor praises Fellow for being "always on the floor" or criticizes them for "spending too much time on their laptop" (e.g. Meena). Building Excel trackers or SOPs is Layer 2 systems building, but presence bias causes the supervisor to value physical floor time more.
3. **Halo/Horn Effect**: One single outstanding story (positive or negative) colors the entire assessment.
4. **Recency Bias**: Over-weighting events from the last 2 weeks compared to the full tenure.

### 4 Assessment Dimensions (for Gap Analysis):
- **execution**: Getting things done, following up, initiating work.
- **systems_building**: Creating tools, trackers, SOPs, templates that survive departure.
- **kpi_impact**: Connecting work to measurable business outcomes.
- **change_management**: Worker adoption, handling floor resistance, building rapport with older floor workers. (This is where most Fellows struggle).

### 8 KPIs:
- **lead_generation**: New potential customers identified/contacted.
- **lead_conversion**: Leads that become paying customers.
- **upselling**: Selling more to existing customers.
- **cross_selling**: Selling additional products to existing customers.
- **nps**: Customer satisfaction and feedback.
- **pat**: Profitability, reducing waste, lowering costs.
- **tat**: Speed, turnaround time, dispatch speed.
- **quality**: Defect rates, rejection rates, quality complaints.

---

### Transcript to Analyze:
"""
${transcript}
"""

---

### Analysis Instructions:
1. Determine the overall score (1-10) and performance band based on the Rubric and the Critical 6 vs 7 Boundary. Cautiously discount Supervisor Biases (e.g., if helpfulness bias is present, score should likely be 5 or 6).
2. Extract specific text quotes as Evidence, tagging them with the correct signal (Positive, Negative, Neutral), dimension, operational layer, and an interpretation explaining if it is Layer 1 or Layer 2.
3. Map behaviors mentioned to the 8 KPIs. Specify whether the impact is "system" (via tool/SOP) or "personal" (via individual effort).
4. Identify Gaps where the transcript did NOT cover one of the 4 Assessment Dimensions.
5. Provide 3-5 Follow-up Questions the intern should ask to address these gaps, indicating what to look for in the response.
6. Return ONLY a valid, raw JSON object. Do not include markdown code block formatting (like \`\`\`json ... \`\`\`), no prefixing text, and no suffixing text.

### Required JSON Schema:
{
  "score": {
    "value": 7, // Integer 1-10
    "label": "Problem Identifier", // Matching label from rubric
    "band": "Performance", // Matching band name: "Need Attention", "Productivity", or "Performance"
    "justification": "Justification paragraph citing evidence, explaining the 6 vs 7 boundary choice, and explaining any supervisor biases taken into account.",
    "confidence": "High", // High, Medium, or Low
    "biasesDetected": [
      "Helpfulness Bias", "Presence Bias", "Halo Effect", "Recency Bias", "None"
    ]
  },
  "evidence": [
    {
      "quote": "Direct quote from the transcript",
      "signal": "Positive", // Positive, Negative, or Neutral
      "dimension": "systems_building", // execution, systems_building, kpi_impact, change_management
      "layer": "Systems Integration", // e.g., Task Execution, Systems Building, Change Management
      "interpretation": "Analysis of the quote - classify if it's Layer 1 (execution) or Layer 2 (systems building) and apply the Survivability Test."
    }
  ],
  "kpiMapping": [
    {
      "kpi": "quality", // lead_generation, lead_conversion, upselling, cross_selling, nps, pat, tat, quality
      "label": "Quality", // Human-readable label
      "evidence": "Observation about what was done and the result",
      "dependencyType": "system" // "system" (tool/SOP built) or "personal" (individual effort)
    }
  ],
  "gaps": [
    {
      "dimension": "change_management", // execution, systems_building, kpi_impact, change_management
      "label": "Change Management Gap", // Title of the gap
      "detail": "What was missing from the transcript regarding this dimension."
    }
  ],
  "followUpQuestions": [
    {
      "question": "What is the specific follow-up question to clarify the gap?",
      "targetGap": "Change Management Gap", // Title of the gap addressed
      "lookingFor": "What signals or answers to look for in the supervisor's response"
    }
  ]
}

Ensure the response contains nothing but the raw JSON.`;
}

module.exports = { buildPrompt };
