import { Body, Controller, Get, Param, Post, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { JwtAuthGuard } from '../auth';
import type { Request } from 'express';

@Controller('machines')
@UseGuards(JwtAuthGuard)
export class MachinesController {
  constructor(private readonly svc: MachinesService) {}

  @Get()
  getAll(@Req() req: Request) {
    return this.svc.findAll();
  }

  @Get(':id')
  getOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Post(':id/update')
  update(@Req() req: Request, @Param('id', ParseIntPipe) id: number, @Body() body: Record<string, any>) {
    return this.svc.updateReadings(id, body);
  }
}
