import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agent } from 'http';
import { element } from 'protractor';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { CanvasService } from '../../services/canvas/canvas.service';
import { PlaybackService } from '../../services/playback/playback.service';

@Component({
  selector: 'app-edit-preferences-dialog',
  templateUrl: './edit-preferences-dialog.component.html',
  styleUrls: ['./edit-preferences-dialog.component.scss']
})
export class EditPreferencesDialogComponent implements OnInit {

  group1Preferences: Map<string, Array<string>> = new Map();
  group2Preferences: Map<string, Array<string>> = new Map();

  preferences: string = "";

  equalGroups: boolean = false;

  constructor(public algorithmService: AlgorithmRetrievalService, public playbackService: PlaybackService, public canvasService: CanvasService, public dialogRef: MatDialogRef<EditPreferencesDialogComponent>, private _snackBar: MatSnackBar) { }

  @Input() algorithm: Algorithm;


  numberOfGroup1Agents = new FormControl(this.algorithmService.numberOfGroup1Agents, [
    Validators.required,
    Validators.min(1),
    Validators.max(9)
  ]);

  numberOfGroup2Agents = new FormControl(this.algorithmService.numberOfGroup2Agents, [
    Validators.required,
    Validators.min(1),
    Validators.max(9)
  ]);

  preferencesForm: FormControl;
  formString: string;
  missingPreferences: Array<Array<string>>;


  preferenceTextGroup1 = []
  preferenceTextGroup2 = []

  valid: boolean = true;

  @HostListener('document:keydown.enter') 
  onEnter() {
    if (!(this.numberOfGroup1Agents.errors && this.numberOfGroup2Agents.errors)) {
      this.generateAlgorithmPreferences();
    }
  }

  test(id) {
    let a = document.getElementById("lbl").innerHTML
    document.getElementById("lbl").innerHTML = "newlbl"

    console.log("id", a)
    return "hi"
  }

  ngOnInit(): void {

    console.log("before" ,this.group1Preferences)

    this.group1Preferences = this.playbackService.commandList[0]["group1CurrentPreferences"];
    this.group2Preferences = this.playbackService.commandList[0]["group2CurrentPreferences"];

    console.log("after", this.group1Preferences)

    this.preferencesForm = new FormControl(this.preferences);

    if (this.algorithmService.currentAlgorithm.equalGroups) {
      this.equalGroups = true;
    }

    // this.generatePreferenceStringOld();
    this.generatePreferenceString();

    // console.log("formString", this.group1Preferences.keys())

  }


  generatePreferenceString(): void {

    console.log("here", this.group1Preferences)
    console.log("value", this.numberOfGroup1Agents.value)
    console.log("preferenceList", this.preferenceTextGroup1)

    this.preferenceTextGroup1 = []
    this.preferenceTextGroup2 = []

    let preferenceString: string = this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[0]) + "\n";

    this.missingPreferences = [];

    if (this.equalGroups) {
      this.numberOfGroup2Agents.setValue(this.numberOfGroup1Agents.value);
    }

    if (this.algorithmService.numberOfGroup1Agents < this.numberOfGroup1Agents.value || this.algorithmService.numberOfGroup2Agents < this.numberOfGroup2Agents.value) {

      // if value has been changed

      console.log("value chnaged")

      let numbersToAdd: Array<string> = [];
      let lettersToAdd: Array<string> = [];

      for (let i = this.algorithmService.numberOfGroup2Agents + 1; i <= this.numberOfGroup2Agents.value; i++) {
        lettersToAdd.push(String.fromCharCode(i + 64));
      }

      for (let i = this.algorithmService.numberOfGroup1Agents + 1; i <= this.numberOfGroup1Agents.value; i++) {
        numbersToAdd.push(String(i));
      }

      // ADDS TEXT TO TEXT BOXES

      // GROUP 1 //
      // addes pre-generated rankings
      for (let agent of this.group1Preferences) {

        let agentCopy = Object.assign([], agent[1])
        this.preferenceTextGroup1.push(agentCopy)
      }
      // adds new rankings to end of pre-generated rankings
      for (let index = 0 ; index < this.group1Preferences.size ; index++) {
       
        this.preferenceTextGroup1[index] = this.preferenceTextGroup1[index].concat(lettersToAdd)
      }
      // adds new rankings
      for (let i = this.algorithmService.numberOfGroup1Agents; i <= this.numberOfGroup1Agents.value - 1; i++){
        
        let newPreferences = Array.from(this.group1Preferences.values())[0].concat(lettersToAdd).filter(pref => pref.charCodeAt(0) - 64 <= this.numberOfGroup2Agents.value);
        this.shuffle(newPreferences);
        this.preferenceTextGroup1.push(newPreferences)
      }

      // GROUP 2 //
      // addes pre-generated rankings
      for (let agent of this.group2Preferences) {

        let agentCopy = Object.assign([], agent[1])
        this.preferenceTextGroup2.push(agentCopy)
      }
      // adds new rankings to end of pre-generated rankings
      for (let index = 0 ; index < this.group2Preferences.size ; index++) {

        this.preferenceTextGroup2[index] = this.preferenceTextGroup2[index].concat(numbersToAdd)
      }
      // adds new rankings
      for (let i = this.algorithmService.numberOfGroup2Agents; i <= this.numberOfGroup2Agents.value - 1; i++){
       
        let newPreferences = Array.from(this.group2Preferences.values())[0].concat(numbersToAdd).filter(pref => pref.charCodeAt(0) - 64 <= this.numberOfGroup2Agents.value);
        this.shuffle(newPreferences);
        this.preferenceTextGroup2.push(newPreferences)
      }



    } else {
      // ADDS TEXT TO THE TEXT BOXES - if value has not been changed or is lower 

      // GROUP 1 //
      let counter = 0;
      // for each ranking 
      for (let agent of this.group1Preferences) {

        // stop adding rankings if the number added is equal to the number needed 
        if (counter >= this.numberOfGroup1Agents.value) {
          break;
        }
        // filter out values in the ranking which are too large 
        let agentCopy = Object.assign([], agent[1]) //.sort()
        let safe_values = agentCopy.filter(pref => pref.charCodeAt(0) - 64 <= this.numberOfGroup2Agents.value)
        // add rankning 
        this.preferenceTextGroup1.push(safe_values)
        counter++
        }

      // GROUP 2 //
      counter = 0;
      // for each ranking 
      for (let agent of this.group2Preferences) {

        // stop adding rankings if the number added is equal to the number needed 
        if (counter >= this.numberOfGroup2Agents.value) {
          break;
        }
        // filter out values in the ranking which are too large 
        let agentCopy = Object.assign([], agent[1]) //.sort()
        let safe_values = agentCopy.filter(pref => pref <= this.numberOfGroup1Agents.value)
        // add rankning 
        this.preferenceTextGroup2.push(safe_values)
        counter++
        }
      }
        
      
  
      // console.log(this.algorithmService, "name here")

    //   if (this.algorithmService.currentAlgorithm.name != "Stable Roommates Problem" || true) {

    
    //     preferenceString += "\n" + this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[1]) + "\n";
    
    //     counter = 0;
    

    
    //     for (let agent of this.group2Preferences) {
    //       currentLine = "";
    
    //       if (counter < this.numberOfGroup2Agents.value) {
    //         let id: string = agent[0];
    //         let currentPreferences: string[] = agent[1];
    
    //         let newPreferences: string[] = [];
    
    //         for (let preference of currentPreferences) {
    //           if (Number(preference) <= this.numberOfGroup1Agents.value) {
    //             newPreferences.push(preference);
    //           }
    //         }
    
    //         currentLine = id + ": " + newPreferences.join(", ");
    
    
    //         currentLine += "\n";
    //         preferenceString += currentLine;
    //       }
    
    //       counter++;
    
    //     }
    //   }
    
    
    this.formString = preferenceString.slice(0, -1);

  }

  currentInputCheck(): boolean {

    console.log("--------------------------")
    console.log(this.preferenceTextGroup1)

    // CREATES ARRAYS FROM THE STRING
    // GROUP 1 
    for (let index = 0 ; index < this.preferenceTextGroup1.length ; index++) {
      // if input is new/a string - split by comma 
      if (typeof this.preferenceTextGroup1[index] != typeof []) {

        let arr = this.preferenceTextGroup1[index].split(",")
        this.preferenceTextGroup1[index] = arr
      }
    }

    // GROUP 2
    for (let index = 0 ; index < this.preferenceTextGroup2.length ; index++) {
      // if input is new/a string - split by comma 
      if (typeof this.preferenceTextGroup2[index] != typeof []) {

        let arr = this.preferenceTextGroup2[index].split(",")
        this.preferenceTextGroup2[index] = arr
      }
    }

   
    //// VALIDATION 

    /// button is only clickable if this function returns false, if true is returned then button not clickable 
    let valid = true 
    valid = this.isValid()
    console.log(valid)

    return !valid

  }

  generateAlgorithmPreferences(): void {
    
      //// UPDATE REAL PREFERANCES 

    console.log("updatating real prefs")

  
    let preferenceString: string = this.formString;

    console.log("---");
    console.log(preferenceString);

    // fill out new preferences 
    let newPreferences: Map<String, Array<String>> = new Map();

    // console.log(preferenceString.split("\n"));

    // for (let line of preferenceString.split("\n")) {
    //   if (this.checkIfPreference(line)) {
    //     if (this.checkValidity) {
    //       line = line.replace(/:\s+,/g, ':');
    //       line = line.replace(/,\s+,/g, ',');
    //       line = line.replace(/, $/g, '');
    //       line = line.replace(/,$/g, '');
    //       line = line.replace(/\s+/g, '');    // remove whitespace from line from https://stackoverflow.com/questions/24580912/trim-all-white-space-from-string-javascript
    //       let agentId: string = line.slice(0, line.indexOf(":"));
    //       let agentPreferences = line.slice(line.indexOf(":") + 1).split(",");
          
    //       if (agentPreferences.slice().length == 1){
    //         agentPreferences = Array<string>(this.numberOfGroup1Agents.value - 1).fill("1")
    //       }

    //       newPreferences.set(agentId, agentPreferences.slice());

    //       console.log("here", agentPreferences.slice())

    //     }
    //   }
    // }

    // GROUP 1
    let num = 1
    for (let agent of this.preferenceTextGroup1){
      newPreferences.set(num.toString(), agent)
      num++
    }

    //GROUP 2
    num = 1
    for (let agent of this.preferenceTextGroup2){
      newPreferences.set(String.fromCharCode(64 + num), agent)
      num++
    }


    console.log("new prefs", newPreferences)


    var command = this.playbackService.commandList[this.playbackService.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.backgroundColor = "";
    a.style.color = "";

    this.algorithmService.numberOfGroup1Agents = Number(this.numberOfGroup1Agents.value);
    this.algorithmService.numberOfGroup2Agents = Number(this.numberOfGroup2Agents.value);

    this.canvasService.initialise();
    this.playbackService.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents, newPreferences);

    this.dialogRef.close();

    this._snackBar.open("Preferences changed", "Dismiss", {
      duration: 2000,
    });


  }

  // function to disable/enable button - false = enabled / true = disabled 
  isValid(): boolean {
    
    // values that should be in each list 
    // letters 


    let numbers= []
    let letters = []
    this.missingPreferences = []

    let lettersValid = true
    let numbersValid = true

    // Gets all letters/numbers that should be in each preference 
    for (let i = 1; i <= this.numberOfGroup2Agents.value; i++) {
      letters.push(String.fromCharCode(i + 64));
    }
    for (let i = 1; i <= this.numberOfGroup1Agents.value; i++) {
      numbers.push(String(i));
    }

    // GROUP 1
    for (let [key, ranking] of this.preferenceTextGroup1.entries()) {
      for (let char of letters) {
        if (!ranking.includes(char)){
          // letter in ranking that is not supposed to be 
          lettersValid =  false

          //input missing preferences 
          this.missingPreferences.push([key + 1, char])
        }
      }
      // checks for smae size 
      if (ranking.length != letters.length) {
        lettersValid = false
      }
    }

    // GROUP 2
    for (let [key, ranking] of this.preferenceTextGroup2.entries()) {
      for (let num of numbers) {
        if (!ranking.includes(num)){
          // letter in ranking that is not supposed to be 
          numbersValid =  false

          //input missing preferences 
          this.missingPreferences.push([String.fromCharCode(65 + key), num]) //
        }
      }
      // checks for smae size 
      if (ranking.length != letters.length) {
        numbersValid = false
      }
    }


    return (lettersValid && numbersValid)
  }
  
  checkIfPreference(str: string): boolean {
    let re = /^.:/;
    return re.test(str);
  }

  checkValidity(str: string): boolean {
    return true;
  }


  generateMissingPreferences(preferenceString) {


    console.log("---------------------")
    console.log(preferenceString)

    let newPreferences: Map<string, Array<string>> = new Map();
    this.missingPreferences = [];


    // dont check for SR
    if (this.algorithmService.currentAlgorithm.name == "Stable Roommates Problem"){
      return;
    }

    for (let line of preferenceString.split("\n")) {
      if (this.checkIfPreference(line)) {
        if (this.checkValidity) {
          line = line.replace(/:\s+,/g, ':');
          line = line.replace(/,\s+,/g, ',');
          line = line.replace(/, $/g, '');
          line = line.replace(/,$/g, '');
          line = line.replace(/\s+/g, '');    // remove whitespace from line from https://stackoverflow.com/questions/24580912/trim-all-white-space-from-string-javascript
          let agentId: string = line.slice(0, line.indexOf(":"));
          let agentPreferences = line.slice(line.indexOf(":") + 1).split(",");
          
          newPreferences.set(agentId, agentPreferences.slice());

        }
      }
    }

    // console.log(newPreferences);
    // console.log("\n\n");

    this.valid = true;

    // let missingPreferences: Array<Array<string>> = [];

    for (let agent of newPreferences) {
      // let currentPreferences: Array<string> = agent[1];
      let agentId: string = agent[0];
      let currentPreferences: string[] = agent[1];
      let isGroup1: boolean = isNaN(Number(agentId));

      // console.log(agentId);
      // console.log(currentPreferences);
      // console.log(isGroup1);

      // console.log("\n");

      for (let i = 1; i <= (isGroup1 ? this.numberOfGroup1Agents.value : this.numberOfGroup2Agents.value); i++ ) {
        // console.log(isGroup1 ? i : String.fromCharCode(i + 64));
        let currentNumInPreference = false;
        for (let preference of currentPreferences) {
          // console.log(isGroup1 ? String(i) : String.fromCharCode(i + 64));
          // console.log(preference);
          if (((isGroup1 ? String(i) : String.fromCharCode(i + 64)) == preference)) {
            // console.log("here");
            // boolean array?
            currentNumInPreference = true;
          }
        }
        if (!currentNumInPreference) {
          // console.log("(" + agentId + ", " + (isGroup1 ? String(i) : String.fromCharCode(i + 64)) + ")");
          // console.log([agentId, (isGroup1 ? String(i) : String.fromCharCode(i + 64))])
          // console.log([(isGroup1 ? String(i) : String.fromCharCode(i + 64)), agentId]);
          // console.log([agentId, (isGroup1 ? String(i) : String.fromCharCode(i + 64))] == ["1", "D"]);

          // console.log(this.checkArrayEquality([agentId, (isGroup1 ? String(i) : String.fromCharCode(i + 64))], ["1", "D"]));

          let added: boolean = false;

          for (let preference of this.missingPreferences) {
            if (this.checkArrayEquality(preference, [(isGroup1 ? String(i) : String.fromCharCode(i + 64)), agentId])) {
              added = true;
              console.log("???");
              console.log(this.missingPreferences.indexOf(preference));
              this.missingPreferences.splice(this.missingPreferences.indexOf(preference), 1);
            }
          }

          if (!added) {
            this.missingPreferences.push([agentId, (isGroup1 ? String(i) : String.fromCharCode(i + 64))]);
          }

          // if (missingPreferences.includes([(isGroup1 ? String(i) : String.fromCharCode(i + 64)), agentId])) {
          //   missingPreferences.splice(missingPreferences.indexOf([(isGroup1 ? String(i) : String.fromCharCode(i + 64)), agentId]), 1);
          // } else {
          //   missingPreferences.push([agentId, (isGroup1 ? String(i) : String.fromCharCode(i + 64))]);
          // }
          // console.log("make valid = false here!");
        }
      }


      // console.log("-----------");



    }
    // console.log(this.group1Preferences);
    this.valid = this.missingPreferences.length == 0;
    console.log(this.missingPreferences);
    console.log(this.valid);

  }


  // this will be new 

  // [1, 2, 3, 4]
  // [4, 3, 2, 1]

  // [1, 4], [1, 3], [1, 2], [1, 1]
  // false, false, false, true

    // FROM: https://javascript.info/task/shuffle
  shuffle(array: Array<Object>) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


  checkArrayEquality(a: Array<string>, b: Array<string>) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }


  trackByFn(index, item) {
    return index;  
  }

}
