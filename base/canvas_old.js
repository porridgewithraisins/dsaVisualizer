var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var HAS_ALGO_BEGUN = false;

window.addEventListener("resize", () => {
    if (!HAS_ALGO_BEGUN) {
        initGraph();
    }
});

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

class Graph {
    constructor(edges) {
        this.graph = new Object();
        for (let edge of edges) {
            this.addEdge(edge[0], edge[1]);
        }
    }
    addEdge(startNode, endNode) {
        if (this.graph.hasOwnProperty(startNode)) {
            this.graph[startNode].push(endNode);
        } else {
            this.graph[startNode] = [endNode];
        }
    }
}

initGraph();
function initGraph() {
    const nodes = [
        {
            label: "0",
            x: 0.2 * ctx.canvas.width,
            y: 0.4 * ctx.canvas.height,
        },
        {
            label: "1",
            x: 0.3 * ctx.canvas.width,
            y: 0.4 * ctx.canvas.height,
        },
        {
            label: "2",
            x: 0.25 * ctx.canvas.width,
            y: 0.3 * ctx.canvas.height,
        },
        {
            label: "3",
            x: 0.4 * ctx.canvas.width,
            y: 0.3 * ctx.canvas.height,
        },
        {
            label: "4",
            x: 0.5 * ctx.canvas.width,
            y: 0.4 * ctx.canvas.height,
        },
        {
            label: "5",
            x: 0.6 * ctx.canvas.width,
            y: 0.4 * ctx.canvas.height,
        },
        {
            label: "6",
            x: 0.55 * ctx.canvas.width,
            y: 0.5 * ctx.canvas.height,
        },
    ];

    const edges = [
        [0, 1],
        [0, 2],
        [1, 2],
        [2, 3],
        [1, 4],
        [4, 6],
        [4, 5],
        [5, 6],
    ];
    generateGraph(nodes, edges);
    animateDFS(nodes, edges, 0);
}

function generateGraph(nodes, edges) {
    for (const edge of edges) {
        const start = nodes[edge[0]];
        const end = nodes[edge[1]];
        drawEdge(start.x, start.y, end.x, end.y);
        drawNode(start);
        drawNode(end);
    }
}

function drawNode(Node, visited = false) {
    ctx.beginPath();
    ctx.lineWidth = 0.01;
    ctx.arc(Node.x, Node.y, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#2E3440";
    ctx.fill();
    ctx.font = "17pt Calibri";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = visited ? "red" : "#ECEFF4";
    ctx.fillText(Node.label, Node.x, Node.y);
    ctx.closePath();
}

function drawEdge(x1, y1, x2, y2, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.fillStyle = color;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
function animateDFS(nodes, edges, startNode) {
    const path = dfsPath(edges, startNode);
    for (let i = 0; i < path.length - 1; i++){
        const startNodeIdx = path[i];
        const endNodeIdx = path[i + 1];
        const startNode = nodes[startNodeIdx];
        const endNode = nodes[endNodeIdx];
        drawNode(startNode, true);
        const doAfter = () => drawNode(endNode, true);
        animateVisit(startNode, endNode, 0, doAfter);
    }
}

function animateVisit(startNode, endNode, progress = 0, callback) {
    // update
    progress += 0.1;
    if (progress === 100) {
        callback();
    } else {
        drawVisit(startNode, endNode, progress);
        requestAnimationFrame(() => animateVisit(startNode, endNode, progress));
    }
}

function drawVisit(startNode, endNode, progress) {
    //sanity
    if (!startNode || !endNode || progress > 100) {
        return;
    }
    const [x1, y1] = [startNode.x, startNode.y];
    const [x2, y2] = [endNode.x, endNode.y];

    let progressPercent;
    if (progress < 25) {
        progressPercent = progress / 24;
    } else if (progress < 50) {
        progressPercent = (progress - 25) / 24;
    } else if (progress < 75) {
        progressPercent = (progress - 50) / 24;
    } else {
        progressPercent = (progress - 75) / 24;
    }
    const [currX, currY] = posAtPercent(x1, y1, x2, y2, progressPercent);

    drawVisitor(currX, currY);
    function posAtPercent(x1, y1, x2, y2, percent) {
        return [x1 + (x2 - x1) * percent, y1 + (y2 - y1) * percent];
    }

    function drawVisitor(x, y) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }
}

function dfsPath(edges, startNode) {
    const g = new Graph(edges);
    const path = [];
    dfs(startNode);
    return path;

    function dfs(u) {
        path.push(u);
        const neighbors = g.graph[u] ? g.graph[u] : [];
        for (const v of neighbors) {
            if (!path.includes(v)) {
                dfs(v);
            }
        }
    }
}
