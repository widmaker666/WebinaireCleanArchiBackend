type WebinaireProps = {
  id: string;
  title: string;
  seats: number;
  startDate: Date;
  endDate: Date;
};

export class Webinaire {
  constructor(public props: WebinaireProps) {}
}
export interface IWebinaireRepository {
  create(webinaire: Webinaire): Promise<void>;
}

export interface IIDGenerator {
  generate(): string;
}

export class OrganizeWebinaire {
  constructor(
    private readonly repository: IWebinaireRepository,
    private readonly idGenerator: IIDGenerator,
  ) {}
  async execute(data: {
    title: string;
    seats: number;
    startDate: Date;
    endDate: Date;
  }) {
    const id = this.idGenerator.generate();
    this.repository.create(
      new Webinaire({
        id,
        title: data.title,
        seats: data.seats,
        startDate: data.startDate,
        endDate: data.endDate,
      }),
    );
    return { id };
  }
}
