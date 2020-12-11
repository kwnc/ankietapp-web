import {Question} from './question';
import {UserSurveyResponse} from './user-survey-response';

export class Answer {
  id: number;
  questionId: number;
  userSurveyResponseId: number;
  value: string;
  question: Question;
  userSurveyResponse: UserSurveyResponse;
}
