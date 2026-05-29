import React from 'react';
import './EvidenceList.css';

/**
 * EvidenceList component to display array of text observations from transcript evaluation.
 * @param {Object} props
 * @param {Array} props.evidence - List of evidence objects
 * @param {string} props.evidence[].quote - The raw transcript excerpt quote
 * @param {string} props.evidence[].signal - Positive, Negative, or Neutral signal
 * @param {string} props.evidence[].dimension - One of the assessment dimensions
 * @param {string} props.evidence[].layer - Specific operational layer target
 * @param {string} props.evidence[].interpretation - What the quote signifies
 */
function EvidenceList({ evidence = [] }) {
  if (!evidence || evidence.length === 0) {
    return (
      <div className="no-evidence-state">
        No specific evidence observations registered.
      </div>
    );
  }

  return (
    <div className="evidence-list-container">
      <h3 className="evidence-title">Audited Evidence & Excerpts</h3>
      <div className="evidence-grid">
        {evidence.map((item, idx) => {
          const { quote, signal, dimension, layer, interpretation } = item;
          const signalClass = `signal-tag signal-${(signal || 'neutral').toLowerCase()}`;

          return (
            <div className="evidence-item-card" key={idx}>
              <div className="evidence-card-meta">
                <span className={signalClass}>{signal}</span>
                <div className="label-group">
                  {dimension && <span className="meta-label dimension-label">{dimension}</span>}
                  {layer && <span className="meta-label layer-label">{layer}</span>}
                </div>
              </div>

              <blockquote className="evidence-quote">
                “{quote}”
              </blockquote>

              {interpretation && (
                <div className="evidence-interpretation">
                  <span className="interpretation-header">Interpretation:</span>
                  <p className="interpretation-body">{interpretation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EvidenceList;
