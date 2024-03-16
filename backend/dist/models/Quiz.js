"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const mongoose_1 = require("mongoose");
const validation_1 = __importDefault(require("../messages/validation"));
const quizSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, validation_1.default.quiz.title['any.required']],
        minlength: [5, validation_1.default.quiz.title['string.min']],
        maxlength: [50, validation_1.default.quiz.title['string.max']],
    },
    description: {
        type: String,
        required: [true, validation_1.default.quiz.description['any.required']],
        minlength: [5, validation_1.default.quiz.description['string.min']],
        maxlength: [250, validation_1.default.quiz.description['string.max']],
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
            type: mongoose_1.Types.ObjectId,
            ref: 'Question',
            default: [],
        },
    ],
    isPublished: {
        type: Boolean,
        validate: {
            validator: function (value) {
                const hasAnyQuestions = this.questions.length > 0;
                return !value || hasAnyQuestions;
            },
            message: validation_1.default.quiz.isPublished['validate.message'],
        },
        default: false,
    },
});
exports.Quiz = (0, mongoose_1.model)('Quiz', quizSchema);
