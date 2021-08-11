export class Graph {
    constructor(edges) {
        this.edges = edges;
        this.adjacencyList = new Object();
        for (let edge of edges) {
            this._addEdge(edge);
        }
    }
    _addEdge(edge) {
        if (this.adjacencyList.hasOwnProperty(edge.startNode)) {
            this.adjacencyList[edge.startNode].push(edge.endNode);
        } else {
            this.adjacencyList[edge.startNode] = [edge.endNode];
        }
    }
    draw (ctx) {
        for (const edge of this.edges){
            edge.draw(ctx);
            edge.startNode.draw(ctx);
            edge.endNode.draw(ctx);
        }
    }    
    
}
