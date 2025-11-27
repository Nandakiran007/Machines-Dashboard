export interface Machine {
  id: string;
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
