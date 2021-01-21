export interface Step {
    lineNumber: number;
    freeAgents: Array<String>;
    matches: Map<String, String>;
    stepVariables: Object;
    changeTrace: Object;
}