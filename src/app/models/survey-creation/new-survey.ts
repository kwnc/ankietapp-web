import { NewSurveyQuestion } from './new-survey-question';

export class NewSurvey {
    name: string;
    description: string;
    dueDate: string;
    users: string[];
    questions: NewSurveyQuestion[];

    constructor() {}
}
