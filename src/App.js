// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/table'; // Assuming the file name is 'Table.js'
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sample1-5c2m.onrender.com/data');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container">
      <div className="header bg-gray-500 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Scheduler Data</h1>
        <p className="text-lg mb-4">
          Welcome, this is a Scheduler application. Below is the table displaying scheduling data.
        </p>
        <p className="text-lg">
          The Schedule is from <span className="font-bold">31-12-2023</span> to{' '}
          <span className="font-bold">06-12-2023</span>
        </p>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          Loading...
        </div>
      ) : (
        <div className="table-container">
          <div className="responsive-table-wrapper">
            <Table data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
