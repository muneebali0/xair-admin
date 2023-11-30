import React from "react";

export default function Dashboard() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="theme-card p-3 text-center">
            <div className="dashboard-icon-box">
              <i className="fas fa-users"></i>
            </div>
            <h3>0</h3>
            <p>Total Pilots</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="theme-card p-3 text-center">
            <div className="dashboard-icon-box">
              <i className="fas fa-users"></i>
            </div>
            <h3>0</h3>
            <p>Total Passengers</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="theme-card p-3 text-center">
            <div className="dashboard-icon-box">
              <i className="fas fa-users"></i>
            </div>
            <h3>0</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="theme-card p-3 text-center">
            <div className="dashboard-icon-box">
              <i className="fas fa-users"></i>
            </div>
            <h3>0</h3>
            <p>Total Flights</p>
          </div>
        </div>
      </div>
    </div>
  );
}
