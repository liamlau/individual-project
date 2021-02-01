export interface Step {
    lineNumber: number;
    freeAgents: Array<String>;
    matches: Map<String, String>;
    stepVariables: Object;
    group1CurrentPreferences: Array<string>;
    group2CurrentPreferences: Array<string>;
    currentlySelectedAgents: Array<string>;
    currentLines: Array<Array<string>>;
}