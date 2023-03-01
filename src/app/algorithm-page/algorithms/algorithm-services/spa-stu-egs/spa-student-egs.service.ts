import { Injectable } from '@angular/core';
import { reverse } from 'dns';
import { StudentProjectAllocation } from '../../abstract-classes/StudentProjectAllocation';
import { AlgorithmData } from '../../interfaces/AlgorithmData';
import { Lecturer } from '../../interfaces/Lecturer';
import { Project } from '../../interfaces/Project';

import { Student } from '../../interfaces/Student';

@Injectable({
  providedIn: 'root'
})
export class SpaStudentEgsService extends StudentProjectAllocation{

  group1Name = "s";
  group2Name = "p";
  group3Name = "l"

  group1Agents: Map<String, Student> = new Map();
  group2Agents: Map<String, Project> = new Map();
  group3Agents: Map<String, Lecturer> = new Map();

  hospitalCapacity: Map<string, number> = new Map();
  lecturerCapacitys: Map<String, number> = new Map();

  numberLectures: number;
  lecturerCapacity: number;

 
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

      let currentLetter = 'A';

      for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
          let group2AgentName = this.group2Name + currentLetter;
          let projectCapacity = 2 //this.getRandomInt(1, this.numberOfAgents-2);

          this.group2Agents.set(group2AgentName, {
              name: group2AgentName,
              match: new Array(),
              ranking: new Array(),
              capacity: projectCapacity,
          });

          this.hospitalCapacity[currentLetter] = projectCapacity;

          currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
        }

      this.algorithmSpecificData["hospitalCapacity"] = this.hospitalCapacity
      console.log(this.hospitalCapacity)
     

      this.numberLectures = Math.ceil(this.numberOfGroup2Agents / 3)
      this.lecturerCapacity = Math.ceil(this.numberOfAgents / 3) + 1

      // reset the group - if prevouis run had more projects/lecturers then they dont all get deleted - causes issues - index errors 
      this.group3Agents = new Map();


      for (let i = 1; i < this.numberLectures + 1; i++) {
        let group3AgentName = this.group3Name + i;

        this.group3Agents.set(group3AgentName, {
            name: group3AgentName,
            match: new Array(),
            ranking: new Array(),
            projects: new Array(),
            capacity: this.lecturerCapacity
        });

        this.lecturerCapacitys[i] = this.lecturerCapacity
        // this.lecturerProjects[i] = this.group3Agents.get(group3AgentName).projects

      }  
    this.algorithmSpecificData["lecturerCapacity"] = this.lecturerCapacitys
    // this.algorithmSpecificData["lecturerProjects"] = this.lecturerProjects

  } 

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  
  // list of students that need to be matched and are available
  availableStudents() {

    let students = [];
    // for each student - if they are free and have people in their ranking - add to list and return
    for (let [key, student] of this.group1Agents.entries()) {

      if (student.ranking.length > 0 && student.match.length == 0) {
        students.push(student)
      }
    }
    return students
  }

  // returns the lecturer that runs the passed in project
  getProjectLecturer(project: Project){

    for (let [key, lecturer] of this.group3Agents.entries()) {
      if (lecturer.projects.includes(project.name)) {
        return lecturer
      }
    }
    console.log("Can't find the lecturer that runs project -", project)
    return null
  }

  // get the least prefered student assigned to a project according to the lecturer
  getWorstStudent(project: Project) {

    let lecturer = this.getProjectLecturer(project)

    // loop through ranking in reverse - first assigned student to appear is the worst
    for (let i = lecturer.ranking.length - 1; i > -1 ; i--) {
      if (project.match.includes(lecturer.ranking[i])){
        return lecturer.ranking[i]
      }
    }

    // for (let student of lecturer.ranking.reverse()){
    //   if (project.match.includes(student)){
    //     return student
    //   }
    // }

    return null
  }

  // get the worst student given a lecture assigned to any of that lectures projects 
  getWorstStudentOverall(lecturer: Lecturer) {

    let assignedStudents = []

    // for each project the lecture runs 
    for (let project of lecturer.projects) {
      let projectObject = this.group2Agents.get(project)

      // add the assigned students of the project to a list 
      for (let student of projectObject.match) {
        assignedStudents.push(student)
      }
    }
    // loop through ranking in reverse - first assigned student to appear is the worst
    for (let i = lecturer.ranking.length - 1; i > -1 ; i--) {
      if (assignedStudents.includes(lecturer.ranking[i])){
        return lecturer.ranking[i]
      }
    }

    // for (let student of lecturer.ranking.reverse()){
    //   if (assignedStudents.includes(student)){
    //     return student
    //   }
    // }


    return null
  }


  breakMatch(student: Student, project: Project) {

    // remove matching to project from student 
    student.match.splice(0, 1)

    //remove matching to student from project
    let studentIndex = project.match.indexOf(student)
    project.match.splice(studentIndex, 1)

    this.removeArrayFromArray(this.currentLines, [this.getLastCharacter(student.name), this.getLastCharacter(project.name), "red"])
    this.updateCapacityVisualization();
  }

  
  getLecturerCurrentCapacity(lecturer: Lecturer) {

    let currentCapacity = 0
    // for each project the lecture runs 
    for (let project of lecturer.projects) {
      let projectObject = this.group2Agents.get(project)

      // sum number of people assigned to the project
      currentCapacity += projectObject.match.length
    }
    return currentCapacity
  }


  // dels successors of student from projects 
  deleteFullPairsProject(worstStudent: Student, project: Project, lecturer: Lecturer) {

    // loop though the lectures rakning in revese - remove the project from the ranking if each one
    // stop once we get to the student passed in - worstStudent
    this.update(15, {"%student%" : worstStudent.name, "%lecturer%" : lecturer.name})
    for (let i = lecturer.ranking.length - 1; i > -1 ; i--) {
      if (lecturer.ranking[i].name == worstStudent.name) {break} 

      // if S_i finds project p acceptable:
      this.update(16, {"%student%" : lecturer.ranking[i].name, "%project%" : project.name})
      if (lecturer.ranking[i].ranking.includes(project)) {
        let projectIndex = lecturer.ranking[i].ranking.indexOf(project)
        lecturer.ranking[i].ranking.splice(projectIndex, 1)

        this.changePreferenceStyle(
          this.group1CurrentPreferences,
          this.getLastCharacter(lecturer.ranking[i].name), 
          this.originalGroup1CurrentPreferences.get(this.getLastCharacter(lecturer.ranking[i].name)).indexOf(this.getLastCharacter(project.name)),
          "grey")

        // remove p from S_i's preference list
        this.update(17, {"%student%" : lecturer.ranking[i].name, "%project%" : project.name})
        
      }
    }
  }
  

  deleteFullPairsLecturer(worstStudent: Student, lecturer: Lecturer) {

    // loop through lecturer rankings backwards - stop when we reach worst student
    this.update(20, {"%student%" : worstStudent.name, "%lecturer%" : lecturer.name})
    for (let i = lecturer.ranking.length - 1; i > -1 ; i--) {
      if (lecturer.ranking[i].name == worstStudent.name) {break} 

      // for each project offered by the lecture 
      this.update(21, {"%lecturer%" : lecturer.name})
      for (let project of lecturer.projects) {
        let projectObject = this.group2Agents.get(project)
        
        // if the successor finds this project accesptable - remove the project from the ranking
        if (lecturer.ranking[i].ranking.includes(projectObject)) {
          let projectIndex = lecturer.ranking[i].ranking.indexOf(projectObject)
          lecturer.ranking[i].ranking.splice(projectIndex, 1)

          this.changePreferenceStyle(
            this.group1CurrentPreferences,
            this.getLastCharacter(lecturer.ranking[i].name), 
            this.originalGroup1CurrentPreferences.get(this.getLastCharacter(lecturer.ranking[i].name)).indexOf(this.getLastCharacter(projectObject.name)),
            "grey")

          // remove p from S_i's preference list
          this.update(22, {"%student%" : lecturer.ranking[i].name, "%project%" : projectObject.name})

        }
      }  
    }
  }

  updateCapacityVisualization() {

    let cap = 0

    // lecturers 
    for (let lecturer of this.group3Agents.values()) {
      cap = this.getLecturerCurrentCapacity(lecturer)
      if (cap == lecturer.capacity){
        // turn green if at capacity
        this.algorithmSpecificData["lecturerCapacity"][Number(this.getLastCharacter(lecturer.name))] = "{#53D26F" + lecturer.capacity + "}"
      } else if (cap > lecturer.capacity){
        // turn red if over capacity 
        this.algorithmSpecificData["lecturerCapacity"][Number(this.getLastCharacter(lecturer.name))] = "{#EB2A2A" + lecturer.capacity + "}"
      } else {
        // turn black otherwise
        this.algorithmSpecificData["lecturerCapacity"][Number(this.getLastCharacter(lecturer.name))] = "{#000000" + lecturer.capacity + "}"
      }
    }

    //Projects 
    for (let project of this.group2Agents.values()) {
      console.log("check")
      if (project.match.length == project.capacity) {
        // turn green to show full
        console.log("full")
        this.algorithmSpecificData["hospitalCapacity"][this.getLastCharacter(project.name)] = "{#53D26F" + project.capacity + "}"
      } else if (project.match.length > project.capacity) {
        // turn red to show over full
        console.log("over")
        this.algorithmSpecificData["hospitalCapacity"][this.getLastCharacter(project.name)] = "{#EB2A2A" + project.capacity + "}"
      } else {
        // turn black otherwise
        this.algorithmSpecificData["hospitalCapacity"][this.getLastCharacter(project.name)] = "{#000000" + project.capacity + "}"
      }
    }
  }

 
  

  match(): AlgorithmData {
      
    console.log("Here is SPA")

    let redLine = []
    let greenLine = []

    this.update(1);

    let availableStudents = this.availableStudents();

    let stopPoint = 0

    
    // main loop check
    while(availableStudents.length > 0){


      // get first student on list
      let student = availableStudents[0]
      // while some student s is free
      this.update(2, {"%student%" : student.name})

      // console.log("Current Student", student.name, student)

      // get students most prefered project and its lecturer
      let preferedProject = student.ranking[0]
      let projectLecturer = this.getProjectLecturer(preferedProject)

      // p = next most prefered project on s's list | l = lecturer who offers p
      this.update(3, {"%student%" : student.name, "%project%" : preferedProject.name})
      this.update(4, {"%lecturer%" : projectLecturer.name})

      // highlight assinged
      this.changePreferenceStyle(
        this.group1CurrentPreferences,
        this.getLastCharacter(student.name), 
        this.originalGroup1CurrentPreferences.get(this.getLastCharacter(student.name)).indexOf(this.getLastCharacter(preferedProject.name)),
        "red")

      // provisionally assign student to project
      student.match.push(preferedProject)
      preferedProject.match.push(student)

      redLine = [this.getLastCharacter(student.name), this.getLastCharacter(preferedProject.name), "red"]
      this.currentLines.push(redLine)
      // provisionally assign s to p
      this.updateCapacityVisualization()
      this.update(5, {"%student%" : student.name, "%project%" : preferedProject.name})
      

      // if p is over-subscribed
      this.update(6, {"%project%" : preferedProject.name})

      // if project is over-subbed - remove worst student assigned to project
      if (preferedProject.match.length > preferedProject.capacity) {
        // worst student on this project, ranked by the projects lecturer
        let worstStudent = this.getWorstStudent(preferedProject)
        this.update(7, {"%student%" : worstStudent.name, "%project%" : preferedProject.name})
        this.breakMatch(worstStudent, preferedProject)
        this.update(8, {"%student%" : worstStudent.name, "%project%" : preferedProject.name})


      } else {
         // else if the lecturer is over-subbed - remove overall worst student
        this.update(9, {"%lecturer%" : projectLecturer.name})
        if (this.getLecturerCurrentCapacity(projectLecturer) > projectLecturer.capacity) {
          // worst student assigned to the lecture 
          let worstStudentOverall = this.getWorstStudentOverall(projectLecturer);
          let worstStudentProject = worstStudentOverall.match[0]

          // Sw = worst student assigned to l | Pw = project that Sw is assigned to
          this.update(10, {"%student%" : worstStudentOverall.name, "%lecturer%" : projectLecturer.name})
          this.update(11, {"%student%" : student.name, "%project%" : worstStudentProject.name})

          this.breakMatch(worstStudentOverall, worstStudentProject)
          // break provisional assignment between Sw and Pw
          this.update(12, {"%student%" : worstStudentOverall.name, "%project%" : worstStudentProject.name})
        }
      }
      
    

      // if the project is full - then delete successors 
      this.update(13, {"%project%" : preferedProject.name})
      if (preferedProject.match.length == preferedProject.capacity) {
        // worst student on this project, ranked by the projects lecturer
        let worstStudent = this.getWorstStudent(preferedProject)
        this.update(14, {"%student%" : worstStudent.name, "%project%" : preferedProject.name})
        // for each successor st of sr on lecturer k's project - del pair (st, pj)
        this.deleteFullPairsProject(worstStudent, preferedProject, projectLecturer);
      }

      // If the lecturer is at capacity
      this.update(18, {"%lecturer%" : projectLecturer.name})
      if (this.getLecturerCurrentCapacity(projectLecturer) == projectLecturer.capacity) {
        // worst student ranked by the lecturer
        let worstStudentOverall = this.getWorstStudentOverall(projectLecturer);
        this.update(19, {"%student%" : worstStudentOverall.name, "%lecturer%" : projectLecturer.name})

        // delete the project from worse students than ^
        this.deleteFullPairsLecturer(worstStudentOverall, projectLecturer)
      }

      availableStudents = this.availableStudents();

      // unhighlight assinged
      this.changePreferenceStyle(
        this.group1CurrentPreferences,
        this.getLastCharacter(student.name), 
        this.originalGroup1CurrentPreferences.get(this.getLastCharacter(student.name)).indexOf(this.getLastCharacter(preferedProject.name)),
        "black")

    
      // update viz
      this.updateCapacityVisualization()

      // stopPoint++
      // if (stopPoint > 200) {
      //   console.log("OVERRUN - STOPPED")
      //   break;
      // }

    }

    // updates confirms 
    for (let student of this.group1Agents.values()){
      // if the student has a matching - should 
      if (student.match.length == 1) {
        this.changePreferenceStyle(
          this.group1CurrentPreferences,
          this.getLastCharacter(student.name), 
          this.originalGroup1CurrentPreferences.get(this.getLastCharacter(student.name)).indexOf(this.getLastCharacter(student.match[0].name)),
          "green")
  
        greenLine = [this.getLastCharacter(student.name), this.getLastCharacter(student.match[0].name), "green"]
        this.currentLines.push(greenLine)
        this.removeArrayFromArray(this.currentLines, [this.getLastCharacter(student.name), this.getLastCharacter(student.match[0].name), "red"])
      
      }
    }

    // END - Stable matching found
    this.update(23);

    console.log("--- End ---")
    console.log(this.group1Agents)
    console.log(this.group2Agents)
    console.log(this.group3Agents)

    return;
  }

}



    // let s1 = this.group1Agents.get("s1")
    // let s2 = this.group1Agents.get("s2")
    // let s3 = this.group1Agents.get("s3")

    // let p1 = this.group2Agents.get("pA")
    // let p2 = this.group2Agents.get("pB")

    // let l1 = this.group3Agents.get("l1")

    // console.log(s1, s2, p1)

    // p1.match.push(s1)
    // // p1.match.push(s2)
    // p2.match.push(s3)

    // s1.match.push(p1)
    // // s2.match.push(p1)
    // s3.match.push(p2)

    // console.log("worst")
    // let w = this.getWorstStudentOverall(l1)
    // let w2 = this.getWorstStudent(p1)
    // console.log(w, w2)


    // console.log("HERE")

    // let a = [1,2,3,4]

    // for (let i of a.reverse()){
    //   console.log(i)
    // }
    // a.reverse()
    // console.log(a)

