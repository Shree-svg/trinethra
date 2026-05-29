import React, { useState } from 'react';
import './App.css';
import ScoreCard from './components/ScoreCard';
import EvidenceList from './components/EvidenceList';
import KpiMapping from './components/KpiMapping';
import GapAnalysis from './components/GapAnalysis';
import FollowUpQuestions from './components/FollowUpQuestions';

const DEMO_SCRIPTS = [
  {
    label: '🚗 Karthik Narayanan (Veerabhadra Auto)',
    text: `Karthik? Haan, he is good. Very sincere boy. Comes on time, leaves on time — actually he stays late most days, I don't ask him to. He's always on the floor. He's not one of those people who sits in the office and sends emails. He's hands-on.

What does he do? He helps me with production tracking. Earlier I used to maintain everything in my head — how many pieces came off each machine, what's the rejection rate, what's pending for dispatch. Now Karthik maintains a sheet. Every evening he updates it and sends it to me on WhatsApp. Very useful. I look at it every morning before the shift meeting.

He also handles a lot of the coordination. When we have quality complaints from Tier 1 — they send an email, sometimes call directly — Karthik takes the first call. He notes down the complaint, talks to the QC team, and gives me a summary. Earlier I used to handle all of this myself. Big relief.

The new drum brake line — he's been involved from the beginning. He helped set up the machine layout. He did a study on cycle times and suggested we move the deburring station closer to the CNC machines. Good idea. We did it. Saved maybe 10 minutes per batch in material handling.

Any complaints? No, not really. Sometimes he asks too many questions — like he wants to understand everything before doing it. Sometimes in a factory you just need to do it and learn by doing. But this is a minor thing.

One thing — he doesn't really push back. If I tell him to do something, he does it. Even if it's not the best way. I wish he would tell me sometimes, 'Sir, I think we should do it differently.' But maybe he's still new. He'll get there.

Overall I'm happy. He's become part of the team. The workers on the floor know him. He speaks to them in Marathi — that helps. If you asked them, they would say he's one of us.`,
  },
  {
    label: '🧵 Meena Krishnamurthy (Lakshmi Textiles)',
    text: `Meena. Look, she is smart. No doubt. She understands things quickly. But I have some concerns.

She spends too much time on her laptop. In a garment factory, the action is on the floor — cutting, stitching, finishing, packing. If you're not on the floor, you're not seeing what's happening. I tell her — go to the floor, talk to the line supervisors, see what's stuck. She goes, but after 30 minutes she's back at her desk typing.

She made some Excel sheets. Fine. One is an order tracker — which order is at which stage, what's the expected completion date. Another one tracks rejection percentages by line. She showed it to me last week in a meeting. The data was correct, I'll give her that. She found that Line 3 has 14% rejection compared to 6% average on the other lines. Nobody had quantified this before.

But here's my problem. I showed this to my production manager and he said, 'So? We know Line 3 has issues. The operators are new.' So the data is correct but the people on the floor already know. Meena is telling us what we already know, just in Excel format.

She also wrote something she calls an 'SOP' for the cutting section. Step-by-step process for how to handle a new order — from fabric receiving to pattern matching to cut-plan approval. I looked at it. It's well-written. But nobody uses it. She pinned it on the wall near the cutting master's station. It's still there. Nobody reads it.

I told her — the problem is not that we don't have a process. The problem is that the cutting master gets 5 phone calls during a changeover and loses focus. An SOP on the wall doesn't solve that. She needs to understand the floor reality, not just write documents.

On the positive side — she did something useful with the dispatch team. She started tracking which orders are at risk of missing the ship date and sending me a daily email by 11 AM. Before this, I would find out about delays at 4 PM when the container was supposed to leave. Now I know by 11 AM and can push. Two weeks ago we saved a shipment to Decathlon because of this. That was good.

My worry is that she's building things in Excel that nobody asked for and nobody uses. I need someone who solves problems on the floor, not someone who makes beautiful sheets in the office.

Is she failing? No. She's trying. She's just not connecting her work to what actually matters here. If she learns to do that, she could be very good.`,
  },
  {
    label: '🥛 Anil Menon (Prabhat Foods)',
    text: `Anil is my right hand. I don't know how we managed before him.

Every morning he's in my office at 8:15 with the day's plan — what's in production, what's getting dispatched, what needs my attention. He prioritizes. Before Anil, I used to walk into the factory and get hit with 10 problems at once. Now he filters. He tells me — these 3 need your decision, these 7 I'll handle.

He handles the retailer complaints. If a retailer calls about expired stock or taste issues, Anil takes the call, logs it, coordinates with the production team to pull the batch records, and gets back to the retailer within 24 hours. Our complaint closure time has gone from 5 days to under 2 days since he started.

He manages the daily production meeting. I used to run it — 45 minutes, no agenda, everyone talks about everything. Anil took it over, made a structure, now it's 20 minutes. He keeps it focused.

He also coordinates with our distributor in Pune and the one in Aurangabad. He tracks their stock levels, tells dispatch when to send the next shipment. Earlier my dispatch supervisor would wait until the distributor called and said 'we're out of stock.' Now Anil tracks it proactively.

I'll tell you a story. Three weeks ago, we had a power failure at 2 AM. The cold chain broke. Anil wasn't there — it was the night shift. But the night supervisor called him. Anil came to the factory at 3 AM, personally checked the temperature logs, identified which batches were compromised, held them from dispatch, and had the QC reports ready by the time I arrived at 8 AM. No compromised product reached the market. Last year, a similar incident happened and we had to recall 200 cases of paneer from Reliance Fresh. This time — zero impact.

Does he have areas to improve? I'm sure he does, but honestly I can't think of any right now. He's so helpful. He takes so much off my plate. I feel like I can finally focus on the business instead of firefighting.

My production manager — Raghav — he's been here 8 years. He's good at running the machines but he doesn't plan. Anil has started doing Raghav's planning for him. Raghav gives Anil the list of orders and Anil creates the production schedule. I know this is not ideal — Raghav should do his own planning. But it works, so I haven't said anything.

One more thing — Anil writes very well. His reports to me are clear. When I forward them to my accountant or my distributor, they understand. He has a professional quality that we don't usually see at this level.

If I could keep him for 2 years instead of 6 months, I would.`,
  },
];

function App() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeDemo, setActiveDemo] = useState(null);
  const [finalizedReport, setFinalizedReport] = useState(null);

  const handleRunAnalysis = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setFinalizedReport(null);

    try {
      const response = await fetch('http://localhost:5001/api/analyze', {
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

  const handleUpdateScore = (updatedScore) => {
    setFinalizedReport(null);
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        score: {
          ...prev.score,
          ...updatedScore,
        },
      };
    });
  };

  const handleUpdateEvidence = (updatedEvidence) => {
    setFinalizedReport(null);
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        evidence: updatedEvidence,
      };
    });
  };

  const handleUpdateKpi = (updatedKpi) => {
    setFinalizedReport(null);
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        kpiMapping: updatedKpi,
      };
    });
  };

  const handleUpdateGaps = (updatedGaps) => {
    setFinalizedReport(null);
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        gaps: updatedGaps,
      };
    });
  };

  const handleUpdateQuestions = (updatedQuestions) => {
    setFinalizedReport(null);
    setResult((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        followUpQuestions: updatedQuestions,
      };
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="title">
          <span className="icon">▲</span>
          Trinethra
        </div>
        <div className="subtitle">Supervisor Feedback Analyzer</div>
        <div className="subtitle">DeepThought — Internal Tool — Psychology Intern Dashboard</div>
      </header>

      <main className="app-content">
  <div className="divider"></div>

        <div className="demo-section">
          <span className="demo-label">Try a demo:</span>
          <div className="demo-buttons">
            {DEMO_SCRIPTS.map((demo, idx) => (
              <button
                key={idx}
                className={`demo-btn${activeDemo === idx ? ' active' : ''}`}
                onClick={() => {
                  setTranscript(demo.text);
                  setActiveDemo(idx);
                  setResult(null);
                  setError(null);
                }}
                disabled={loading}
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        <div className="input-section">
          <textarea
            className="textarea"
            placeholder="Paste supervisor transcript here..."
            value={transcript}
            onChange={(e) => {
              setTranscript(e.target.value);
              setActiveDemo(null);
            }}
            disabled={loading}
            rows={10}
          />
          <div className="char-count">{transcript.length} characters</div>
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
            <ScoreCard 
              score={result.score} 
              onUpdate={handleUpdateScore}
            />
            <EvidenceList 
              evidence={result.evidence} 
              onUpdate={handleUpdateEvidence}
            />
            <KpiMapping 
              kpiMapping={result.kpiMapping} 
              onUpdate={handleUpdateKpi}
            />
            <GapAnalysis 
              gaps={result.gaps} 
              onUpdate={handleUpdateGaps}
            />
            <FollowUpQuestions 
              followUpQuestions={result.followUpQuestions} 
              onUpdate={handleUpdateQuestions}
            />

            <div className="finalize-section">
              <button className="finalize-btn" onClick={() => setFinalizedReport(JSON.stringify(result, null, 2))}>
                Finalize & Export Analysis
              </button>
              {finalizedReport && (
                <div className="export-container">
                  <div className="export-header">
                    <h4>Finalized Audit Report (JSON)</h4>
                    <button 
                      className="copy-btn" 
                      onClick={() => {
                        navigator.clipboard.writeText(finalizedReport);
                        alert('Report copied to clipboard!');
                      }}
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                  <pre className="export-pre">{finalizedReport}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

