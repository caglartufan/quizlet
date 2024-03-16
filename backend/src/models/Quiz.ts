import { Schema, Model, model, Types } from 'mongoose';
import { IQuestion } from './Question';
import VALIDATION from '../messages/validation';

export interface IQuiz {
    // 1st Step
    title: string;
    description: string;
    askedInformation: {
        firstname: boolean;
        lastname: boolean;
        age: boolean;
        email: boolean;
        address: boolean;
        phone: boolean;
    };

    // 2nd Step
    questions: Array<IQuestion>;

    // 3rd Step
    isPublished: boolean;
}

interface IQuizMethods {}

type QuizModel = Model<IQuiz, {}, IQuizMethods>;

const quizSchema = new Schema<IQuiz, QuizModel, IQuizMethods>({
    title: {
        type: String,
        required: [true, VALIDATION.quiz.title['any.required']],
        minlength: [5, VALIDATION.quiz.title['string.min']],
        maxlength: [50, VALIDATION.quiz.title['string.max']],
    },
    description: {
        type: String,
        required: [true, VALIDATION.quiz.description['any.required']],
        minlength: [5, VALIDATION.quiz.description['string.min']],
        maxlength: [250, VALIDATION.quiz.description['string.max']],
    },
    askedInformation: {
        firstname: true,
        lastname: true,
        age: false,
        email: true,
        address: false,
        phone: false,
    },
    questions: [
        {
            type: Types.ObjectId,
            ref: 'Question',
            default: [],
        },
    ],
    isPublished: {
        type: Boolean,
        validate: {
            validator: function (this: IQuiz, value: boolean) {
                const hasAnyQuestions = this.questions.length > 0;
                return !value || hasAnyQuestions;
            },
            message: VALIDATION.quiz.isPublished['validate.message'],
        },
        default: false,
    },
});

export const Quiz = model<IQuiz, QuizModel>('Quiz', quizSchema);
