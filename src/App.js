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
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Scheduler Data</h1>
        <br></br>
        <p> Scheduler application. Below is the table displaying scheduling data.</p>
       <br></br>
       <p>The Schedule is from 31-12-2023 to 06-12-2023</p>
      </div>

      {loading ? (
        // Display a loading spinner while data is being fetched
        <div className="loading-spinner">Loading...</div>
      ) : (
        // Render the table component once data is available
        <div>
          <div className="table-container">
            <Table data={data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
