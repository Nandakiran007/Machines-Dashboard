
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface TemperatureSample {
  value: number;
  updatedAt: string;
}


export type MachineDocument = Machine & Document;

@Schema()
export class Machine {
  
  @Prop({ required: true, unique: true })
    id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  temperature: number;

  @Prop()
  energyConsumption: number;

  @Prop({ type: [{ value: Number, updatedAt: String }], default: [] })
  temperatureHistory?: TemperatureSample[];
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
