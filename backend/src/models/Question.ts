import { Schema, Model, model } from 'mongoose';
import VALIDATION from '../messages/validation';

export interface IQuestion {
    description: string;
    options: Array<{
        description: string;
    }>;
    correctOption: number;
}

interface IQuestionMethods {}

type QuestionModel = Model<IQuestion, {}, IQuestionMethods>;

const questionSchema = new Schema<IQuestion, QuestionModel, IQuestionMethods>({
    description: {
        type: String,
        required: [true, VALIDATION.question.description['any.required']],
        minlength: [5, VALIDATION.question.description['string.min']],
        maxlength: [100, VALIDATION.question.description['string.max']],
    },
    options: {
        type: [
            {
                description: {
                    type: String,
                    required: [
                        true,
                        VALIDATION.question.options.elem.description[
                            'any.required'
                        ],
                    ],
                    maxlength: [
                        50,
                        VALIDATION.question.options.elem.description[
                            'string.max'
                        ],
                    ],
                },
            },
        ],
        default: [],
    },
    correctOption: {
        type: Number,
        validate: {
            validator: function (this: IQuestion, value: number) {
                return value < this.options.length;
            },
            message: VALIDATION.question.correctOption['validate.message'],
        },
        default: -1,
    },
});

export const Question = model<IQuestion, QuestionModel>(
    'Question',
    questionSchema
);
