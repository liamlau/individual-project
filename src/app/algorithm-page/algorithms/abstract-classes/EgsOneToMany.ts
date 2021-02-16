
import { Agent } from "../interfaces/Agent";
import { ExtendedGaleShapley } from "./ExtendedGaleShapley";

export abstract class EgsOneToMany extends ExtendedGaleShapley {

    breakAssignment(currentAgent: Agent, potentialProposee: Agent) {
        // if w is currently assigned to someone {
        this.update(4, {"%woman%": potentialProposee.name});
        if (potentialProposee.match.length >= 1) {
            // break the provisional assignment of r to h'
            // let matchPosition: number = potentialProposee.match[0].match.findIndex((agent: { name: string }) => agent.name == potentialProposee.name);

            let matchPosition: number = this.findPositionInMatches(potentialProposee.match[0], potentialProposee);

            if (potentialProposee.match[0].ranking.filter(agent => agent.match[0] != currentAgent).length > 0 && !this.freeAgentsOfGroup1.includes(potentialProposee.match[0].name)) {
                this.freeAgentsOfGroup1.push(potentialProposee.match[0].name);
            }

            console.log([this.getLastCharacter(potentialProposee.match[0].name), this.getLastCharacter(potentialProposee.name), "green"]);
            let a = JSON.parse(JSON.stringify(this.currentLines));
            console.log(a);
            this.removeArrayFromArray(this.currentLines, [this.getLastCharacter(potentialProposee.match[0].name), this.getLastCharacter(potentialProposee.name), "green"]);
            let b = JSON.parse(JSON.stringify(this.currentLines));
            console.log(b);
            this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(potentialProposee.match[0].name), this.findPositionInMatches(potentialProposee.match[0], potentialProposee), "grey");
            this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(potentialProposee.name), matchPosition, "grey");
            
            this.update(5, {"%woman%": potentialProposee.name, "%currentPartner%": potentialProposee.match[0].name});

            potentialProposee.match[0].match.splice(matchPosition, 1);
        } else {
            // } (r is not currently assigned)
            this.update(6, {"%woman%": potentialProposee.name});
        }
    }

    provisionallyAssign(currentAgent: Agent, potentialProposee: Agent) {
        // provisionally assign r to h;

        let agentLastChar = this.getLastCharacter(currentAgent.name);
        let proposeeLastChar = this.getLastCharacter(potentialProposee.name);
        this.removeArrayFromArray(this.currentLines, [agentLastChar, proposeeLastChar, "red"]);

        let greenLine = [agentLastChar, proposeeLastChar, "green"];
        this.currentLines.push(greenLine);

        this.changePreferenceStyle(this.group1CurrentPreferences, agentLastChar, this.findPositionInMatches(currentAgent, potentialProposee), "green");
        this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, this.findPositionInMatches(potentialProposee, currentAgent), "green");

        this.update(7, {"%man%": currentAgent.name, "%woman%": potentialProposee.name});
        potentialProposee.match[0] = currentAgent;
        currentAgent.match.push(potentialProposee);
    }

    removeRuledOutPreferences(currentAgent: Agent, potentialProposee: Agent) {
        let currentAgentPosition: number = potentialProposee.ranking.findIndex((agent: { name: string }) => agent.name == currentAgent.name);
        
        let proposeeRankingClearCounter: number = currentAgentPosition + 1;

        // for each successor h' of h on r's list {
        this.update(8, {"%man%": currentAgent.name, "%woman%": potentialProposee.name});
        for (let i = currentAgentPosition + 1; i < potentialProposee.ranking.length; i++) {

            let proposeePosition: number = potentialProposee.ranking[i].ranking.findIndex((agent: { name: string }) => agent.name == potentialProposee.name);
            potentialProposee.ranking[i].ranking.splice(proposeePosition, 1);

            // remove h' and r from each other's lists
            this.update(9, {"%nextWorstMan%": potentialProposee.ranking[i].name, "%woman%": potentialProposee.name});

            this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(potentialProposee.ranking[i].name), proposeePosition, "grey");

            this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(potentialProposee.name), proposeeRankingClearCounter, "grey");

            potentialProposee.ranking.splice(i, 1);
            i -= 1;

            this.update(10, {"%nextWorstMan%": potentialProposee.ranking[i].name, "%woman%": potentialProposee.name});

            proposeeRankingClearCounter++;
        }
        this.update(11, {"%man%": currentAgent.name, "%woman%": potentialProposee.name});
    }

}


// bugs:
// plural for agent name instead of singular
// highlighting colour for men is wrong (we forget to delete!!!)