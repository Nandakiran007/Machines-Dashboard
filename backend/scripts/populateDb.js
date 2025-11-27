const mongoose = require('mongoose');

// MongoDB URL
const MONGO_URL =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/machinesdb';

// Machine Schema
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


const machineData = [
  {
    id: 1,
    name: 'Lathe Machine',
    status: 'Running',
    temperature: 75,
    energyConsumption: 800,
  },
  {
    id: 2,
    name: 'CNC Milling Machine',
    status: 'Idle',
    temperature: 65,
    energyConsumption: 800,
  },
  {
    id: 3,
    name: 'Injection Molding Machine',
    status: 'Stopped',
    temperature: 85,
    energyConsumption: 1500,
  },
];


async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URL);
    console.log('Connected.');

    console.log('Clearing old data...');
    await Machine.deleteMany({});

    // Add temperatureHistory for each machine
    const enrichedData = machineData.map((m) => ({
      ...m,
      temperatureHistory: [
        {
          value: m.temperature,
          updatedAt: new Date().toISOString(),
        },
      ],
    }));

    console.log('Inserting new machines...');
    await Machine.insertMany(enrichedData);

    console.log('Data inserted successfully.');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
