import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FooterNav from '../components/Footer';
import Header from '../components/Header';
import AddButton from '../components/AddButton';
import ButtonGrid from '../components/ButtonGrid';
import Modal from '../components/Modal';
import { addCounterTracker, getCounterTrackers, clearCounterTrackers, deleteCounterTracker, addTimeTracker, getTimeTrackers, clearTimeTrackers, deleteTimeTracker } from '../utils/db';
import CounterTrackerButton from '../components/CounterTrackerButton';
import TimeTrackerButton from '../components/TimeTrackerButton';

const Home = ({ colorTheme }) => {
  const [counterTrackers, setCounterTrackers] = useState([]);
  const [timeTrackers, setTimeTrackers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Tracker beim Laden der App abrufen
  useEffect(() => {
    const fetchTrackers = async () => {
      const counterTrackers = await getCounterTrackers();
      setCounterTrackers(Array.isArray(counterTrackers) ? counterTrackers : []);
      const timeTrackers = await getTimeTrackers();
      setTimeTrackers(Array.isArray(timeTrackers) ? timeTrackers : []);
    };
    fetchTrackers();
  }, []);

  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveButton = async (button) => {
    if (button.type === 'counter') {
      const id = await addCounterTracker({ ...button, count: 0 });
      setCounterTrackers([...counterTrackers, { ...button, id, count: 0 }]);
    } else if (button.type === 'time') {
      const id = await addTimeTracker({ ...button, startTime: null, endTime: null });
      setTimeTrackers([...timeTrackers, { ...button, id, startTime: null, endTime: null }]);
    }
    setModalOpen(false);
  };

  const handleDeleteCounterTrackerButton = (id) => {
    setCounterTrackers(counterTrackers.filter(tracker => tracker.id !== id));
  };

  const handleDeleteTimeTrackerButton = (id) => {
    setTimeTrackers(timeTrackers.filter(tracker => tracker.id !== id));
  };

  const handleClearAll = async () => {
    if (window.confirm('Möchten Sie wirklich alle Tracker löschen?')) {
      await clearCounterTrackers();
      await clearTimeTrackers();
      setCounterTrackers([]);
      setTimeTrackers([]);
    }
  };

  const allTrackers = [...counterTrackers, ...timeTrackers];

  return (
    <div className="main-container">
      <div className="scroll-wrapper" style={{marginTop: '58px'}}>
        <Header colorTheme={colorTheme} />
        <Container>
          <h1>Data-Tracking-App</h1>
          <ButtonGrid buttons={allTrackers} onDelete={(id, type) => {
            if (type === 'counter') {
              handleDeleteCounterTrackerButton(id);
            } else {
              handleDeleteTimeTrackerButton(id);
            }
          }} onAddButtonClick={handleAddButtonClick}
          />
          <Modal open={modalOpen} onClose={handleModalClose} onSave={handleSaveButton} />
          <Button variant="contained" color="secondary" onClick={handleClearAll}>
            Alle Tracker löschen
          </Button>
          <FooterNav colorTheme={colorTheme} />
        </Container>
      </div>
    </div>
  );
};

export default Home;