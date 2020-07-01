//VARS

var c;
var ctx;
var end;

var bird;

var background = new Image();
background.src = "img/background.png";

var avatar = new Image();
avatar.src = "img/bird.png";

var tubeUp = new Image();
tubeUp.src = "img/tubeUp.png";

var tubeDown = new Image();
tubeDown.src = "img/tubeDown.png";

var point = 0;

class Player {

    constructor() {
        this.x = 10;
        this.y = 150;
        this.vy = 0;
        this.g = 0.1;
    }

    show() {
        ctx.drawImage(avatar, this.x, this.y, 50, 50);
    }

    fly() {
        this.vy = -2;
    }

    gravity() {
        this.y += this.vy;
        this.vy += this.g;
    }

}


// TUBES

var tubes = [];

tubes[0] = {
    x: 288,
    y: 0,
};


function gameOver() {
    document.getElementById("over").style.visibility = "visible";
}

function playagain() {
    window.location.reload();
}

function update() {

    ctx.drawImage(background, 0, 0, 400, 420);

    for (var i = 0; i < tubes.length; i++) {
        ctx.drawImage(tubeUp, tubes[i].x, tubes[i].y, 60, 300);
        ctx.drawImage(tubeDown, tubes[i].x, tubes[i].y + 360, 60, 300);
        tubes[i].x--;

        if (tubes[i].x == 100) {
            tubes.push({x: 300, y: Math.floor(Math.random() * 200) - 200})
        }

        //game over phase

        if (bird.x == tubes[i].x - 40 && (bird.y >= tubes[i].y && bird.y <= tubes[i].y + 280)) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

        if (bird.x == tubes[i].x + 10 && (bird.y >= tubes[i].y && bird.y <= tubes[i].y + 280)) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

        if ((bird.y >= tubes[i].y && bird.y <= tubes[i].y + 285) && (bird.x >= tubes[i].x && bird.x <= tubes[i].x + 60)) {
            gameOver();
            clearInterval(end);
            console.log("game over")
        }


        if (bird.x == tubes[i].x - 40 && bird.y >= tubes[i].y + 330) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

        if (bird.x == tubes[i].x + 10 && bird.y >= tubes[i].y + 330) {
            gameOver();
            clearInterval(end);
            console.log("game over");
        }

        if (bird.x == tubes[i].x + 60)
            point++;

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(point.toString(), 10, 30);


    }


    bird.show();
    bird.gravity();

}


function setup() {

    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    bird = new Player();

    document.body.addEventListener("keypress", fly => {
        bird.fly();
        console.log("fly fly fly");
    });

    end = setInterval("update()", 10);
}