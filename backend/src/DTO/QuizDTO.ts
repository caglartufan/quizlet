import { Types } from 'mongoose';
import { IQuestion } from '../models/Question';

type AskedInformation = {
    firstname: boolean;
    lastname: boolean;
    age: boolean;
    email: boolean;
    address: boolean;
    phone: boolean;
};

export default class QuizDTO {
    private _createdBy: string;
    private _title: string;
    private _description: string;
    private _askedInformation: AskedInformation;
    private _questions: Array<string> | Array<IQuestion>;
    private _isPublished: boolean;

    get createdBy() {
        return this._createdBy;
    }

    set createdBy(value: string) {
        this._createdBy = value;
    }

    get title() {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get askedInformation(): AskedInformation {
        return this._askedInformation;
    }

    set askedInformation(value: AskedInformation) {
        this._askedInformation = value;
    }

    get questions(): Array<string> | Array<IQuestion> | undefined {
        return this._questions;
    }

    set questions(value: Array<string> | Array<IQuestion>) {
        this._questions = value;
    }

    get isPublished(): boolean {
        return this._isPublished;
    }

    set isPublished(value: boolean) {
        this._isPublished = value;
    }

    constructor(obj: {
        createdBy: string | Types.ObjectId;
        title: string;
        description: string;
        askedInformation: AskedInformation;
        questions: Array<string> | Array<Types.ObjectId> | Array<IQuestion>;
        isPublished: boolean;
    }) {
        this._createdBy = obj.createdBy.toString();
        this._title = obj.title;
        this._description = obj.description;
        this._askedInformation = obj.askedInformation;

        // Transform questions: Array<string> | Array<Types.ObjectId> | Array<IQuestion> to transformedQuestions: Array<string> | Array<IQuestion>
        let transformedQuestions: Array<string> | Array<IQuestion>;
        const isQuestionsArrayOfObjectIds = obj.questions.length && obj.questions.every(question => question instanceof Types.ObjectId);
        if(isQuestionsArrayOfObjectIds) {
            transformedQuestions = obj.questions.map(question => (question as Types.ObjectId).toString());
        } else {
            transformedQuestions = (obj.questions as Array<string> | Array<IQuestion>);
        }
        this._questions = transformedQuestions;

        this._isPublished = obj.isPublished;
    }

    toObject() {
        return {
            createdBy: this.createdBy,
            title: this.title,
            description: this.description,
            askedInformation: this.askedInformation,
            questions: this.questions,
            isPublished: this.isPublished
        };
    }
}
