import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  constructor(public algorithmService: AlgorithmRetrievalService, public playbackService: PlaybackService) { }

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
  }

  generatePreferenceString(): string {

    let preferenceString: string = this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[0]) + "\n";
    let currentLine: string = "";

    for (let agent of this.group1Preferences) {
      currentLine = "";

      let id: string = agent[0];
      let currentPreferences: string = agent[1].join(", ");

      currentLine = id + ": " + currentPreferences;

      currentLine += "\n";
      preferenceString += currentLine;
    }

    preferenceString += "\n" + this.algorithmService.pluralMap.get(this.algorithmService.currentAlgorithm.orientation[1]) + "\n";

    for (let agent of this.group2Preferences) {
      currentLine = "";

      let id: string = agent[0];
      let currentPreferences: string = agent[1].join(", ");

      currentLine = id + ": " + currentPreferences;

      currentLine += "\n";
      preferenceString += currentLine;
    }

    return preferenceString.slice(0, -1);

  }

  generateAlgorithmPreferences(): void {
    let preferenceString: string = this.preferencesForm.value;
    let newPreferences: Map<String, Array<String>> = new Map();

    console.log(preferenceString.split("\n"));

    for (let line of preferenceString.split("\n")) {
      if (this.checkIfPreference(line)) {
        if (this.checkValidity) {
          line = line.replace(/\s+/g, '');    // remove whitespace from line from https://stackoverflow.com/questions/24580912/trim-all-white-space-from-string-javascript
          let agentId: string = line.slice(0, line.indexOf(":"));
          let agentPreferences = line.slice(line.indexOf(":") + 1).split(",");
          
          newPreferences.set(agentId, agentPreferences);

        }
      }
    }

    this.algorithmService.numberOfGroup1Agents = Number(this.numberOfGroup1Agents.value);
    this.algorithmService.numberOfGroup2Agents = Number(this.numberOfGroup2Agents.value);

    this.playbackService.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents, newPreferences);

  }
  
  checkIfPreference(str: string): boolean {
    let re = /^.:/;
    return re.test(str);
  }

  checkValidity(str: string): boolean {
    return true;
  }

}
