import { Injectable, NotFoundException } from '@nestjs/common';

export type Machine = {
  id: number;
  name: string;
  status: string;
  temperature: number;
  energyConsumption: number;
};

@Injectable()
export class MachinesService {
  private machines: Machine[] = [
    {
      id: 1,
      name: 'Lathe Machine',
      status: 'Running',
      temperature: 75,
      energyConsumption: 1200,
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

  findAll(): Machine[] {
    return this.machines;
  }

  findOne(id: number): Machine {
    const m = this.machines.find((x) => x.id === id);
    if (!m) throw new NotFoundException('Machine not found');
    return m;
  }

  updateReadings(id: number, readings: Record<string, any>) {
    const m = this.findOne(id);
    if ('temperature' in readings && typeof readings.temperature === 'number') {
      m.temperature = readings.temperature;
    }
    if ('energyConsumption' in readings && typeof readings.energyConsumption === 'number') {
      m.energyConsumption = readings.energyConsumption;
    }
    if ('status' in readings && typeof readings.status === 'string') {
      m.status = readings.status;
    }
    return m;
  }
}
