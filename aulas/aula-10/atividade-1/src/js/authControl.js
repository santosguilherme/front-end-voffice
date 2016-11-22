'use strict';

function AuthControl() {
    this.usersMap = createUsersMap();
}

AuthControl.prototype.authenticate = function (userName, password) {
    var isAuthenticate = userName && password && this.usersMap[userName] && this.usersMap[userName] === password;

    if (isAuthenticate) {
        var token = getToken(userName);
        saveTokenLocalStroage(userName, token);

        return token;
    }
};

function createUsersMap() {
    return {'admin': 'admin'};
}

function getToken(userName) {
    var storagedToken = window.localStorage.getItem(userName);

    return storagedToken ? storagedToken : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function saveTokenLocalStroage(userName, token) {
    var localStorage = window.localStorage;

    localStorage && localStorage.setItem(userName, token);
}