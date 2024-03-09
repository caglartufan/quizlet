import { IUser } from '../models/User';

export default class UserDTO implements IUser {
    private _firstname: string;
    private _lastname: string;
    private readonly _username: string;
    private _email: string;
    private _password: string;
    private _activeToken?: string;
    private _countryCode?: string;
    private _avatar?: string;

    get firstname() {
        return this._firstname;
    }

    set firstname(value: string) {
        this._firstname = value;
    }

    get lastname() {
        return this._lastname;
    }

    set lastname(value: string) {
        this._lastname = value;
    }

    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get activeToken(): string | undefined {
        return this._activeToken;
    }

    set activeToken(value: string) {
        this._activeToken = value;
    }

    get countryCode(): string | undefined {
        return this._countryCode;
    }

    set countryCode(value: string) {
        this._countryCode = value;
    }

    get avatar(): string | undefined {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
    }

    constructor(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string,
        activeToken?: string,
        countryCode?: string,
        avatar?: string
    ) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._username = username;
        this._email = email;
        this._password = password;
        this._activeToken = activeToken;
        this._countryCode = countryCode;
        this._avatar = avatar;
    }
}
