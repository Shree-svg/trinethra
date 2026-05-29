import React from 'react';
import './KpiMapping.css';

/**
 * KpiMapping component to display performance metrics and organizational dependencies.
 * @param {Object} props
 * @param {Array} props.kpiMapping - Array of mapped KPIs
 * @param {string} props.kpiMapping[].kpi - Key identifier for the KPI
 * @param {string} props.kpiMapping[].label - Human readable label
 * @param {string} props.kpiMapping[].evidence - Observational notes or metrics
 * @param {string} props.kpiMapping[].dependencyType - 'system' or 'personal' dependency
 */
function KpiMapping({ kpiMapping = [] }) {
  if (!kpiMapping || kpiMapping.length === 0) {
    return (
      <div className="no-kpi-state">
        No KPI mappings recorded for this evaluation.
      </div>
    );
  }

  return (
    <div className="kpi-mapping-container">
      <h3 className="kpi-section-title">KPI Evaluation & Dependencies</h3>
      <div className="kpi-grid">
        {kpiMapping.map((item, idx) => {
          const { kpi, label, evidence, dependencyType } = item;
          const isSystem = dependencyType?.toLowerCase() === 'system';

          return (
            <div className="kpi-card" key={idx}>
              <div className="kpi-card-header">
                <h4 className="kpi-label">{label || kpi}</h4>
                <span className={`kpi-dep-tag dependency-${isSystem ? 'system' : 'personal'}`}>
                  {isSystem ? 'System Dependency' : 'Personal Dependency'}
                </span>
              </div>
              <div className="kpi-card-body">
                <p className="kpi-evidence">{evidence}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KpiMapping;
