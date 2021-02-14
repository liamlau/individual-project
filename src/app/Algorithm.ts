import { MatchingAlgorithm } from "./algorithm-page/algorithms/abstract-classes/MatchingAlgorithm";

export interface Algorithm {
    id: string;
    name: string;
    orientation: Array<string>;
    algorithm: string;
    service: MatchingAlgorithm;
    description: string;
    helpTextMap: Object; // map<number, string>
}