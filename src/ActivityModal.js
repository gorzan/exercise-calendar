import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Make sure to set the root element for accessibility

const ActivityModal = ({ isOpen, onRequestClose, onSubmit, day }) => {
  const [husband, setHusband] = useState(false);
  const [wife, setWife] = useState(false);

  const handleSubmit = () => {
    onSubmit(day, husband, wife);
    onRequestClose(); // Close the modal after saving
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Enter Exercise Data for Day {day}</h2>
      <label>
        <input
          type="checkbox"
          checked={husband}
          onChange={() => setHusband(!husband)}
        />
        Husband
      </label>
      <label>
        <input
          type="checkbox"
          checked={wife}
          onChange={() => setWife(!wife)}
        />
        Wife
      </label>
      <button onClick={handleSubmit}>Save</button>
    </Modal>
  );
};

export default ActivityModal;
