import {
  IIDGenerator,
  IWebinaireRepository,
  OrganizeWebinaire,
  Webinaire,
} from './organize-webinaires';

describe('Feature: My first webinaire', () => {
  it('should create a webinaire', async () => {
    class WebinaireRepository implements IWebinaireRepository {
      public database: Webinaire[] = [];
      async create(webinaire: any): Promise<void> {
        this.database.push(webinaire);
      }
    }

    class FixedIDGenerator implements IIDGenerator {
      generate(): string {
        return 'id-1';
      }
    }

    const repository = new WebinaireRepository();
    const idGenerator = new FixedIDGenerator();

    const useCase = new OrganizeWebinaire(repository, idGenerator);
    const result = await useCase.execute({
      title: 'My first webinaire',
      seats: 100,
      startDate: new Date('2023-01-01T10:00:00.000Z'),
      endDate: new Date('2023-01-01T11:00:00.000Z'),
    });
    expect(repository.database.length).toBe(1);

    const createdWebinaire = repository.database[0];
    
    expect(createdWebinaire.props.id).toBe('id-1');
    expect(createdWebinaire.props.title).toBe('My first webinaire');
    expect(createdWebinaire.props.seats).toBe(100);
    expect(createdWebinaire.props.startDate).toEqual(
      new Date('2023-01-01T10:00:00.000Z'),
    );
    expect(createdWebinaire.props.endDate).toEqual(
      new Date('2023-01-01T11:00:00.000Z'),
    );

    expect(result.id).toEqual('id-1');
  });
});
