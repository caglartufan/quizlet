export default class UserService {
    private static instance: UserService;

    static getInstance() {
        if(!this.instance) {
            this.instance = new UserService();
        }

        return this.instance;
    }

    private constructor() {}
}
