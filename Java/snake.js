const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuración del juego
const tileSize = 32;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

const FPS = 15; // FPS controlado aquí
const frameInterval = 1500 / FPS;

const images = {
    apple: './assets/apple.png',
    background: './assets/end_empty.png',
    head: {
        up: './assets/head_up.png',
        down: './assets/head_down.png',
        left: './assets/head_left.png',
        right: './assets/head_right.png'
    },
    tail: {
        up: './assets/tail_up.png',
        down: './assets/tail_down.png',
        left: './assets/tail_left.png',
        right: './assets/tail_right.png'
    },
    body: {
        horizontal: './assets/body_horizontal.png',
        vertical: './assets/body_vertical.png',
        topright: './assets/body_bottomleft.png',
        topleft: './assets/body_bottomright.png',
        bottomright: './assets/body_topleft.png',
        bottomleft: './assets/body_topright.png'
    }
};

let snake = [
    { x: 5, y: 5, direction: 'right' },
    { x: 4, y: 5, direction: 'right' }
];
let apple = { x: 10, y: 10 };
let direction = 'right';
let gameOver = false;

const appleImg = loadImage(images.apple);
const backgroundImg = loadImage(images.background);
let backgroundPattern;

backgroundImg.onload = () => {
    backgroundPattern = ctx.createPattern(backgroundImg, 'repeat');
};

const headImgs = {
    up: loadImage(images.head.up),
    down: loadImage(images.head.down),
    left: loadImage(images.head.left),
    right: loadImage(images.head.right)
};
const tailImgs = {
    up: loadImage(images.tail.up),
    down: loadImage(images.tail.down),
    left: loadImage(images.tail.left),
    right: loadImage(images.tail.right)
};
const bodyImgs = {
    horizontal: loadImage(images.body.horizontal),
    vertical: loadImage(images.body.vertical),
    topright: loadImage(images.body.topright),
    topleft: loadImage(images.body.topleft),
    bottomright: loadImage(images.body.bottomright),
    bottomleft: loadImage(images.body.bottomleft)
};

document.addEventListener('keydown', (event) => {
    const keyMap = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
    };
    const newDirection = keyMap[event.key];
    if (newDirection && isValidDirection(newDirection)) {
        direction = newDirection;
    }
});

function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

function isValidDirection(newDirection) {
    const opposites = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
    };
    return opposites[direction] !== newDirection;
}

function drawTile(image, x, y) {
    ctx.drawImage(image, x * tileSize, y * tileSize, tileSize, tileSize);
}

function getSegmentDirection(from, to) {
    if (to.x > from.x) return 'right';
    if (to.x < from.x) return 'left';
    if (to.y > from.y) return 'down';
    if (to.y < from.y) return 'up';
}

function getBodyType(prev, current, next) {
    if (prev.x === next.x) return 'vertical';
    if (prev.y === next.y) return 'horizontal';
    if (prev.x < current.x && next.y < current.y || next.x < current.x && prev.y < current.y) return 'bottomright';
    if (prev.x > current.x && next.y < current.y || next.x > current.x && prev.y < current.y) return 'bottomleft';
    if (prev.x < current.x && next.y > current.y || next.x < current.x && prev.y > current.y) return 'topright';
    if (prev.x > current.x && next.y > current.y || next.x > current.x && prev.y > current.y) return 'topleft';
}

function drawBackground() {
    if (backgroundPattern) {
        ctx.fillStyle = backgroundPattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function drawGame() {
    drawBackground();

    ctx.clearRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
    snake.forEach(segment => {
        ctx.clearRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    drawTile(appleImg, apple.x, apple.y);

    // Dibujar la serpiente
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        if (i === 0) {
            // Dibujar la cabeza
            drawTile(headImgs[direction], segment.x, segment.y);
        } else if (i === snake.length - 1) {
            // Dibujar la cola
            const tailDirection = getSegmentDirection(snake[i - 1], segment);
            drawTile(tailImgs[tailDirection], segment.x, segment.y);
        } else {
            // Dibujar el cuerpo
            const prev = snake[i - 1];
            const next = snake[i + 1];
            const bodyType = getBodyType(prev, segment, next);
            drawTile(bodyImgs[bodyType], segment.x, segment.y);
        }
    }
}

function checkCollision(x, y) {
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
            return true;
        }
    }
    return false;
}

function updateGame() {
    if (gameOver) return;

    const head = { ...snake[0] };
    switch (direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }

    // Verificar colisiones
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || checkCollision(head.x, head.y)) {
        gameOver = true;
        drawGameOver();
        return;
    }

    // Mover la serpiente
    snake.unshift(head);

    // Comer la manzana
    if (head.x === apple.x && head.y === apple.y) {
        apple = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    } else {
        snake.pop();
    }

    drawGame();
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('¡Juego Terminado!', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '24px Arial';
    ctx.fillText('Presiona F5 para reiniciar', canvas.width / 2, canvas.height / 2 + 20);
}

// Función del ciclo principal de actualización
function gameLoop() {
    updateGame();
    setTimeout(gameLoop, frameInterval);
}

gameLoop(); // Iniciar el ciclo de juego
