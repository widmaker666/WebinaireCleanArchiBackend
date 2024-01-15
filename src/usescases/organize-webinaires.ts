export class Webinaire {
  public props: {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    seats: number;
  };

  constructor(data: {
    id: string;
    title: string;
    seats: number;
    startDate: Date;
    endDate: Date;
  }) {
    this.props = data;
  }
}
export interface IWebinaireRepository {
  create(webinaire: Webinaire): Promise<void>;
}

export class OrganizeWebinaire {
  constructor(private readonly repository: IWebinaireRepository) {}
  async execute(data: {
    title: string;
    seats: number;
    startDate: Date;
    endDate: Date;
  }) {
    const id = 'id-1';
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
