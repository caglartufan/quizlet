"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const validation_1 = __importDefault(require("../messages/validation"));
const questionSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: [true, validation_1.default.question.description['any.required']],
        minlength: [5, validation_1.default.question.description['string.min']],
        maxlength: [100, validation_1.default.question.description['string.max']],
    },
    options: {
        type: [
            {
                description: {
                    type: String,
                    required: [
                        true,
                        validation_1.default.question.options.elem.description['any.required'],
                    ],
                    maxlength: [
                        50,
                        validation_1.default.question.options.elem.description['string.max'],
                    ],
                },
            },
        ],
        default: [],
    },
    correctOption: {
        type: Number,
        validate: {
            validator: function (value) {
                return value < this.options.length;
            },
            message: validation_1.default.question.correctOption['validate.message'],
        },
        default: -1,
    },
});
exports.Question = (0, mongoose_1.model)('Question', questionSchema);
