import { IIDGenerator } from 'src/ports/id-genrator.interface';
import { v4 } from 'uuid';

export class RandomIdGenerator implements IIDGenerator {
  generate(): string {
    return v4();
  }
}
