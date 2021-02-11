
import { Agent } from "../interfaces/Agent";
import { ExtendedGaleShapley } from "./ExtendedGaleShapley";

export abstract class EgsOneToMany extends ExtendedGaleShapley {
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