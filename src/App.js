import React, { useState, useEffect } from 'react';
import Calendar from './Calendar'; // Your calendar component
import ActivityModal from './ActivityModal'; // The modal component
import './App.css';
import { db, collection, getDocs, setDoc, doc } from './firebase'; // Import Firestore methods

const App = () => {
  const [data, setData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Start with current month

  // Fetch initial data from Firestore
  useEffect(() => {
    fetchData(); // Call fetchData on component mount
  }, []); // Run only once on component mount

  // Fetch data from Firestore and update the state
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'exerciseData'));
    const fetchedData = {};

    querySnapshot.forEach((doc) => {
      const { husband, wife } = doc.data();
      const docId = doc.id; // This should be in the format 'YYYY-MM-DD'
      fetchedData[docId] = { husband, wife }; // Use the full date (e.g., '2025-01-01')
    });

    setData(fetchedData); // Update state with the new data
  };

  // Handle date click to open modal
  const handleClickDate = (date) => {
    setSelectedDay(date); // Set selectedDay as a Date object
    setModalOpen(true); // Open the modal to register exercise
  };

  // Get the CSS class for each day's cell
  const getCellClass = (date) => {
    const formattedDate = formatDate(date);
    const dayData = data[formattedDate]; // Use the formatted date (YYYY-MM-DD)
    if (dayData) {
      if (dayData.husband.exercised && dayData.wife.exercised) {
        return 'both';
      } else if (dayData.husband.exercised) {
        return 'husband';
      } else if (dayData.wife.exercised) {
        return 'wife';
      }
    }
    return ''; // Default to no exercise (no class applied)
  };

  // Handle saving data to Firestore
  const handleSave = (date, husband, wife) => {
    const formattedDate = formatDate(date); // Format the date to YYYY-MM-DD

    // Ensure that the formattedDate is a valid string
    if (!formattedDate) {
      console.error('Invalid date:', date);
      return;
    }

    // Update local state
    setData((prevData) => ({
      ...prevData,
      [formattedDate]: { husband, wife },
    }));

    // Save the updated data to Firestore
    setDoc(doc(db, 'exerciseData', formattedDate), { husband, wife })
      .then(() => {
        console.log('Data saved to Firestore');
        fetchData(); // Re-fetch data after saving
      })
      .catch((error) => {
        console.error('Error saving data to Firestore:', error);
      });

    setModalOpen(false); // Close modal after saving
  };

  // Format the full date (Date object) to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date)) {
      console.error('Invalid date passed to formatDate:', date);
      return ''; // Return an empty string if the date is invalid
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad with 0
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0
    return `${year}-${month}-${day}`; // Return formatted date string
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Format the current month for display in the subtitle (e.g., "January 2025")
  const getFormattedMonthYear = () => {
    const month = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="page-container">
      <div className="header">
        <button onClick={goToPreviousMonth}>Previous</button> {/* Previous month button */}
        <h2>{getFormattedMonthYear()}</h2> {/* Display current month and year */}
        <button onClick={goToNextMonth}>Next</button> {/* Next month button */}
      </div>

      <div className="calendar">
        <Calendar
          data={data}
          onClickDate={handleClickDate}
          getCellClass={getCellClass}
          currentMonth={currentMonth} // Pass the current month to the calendar
        />
      </div>

      <ActivityModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        day={selectedDay || new Date()}  // Ensure day is never null (fallback to current date)
        currentData={
          data[formatDate(selectedDay)] || {
            husband: { type: 'No exercise', exercised: false },
            wife: { type: 'No exercise', exercised: false },
          }
        }
      />
    </div>
  );
};

export default App;
