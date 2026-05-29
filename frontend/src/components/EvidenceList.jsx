import React from 'react';
import './EvidenceList.css';

const DIMENSION_LABELS = {
  execution: 'Driving Execution',
  systems_building: 'Building Systems',
  kpi_impact: 'KPI Impact',
  change_management: 'Change Management'
};

function EvidenceList({ evidence = [] }) {
  return (
    <div className="evidence-list-container">
      <div className="evidence-header-flex">
        <h3 className="evidence-title">Audited Evidence &amp; Excerpts</h3>
      </div>

      {evidence.length === 0 ? (
        <div className="no-evidence-state">
          No specific evidence observations registered.
        </div>
      ) : (
        <div className="evidence-grid-edit">
          {evidence.map((item, idx) => {
            const { quote, signal, dimension, layer, interpretation } = item;

            return (
              <div className="evidence-item-card-edit" key={idx}>
                <div className="evidence-card-actions">
                  <span className="item-number">Evidence #{idx + 1}</span>
                </div>

                <div className="evidence-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Direct Quote / Excerpt</label>
                    <div className="readonly-value quote-value">{quote || '—'}</div>
                  </div>
                </div>

                <div className="evidence-field-row grid-3">
                  <div className="field-group">
                    <label className="input-label">Signal</label>
                    <div className={`readonly-value signal-badge signal-${(signal || 'neutral').toLowerCase()}`}>
                      {signal || 'Neutral'}
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="input-label">Dimension</label>
                    <div className="readonly-value">
                      {DIMENSION_LABELS[dimension] || dimension || '—'}
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="input-label">Operational Layer</label>
                    <div className="readonly-value">{layer || '—'}</div>
                  </div>
                </div>

                <div className="evidence-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Psychological / Operational Interpretation</label>
                    <div className="readonly-value interpretation-value">{interpretation || '—'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default EvidenceList;
