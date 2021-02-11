import { Agent } from "./agents/Agent";
import { Step } from "./Step";

export interface AlgorithmData {
    commands: Array<Step>;
    descriptions: Array<String>;
}