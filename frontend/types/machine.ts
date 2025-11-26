export interface Machine {
  id: string;
  name: string;
  status: string;
  temperature: number;
  energyConsumption: number;
  details?: Record<string, any>;
  temperatureHistory?: number[];
}