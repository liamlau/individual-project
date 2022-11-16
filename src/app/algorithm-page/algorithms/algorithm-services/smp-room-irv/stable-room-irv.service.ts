import { Injectable } from '@angular/core';
import { StableRoomMates } from '../../abstract-classes/StableRoomMates';
import { Agent } from '../../interfaces/Agent';
import { AlgorithmData } from '../../interfaces/AlgorithmData';
import { Man } from '../../interfaces/Man';

@Injectable({
  providedIn: 'root'
})
export class StableRoomIrvService extends StableRoomMates {

  group1Name = "People";
  group2Name = "Other";

  group1Agents: Map<String, Man> = new Map();

  generateAgents() {

    // make each person 
    for (let i = 1; i < this.numberOfAgents + 1; i++) {
      let group1AgentName = this.group1Name + i;

      this.group1Agents.set(group1AgentName, {
          name: group1AgentName,
          match: new Array(),
          ranking: new Array(),
          lastProposed: 0
      });

      this.freeAgentsOfGroup1.push(group1AgentName);

  }

  // fill data structures for group2 - Other - might not be used
  let currentLetter = 'A';

  for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
    let group2AgentName = this.group2Name + currentLetter;

    this.group2Agents.set(group2AgentName, {
        name: group2AgentName,
        match: new Array(),
        ranking: new Array(),
    });

    currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
    }

  }

  


  constructor() { 
    
    super();
    console.log("Hello");
  }

  

  match(): AlgorithmData {


    function assign_check(assinged) {
      
      // loop over all agents 
      for (let i = 0 ; i < this.freeAgentsOfGroup1.length ; i++){
        let person: Man = this.group1Agents.get(this.freeAgentsOfGroup1[0]);

        // if person assigned to param person - then return index
        if (person.lastProposed == assinged){
          return i;
        }
      }
    }

    function free(person_free){
      //loop over all agents 
      for (let i = 0 ; i < this.freeAgentsOfGroup1.length ; i++){
        let person: Man = this.group1Agents.get(this.freeAgentsOfGroup1[0]);

        // if person assigned to param persin - then set assign to null
        if (person.lastProposed == person_free){
          person.lastProposed = null;
        }
      }
    }

    this.update(1);

    while (this.freeAgentsOfGroup1.length > 0) {

      this.currentlySelectedAgents = [];
      this.relevantPreferences = [];

      console.log("match.irv");
      console.log(this.freeAgentsOfGroup1);
      console.log(this.group1Agents);


      // data = this.freeAgentsOfGroup1 

      while (this.freeAgentsOfGroup1.length > 0) {

        //loop through each agent in the list 
        for (let agent = 0 ; agent < this.freeAgentsOfGroup1.length; agent++){
             
          let person: Man = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
          console.log(person);
          
          // if there is no more preferances for a agent - no stable matchong exists
          if (person.ranking.length < 1){
            console.log("NO STABLE MATHCING - empty preferance list")
            break;
          }

          //get their most prefered person 
          let pref = person.ranking[0];
          console.log(pref, "Here");

          //if someone is assigned to their most prefered person, then unassign them and assign current agent to them 
          let check = assign_check(pref);
          if (check != null){
            
          }

        }
       

          break;
        break;
    }

    return;

   }
}

}
