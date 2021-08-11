export class Visitor {
    constructor(x, y, color = "blue") {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }
    update(x, y, color = this.color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

export class Visit {
    constructor(edge, visitor, speed, type = "normal") {
        this.edge = edge;

        this.initialX = this.currX = edge.startNode.x;
        this.initialY = this.currY = edge.startNode.y;
        this.targetX = edge.endNode.x;
        this.targetY = edge.endNode.y;

        this.visitor = visitor;
        this.speed = speed;
        this.progress = 0;

        this.type = type;
    }


    draw(ctx) {
        if (this.type !== "normal") {
            this.visitor.color = "grey";
        }
        ctx;
    }
    update() {
        this.progress += this.speed;
        this.currX += ((this.targetX - this.initialX) * this.speed) / 100;
        this.currY += ((this.targetY - this.initialY) * this.speed) / 100;
    }
    animate(ctx) {
        return new Promise((resolve) => {
            const step = () => {
                this.draw(ctx);
                this.visitor.draw(ctx);
                this.update();
                this.visitor.update(this.currX, this.currY);
                if (this.progress < 100) {
                    window.requestAnimationFrame(step);
                } else {
                    resolve();
                }
            };
            window.requestAnimationFrame(step);
        });
    }
}
