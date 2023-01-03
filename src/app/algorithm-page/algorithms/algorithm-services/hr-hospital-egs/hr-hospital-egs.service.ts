import { Injectable } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { ExtendedGaleShapley } from '../../abstract-classes/ExtendedGaleShapley';
import { GaleShapley } from '../../abstract-classes/GaleShapley';
import { Agent } from '../../interfaces/Agent';
import { AlgorithmData } from '../../interfaces/AlgorithmData';
import { Hospital } from '../../interfaces/Hospital';

@Injectable({
  providedIn: 'root'
})
export class HrHospitalEgsService extends GaleShapley{

  group1Name = "resident";
  group2Name = "hospital";

  group2Agents: Map<String, Hospital> = new Map();

  hospitalCapacity: Map<string, number> = new Map();

  freeAgentsOfGroup2: Array<String> = new Array();


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

          let availableSpaces = this.getRandomInt(1, this.numberOfAgents-2);

          this.group2Agents.set(group2AgentName, {
              name: group2AgentName,
              match: new Array(),
              ranking: new Array(),
              availableSpaces: availableSpaces
          });

		  console.log(group2AgentName)
		  console.log(this.freeAgentsOfGroup2)

		  this.freeAgentsOfGroup2.push(group2AgentName);

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


// returns next possible resident for a hospital - null if none 
getNextPotentialProposee(hospital: Hospital){

	// for each resident in ranking 
	for (let i = 0 ; i < hospital.ranking.length ; i++){
		let proposee = hospital.ranking[i]

		// if resident is not assigned to hospital - return
		if (proposee.match[0] != hospital) {
			return proposee;
		}
	}
	// return null there are no un assigned residents 
	return null;
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

breakAssignment(resident: Agent, hospital: Hospital): void {

	console.log("break Assignment")
	console.log(resident.match, resident.ranking)

	// remove hospital from resident match 
	resident.match.splice(0, 1);

	// remove resident from hospital match 
	hospital.match.splice(hospital.match.findIndex((agent: { name: string; }) => agent.name == resident.name), 1);

	this.freeAgentsOfGroup1
	
	console.log("After")
	console.log(resident.match, resident.ranking)

	

  }

  provisionallyAssign(resident: Agent, hospital: Hospital) {
	// provisionally assign r to h;

	let agentLastChar = this.getLastCharacter(resident.name);
	let proposeeLastChar = this.getLastCharacter(hospital.name);

	this.removeArrayFromArray(this.currentLines, [agentLastChar, proposeeLastChar, "red"]);

	let greenLine = [agentLastChar, proposeeLastChar, "green"];
	this.currentLines.push(greenLine);

	// this.changePreferenceStyle(this.group1CurrentPreferences, agentLastChar, this.originalGroup1CurrentPreferences.get(agentLastChar).findIndex(h => h == this.getLastCharacter(hospital.name)), "green");
	// this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, this.findPositionInMatches(hospital, resident), "green");

	if (hospital.match.length >= hospital.availableSpaces - 1) {
	  this.algorithmSpecificData["hospitalCapacity"][proposeeLastChar] = "{#53D26F" + this.algorithmSpecificData["hospitalCapacity"][proposeeLastChar] + "}";
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

      // for each successor h' of h on r's list {
          for (let i = worstResidentPosition + 1; i < hospital.ranking.length; i++) {

              let hospitalPosition: number = this.findPositionInMatches(hospital.ranking[i], hospital);
              this.relevantPreferences.push(this.getLastCharacter(hospital.ranking[i].name));

              this.update(10, {"%hospital%": hospital.name, "%nextResident%": hospital.ranking[i].name});

              this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(hospital.ranking[i].name), this.originalGroup1CurrentPreferences.get(this.getLastCharacter(hospital.ranking[i].name)).findIndex(h => h == this.getLastCharacter(hospital.name)), "grey");

              this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), hospitalRankingClearCounter, "grey");
              hospital.ranking[i].ranking.splice(hospitalPosition, 1);
  
              // remove h' and r from each other's lists
              this.update(11, {"%hospital%": hospital.name, "%nextResident%": hospital.ranking[i].name});

              hospital.ranking.splice(i, 1);
              i -= 1;
              
              hospitalRankingClearCounter++;

              this.relevantPreferences.pop();

          }

      }

  }

  print_matches(){

	for (let [key, resident] of this.group1Agents.entries()){
		console.log(key, resident.match)
	}

	for (let [key, hospital] of this.group2Agents.entries()){
		console.log(key, hospital.match)

	}




  }

  shouldContinueMatching(hospital: Hospital): boolean {
	return true;
}

// returns true if there is a resident on the list that is not matched with that hospital 
checkHospitalPreferanceList(hospital: Hospital) {

	for (let resident of hospital.ranking){
		// if they are not matched to the hospital 
		if (resident.match[0] != hospital){
			return true;
		}
	}
	return false;
}

// returns all the hospitals that should be looked at 
// they are undersubbed and there is someone not assigned to them that the hospital wants 
checkFreeHospitals(){

	let freeHospitals = []
	for (let [key, hospital] of this.group2Agents.entries()){

		let hospitalCap = this.algorithmSpecificData["hospitalCapacity"][this.getLastCharacter(hospital.name)]

		// if hospital in undersubbed and there is someone on the list that is not assigned to them 
		if (hospital.match.length < hospitalCap && this.checkHospitalPreferanceList(hospital)){
			freeHospitals.push(hospital.name)
		}
	}

	return freeHospitals
}



  match(): AlgorithmData {
	  

	// this.group1Agents - residents 
	// this.group2Agents - hospitals

	console.log("groups")
	console.log(this.group1Agents, this.group1Agents)

	this.update(1)


	// while a HOSPITAL h is under-subscribed and 
	// h's list contains a a RESIDENT r not assigned to h

	

	while (this.freeAgentsOfGroup2.length > 0){

		// get first hospital on list 
		let currentHospital = this.group2Agents.get(this.freeAgentsOfGroup2[0]);
		
		console.log(currentHospital)

		if (currentHospital.ranking.length <= 0 || !this.getNextPotentialProposee(currentHospital)){
			this.freeAgentsOfGroup2.shift();
		} else {

			// a RESIDENT r that is not assigned to h, but is on its pref list 
			let potentialProposee: Agent = this.getNextPotentialProposee(currentHospital);

			console.log("potentialProposee", potentialProposee)
			
			// if proposee is assigned to a different hospital then un assign

			this.breakAssignment(potentialProposee, currentHospital);

			this.provisionallyAssign(potentialProposee, currentHospital);

			this.removeRuledOutPreferences(potentialProposee, currentHospital);

			this.freeAgentsOfGroup2 = this.checkFreeHospitals()

			// continous loop as guessed + not clear way to define/get free hospitals
			// rankings should be deleted until convergence?

			if (this.shouldContinueMatching(currentHospital)) {
				this.freeAgentsOfGroup1.shift();
			}
		}

	break;

	}



	this.print_matches();


	return;
  }




}
