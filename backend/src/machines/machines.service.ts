import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machine, MachineDocument } from './schemas/machine.schema';

@Injectable()
export class MachinesService {
  constructor(@InjectModel(Machine.name) private machineModel: Model<MachineDocument>) {}

  async findAll(): Promise<Machine[]> {
    return this.machineModel.find().lean().exec();
  }

  async findOne(id: number): Promise<Machine> {
    const m = await this.machineModel.findOne({ id }).lean().exec();
    if (!m) throw new NotFoundException('Machine not found');
    return m;
  }

  async updateReadings(id: number, readings: Record<string, any>): Promise<Machine> {
  const update: Record<string, any> = {};
  const historyPush: any[] = [];

  if ('temperature' in readings && typeof readings.temperature === 'number') {
    update.temperature = readings.temperature;

    historyPush.push({
      value: readings.temperature,
      updatedAt: new Date().toISOString(),
    });
  }

  if ('energyConsumption' in readings && typeof readings.energyConsumption === 'number') {
    update.energyConsumption = readings.energyConsumption;
  }

  if ('status' in readings && typeof readings.status === 'string') {
    update.status = readings.status;
  }

  const updated = await this.machineModel.findOneAndUpdate(
    { id },
    {
      $set: update,
      ...(historyPush.length > 0 && { $push: { temperatureHistory: { $each: historyPush } } }),
    },
    { new: true }
  ).lean().exec();

  if (!updated) throw new NotFoundException('Machine not found');
  return updated;
}

}
