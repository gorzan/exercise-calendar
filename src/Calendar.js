// src/Calendar.js
import React from 'react';
import './Calendar.css';

// Check if currentMonth is valid, otherwise default to the current date
const Calendar = ({ data, onClickDate, getCellClass, currentMonth }) => {
  if (!currentMonth) {
    console.error("Invalid currentMonth:", currentMonth); // Log if currentMonth is invalid
    currentMonth = new Date(); // Default to the current date
  }

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay(); // Day of the week of the 1st day of the month

  const weeks = [];
  let currentWeek = [];

  // Adjust for starting on Monday
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Loop through each day of the month
  for (let i = 0; i < adjustedFirstDay; i++) {
    currentWeek.push({ day: null, status: 'empty' });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = formatDate(date); // Use the formatDate function to convert Date object to string
    const status = data[formattedDate] || { husband: false, wife: false };

    if (currentWeek.length < 7) {
      currentWeek.push({ day, status });
    }

    if (currentWeek.length === 7 || day === daysInMonth) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  return (
    <div className="calendar">
      {/* Weekday Header */}
      <div className="weekdays">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((weekday, index) => (
          <div key={index} className="weekday">
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="weeks">
        {weeks.map((week, index) => (
          <div className="week" key={index}>
            <div className="week-number">{index + 1}</div>
            {week.map(({ day, status }, dayIndex) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              return (
                <div
                  key={dayIndex}
                  className={`day ${status === 'empty' ? 'empty' : getCellClass(date)}`} // Get class based on exercise status
                  onClick={status !== 'empty' ? () => onClickDate(date): null} // Pass the full date object
                >
                  {day}
                </div>
              );
            })}
            {week.length < 7 && Array(7 - week.length).fill().map((_, i) => (
              <div key={`empty-${i}`} className="day empty"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to format a Date object as YYYY-MM-DD
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Format date as YYYY-MM-DD
};

export default Calendar;
