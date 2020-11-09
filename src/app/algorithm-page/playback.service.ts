import { Injectable } from '@angular/core';
import { ExecutionService } from './algorithms/execution.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  // algorithm data variables
  public algorithmData: Object;
  commandList: Array<Object>;
  currentCommand: Object;

  // playback variables
  firstRun: boolean;
  stepCounter: number;
  previousStepCounter: number;
  currentLine: number;
  numCommands: number;
  speed: number;

  description: string;

  constructor(public exeService: ExecutionService) { }

  resetPlaybackData(): void {
    this.firstRun = true;
    this.stepCounter = 0;
    this.previousStepCounter = 0;
    this.currentLine = 0;
    this.numCommands = this.commandList.length-1;
    this.speed = 500;
  }

  setAlgorithm(algorithm: string, numPeople: number): void { 
    this.algorithmData = this.exeService.getExecutionFlow(algorithm, numPeople);
    this.commandList = this.algorithmData["commands"];
    this.resetPlaybackData();

    console.log(this.algorithmData);
    this.updateCurrentCommand();
    console.log(this.description);

  }

  setSpeed(milliseconds: number) {
    this.speed = milliseconds;
  }

  updateCurrentCommand(): void {
    if (this.previousStepCounter != this.stepCounter) {
      this.previousStepCounter = this.stepCounter;
    }

    this.currentCommand = this.algorithmData["commands"][this.stepCounter];
    this.description = this.algorithmData["descriptions"][this.stepCounter];
    this.currentLine = this.currentCommand["lineNumber"];
  }


  backStep(): void {
    this.uncolourCurrentLine();
    if (this.stepCounter > 0) { this.stepCounter--; }
    this.updateCurrentCommand();
    this.colourCurrentLine(); 
  }

  forwardStep(): void {
    this.uncolourCurrentLine();
    if (this.stepCounter < this.numCommands) { this.stepCounter++; }
    this.updateCurrentCommand();
    this.colourCurrentLine();
  }

  uncolourCurrentLine(): void {
    let codeLineHTML = document.getElementById("line" + this.currentLine);
    codeLineHTML.style.color = "";
  }

  colourCurrentLine(): void {
    let codeLineHTML = document.getElementById("line" + this.currentLine);
    codeLineHTML.style.color = "#37FF00";
  }

}
