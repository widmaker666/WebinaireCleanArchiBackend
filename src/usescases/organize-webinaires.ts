import { differenceInDays } from 'date-fns';
import { Webinaire } from 'src/entities/webinaire.entity';
import { IDateGenerator } from 'src/ports/date-generator.interface';
import { IIDGenerator } from 'src/ports/id-genrator.interface';
import { IWebinaireRepository } from 'src/ports/webinaire-repository.interface';

export class OrganizeWebinaire {
  constructor(
    private readonly repository: IWebinaireRepository,
    private readonly idGenerator: IIDGenerator,
    private readonly dateGenerator: IDateGenerator,
  ) {}
  async execute(data: {
    title: string;
    seats: number;
    startDate: Date;
    endDate: Date;
  }) {
    const id = this.idGenerator.generate();
    const webinaire = new Webinaire({
      id,
      title: data.title,
      seats: data.seats,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    if (webinaire.isTooClose(this.dateGenerator.now())) {
      throw new Error('the webinaire must happen in at least 3 day');
    }

    if (webinaire.hasTooManySeats()) {
      throw new Error('the webinaire must have a maximum of 1000 seats');
    }

    if (webinaire.hasNoSeats()) {
      throw new Error('the webinaire must at least 1 seat');
    }

    await this.repository.create(webinaire);

    return { id };
  }
}
