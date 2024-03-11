"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
class UserDAO {
    static async findUsersWithGivenUsernameOrEmail(username, email, projection) {
        projection = projection ?? {
            _id: 0,
            username: 1,
            email: 1,
        };
        const usersWithGivenUsernameOrEmail = await User_1.User.find({
            $or: [
                {
                    username,
                },
                {
                    email,
                },
            ],
        }, projection);
        return usersWithGivenUsernameOrEmail;
    }
    static async createUser(userDTO) {
        // Create a new user document
        const user = new User_1.User({
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
exports.default = UserDAO;
