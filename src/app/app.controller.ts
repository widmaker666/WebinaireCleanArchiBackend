import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrganizeWebinaire } from '../usescases/organize-webinaires';
import { User } from '../entities/user.entity';
import { addDays } from 'date-fns';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly organizeWebinaire: OrganizeWebinaire,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/webinaires')
  async HandleOrganizeWebinaire(@Body() body: any) {
    return this.organizeWebinaire.execute({
      user: new User({
        id: 'johnDoe',
      }),
      title: body.title,
      seats: body.seats,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    });
  }
}
