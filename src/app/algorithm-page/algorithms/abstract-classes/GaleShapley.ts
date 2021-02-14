import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";

export abstract class GaleShapley extends MatchingAlgorithm {

    constructor() {
        super();
    }

    abstract match(): AlgorithmData;

}