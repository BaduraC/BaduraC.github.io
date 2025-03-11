import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Modal = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [type, setType] = useState('counter');

  const handleSave = () => {
    onSave({ name, color, type });
    setName('');
    setColor('#ffffff');
    setType('counter');
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
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Typ</FormLabel>
          <RadioGroup
            row
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel value="counter" control={<Radio />} label="Counter" />
            <FormControlLabel value="time" control={<Radio />} label="Time" />
          </RadioGroup>
        </FormControl>
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