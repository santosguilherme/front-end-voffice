'use strict';

var canvas = document.querySelector('.meu-canvas');
var ct = canvas.getContext('2d');

var AnimatedCircle = function (radius, color, velX, velY) {
    this.draw(radius, color);

    this.radius = radius;

    this.posX = 0;
    this.posY = 0;

    this.velX = velX || Math.random() * 100;
    this.velY = velY || Math.random() * 100;
};

AnimatedCircle.prototype.draw = function (radius, color) {
    // Cria canvas fora da tela
    this.canvas = document.createElement('canvas');
    this.canvas.width = radius * 2;
    this.canvas.height = radius * 2;

    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = color;

    // Desenha no canvas fora da tela
    ctx.arc(radius, radius, radius - 1, 0, Math.PI * 2);
    ctx.fill();
};

AnimatedCircle.prototype.pass = function (interval) {
    this.posX += interval * this.velX;
    this.posY += interval * this.velY;
};


var last = 0;
var balls = [];

for (var index = 0; index < 100; index++) {
    var radius = Math.random() * 20 + 10;

    var animatedCircle = new AnimatedCircle(radius, '#fff');
    animatedCircle.posX = Math.random() * canvas.width - animatedCircle.radius;
    animatedCircle.posY = Math.random() * canvas.height - animatedCircle.radius;

    ct.drawImage(animatedCircle.canvas, animatedCircle.posX - animatedCircle.radius, animatedCircle.posY - animatedCircle.radius);

    balls.push(animatedCircle);
}

function loop(timestamp) {
    var now = timestamp || performance.now();
    var interval = (now - last) / 1000;

    ct.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(function (ball) {
        ball.pass(interval);
        ct.drawImage(animatedCircle.canvas, animatedCircle.posX - animatedCircle.radius, animatedCircle.posY - animatedCircle.radius);

        if ((ball.posX >= canvas.width - 3) || (ball.posX <= 3)) {
            ball.velX *= -1;
        }

        if ((ball.posY >= canvas.height - 3) || (ball.posY <= 3)) {
            ball.velY *= -1;
        }
    });

    last = now;

    requestAnimationFrame(loop);
}

loop();