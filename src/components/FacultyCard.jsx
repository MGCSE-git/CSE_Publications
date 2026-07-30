import "../css/facultycard.css";

import React from 'react';

const FacultyCard = ({ faculty }) => {
  const {
    name,
    designation,
    citations,
    hIndex,
    i10Index,
    scholarUrl,
  } = faculty;

  return (
    <div className="faculty-card">
      <div className="card-header">
        <h3 className="faculty-name">{name}</h3>
        <p className="designation">{designation}</p>
      </div>

      <div className="card-body">
        <div className="metrics-box">
          <div className="metric">
            <span className="metric-label">Citations</span>
            <span className="metric-value">{citations ?? 0}</span>
          </div>
          <div className="metric">
            <span className="metric-label">h-index</span>
            <span className="metric-value">{hIndex ?? 0}</span>
          </div>
          <div className="metric">
            <span className="metric-label">i10-index</span>
            <span className="metric-value">{i10Index ?? 0}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        {scholarUrl && scholarUrl !== '#' ? (
          <a
            href={scholarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="scholar-link"
          >
            Google Scholar Profile ↗
          </a>
        ) : (
          <span className="scholar-link disabled">No Link Available</span>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;