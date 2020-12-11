import {Question} from '@app/models/question';
import {UserSurveyResponse} from '@app/models/user-survey-response';

export class Survey {
  id: number;
  name: string;
  description: string;
  ispublic: boolean;
  dueDate: Date;
  questions: Question[];
  userSurveyResponses: UserSurveyResponse[];
}
