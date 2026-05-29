import React, { useState } from 'react';
import './App.css';
import ScoreCard from './components/ScoreCard';
import EvidenceList from './components/EvidenceList';
import KpiMapping from './components/KpiMapping';
import GapAnalysis from './components/GapAnalysis';
import FollowUpQuestions from './components/FollowUpQuestions';

function App() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRunAnalysis = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Trinethra — Supervisor Feedback Analyzer</h1>
      </header>

      <main className="app-content">
        <div className="input-section">
          <textarea
            placeholder="Paste supervisor transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={loading}
            rows={10}
          />
          
          <button
            onClick={handleRunAnalysis}
            disabled={loading || !transcript.trim()}
            className="analysis-btn"
          >
            {loading ? 'Analyzing transcript...' : 'Run Analysis'}
          </button>
        </div>

        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="dashboard-results">
            <ScoreCard score={result.score} />
            <EvidenceList evidence={result.evidence} />
            <KpiMapping kpiMapping={result.kpiMapping} />
            <GapAnalysis gaps={result.gaps} />
            <FollowUpQuestions followUpQuestions={result.followUpQuestions} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

