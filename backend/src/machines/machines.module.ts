import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { Machine, MachineSchema } from './schemas/machine.schema';
import { MachinesGateway } from './machines.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Machine.name, schema: MachineSchema }])],
  providers: [MachinesService, MachinesGateway],
  controllers: [MachinesController],
  exports: [MachinesService],
})
export class MachinesModule {}
