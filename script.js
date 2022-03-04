const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const sprites = World.build(Levels.getLevel(1));

const controller = new Controller();

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
}, 30);

function checkCollision(player, wall) {

    const collidingX = player.x < (wall.x + wall.w) && (player.x + player.w) > wall.x;
    const collidingY = player.y < (wall.y + wall.h) && (player.y + player.h) > wall.y;
    if (collidingX && collidingY) {
        if (player.x < wall.x + wall.w) {
            //player.x = player.x + 0.1;
            console.log("collisione sinistra");
        };
        if (player.y - player.h > wall.y){
            //player.y = player.y - 0.1;
            console.log("collisione sotto");
        };
        if (player.x + player.w > wall.x) {
            //player.x = player.x - 0.1;
            console.log("collisione destra");
        };
        if (player.y < wall.y - wall.h){
            //player.y = player.y + 0.1;
            console.log("collisione sopra");
        };
    }
}