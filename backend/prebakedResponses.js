const prebakedResponses = {
  "karthik": {
    "score": {
      "value": 6,
      "label": "Reliable and Productive",
      "band": "Productivity",
      "justification": "Karthik is highly praised by the founder Mr. Suresh Patil, who displays Presence Bias (valuing Karthik's constant floor presence) and Helpfulness Bias (happy that Karthik handles Tier 1 complaint calls). However, the evidence shows Karthik is mostly doing Layer 1 task execution: manually updating a production tracking sheet and sending it over WhatsApp, and taking the first call on complaints. The only Layer 2 systems building evidence is his drum brake machine layout and cycle time study (saving 10 min per batch). Cautiously discounting the supervisor's glowing praise and applying the Critical 6 vs 7 Boundary: Karthik behaves as a Score 6 (Reliable and Productive) because he executes assigned tasks efficiently but lacks independent push-back or proactive, self-initiated problem identification outside of his defined scope.",
      "confidence": "High",
      "biasesDetected": ["Presence Bias", "Helpfulness Bias"]
    },
    "evidence": [
      {
        "quote": "He helps me with production tracking. Earlier I used to maintain everything in my head... Now Karthik maintains a sheet. Every evening he updates it and sends it to me on WhatsApp.",
        "signal": "Positive",
        "dimension": "execution",
        "layer": "Task Execution",
        "interpretation": "Layer 1 (Execution). The production tracking sheet is maintained personally by Karthik. It is not a self-sustaining system, and if Karthik left tomorrow, the sheet updates would stop."
      },
      {
        "quote": "When we have quality complaints from Tier 1... Karthik takes the first call. He notes down the complaint, talks to the QC team, and gives me a summary.",
        "signal": "Positive",
        "dimension": "execution",
        "layer": "Task Execution",
        "interpretation": "Layer 1 (Execution). Coordination and filtering that reduces supervisor workload but relies on Karthik's personal manual effort rather than a standardized ticketing process."
      },
      {
        "quote": "He did a study on cycle times and suggested we move the deburring station closer to the CNC machines. Good idea. We did it. Saved maybe 10 minutes per batch in material handling.",
        "signal": "Positive",
        "dimension": "systems_building",
        "layer": "Systems Building",
        "interpretation": "Layer 2 (Systems Building). A permanent process change and layout improvement that remains in place even if the Fellow departs."
      },
      {
        "quote": "One thing — he doesn't really push back. If I tell him to do something, he does it. Even if it's not the best way. I wish he would tell me sometimes, 'Sir, I think we should do it differently.'",
        "signal": "Negative",
        "dimension": "execution",
        "layer": "Task Execution",
        "interpretation": "Indicates a lack of independent initiative and push-back. This is a critical indicator that places him at a 6 rather than a 7 on the rubric."
      }
    ],
    "kpiMapping": [
      {
        "kpi": "quality",
        "label": "Quality",
        "evidence": "Handles quality complaints from Tier 1 customers and coordinates with the QC team.",
        "dependencyType": "personal"
      },
      {
        "kpi": "tat",
        "label": "TAT (Turnaround Time)",
        "evidence": "Deburring station layout change saved 10 minutes per batch in material handling.",
        "dependencyType": "system"
      }
    ],
    "gaps": [
      {
        "dimension": "systems_building",
        "label": "Self-Sustaining Production Tracker Gap",
        "detail": "The production tracking sheet is personally maintained and updated by Karthik. No training has been provided to other workers to make this sheet self-sustaining."
      },
      {
        "dimension": "change_management",
        "label": "Floor Worker Change Management Details Missing",
        "detail": "While the supervisor mentions that Karthik speaks Marathi and is liked by the workers, there is no detail on how he managed the floor team's resistance when implementing the layout changes."
      }
    ],
    "followUpQuestions": [
      {
        "question": "If Karthik is absent for a week, does anyone else update the production tracking sheet, or does it stop working?",
        "targetGap": "Self-Sustaining Production Tracker Gap",
        "lookingFor": "Proof of whether the tracking sheet is a self-sustaining system or just a personal task Karthik performs."
      },
      {
        "question": "How did the floor workers react to moving the deburring station? Did Karthik face any pushback, and how did he handle it?",
        "targetGap": "Floor Worker Change Management Details Missing",
        "lookingFor": "Evidence of the Fellow's change management skills and ability to manage relationships with experienced factory floor workers."
      },
      {
        "question": "Has Karthik ever identified an issue in the factory that you were not aware of, and initiated a solution on his own?",
        "targetGap": "Critical 6 vs 7 Boundary Test",
        "lookingFor": "Evidence of independent problem identification (Layer 2, Score 7) rather than just being a highly reliable task executor (Score 6)."
      }
    ]
  },

  "meena": {
    "score": {
      "value": 7,
      "label": "Problem Identifier",
      "band": "Performance",
      "justification": "The supervisor, COO Mr. Arvind Raghunathan, displays Presence Bias, criticizing Meena for 'spending too much time on her laptop' instead of being on the floor. However, Meena has done genuine systems building: she built an Excel order tracker, quantified Line 3's high rejection rate (14% vs 6%), wrote an SOP for the cutting section, and created a daily 11 AM dispatch risk email. This daily alert email successfully saved a Decathlon shipment, representing system-driven TAT improvement. Because Meena proactively analyzed rejection patterns and identified problems that the supervisor hadn't quantified or asked for, she is evaluated as a Score 7 (Problem Identifier). A score of 8 is capped because her systems (like the cutting section SOP) are not yet adopted or used by the floor workers.",
      "confidence": "High",
      "biasesDetected": ["Presence Bias"]
    },
    "evidence": [
      {
        "quote": "She made some Excel sheets. Fine. One is an order tracker... Another one tracks rejection percentages by line... She found that Line 3 has 14% rejection compared to 6% average on the other lines. Nobody had quantified this before.",
        "signal": "Positive",
        "dimension": "systems_building",
        "layer": "Systems Building",
        "interpretation": "Layer 2 (Systems Building). Proactive, data-driven problem identification. Meena quantified a systemic quality issue that the floor management had only assumed."
      },
      {
        "quote": "She also wrote something she calls an 'SOP' for the cutting section... It's well-written. But nobody uses it. She pinned it on the wall near the cutting master's station. It's still there. Nobody reads it.",
        "signal": "Negative",
        "dimension": "change_management",
        "layer": "Change Management",
        "interpretation": "Failed change management. Pinned an SOP to the wall without ensuring team buy-in or addressing the cutting master's real issue (frequent interruptions)."
      },
      {
        "quote": "She started tracking which orders are at risk of missing the ship date and sending me a daily email by 11 AM... Two weeks ago we saved a shipment to Decathlon because of this.",
        "signal": "Positive",
        "dimension": "systems_building",
        "layer": "Systems Building",
        "interpretation": "Layer 2 (Systems Building). A highly effective risk-escalation system that connects directly to business outcomes (TAT)."
      },
      {
        "quote": "She spends too much time on her laptop. In a garment factory, the action is on the floor... typing.",
        "signal": "Neutral",
        "dimension": "execution",
        "layer": "Task Execution",
        "interpretation": "Highlights the supervisor's Presence Bias. The supervisor overlooks analytical systems building (Excel trackers, SOPs) in favor of physical floor presence."
      }
    ],
    "kpiMapping": [
      {
        "kpi": "tat",
        "label": "TAT (Turnaround Time)",
        "evidence": "Order tracker spreadsheet and daily 11 AM dispatch risk email saved a major Decathlon shipment.",
        "dependencyType": "system"
      },
      {
        "kpi": "quality",
        "label": "Quality",
        "evidence": "Quantified Line 3 rejection rate at 14% (against 6% average) and designed a cutting section SOP.",
        "dependencyType": "system"
      }
    ],
    "gaps": [
      {
        "dimension": "change_management",
        "label": "Worker SOP Adoption Resistance Gap",
        "detail": "The cutting section SOP is pinned to the wall but completely ignored by the cutting master. The floor team shows resistance or lack of understanding."
      }
    ],
    "followUpQuestions": [
      {
        "question": "What is Meena's plan to train the cutting master on the new SOP, and has she observed the master's workspace to understand their daily interruptions?",
        "targetGap": "Worker SOP Adoption Resistance Gap",
        "lookingFor": "Whether Meena is adapting her system to floor realities and executing hands-on change management."
      },
      {
        "question": "Besides the Excel sheets, has Meena set up any system to help the line supervisors log their rejection details easily without needing her laptop?",
        "targetGap": "Worker SOP Adoption Resistance Gap",
        "lookingFor": "Efforts to make data collection simple and self-sustaining for the factory workers."
      }
    ]
  },

  "anil": {
    "score": {
      "value": 5,
      "label": "Consistent Performer",
      "band": "Productivity",
      "justification": "Mrs. Sunita Deshpande is glowing about Anil, calling him her 'right hand' and saying she doesn't know how she managed before him. This is a classic case of Helpfulness Bias and Halo Effect. Anil has absorbed the founder's workload: running morning meetings, filtering problems, taking retailer calls, and manually creating the production schedule for Raghav (the production manager). However, this fails the Survivability Test: if Anil leaves tomorrow, the scheduling, distributor tracking, and complaint closure will collapse, as they are personally executed by him. The only genuine system Anil built is the structure for the 20-minute production meeting. Therefore, Anil is scored at a 5 (Consistent Performer) due to critical dependency issues and task absorption rather than system building.",
      "confidence": "High",
      "biasesDetected": ["Helpfulness Bias", "Halo Effect"]
    },
    "evidence": [
      {
        "quote": "Every morning he's in my office at 8:15 with the day's plan... Now he filters. He tells me — these 3 need your decision, these 7 I'll handle.",
        "signal": "Positive",
        "dimension": "execution",
        "layer": "Task Execution",
        "interpretation": "Layer 1 (Execution). Work filtering and personal coordination. While helpful to the founder, it creates an individual dependency rather than a permanent operational system."
      },
      {
        "quote": "He manages the daily production meeting. I used to run it — 45 minutes, no agenda... Anil took it over, made a structure, now it's 20 minutes.",
        "signal": "Positive",
        "dimension": "systems_building",
        "layer": "Systems Building",
        "interpretation": "Layer 2 (Systems Building). A genuine system setup. Anil created a structured, agenda-driven meeting process that can continue running without him."
      },
      {
        "quote": "Anil has started doing Raghav's planning for him. Raghav gives Anil the list of orders and Anil creates the production schedule... Raghav should do his own planning.",
        "signal": "Negative",
        "dimension": "systems_building",
        "layer": "Systems Building",
        "interpretation": "Work absorption instead of systems building. By doing Raghav's planning, Anil has temporarily bypassed Raghav's capability gap instead of building a planner tool Raghav can operate."
      },
      {
        "quote": "Three weeks ago, we had a power failure at 2 AM... Anil came to the factory at 3 AM, personally checked temperature logs, identified compromised batches, held them from dispatch... zero impact.",
        "signal": "Positive",
        "dimension": "execution",
        "layer": "Task Execution",
        "interpretation": "Heroic Layer 1 task execution. While the business impact was positive, this is a highly personal response rather than a self-sustaining overnight alert/SOP system."
      }
    ],
    "kpiMapping": [
      {
        "kpi": "nps",
        "label": "NPS (Customer Satisfaction)",
        "evidence": "Handles retailer quality complaints, reducing closure time from 5 days to under 2 days.",
        "dependencyType": "personal"
      },
      {
        "kpi": "quality",
        "label": "Quality",
        "evidence": "Prevented spoiled batch from dispatching during a 2 AM cold chain power failure, saving paneer recall.",
        "dependencyType": "personal"
      },
      {
        "kpi": "tat",
        "label": "TAT (Turnaround Time)",
        "evidence": "Proactively tracks distributor stock levels to plan shipments rather than waiting for stockouts.",
        "dependencyType": "personal"
      }
    ],
    "gaps": [
      {
        "dimension": "systems_building",
        "label": "Systems Survivability & Work Dependency",
        "detail": "Anil is personally executing operations (stock tracking, dispatch planning, scheduling). If he leaves, these tasks will stop or fail."
      },
      {
        "dimension": "change_management",
        "label": "Manager Enablement and Training Gap",
        "detail": "Anil has absorbed Raghav's planning responsibility instead of teaching/enabling Raghav to plan using a template or SOP."
      }
    ],
    "followUpQuestions": [
      {
        "question": "If Anil takes a week's leave, who will create the production schedule and track Pune/Aurangabad stock levels?",
        "targetGap": "Systems Survivability & Work Dependency",
        "lookingFor": "Confirmation of whether any tools or handovers exist, or if the processes completely stall."
      },
      {
        "question": "What steps is Anil taking to hand scheduling back to Raghav? Has he built a scheduling checklist or template Raghav can use independently?",
        "targetGap": "Manager Enablement and Training Gap",
        "lookingFor": "Transition from task execution (doing Raghav's job) to systems building and enablement (training Raghav to use a template)."
      }
    ]
  }
};

module.exports = prebakedResponses;
