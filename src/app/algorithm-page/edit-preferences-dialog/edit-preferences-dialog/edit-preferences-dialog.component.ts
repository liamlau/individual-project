import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { PlaybackService } from '../../playback.service';

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

  constructor(public algorithmService: AlgorithmRetrievalService, public playbackService: PlaybackService, public dialogRef: MatDialogRef<EditPreferencesDialogComponent>, private _snackBar: MatSnackBar) { }

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

  ngOnInit(): void {
    this.group1Preferences = this.playbackService.commandList[0]["group1CurrentPreferences"];
    this.group2Preferences = this.playbackService.commandList[0]["group2CurrentPreferences"];

    this.preferences = this.generatePreferenceString();

    this.preferencesForm = new FormControl(this.preferences);

    if (this.algorithmService.numberOfGroup1Agents == this.algorithmService.numberOfGroup2Agents) {
      this.equalGroups = true;
    }

  }

  generatePreferenceString(): string {

    let preferenceString: string = this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[0]) + "\n";
    let currentLine: string = "";

    let counter: number = 0;

    for (let agent of this.group1Preferences) {
      currentLine = "";

      if (counter < this.numberOfGroup1Agents.value) {
        let id: string = agent[0];
        let currentPreferences: string[] = agent[1];

        let newPreferences: string[] = [];

        for (let preference of currentPreferences) {
          if (preference.charCodeAt(0) - 65 < this.numberOfGroup1Agents.value) {
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

    if (this.equalGroups) {
      this.numberOfGroup2Agents.setValue(this.numberOfGroup1Agents.value);
    }

    for (let agent of this.group2Preferences) {
      currentLine = "";

      if (counter < this.numberOfGroup2Agents.value) {
        let id: string = agent[0];
        let currentPreferences: string[] = agent[1];

        let newPreferences: string[] = [];

        for (let preference of currentPreferences) {
          if (Number(preference) <= this.numberOfGroup2Agents.value) {
            newPreferences.push(preference);
          }
        }

        currentLine = id + ": " + newPreferences.join(", ");


        currentLine += "\n";
        preferenceString += currentLine;
      }

      counter++;

    }

    return preferenceString.slice(0, -1);

  }

  generateAlgorithmPreferences(): void {
    let preferenceString: string = this.generatePreferenceString();
    let newPreferences: Map<String, Array<String>> = new Map();

    console.log(preferenceString.split("\n"));

    for (let line of preferenceString.split("\n")) {
      if (this.checkIfPreference(line)) {
        if (this.checkValidity) {
          line = line.replace(/\s+/g, '');    // remove whitespace from line from https://stackoverflow.com/questions/24580912/trim-all-white-space-from-string-javascript
          let agentId: string = line.slice(0, line.indexOf(":"));
          let agentPreferences = line.slice(line.indexOf(":") + 1).split(",");
          
          newPreferences.set(agentId, agentPreferences.slice());

        }
      }
    }

    this.algorithmService.numberOfGroup1Agents = Number(this.numberOfGroup1Agents.value);
    this.algorithmService.numberOfGroup2Agents = Number(this.numberOfGroup2Agents.value);

    console.log(newPreferences);

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

}
