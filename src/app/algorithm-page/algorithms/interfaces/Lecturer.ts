import { Agent } from "./Agent";
import { Student } from "./Student";

export interface Lecturer extends Agent {
    ranking: Array<Student>;
    projects: Array<String>;
    capacity: number;
}