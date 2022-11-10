import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";

export abstract class StableRoomMates extends MatchingAlgorithm {

    constructor() {
        super();
        console.log("StableRoomMates Class");
    }

    abstract match(): AlgorithmData;

}