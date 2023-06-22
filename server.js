const express = require('express');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const app = express();
const port = 8000;
const arduinoPort = '/dev/ttyACM0'; // Replace with the appropriate port name

app.use(express.json());

let serialPort;

app.get('/devices', (req, res) => {
  res.json([
    { id: 1, name: 'Lamp', power: false },
    { id: 2, name: 'Fan', power: false }
    // Add more devices as needed
  ]);
});

app.post('/devices/:id', async (req, res) => {
  const deviceId = parseInt(req.params.id);
  const power = req.body.power;

  try {
    if (!serialPort) {
      serialPort = new SerialPort(arduinoPort, { baudRate: 9600 });
    }

    serialPort.write(`${deviceId}:${power ? 'ON' : 'OFF'}\n`);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error toggling device power:', error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
