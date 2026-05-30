import React from 'react';
import './GapAnalysis.css';

const DIMENSIONS = [
  { id: 'execution', label: 'Driving Execution' },
  { id: 'systems_building', label: 'Building Systems' },
  { id: 'kpi_impact', label: 'KPI Impact' },
  { id: 'change_management', label: 'Change Management' }
];

function GapAnalysis({ gaps = [], onUpdate }) {
  const handleChange = (index, field, value) => {
    const updated = [...gaps];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleDelete = (index) => {
    const updated = gaps.filter((_, idx) => idx !== index);
    onUpdate(updated);
  };

  const handleAdd = () => {
    const newItem = {
      dimension: 'change_management',
      label: 'New Assessment Gap',
      detail: ''
    };
    onUpdate([...gaps, newItem]);
  };

  return (
    <div className="gap-analysis-container">
      <div className="gap-header-flex">
        <h3 className="gap-section-title">Gap Analysis & Interventions</h3>
      </div>

      {gaps.length === 0 ? (
        <div className="no-gaps-state">
          No systematic gaps identified. Click "+ Add Gap" to add one.
        </div>
      ) : (
        <div className="gap-list-edit">
          {gaps.map((gap, idx) => {
            const { dimension, label, detail } = gap;

            return (
              <div className="gap-card-edit" key={idx}>
                <div className="gap-card-header-edit">
                  <span className="gap-number">Gap #{idx + 1}</span>
                </div>

                <div className="gap-field-row grid-2">
                  <div className="field-group">
                    <label className="input-label">Gap Title / Label</label>
                    <input
                      type="text"
                      value={label || ''}
                      readOnly
                      className="edit-input"
                      placeholder="e.g. Change Management Gap"
                    />
                  </div>

                  <div className="field-group">
                    <label className="input-label">Dimension</label>
                    <select
                      value={dimension || 'change_management'}
                      disabled
                      className="edit-select"
                    >
                      {DIMENSIONS.map(dim => (
                        <option key={dim.id} value={dim.id}>{dim.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="gap-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Gap Details & Impact Description</label>
                    <textarea
                      value={detail}
                      readOnly
                      className="edit-textarea"
                      rows={2}
                      placeholder="Describe what was missing from the transcript and what is the impact..."
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

export default GapAnalysis;
