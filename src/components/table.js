import React, { useState, useEffect } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';

const Table = ({ data }) => {
  const [date, setDate] = useState('');
  const [showResetButton, setShowResetButton] = useState(false);
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    if (date) {
      const selectedDate = parseISO(date);
      const sorted = data.filter((item) => {
        const meetingStartTime = parseISO(item.bookedServicesData[0].meetingStartTime);
        return isSameDay(meetingStartTime, selectedDate);
      });
      setSortedData(sorted);
      setShowResetButton(true);
    } else {
      setSortedData(data);
      setShowResetButton(false);
    }
  }, [data, date]);

  const getCurrentDateTime = () => new Date();

  const getReminderStatus = (firstReminderTime, secondReminderTime) => {
    const currentTime = getCurrentDateTime();
    if (currentTime > parseISO(secondReminderTime)) {
      return 'success';
    } else if (currentTime > parseISO(firstReminderTime) && currentTime < parseISO(secondReminderTime)) {
      return 'waiting';
    } else {
      return 'waiting';
    }
  };

  const renderReminderTime = (meetingStartTime, offsetMinutes) => {
    const reminderTime = new Date(parseISO(meetingStartTime).getTime() - offsetMinutes * 60 * 1000);

    if (getCurrentDateTime() >= reminderTime) {
      return format(reminderTime, 'MMM d yyyy h:mma');
    } else {
      return '-';
    }
  };

  const resetFilter = () => {
    setDate('');
    setShowResetButton(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-11">
      {/* Filter by date text and reset button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <div>
          <span className="text-gray-700 dark:text-gray-300">Filter by Date: </span>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
              setShowResetButton(true);
            }}
            value={date}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        {showResetButton && (
          <button onClick={resetFilter} className="bg-gray-500 text-white p-2 rounded-md ml-2">
            Reset
          </button>
        )}
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 table-auto bg-white dark:bg-gray-800">
        <thead className="text-xs text-white uppercase bg-slate-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 sm:py-2">
              Sno
            </th>
            <th scope="col" className="px-6 py-3 sm:py-2">
              Meeting Start Time
            </th>
            <th scope="col" className="px-6 py-3 sm:py-2">
              Doctor name
            </th>
            <th scope="col" className="px-6 py-3 sm:py-2">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3 sm:py-2">
              1st Reminder<br/> Sent Time
            </th>
            <th scope="col" className="px-6 py-3 sm:py-2">
              2nd Reminder<br/> Sent Time
            </th>
            <th scope="col" className="px-6 py-3 sm:py-2">
              Delivery <br/>Channel
            </th>
            <th scope="col" className="px-6 py-3 sm:py-2">
              Is Reminders()
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr
              key={data.accId}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4 sm:py-2">{index + 1}</td>
              <td className="px-6 py-4 sm:py-2">
                {format(parseISO(data.bookedServicesData[0].meetingStartTime), 'MMM d yyyy h:mma')}
              </td>
              <th className="px-6 py-4 sm:py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.Username_doctor}
              </th>
              <td className="px-6 py-4 sm:py-2">{data.bookedServicesData[0].customerName}</td>
              <td className="px-6 py-4 sm:py-2">
                {renderReminderTime(data.bookedServicesData[0].meetingStartTime, 60)}
              </td>
              <td className="px-6 py-4 sm:py-2">
                {renderReminderTime(data.bookedServicesData[0].meetingStartTime, 5)}
              </td>
              <td className="px-6 py-4 sm:py-2">Email</td>
              <td className="px-6 py-4 sm:py-2">
                {getReminderStatus(
                  data.bookedServicesData[0].meetingStartTime,
                  format(
                    new Date(parseISO(data.bookedServicesData[0].meetingStartTime).getTime() - 5 * 60 * 1000),
                    'yyyy-MM-dd HH:mm:ss'
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
