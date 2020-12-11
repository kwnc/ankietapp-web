import {Answer} from './answer';

export class UserSurveyResponse {
  id: number;
  userId: number;
  completed: boolean;
  answers: Answer[];
}
