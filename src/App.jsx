import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import FacultyCard from './components/FacultyCard';
import ChartComponent from './components/ChartComponent'; // Import the ChartComponent
import kecLogo from './assets/kec_logo.jpg'; // Import the logo image
import './App.css';

function App() {
  const [facultyList, setFacultyList] = useState([]);
  //const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departmentName, setDepartmentName] = useState('Computer Science and Engineering');

  useEffect(() => {
    // 1. Fetch raw CSV text first to handle leading empty rows & BOM characters
    fetch('/publications.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`CSV file not found (Status ${response.status}). Make sure publications.csv is in the public/ folder.`);
        }
        return response.text();
      })
      .then((rawCsvText) => {
        // 2. Strip empty leading/blank lines before parsing headers
        const cleanedCsv = rawCsvText
          .split('\n')
          .filter((line) => line.trim().replace(/,/g, '') !== '')
          .join('\n');

        // 3. Parse cleaned CSV text with PapaParse
        Papa.parse(cleanedCsv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header.trim(), // Strips trailing spaces from headers
          complete: (results) => {
            const parsedData = results.data
              .filter((row) => row['Name of the Faculty'] || row['Name'])
              .map((row, index) => ({
                name: row['Name of the Faculty'] || row['Name'] || 'N/A',
                designation: row['Designation'] || 'N/A',
                scholarUrl: row['Google Scholar ID'] || row['Scholar Link'] || '#',
                citations: row['citations'] ?? 0,
                hIndex: row['h-index'] ?? 0,
                i10Index: row['i10-index'] ?? 0,
              }));

            setFacultyList(parsedData);
            setLoading(false);
          },
          error: (err) => {
            console.error('PapaParse Error:', err);
            setError('Failed to parse CSV file content.');
            setLoading(false);
          },
        });
      })
      .catch((err) => {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Compute total citations dynamically (Sum = 30,172)
  const cumulativeCitations = facultyList.reduce(
    (sum, faculty) => sum + (Number(faculty.citations) || 0),
    0
  );

  // Filter faculty by search input
  {/*const filteredFaculty = facultyList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );*/}
  return (
    <div className="app">
      {/* Header Banner Section */}
      <header className="app-header">
        {/* Top Branding Navigation */}
        <div className="header-top-bar">
          <div className="branding-container">
            <img
              src={kecLogo}
              alt="College Logo"
              className="college-logo"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/60?text=KEC';
              }}
            />
            
          </div>
          
        </div>

        {/* Centered Department Name in Banner */}
        <div className="banner-content">
          <h1 className="department-title">
             {departmentName}
          </h1>
        </div>
      </header>
      <h2 className='heading'>Research Publications by Faculty</h2>
      {/* Metric Summary */}
      <div className="summary-section">
        <div className="summary-banner">
          <div className="summary-card">
            <span className="summary-label">Total Faculty</span>
            <span className="summary-value">{facultyList.length}</span>
          </div>
          <div className="summary-card citations">
            <span className="summary-label">Cumulative Citations</span>
            <span className="summary-value">{cumulativeCitations.toLocaleString()}</span>
          </div>
          
        </div>
        <div className="summary-chart">
            <ChartComponent/>
        </div>
      </div>
        {/* Search Bar */}
     {/* <div className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by faculty name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      */}
      
      
      {/* Main Grid Content Area */}
      <main className="app-container">
        {loading ? (
          <div className="status-msg">Loading faculty publication records...</div>
        ) : (
          <div className="faculty-grid">
            {facultyList.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
