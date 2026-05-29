import React from 'react';
import './ScoreCard.css';

const RUBRIC_DETAILS = {
  1: { label: "Not Interested", band: "Need Attention" },
  2: { label: "Lacks Discipline", band: "Need Attention" },
  3: { label: "Motivated but Directionless", band: "Need Attention" },
  4: { label: "Careless and Inconsistent", band: "Productivity" },
  5: { label: "Consistent Performer", band: "Productivity" },
  6: { label: "Reliable and Productive", band: "Productivity" },
  7: { label: "Problem Identifier", band: "Performance" },
  8: { label: "Problem Solver", band: "Performance" },
  9: { label: "Innovative and Experimental", band: "Performance" },
  10: { label: "Exceptional Performer", band: "Performance" }
};

const AVAILABLE_BIASES = [
  "Helpfulness Bias",
  "Presence Bias",
  "Halo Effect",
  "Recency Bias"
];

function ScoreCard({ score, onUpdate }) {
  if (!score) return null;

  const { value, label, band, justification = '', confidence, biasesDetected = [] } = score;

  const handleScoreValueChange = (e) => {
    const val = parseInt(e.target.value, 10);
    const details = RUBRIC_DETAILS[val] || { label: "Evaluated", band: "General" };
    onUpdate({
      value: val,
      label: details.label,
      band: details.band
    });
  };

  const handleBiasToggle = (bias) => {
    let updatedBiases = [...biasesDetected];
    if (updatedBiases.includes(bias)) {
      updatedBiases = updatedBiases.filter(b => b !== bias);
    } else {
      updatedBiases.push(bias);
    }
    onUpdate({ biasesDetected: updatedBiases });
  };

  return (
    <div className="score-card">
      <div className="score-card-header-edit">
        <h3 className="section-title-main">Score & Performance Band</h3>
        <div className="badge-flex">
          <div className="score-badge-container">
            <span className="score-value">{value}</span>
            <span className="score-scale">/10</span>
          </div>
          <div className="text-badge-group">
            <span className="score-label-display">{label}</span>
            <span className="score-band-badge">{band}</span>
          </div>
        </div>
      </div>

      <div className="score-grid-container">
        <div className="score-control-group">
          <label className="input-label">Adjust Score</label>
          <select value={value} onChange={handleScoreValueChange} className="score-select">
            {Object.keys(RUBRIC_DETAILS).map(val => (
              <option key={val} value={val}>
                {val} — {RUBRIC_DETAILS[val].label}
              </option>
            ))}
          </select>
        </div>

        <div className="score-control-group">
          <label className="input-label">Confidence</label>
          <select 
            value={confidence || 'Medium'} 
            onChange={(e) => onUpdate({ confidence: e.target.value })} 
            className="score-select"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="score-card-body">
        <div className="score-control-group">
          <label className="input-label">Score Justification & Analysis</label>
          <textarea
            className="score-justification-textarea"
            value={justification}
            onChange={(e) => onUpdate({ justification: e.target.value })}
            rows={5}
            placeholder="Write score justification here..."
          />
        </div>

        <div className="score-control-group">
          <label className="input-label">Supervisor Biases Detected</label>
          <div className="biases-checkbox-grid">
            {AVAILABLE_BIASES.map(bias => {
              const isChecked = biasesDetected.includes(bias);
              return (
                <label key={bias} className={`bias-checkbox-card ${isChecked ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBiasToggle(bias)}
                  />
                  <span>{bias}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
