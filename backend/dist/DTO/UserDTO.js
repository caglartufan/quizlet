"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    _email;
    _firstname;
    _lastname;
    _password;
    _activeToken;
    _countryCode;
    _avatar;
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
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
    constructor(obj) {
        this._email = obj.email;
        this._firstname = obj.firstname;
        this._lastname = obj.lastname;
        this._password = obj.password;
        this._activeToken = obj.activeToken;
        this._countryCode = obj.countryCode;
        this._avatar = obj.avatar;
    }
    toObject() {
        return {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password,
            activeToken: this.activeToken,
            countryCode: this.countryCode,
            avatar: this.avatar
        };
    }
}
exports.default = UserDTO;
