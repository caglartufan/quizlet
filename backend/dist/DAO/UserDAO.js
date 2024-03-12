"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
class UserDAO {
    static async findUserWithGivenEmail(email, projection) {
        projection = projection ?? {
            _id: 0,
            email: 1,
        };
        const userWithGivenEmail = await User_1.User.findOne({
            email,
        }, projection);
        return userWithGivenEmail;
    }
    static async createUser(userDTO) {
        // Create a new user document
        const user = new User_1.User({
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
exports.default = UserDAO;
