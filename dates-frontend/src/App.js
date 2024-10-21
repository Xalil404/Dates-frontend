// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Birthday from './components/Birthday';
import Anniversary from './components/Anniversary';
import Holiday from './components/Holiday';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  // Use the useLocation hook to access the current path
  const location = useLocation();

  // Function to determine the appropriate class based on the current path to display background image
  const getClassName = () => {
    switch (location.pathname) {
      case '/birthdays':
        return 'body-birthdays';
      case '/anniversaries':
        return 'body-anniversaries';
      case '/holidays':
        return 'body-holidays';
      default:
        return ''; // No additional class
    }
  };

  return (
    <div className={`container-fluid ${getClassName()}`}> {/* Add the class here */}
      <div className="row">
      <nav className={`col-md-2 d-none d-md-block sidebar ${getClassName()}`}>
          <h2 className="sidebar-heading text-center">Menu</h2>
          <ul className="nav flex-column">
          <li className="nav-item">
              <Link className="nav-link" to="">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/birthdays">Birthdays</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/anniversaries">Anniversaries</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/holidays">Holidays</Link>
            </li>
          </ul>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="text-center mb-4 d-flex align-items-center justify-content-center">
            <img
              src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729505462/static/favicon_io/apple-touch-icon.234aad4ee54e.png"
              alt="Logo"
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <h1 className="d-inline mb-0">Dates</h1> {/* Use mb-0 to remove default bottom margin */}
          </div>
          
          {/* Conditional rendering for the welcome section */}
          {location.pathname === '/' && (
            <div className="row align-items-center justify-content-center" style={{ flex: 1 }}>
              <div className="col-md-6">
                <h1 className="mb-3">Welcome to DATES!</h1>
                <h6>Keep your most important birthdays, anniversaries & holidays all in one place.</h6>
              </div>
              <div className="col-md-6 text-center">
                <img
                  src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
                  alt="placeholder for welcome"
                  className="img-fluid"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          )}

          <Routes>
            <Route path="/birthdays" element={<Birthday />} />
            <Route path="/anniversaries" element={<Anniversary />} />
            <Route path="/holidays" element={<Holiday />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Wrap the App component in Router
const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;


