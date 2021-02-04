import { Agent } from "../interfaces/Agent";
import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";


export abstract class ExtendedGaleShapley extends MatchingAlgorithm {

    match(): AlgorithmData {

        // assign each resident to be free;
        this.update(1);

        while (this.freeAgentsOfGroup1.length > 0) {

            // while (some hospital h is undersubscribed) and (h's preference list contains a resident r not provisionally assigned to h) {
            let currentAgent = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
            // console.log("------------------");
            // console.log(currentAgent.name + " chosen as currentAgent (resident)");
            // console.log("currentAgent: %o", currentAgent);


            // if all potential proposees are gone, remove 
            if (currentAgent.ranking.length <= 0 || !this.getNextPotentialProposee(currentAgent)) {
                this.freeAgentsOfGroup1.shift();
            } else {

                this.update(2, {"%currentAgent%": currentAgent.name});

                // r := first such resident on h's list;
                let potentialProposee: Agent = this.getNextPotentialProposee(currentAgent);

                // console.log(potentialProposee.name + " chosen as potential proposee (hospital)")
                // console.log("potentialProposee: %o", potentialProposee);

                // // console.log(this.group1CurrentPreferences);
                // // console.log(this.group2CurrentPreferences);

                let agentLastChar = this.getLastCharacter(currentAgent.name);
                let proposeeLastChar = this.getLastCharacter(potentialProposee.name);
                let positionOfProposeeInAgentPrefs = this.findPositionInMatches(currentAgent, potentialProposee);
                let positionOfAgentInProposeePrefs = this.findPositionInMatches(potentialProposee, currentAgent);

                // // console.log("Last character of Agent: " + agentLastChar);
                // // console.log("Last character of Proposee:" + proposeeLastChar);
                // // console.log("Position of Proposee in Current Agent Preferences: " + positionOfProposeeInAgentPrefs);
                // // console.log("Position of Current Agent in Proposee Preferences: " + positionOfAgentInProposeePrefs);

                // if (positionOfAgentInProposeePrefs == -1 || positionOfProposeeInAgentPrefs == -1) {
                //     // console.log(this.algorithmData);
                // }

                // fix this bug (i took a screenshot)
                this.changePreferenceStyle(this.group1CurrentPreferences, agentLastChar, positionOfProposeeInAgentPrefs, "red");
                this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, positionOfAgentInProposeePrefs, "red");


                this.update(3, {"%potentialProposee%": potentialProposee.name});

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

        // // console.log(this.algorithmData.commands);
        return;
        // return "Extended Gale-Shapley!";
    }


    abstract getNextPotentialProposee(currentAgent: Agent): Agent;

    abstract shouldContinueMatching(currentAgent: Agent): boolean;

    abstract provisionallyAssign(currentAgent: Agent, potentialProposee: Agent): void;

    abstract removeRuledOutPreferences(currentAgent: Agent, potentialProposee: Agent): void;

    abstract breakAssignment(currentAgent: Agent, potentialProposee: Agent): void;

}