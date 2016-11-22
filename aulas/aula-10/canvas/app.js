var canvas = document.querySelector('.meu-canvas');

console.debug(canvas);

var ctx = canvas.getContext('2d');

// TODO - Crie formas: triângulos, retângulos, circulos

//retângulos
ctx.fillStyle = '#e5e5e5';
ctx.fillRect(420, 10, 210, 300);

// TODO - Limpe áreas
ctx.clearRect(450, 40, 150, 240);

//circulos
ctx.beginPath();
ctx.fillStyle = '#e7e7e7';
ctx.arc(525, 155, 50, 0, Math.PI * 2, true); // Outer circle
ctx.fill();

//triângulos
ctx.beginPath();
ctx.fillStyle = '#fff';
ctx.moveTo(525, 125);
ctx.lineTo(550, 175);
ctx.lineTo(500, 175);
ctx.fill();

// TODO - Aplique imagens
var image = document.createElement('img');
image.src = 'http://lorempixel.com/400/300/';

image.addEventListener('load', function () {
    // TODO - Manipule opacidade
    ctx.globalAlpha = 0.15;

    ctx.drawImage(image, 10, 10);
});

// TODO - Experimente alterar as propriedades width e height do canvas
//ctx.canvas.width = 800;
//ctx.canvas.height = 600;