import { Graph } from "../../base/graph.js";
import { Edge } from "../../base/edge.js";
import { Visit, Visitor } from "../../base/visit.js";
import { generateEdges, fullDFSPath } from "./utils.js";

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

const Edges = generateEdges();
const g = new Graph(Edges);

function init() {
    g.draw(ctx);
}

// window.addEventListener("resize", () => {
//     ctx.canvas.width = window.innerWidth;
//     ctx.canvas.height = window.innerHeight;
//     init();
// });

window.onload = init;

const path = fullDFSPath(g, Edges[0].startNode);

const visitor = new Visitor(path[0].node.x, path[0].node.y);

for (let i = 0; i < path.length - 1; i++) {
    const start = path[i].node;
    const end = path[i + 1].node;
    const edgeToAnimateVisit = new Edge(start, end);

    const visitType = path[i + 1].type;
    const visit = new Visit(edgeToAnimateVisit, visitor, 0.5, visitType);

    start.textColor = "red";
    start.draw(ctx);
    start.textColor = "black";

    await visit.animate(ctx);
    
    start.textColor = "red";
    start.draw(ctx);
    start.textColor = "black";

    end.textColor = "red";
    end.draw(ctx);
    end.textColor = "black";
}