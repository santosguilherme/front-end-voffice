'use strict';

$(function () {
    configureSearchButton();
    configureSearchInput();

    function configureSearchButton() {
        $('.user-github-search .btn-search').on('click', function () {
            searchRemoteData();
        });
    }

    function configureSearchInput() {
        $('.user-github-search__form input:text').on('keypress', function (event) {
            if (event.keyCode !== 13) {
                return;
            }
            event.preventDefault();
            searchRemoteData();
        });
    }

    function getSearchText() {
        return $('.user-github-search__form input:text').val();
    }

    function searchRemoteData() {
        var userName = getSearchText();

        if (!userName) {
            $('.user-github-details').hide('slow');
            $('.search-not-found').hide('slow');

            return;
        }

        findGithubUser(userName,
            function (data, jqXHR) {
                configureViewWithSuccessResponse(data);
            },
            function (jqXHR, textStatus, exception) {
                jqXHR.status === 404 && userName && configureViewWithErrorResponse(userName);
            },
            function (jqXHR, textStatus) {
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

    function configureViewWithSuccessResponse(response) {
        configurePersonalInfo(response.avatar_url, response.name, response.email, response.blog, response.company);
        configureRepos(response.public_repos, response.followers, response.following);
        configurePersonalBio(response.bio);

        $('.search-not-found').hide('slow');
        $('.user-github-details').show('slow');
    }

    function configurePersonalInfo(imageUrl, name, email, site, company) {
        $('.user-github-details .user-github-details__personal .image').css('background-image', 'url("' + imageUrl + '")');

        $('.user-github-details .user-github-details__personal .info .info__name .value').text(name);

        $('.user-github-details .user-github-details__personal .info .info__email .value').text(email);
        $('.user-github-details .user-github-details__personal .info .info__email')[email ? 'show' : 'hide']();

        $('.user-github-details .user-github-details__personal .info .info__site .value').text(site);
        $('.user-github-details .user-github-details__personal .info .info__site')[site ? 'show' : 'hide']();

        $('.user-github-details .user-github-details__personal .info .info__company .value').text(company);
        $('.user-github-details .user-github-details__personal .info .info__company')[company ? 'show' : 'hide']();

    }

    function configureRepos(repos, followers, followings) {
        $('.user-github-details .user-github-details__repo .user-repos .value').text(repos);
        $('.user-github-details .user-github-details__repo .user-followers .value').text(followers);
        $('.user-github-details .user-github-details__repo .user-following .value').text(followings);
    }

    function configurePersonalBio(bio) {
        !bio && $('.user-github-details__bio').hide();
        bio && $('.user-github-details__bio p').text(bio).show();
    }

    function configureViewWithErrorResponse(userName) {
        $('.search-not-found').html('Nenhum usuário encontrado com o usuário "<em>' + userName + '</em>".').show('slow');
        $('.user-github-details').hide('slow');
    }
})
;