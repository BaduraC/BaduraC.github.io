// [App.js](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5CCollin%5C%5CDocuments%5C%5CForschungspraktikum%5C%5Cdata-tracker-pwa%5C%5Csrc%5C%5CApp.js%22%2C%22_sep%22%3A1%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FCollin%2FDocuments%2FForschungspraktikum%2Fdata-tracker-pwa%2Fsrc%2FApp.js%22%2C%22scheme%22%3A%22file%22%7D%7D)
import React, { useState, useEffect } from 'react';
import AddButton from './components/AddButton';
import ButtonGrid from './components/ButtonGrid';
import Modal from './components/Modal';
import Container from '@mui/material/Container';
import { addTracker, getTrackers, updateTracker, deleteTracker } from './utils/db';

const App = () => {
  const [buttons, setButtons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

   // Tracker beim Laden der App abrufen
   useEffect(() => {
    const fetchTrackers = async () => {
      const trackers = await getTrackers();
      setButtons(trackers);
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
  const id = await addTracker({ ...button, count: 0 });
  setButtons([...buttons, { ...button, id, count: 0 }]);
  setModalOpen(false);
  };

  const handleDeleteButton = (id) => {
    setButtons(buttons.filter(button => button.id !== id));
  };

  return (
    <Container>
      <h1>Data-Tracking-App</h1>
      <AddButton onClick={handleAddButtonClick} />
      <ButtonGrid buttons={buttons} onDelete={handleDeleteButton}/>
      <Modal open={modalOpen} onClose={handleModalClose} onSave={handleSaveButton} />
    </Container>
  );
};

export default App;