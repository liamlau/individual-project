import { Injectable } from '@angular/core';
import { type } from 'os';
import { runInThisContext } from 'vm';
import { StableRoomMates } from '../../abstract-classes/StableRoomMates';
import { Agent } from '../../interfaces/Agent';
import { AlgorithmData } from '../../interfaces/AlgorithmData';
import { Man } from '../../interfaces/Man';
import { Person } from '../../interfaces/Person';


@Injectable({
  providedIn: 'root'
})
export class StableRoomIrvService extends StableRoomMates {

  group1Name = "";
  group2Name = "Other";

  group1Agents: Map<String, Person> = new Map();

  generateAgents() {

    // make each person 
    for (let i = 1; i < this.numberOfAgents + 1; i++) {
      let group1AgentName = this.group1Name + i;

      this.group1Agents.set(group1AgentName, {
          name: group1AgentName,
          match: new Array(),
          ranking: new Array(),
          lastProposed: null
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

  ///////////////////////////////////////////////////


  constructor() { 
    
    super();
    console.log("Super call");

  }
  ///////////////////////////////////////////////////


  //functions dont update mamny data structure, del not working 

  
  assign_check(assinged: String) {

    console.log("---Assing Check---")

    for (let [key, person] of this.group1Agents.entries()){

      // if assigned then 
      if (person.lastProposed != null){
        if (person.lastProposed.name == assinged){
          console.log("assigned", person.lastProposed.name, key)
          return key
        }
      }
    }
    return null;
  }

  // makes sure noone is assigned to person "free"
  // loop through all people - if they are - assign them to null
  free(person_free: String){

    console.log("---Free Person---")

    for (let [key, person] of this.group1Agents.entries()){

      // if assigned then set to null
      if (person.lastProposed != null){
        if (person.lastProposed.name == person_free){
          console.log(this.group1Agents);
          console.log("Unassigned --- ", key)
          person.lastProposed = null;
          console.log(this.group1Agents);
        }
      }
    }
  }

  // del agent1 from agent2 ranking 
  // del agent2 from agent1 ranking 
  delete_pair(agent1, agent2){

    //need to fix this 
   
    console.log("---Delete---");

    // if (agent1 in agent2.ranking){

    // this.print_rankings(agent2)

    let agent1index = agent2.ranking.indexOf(agent1);
    if (agent1index != -1){
      console.log("Delete --- ", agent1.name, " From ", agent2.name);
      agent2.ranking.splice(agent1index, 1);
    

    }

    // if (agent2 in agent1.ranking){

      
    let agent2index = agent1.ranking.indexOf(agent2);
    if (agent2index != -1){
      console.log("Delete --- ", agent2.name, " From ", agent1.name);
      agent1.ranking.splice(agent2index, 1);
    }
  }

  print_rankings(agent){

    for (let i = 0 ; i < agent.ranking.length ; i++){
      console.log("Element", i, agent.ranking[i])
    }
  }

  

  check_free_agents(){

    let free_agents: Map<String, Person> = new Map();

    for (let [key, person] of this.group1Agents.entries()){

      // if assigned then 
      if (person.lastProposed == null){
        free_agents.set(key, person);
      }
    }
    return free_agents;
  }
  

  match(): AlgorithmData {


    
    let free_agents: Map<String, Person> = new Map();
    free_agents = this.check_free_agents();

    this.update(1);

    while (free_agents.size > 0) {

      this.currentlySelectedAgents = [];
      this.relevantPreferences = [];

      console.log("match.irv");
      console.log(this.freeAgentsOfGroup1);
      console.log(this.group1Agents);

      // data = this.freeAgentsOfGroup1 

    

      //loop through each agent in the list 
      for (let [key, person] of free_agents.entries()){
            
        //let person: Person = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
        console.log("------------------")
        console.log(person);
        // console.log(person.name);
        // console.log(person.ranking);
        // console.log(person.match);
        // console.log(person.lastProposed);

        
        // if there is no more preferances for a agent - no stable matchong exists
        if (person.ranking.length < 1){
          console.log("NO STABLE MATHCING - empty preferance list")
          break;
        }

        //get person's most prefered person - pref
        let pref = person.ranking[0];
        //console.log("Pref check --- ", pref)
        
        //if someone is assigned to their most prefered person, then unassign them and assign current agent to them 
        let check = this.assign_check(pref.name);
        //console.log("check check --- ", check);

        if (check != null){
          this.free(pref.name);
        }
        person.lastProposed = pref;


        // preferances = pref.ranking[i]; = the preferacens of the current agents preferance 
        // loop through preferance list in data 

        
        for (let i = 0 ; i < pref.ranking.length ; i++){
          
          //check for preferacen in list, the ones after this in the list are the ones to remove
          if (pref.ranking[i] == person){
            // remove remaining preferances, in each list 
            // remove (pref, p)

            // pref = index of current preferance for the current agent 
            // p = an index of a person tp remove 

            // need to get splice of list 
            for (let j = i + 1; j < pref.ranking.length ; j++){
              
              console.log("del", pref.ranking[j].name, pref.name)

              let tempagent = pref.ranking[j]

              this.delete_pair(pref, pref.ranking[j]);
           
              this.print_rankings(pref)
              console.log("\n")
              this.print_rankings(tempagent)

            break;
            }
          }
        }

        //person.ranking = person.ranking.slice(0, 3);
        console.log("Before", free_agents);
        free_agents = this.check_free_agents();
        console.log("After", free_agents);

      }
      console.log("END --- ", this.group1Agents);

      console.log("ENDER")
      for (let data of this.group1Agents.values()){
        console.log(data.name, " ---> ", data.lastProposed, data.ranking)
      }
  }

  return;

  }
}


