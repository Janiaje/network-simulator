import Simulation from "./Simulation";
import SimulationStep from "./SimulationStep";
import Graph from "./Graph";
import Generator from "./Generator";

let Simulator = {

    /**
     * Giant component simulation.
     */
    getGiantComponentSimulation() {
        let firstStep = new SimulationStep(this, new Graph(), false);

        let nextStepCalculationLambda = (currentStep) => {
            let graph = currentStep.graph;

            let randomEdge = Generator.randomEdge(graph);
            let changesGraph = new Graph([], randomEdge);

            if (randomEdge === undefined) {
                return null;
            }

            graph.edges.push(randomEdge);

            return new SimulationStep(graph, changesGraph);
        };

        return new Simulation(firstStep, nextStepCalculationLambda);
    }

};

export default Simulator;
