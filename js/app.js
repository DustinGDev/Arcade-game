//bug direction var
let fromRight = "-rotated";

let score = 0;

// Enemies our player must avoid
var Enemy = function(field = 0, index = allEnemies.length) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.y = field * 83 + 68;
    this.index = index;

    //Sets the direction from where the bug will come from
    if (field == 1) {
      bugDirection = fromRight;
      this.x = 500;
      this.movement = -50;
    }
    else {
      bugDirection = "";
      this.x = -100;
      this.movement = 50;
    }


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = `images/enemy-bug${bugDirection}.png`;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.movement*dt;

    //Swaps the old bug with a new one at the end of screen
    if ((this.x > 500 && this.movement == 50) || (this.x < -100 && this.movement == -50) ) {
      allEnemies[this.index] = (new Enemy(randomNumber(0, 2), this.index));
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.y = 400;
    this.x = 200;
  }

  update() {
    //Gets all Enemy positions
    let allEnemyPositions = (() => {
      let positions = [];
      if (Array.isArray(allEnemies)) {
        for (let value of allEnemies) {
          positions.push([value.x, value.y]);
        }
        return positions;
      }
    })()

    //Checks if the player got to the end
    if (this.y == -15){
      this.y = 400;
      this.x = 200;
      score += 1;
      document.querySelector('p').textContent = `Score: ${score}`;
    }

    //Checks if the player ran into an enemy
    for (let value of allEnemyPositions){
      if(value[1] == this.y && this.x < value[0]+80 && this.x > value[0]-80) {
        this.y = 400;
        this.x = 200;
        score = 0;
        document.querySelector('p').textContent = `Score: ${score}`;
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    if (key == 'left' && this.x > 0) {
      this.x += -100;
    }
    else if (key == 'right' && this.x < 400) {
      this.x += 100;
    }
    else if (key == 'up' && this.y > 0) {
      this.y += -83;
    }
    else if (key == 'down' && this.y < 400) {
      this.y += 83;
    }
  }
}

//Function so produce a random number
function randomNumber(min, max) {
  let number = Math.floor((Math.random() * (max + 1)) + min);
  return number;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

//Initial Enemy Spawn function
const initiateEnemies = setInterval(()=> {
  if (allEnemies.length < 4){
    allEnemies.push(new Enemy(randomNumber(0, 2)));
  }
  else {clearInterval(initiateEnemies)}
}, 3000)
allEnemies.push(new Enemy(randomNumber(0, 2)));
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
