import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ data, onClickDate }) => {
  const daysInMonth = new Date(2025, 0, 0).getDate(); // Days in January (for example)
  const firstDayOfMonth = new Date(2025, 0, 1).getDay(); // Day of the week for the 1st of the month
  const weeks = [];
  let currentWeek = [];

  // Adjust the first day to account for the week starting on Monday
  // If the first day is Sunday (0), treat it as 7 (Monday).
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Create the weeks
  // Add empty cells before the 1st of the month, adjusted for Monday start
  for (let i = 0; i < adjustedFirstDay; i++) {
    currentWeek.push({ day: null, status: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(2024, 0, day);
    const status = data[day] || { husband: false, wife: false };

    // If it's not the first day of the week, just add the day
    if (currentWeek.length < 7) {
      currentWeek.push({ day, status });
    }

    // If the week is full (7 days), push it to the weeks array and start a new week
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
            {/* Week number column */}
            <div className="week-number">{index + 1}</div>

            {/* Day cells */}
            {week.map(({ day, status }, dayIndex) => (
              <div
                key={dayIndex}
                className={`day ${status && status.husband && status.wife ? 'both' : status && status.husband ? 'husband' : status && status.wife ? 'wife' : ''}`}
                onClick={() => onClickDate(day)}
              >
                {day}
              </div>
            ))}

            {/* Empty cells for weeks that don't start on Monday */}
            {week.length < 7 && Array(7 - week.length).fill().map((_, i) => (
              <div key={`empty-${i}`} className="day empty"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
