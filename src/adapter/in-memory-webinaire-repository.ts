import { Webinaire } from 'src/entities/webinaire.entity';
import { IWebinaireRepository } from 'src/ports/webinaire-repository.interface';

export class InMemoryWebinaireRepository implements IWebinaireRepository {
  public database: Webinaire[] = [];
  async create(webinaire: any): Promise<void> {
    this.database.push(webinaire);
  }
}
