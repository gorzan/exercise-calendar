import React, { useState } from 'react';
import Calendar from './Calendar'; // Your calendar component
import ActivityModal from './ActivityModal'; // The modal component
import './App.css'; // The CSS file

const App = () => {
  const [data, setData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleClickDate = (day) => {
    setSelectedDay(day);
    setModalOpen(true); // Ensure modal opens
  };

  const handleSave = (day, husband, wife) => {
    setData((prevData) => ({
      ...prevData,
      [day]: { husband, wife },
    }));
    setModalOpen(false); // Close the modal after saving
  };

  return (
    <div className="page-container">
      <h1>Exercise Calendar</h1>
      <div className="calendar">
        <Calendar data={data} onClickDate={handleClickDate} />
      </div>
      <ActivityModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        day={selectedDay}
      />
    </div>
  );
};

export default App;
