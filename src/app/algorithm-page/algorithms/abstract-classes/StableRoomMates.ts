import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";
import { Person } from '../interfaces/Person';
import { Agent } from "http";

export abstract class StableRoomMates extends MatchingAlgorithm {

    constructor() {
        super();
        console.log("StableRoomMates Class");
    }

    // generatePreferences(): void {
        
    //     console.log("Gen Preferances ")

    //     // for (let agent of Array.from(this.group1Agents.values())) {
    //     //     let agent1Rankings = Array.from((new Map(this.group1Agents)).values());
    //     //     //this.shuffle(agent1Rankings);
    //     //     this.group1Agents.get(agent.name).ranking = agent1Rankings;
    //     // }

    //     // for (let agent of Array.from(this.group2Agents.values())) {
    //     //     let agent2Rankings = Array.from((new Map(this.group1Agents)).values());
    //     //     //this.shuffle(agent2Rankings);
    //     //     this.group2Agents.get(agent.name).ranking = agent2Rankings;
    //     // }

    //     let data1 = [["3","2","4"],
    //                 ["4","1","3"],
    //                 ["2","4","1"],
    //                 ["1","2","3"]];

    //     let data2 = [["2","4","6","3","5"],
    //                 ["4","5","6","1","3"],
    //                 ["4","5","6","1","2"],
    //                 ["6","3","1","5","2"],
    //                 ["6","3","4","2","1"],
    //                 ["1","2","4","3","5"]];

    //     console.log("HEREHRHERHERKAHLSJHDK:AHSDK:AJSDa")
    //     console.log(this.group1Agents)

    //     // let count = 0;
    //     // for (let [key, person] of this.group1Agents.entries()){   
    //     //     for (let i = 0 ; i < this.group1Agents.size - 1 ; i++){
    //     //         //console.log(this.group1Agents.get(data2[count][i]), data2[count][i]);
    //     //         person.ranking[i] = this.group1Agents.get(data2[count][i]);
    //     //     }
    //     //     count++;


    //     // }

    //     console.log("INSIDE FUNC")
    //     console.log(this.group1Agents);
    //     console.log(this.group2Agents);

    // }

    abstract match(): AlgorithmData;

}