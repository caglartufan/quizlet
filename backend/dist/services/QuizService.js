"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuizDAO_1 = __importDefault(require("../DAO/QuizDAO"));
class QuizService {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new QuizService();
        }
        return this.instance;
    }
    async createQuiz(quizDTO) {
        const quiz = await QuizDAO_1.default.createQuiz(quizDTO);
        return quiz;
    }
    constructor() { }
}
exports.default = QuizService;
