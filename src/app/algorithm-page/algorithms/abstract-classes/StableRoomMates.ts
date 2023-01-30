import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";
import { Person } from '../interfaces/Person';
import { Agent } from "../interfaces/Agent";


export abstract class StableRoomMates extends MatchingAlgorithm {

    constructor() {
        super();
        // console.log("StableRoomMates Class");
    }

    generatePreferences(): void {
        
        // console.log("Gen Preferances ")

        // for (let agent of Array.from(this.group1Agents.values())) {
        //     let agent1Rankings = Array.from((new Map(this.group1Agents)).values());
        //     //this.shuffle(agent1Rankings);
        //     this.group1Agents.get(agent.name).ranking = agent1Rankings;
        // }

        // for (let agent of Array.from(this.group2Agents.values())) {
        //     let agent2Rankings = Array.from((new Map(this.group1Agents)).values());
        //     //this.shuffle(agent2Rankings);
        //     this.group2Agents.get(agent.name).ranking = agent2Rankings;
        // }

        let data1 = [["3","2","4"],
                    ["4","1","3"],
                    ["2","4","1"],
                    ["1","2","3"]];

        let data2 = [["2","4","6","3","5"],
                    ["4","5","6","1","3"],
                    ["4","5","6","1","2"],
                    ["6","3","1","5","2"],
                    ["6","3","4","2","1"],
                    ["1","2","4","3","5"]];

        let data3 = [["5","3","6","2","4",],
        ["4","6","3","5","1",],
        ["5","2","6","4","1",],
        ["1","3","5","2","6",],
        ["4","1","3","2","6",],
        ["1","5","3","2","4",]]

        let data4 = [["2","3","4",],
                    ["3","1","4",],
                    ["1","2","4",],
                    ["1","2","3",]]

        let count = 0;
        let name = "p"

        // for (let [key, person] of this.group1Agents.entries()){   
        //     for (let i = 0 ; i < this.group1Agents.size - 1 ; i++){
        //         //console.log(this.group1Agents.get(data2[count][i]), data2[count][i]);
        //         person.ranking[i] = this.group1Agents.get(name + String(data4[count][i]));
        //     }
        //     count++;
        // }

        for (let agent of Array.from(this.group1Agents.values())) {
            let agent1Rankings = Array.from((new Map(this.group1Agents)).values());

            let selfIndex = agent1Rankings.indexOf(agent)

            agent1Rankings.splice(selfIndex, 1)

            this.shuffle(agent1Rankings);
            this.group1Agents.get(agent.name).ranking = agent1Rankings;
        } 

    }

    populatePreferences(preferences: Map<String, Array<String>>): void {
        console.log("preferences", preferences);
        let tempCopyList: Agent[];

        for (let agent of Array.from(this.group1Agents.keys())) {
            tempCopyList = [];
            // this.group1Agents.get(agent).ranking = preferences.get(this.getLastCharacter(String(agent)));
            for (let preferenceAgent of preferences.get(this.getLastCharacter(String(agent)))) {
                tempCopyList.push(this.group1Agents.get(this.group1Name + preferenceAgent));
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

   

    

    abstract match(): AlgorithmData;

}