import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            this._isAuth = true;
            this._user = {
                username: localStorage.getItem('username'),
                userID: localStorage.getItem('userID'),
                roleID: localStorage.getItem('roleID')
            };
        }
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}