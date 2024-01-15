import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrentDateGenerator } from '../adapter/current-date-generator';
import { RandomIdGenerator } from '../adapter/random-id-generator';
import { InMemoryWebinaireRepository } from '../adapter/in-memory-webinaire-repository';
import { OrganizeWebinaire } from '../usescases/organize-webinaires';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    CurrentDateGenerator,
    RandomIdGenerator,
    InMemoryWebinaireRepository,
    {
      provide: OrganizeWebinaire,
      inject: [
        InMemoryWebinaireRepository,
        CurrentDateGenerator,
        RandomIdGenerator,
      ],
      useFactory: (repository, dateGenerator, IDGenerator) => {
        return new OrganizeWebinaire(repository, IDGenerator, dateGenerator);
      },
    },
  ],
})
export class AppModule {}
