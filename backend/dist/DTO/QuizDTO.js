"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class QuizDTO {
    _createdBy;
    _title;
    _description;
    _askedInformation;
    _questions;
    _isPublished;
    get createdBy() {
        return this._createdBy;
    }
    set createdBy(value) {
        this._createdBy = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get askedInformation() {
        return this._askedInformation;
    }
    set askedInformation(value) {
        this._askedInformation = value;
    }
    get questions() {
        return this._questions;
    }
    set questions(value) {
        this._questions = value;
    }
    get isPublished() {
        return this._isPublished;
    }
    set isPublished(value) {
        this._isPublished = value;
    }
    constructor(obj) {
        this._createdBy = obj.createdBy.toString();
        this._title = obj.title;
        this._description = obj.description;
        this._askedInformation = obj.askedInformation;
        // Transform questions: Array<string> | Array<Types.ObjectId> | Array<IQuestion> to transformedQuestions: Array<string> | Array<IQuestion>
        let transformedQuestions;
        const isQuestionsArrayOfObjectIds = obj.questions.length && obj.questions.every(question => question instanceof mongoose_1.Types.ObjectId);
        if (isQuestionsArrayOfObjectIds) {
            transformedQuestions = obj.questions.map(question => question.toString());
        }
        else {
            transformedQuestions = obj.questions;
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
exports.default = QuizDTO;
