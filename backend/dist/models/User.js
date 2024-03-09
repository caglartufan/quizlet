"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const fields_1 = __importDefault(require("../messages/fields"));
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, fields_1.default.firstname['any.required']],
        maxlength: [50, fields_1.default.firstname['string.max']],
    },
    lastname: {
        type: String,
        required: [true, fields_1.default.lastname['any.required']],
        maxlength: [50, fields_1.default.lastname['string.max']],
    },
    username: {
        type: String,
        unique: true,
        immutable: true,
        required: [true, fields_1.default.username['any.required']],
        minlength: [3, fields_1.default.username['string.min']],
        maxlength: [20, fields_1.default.username['string.max']],
        validate: {
            validator: function (value) {
                const { error } = joi_1.default.string().alphanum().validate(value);
                return typeof error === 'undefined';
            },
            message: fields_1.default.username['string.alphanum'],
        },
    },
    email: {
        type: String,
        unique: true,
        required: [true, fields_1.default.email['any.required']],
        validate: {
            validator: function (value) {
                const { error } = joi_1.default.string().email().validate(value);
                return typeof error === 'undefined';
            },
            message: fields_1.default.email['string.email'],
        },
    },
    password: {
        type: String,
        required: [true, fields_1.default.password['any.required']],
        minlength: [5, fields_1.default.password['string.min']],
        maxlength: [1024, fields_1.default.password['string.max']],
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
            message: fields_1.default.countryCode['string.pattern.base'],
        },
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
