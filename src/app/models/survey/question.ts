import {Choice} from '@app/models/choice';

export class Question {
  id: number;
  description: string;
  type: string;
  choices: Choice[];
  sortOrder: number;

  constructor() {
  }
}
