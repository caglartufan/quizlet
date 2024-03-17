"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Quiz_1 = require("../models/Quiz");
class QuizDAO {
    static async createQuiz(quizDTO) {
        const quiz = new Quiz_1.Quiz({
            createdBy: quizDTO.createdBy,
            title: quizDTO.title,
            description: quizDTO.description,
            askedInformation: quizDTO.askedInformation
        });
        await quiz.save();
        return quiz;
    }
}
exports.default = QuizDAO;
