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

          let availableSpaces = 2 //this.getRandomInt(1, this.numberOfAgents-2);

          this.group2Agents.set(group2AgentName, {
              name: group2AgentName,
              match: new Array(),
              ranking: new Array(),
              availableSpaces: availableSpaces
          });

		//   console.log(group2AgentName)
		//   console.log(this.freeAgentsOfGroup2)

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
// one that is not assigned to the hospital and is on the hospitals preferance list
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

breakAssignment(resident: Agent, hospital): void {

	// console.log("break Assignment")
	// console.log(resident.name, resident.match[0].name, hospital.name)

	

	// get pos in each rankings lists to remove later 
	let matchPosition_resident = this.findPositionInMatches(hospital, resident);
	let matchPosition_hospital = this.findPositionInMatches(resident, hospital);

	let matchPosition_resident_original = this.findPositionInOriginalMatchesGroup2(hospital, resident);

	// console.log(matchPosition_resident, matchPosition_hospital)
	// console.log(hospital.ranking)
	
	this.removeArrayFromArray(this.currentLines, [this.getLastCharacter(resident.name), this.getLastCharacter(hospital.name), "green"]);

	this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(resident.name), this.originalGroup1CurrentPreferences.get(this.getLastCharacter(resident.name)).findIndex(h => h == this.getLastCharacter(hospital.name)), "grey");
	this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), matchPosition_resident_original, "red");

	let hospitalLastChar = this.getLastCharacter(hospital.name);
	this.algorithmSpecificData["hospitalCapacity"][hospitalLastChar] = "{#000000" + String(hospital.availableSpaces) + "}";

	// unassign r and h'
	this.update(5, {"%oldHospital%": resident.match[0].name, "%resident%": resident.name});

	this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), matchPosition_resident_original, "grey");

	this.update(1)

	// remove hospital from resident match 
	resident.match.splice(0, 1);
	// remove resident from hospital match 
	hospital.match.splice(hospital.match.findIndex((agent: { name: string; }) => agent.name == resident.name), 1);

	// REMOVE EACH OTHER FROM RANKING LIST 
	hospital.ranking.splice(matchPosition_resident, 1); 	// HOSPITAL 
	resident.ranking.splice(matchPosition_hospital, 1) 		//RESIDENT 

	

	







	// console.log("rankings after - h / r")
	// console.log(hospital.ranking, resident.ranking)




	

  }

  provisionallyAssign(resident: Agent, hospital: Hospital) {
	// provisionally assign r to h;

	let agentLastChar = this.getLastCharacter(resident.name);
	let proposeeLastChar = this.getLastCharacter(hospital.name);

	this.removeArrayFromArray(this.currentLines, [agentLastChar, proposeeLastChar, "red"]);

	let greenLine = [agentLastChar, proposeeLastChar, "green"];
	this.currentLines.push(greenLine);

	this.changePreferenceStyle(this.group1CurrentPreferences, agentLastChar, this.originalGroup1CurrentPreferences.get(agentLastChar).findIndex(h => h == this.getLastCharacter(hospital.name)), "green");
	// this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, this.findPositionInMatches(hospital, resident), "green");
	this.changePreferenceStyle(this.group2CurrentPreferences, proposeeLastChar, this.originalGroup2CurrentPreferences.get(proposeeLastChar).findIndex(h => h == this.getLastCharacter(resident.name)), "green")

	if (hospital.match.length >= hospital.availableSpaces - 1) {
	  this.algorithmSpecificData["hospitalCapacity"][proposeeLastChar] = "{#53D26F" + String(hospital.availableSpaces) + "}";
	}


	resident.match[0] = hospital;
	hospital.match.push(resident);
}

removeRuledOutPreferences(resident: Agent, hospital: Hospital): void {

    // given h and r - remove h' of h on r's list 

	let hospitalPosition: number = this.findPositionInMatches(resident, hospital)

	if (hospitalPosition + 1 < resident.ranking.length) {
		

		// console.log("Del Before")
		// console.log(this.group1Agents) //res 
		// console.log(this.group2Agents) // hos

		// for each successor h' of h on r's list 
		this.update(7, {"%resident%" : resident.name, "%hospital%" : hospital.name});

		for (let i = hospitalPosition + 1; i < resident.ranking.length ; i++){


			// current hospital being removed 
			let removedHospital = resident.ranking[i]
			
			// resident index within hospital to be removed 
			let residentIndex: number = this.findPositionInMatches(removedHospital, resident) 
	

			removedHospital.ranking.splice(residentIndex, 1)

			// remove hsopital from resident 
			resident.ranking.splice(i, 1)

			// console.log("Iteration", i)
			// console.log("Del", removedHospital.name, resident.name)
			// console.log(hospitalPosition, hospital.ranking.length)
			// console.log(resident.ranking, removedHospital.ranking)

			// console.log("new")
			// console.log(this.group1CurrentPreferences)

			// get index of resident in the removde hospitals og rankings 
			let pos = this.originalGroup2CurrentPreferences.get(this.getLastCharacter(removedHospital.name)).findIndex(h => h == this.getLastCharacter(resident.name))

			//  grey out hos from res 
			this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(resident.name), i, "grey")
			// grey out res from hos 
			this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(removedHospital.name), pos, "grey")

			// remove h' and r from each others preferance list
			this.update(8, {"%hospital%": removedHospital.name, "%resident%": resident.name});

			// this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(hospital.ranking[i].name), this.originalGroup1CurrentPreferences.get(this.getLastCharacter(hospital.ranking[i].name)).findIndex(h => h == this.getLastCharacter(hospital.name)), "grey");
			// this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), hospitalRankingClearCounter, "grey");
			


		}
	}

	console.log("Del After")
	console.log(this.group1Agents)
	console.log(this.group2Agents)


     
  }

  removeRuledOutPreferencesOld(resident: Agent, hospital: Hospital): void {

    
 
	if (hospital.match.length >= hospital.availableSpaces) {
		let worstResident: Agent = this.getWorstResident(hospital);
		let worstResidentPosition: number = this.findPositionInMatches(hospital, worstResident);

		


		let hospitalRankingClearCounter: number = worstResidentPosition + 1;

		// for each successor h' of h on r's list 
	  this.update(7, {"%resident%" : resident.name, "%hospital%" : hospital.name});
	  
		for (let i = worstResidentPosition + 1; i < hospital.ranking.length; i++) {

			let hospitalPosition: number = this.findPositionInMatches(hospital.ranking[i], hospital);
			this.relevantPreferences.push(this.getLastCharacter(hospital.ranking[i].name));

			this.changePreferenceStyle(this.group1CurrentPreferences, this.getLastCharacter(hospital.ranking[i].name), this.originalGroup1CurrentPreferences.get(this.getLastCharacter(hospital.ranking[i].name)).findIndex(h => h == this.getLastCharacter(hospital.name)), "grey");
			this.changePreferenceStyle(this.group2CurrentPreferences, this.getLastCharacter(hospital.name), hospitalRankingClearCounter, "grey");
			
			// remove r' and h from each others preferance list
			this.update(8, {"%hospital%": hospital.name, "%resident%": hospital.ranking[i].name});

			hospital.ranking[i].ranking.splice(hospitalPosition, 1);


			hospital.ranking.splice(i, 1);
			i -= 1;
			
			hospitalRankingClearCounter++;

			this.relevantPreferences.pop();

		}

	}

}

  print_matches(){

	for (let [key, resident] of this.group1Agents.entries()){
		// console.log(key, resident.match)
	}

	for (let [key, hospital] of this.group2Agents.entries()){
		// console.log(key, hospital.match)

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

		let hospitalCap = hospital.availableSpaces
		let rankingsLeftLen = hospital.ranking.length

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

	// console.log("groups")
	// console.log(this.group1Agents, this.group1Agents)

	// "Set each hospital and resident to be completely free",
	this.update(1)


	// while a HOSPITAL h is under-subscribed and 
	// h's list contains a a RESIDENT r not assigned to h

	let counter_break = 0

	while (this.freeAgentsOfGroup2.length > 0){
		

		// get first hospital on list 
		let currentHospital = this.group2Agents.get(this.freeAgentsOfGroup2[0]);
		
		// "While some hospital h is - undersubscibed, 
		// and has a resident r on h's preferance list that is no assigned to h",
		this.update(2, {"%hospital%" : currentHospital.name});

		// console.log(currentHospital)

		if (currentHospital.ranking.length <= 0 || !this.getNextPotentialProposee(currentHospital)){
			this.freeAgentsOfGroup2.shift();
		} else {

			let potentialProposee: Agent = this.getNextPotentialProposee(currentHospital);

			// a RESIDENT r that is not assigned to h, but is on its pref list 
			// "r := first resident on h's prefernace list not assigned to h",
			this.update(3, {"%resident%" : potentialProposee.name})
			
			// console.log("potentialProposee", potentialProposee)
			
			// if proposee is assigned to a different hospital then un assign
			
			// if r is assigned to another hospital h
			this.update(4, {"%resident%" : potentialProposee.name})
			
			if (potentialProposee.match[0] != null){
				this.breakAssignment(potentialProposee, potentialProposee.match[0]);
			}

			
			// provisionally assign r to h
			this.provisionallyAssign(potentialProposee, currentHospital);
			this.update(6, {"%resident%" : potentialProposee.name, "%hospital%" : currentHospital.name})


			this.removeRuledOutPreferences(potentialProposee, currentHospital);

			this.freeAgentsOfGroup2 = this.checkFreeHospitals()

			// continous loop as guessed + not clear way to define/get free hospitals
			// rankings should be deleted until convergence?

			// break;

			if (this.shouldContinueMatching(currentHospital)) {
				this.freeAgentsOfGroup1.shift();
			}

			
		}


	// breaking to stop infinite loop 
	// break;

	counter_break = counter_break + 1;
	// console.log(counter_break > 20)

	
	 
	if (counter_break > 200){
		console.log("Done ---- Done ----")
		// break;
		}

		console.log("END")
		console.log(this.algorithmSpecificData["hospitalCapacity"])
		console.log(this.group2Agents)
		console.log(this.group1Agents)

		

	}

	// stable matching found 
	this.update(9)
	this.print_matches();
	return;
  }

}

// MAY PRODUCE UNSTABLE MATCHINGS DUE TO BLOCKING PAIRS - CHECKED BY WEBAPP
// OTHER ISSUES - SOME HOSPITALS/RESIDENTS ARE NOT MACTHED DUE To TAKEN BY OTHER HOSPITALS
// AND THEIR PREFERANCE LIST BEING EMPTYED BY PREVOUIS STEPS 

// NEEDS RESEARCJ TO FIX - I THINK I PRODUCES 