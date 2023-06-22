import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with the appropriate API base URL

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/devices`);
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDevicePower = async (deviceId, power) => {
    try {
      await axios.post(`${API_BASE_URL}/devices/${deviceId}`, { power });
      fetchDevices();
    } catch (error) {
      console.error('Error toggling device power:', error);
    }
  };

  return (
    <div className="App">
      <h1>Electricity Manager</h1>
      {loading ? (
        <p>Loading devices...</p>
      ) : (
        <ul>
          {devices.map(device => (
            <li key={device.id}>
              <h3>{device.name}</h3>
              <p>Power: {device.power ? 'ON' : 'OFF'}</p>
              <button onClick={() => toggleDevicePower(device.id, !device.power)}>
                {device.power ? 'Turn Off' : 'Turn On'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
