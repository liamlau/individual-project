export interface Step {
    lineNumber: number;
    freeAgents: Array<String>;
    matches: Map<String, String>;
    stepVariables: Object;
    group1CurrentPreferences: Map<String, Array<String>>;
    group2CurrentPreferences: Map<String, Array<String>>;
    currentlySelectedAgents: Array<string>;
    currentLines: Array<Array<string>>;
}