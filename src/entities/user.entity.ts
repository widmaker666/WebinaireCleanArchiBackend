import { differenceInDays } from 'date-fns';

type UserProps = {
  id: string;
};

export class User {
  constructor(public props: UserProps) {}
}
 