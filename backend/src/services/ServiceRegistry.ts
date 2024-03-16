import UserService from './UserService';

export default class ServiceRegistry {
    private static instance: ServiceRegistry;
    userService: UserService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ServiceRegistry();
        }

        return this.instance;
    }

    private constructor() {
        this.userService = UserService.getInstance();
    }
}