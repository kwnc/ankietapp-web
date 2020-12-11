import {Survey} from '@app/models/survey';
import {Answer} from '@app/models/answer';

export class Question {
  id: number;
  description: string;
  type: string;
  sortOrder: number;
  answers: Answer[];
  choices?: Choice[];
  survey: Survey;
}

export class Choice {
  id: number;
  value: string;
  question: Question;
}
