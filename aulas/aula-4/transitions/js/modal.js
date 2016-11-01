document.querySelectorAll('.modal-abrir, .modal-fechar').forEach(function (element) {
    element.addEventListener('click', function () {
        document.querySelector('.modal').classList.toggle('aberto');
    })
});