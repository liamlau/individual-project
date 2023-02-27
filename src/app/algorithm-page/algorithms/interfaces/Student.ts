import { Agent } from "./Agent";
import { Project } from "./Project";

export interface Student extends Agent {
    match: Array<Project>
}