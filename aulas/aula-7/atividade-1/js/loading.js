'use strict';

$(function () {
    var LoadingOverlay = function () {
        this.template = $('<div class="carregando"></div>');

        this.template.hide().appendTo('body');
    };

    LoadingOverlay.prototype.start = function () {
        this.template.show();
    };

    LoadingOverlay.prototype.stop = function () {
        this.template.hide();
    };

    $.loadingOverlay = new LoadingOverlay();
});