import QuizDTO from '../DTO/QuizDTO';
import { Quiz } from '../models/Quiz';

export default class QuizDAO {
    static async createQuiz(quizDTO: QuizDTO) {
        const quiz = new Quiz({
            createdBy: quizDTO.createdBy,
            title: quizDTO.title,
            description: quizDTO.description,
            askedInformation: quizDTO.askedInformation
        });

        await quiz.save();

        return quiz;
    }
}
