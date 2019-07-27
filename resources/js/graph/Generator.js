let Generator = {
    /**
     * Generate random graph
     * .
     * @param numberOfNodes Integer
     * @param numberOfEdges Integer
     * @param simpleGraph Boolean
     * @param directed Boolean
     */
    generateRandomGraph(numberOfNodes, numberOfEdges, simpleGraph = true, directed = false) {
        let nodes = this._generateNodes(numberOfNodes);

        let edges;

        if (simpleGraph) {
            edges = this._generateEdgesForFullGraph(numberOfNodes, directed);
            edges = this._removeEdgesUntilCount(edges, numberOfEdges);
        } else {
            edges = this._range(1, numberOfEdges).map((value) => {
                let from = Math.floor(Math.random() * numberOfNodes) + 1;
                let to = Math.floor(Math.random() * numberOfNodes) + 1;

                return {from: from, to: to}
            });
        }

        if (directed) {
            edges.map((edge) => {
                edge.arrows = 'to';
                return edge;
            });
        }

        this._updateGraph(nodes, edges);
    },

    /**
     * Generate nodes.
     *
     * @param numberOfNodes Integer
     */
    _generateNodes(numberOfNodes) {
        return this._range(1, numberOfNodes).map((value) => {
            return {id: value, label: 'Node ' + value}
        });
    },

    /**
     * Generate edges for full graph.
     *
     * @param numberOfNodes Integer
     * @param directed Boolean
     */
    _generateEdgesForFullGraph(numberOfNodes, directed) {
        let edges = [];

        this._range(1, numberOfNodes)
            .forEach((from) => {
                let range = this._range(1, numberOfNodes);

                if (!directed) {
                    range.splice(0, from);
                }

                range.forEach((to) => {
                    edges.push({
                        from: from,
                        to: to
                    })
                })
            });

        return edges
    },

    /**
     * Create range (array containing all the numbers from-to the given parameters).
     *
     * @param from Integer
     * @param to Integer
     *
     * @returns {Array.<Integer>}
     */
    _range(from, to) {
        return [...Array(to - from + 1).keys()]
            .map(value => value + from)
    },

    /**
     * Deletes random elements of an array until the give count is reached.
     *
     * @param edges Array.<Object>
     * @param numberOfEdges Integer
     *
     * @returns {Array.<Object>}
     */
    _removeEdgesUntilCount(edges, numberOfEdges) {

        while (edges.length > numberOfEdges) {
            let index = Math.floor(Math.random() * (edges.length - 1));
            edges.splice(index, 1);
        }

        return edges;
    }
};

export default Generator;
