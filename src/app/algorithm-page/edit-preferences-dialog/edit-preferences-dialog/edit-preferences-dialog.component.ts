import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  valid: boolean = true;

  @HostListener('document:keydown.enter') 
  onEnter() {
    if (!(this.numberOfGroup1Agents.errors && this.numberOfGroup2Agents.errors)) {
      this.generateAlgorithmPreferences();
    }
  }

  ngOnInit(): void {
    this.group1Preferences = this.playbackService.commandList[0]["group1CurrentPreferences"];
    this.group2Preferences = this.playbackService.commandList[0]["group2CurrentPreferences"];

    this.preferencesForm = new FormControl(this.preferences);

    if (this.algorithmService.currentAlgorithm.equalGroups) {
      this.equalGroups = true;
    }

    this.generatePreferenceString();
    // console.log(this.formString)

  }

  generatePreferenceString(): void {

    let preferenceString: string = this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[0]) + "\n";
    let currentLine: string = "";

    let counter: number = 0;

    this.missingPreferences = [];

    if (this.equalGroups) {
      this.numberOfGroup2Agents.setValue(this.numberOfGroup1Agents.value);
    }

    if (this.algorithmService.numberOfGroup1Agents < this.numberOfGroup1Agents.value || this.algorithmService.numberOfGroup2Agents < this.numberOfGroup2Agents.value) {

      let numbersToAdd: Array<string> = [];
      let lettersToAdd: Array<string> = [];

      for (let i = this.algorithmService.numberOfGroup2Agents + 1; i <= this.numberOfGroup2Agents.value; i++) {
        lettersToAdd.push(String.fromCharCode(i + 64));
      }

      for (let i = this.algorithmService.numberOfGroup1Agents + 1; i <= this.numberOfGroup1Agents.value; i++) {
        numbersToAdd.push(String(i));
      }

      for (let agent of this.group1Preferences) {
        if (Number(agent[0]) <= this.numberOfGroup1Agents.value) {
          currentLine = "";
          this.shuffle(lettersToAdd);
  
          let id: string = agent[0];
          let newPreferences: string[] = agent[1].filter(pref => pref.charCodeAt(0) - 64 <= this.numberOfGroup2Agents.value).concat(lettersToAdd);
  
          currentLine = id + ": " + newPreferences.join(", ");
    
          currentLine += "\n";
          preferenceString += currentLine;
        }
      }

      for (let i = this.algorithmService.numberOfGroup1Agents + 1; i <= this.numberOfGroup1Agents.value; i++) {
        let newPreferences = Array.from(this.group1Preferences.values())[0].concat(lettersToAdd).filter(pref => pref.charCodeAt(0) - 64 <= this.numberOfGroup2Agents.value);
        this.shuffle(newPreferences);
        currentLine = i + ": " + newPreferences.join(", ");
        currentLine += "\n";
        preferenceString += currentLine;
      }

      preferenceString += "\n" + this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[1]) + "\n";


      for (let agent of this.group2Preferences) {
        if (Number(agent[0].charCodeAt(0) - 64) <= this.numberOfGroup2Agents.value) {
          currentLine = "";
          this.shuffle(numbersToAdd);

          let id: string = agent[0];
          let newPreferences: string[] = agent[1].filter(pref => pref <= this.numberOfGroup1Agents.value).concat(numbersToAdd);

          currentLine = id + ": " + newPreferences.join(", ");
    
          currentLine += "\n";
          preferenceString += currentLine;
        }
      }

      // console.log(this.numberOfGroup2Agents.value);
      for (let i = this.algorithmService.numberOfGroup2Agents + 1; i <= this.numberOfGroup2Agents.value; i++) {
        let newPreferences = (Array.from(this.group2Preferences.values())[0].concat(numbersToAdd)).filter(pref => pref <= this.numberOfGroup1Agents.value);
        this.shuffle(newPreferences);
        currentLine = String.fromCharCode(i + 64) + ": " + newPreferences.join(", ");
        currentLine += "\n";
        preferenceString += currentLine;
      }

    } else {
      for (let agent of this.group1Preferences) {
        currentLine = "";
  
        if (counter < this.numberOfGroup1Agents.value) {
          let id: string = agent[0];
          let currentPreferences: string[] = agent[1];
  
          let newPreferences: string[] = [];
  
          for (let preference of currentPreferences) {
            if (preference.charCodeAt(0) - 65 < this.numberOfGroup2Agents.value) {
              newPreferences.push(preference);
            }
          }
    
          currentLine = id + ": " + newPreferences.join(", ");
  
          currentLine += "\n";
          preferenceString += currentLine;
        }
  
        counter++;
  
      }
  
      preferenceString += "\n" + this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[1]) + "\n";
  
      counter = 0;
  

  
      for (let agent of this.group2Preferences) {
        currentLine = "";
  
        if (counter < this.numberOfGroup2Agents.value) {
          let id: string = agent[0];
          let currentPreferences: string[] = agent[1];
  
          let newPreferences: string[] = [];
  
          for (let preference of currentPreferences) {
            if (Number(preference) <= this.numberOfGroup1Agents.value) {
              newPreferences.push(preference);
            }
          }
  
          currentLine = id + ": " + newPreferences.join(", ");
  
  
          currentLine += "\n";
          preferenceString += currentLine;
        }
  
        counter++;
  
      }
    }
    
    this.formString = preferenceString.slice(0, -1);

  }

  generateAlgorithmPreferences(): void {
    let preferenceString: string = this.formString;

    console.log("---");
    console.log(preferenceString);

    let newPreferences: Map<String, Array<String>> = new Map();

    console.log(preferenceString.split("\n"));

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
  
  checkIfPreference(str: string): boolean {
    let re = /^.:/;
    return re.test(str);
  }

  checkValidity(str: string): boolean {
    return true;
  }


  generateMissingPreferences(preferenceString) {

    let newPreferences: Map<string, Array<string>> = new Map();
    this.missingPreferences = [];

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

}
