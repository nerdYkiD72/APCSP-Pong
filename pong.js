let paddleHeight = 20;
let paddleWidth = 100;

const WINDOW_HEIGHT = 400;
const WINDOW_WIDTH = 400;
const PADDLE_Y = 375;


let x = getRndInteger(50, WINDOW_WIDTH - 50);
let y = getRndInteger(50, PADDLE_Y - 50);;
let xspeed = 5;
let yspeed = 2;
let r = 25;
let score = 0;
let gameOver = false;
let debug = false;
let bouncedOffPaddle = false;
let scoreList = [];



function setup() {
    var canvas = createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');
    background(220);

    if (getRndInteger(1, 10) <= 5) {
        xspeed *= -1;
    }
    if (getRndInteger(1, 10) <= 5) {
        yspeed *= -1;
    }
}

function draw() {
    colorMode(RGB);
    background(114, 166, 165);

    // Get cords to draw the paddle and keep the mouse centered.
    // Also make sure to keep the paddle inside the play area.

    let paddleX = mouseX;
    if (mouseX < 55) {
        paddleX = 55;
    } else if (mouseX >= (WINDOW_WIDTH - 55)) {
        paddleX = WINDOW_WIDTH - 55;
    }

    // Draw the rectangle
    fill(201, 52, 52);
    rect(paddleX - (paddleWidth / 2),
        PADDLE_Y,
        paddleWidth,
        paddleHeight);



    padLeftX = paddleX - (paddleWidth / 2);
    padRightX = paddleX + (paddleWidth / 2);

    // Debug lines for collisions.
    if (debug) {
        line(padLeftX, 10, padLeftX, WINDOW_HEIGHT);
        line(padRightX, 10, padRightX, WINDOW_HEIGHT);
        line(x, 10, x, WINDOW_HEIGHT);
        line(10, y, WINDOW_WIDTH - 10, y);
    }

    // -- Ball Logic --

    // First check if game is over.
    // Everything after will only run if the game is still going.
    if (gameOver) return gameOverHandle();

    drawTextCenter(score, 20, 100, 75);

    fill(222, 210, 42);
    ellipse(x, y, r * 2, r * 2);
    x += xspeed;
    y += yspeed;
    if (x > width - r || x < r) {
        xspeed = -xspeed;
    }
    // If the ball has gotten above the paddle then it can be ready to bounce off the paddle again:
    if (bouncedOffPaddle && y + r < PADDLE_Y) bouncedOffPaddle = false;

    if (y + r > PADDLE_Y || y < r) {
        if (y < r) {
            yspeed = -yspeed;
        } else {
            // Check to see if the ball is on the paddle 
            // by checking if the balls X is within the paddle.
            // Only do this if the ball is bouncing off the bottom y limit not the top
            if (x >= padLeftX && x <= padRightX) {
                if (!bouncedOffPaddle) {
                    yspeed = -yspeed;

                    // The ball bounced off the paddle so add 1 point to the score.
                    score++;
                    bouncedOffPaddle = true;

                    if (score == 69) console.log("Nice"); // nice
                }
            }
        }
    }
    if (y > PADDLE_Y) {
        gameOver = true;
    }
}

let keysPressed = [];
let keyDown = false;

function keyReleased() {
    console.log(keyCode);
}


function gameOverHandle() {
    drawTextCenter("Game Over!", 40, WINDOW_HEIGHT / 2, 100);
    drawTextCenter(`Score: ${score}pts`, 30, WINDOW_WIDTH / 2, 130);

    // Show the restart button
    document.getElementById('restart-button').classList.remove("is-hidden");
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * Draws text with center alignment to the given cords with the given size.
 * @param {String} txt The string value to draw.
 * @param {Number} size Font size.
 * @param {Number} x X coordinate.
 * @param {Number} y Y coordinate.
 */
function drawTextCenter(txt, size, x, y) {
    fill(0, 0, 0);
    textAlign(CENTER); // Centeres the text over the given coordinate 
    textSize(size);
    text(txt, x, y);
}

function restart() {
    x = getRndInteger(50, WINDOW_WIDTH - 50);
    y = getRndInteger(50, PADDLE_Y - 50);;
    xspeed = 5;
    yspeed = 2;
    scoreList.push(score);
    scoreList.sort();
    scoreList.reverse();
    // Add the contents of options[0] to #foo:
    document.getElementById('high-scores').innerHTML = ""
    document.getElementById('high-scores').appendChild(makeUL(scoreList));

    score = 0;

    // Remove the restart button
    document.getElementById('restart-button').classList.add("is-hidden");

    gameOver = false;
}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

