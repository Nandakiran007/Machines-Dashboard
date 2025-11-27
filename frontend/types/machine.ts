export interface Machine {
  id: number;
  name: string;
  status: string;
  temperature: number;
  energyConsumption: number;
  temperatureHistory?: TemperatureSample[];
}

export interface TemperatureSample {
  value: number;
  updatedAt: string;
}
