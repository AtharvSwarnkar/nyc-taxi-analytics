import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, BarChart, Bar
} from "recharts";
import "./App.css";

function App() {
  const [summary, setSummary] = useState({});
  const [hourData, setHourData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [fareData, setFareData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [passengerData, setPassengerData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/summary").then(res => setSummary(res.data));
    axios.get("http://127.0.0.1:8000/trips_by_hour").then(res => setHourData(res.data));
    axios.get("http://127.0.0.1:8000/revenue_by_hour").then(res => setRevenueData(res.data));
    axios.get("http://127.0.0.1:8000/avg_fare_by_hour").then(res => setFareData(res.data));
    axios.get("http://127.0.0.1:8000/fare_vs_distance").then(res => setScatterData(res.data));
    axios.get("http://127.0.0.1:8000/passenger_distribution").then(res => setPassengerData(res.data));
  }, []);

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Taxi</h2>
        <ul>
          <li>Dashboard</li>
          <li>Analytics</li>
          <li>Trends</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">

        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <h1>NYC Taxi Dashboard</h1>
          <input
            placeholder="Search..."
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* KPI CARDS */}
        <div className="cards">
          <div className="card">
            <div>Total Trips</div>
            <strong>{summary.total_trips?.toLocaleString()}</strong>
          </div>
          <div className="card">
            <div>Revenue</div>
            <strong>${Math.round(summary.total_revenue || 0).toLocaleString()}</strong>
          </div>
          <div className="card">
            <div>Avg Fare</div>
            <strong>${summary.avg_fare?.toFixed(2)}</strong>
          </div>
          <div className="card">
            <div>Passengers</div>
            <strong>{summary.avg_passengers?.toFixed(2)}</strong>
          </div>
        </div>

        {/* ===== DEMAND SECTION ===== */}
        <h2>Demand Analysis</h2>

        <div className="section">
          <div className="chart-container">
            <h3>Trips by Hour</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={hourData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="trips" stroke="#f5b700" strokeWidth={2.5} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="insight-box">
            Demand peaks in evening hours, showing strong commuter usage patterns.
          </div>
        </div>

        {/* ===== REVENUE SECTION ===== */}
        <h2>Revenue Analysis</h2>

        <div className="section">
          <div className="chart-container">
            <h3>Revenue by Hour</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#ff8c00" strokeWidth={2.5} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="insight-box">
            Revenue aligns with demand spikes, highest during peak commuting hours.
          </div>
        </div>

        {/* ===== FARE SECTION ===== */}
        <div className="section">
          <div className="chart-container">
            <h3>Average Fare by Hour</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={fareData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avg_fare" stroke="#00bcd4" strokeWidth={2.5} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="insight-box">
            Fare remains stable with slight increases during peak hours due to demand.
          </div>
        </div>

        {/* ===== PASSENGER SECTION ===== */}
        <h2>Passenger Behavior</h2>

        <div className="section">
          <div className="chart-container">
            <h3>Passenger Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={passengerData}>
                <XAxis dataKey="passenger_count" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f5b700" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="insight-box">
            Most trips are taken by 1–2 passengers, showing individual usage dominance.
          </div>
        </div>

        {/* ===== SCATTER ===== */}
        <h2>Trip Insights</h2>

        <div className="section">
          <div className="chart-container">
            <h3>Fare vs Distance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <ScatterChart>
                <XAxis dataKey="trip_distance" />
                <YAxis dataKey="fare_amount" />
                <Tooltip />
                <Scatter data={scatterData} fill="#f5b700" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="insight-box">
            Fare increases with distance, but clustering shows pricing thresholds and base fare effects.
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;