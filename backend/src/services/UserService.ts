import UserDTO from '../DTO/UserDTO';
import { User } from '../models/User';

export default class UserService {
    private static instance: UserService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }

        return this.instance;
    }

    async signUpUser(userDTO: UserDTO) {
        const user = new User({
            firstname: userDTO.firstname,
            lastname: userDTO.lastname,
            username: userDTO.username,
            email: userDTO.email,
            password: userDTO.password
        });
        await user.save();

        return user;
    }

    private constructor() {}
}
