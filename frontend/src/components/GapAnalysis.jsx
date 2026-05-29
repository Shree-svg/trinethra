import React from 'react';
import './GapAnalysis.css';

/**
 * GapAnalysis component to display performance flags and area-based concerns.
 * @param {Object} props
 * @param {Array} props.gaps - List of missing dimensions or gaps
 * @param {string} props.gaps[].dimension - Area category (e.g. execution, change_management)
 * @param {string} props.gaps[].label - Short label for the gap
 * @param {string} props.gaps[].detail - Impact and detail description of the gap
 */
function GapAnalysis({ gaps = [] }) {
  if (!gaps || gaps.length === 0) {
    return (
      <div className="no-gaps-state">
        No performance or systematic gaps identified.
      </div>
    );
  }

  return (
    <div className="gap-analysis-container">
      <h3 className="gap-section-title">Gap Analysis & Interventions</h3>
      <div className="gap-list">
        {gaps.map((gap, idx) => {
          const { dimension, label, detail } = gap;

          return (
            <div className="gap-card" key={idx}>
              <div className="gap-warning-strip" />
              <div className="gap-card-content">
                <div className="gap-card-header">
                  <h4 className="gap-label">{label}</h4>
                  {dimension && <span className="gap-dimension-badge">{dimension}</span>}
                </div>
                <p className="gap-detail">{detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GapAnalysis;
