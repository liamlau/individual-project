export interface GaleShapley {
    lineNumber: number;
    freeMen: Array<string>;
    matches: Object;
    stepVariables: Object;
    changeTrace: Object;
    // preferenceList: Object;
    group1CurrentPreferences: Object,
    group2CurrentPreferences: Object,
    currentlySelectedAgents: Object
}