import './ActivityModal.css'; 
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Make sure to set the root element for accessibility

const ActivityModal = ({ isOpen, onRequestClose, onSubmit, day, currentData }) => {
  const [husbandExercise, setHusbandExercise] = useState(currentData.husband || { type: 'No exercise', exercised: false });
  const [wifeExercise, setWifeExercise] = useState(currentData.wife || { type: 'No exercise', exercised: false });

  // Use useEffect to update the state when currentData changes
  useEffect(() => {
    setHusbandExercise(currentData.husband || { type: 'No exercise', exercised: false });
    setWifeExercise(currentData.wife || { type: 'No exercise', exercised: false });
  }, [currentData]);

  const handleSubmit = () => {
    onSubmit(day, husbandExercise, wifeExercise);
    onRequestClose(); // Close the modal after saving
  };

  const handleExerciseChange = (e, person) => {
    const { value } = e.target;
    const exerciseState = {
      type: value,
      exercised: value !== 'No exercise', // Only count as exercised if not "No exercise"
    };

    if (person === 'husband') {
      setHusbandExercise(exerciseState);
    } else {
      setWifeExercise(exerciseState);
    }
  };

  // Helper function to format the day as a string (YYYY-MM-DD)
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      console.error('Invalid date passed to formatDate:', date);
      return ''; // Return empty string if the date is invalid
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="Modal__Content">
      <h2>Did we exercise on {formatDate(day)}?</h2>
      <div className="modal-container">
        {/* Wife's section */}
        <div className="person-section left">
          <h3>Vaiva</h3>
          <div className="exercise-buttons">
            <button
              onClick={(e) => handleExerciseChange(e, 'wife')}
              value="No exercise"
              className={wifeExercise.type === 'No exercise' ? 'selected' : ''}
            >
              No exercise
            </button>
            <button
              onClick={(e) => handleExerciseChange(e, 'wife')}
              value="Run"
              className={wifeExercise.type === 'Run' ? 'selected' : ''}
            >
              Run
            </button>
            <button
              onClick={(e) => handleExerciseChange(e, 'wife')}
              value="SATS"
              className={wifeExercise.type === 'SATS' ? 'selected' : ''}
            >
              SATS
            </button>
            <button
              onClick={(e) => handleExerciseChange(e, 'wife')}
              value="Ski"
              className={wifeExercise.type === 'Ski' ? 'selected' : ''}
            >
              Ski
            </button>
          </div>
        </div>

        {/* Husband's section */}
        <div className="person-section right">
          <h3>Gøran</h3>
          <div className="exercise-buttons">
            <button
              onClick={(e) => handleExerciseChange(e, 'husband')}
              value="No exercise"
              className={husbandExercise.type === 'No exercise' ? 'selected' : ''}
            >
              No exercise
            </button>
            <button
              onClick={(e) => handleExerciseChange(e, 'husband')}
              value="Run"
              className={husbandExercise.type === 'Run' ? 'selected' : ''}
            >
              Run
            </button>
            <button
              onClick={(e) => handleExerciseChange(e, 'husband')}
              value="SATS"
              className={husbandExercise.type === 'SATS' ? 'selected' : ''}
            >
              SATS
            </button>
            <button
              onClick={(e) => handleExerciseChange(e, 'husband')}
              value="Ski"
              className={husbandExercise.type === 'Ski' ? 'selected' : ''}
            >
              Ski
            </button>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>Save</button>
    </Modal>
  );
};

export default ActivityModal;
