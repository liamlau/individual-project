import { Injectable } from '@angular/core';
import { ExtendedGaleShapley } from '../abstract-classes/ExtendedGaleShapley';
import { Agent } from '../interfaces/Agent';
import { Hospital } from '../interfaces/Hospital';

@Injectable({
  providedIn: 'root'
})
export class EgsResidentHSService extends ExtendedGaleShapley {

  group1Name = "residents";
  group2Name = "hospitals";

  group2Agents: Map<String, Hospital> = new Map();


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

      for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
          let group2AgentName = this.group2Name + i;

          this.group2Agents.set(group2AgentName, {
              name: group2AgentName,
              match: new Array(),
              ranking: new Array(),
              availableSpaces: this.getRandomInt(1, this.numberOfGroup2Agents-2)
          });
      }
  }


  getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min)
  }


  getWorstResident(hospital: Hospital): Agent {

      let positionMap: Map<number, Agent> = new Map();

      for (let resident of hospital.match) {
          positionMap.set(this.findPositionInMatches(hospital, resident), resident);
      }

      // use destructuring assingment to extract data from array into distinct variables
      // return the worst resident from the hospital's matches
      return positionMap.get(Math.max(...Array.from(positionMap.keys())));
  }


  getNextPotentialProposee(hospital: Hospital): Agent {
      // return first hospital on r's list
      return hospital.ranking[0];
  }

  breakAssignment(resident: Agent, hospital: Hospital): void {
      if (hospital.match.length >= hospital.availableSpaces) {
          let worstResident = this.getWorstResident(hospital);
          let matchPosition = this.findPositionInMatches(hospital, worstResident);
          worstResident.match.splice(0, 1);
          hospital.match.splice(matchPosition, 1);
      }
  }

  provisionallyAssign(resident: Agent, hospital: Hospital) {
      // provisionally assign r to h;
      this.update(8);
      resident.match[0] = hospital;
      hospital.match.push(resident);
  }

  removeRuledOutPreferences(resident: Agent, hospital: Hospital): void {
      if (hospital.match.length >= hospital.availableSpaces) {
          let worstResident: Agent = this.getWorstResident(hospital);
          let worstResidentPosition: number = this.findPositionInMatches(hospital, worstResident);

      // for each successor h' of h on r's list {
          this.update(9);
          for (let i = worstResidentPosition + 1; i < hospital.ranking.length; i++) {

              let hospitalPosition: number = this.findPositionInMatches(worstResident, hospital);

              hospital.ranking[i].ranking.splice(hospitalPosition, 1);
  
              // remove h' and r from each other's lists
              this.update(10);
  
              hospital.ranking.splice(i, 1);
              i -= 1;
          }

      }

  }


  shouldContinueMatching(hospital: Hospital): boolean {
      // let residentList: Array<Agent> = hospital.ranking.filter(agent => agent.match[0] != hospital);

      // return (hospital.match.length >= hospital.availableSpaces || residentList.length == 0);
      return true;
  }



}