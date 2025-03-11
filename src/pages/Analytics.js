import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getCounterTrackers, getTimeTrackers } from '../utils/db';

const Analytics = ({ colorTheme }) => {
  const [counterTrackers, setCounterTrackers] = useState([]);
  const [timeTrackers, setTimeTrackers] = useState([]);
  const [selectedTracker, setSelectedTracker] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrackers = async () => {
      const counterTrackers = await getCounterTrackers();
      setCounterTrackers(Array.isArray(counterTrackers) ? counterTrackers : []);
      const timeTrackers = await getTimeTrackers();
      setTimeTrackers(Array.isArray(timeTrackers) ? timeTrackers : []);
    };
    fetchTrackers();
  }, []);

  useEffect(() => {
    const filteredData = [...counterTrackers, ...timeTrackers]
      .filter(tracker => tracker.name === selectedTracker)
      .map(tracker => ({
        name: tracker.name,
        value: tracker.count || tracker.accumulatedTime || 0,
      }));
    setData(filteredData);
  }, [selectedTracker, selectedPeriod, counterTrackers, timeTrackers]);

  const handleTrackerChange = (event) => {
    setSelectedTracker(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div className="main-container"style={{marginTop: '58px'}}>
      <Header colorTheme={colorTheme} />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Analytics
        </Typography>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="tracker-select-label">Tracker auswählen</InputLabel>
          <Select
            labelId="tracker-select-label"
            value={selectedTracker}
            label="Tracker auswählen"
            onChange={handleTrackerChange}
          >
            {[...counterTrackers, ...timeTrackers].map(tracker => (
              <MenuItem key={tracker.id} value={tracker.name}>
                {tracker.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="period-select-label">Zeitraum auswählen</InputLabel>
          <Select
            labelId="period-select-label"
            value={selectedPeriod}
            label="Zeitraum auswählen"
            onChange={handlePeriodChange}
          >
            <MenuItem value="week">Letzte Woche</MenuItem>
            <MenuItem value="month">Letzter Monat</MenuItem>
            <MenuItem value="year">Letztes Jahr</MenuItem>
            <MenuItem value="all">Gesamt</MenuItem>
          </Select>
        </FormControl>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={colorTheme} />
          </BarChart>
        </ResponsiveContainer>
      </Container>
      <Footer colorTheme={colorTheme} />
    </div>
  );
};

export default Analytics;