import QuizDAO from '../DAO/QuizDAO';
import QuizDTO from '../DTO/QuizDTO';

export default class QuizService {
    private static instance: QuizService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new QuizService();
        }

        return this.instance;
    }

    async createQuiz(quizDTO: QuizDTO) {
        const quiz = await QuizDAO.createQuiz(quizDTO);

        return quiz;
    }

    private constructor() {}
}
