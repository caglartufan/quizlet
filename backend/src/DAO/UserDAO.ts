import { ProjectionType } from 'mongoose';
import { IUser, User } from '../models/User';
import UserDTO from '../DTO/UserDTO';

export default class UserDAO {
    static async findUsersWithGivenUsernameOrEmail(
        username: string,
        email: string,
        projection?: ProjectionType<IUser>
    ) {
        projection = projection ?? {
            _id: 0,
            username: 1,
            email: 1,
        };
        const usersWithGivenUsernameOrEmail = await User.find(
            {
                $or: [
                    {
                        username,
                    },
                    {
                        email,
                    },
                ],
            },
            projection
        );

        return usersWithGivenUsernameOrEmail;
    }

    static async createUser(userDTO: UserDTO) {
        // Create a new user document
        const user = new User({
            firstname: userDTO.firstname,
            lastname: userDTO.lastname,
            username: userDTO.username,
            email: userDTO.email,
            password: userDTO.password
        });

        // Save user to the database
        await user.save();

        return user;
    }
}
