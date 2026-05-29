import React from 'react';
import './FollowUpQuestions.css';

/**
 * FollowUpQuestions component to visualize audit inquiries and gap target targets.
 * @param {Object} props
 * @param {Array} props.followUpQuestions - Array of follow-up questions
 * @param {string} props.followUpQuestions[].question - The query to ask
 * @param {string} props.followUpQuestions[].targetGap - The specific area/gap addressed
 * @param {string} props.followUpQuestions[].expectedSignal - What the evaluator should listen for
 */
function FollowUpQuestions({ followUpQuestions = [] }) {
  if (!followUpQuestions || followUpQuestions.length === 0) {
    return (
      <div className="no-questions-state">
        No follow-up questions registered.
      </div>
    );
  }

  return (
    <div className="followup-container">
      <h3 className="followup-title">Clarifying Follow-Up Questions</h3>
      <div className="followup-list">
        {followUpQuestions.map((item, idx) => {
          const { question, targetGap, expectedSignal } = item;

          return (
            <div className="followup-card" key={idx}>
              <div className="followup-card-header">
                <span className="question-number">Question #{idx + 1}</span>
                {targetGap && <span className="target-gap-badge">Target: {targetGap}</span>}
              </div>
              
              <p className="question-text">“{question}”</p>
              
              {expectedSignal && (
                <div className="expected-signal-box">
                  <span className="signal-label">Evaluation Pointer (What to listen for):</span>
                  <p className="signal-body">{expectedSignal}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FollowUpQuestions;
