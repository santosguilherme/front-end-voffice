'use strict';

$(function () {
    configureSearchButton();
    configureSearchInput();
    configureClearSearchButton();

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
            $('.user-github-search .clear-search a').hide();
            return;
        }

        $.loadingOverlay.start();

        var templatesPromise = getTemplateRepositoryPromise();
        var userPromise = findGithubUser(userName);
        var userReposPromise = findGithubRepos(userName);

        $.when(templatesPromise, userPromise, userReposPromise)
            .done(function (templates, user, userRepos) {
                configureViewWithSuccessResponse(templates[0], user[0], userRepos[0]);
            })
            .fail(function (jqXHR, textStatus, exception) {
                jqXHR.status === 404 && userName && configureViewWithErrorResponse(userName);
            })
            .always(function () {
                $.loadingOverlay.stop();
            });
    }

    function getTemplateRepositoryPromise() {
        return $.ajax({url: 'templates/repo-list-item.html', cache: false});
    }

    function findGithubUser(userName) {
        return $.ajax({
            url: "https://api.github.com/users/" + userName,
            type: 'GET',
            async: true,
            dataType: 'json'
        });
    }

    function findGithubRepos(userName) {
        return $.ajax({
            url: "https://api.github.com/users/" + userName + '/repos',
            type: 'GET',
            async: true,
            dataType: 'json'
        });
    }

    function configureViewWithSuccessResponse(templates, user, userRepos) {
        configurePersonalInfo(user.avatar_url, user.name, user.email, user.blog, user.company);
        configurePersonalBio(user.bio);
        configureStatistics(user.public_repos, user.followers, user.following);
        configureRepositories(templates, userRepos);

        $('.search-not-found').hide('slow');
        $('.user-github-details').show('slow');
        $('.user-github-search .clear-search a').show();
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

    function configureStatistics(repos, followers, followings) {
        $('.user-github-details .user-github-details__statistics .user-repos .value').text(repos);
        $('.user-github-details .user-github-details__statistics .user-followers .value').text(followers);
        $('.user-github-details .user-github-details__statistics .user-following .value').text(followings);
    }

    function configurePersonalBio(bio) {
        !bio && $('.user-github-details__bio').hide();
        bio && $('.user-github-details__bio p').text(bio).show();
    }

    function configureRepositories(template, repositories) {
        var $template = $(template);

        $('.user-github-details__repos .repos-list').empty();

        repositories.forEach(function (repository) {
            $template.clone()
                .find('.repo-info__name').text(repository.name).attr('href', repository.html_url).attr('target', '_blank').end()
                .find('.repo-info__description').text(repository.description).end()
                .find('.repo-info__language .value').text(repository.language).end()
                .find('.repo-info__stars .value').text(repository.stargazers_count).end()
                .find('.repo-info__forks .value').text(repository.forks).end()
                .appendTo('.user-github-details__repos .repos-list');
        });

        $('.user-github-details__repos')[repositories.length ? 'show' : 'hide']();
    }

    function configureViewWithErrorResponse(userName) {
        $('.search-not-found').html('Nenhum resultado encontrado com o usuário "<em>' + userName + '</em>".').show('slow');
        $('.user-github-details').hide('slow');
    }

    function configureClearSearchButton() {
        $('.user-github-search .clear-search a').hide().confirmButton('Deseja mesmo limpar a pesquisa?', function () {
            $('.user-github-search__form input:text').val('').focus();

            $('.user-github-details').hide('slow');
            $('.search-not-found').hide('slow');
            $('.user-github-search .clear-search a').hide();
        });
    }
})
;