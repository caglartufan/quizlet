"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuiz = void 0;
const ErrorHandler_1 = __importDefault(require("../../utils/ErrorHandler"));
const QuizDTO_1 = __importDefault(require("../../DTO/QuizDTO"));
const createQuiz = async (req, res, next) => {
    const services = req.app.get('services');
    let quizDTO = new QuizDTO_1.default({
        createdBy: res.locals.user._id,
        title: req.body.title,
        description: req.body.description,
        askedInformation: req.body.askedInformation,
        questions: [],
        isPublished: false
    });
    try {
        const quiz = await services.quizService.createQuiz(quizDTO);
        quizDTO = new QuizDTO_1.default(quiz);
        res.status(201).json({
            ok: true,
            quiz: quizDTO.toObject()
        });
    }
    catch (err) {
        next(ErrorHandler_1.default.handle(err));
    }
};
exports.createQuiz = createQuiz;
