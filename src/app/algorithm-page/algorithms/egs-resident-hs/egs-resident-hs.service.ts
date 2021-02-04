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

      let currentLetter = 'A';

      for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
          let group2AgentName = this.group2Name + currentLetter;

          this.group2Agents.set(group2AgentName, {
              name: group2AgentName,
              match: new Array(),
              ranking: new Array(),
              availableSpaces: this.getRandomInt(1, this.numberOfGroup2Agents-2)
          });

          currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
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

    this.update(4);
    if (hospital.match.length >= hospital.availableSpaces) {
        let worstResident = this.getWorstResident(hospital);
        this.update(5, {"%worstResident%": worstResident.name});

        // console.log(worstResident + " chosen as the worst resident in " + hospital + "\'s matches");

        let matchPosition = this.findPositionInMatches(hospital, worstResident);
        // console.log("Position of " + worstResident + ": " + matchPosition);

        // console.log("worst resident: %o", worstResident);
        // console.log("current hospital: %o", hospital);

        worstResident.match.splice(0, 1);
        hospital.match.splice(matchPosition, 1);

        this.update(6);

    }
  }

  provisionallyAssign(resident: Agent, hospital: Hospital) {
      // provisionally assign r to h;

      this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(resident.name), this.findPositionInMatches(resident, hospital), "green");
      this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), this.findPositionInMatches(hospital, resident), "green");

      this.update(7, {"%resident%": resident.name, "%hospital%": hospital.name});
      resident.match[0] = hospital;
      hospital.match.push(resident);
  }

  removeRuledOutPreferences(resident: Agent, hospital: Hospital): void {

    this.update(8, {"%hospital%": hospital.name});

      if (hospital.match.length >= hospital.availableSpaces) {
          let worstResident: Agent = this.getWorstResident(hospital);
          let worstResidentPosition: number = this.findPositionInMatches(hospital, worstResident);

          this.update(9, {"%worstResident%": worstResident.name});

      // for each successor h' of h on r's list {
          for (let i = worstResidentPosition + 1; i < hospital.ranking.length; i++) {

              let hospitalPosition: number = this.findPositionInMatches(hospital.ranking[i], hospital);

              this.update(10, {"%nextResident%": hospital.ranking[i].name});

              // console.log("------" + "RANKINGS FOR " + hospital.ranking[i].name);

              for (let hName of Object.assign([], hospital.ranking[i].ranking)) {
                // console.log(hName.name);
            }

            // console.log("------");

              hospital.ranking[i].ranking.splice(hospitalPosition, 1);
              
              for (let hName of Object.assign([], hospital.ranking[i].ranking)) {
                  // console.log(hName.name);
              }
              // console.log("------");
  
              // remove h' and r from each other's lists
              this.update(11, {"%hospital%": hospital.name, "%nextResident%": hospital.ranking[i].name});

              // console.log("%o removed from " + hospital.name + "\'s rankings", hospital.ranking[i]);
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