const score = document.querySelector(".score");
const startscreen = document.querySelector(".startscreen");
const gamearea = document.querySelector(".gamearea");

let player = { speed: 5, score: 0 };
let color = ['green', 'pink', 'blue'];
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;

}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;

}

function movelines() {
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = `${item.y}px`;


    })
}
function collide(a, b) {
    let apos = a.getBoundingClientRect();
    let bpos = b.getBoundingClientRect();

    return !((apos.top > bpos.bottom) || (apos.bottom < bpos.top) || (apos.left > bpos.right) || (apos.right < bpos.left))




}
function endgame() {
    player.start = false;
    startscreen.classList.remove('hide');
    startscreen.innerHTML = `Your score is${player.score} <br> Click to restart`
    score.classList.add('hide');

}

function moveenemy(car) {
    let enemy = document.querySelectorAll(".enemy");

    enemy.forEach(function (item) {
        if (collide(car, item)) {
            console.log("COLLIDED");
            endgame();
        }
        if (item.y >= 750) {
            item.y = -200;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += 8;
        item.style.top = `${item.y}px`;


    })
}


function gameplay() {

    if (player.start) {
        let car = document.querySelector('.car');
        let road = gamearea.getBoundingClientRect();
        // Gives dimension x y height width etc;

        score.classList.remove('hide');
        movelines();
        moveenemy(car);





        if (keys.ArrowUp && player.y > (0 + 100)) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < road.height - 70) { player.y += 2; }
        if (keys.ArrowRight && player.x < road.width - 50) { player.x += player.speed; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }


        car.style.top = ` ${player.y}px`;
        car.style.left = ` ${player.x}px`;


        window.requestAnimationFrame(gameplay);
        player.score++;

        score.innerHTML = "Score is:" + player.score;
    }


}

startscreen.addEventListener('click', start)

function start() {

    startscreen.classList.add('hide');
    gamearea.innerHTML = "";


    player.start = true;
    player.score = 0;
    for (x = 0; x < 5; x++) {
        let roadlines = document.createElement('div');
        roadlines.setAttribute('class', 'lines');
        roadlines.y = x * 150;
        roadlines.style.top = `${roadlines.y}px`;
        gamearea.append(roadlines);
    }


    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gamearea.append(car);



    player.x = car.offsetLeft;
    // Displacement of car from left
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class', 'enemy');
        enemycar.y = ((x + 1) * 350) * -1;
        enemycar.style.top = `${enemycar.y}px`;

        enemycar.style.left = Math.floor(Math.random() * 350) + "px";
        gamearea.append(enemycar);
    }
    window.requestAnimationFrame(gameplay);
}