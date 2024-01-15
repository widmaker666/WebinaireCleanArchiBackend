import { OrganizeWebinaire } from './organize-webinaires';
import { InMemoryWebinaireRepository } from 'src/adapter/in-memory-webinaire-repository';
import { FixedIDGenerator } from 'src/adapter/fixed-id-generator';
import { Webinaire } from '../entities/webinaire.entity';
import { IDateGenerator } from 'src/ports/date-generator.interface';
import { FixedDateGenerator } from 'src/adapter/fixed-date-generator';

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
  let dateGenerator: IDateGenerator;
  let useCase: OrganizeWebinaire;

  beforeEach(() => {
    repository = new InMemoryWebinaireRepository();
    idGenerator = new FixedIDGenerator();
    dateGenerator = new FixedDateGenerator();
    useCase = new OrganizeWebinaire(repository, idGenerator, dateGenerator);
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

  describe('Scenario: teh webinaire happens too soon', () => {
    const payload = {
      title: 'My first webinaire',
      seats: 100,
      startDate: new Date('2023-01-01T10:00:00.000Z'),
      endDate: new Date('2023-01-01T11:00:00.000Z'),
    };
    it('should throw an error', async () => {
      await expect(() => useCase.execute(payload)).rejects.toThrowError(
        'the webinaire must happen in at least 3 day',
      );
    });

    it('should not create a webinaire', async () => {
      try {
        await useCase.execute(payload);
      } catch (error) {}
      expect(repository.database.length).toBe(0);
    });
  });

  describe('Scenario: teh webinaire has too many seats', () => {
    const payload = {
      title: 'My first webinaire',
      seats: 1001,
      startDate: new Date('2023-01-10T10:00:00.000Z'),
      endDate: new Date('2023-01-10T11:00:00.000Z'),
    };

    it('should throw an error', async () => {
      await expect(() => useCase.execute(payload)).rejects.toThrowError(
        'the webinaire must have a maximum of 1000 seats',
      );
    });

    it('should not create a webinaire', async () => {
      try {
        await useCase.execute(payload);
      } catch (error) {}
      expect(repository.database.length).toBe(0);
    });
  });

  describe('Scenario: the webinaire dont have enough seats', () => {
    const payload = {
      title: 'My first webinaire',
      seats: 0,
      startDate: new Date('2023-01-10T10:00:00.000Z'),
      endDate: new Date('2023-01-10T11:00:00.000Z'),
    };

    it('should throw an error', async () => {
      await expect(() => useCase.execute(payload)).rejects.toThrowError(
        'the webinaire must at least 1 seat',
      );
    });

    it('should not create a webinaire', async () => {
      try {
        await useCase.execute(payload);
      } catch (error) {}
      expect(repository.database.length).toBe(0);
    });
  });
});
