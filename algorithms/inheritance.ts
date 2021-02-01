import { Agent } from "./agents/Agent";
import { Hospital } from "./agents/Hospital";
import { Man } from "./agents/Man";
import { AlgorithmData } from "./AlgorithmData";
import { Step } from "./Step";

abstract class MatchingAlgorithm {

    numberOfAgents: number;
    numberOfGroup2Agents: number;

    group1Name: string;
    group2Name: string;

    freeAgentsOfGroup1: Array<String>;

    group1Agents: Map<String, Agent> = new Map();
    group2Agents: Map<String, Agent> = new Map();

    algorithmData: AlgorithmData = {
        agentGroup1: new Map(),
        agentGroup2: new Map(),
        commands: new Array(),
        descriptions: new Array()
    };


    group1CurrentPreferences: Array<string> = [];
    group2CurrentPreferences: Array<string> = [];
    currentlySelectedAgents: Array<string> = [];
    currentLines: Array<Array<string>> = [];

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

        for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
            let group2AgentName = this.group2Name + i;

            this.group2Agents.set(group2AgentName, {
                name: group2AgentName,
                match: new Array(),
                ranking: new Array()
            });
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
                preferenceList.push(match.name);
            }

            matches.set(agent.name, preferenceList);

        }

        return matches;

    }


    update(step: number, stepVariables?: Object): void {
        let currentStep: Step = {
            lineNumber: step,
            freeAgents: Object.assign([], this.freeAgentsOfGroup1),
            matches: new Map(),
            stepVariables: stepVariables,
            group1CurrentPreferences: JSON.parse(JSON.stringify(this.group1CurrentPreferences)),
            group2CurrentPreferences: JSON.parse(JSON.stringify(this.group2CurrentPreferences)),
            currentlySelectedAgents: JSON.parse(JSON.stringify(this.currentlySelectedAgents)),
            currentLines: JSON.parse(JSON.stringify(this.currentLines)),
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


    abstract match(): AlgorithmData;

    generateMatches(numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents) {
        if (numberOfGroup2Agents != numberOfAgents) {
            this.initialise(numberOfAgents, numberOfGroup2Agents);
        } else {
            this.initialise(numberOfAgents);
        }
        
        this.generateAgents();
        this.generatePreferences();

        this.match();
        this.getMatches();

    }

}

abstract class GaleShapley extends MatchingAlgorithm {

    constructor() {
        super();
    }

    abstract match(): AlgorithmData;

}


class GsStableMarraige extends GaleShapley {

    group1Name = "men";
    group2Name = "women";

    group1Agents: Map<String, Man> = new Map();


    generateAgents() {
        for (let i = 1; i < this.numberOfAgents + 1; i++) {
            let group1AgentName = this.group1Name + i;

            this.group1Agents.set(group1AgentName, {
                name: group1AgentName,
                match: new Array(),
                ranking: new Array(),
                lastProposed: 0
            });

            this.freeAgentsOfGroup1.push(group1AgentName);

        }

        for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
            let group2AgentName = this.group2Name + i;

            this.group2Agents.set(group2AgentName, {
                name: group2AgentName,
                match: new Array(),
                ranking: new Array()
            });
        }
    }


    match(): AlgorithmData {
        this.update(1);
    
        // console.log("\n\nAlgorithm Steps:");
    
        // 2: while some man m is free do
        while (this.freeAgentsOfGroup1.length > 0) {
          
            let man: Man = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
            this.update(2, {"%man%": man.name});
            // console.log("-------");

            // 3: w = most preferred woman on m’s list to which he has not yet proposed;
            let woman: Agent = man.ranking[man.lastProposed];
            this.update(3, {"%woman%": woman.name, "%man%": man.name});

            // console.log("Man: " + man["name"]);
            // console.log("Woman: " + woman["name"]);

            man.lastProposed += 1;
            // man["ranking"].shift();
            this.update(4, {"%woman%": woman.name});

            if (woman.match.length <= 0) {
                // console.log(woman["name"] + " was free, so matching her with " + man["name"]);
                woman.match.splice(0, 1);
                woman.match.push(man);
                this.freeAgentsOfGroup1.shift();
                this.update(5, {"%woman%": woman.name, "%man%": man.name});
            } else {
                this.update(6, {"%woman%": woman.name, "%man%": man.name, "%match%": woman.match[0].name})
                let manName = man.name;
                // console.log("Index of current match (" + woman["match"]["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])));
                // console.log("Index of man (" + man["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName)) );
                this.update(7, {"%woman%": woman.name, "%man%": man.name, "%match%": woman.match[0].name})

                if (woman.ranking.findIndex(((man: { name: string; }) => man.name == woman.match[0].name)) > woman.ranking.findIndex(((man: { name: string; }) => man.name == manName))) {
                    // console.log(woman["name"] + " prefers " + man["name"] + " (current match) to " + woman["match"]["name"] + " (" + woman["match"]["name"] + " is free, " + man["name"] + " engaged to " + woman["name"] + ")");
                    let match: string = woman.match[0].name;

                    this.freeAgentsOfGroup1.push(match);
                    woman.match[0] = man;
                    this.freeAgentsOfGroup1.shift();
                    this.update(8, {"%woman%": woman.name, "%man%": man.name, "%match%": match})
                } else {
                    this.update(9, {"%woman%": woman.name, "%man%": man.name, "%match%": woman.match[0].name})

                    // console.log(woman["name"] + " prefers " + woman["match"]["name"] + " to " + man["name"] + " (no change)");
                    this.update(10);

                }
            }
        }
    
        // let matches = this.generateMatches();
    
        this.update(11);
    
        // // console.log(this.men);
    
        // this.generateChanges();
    
        // console.log("------- COMMAND LIST")
        // console.log(this.commandList);
    
        // console.log("------- MATCHES")
        // console.log(this.generateMatches());
        // console.log(this.men);
        // console.log(this.women);

        for (let woman of Array.from(this.group2Agents.values())) {
            woman.match[0].match[0] = woman;
        }
    
        return;
    }

}


abstract class ExtendedGaleShapley extends MatchingAlgorithm {

    match(): AlgorithmData {

        // assign each resident to be free;
        this.update(1);

        while (this.freeAgentsOfGroup1.length > 0) {

            // while (some hospital h is undersubscribed) and (h's preference list contains a resident r not provisionally assigned to h) {
            let currentAgent = this.group1Agents.get(this.freeAgentsOfGroup1[0]);

            // if all potential proposees are gone, remove 
            if (currentAgent.ranking.length <= 0 || !this.getNextPotentialProposee(currentAgent)) {
                this.freeAgentsOfGroup1.shift();
            } else {

                this.update(2, {"%currentAgent%": currentAgent.name});

                // r := first such resident on h's list;
                this.update(3);
                let potentialProposee: Agent = this.getNextPotentialProposee(currentAgent);

                // if h is fully subscribed, then break the assignment of the worst resident of that hospital
                this.breakAssignment(currentAgent, potentialProposee);
        
                this.provisionallyAssign(currentAgent, potentialProposee);
        
                this.removeRuledOutPreferences(currentAgent, potentialProposee);
        
                if (this.shouldContinueMatching(currentAgent)) {
                    this.freeAgentsOfGroup1.shift();
                }
            }
        }

        // a stable matching has been found
        this.update(12);

        // while some hospital h is undersubscribed
        // while (this.shouldContinueMatching(currentAgent)) {
        //     let potentialProposee: Agent = currentAgent.ranking[0];
            
        //     currentAgent = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
        // }

        // console.log(this.algorithmData.commands);
        return;
        // return "Extended Gale-Shapley!";
    }


    abstract getNextPotentialProposee(currentAgent: Agent): Agent;

    abstract shouldContinueMatching(currentAgent: Agent): boolean;

    abstract provisionallyAssign(currentAgent: Agent, potentialProposee: Agent): void;

    abstract removeRuledOutPreferences(currentAgent: Agent, potentialProposee: Agent): void;

    abstract breakAssignment(currentAgent: Agent, potentialProposee: Agent): void;

}


abstract class EgsManyToOne extends ExtendedGaleShapley {
    provisionallyAssign(currentAgent: Agent, potentialProposee: Agent) {
        // provisionally assign r to h;
        this.update(7);
        potentialProposee.match[0] = currentAgent;
        currentAgent.match.push(potentialProposee);
    }

    removeRuledOutPreferences(currentAgent: Agent, potentialProposee: Agent) {
        let currentAgentPosition: number = potentialProposee.ranking.findIndex((agent: { name: string }) => agent.name == currentAgent.name);
            
        // for each successor h' of h on r's list {
        this.update(8);
        for (let i = currentAgentPosition + 1; i < potentialProposee.ranking.length; i++) {

            let proposeePosition: number = potentialProposee.ranking[i].ranking.findIndex((agent: { name: string }) => agent.name == potentialProposee.name);
            potentialProposee.ranking[i].ranking.splice(proposeePosition, 1);

            // remove h' and r from each other's lists
            this.update(9);

            potentialProposee.ranking.splice(i, 1);
            i -= 1;
        }
    }

    breakAssignment(currentAgent: Agent, potentialProposee: Agent) {
        // if r is already assigned, say to h' {
        this.update(4);
        if (potentialProposee.match.length >= 1) {
            // break the provisional assignment of r to h'
            this.update(5);
            let matchPosition: number = potentialProposee.match[0].match.findIndex((agent: { name: string }) => agent.name == potentialProposee.name);
            if (potentialProposee.match[0].ranking.filter(agent => agent.match[0] != currentAgent).length > 0 && !this.freeAgentsOfGroup1.includes(potentialProposee.match[0].name)) {
                this.freeAgentsOfGroup1.push(potentialProposee.match[0].name);
            }
            potentialProposee.match[0].match.splice(matchPosition, 1);
        } else {
            // } (r is not currently assigned)
            this.update(6);
        }
    }

}


class EgsStableMarriage extends EgsManyToOne {

    group1Name = "men";
    group2Name = "women";

    shouldContinueMatching(currentAgent: Agent): boolean {
        return true;
    }

    getNextPotentialProposee(currentAgent: Agent): Agent {
        return currentAgent.ranking[0];
    }

}

class EgsHospitalResidents extends EgsManyToOne {

    group1Name = "hospitals";
    group2Name = "residents";

    group1Agents: Map<String, Hospital> = new Map();


    generateAgents() {
        for (let i = 1; i < this.numberOfAgents + 1; i++) {
            let group1AgentName = this.group1Name + i;

                this.group1Agents.set(group1AgentName, {
                name: group1AgentName,
                match: new Array(),
                ranking: new Array(),
                availableSpaces: this.getRandomInt(1, this.numberOfGroup2Agents-2)
            });

            this.freeAgentsOfGroup1.push(group1AgentName);

        }

        for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
            let group2AgentName = this.group2Name + i;

            this.group2Agents.set(group2AgentName, {
                name: group2AgentName,
                match: new Array(),
                ranking: new Array()
            });
        }
    }


    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    shouldContinueMatching(currentAgent: Hospital): boolean {
        let residentList: Array<Agent> = currentAgent.ranking.filter(agent => agent.match[0] != currentAgent);

        return (currentAgent.match.length >= currentAgent.availableSpaces || residentList.length == 0);
    }

    getNextPotentialProposee(currentAgent: Hospital): Agent {
        if (currentAgent) {
            let residentList: Array<Agent> = currentAgent.ranking.filter(agent => agent.match[0] != currentAgent);
            return residentList[0];
        } else {
            return null;
        }
    }


}



class EgsResidentsHospital extends ExtendedGaleShapley {

    group1Name = "residents";
    group2Name = "hospitals";

    group2Agents: Map<String, Hospital> = new Map();


    generateAgents() {
        for (let i = 1; i < this.numberOfAgents + 1; i++) {
            let group1AgentName = this.group1Name + i;

            this.group1Agents.set(group1AgentName, {
                name: group1AgentName,
                match: new Array(),
                ranking: new Array(),
            });

            this.freeAgentsOfGroup1.push(group1AgentName);

        }

        for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
            let group2AgentName = this.group2Name + i;

            this.group2Agents.set(group2AgentName, {
                name: group2AgentName,
                match: new Array(),
                ranking: new Array(),
                availableSpaces: this.getRandomInt(1, this.numberOfGroup2Agents-2)
            });
        }
    }


    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    getWorstResident(hospital: Hospital): Agent {

        let positionMap: Map<number, Agent> = new Map();

        for (let resident of hospital.match) {
            positionMap.set(this.findPositionInMatches(hospital, resident), resident);
        }

        // use destructuring assingment to extract data from array into distinct variables
        // return the worst resident from the hospital's matches
        return positionMap.get(Math.max(...Array.from(positionMap.keys())));
    }


    getNextPotentialProposee(hospital: Hospital): Agent {
        // return first hospital on r's list
        return hospital.ranking[0];
    }

    breakAssignment(resident: Agent, hospital: Hospital): void {
        if (hospital.match.length >= hospital.availableSpaces) {
            let worstResident = this.getWorstResident(hospital);
            let matchPosition = this.findPositionInMatches(hospital, worstResident);
            worstResident.match.splice(0, 1);
            hospital.match.splice(matchPosition, 1);
        }
    }

    provisionallyAssign(resident: Agent, hospital: Hospital) {
        // provisionally assign r to h;
        this.update(8);
        resident.match[0] = hospital;
        hospital.match.push(resident);
    }

    removeRuledOutPreferences(resident: Agent, hospital: Hospital): void {
        if (hospital.match.length >= hospital.availableSpaces) {
            let worstResident: Agent = this.getWorstResident(hospital);
            let worstResidentPosition: number = this.findPositionInMatches(hospital, worstResident);

        // for each successor h' of h on r's list {
            this.update(9);
            for (let i = worstResidentPosition + 1; i < hospital.ranking.length; i++) {

                let hospitalPosition: number = this.findPositionInMatches(worstResident, hospital);

                hospital.ranking[i].ranking.splice(hospitalPosition, 1);
    
                // remove h' and r from each other's lists
                this.update(10);
    
                hospital.ranking.splice(i, 1);
                i -= 1;
            }

        }

    }


    shouldContinueMatching(hospital: Hospital): boolean {
        // let residentList: Array<Agent> = hospital.ranking.filter(agent => agent.match[0] != hospital);

        // return (hospital.match.length >= hospital.availableSpaces || residentList.length == 0);
        return true;
    }



}


// ------------------------------------------------

console.log("Program start!");

let gs: GaleShapley = new GsStableMarraige();
let egs: GaleShapley = new EgsStableMarriage();
let hegs: GaleShapley = new EgsHospitalResidents();
let regs: GaleShapley = new EgsResidentsHospital();

gs.generateMatches(5);
egs.generateMatches(5);
hegs.generateMatches(5, 10);
regs.generateMatches(5, 5);

console.log("----");

console.log("matches:");

// console.log(gs.getGroupRankings(gs.group1Agents));
// console.log(gs.getGroupRankings(gs.group2Agents));

// console.log(gs.group1Agents);
// console.log(gs.group2Agents);

console.log("----");

console.log(gs.getMatches());
console.log(egs.getMatches());
console.log(hegs.getMatches());
console.log(regs.getMatches());

// console.log(gs.group1Agents);
// console.log(gs.group2Agents);

console.log("----");

// console.log(egs.group2);
// console.log(egs.match());

console.log("Program end!");