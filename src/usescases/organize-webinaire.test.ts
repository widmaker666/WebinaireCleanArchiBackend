import { OrganizeWebinaire } from './organize-webinaires';
import { InMemoryWebinaireRepository } from 'src/adapter/in-memory-webinaire-repository';
import { FixedIDGenerator } from 'src/adapter/fixed-id-generator';
import { Webinaire } from '../entities/webinaire.entity';

describe('Feature: My first webinaire', () => {
  function expectWebinaireToEqual(Webinaire: Webinaire) {
    expect(Webinaire.props).toEqual({
      id: 'id-1',
      title: 'My first webinaire',
      seats: 100,
      startDate: new Date('2023-01-10T10:00:00.000Z'),
      endDate: new Date('2023-01-10T11:00:00.000Z'),
    });
  }

  let repository: InMemoryWebinaireRepository;
  let idGenerator: FixedIDGenerator;
  let useCase: OrganizeWebinaire;

  beforeEach(() => {
    repository = new InMemoryWebinaireRepository();
    idGenerator = new FixedIDGenerator();
    useCase = new OrganizeWebinaire(repository, idGenerator);
  });

  describe('Scenario: happy path', () => {
    const payload = {
      title: 'My first webinaire',
      seats: 100,
      startDate: new Date('2023-01-10T10:00:00.000Z'),
      endDate: new Date('2023-01-10T11:00:00.000Z'),
    };
    it('should return the ID', async () => {
      const result = await useCase.execute(payload);

      expect(result.id).toEqual('id-1');
    });

    it('should insert the webinaire into the database', async () => {
      await useCase.execute(payload);

      expect(repository.database.length).toBe(1);

      const createdWebinaire = repository.database[0];
      expectWebinaireToEqual(createdWebinaire);
    });
  });
});
