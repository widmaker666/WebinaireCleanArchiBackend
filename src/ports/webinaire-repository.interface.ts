import { Webinaire } from 'src/entities/webinaire.entity';

export interface IWebinaireRepository {
  create(webinaire: Webinaire): Promise<void>;
}
