import { useMemo, useState } from "react";
import "./App.css";

const initialStudents = [
  {
    id: 101,
    name: "Aarav Sharma",
    branch: "Computer Engineering",
    attendance: 94,
    marks: 88,
  },
  {
    id: 102,
    name: "Ananya Patil",
    branch: "Computer Engineering",
    attendance: 86,
    marks: 92,
  },
  {
    id: 103,
    name: "Rohan Deshmukh",
    branch: "Information Technology",
    attendance: 68,
    marks: 72,
  },
  {
    id: 104,
    name: "Sneha Kulkarni",
    branch: "Computer Engineering",
    attendance: 97,
    marks: 96,
  },
  {
    id: 105,
    name: "Aditya Jadhav",
    branch: "Information Technology",
    attendance: 74,
    marks: 65,
  },
  {
    id: 106,
    name: "Priya More",
    branch: "Computer Engineering",
    attendance: 91,
    marks: 84,
  },
  {
    id: 107,
    name: "Vedant Joshi",
    branch: "Information Technology",
    attendance: 58,
    marks: 61,
  },
  {
    id: 108,
    name: "Isha Shah",
    branch: "Computer Engineering",
    attendance: 89,
    marks: 90,
  },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All students");
  const [activePage, setActivePage] = useState("Overview");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const averageAttendance = Math.round(
    students.reduce((sum, student) => sum + student.attendance, 0) /
      students.length,
  );

  const averageMarks = Math.round(
    students.reduce((sum, student) => sum + student.marks, 0) / students.length,
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        String(student.id).includes(search);

      const matchesFilter =
        filter === "All students" ||
        (filter === "Good attendance" && student.attendance >= 75) ||
        (filter === "Low attendance" && student.attendance < 75);

      return matchesSearch && matchesFilter;
    });
  }, [students, search, filter]);

  function updateAttendance(id, amount) {
    setStudents((current) =>
      current.map((student) =>
        student.id === id
          ? {
              ...student,
              attendance: Math.max(
                0,
                Math.min(100, student.attendance + amount),
              ),
            }
          : student,
      ),
    );
  }

  const attendanceColor = (value) =>
    value >= 85 ? "green" : value >= 75 ? "blue" : "red";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h2>
              Student<span>IQ</span>
            </h2>
            <p>Academic management</p>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>

        {[
          ["Overview", "▦"],
          ["Students", "♙"],
          ["Attendance", "◷"],
          ["Performance", "↗"],
        ].map(([page, icon]) => (
          <button
            key={page}
            className={`nav-item ${activePage === page ? "active" : ""}`}
            onClick={() => setActivePage(page)}
          >
            <span className="nav-icon">{icon}</span>
            {page}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="semester-card">
            <span className="semester-dot" />
            <div>
              <strong>Academic Year</strong>
              <p>2026–2027 · Semester V</p>
            </div>
          </div>
          <div className="profile">
            <div className="avatar admin-avatar">AD</div>
            <div className="profile-text">
              <strong>Administrator</strong>
              <p>Academic coordinator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> {activePage}
          </div>
          <div className="topbar-right">
            <span className="live-dot" />
            Demo environment
            <div className="avatar admin-avatar">AD</div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">ACADEMIC OVERVIEW</p>
              <h1>
                {activePage === "Overview" ? "Student Dashboard" : activePage}
              </h1>
              <p className="subtitle">
                Track attendance and academic progress in one place.
              </p>
            </div>
            <button
              className="primary-button"
              onClick={() => {
                setSearch("");
                setFilter("All students");
                setActivePage("Students");
              }}
            >
              + View all students
            </button>
          </div>

          <div className="stats-grid">
            <StatCard
              label="Total Students"
              value={students.length}
              detail="Registered in this demo"
              icon="♙"
              color="purple"
            />
            <StatCard
              label="Average Attendance"
              value={`${averageAttendance}%`}
              detail="Across all students"
              icon="◷"
              color="blue"
            />
            <StatCard
              label="Average Marks"
              value={`${averageMarks}%`}
              detail="Academic performance"
              icon="↗"
              color="orange"
            />
            <StatCard
              label="Low Attendance"
              value={students.filter((s) => s.attendance < 75).length}
              detail="Below 75% attendance"
              icon="!"
              color="red"
            />
          </div>

          <div className="content-grid">
            <section className="panel attendance-panel">
              <div className="panel-heading">
                <div>
                  <h3>Attendance distribution</h3>
                  <p>Student-wise attendance overview</p>
                </div>
                <span className="mini-tag">Live demo</span>
              </div>

              <div className="chart-legend">
                <span>
                  <i className="legend-dot green-bg" /> 85–100%
                </span>
                <span>
                  <i className="legend-dot blue-bg" /> 75–84%
                </span>
                <span>
                  <i className="legend-dot red-bg" /> Below 75%
                </span>
              </div>

              <div className="bar-chart">
                {students.map((student) => (
                  <div className="bar-column" key={student.id}>
                    <span className="bar-value">{student.attendance}%</span>
                    <div className="bar-track">
                      <div
                        className={`bar-fill ${attendanceColor(student.attendance)}`}
                        style={{ height: `${student.attendance}%` }}
                      />
                    </div>
                    <span className="bar-label">
                      {student.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="chart-footer">
                <span>Minimum required attendance</span>
                <strong>75%</strong>
              </div>
            </section>

            <section className="panel performance-panel">
              <div className="panel-heading">
                <div>
                  <h3>Performance snapshot</h3>
                  <p>Overall class performance</p>
                </div>
                <span className="performance-icon">↗</span>
              </div>

              <div className="performance-score">
                <div className="score-circle">
                  <div>
                    <strong>{averageMarks}%</strong>
                    <span>Average</span>
                  </div>
                </div>
              </div>

              <div className="performance-row">
                <span>Excellent (85 and above)</span>
                <strong>
                  {students.filter((s) => s.marks >= 85).length} students
                </strong>
              </div>
              <div className="performance-row">
                <span>Needs improvement (below 75)</span>
                <strong>
                  {students.filter((s) => s.marks < 75).length} students
                </strong>
              </div>

              <div className="insight-box">
                <span className="insight-icon">✦</span>
                <div>
                  <strong>Academic insight</strong>
                  <p>
                    {students.filter((s) => s.attendance < 75).length > 0
                      ? "Some students need attendance support. Review the records below."
                      : "All students meet the attendance threshold."}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="panel students-panel">
            <div className="panel-heading student-heading">
              <div>
                <h3>Student records</h3>
                <p>Attendance and marks at a glance</p>
              </div>
              <span className="record-count">
                {filteredStudents.length} records
              </span>
            </div>

            <div className="table-controls">
              <div className="search-box">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name or roll number..."
                  aria-label="Search students"
                />
              </div>

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter attendance"
              >
                <option>All students</option>
                <option>Good attendance</option>
                <option>Low attendance</option>
              </select>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>STUDENT</th>
                    <th>ROLL NO.</th>
                    <th>ATTENDANCE</th>
                    <th>MARKS</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="student-cell">
                          <div
                            className={`avatar student-avatar avatar-${student.id % 4}`}
                          >
                            {student.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </div>
                          <div>
                            <strong>{student.name}</strong>
                            <span>{student.branch}</span>
                          </div>
                        </div>
                      </td>
                      <td className="roll-number">STU{student.id}</td>
                      <td>
                        <div className="attendance-cell">
                          <div className="progress-track">
                            <div
                              className={`progress-fill ${attendanceColor(student.attendance)}`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <strong>{student.attendance}%</strong>
                        </div>
                      </td>
                      <td>
                        <strong>{student.marks}/100</strong>
                      </td>
                      <td>
                        <span
                          className={`status ${student.attendance >= 75 ? "status-good" : "status-low"}`}
                        >
                          {student.attendance >= 75
                            ? "Eligible"
                            : "Low attendance"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="view-button"
                          onClick={() => setSelectedStudent(student)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        No students match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span>Sample academic data · Not connected to a database</span>
              <span>
                Showing {filteredStudents.length} of {students.length} students
              </span>
            </div>
          </section>

          <footer className="page-footer">
            <span>
              StudentIQ · Student Attendance and Performance Dashboard
            </span>
            <span>CCA 2 · Cloud Computing and DevOps</span>
          </footer>
        </section>
      </main>

      {selectedStudent && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedStudent(null)}
        >
          <section
            className="student-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedStudent(null)}
            >
              ×
            </button>
            <div className="avatar modal-avatar">
              {selectedStudent.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <h2>{selectedStudent.name}</h2>
            <p className="modal-subtitle">Roll No. STU{selectedStudent.id}</p>
            <div className="modal-detail">
              <span>Branch</span>
              <strong>{selectedStudent.branch}</strong>
            </div>
            <div className="modal-detail">
              <span>Attendance</span>
              <strong>{selectedStudent.attendance}%</strong>
            </div>
            <div className="modal-detail">
              <span>Marks</span>
              <strong>{selectedStudent.marks}/100</strong>
            </div>
            <div className="modal-detail">
              <span>Attendance status</span>
              <strong>
                {selectedStudent.attendance >= 75
                  ? "Eligible"
                  : "Below threshold"}
              </strong>
            </div>
            <p className="modal-note">
              Demo controls: change attendance to see the dashboard update.
            </p>
            <div className="modal-actions">
              <button onClick={() => updateAttendance(selectedStudent.id, -5)}>
                − 5% attendance
              </button>
              <button onClick={() => updateAttendance(selectedStudent.id, 5)}>
                + 5% attendance
              </button>
            </div>
            <p className="modal-note">
              Changes are temporary and reset when the page reloads.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, detail, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className={`stat-icon ${color}`}>{icon}</span>
      </div>
      <strong className="stat-value">{value}</strong>
      <span className="stat-detail">{detail}</span>
    </div>
  );
}

export default App;
