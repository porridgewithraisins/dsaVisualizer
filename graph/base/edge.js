export class Node {
    constructor(label, x, y, radius = 20, color = "black", textColor = "white") {
        this.radius = radius;
        this.label = label;
        this.x = x;
        this.y = y;
        this.color = color;
        this.textColor = textColor;
    }

    draw(ctx, visited = true) {
        ctx.beginPath();
        ctx.lineWidth = 0.01;
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();

        //write the label
        ctx.font = "17pt Calibri";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.label, this.x, this.y);

        ctx.closePath();
    }
    update(color, textColor){
        this.color = color;
        this.textColor = textColor;
    }
}

export class Edge {
    constructor(startNode, endNode, color = "black") {
        this.startNode = startNode;
        this.endNode = endNode;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.fillStyle = this.color;
        ctx.moveTo(this.startNode.x, this.startNode.y);
        ctx.lineTo(this.endNode.x, this.endNode.y);
        ctx.stroke();
        ctx.closePath();
    }

    update(color){
        this.color = color;
    }
}
