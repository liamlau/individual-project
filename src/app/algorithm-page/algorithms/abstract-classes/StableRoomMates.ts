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

        // console.log("Gen Pref", this.SRstable)
        

        let data2 = [["2","4","6","3","5"],
                    ["4","5","6","1","3"],
                    ["4","5","6","1","2"],
                    ["6","3","1","5","2"],
                    ["6","3","4","2","1"],
                    ["1","2","4","3","5"]];

        

        let unstable4 = [   ["2","3","4",],
                            ["3","1","4",],
                            ["1","2","4",],
                            ["1","2","3",]]

        let unstable6_1 = [ ["4", "6", "5", "2", "3"],
                            ["5", "4", "3", "6", "1"],
                            ["4", "5", "2", "1", "6"],
                            ["5", "3", "1", "6", "2"],
                            ["6", "2", "1", "4", "3"],
                            ["3", "2", "4", "5", "1"]]

        let unstable6_2 = [ ['5', '4', '3', '2', '6'],
                            ['3', '5', '6', '1', '4'],
                            ['5', '1', '4', '6', '2'],
                            ['3', '2', '1', '6', '5'],
                            ['2', '3', '6', '4', '1'],
                            ['5', '1', '2', '4', '3']]

        let unstable6_3 = [ ['5', '2', '6', '4', '3'],
                            ['4', '1', '6', '3', '5'],
                            ['5', '2', '6', '1', '4'],
                            ['5', '2', '6', '1', '3'],
                            ['6', '4', '1', '2', '3'],
                            ['1', '5', '4', '2', '3']]

      
        let unstable8_1 = [ ['3', '8', '7', '4', '5', '6', '2'],
                            ['5', '3', '4', '1', '6', '7', '8'],
                            ['8', '6', '2', '7', '1', '4', '5'],
                            ['2', '1', '5', '7', '8', '6', '3'],
                            ['4', '1', '7', '2', '6', '8', '3'],
                            ['8', '1', '2', '4', '3', '5', '7'],
                            ['3', '6', '8', '4', '2', '1', '5'],
                            ['7', '1', '5', '4', '6', '3', '2'],]

        let unstable8_2 = [ ['2', '7', '4', '5', '3', '6', '8'],
                            ['1', '4', '5', '7', '3', '8', '6'],
                            ['1', '7', '8', '5', '2', '6', '4'],
                            ['8', '5', '1', '6', '7', '3', '2'],
                            ['2', '6', '1', '8', '4', '3', '7'],
                            ['5', '3', '2', '7', '1', '4', '8'],
                            ['5', '2', '8', '6', '3', '4', '1'],
                            ['3', '1', '7', '5', '6', '4', '2'],]

        let unstable8_3 = [ ['7', '6', '5', '3', '4', '2', '8'],
                            ['5', '6', '4', '1', '8', '3', '7'],
                            ['2', '7', '8', '6', '5', '1', '4'],
                            ['8', '3', '6', '2', '5', '7', '1'],
                            ['1', '7', '3', '8', '6', '2', '4'],
                            ['1', '2', '8', '5', '7', '4', '3'],
                            ['1', '2', '8', '6', '5', '3', '4'],
                            ['7', '2', '3', '1', '5', '4', '6'],]


        let count = 0;
        let name = "p"

        let nonStableSRInstacens6 = [unstable6_1, unstable6_2, unstable6_3]
        let nonStableSRInstacens8 = [unstable8_1, unstable8_2, unstable8_3]
        let random = 0
        let instance = []

       
        // generate a random SR instance 
        if (this.SRstable) {
            // console.log("Generating Stable")

            for (let agent of Array.from(this.group1Agents.values())) {
            let agent1Rankings = Array.from((new Map(this.group1Agents)).values());

            let selfIndex = agent1Rankings.indexOf(agent)

            agent1Rankings.splice(selfIndex, 1)

            this.shuffle(agent1Rankings);
            this.group1Agents.get(agent.name).ranking = agent1Rankings;

            } 

        // pick a non-stable instance 
        } else {
            // console.log("Generating UnStable")

            if (this.numberOfAgents == 2){
                this.SRstable = true
            } else if (this.numberOfAgents == 4) {
                instance = unstable4
            } else if (this.numberOfAgents == 6) {
                random = Math.floor(Math.random() * nonStableSRInstacens6.length);
                instance = nonStableSRInstacens6[random]
            } else if (this.numberOfAgents == 8) {
                random = Math.floor(Math.random() * nonStableSRInstacens8.length);
                instance = nonStableSRInstacens8[random]
            } else {
                instance = []
            }

            for (let [key, person] of this.group1Agents.entries()){   
                for (let i = 0 ; i < this.group1Agents.size - 1 ; i++){

                    person.ranking[i] = this.group1Agents.get(name + String(instance[count][i]));
                }
                count++;
            }
        }
// for (let [key, person] of this.group1Agents.entries()){   
        //     for (let i = 0 ; i < this.group1Agents.size - 1 ; i++){
        //         //console.log(this.group1Agents.get(data2[count][i]), data2[count][i]);
        //         person.ranking[i] = this.group1Agents.get(name + String(data4[count][i]));
        //     }
        //     count++;
        // }


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

        console.log(this.group1Agents);
        console.log(this.group2Agents);

    }

   

    

    abstract match(): AlgorithmData;

}