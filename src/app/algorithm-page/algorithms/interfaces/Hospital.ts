import { Agent } from "./Agent";

export interface Hospital extends Agent {
    availableSpaces: number;
}