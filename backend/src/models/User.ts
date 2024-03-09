import { Schema, model } from 'mongoose';
import Joi from 'joi';
import UserDTO from '../DTO/UserDTO';
import FIELDS from '../messages/fields';

const userSchema = new Schema<UserDTO>(
    {
        firstname: {
            type: String,
            required: [true, FIELDS.firstname['any.required']],
            maxlength: [50, FIELDS.firstname['string.max']],
        },
        lastname: {
            type: String,
            required: [true, FIELDS.lastname['any.required']],
            maxlength: [50, FIELDS.lastname['string.max']],
        },
        username: {
            type: String,
            unique: true,
            immutable: true,
            required: [true, FIELDS.username['any.required']],
            minlength: [3, FIELDS.username['string.min']],
            maxlength: [20, FIELDS.username['string.max']],
            validate: {
                validator: function (value: string) {
                    const { error } = Joi.string().alphanum().validate(value);

                    return typeof error === 'undefined';
                },
                message: FIELDS.username['string.alphanum'],
            },
        },
        email: {
            type: String,
            unique: true,
            required: [true, FIELDS.email['any.required']],
            validate: {
                validator: function (value: string) {
                    const { error } = Joi.string().email().validate(value);

                    return typeof error === 'undefined';
                },
                message: FIELDS.email['string.email'],
            },
        },
        password: {
            type: String,
            required: [true, FIELDS.password['any.required']],
            minlength: [5, FIELDS.password['string.min']],
            maxlength: [1024, FIELDS.password['string.max']],
        },
        activeToken: {
            type: String,
        },
        countryCode: {
            type: String,
            validate: {
                validator: function (value: string) {
                    return value.length === 2;
                },
                message: FIELDS.countryCode['string.pattern.base'],
            },
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const User = model<UserDTO>('User', userSchema);
