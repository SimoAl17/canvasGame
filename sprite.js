class RectSprite{
    constructor(x, y, w, h, speedX, speedY, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    update(canvas) {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        if (this.x > canvas.width - this.w || this.x < 0) {
            this.speedX = this.speedX * -1;
        }
        if (this.y > canvas.height - this.h || this.y < 0){
            this.speedY = this.speedY * -1;
        }
    }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}

class CircleSprite{
    constructor(x, y, radius, speedX, speedY, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    update(canvas) {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        if (this.x > canvas.width - this.radius || this.x < this.radius) {
            this.speedX = this.speedX * -1;
        }
        if (this.y > canvas.height - this.radius || this.y < this.radius){
            this.speedY = this.speedY * -1;
        }
    }

    draw(context){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}

class PlayerSprite extends RectSprite {
    constructor(x, y, w, h, speedX, speedY){
        super(x, y, w, h, speedX, speedY, "magenta");
        this.isPlayer = true;
        this.isActive = true;
        this.isSolid = true;
        this.isJumping = false;
        this.startX = x;
        this.startY = y;
        this.isWinner = false;
        this.isLoser = false;
    }

    update(canvas, controller) {
        if (this.isPlayer) {
            if (controller.isUpClicked) {
                if (this.isJumping === false) {
                    this.speedY += -10;
                    this.isJumping = true;     
                }
                
            }
            // if (controller.isDownClicked) {
            //     this.speedY += 0.1; 
            // }
            if (controller.isRightClicked) {
                this.speedX += 0.2; 
            }
            if (controller.isLeftClicked) {
                this.speedX += -0.2; 
            }
        }

        const gravity = Physics.getGravity();
        const friction = Physics.getFriction();

        this.speedX *= friction;
        this.speedY *= friction;

        this.speedX += gravity.x;
        this.speedY += gravity.y;

        super.update(canvas);
    }

    manageCollision(sprite, isHorizontal) {
        if (sprite.isEnemy) {
            this.isLoser = true;
        }
        if (isHorizontal) {
            this.isJumping = false;    
        }
        if (sprite.isExit) {
            this.isWinner = true;
        }

        
    }

        
}

class ExitSprite extends RectSprite {
    constructor(x, y, w, h, speedX, speedY){
        super(x, y, w, h, speedX, speedY, "green");
        this.isExit = true;
        this.isSolid = true;
    }
}

class EnemySprite extends RectSprite {
    constructor(x, y, w, h, speedX, speedY){
        super(x, y, w, h, speedX, speedY, "yellow");
        this.isEnemy = true;
        this.isActive = true;
        this.isSolid = true;
    }

    manageCollision() {
        this.speedX = this.speedX * -1;
        
    }

}

class WaterSprite extends RectSprite{
    constructor(x, y, w, h, speedX, speedY){
        super(x, y, w, h, speedX, speedY, "blue");
        this.isSolid = false;
    }

}