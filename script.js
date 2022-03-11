const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let currentLevel = 0;
let sprites = World.build(Levels.getLevel(currentLevel));



const controller = new Controller();
/*
setInterval(() => {

    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const sprite of sprites) {
        
        sprite.draw(context);
        if (sprite.isPlayer) {
            let player = sprite;
            for (const wall of sprites) {
                if (!wall.isPlayer) {
                    checkCollision(player, wall);
                }
            }
        }
        sprite.update(canvas, controller);
    }
}, 50);

function checkCollision(player, wall) {

    const collidingX = player.x < (wall.x + wall.w) && (player.x + player.w) > wall.x;
    const collidingY = player.y < (wall.y + wall.h) && (player.y + player.h) > wall.y;
    if (collidingX && collidingY) {
        
        console.log(player.x);
        player.x = Math.round(Math.round(player.x/10)*10);
        player.speedX = player.speedX * 0.9;
        if ((player.x < (wall.x + wall.w) && (player.x + player.w) > wall.x) && (player.y < (wall.y + wall.h) && (player.y + player.h) > wall.y)) {
            player.y = Math.round(Math.round(player.y/10)*10);
            player.speedY = player.speedY * 0.9; 
        }

    
        if (player.speedX > 0 && player.speedY > 0) {
            player.x = player.x - 1;
            player.y = player.y - 1;
        }
        if (player.speedX < 0 && player.speedY < 0) {
            player.x = player.x + 1;
            player.y = player.y + 1;
        }
        if (player.speedX > 0 && player.speedY < 0) {
            player.x = player.x - 1;
            player.y = player.y + 1;
        }
        if (player.speedX < 0 && player.speedY > 0) {
            player.x = player.x + 1;
            player.y = player.y - 1;
        }*/
        /*if (player.speedX > 0) {
            player.x = player.x - 2;
            player.speedX = player.speedX * 0.05;
            console.log("destra");
        } else if (player.speedX < 0) {
            player.x = player.x + 2;
            player.speedX = player.speedX * 0.05;
            console.log("sinistra");
        }
        if (player.speedY < 0) {
            player.y = player.y + 2;
            player.speedY =  player.speedY * 0.05;
            console.log("sopra");
        } else if (player.speedY > 0) {
            player.y = player.y - 2;
            player.speedY = player.speedY * 0.05;
            console.log("sotto");
        }

    }
}*/


const bu = setInterval(() => {


    context.clearRect(0, 0, canvas.width, canvas.height);
    
        for (const sprite of sprites) {
        
        if (sprite.isWinner) {
            currentLevel++;
            sprite.isWinner = false;
            sprites = World.build(Levels.getLevel(currentLevel));
        }
        if (sprite.isLoser) {
            perso();
        }
        CollisionDetector.checkCollisions(sprite, sprites);
        sprite.draw(context);
        sprite.update(canvas, controller);

        }
  
}, 30);

  function perso() {
    sprites = [];
    canvas.style.border = "none"
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.body.style.backgroundImage = "url('./you-died.png')";
    document.body.style.backgroundSize = "cover";
    setTimeout(() => {
        window.location.reload();

    }, 4000);      
  }
