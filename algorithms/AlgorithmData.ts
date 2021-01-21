import { Agent } from "./agents/Agent";
import { Step } from "./Step";

export interface AlgorithmData {
    agentGroup1: Map<Number, Agent>;
    agentGroup2: Map<Number, Agent>;
    commands: Array<Step>;
    descriptions: Array<String>;
}