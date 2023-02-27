import { Agent } from "./Agent";
import { Lecturer } from "./Lecturer";
import { Student } from "./Student";

export interface Project extends Agent {
    match: Array<Student>;
    capacity: number;
}