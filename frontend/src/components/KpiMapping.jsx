import React from 'react';
import './KpiMapping.css';

const AVAILABLE_KPIS = [
  { id: 'lead_generation', label: 'Lead Generation' },
  { id: 'lead_conversion', label: 'Lead Conversion' },
  { id: 'upselling', label: 'Upselling' },
  { id: 'cross_selling', label: 'Cross-selling' },
  { id: 'nps', label: 'NPS (Customer Satisfaction)' },
  { id: 'pat', label: 'PAT (Profitability / Costs)' },
  { id: 'tat', label: 'TAT (Turnaround Time / Speed)' },
  { id: 'quality', label: 'Quality (Rejections / Defects)' }
];

function KpiMapping({ kpiMapping = [], onUpdate }) {
  const handleChange = (index, field, value) => {
    const updated = [...kpiMapping];
    
    if (field === 'kpi') {
      const selectedKpi = AVAILABLE_KPIS.find(k => k.id === value);
      updated[index] = { 
        ...updated[index], 
        kpi: value, 
        label: selectedKpi ? selectedKpi.label : value 
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    
    onUpdate(updated);
  };

  const handleDelete = (index) => {
    const updated = kpiMapping.filter((_, idx) => idx !== index);
    onUpdate(updated);
  };

  const handleAdd = () => {
    const newItem = {
      kpi: 'quality',
      label: 'Quality (Rejections / Defects)',
      evidence: '',
      dependencyType: 'personal'
    };
    onUpdate([...kpiMapping, newItem]);
  };

  return (
    <div className="kpi-mapping-container">
      <div className="kpi-header-flex">
        <h3 className="kpi-section-title">KPI Evaluation & Dependencies</h3>
      </div>

      {kpiMapping.length === 0 ? (
        <div className="no-kpi-state">
          No KPI mappings recorded. Click "+ Add KPI" to add one.
        </div>
      ) : (
        <div className="kpi-grid-edit">
          {kpiMapping.map((item, idx) => {
            const { kpi, evidence, dependencyType } = item;

            return (
              <div className="kpi-card-edit" key={idx}>
                <div className="kpi-card-header-edit">
                  <span className="kpi-number">KPI #{idx + 1}</span>
                </div>

                <div className="kpi-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Select KPI</label>
                    <select
                      value={kpi || 'quality'}
                      disabled
                      className="edit-select"
                    >
                      {AVAILABLE_KPIS.map(k => (
                        <option key={k.id} value={k.id}>{k.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="input-label">Dependency Type</label>
                    <select
                      value={dependencyType || 'personal'}
                      disabled
                      className="edit-select"
                    >
                      <option value="system">System Dependency (Tool/Process)</option>
                      <option value="personal">Personal Dependency (Individual effort)</option>
                    </select>
                  </div>
                </div>

                <div className="kpi-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Mapped Evidence from Transcript</label>
                    <textarea
                      value={evidence}
                      readOnly
                      className="edit-textarea"
                      rows={2}
                      placeholder="e.g. Saved 10 minutes in deburring batch cycle time..."
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

export default KpiMapping;
