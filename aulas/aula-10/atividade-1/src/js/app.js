'use strict';

$(function () {
    var authControl = new AuthControl();

    var $btnLogin = $('#btn-login');
    var $btnLogout = $('<button class="btn btn-lg btn-danger btn-block" type="button">Logout</button>').on('click', logout).appendTo('.form-signin').hide();

    var $successMessage = $('<div class="alert alert-success" role="alert"> <strong>Ola!</strong> Login realizado com sucesso. </div>').appendTo('.form-signin').hide();
    var $failMessage = $('<div class="alert alert-danger" role="alert"> <strong>Ops!</strong> Usuário ou senha incorretos! </div>').appendTo('.form-signin').hide();

    $('.form-signin').on('submit', function (event) {
        var userName = $('#inputUser').val();
        var password = $('#inputPassword').val();

        var token = authControl.authenticate(userName, password);

        if (token) {
            login(userName, token);
            return false;
        }

        loginFail();
        return false;
    });

    function login(userName, token) {
        $btnLogin.hide();
        $btnLogout.show();

        $failMessage.hide();
        $successMessage.show();

        window.sessionStorage.setItem(userName, token);
    }

    function logout() {
        $failMessage.hide();
        $successMessage.hide();

        $btnLogout.hide();
        $btnLogin.show();


        $('#inputUser').val('');
        $('#inputPassword').val('');

        window.sessionStorage.clear();
    }

    function loginFail() {
        $successMessage.hide();
        $failMessage.show();
    }
});