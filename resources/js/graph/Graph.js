import vis from 'vis'
import Parser from "./Parser";
import Generator from "./Generator";

class Graph {

    /**
     * @param container HTML element
     * @param options Object
     */
    constructor(container, options = {}) {
        this._options = options;

        this._nodes = new vis.DataSet();
        this._edges = new vis.DataSet();

        this._network = new vis.Network(container, {
            nodes: this._nodes,
            edges: this._edges
        }, this._options);

        // Parser part

        this._exportNodeListFormat = [
            'id',
            'label',
        ];

        this._exportEdgeListFormat = [
            'id',
            'from',
            'to',
        ];
    }

    /**
     * Delete all nodes and edges.
     */
    clearGraph() {
        this._nodes.clear();
        this._edges.clear();
    }

    /**
     * Updates the graph to only show the given nodes and edges.
     *
     * @param nodes Array.<Object>
     * @param edges Array.<Object>
     */
    _updateGraph(nodes, edges) {
        this.clearGraph();

        this._nodes.add(nodes);
        this._edges.add(edges);
    }

    /**
     * Updates the graph's options.
     */
    _updateOptions() {
        this._network.setOptions(this._options);
    }

    /**
     * Turns physics on/off.
     *
     * @param allowed Boolean
     */
    physicsAllowed(allowed) {
        let physics = this._options.physics;

        if (physics === undefined) {
            physics = {};
        }

        physics.enabled = allowed;

        this._options.physics = physics;

        this._updateOptions();
    }
}

// Trait method assigns
Object.assign(Graph.prototype, Parser);
Object.assign(Graph.prototype, Generator);

export default Graph;
