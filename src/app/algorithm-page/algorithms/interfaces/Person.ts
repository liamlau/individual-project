import { Agent } from "./Agent";

export interface Person extends Agent {
    lastProposed: Agent;
}