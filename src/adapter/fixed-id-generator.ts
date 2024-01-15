import { IIDGenerator } from 'src/ports/id-genrator.interface';

export class FixedIDGenerator implements IIDGenerator {
  generate(): string {
    return 'id-1';
  }
}
