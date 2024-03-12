import { ProjectionType } from 'mongoose';
import { IUser, User } from '../models/User';
import UserDTO from '../DTO/UserDTO';

export default class UserDAO {
    static async findUserWithGivenEmail(
        email: string,
        projection?: ProjectionType<IUser>
    ) {
        const userWithGivenEmail = await User.findOne(
            {
                email,
            },
            projection
        );

        return userWithGivenEmail;
    }

    static async createUser(userDTO: UserDTO) {
        // Create a new user document
        const user = new User({
            firstname: userDTO.firstname,
            lastname: userDTO.lastname,
            email: userDTO.email,
            password: userDTO.password,
        });

        // Save user to the database
        await user.save();

        return user;
    }
}
