const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let objects;
let life = 100;
let lifeText;
let timerText;
let timeRemaining = 60;  // Tiempo inicial en segundos
let objectSpawnRate = 1000;  // Milisegundos entre la generación de objetos

function preload() {
    this.load.image('ball', 'path_to_your_ball_image.png');
    this.load.image('object', 'path_to_your_object_image.png');
}

// ... (código previo) ...

function create() {
    ball = this.physics.add.sprite(400, 300, 'ball');
    ball.setCollideWorldBounds(true);

    // Comienza moviendo la bola desde el principio
    ball.setVelocityX(200);

    objects = this.physics.add.group();

    this.time.addEvent({
        delay: objectSpawnRate,
        loop: true,
        callback: dropObject,
        callbackScope: this
    });

    // Muestra la vida en la esquina superior
    lifeText = this.add.text(16, 16, 'Vida: ' + life, { fontSize: '32px', fill: '#fff' });

    // Muestra el tiempo en la esquina superior derecha
    timerText = this.add.text(600, 16, 'Tiempo: ' + timeRemaining, { fontSize: '32px', fill: '#fff' });

    // Configura un temporizador para contar el tiempo
    this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: updateTime,
        callbackScope: this,
        startAt: objectSpawnRate  // Inicia el temporizador con la frecuencia inicial
    });
}

// ... (resto del código) ...


function update() {
    // ... código de movimiento y colisiones ...
}

function dropObject() {
    const x = Phaser.Math.Between(0, 800);
    const object = objects.create(x, 0, 'object');
    object.setGravityY(300);
}

function hitObject(ball, object) {
    object.destroy();
    life -= 10;
    if (life <= 0) {
        life = 0;
        console.log('Game over');
    }
}

function updateTime() {
    timeRemaining--;
    timerText.setText('Tiempo: ' + timeRemaining);

    // Ajusta la velocidad de generación de objetos según el tiempo restante
    objectSpawnRate = Math.max(500, objectSpawnRate - 50);

    // Actualiza la frecuencia de generación de objetos
    game.loop.events[0].delay = objectSpawnRate;

    if (timeRemaining <= 0) {
        console.log('Juego terminado');
        // Detén el juego o haz lo que necesites al finalizar el tiempo
    }
}
