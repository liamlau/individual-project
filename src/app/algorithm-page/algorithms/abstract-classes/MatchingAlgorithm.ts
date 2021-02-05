import { Agent } from "../interfaces/Agent";
import { AlgorithmData } from "../interfaces/AlgorithmData";
import { Step } from "../interfaces/Step";

export abstract class MatchingAlgorithm {

    numberOfAgents: number;
    numberOfGroup2Agents: number;

    group1Name: string;
    group2Name: string;

    freeAgentsOfGroup1: Array<String>;

    group1Agents: Map<String, Agent> = new Map();
    group2Agents: Map<String, Agent> = new Map();

    algorithmData: AlgorithmData = {
        commands: new Array(),
        descriptions: new Array()
    };

    currentLine: Array<string> = [];

    group1CurrentPreferences: Map<String, Array<String>> = new Map();
    group2CurrentPreferences: Map<String, Array<String>> = new Map();
    currentlySelectedAgents: Array<string> = [];
    currentLines: Array<Array<string>> = [];

    algorithmSpecificData: Object = {};

    relevantPreferences: Array<string> = [];

    constructor() { }

    initialise(numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents) {
        this.freeAgentsOfGroup1 = [];
        // command list initialisation
        this.numberOfAgents = numberOfAgents;
        this.numberOfGroup2Agents = numberOfGroup2Agents;
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

        for (let i = 1; i < this.numberOfAgents + 1; i++) {
            let agentName: string = this.group1Name + i;
            let agent: Agent = this.group1Agents.get(agentName);

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

    getLastCharacter(name: string) {
        return name.slice(name.length - 1);
    }

    checkArrayEquality(a: Array<string>, b: Array<string>) {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) { return false; }
        }
        return true;
      }

    removeArrayFromArray(a: Array<Array<string>>, b: Array<string>) {
        let arrayPositionCounter: number = 0;
        for (let subArray of a) {
          if (this.checkArrayEquality(subArray, b)) {
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

        // console.log(preferenceList);
        // console.log(person);
        // console.log(position);

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


    abstract match(): AlgorithmData;

    run(numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents): AlgorithmData {
        if (numberOfGroup2Agents != numberOfAgents) {
            this.initialise(numberOfAgents, numberOfGroup2Agents);
        } else {
            this.initialise(numberOfAgents);
        }
        
        this.generateAgents();
        this.generatePreferences();

        this.group1CurrentPreferences = this.getGroupRankings(this.group1Agents);
        this.group2CurrentPreferences = this.getGroupRankings(this.group2Agents);

        // console.log("Group 1 Preferences: %o", this.group1CurrentPreferences);
        // console.log("Group 2 Preferences: %o", this.group2CurrentPreferences);

        this.match();
        // this.getMatches();

        return this.algorithmData;

    }

}