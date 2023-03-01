import { AlgorithmData } from "../interfaces/AlgorithmData";
import { MatchingAlgorithm } from "./MatchingAlgorithm";
import { Agent } from "../interfaces/Agent";
import { Student } from "../interfaces/Student";
import { Project } from "../interfaces/Project";
import { Lecturer } from "../interfaces/Lecturer";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";


export abstract class StudentProjectAllocation extends MatchingAlgorithm {


    group1Agents: Map<String, Student> = new Map();
    group2Agents: Map<String, Project> = new Map();
    group3Agents: Map<String, Lecturer> = new Map();

    constructor() {
        super();
        // console.log("StableRoomMates Class");
    }

    // student1 = [["pA", "pC", "pE"],
    //             ["pA", "pD"],
    //             ["pA", "pB"],
    //             ["pC", "pA", "pE"]]

    // projCap1 = [2, 1, 1, 1, 1]

    // lecture1 = [["s1", "s3", "s2", "s4"],
    //             ["s1", "s2", "s4"]]

    // lectureProj1 = [["pA", "pB", "pC"],
    //                 ["pD", "pE"]]

    // lectCap1 = [2, 2]

    student1 = [["pC", "pA"],
                ["pA", "pC"],
                ["pD", "pB"],
                ["pB", "pD"]]
                
    projCap1 = [1, 1, 1, 1]

    lecture1 = [["s1", "s2", "s3", "s4"],
                ["s2", "s1", "s4", "s3"]]

    lectureProj1 = [["pA", "pB"],
                    ["pC", "pD"]]

    lectCap1 = [2, 2]

    



    // generatePreferences(): void {

    //     // set student rankings 
    //     let count = 0;
    //     for (let [key, student] of this.group1Agents.entries()){   
    //         for (let i = 0 ; i < this.student1[count].length ; i++){
    //             //console.log(this.group1Agents.get(data2[count][i]), data2[count][i]);
    //             student.ranking[i] = this.group2Agents.get(String(this.student1[count][i]));
    //         }
    //         count++;
    //     }

    //      // set proj cap
    //     count = 0
    //     for (let [key, project] of this.group2Agents.entries()){   
    //        project.capacity = this.projCap1[count]
    //        count++
    //     }



    //     count = 0
    //     //set lecture raknings 
    //     for (let [key, lecture] of this.group3Agents.entries()){   
    //         lecture.capacity = this.lectCap1[count]

    //         for (let i = 0 ; i < this.lecture1[count].length ; i++){
    //             //console.log(this.group1Agents.get(data2[count][i]), data2[count][i]);
    //             lecture.ranking[i] = this.group1Agents.get(String(this.lecture1[count][i]));
    //         }

    //         for (let i = 0 ; i < this.lectureProj1[count].length ; i++){
    //             //console.log(this.group1Agents.get(data2[count][i]), data2[count][i]);
    //             lecture.projects[i] = this.lectureProj1[count][i];
    //         }

    //         count++
    //      }


    //     console.log("SPA gen agents")
    //     console.log(this.group1Agents)
    //     console.log(this.group2Agents)
    //     console.log(this.group3Agents)


    // }

    generatePreferences(): void {

        let numberLectures = 0;
        let projectLists = []
        // Students - Group 1
        for (let student of Array.from(this.group1Agents.values())) {
            let agent1Rankings = Array.from((new Map(this.group2Agents)).values());
            this.shuffle(agent1Rankings);
            this.group1Agents.get(student.name).ranking = agent1Rankings;
        }


        // make lists that show each project that a lecturer runs
        numberLectures = Math.ceil(this.numberOfGroup2Agents / 3)
        projectLists = []
        for (let i = 0 ; i < numberLectures ; i++) {
            projectLists.push([])
        }

        console.log("lists", projectLists)


        // Projects - Group 2 
        let count = 1
        for (let project of Array.from(this.group2Agents.values())) {
            let listIndex = Math.ceil(count / 3) - 1
            projectLists[listIndex].push(project.name)
            count++
        }


        // Lectures - Group 3 
        count = 0
        for (let lecturer of Array.from(this.group3Agents.values())) {
            let agent3Rankings = Array.from((new Map(this.group1Agents)).values());
            this.shuffle(agent3Rankings);
            this.group3Agents.get(lecturer.name).ranking = agent3Rankings;

            lecturer.projects = projectLists[count]
            count++
        }


        this.algorithmSpecificData["lecturerProjects"] = projectLists

        console.log("SPA gen agents")
        console.log(this.group1Agents)
        console.log(this.group2Agents)
        console.log(this.group3Agents)
    }
    

    populatePreferences(preferences: Map<String, Array<String>>): void {
        console.log("preferences", preferences);

        this.generatePreferences()

        let tempCopyList: Agent[];

        console.log("changes", Array.from(this.group1Agents.keys()))

        for (let agent of Array.from(this.group1Agents.keys())) {
            tempCopyList = [];
            console.log(agent, preferences.get(this.getLastCharacter(String(agent))))
            // this.group1Agents.get(agent).ranking = preferences.get(this.getLastCharacter(String(agent)));
            for (let preferenceAgent of preferences.get(this.getLastCharacter(String(agent)))) {
                console.log()
                tempCopyList.push(this.group2Agents.get(this.group2Name + preferenceAgent));
            }
            this.group1Agents.get(agent).ranking = tempCopyList;
        }

        console.log(this.group1Agents);
        console.log(this.group2Agents);
        console.log(this.group3Agents)

    }


    abstract match(): AlgorithmData;

}