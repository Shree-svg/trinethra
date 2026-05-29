import React from 'react';
import './EvidenceList.css';

const DIMENSIONS = [
  { id: 'execution', label: 'Driving Execution' },
  { id: 'systems_building', label: 'Building Systems' },
  { id: 'kpi_impact', label: 'KPI Impact' },
  { id: 'change_management', label: 'Change Management' }
];

const SIGNALS = ['Positive', 'Negative', 'Neutral'];

function EvidenceList({ evidence = [], onUpdate }) {
  const handleChange = (index, field, value) => {
    const updated = [...evidence];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleDelete = (index) => {
    const updated = evidence.filter((_, idx) => idx !== index);
    onUpdate(updated);
  };

  const handleAdd = () => {
    const newItem = {
      quote: '',
      signal: 'Neutral',
      dimension: 'execution',
      layer: 'General',
      interpretation: ''
    };
    onUpdate([...evidence, newItem]);
  };

  return (
    <div className="evidence-list-container">
      <div className="evidence-header-flex">
        <h3 className="evidence-title">Audited Evidence & Excerpts</h3>
        <button className="add-item-btn" onClick={handleAdd}>
          + Add Evidence
        </button>
      </div>

      {evidence.length === 0 ? (
        <div className="no-evidence-state">
          No specific evidence observations registered. Click "+ Add Evidence" to add one.
        </div>
      ) : (
        <div className="evidence-grid-edit">
          {evidence.map((item, idx) => {
            const { quote, signal, dimension, layer, interpretation } = item;

            return (
              <div className="evidence-item-card-edit" key={idx}>
                <div className="evidence-card-actions">
                  <span className="item-number">Evidence #{idx + 1}</span>
                  <button className="delete-item-btn" onClick={() => handleDelete(idx)} title="Delete item">
                    Delete
                  </button>
                </div>

                <div className="evidence-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Direct Quote / Excerpt</label>
                    <textarea
                      value={quote}
                      onChange={(e) => handleChange(idx, 'quote', e.target.value)}
                      className="edit-textarea"
                      rows={2}
                      placeholder="Paste exact quote here..."
                    />
                  </div>
                </div>

                <div className="evidence-field-row grid-3">
                  <div className="field-group">
                    <label className="input-label">Signal</label>
                    <select
                      value={signal || 'Neutral'}
                      onChange={(e) => handleChange(idx, 'signal', e.target.value)}
                      className="edit-select"
                    >
                      {SIGNALS.map(sig => (
                        <option key={sig} value={sig}>{sig}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="input-label">Dimension</label>
                    <select
                      value={dimension || 'execution'}
                      onChange={(e) => handleChange(idx, 'dimension', e.target.value)}
                      className="edit-select"
                    >
                      {DIMENSIONS.map(dim => (
                        <option key={dim.id} value={dim.id}>{dim.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="input-label">Operational Layer</label>
                    <input
                      type="text"
                      value={layer || ''}
                      onChange={(e) => handleChange(idx, 'layer', e.target.value)}
                      className="edit-input"
                      placeholder="e.g. Systems Integration"
                    />
                  </div>
                </div>

                <div className="evidence-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Psychological / Operational Interpretation</label>
                    <textarea
                      value={interpretation}
                      onChange={(e) => handleChange(idx, 'interpretation', e.target.value)}
                      className="edit-textarea"
                      rows={2}
                      placeholder="What does this behavior indicate? Classify Layer 1 vs Layer 2..."
                    />
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
