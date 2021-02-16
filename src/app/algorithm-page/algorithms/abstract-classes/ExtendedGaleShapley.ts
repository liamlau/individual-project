import { Agent } from "../interfaces/Agent";
import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";


export abstract class ExtendedGaleShapley extends MatchingAlgorithm {

    match(): AlgorithmData {

        // assign each resident to be free;
        this.update(1);

        while (this.freeAgentsOfGroup1.length > 0) {

            this.currentlySelectedAgents = [];
            this.relevantPreferences = [];

            // while (some hospital h is undersubscribed) and (h's preference list contains a resident r not provisionally assigned to h) {
            let currentAgent = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
            this.currentlySelectedAgents.push(this.getLastCharacter(currentAgent.name));
            this.relevantPreferences.push(this.getLastCharacter(currentAgent.name));


            // if all potential proposees are gone, remove 
            if (currentAgent.ranking.length <= 0 || !this.getNextPotentialProposee(currentAgent)) {
                this.freeAgentsOfGroup1.shift();
            } else {

                this.update(2, {"%currentAgent%": currentAgent.name});

                // r := first such resident on h's list;
                let potentialProposee: Agent = this.getNextPotentialProposee(currentAgent);


                // console.log("-------------");
                // console.log("man: %o", currentAgent);
                // console.log("woman: %o", potentialProposee);


                let agentLastChar = this.getLastCharacter(currentAgent.name);
                let proposeeLastChar = this.getLastCharacter(potentialProposee.name);
                let positionOfProposeeInAgentPrefs = this.findPositionInMatches(currentAgent, potentialProposee);
                let positionOfAgentInProposeePrefs = this.findPositionInMatches(potentialProposee, currentAgent);

                this.currentlySelectedAgents.push(proposeeLastChar);
                this.relevantPreferences.push(proposeeLastChar);

                this.changePreferenceStyle(this.group1CurrentPreferences, agentLastChar, this.originalGroup1CurrentPreferences.get(agentLastChar).findIndex(woman => woman == this.getLastCharacter(potentialProposee.name)), "red");
                this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, this.findPositionInMatches(potentialProposee, currentAgent), "red");

                let redLine = [agentLastChar, proposeeLastChar, "red"];
                this.currentLines.push(redLine);

                this.update(3, {"%currentAgent%": currentAgent.name, "%potentialProposee%": potentialProposee.name});

                // if h is fully subscribed, then break the assignment of the worst resident of that hospital
                this.breakAssignment(currentAgent, potentialProposee);
        
                this.provisionallyAssign(currentAgent, potentialProposee);
        
                this.removeRuledOutPreferences(currentAgent, potentialProposee);
        
                if (this.shouldContinueMatching(currentAgent)) {
                    this.freeAgentsOfGroup1.shift();
                }  
            }
        }

        this.relevantPreferences = [];
        // a stable matching has been found
        this.update(this.numberOfLines);

        // while some hospital h is undersubscribed
        // while (this.shouldContinueMatching(currentAgent)) {
        //     let potentialProposee: Agent = currentAgent.ranking[0];
            
        //     currentAgent = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
        // }

        // // // console.log(this.algorithmData.commands);
        return;
        // return "Extended Gale-Shapley!";
    }


    abstract getNextPotentialProposee(currentAgent: Agent): Agent;

    abstract shouldContinueMatching(currentAgent: Agent): boolean;

    abstract provisionallyAssign(currentAgent: Agent, potentialProposee: Agent): void;

    abstract removeRuledOutPreferences(currentAgent: Agent, potentialProposee: Agent): void;

    abstract breakAssignment(currentAgent: Agent, potentialProposee: Agent): void;

}