import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";

export abstract class StableRoomMates extends MatchingAlgorithm {

    constructor() {
        super();
    }

    abstract match(): AlgorithmData;

}