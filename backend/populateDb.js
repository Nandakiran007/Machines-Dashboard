const mongoose = require('mongoose');

// MongoDB URL
const MONGO_URL =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/machinesdb';

// Schemas
const TemperatureSampleSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  updatedAt: { type: String, required: true },
});

const MachineSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  temperature: Number,
  energyConsumption: Number,
  temperatureHistory: {
    type: [
      {
        value: Number,
        updatedAt: String,
      },
    ],
    default: [],
  },
});

const Machine = mongoose.model('Machine', MachineSchema);

// Utility to generate multiple history entries
function generateHistory(initialTemp) {
  const base = Date.now();
  const samples = [];

  const randomShift = () => Math.floor(Math.random() * 12) - 6;

  for (let i = 0; i < Math.floor(Math.random() * 8) + 4; i++) {
    samples.push({
      value: initialTemp + randomShift(),
      updatedAt: new Date(base - i * 3600 * 1000).toISOString(), // hourly steps
    });
  }

  return samples.reverse(); // oldest first
}

// --- 6 MACHINE DATA ----
const machineData = [
  {
    id: 1,
    name: 'Lathe Machine',
    status: 'Running',
    temperature: 66,
    energyConsumption: 800,
    temperatureHistory: generateHistory(75),
  },
  {
    id: 2,
    name: 'CNC Milling Machine',
    status: 'Idle',
    temperature: 64,
    energyConsumption: 800,
    temperatureHistory: generateHistory(65),
  },
  {
    id: 3,
    name: 'Injection Molding Machine',
    status: 'Stopped',
    temperature: 85,
    energyConsumption: 1500,
    temperatureHistory: generateHistory(85),
  },
  {
    id: 4,
    name: 'Hydraulic Press',
    status: 'Running',
    temperature: 72,
    energyConsumption: 950,
    temperatureHistory: generateHistory(70),
  },
  {
    id: 5,
    name: '3D Printer',
    status: 'Running',
    temperature: 58,
    energyConsumption: 300,
    temperatureHistory: generateHistory(55),
  },
  {
    id: 6,
    name: 'Laser Cutting Machine',
    status: 'Idle',
    temperature: 62,
    energyConsumption: 1200,
    temperatureHistory: generateHistory(60),
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URL);
    console.log('Connected.');

    console.log('Clearing old data...');
    await Machine.deleteMany({});

    console.log('Inserting updated machines...');
    await Machine.insertMany(machineData);

    console.log('Seeding complete ✔');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
