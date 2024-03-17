import QuizService from './QuizService';
import UserService from './UserService';

export default class ServiceRegistry {
    private static instance: ServiceRegistry;
    userService: UserService;
    quizService: QuizService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ServiceRegistry();
        }

        return this.instance;
    }

    private constructor() {
        this.userService = UserService.getInstance();
        this.quizService = QuizService.getInstance();
    }
}