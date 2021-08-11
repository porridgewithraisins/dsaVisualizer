import { Node, Edge } from "../../base/edge.js";

export function fullDFSPath(graph, startNode) {
    const adj = graph.adjacencyList;
    if (!adj.hasOwnProperty(startNode)) {
        return;
    }
    const path = [];
    const visited = new Set();
    _dfs(startNode, null);
    function _dfs(u, parent) {
        if (visited.has(u)) return;
        visited.add(u);
        path.push({ type: "normal", node: u });
        const neighbors = adj[u] ? adj[u] : [];
        for (const v of neighbors) {
            _dfs(v, u);
        }
        if (parent !== null) path.push({ type: "backtrack", node: parent });
    }
    return path;
}

export function generateEdges() {
    const Nodes = [
        new Node(0, 0.2 * canvas.width, 0.4 * canvas.height),
        new Node(1, 0.3 * canvas.width, 0.4 * canvas.height),
        new Node(2, 0.25 * canvas.width, 0.3 * canvas.height),
        new Node(3, 0.4 * canvas.width, 0.3 * canvas.height),
        new Node(4, 0.5 * canvas.width, 0.4 * canvas.height),
        new Node(5, 0.6 * canvas.width, 0.4 * canvas.height),
        new Node(6, 0.55 * canvas.width, 0.5 * canvas.height),
    ];
    const Edges = [
        new Edge(Nodes[0], Nodes[1]),
        new Edge(Nodes[0], Nodes[2]),
        new Edge(Nodes[1], Nodes[2]),
        new Edge(Nodes[2], Nodes[3]),
        new Edge(Nodes[1], Nodes[4]),
        new Edge(Nodes[4], Nodes[6]),
        new Edge(Nodes[4], Nodes[5]),
        new Edge(Nodes[5], Nodes[6]),
    ];
    return Edges;
}
