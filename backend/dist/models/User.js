"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
// TODO: Add validation messages
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        maxlength: 50,
        required: true,
    },
    lastname: {
        type: String,
        maxlength: 50,
        required: true,
    },
    username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        match: /[a-zA-Z0-9]{3,20}/,
        unique: true,
        required: true,
        immutable: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                const { error } = joi_1.default.string().email().validate(value);
                return typeof error === 'undefined';
            },
            message: 'E-mail address is not valid.'
        },
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true,
    },
    activeToken: {
        type: String,
    },
    countryCode: {
        type: String,
        validate: {
            validator: function (value) {
                return value.length === 2;
            },
            message: 'Country is not valid.',
        },
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
