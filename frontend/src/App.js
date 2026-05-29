import React, { useState } from 'react';
import './App.css';
import ScoreCard from './components/ScoreCard';
import EvidenceList from './components/EvidenceList';
import KpiMapping from './components/KpiMapping';
import GapAnalysis from './components/GapAnalysis';
import FollowUpQuestions from './components/FollowUpQuestions';

const DEMO_SCRIPTS = [
  {
    label: '🧑‍💻 Software Engineer',
    text: `Supervisor: Let's talk about your performance this quarter, Rahul. Overall, I think you've done solid work on the authentication module. The code quality was high and you met most deadlines.

Rahul: Thanks. I felt good about the auth module too. I struggled a bit with the deployment pipeline though.

Supervisor: Yes, that's something I wanted to bring up. There were two missed sprint commitments in April related to CI/CD. I think part of it is you tend to take on too much without flagging blockers early. You need to communicate sooner when something is slipping.

Rahul: Fair point. I sometimes feel like I should figure things out on my own before escalating.

Supervisor: That's a good instinct, but there's a balance. I'd rather hear about a problem on day two than discover it on day ten. On the positive side, your mentorship of the junior devs has been exceptional. Three people specifically mentioned you in their feedback. That kind of leadership doesn't go unnoticed.

Rahul: That means a lot. I enjoy helping others grow.

Supervisor: One more thing — I'd like to see you take more initiative in architecture discussions. You have strong opinions but you hold back in meetings. I think the team would benefit from hearing your perspective more often.`,
  },
  {
    label: '🧠 Psychology Intern',
    text: `Supervisor: Priya, we're at the halfway mark of your internship, so I wanted to check in on how things are going. How are you feeling about the client interactions so far?

Priya: Honestly, a bit nervous still. I feel like I freeze up sometimes when a client says something unexpected.

Supervisor: That's very normal at this stage. What I've noticed is that your case notes are actually quite thoughtful — you pick up on nuances that even experienced clinicians miss. The gap isn't in your understanding, it's in your confidence during live sessions.

Priya: That's reassuring to hear. I've been journaling after each session to process what happened.

Supervisor: That's a great practice. One thing I'd suggest is role-playing difficult scenarios with me before sessions. It might help bridge that gap between your analytical skills and in-the-moment responses. I also want to flag that your boundaries with the adolescent client in Room 3 need some work. You stayed 20 minutes past the session last Tuesday.

Priya: I felt like she was about to open up about something important and I didn't want to cut her off.

Supervisor: I understand that impulse, but maintaining the frame is part of the therapeutic work. Ending on time teaches clients that the space is safe and consistent. Let's work on closing techniques next week.`,
  },
  {
    label: '📊 Marketing Manager',
    text: `Supervisor: Ananya, let's review Q1. The product launch campaign exceeded our targets by 30%, which is outstanding. The social media strategy you designed was the primary driver.

Ananya: Thank you. The team really pulled together on that one.

Supervisor: I appreciate you crediting the team, but I want to acknowledge your individual contribution too. The influencer partnership framework you built is something we're now rolling out to other regions. That said, I have some concerns about the email marketing performance. Open rates dropped 15% compared to last quarter.

Ananya: I noticed that too. I think our segmentation needs refreshing — we've been using the same audience buckets for six months.

Supervisor: Agreed. I'd like you to own a segmentation audit by end of next month. The other area I want to discuss is your relationship with the sales team. There have been a couple of instances where campaign timelines weren't communicated clearly, and sales felt blindsided.

Ananya: I wasn't aware it was that serious. I'll set up a weekly sync with their team lead.

Supervisor: That would help a lot. Last thing — I'm recommending you for the leadership development program. I think you're ready for it. You have the strategic thinking, you just need more exposure to cross-functional stakeholder management.`,
  },
];

function App() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeDemo, setActiveDemo] = useState(null);

  const handleRunAnalysis = async () => {
    if (!transcript.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

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
            {/* If the score is returned as a primitive, convert it to the expected object shape */}
            <ScoreCard 
              score={
                typeof result.score === 'object' && result.score !== null 
                  ? result.score 
                  : { value: result.score, label: 'Evaluated', band: 'General Tier', justification: result.evidence || 'See details below' }
              } 
            />
            <EvidenceList 
              evidence={
                Array.isArray(result.evidence) 
                  ? result.evidence 
                  : (typeof result.evidence === 'string' 
                      ? [{ quote: 'Key summary', interpretation: result.evidence, signal: 'Neutral' }] 
                      : [])
              } 
            />
            <KpiMapping 
              kpiMapping={
                Array.isArray(result.kpiMapping) 
                  ? result.kpiMapping 
                  : (result.kpiMapping && typeof result.kpiMapping === 'object' 
                      ? Object.entries(result.kpiMapping).map(([kpi, desc]) => ({
                          kpi,
                          label: kpi.replace(/_/g, ' '),
                          evidence: String(desc),
                          dependencyType: 'personal'
                        }))
                      : [])
              } 
            />
            <GapAnalysis 
              gaps={
                Array.isArray(result.gaps) 
                  ? result.gaps.map(g => typeof g === 'string' ? { label: 'Observation Gap', detail: g } : g) 
                  : []
              } 
            />
            <FollowUpQuestions 
              followUpQuestions={
                Array.isArray(result.followUpQuestions) 
                  ? result.followUpQuestions.map(q => typeof q === 'string' ? { question: q } : q) 
                  : []
              } 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

