import { Question } from './question';

export class Survey {
    name: string;
    description: string;
    dueDate: string;
    public: boolean;
    users: string[];
    questions: Question[];

    constructor() {}
}
