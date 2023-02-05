import { Agent } from "../interfaces/Agent";
import { Person } from '../interfaces/Person';
import { AlgorithmData } from "../interfaces/AlgorithmData";
import { Step } from "../interfaces/Step";

export abstract class MatchingAlgorithm {

    abstract group1Name: string;
    abstract group2Name: string;

    numberOfAgents: number;
    numberOfGroup2Agents: number;

    freeAgentsOfGroup1: Array<String>;

    group1Agents: Map<String, Agent> = new Map();
    group2Agents: Map<String, Agent> = new Map();

    algorithmData: AlgorithmData = {
        commands: new Array(),
        descriptions: new Array()
    };

    SRstable: boolean = true

    currentLine: Array<string> = [];

    originalGroup1CurrentPreferences: Map<String, Array<String>> = new Map();
    originalGroup2CurrentPreferences: Map<String, Array<String>> = new Map();

    group1CurrentPreferences: Map<String, Array<String>> = new Map();
    group2CurrentPreferences: Map<String, Array<String>> = new Map();
    currentlySelectedAgents: Array<string> = [];
    currentLines: Array<Array<string>> = [];

    algorithmSpecificData: Object = {};

    relevantPreferences: Array<string> = [];

    stable: boolean = false;

    constructor() { }

    initialise(numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents) {
        this.freeAgentsOfGroup1 = [];

        this.group1Agents = new Map();
        this.group2Agents = new Map();

        this.algorithmData = {
            commands: new Array(),
            descriptions: new Array()
        };
    
        this.currentLine = [];
    
        this.group1CurrentPreferences = new Map();
        this.group2CurrentPreferences = new Map();
        this.currentlySelectedAgents = [];
        this.currentLines = [];
    
        this.algorithmSpecificData = {};
    
        this.relevantPreferences = [];

        this.numberOfAgents = numberOfAgents;
        this.numberOfGroup2Agents = numberOfGroup2Agents;

        this.stable = false;

        
    }

    generateAgents() {
        for (let i = 1; i < this.numberOfAgents + 1; i++) {
            let group1AgentName = this.group1Name + i;

            this.group1Agents.set(group1AgentName, {
                name: group1AgentName,
                match: new Array(),
                ranking: new Array()
            });

            this.freeAgentsOfGroup1.push(group1AgentName);

        }

        let currentLetter = 'A';

        for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
            let group2AgentName = this.group2Name + currentLetter;

            this.group2Agents.set(group2AgentName, {
                name: group2AgentName,
                match: new Array(),
                ranking: new Array()
            });

            currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);

        }
    }


    // generates rankings for all agents
    // changes agent.ranking
    generatePreferences(): void {
        
        for (let agent of Array.from(this.group1Agents.values())) {
            let agent1Rankings = Array.from((new Map(this.group2Agents)).values());
            this.shuffle(agent1Rankings);
            this.group1Agents.get(agent.name).ranking = agent1Rankings;
        }

        for (let agent of Array.from(this.group2Agents.values())) {
            let agent2Rankings = Array.from((new Map(this.group1Agents)).values());
            this.shuffle(agent2Rankings);
            this.group2Agents.get(agent.name).ranking = agent2Rankings;
        }

    }

    populatePreferences(preferences: Map<String, Array<String>>): void {
        // console.log("preferences", preferences);
        let tempCopyList: Agent[];

        for (let agent of Array.from(this.group1Agents.keys())) {
            tempCopyList = [];
            // this.group1Agents.get(agent).ranking = preferences.get(this.getLastCharacter(String(agent)));
            for (let preferenceAgent of preferences.get(this.getLastCharacter(String(agent)))) {
                tempCopyList.push(this.group2Agents.get(this.group2Name + preferenceAgent));
            }
            this.group1Agents.get(agent).ranking = tempCopyList;
        }

        for (let agent of Array.from(this.group2Agents.keys())) {
            tempCopyList = [];
            // this.group1Agents.get(agent).ranking = preferences.get(this.getLastCharacter(String(agent)));
            for (let preferenceAgent of preferences.get(this.getLastCharacter(String(agent)))) {
                tempCopyList.push(this.group1Agents.get(this.group1Name + preferenceAgent));
            }
            this.group2Agents.get(agent).ranking = tempCopyList;
        }
    
        console.log(this.group1Agents);
        console.log(this.group2Agents);

    }

    // FROM: https://javascript.info/task/shuffle
    shuffle(array: Array<Object>) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      
          // swap elements array[i] and array[j]
          // we use "destructuring assignment" syntax to achieve that
          // you'll find more details about that syntax in later chapters
          // same can be written as:
          // let t = array[i]; array[i] = array[j]; array[j] = t
          [array[i], array[j]] = [array[j], array[i]];
        }
    }


    getGroupRankings(agents: Map<String, Agent>): Map<String, Array<String>> {

        let matches: Map<String, Array<String>> = new Map();

        for (let agent of Array.from(agents.values())) {
            let preferenceList = [];
            for (let match of agent.ranking) {
                preferenceList.push(match.name.slice(match.name.length - 1));
            }

            let identifier: string = agent.name.slice(agent.name.length - 1);
            // console.log()

            matches.set(identifier, preferenceList);

        }

        return matches;

    }


    clone(mapIn: Map<String, Array<String>>): Map<String, Array<String>> {
        let mapCloned: Map<String, Array<String>> = new Map<String, Array<String>>();
    
        mapIn.forEach((str: Array<String>, key: String, mapObj: Map<String, Array<String>>) => {
          
          //products.slice(0) clone array
          mapCloned.set(key, str.slice(0));
        });
    
        return mapCloned;
    }


    update(step: number, stepVariables?: Object): void {
        let currentStep: Step = {
            lineNumber: step,
            freeAgents: Object.assign([], this.freeAgentsOfGroup1),
            matches: new Map(),
            stepVariables: stepVariables,
            group1CurrentPreferences: this.clone(this.group1CurrentPreferences),
            group2CurrentPreferences: this.clone(this.group2CurrentPreferences),
            currentlySelectedAgents: JSON.parse(JSON.stringify(this.currentlySelectedAgents)),
            currentLines: JSON.parse(JSON.stringify(this.currentLines)),
            algorithmSpecificData: JSON.parse(JSON.stringify(this.algorithmSpecificData)),
            relevantPreferences: JSON.parse(JSON.stringify(this.relevantPreferences)),
        }

        this.algorithmData.commands.push(currentStep);

    }


    getMatches(): Map<String, Array<String>> {
        let matches: Map<String, Array<String>> = new Map();

        for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
            let agentName: string = this.group2Name + String.fromCharCode(i + 64);
            let agent: Agent = this.group2Agents.get(agentName);

            let matchList: Array<String> = new Array();

            for (let match of agent.match) {
                matchList.push(match.name);
            }

            matches.set(agent.name, matchList);

        }

        return matches;

    }


    findPositionInMatches(currentAgent: Agent, agentToFind: Agent): number {
        let position: number = currentAgent.ranking.findIndex((agent: { name: string; }) => agent.name == agentToFind.name);
        return position;
    }

    findPositionInOriginalMatches(currentAgent: Agent, agentToFind: Agent) {
        let originalPreferences = this.originalGroup1CurrentPreferences.get(currentAgent.name[currentAgent.name.length - 1]);
        // console.log("Group1", originalPreferences)
        let position: number = originalPreferences.indexOf(agentToFind.name[agentToFind.name.length - 1]);
        return position;
    }

    findPositionInOriginalMatchesGroup2(currentAgent: Agent, agentToFind: Agent) {
        let originalPreferences = this.originalGroup2CurrentPreferences.get(currentAgent.name[currentAgent.name.length - 1]);
        // console.log("Group2", originalPreferences)
        let position: number = originalPreferences.indexOf(agentToFind.name[agentToFind.name.length - 1]);
        return position;
    }

    // findPositionInOriginalMatches(currentAgent: Agent, agentToFind: Agent) {
    //     let originalPreferences = this.originalGroup1CurrentPreferences.get(currentAgent.name[currentAgent.name.length - 1]);
    //     console.log("originalPreferences", originalPreferences)
    //     return 0
    // }

    getLastCharacter(name: string) {
        return name.slice(name.length - 1);
    }

    checkArrayEquality(a: Array<string>, b: Array<string>) {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) { return false; }
        }
        return true;
      }


    // used to remove elements from currentLines
    removeArrayFromArray(a: Array<Array<string>>, b: Array<string>) {
        let arrayPositionCounter: number = 0;
        for (let subArray of a) {
          if (this.checkArrayEquality(subArray, b)) {
            a.splice(arrayPositionCounter, 1);
          }
          arrayPositionCounter++;
        }
      }

      // remove all lines in array that start at person
      removePersonFromArray(a: Array<Array<string>>, person: String) {
        let arrayPositionCounter: number = 0;
        for (let subArray of a) {
            if (subArray[0] == person) {
                a.splice(arrayPositionCounter, 1);
            }
            arrayPositionCounter++;
        }
      }

      // remove all lines leeding to a person from the array
      removeTargetFromArray(a: Array<Array<string>>, person: String) {
        let arrayPositionCounter: number = 0;
        for (let subArray of a) {
            if (subArray[1] == person) {
                a.splice(arrayPositionCounter, 1);
            }
            arrayPositionCounter++;
        }
      }


    // #53D26F (green)
    // #C4C4C4 (grey)
    // changePreferenceStyle(preferenceList: Object, person: string, position: number, style: string) {
    changePreferenceStyle(preferenceList: Map<String, Array<String>>, person: string, position: number, style: string) {

        let currentAgent: string = "";

        // console.log("inner", preferenceList, preferenceList.get(person), preferenceList.get(person)[position], person, position, style)

        if (preferenceList.get(person)[position].includes("#")) {
        currentAgent = preferenceList.get(person)[position].charAt(preferenceList.get(person)[position].length - 2);
        } else {
        currentAgent = preferenceList.get(person)[position].charAt(preferenceList.get(person)[position].length - 1);
        }

        if (style == "green") {
        style = "#53D26F";
        } else if (style == "red") {
        style = "#EB2A2A";
        } else if (style == "grey") {
        style = "#C4C4C4";
        } else if (style == "black") {
        style = "#000000";
        }

        preferenceList.get(person)[position] = "{" + style + currentAgent + "}";

    }


    // check if no unmatched pair like each other more than their current partners
    checkStability(allMatches: Map<String, Array<String>>): boolean {
        let stability = true;

        // for all women
        for (let agent of allMatches.keys()) {
            let agentMatches = allMatches.get(agent);

            // if agent has matches
            if (agentMatches.length > 0) {

                // find the position of the last ranked match (for Stable Marriage this will be the only match)
                let lastAgentPosition = this.getLastMatch(agent, agentMatches);
                let agentPreferences: Array<Agent> = this.group2Agents.get(agent).ranking;

                // for every agent, x, better than match, check:
                //   - if x isn't one of the matches (for HR), then
                //      - check if x likes currentAgent more than their match
                //          - if yes, stability = false
                //          - if no, stability = true
                for (let i = lastAgentPosition - 1; i >= 0; i--) {
                    if (!agentMatches.includes(agentPreferences[i].name)) {
                        let matchPosition = this.findPositionInOriginalMatches(agentPreferences[i], agentPreferences[i].match[0]);
                        let currentAgentPosition = this.findPositionInOriginalMatches(agentPreferences[i], this.group2Agents.get(agent));
                        if (currentAgentPosition < matchPosition) {
                            stability = false;
                        }
                    }
                }
            }
        }
        return stability;
    }

    getLastMatch(currentAgent: String, agentMatches: Array<String>): number {
        let furthestIndex: number = 0;
        for (let matchAgent of agentMatches) {
            let matchPosition = this.findPositionInMatches(this.group2Agents.get(currentAgent), this.group1Agents.get(matchAgent));
            if (matchPosition > furthestIndex) {
                furthestIndex = matchPosition;
            }
        }
        return furthestIndex;
    }


    abstract match(): AlgorithmData;

    run(numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents, preferences: Map<String, Array<String>>, SRstable: boolean = true): AlgorithmData {
        if (numberOfGroup2Agents != numberOfAgents) {
            this.initialise(numberOfAgents, numberOfGroup2Agents);
        } else {
            this.initialise(numberOfAgents);
        }

        if (numberOfGroup2Agents == 0){
            console.log("0 agents in group 2");
        }
                
        if (SRstable) {
            this.SRstable = true
        } else {
            this.SRstable = false
        }

        this.generateAgents();

        if (preferences) {
            this.populatePreferences(preferences);
        } else {
            this.generatePreferences();
        }


       

        this.group1CurrentPreferences = this.getGroupRankings(this.group1Agents);
        this.originalGroup1CurrentPreferences = this.getGroupRankings(this.group1Agents);

        this.group2CurrentPreferences = this.getGroupRankings(this.group2Agents);
        this.originalGroup2CurrentPreferences = this.getGroupRankings(this.group2Agents);

        this.match();

        this.stable = this.checkStability(this.getMatches());

        if (!this.stable) {
            console.log("Matching is not stable!");
            return undefined;
        }

        return this.algorithmData;

    }

    

}