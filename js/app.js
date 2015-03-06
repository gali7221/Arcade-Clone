var STARTPOS = { // starting position for character
    x: 200,
    y: 400
};

var NUMBUGS = 5; //max number of bugs

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// Found on:
// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

var getRandomInt = function(min, max) { //Random int
    return Math.floor(Math.random()*(max-min)) + min;
};


// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = -10 - getRandomInt(10,500); //playing with numbers
    this.y = 74 * getRandomInt(1,4); //playing with numbers
    this.sprite = 'images/enemy-bug.png';
    this.width = Resources.get(this.sprite).width;
    this.height = Resources.get(this.sprite).height;
    this.speed = Math.floor(Math.random()*(121)+100); //playing with numbers
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < ctx.canvas.width) { //if x is within canvas
        this.x += (this.speed * dt); //required by engine.js. moves enemy on the x-axis
    }
    else if (this.x > ctx.canvas.width) { //if x is beyond canvas
        this.x = -10 - getRandomInt(100, 1000); //playing with numbers. starts beyond negative x-axis
        this.y = 80 * getRandomInt(1, 4); //playing with numbers
        this.speed = Math.floor(Math.random()*(121)+100); //playing with numbers.

    }
    /*else if(isCollide(player,this)){
        this.reset();
        //player.reset();

    }*/
};

/*Enemy.prototype.reset = function(){
    this.x = -10 - getRandomInt(100, 1000); //playing with numbers. starts beyond negative x-axis
    this.y = 80 * getRandomInt(1, 4); //
    this.speed = Math.floor(Math.random()*(121)+100); //playing with numbers
}*/

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //rendering function
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = STARTPOS.x; //Starting x-position
    this.y = STARTPOS.y; //Starting y-position
    this.width = Resources.get(this.sprite).width;
    this.height = Resources.get(this.sprite).height;
};

// Update Players position, required method for game
Player.prototype.update = function() {
    //If player is in particular row
    if(this.y < 44 ){ //
        this.x = STARTPOS.x; //begin starting position
        this.y = STARTPOS.y; //begin starting position
        //this.rest();
    }
};

Player.prototype.handleInput = function(str) { //
    switch(true){
        case(str === 'left'):
            if(this.x > 0){ //check if greater than 0
                this.x = this.x - 101; //number got from engine.js
                break;
            }
            else{
                this.x = this.x;
                //break;
            }
            break;
        case(str === 'right'):
            if(this.x + 101 <= 405){
                this.x = this.x + 101; //number from engine.js
                break;
            }
            else{
                this.x = this.x;
                //break;
            }
            break;
        case(str === 'up'):
            if(this.y > 0){
                this.y = this.y - 83; //number from engine.js
                break;
            }
            else{
                this.y = this.y;
                //break;
            }
            break;
        case(str === 'down'):
            if(this.y < 400){
                this.y = this.y + 83;
                break;
            }
            else{
                this.y = this.y;
                //break;
            }
            break;
    }
};



Player.prototype.render = function() { //render Player sprite
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player;
var allEnemies = [];
function gameStart(){ //to acces width and height, created a function for instantiation. Added to engine.js
    for(var e=0; e<NUMBUGS;e++){
        allEnemies.push(new Enemy());
    }
    player = new Player();
}


// This listens for key presses and sends the keys to your
// Selector.handleInput() and Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

/*  Collision Function.
    Collision function that was played with forever.
 */
function checkCollisions() {
       allEnemies.forEach(function(en) { //iterator en
           if ( ((player.x - 50) < en.x) && (en.x < (player.x + 50 ))){
               if ( ((player.y - 50) < en.y) && (en.y < (player.y + 50 ))){
                   player.x = STARTPOS.x;
                   player.y = STARTPOS.y;
               }
           }
       });
   }


// function found on:
// http://stackoverflow.com/questions/2440377/javascript-collision-detection
/*function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
}*/
