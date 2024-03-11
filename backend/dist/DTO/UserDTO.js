"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    _firstname;
    _lastname;
    _username;
    _email;
    _password;
    _activeToken;
    _countryCode;
    _avatar;
    static withUserDocument(user) {
        return new UserDTO(user.firstname, user.lastname, user.username, user.email, user.password, user.activeToken, user.countryCode, user.avatar);
    }
    get firstname() {
        return this._firstname;
    }
    set firstname(value) {
        this._firstname = value;
    }
    get lastname() {
        return this._lastname;
    }
    set lastname(value) {
        this._lastname = value;
    }
    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get activeToken() {
        return this._activeToken;
    }
    set activeToken(value) {
        this._activeToken = value;
    }
    get countryCode() {
        return this._countryCode;
    }
    set countryCode(value) {
        this._countryCode = value;
    }
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = value;
    }
    constructor(firstname, lastname, username, email, password, activeToken, countryCode, avatar) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._username = username;
        this._email = email;
        this._password = password;
        this._activeToken = activeToken;
        this._countryCode = countryCode;
        this._avatar = avatar;
    }
    toObject() {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            email: this.email,
            password: this.password,
            activeToken: this.activeToken,
            countryCode: this.countryCode,
            avatar: this.avatar
        };
    }
}
exports.default = UserDTO;
