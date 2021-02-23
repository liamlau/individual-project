import { Injectable } from '@angular/core';
import { ExtendedGaleShapley } from '../abstract-classes/ExtendedGaleShapley';
import { Agent } from '../interfaces/Agent';
import { Hospital } from '../interfaces/Hospital';

@Injectable({
  providedIn: 'root'
})
export class EgsResidentHSService extends ExtendedGaleShapley {

  group1Name = "resident";
  group2Name = "hospital";

  group2Agents: Map<String, Hospital> = new Map();

  hospitalCapacity: Map<string, number> = new Map();

  numberOfLines = 12;

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

          let availableSpaces = this.getRandomInt(1, this.numberOfGroup2Agents-2);

          this.group2Agents.set(group2AgentName, {
              name: group2AgentName,
              match: new Array(),
              ranking: new Array(),
              availableSpaces: availableSpaces
          });

          this.hospitalCapacity[currentLetter] = availableSpaces;

          currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
      }
      this.algorithmSpecificData["hospitalCapacity"] = this.hospitalCapacity;
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

    this.update(4, {"%hospital%": hospital.name, "%capacity%": hospital.availableSpaces, "%resident%": resident.name});
    if (hospital.match.length >= hospital.availableSpaces) {
        let worstResident = this.getWorstResident(hospital);
        this.update(5, {"%hospital%": hospital.name, "%worstResident%": worstResident.name});

        // console.log(worstResident + " chosen as the worst resident in " + hospital + "\'s matches");

        let matchPosition = this.findPositionInMatches(hospital, worstResident);
        // console.log("Position of %o: %o", worstResident, matchPosition);

        // console.log("worst resident: %o", worstResident);
        // console.log("current hospital: %o", hospital);

        // this.changePreferenceStyle(this.group1CurrentPreferences, agentLastChar, this.findPositionInMatches(resident, hospital), "green");
        // this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, matchPosition, "green");
        this.removeArrayFromArray(this.currentLines, [this.getLastCharacter(worstResident.name), this.getLastCharacter(hospital.name), "green"]);

        this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(worstResident.name), this.originalGroup1CurrentPreferences.get(this.getLastCharacter(worstResident.name)).findIndex(h => h == this.getLastCharacter(hospital.name)), "grey");
        this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), matchPosition, "grey");

        this.freeAgentsOfGroup1.push(worstResident.name);
        // console.log(worstResident.match);

        hospital.match.splice(hospital.match.findIndex((agent: { name: string; }) => agent.name == worstResident.name), 1);
        hospital.ranking.splice(matchPosition, 1);

        worstResident.match.splice(0, 1);
        worstResident.ranking.splice(this.findPositionInMatches(worstResident, hospital), 1);

        let hospitalLastChar = this.getLastCharacter(hospital.name);
        let currentHospitalCapacity: string = this.algorithmSpecificData["hospitalCapacity"][hospitalLastChar];

        this.algorithmSpecificData["hospitalCapacity"][hospitalLastChar] = String(currentHospitalCapacity).charAt(currentHospitalCapacity.length - 2);

        this.update(6, {"%hospital%": hospital.name, "%worstResident%": worstResident.name});

    }
  }

  provisionallyAssign(resident: Agent, hospital: Hospital) {
      // provisionally assign r to h;

      let agentLastChar = this.getLastCharacter(resident.name);
      let proposeeLastChar = this.getLastCharacter(hospital.name);

      this.removeArrayFromArray(this.currentLines, [agentLastChar, proposeeLastChar, "red"]);

      let greenLine = [agentLastChar, proposeeLastChar, "green"];
      this.currentLines.push(greenLine);

      this.changePreferenceStyle(this.group1CurrentPreferences, agentLastChar, this.originalGroup1CurrentPreferences.get(agentLastChar).findIndex(h => h == this.getLastCharacter(hospital.name)), "green");
      this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, this.findPositionInMatches(hospital, resident), "green");

      if (hospital.match.length >= hospital.availableSpaces - 1) {
        this.algorithmSpecificData["hospitalCapacity"][proposeeLastChar] = "{#53D26F" + this.algorithmSpecificData["hospitalCapacity"][proposeeLastChar] + "}";
        // console.log(this.algorithmSpecificData);
      }

      this.update(7, {"%resident%": resident.name, "%hospital%": hospital.name});
      resident.match[0] = hospital;
      hospital.match.push(resident);
  }

  removeRuledOutPreferences(resident: Agent, hospital: Hospital): void {

    this.update(8, {"%resident%": resident.name, "%hospital%": hospital.name});

      if (hospital.match.length >= hospital.availableSpaces) {
          let worstResident: Agent = this.getWorstResident(hospital);
          let worstResidentPosition: number = this.findPositionInMatches(hospital, worstResident);

          this.update(9, {"%hospital%": hospital.name, "%worstResident%": worstResident.name});

          let hospitalRankingClearCounter: number = worstResidentPosition + 1;

          console.log("---------------------------------------------");
          console.log(hospital.name);
      // for each successor h' of h on r's list {
          for (let i = worstResidentPosition + 1; i < hospital.ranking.length; i++) {

              let hospitalPosition: number = this.findPositionInMatches(hospital.ranking[i], hospital);
              this.relevantPreferences.push(this.getLastCharacter(hospital.ranking[i].name));

              this.update(10, {"%hospital%": hospital.name, "%nextResident%": hospital.ranking[i].name});
              console.log(hospital.ranking[i].name)
              console.log("---- " + hospitalPosition + " ----");
              console.log(hospital.ranking[i].ranking[hospitalPosition]);

              this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(hospital.ranking[i].name), this.originalGroup1CurrentPreferences.get(this.getLastCharacter(hospital.ranking[i].name)).findIndex(h => h == this.getLastCharacter(hospital.name)), "grey");

              this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), hospitalRankingClearCounter, "grey");
            //   this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), i+1, "grey");
              hospital.ranking[i].ranking.splice(hospitalPosition, 1);
  
              // remove h' and r from each other's lists
              this.update(11, {"%hospital%": hospital.name, "%nextResident%": hospital.ranking[i].name});

            //   console.log("%o removed from " + hospital.name + "\'s rankings", hospital.ranking[i]);
              hospital.ranking.splice(i, 1);
              i -= 1;
              
              hospitalRankingClearCounter++;

            //   console.log("Selected: " + this.getLastCharacter(hospital.ranking[i].name));
              this.relevantPreferences.pop();

          }

      }

  }


  shouldContinueMatching(hospital: Hospital): boolean {
      // let residentList: Array<Agent> = hospital.ranking.filter(agent => agent.match[0] != hospital);

      // return (hospital.match.length >= hospital.availableSpaces || residentList.length == 0);
      return true;
  }



}