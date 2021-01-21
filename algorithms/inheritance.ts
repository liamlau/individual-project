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

    constructor(numberOfAgents: number, group1: string, group2: string, numberOfGroup2Agents: number = numberOfAgents) {
        this.numberOfAgents = numberOfAgents;
        this.numberOfGroup2Agents = numberOfGroup2Agents;
        this.group1Name = group1;
        this.group2Name = group2;

    }

    initialise() {
        this.freeAgentsOfGroup1 = [];
        // command list initialisation
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
            changeTrace: {}
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


    abstract match(): AlgorithmData;

    generateMatches() {
        this.initialise();
        this.generateAgents();
        this.generatePreferences();
        // console.log(this.getGroupRankings(this.group1Agents));
        // console.log(this.getGroupRankings(this.group2Agents));
        this.match();
        this.getMatches();
        // for (let i = 0; i < 10; i++) {
        //     this.match();
        // }
    }

}

abstract class GaleShapley extends MatchingAlgorithm {

    constructor(numAgents: number, group1: string, group2: string, numberOfGroup2Agents: number = numAgents) {
        super(numAgents, group1, group2, numberOfGroup2Agents);
    }

    abstract match(): AlgorithmData;

}


class GsStableMarraige extends GaleShapley {

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

    constructor(numAgents: number, group1: string, group2: string, numberOfGroup2Agents: number = numAgents) {
        super(numAgents, group1, group2, numberOfGroup2Agents);
    }


    match(): AlgorithmData {

        // assign each resident to be free;
        this.update(1);

        // assign each hospital to be totally unsubscribed;
        this.update(2);

        while (this.freeAgentsOfGroup1.length > 0) {

            // while (some hospital h is undersubscribed) and (h's preference list contains a resident r not provisionally assigned to h) {
            let currentAgent = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
            this.update(3, {"%currentAgent%": currentAgent.name});

            // r := first such resident on h's list;
            this.update(4);
            let potentialProposee: Agent = this.getNextPotentialProposee(currentAgent);

            // if all potential proposees are gone, remove 
            if (currentAgent.ranking.length <= 0 || !potentialProposee) {
                this.freeAgentsOfGroup1.shift();
            } else {

                // if r is already assigned, say to h' {
                this.update(5);
                if (potentialProposee.match.length >= 1) {
                    // break the provisional assignment of r to h'
                    this.update(6);
                    let matchPosition: number = potentialProposee.match[0].match.findIndex((agent: { name: string }) => agent.name == potentialProposee.name);
                    if (potentialProposee.match[0].ranking.filter(agent => agent.match[0] != currentAgent).length > 0 && !this.freeAgentsOfGroup1.includes(potentialProposee.match[0].name)) {
                        this.freeAgentsOfGroup1.push(potentialProposee.match[0].name);
                    }
                    potentialProposee.match[0].match.splice(matchPosition, 1);
                } else {
                    // } (r is not currently assigned)
                    this.update(7);
                }
        
                // provisionally assign r to h;
                this.update(8);
                potentialProposee.match[0] = currentAgent;
                currentAgent.match.push(potentialProposee);
        

                let currentAgentPosition: number = potentialProposee.ranking.findIndex((agent: { name: string }) => agent.name == currentAgent.name);
            
                // for each successor h' of h on r's list {
                this.update(9);
                for (let i = currentAgentPosition + 1; i < potentialProposee.ranking.length; i++) {
        
                    let proposeePosition: number = potentialProposee.ranking[i].ranking.findIndex((agent: { name: string }) => agent.name == potentialProposee.name);
                    potentialProposee.ranking[i].ranking.splice(proposeePosition, 1);
        
                    // remove h' and r from each other's lists
                    this.update(10);

                    potentialProposee.ranking.splice(i, 1);
                    i -= 1;
                }
        
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

    abstract shouldContinueMatching(currentAgent: Agent): boolean;

    abstract getNextPotentialProposee(currentAgent: Agent): Agent;

}


class EgsStableMarriage extends ExtendedGaleShapley {

    shouldContinueMatching(currentAgent: Agent): boolean {
        return true;
    }

    getNextPotentialProposee(currentAgent: Agent): Agent {
        return currentAgent.ranking[0];
    }

}

class EgsHospitalResidents extends ExtendedGaleShapley {

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


// ------------------------------------------------

console.log("Program start!");

let gs: GaleShapley = new GsStableMarraige(5, "man", "woman");
let egs: GaleShapley = new EgsStableMarriage(5, "man", "woman");
let hegs: GaleShapley = new EgsHospitalResidents(5, "hospital", "resident");

gs.generateMatches();
// egs.generateMatches();
// hegs.generateMatches();

console.log("----");

console.log("matches:");

// console.log(gs.getGroupRankings(gs.group1Agents));
// console.log(gs.getGroupRankings(gs.group2Agents));

// console.log(gs.group1Agents);
// console.log(gs.group2Agents);

console.log("----");

console.log(gs.getMatches());
// egs.getMatches();
// hegs.getMatches();

// console.log(gs.group1Agents);
// console.log(gs.group2Agents);

console.log("----");

// console.log(egs.group2);
// console.log(egs.match());

console.log("Program end!");