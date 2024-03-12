export default class UserDTO {
    private _email: string;
    private _firstname?: string;
    private _lastname?: string;
    private _password?: string;
    private _activeToken?: string;
    private _countryCode?: string;
    private _avatar?: string;

    get email() {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get firstname(): string | undefined {
        return this._firstname;
    }

    set firstname(value: string) {
        this._firstname = value;
    }

    get lastname(): string | undefined {
        return this._lastname;
    }

    set lastname(value: string) {
        this._lastname = value;
    }

    get password(): string | undefined {
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
        obj: {
            email: string,
            firstname?: string,
            lastname?: string,
            password?: string,
            activeToken?: string,
            countryCode?: string,
            avatar?: string
        }
    ) {
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
