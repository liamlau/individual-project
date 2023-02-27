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

          currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
      }

      let numberLectures = Math.ceil(this.numberOfGroup2Agents / 3)
      let lecturerCapacity = Math.ceil(this.numberOfAgents / 3) + 1

      for (let i = 1; i < numberLectures + 1; i++) {
        let group3AgentName = this.group3Name + i;

        this.group3Agents.set(group3AgentName, {
            name: group3AgentName,
            match: new Array(),
            ranking: new Array(),
            projects: new Array(),
            capacity: lecturerCapacity
        });


    }    
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
  }

  
  getLecturerCurrentCapacity(lecturer: Lecturer) {

    let currentCapacity = 0
    // for each project the lecture runs 
    for (let project of lecturer.projects) {
      let projectObject = this.group2Agents.get(project)

      console.log(projectObject, project, lecturer)
    
      // sum number of people assigned to the project
      currentCapacity += projectObject.match.length
    }
    return currentCapacity
  }


  // dels successors of student from projects 
  deleteFullPairsProject(worstStudent: Student, project: Project, lecturer: Lecturer) {

    

    // loop though the lectures rakning in revese - remove the project from the ranking if each one
    // stop once we get to the student passed in - worstStudent
    for (let i = lecturer.ranking.length - 1; i > -1 ; i--) {
      if (lecturer.ranking[i].name == worstStudent.name) {break} 

      console.log(worstStudent.name == lecturer.ranking[i].name, worstStudent.name, lecturer.ranking[i].name)

      if (lecturer.ranking[i].ranking.includes(project)) {
        let projectIndex = lecturer.ranking[i].ranking.indexOf(project)
        lecturer.ranking[i].ranking.splice(projectIndex, 1)
        console.log("removed", project.name, "from", lecturer.ranking[i].name, "pro")
      }
    }

    // for (let student of lecturer.ranking.reverse()) {
    //   if (student.name == worstStudent.name) {break} 

    //   console.log(worstStudent.name == student.name, worstStudent.name, student.name)

    //   if (student.ranking.includes(project)) {
    //     let projectIndex = student.ranking.indexOf(project)
    //     student.ranking.splice(projectIndex, 1)
    //     console.log("removed", project.name, "from", student.name, "pro")
    //   }
    // }

  }
  

  deleteFullPairsLecturer(worstStudent: Student, lecturer: Lecturer) {

    // loop through lecturer rankings backwards - stop when we reach worst student
    for (let i = lecturer.ranking.length - 1; i > -1 ; i--) {
      if (lecturer.ranking[i].name == worstStudent.name) {break} 

      // for each project offered by the lecture 
      for (let project of lecturer.projects) {
        let projectObject = this.group2Agents.get(project)
        
        // if the successor finds this project accesptable - remove the project from the ranking
        if (lecturer.ranking[i].ranking.includes(projectObject)) {
          let projectIndex = lecturer.ranking[i].ranking.indexOf(projectObject)
          lecturer.ranking[i].ranking.splice(projectIndex, 1)
          console.log("removed", projectObject.name, "from", lecturer.ranking[i].name, "lec")
        }
      }  
    }

    // for (let student of lecturer.ranking.reverse()) {
    //   if (student.name == worstStudent.name) {break} 

    //   // for each project offered by the lecture 
    //   for (let project of lecturer.projects) {
    //     let projectObject = this.group2Agents.get(project)
        
    //     // if the successor finds this project accesptable - remove the project from the ranking
    //     if (student.ranking.includes(projectObject)) {
    //       let projectIndex = student.ranking.indexOf(projectObject)
    //       student.ranking.splice(projectIndex, 1)
    //       console.log("removed", projectObject.name, "from", student.name, "lec")
    //     }
    //   }  
    // }

  }

 
  

  match(): AlgorithmData {
      
    console.log("Here is SPA")

    this.update(1);


    let availableStudents = this.availableStudents();


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


    

    // main loop check
    while(availableStudents.length > 0){
  
      // get first student on list
      let student = availableStudents[0]

      console.log("New Run", student)

      // get students most prefered project and its lecturer
      let preferedProject = student.ranking[0]
      let projectLecturer = this.getProjectLecturer(preferedProject)

      // provisionally assign student to project
      student.match.push(preferedProject)
      preferedProject.match.push(student)

      // if project is over-subbed - remove worst student assigned to project
      if (preferedProject.match.length > preferedProject.capacity) {
        // worst student on this project, ranked by the projects lecturer
        let worstStudent = this.getWorstStudent(preferedProject)
        this.breakMatch(worstStudent, preferedProject)

      // else if the lecturer is over-subbed - remove overall worst student
      } else if (projectLecturer.match.length > preferedProject.capacity) {
        // worst student assigned to the lecture 
        let worstStudentOverall = this.getWorstStudentOverall(projectLecturer);
        let worstStudentProject = worstStudentOverall.match[0]

        this.breakMatch(worstStudentOverall, worstStudentProject)
      }


      // if the project is full - then delete successors 
      if (preferedProject.match.length == preferedProject.capacity) {
        // worst student on this project, ranked by the projects lecturer
        let worstStudent = this.getWorstStudent(preferedProject)
        // for each successor st of sr on lecturer k's project - del pair (st, pj)
        this.deleteFullPairsProject(worstStudent, preferedProject, projectLecturer);
      }

      // mermermer
      if (this.getLecturerCurrentCapacity(projectLecturer) == projectLecturer.capacity) {
        // worst student ranked by the lecturer
        let worstStudentOverall = this.getWorstStudentOverall(projectLecturer);
        // delete the project from worse students than ^
        this.deleteFullPairsLecturer(worstStudentOverall, projectLecturer)
      }

      availableStudents = this.availableStudents();
    }


    console.log("--- End ---")
    console.log(this.group1Agents)
    console.log(this.group2Agents)
    console.log(this.group3Agents)


    return;
  }


}
