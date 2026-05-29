import React from 'react';
import './FollowUpQuestions.css';

function FollowUpQuestions({ followUpQuestions = [], onUpdate }) {
  const handleChange = (index, field, value) => {
    const updated = [...followUpQuestions];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const handleDelete = (index) => {
    const updated = followUpQuestions.filter((_, idx) => idx !== index);
    onUpdate(updated);
  };

  const handleAdd = () => {
    const newItem = {
      question: '',
      targetGap: 'Systems Building',
      lookingFor: ''
    };
    onUpdate([...followUpQuestions, newItem]);
  };

  return (
    <div className="followup-container">
      <div className="followup-header-flex">
        <h3 className="followup-title">Clarifying Follow-Up Questions</h3>
        <button className="add-question-btn" onClick={handleAdd}>
          + Add Question
        </button>
      </div>

      {followUpQuestions.length === 0 ? (
        <div className="no-questions-state">
          No follow-up questions registered. Click "+ Add Question" to add one.
        </div>
      ) : (
        <div className="followup-list-edit">
          {followUpQuestions.map((item, idx) => {
            const { question, targetGap } = item;
            const signalText = item.lookingFor || item.expectedSignal || '';

            return (
              <div className="followup-card-edit" key={idx}>
                <div className="followup-card-header-edit">
                  <span className="question-number">Question #{idx + 1}</span>
                  <button className="delete-question-btn" onClick={() => handleDelete(idx)}>
                    Delete
                  </button>
                </div>

                <div className="followup-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Target Gap / Metric</label>
                    <input
                      type="text"
                      value={targetGap || ''}
                      onChange={(e) => handleChange(idx, 'targetGap', e.target.value)}
                      className="edit-input"
                      placeholder="e.g. Systems Building Gap"
                    />
                  </div>
                </div>

                <div className="followup-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Question Text</label>
                    <textarea
                      value={question}
                      onChange={(e) => handleChange(idx, 'question', e.target.value)}
                      className="edit-textarea"
                      rows={2}
                      placeholder="Write the follow-up question..."
                    />
                  </div>
                </div>

                <div className="followup-field-row">
                  <div className="field-group flex-1">
                    <label className="input-label">Evaluation Pointer (What to listen for in reply)</label>
                    <textarea
                      value={signalText}
                      onChange={(e) => {
                        // Update both properties to maintain schema compatibility
                        const updated = [...followUpQuestions];
                        updated[index] = {
                          ...updated[index],
                          lookingFor: e.target.value,
                          expectedSignal: e.target.value
                        };
                        onUpdate(updated);
                      }}
                      className="edit-textarea"
                      rows={2}
                      placeholder="What signals or details to look for in the supervisor's response..."
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

export default FollowUpQuestions;
