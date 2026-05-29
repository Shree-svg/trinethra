import React from 'react';
import './ScoreCard.css';

/**
 * ScoreCard component to display evaluation score, labels, and quality signals.
 * @param {Object} props
 * @param {Object} props.score - The score detail object
 * @param {number} props.score.value - Score value (1-10)
 * @param {string} props.score.label - Custom performance label
 * @param {string} props.score.band - Performance tier band
 * @param {string} props.score.justification - Reason for the given score
 * @param {string} props.score.confidence - Confidence level (e.g. High, Medium, Low)
 * @param {string[]} props.score.biasesDetected - Potential biases identified in evaluation
 */
function ScoreCard({ score }) {
  if (!score) return null;

  const { value, label, band, justification, confidence, biasesDetected = [] } = score;

  return (
    <div className="score-card">
      <div className="score-card-header">
        <div className="score-badge-container">
          <div className="score-value">{value}</div>
          <div className="score-scale">/10</div>
        </div>
        <div className="score-meta">
          <h3 className="score-label">{label}</h3>
          <span className="score-band-badge">{band}</span>
        </div>
        {confidence && (
          <div className={`confidence-badge confidence-${confidence.toLowerCase()}`}>
            Confidence: {confidence}
          </div>
        )}
      </div>

      <div className="score-card-body">
        <h4 className="section-title">Justification</h4>
        <p className="justification-text">{justification}</p>

        {biasesDetected.length > 0 && (
          <div className="bias-section">
            <h4 className="section-title warning-title">Potential Biases Detected</h4>
            <ul className="bias-list">
              {biasesDetected.map((bias, idx) => (
                <li key={idx} className="bias-item">{bias}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScoreCard;
