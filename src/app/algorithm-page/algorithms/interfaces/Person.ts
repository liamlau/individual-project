import { Agent } from "./Agent";

export interface Person extends Agent {
    
    match: Array<Person>;
    ranking: Array<Person>;
    lastProposed: Person;
}