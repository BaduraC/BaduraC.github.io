// src/components/Modal.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';

const Modal = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ffffff');

  const handleSave = () => {
    onSave({ name, color });
    setName('');
    setColor('#ffffff');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Neuen Data-Tracker-Button hinzufügen</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <ChromePicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Abbrechen
        </Button>
        <Button onClick={handleSave} color="primary">
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;