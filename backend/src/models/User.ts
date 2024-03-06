import { Schema, model } from 'mongoose';
import Joi from 'joi';

interface IUser {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    activeToken?: string;
    countryCode?: string;
    avatar?: string;
}

// TODO: Add validation messages
const userSchema = new Schema<IUser>(
    {
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
                validator: function(value: string) {
                    const { error } = Joi.string().email().validate(value);

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
                validator: function (value: string) {
                    return value.length === 2;
                },
                message: 'Country is not valid.',
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

export const User = model<IUser>('User', userSchema);