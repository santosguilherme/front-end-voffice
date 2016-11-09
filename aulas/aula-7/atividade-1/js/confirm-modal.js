'use strict';

$(function () {
    var modalTemplatePromise = $.ajax({url: 'templates/confirm-modal.html', cache: false});

    modalTemplatePromise.done(function (data) {
    });
    var data =
        '<div class="confirm-modal-container">' +
        '<div class="confirm-modal-content">' +

        '<div class="confirm-modal-body">' +
        '<label>Atenção</label>' +

        '<p class="value"></p>' +
        '</div>' +

        '<div class="confirm-modal-footer">' +
        '<button class="btn btn-default confirm-modal-footer__cancel">Cancelar</button>' +
        '<button class="btn btn-primary confirm-modal-footer__confirm">Confirmar</button>' +
        '</div>' +
        '</div>' +
        '</div>';

    var ConfirmModal = function (text, callback) {
        this.$templateModal = $(data);

        this.$templateModal
            .find('.confirm-modal-footer__confirm').on('click', function () {
                callback();
                $(this).closest('.confirm-modal-container').fadeOut();
            }).end()
            .find('.confirm-modal-footer__cancel').on('click', function () {
                $(this).closest('.confirm-modal-container').fadeOut();
            }).end()
            .find('.confirm-modal-body .value').text(text).end()
            .hide()
            .appendTo('body');
    };

    ConfirmModal.prototype.open = function () {
        this.$templateModal.fadeIn();
    };

    ConfirmModal.prototype.close = function () {
        this.$templateModal.fadeOut();
    };

    $.fn.confirmButton = function (text, callback) {
        this.each(function () {
            var confirmModal = new ConfirmModal(text, callback);

            $(this).on('click', function () {
                confirmModal.open();
            }).data('confirm', confirmModal);
        });

    };
});