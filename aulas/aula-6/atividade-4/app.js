'use strict';

$(function () {
    configureSearchButton();

    function configureSearchButton() {
        $('.user-github-search .btn-search').on('click', function (event) {
            findGithubUser('',
                function (data, jqXHR) {
                    console.log(data);
                },
                function (jqXHR, textStatus, exception) {
                },
                function (jqXHR, textStatus) {
                })
        });
    }

    function findGithubUser(userName, successCallback, errorCallback, completeCallback) {
        var url = "https://api.github.com/users/" + (userName || 'santosguilherme');

        $.ajax({
            url: url,
            type: 'GET',
            async: true,
            dataType: 'json',
            success: successCallback,
            error: errorCallback,
            complete: completeCallback
        });
    }
});