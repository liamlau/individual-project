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
  firstRun: boolean = true;
  stepCounter: number;
  previousStepCounter: number;
  currentLine: number;
  numCommands: number;
  pause: boolean = true;
  speed: number = 500;

  description: string = "Click play to run the program below!";

  constructor(public exeService: ExecutionService) { }

  resetPlaybackData(): void {
    this.firstRun = true;
    this.stepCounter = 0;
    this.previousStepCounter = 0;
    this.currentLine = 0;
    this.pause = true;

    this.description = "Click play to run the program below!";
  }

  setAlgorithm(algorithm: string, numPeople: number): void { 
    this.algorithmData = this.exeService.getExecutionFlow(algorithm, numPeople);
    this.commandList = this.algorithmData["commands"];
    this.resetPlaybackData();
    this.numCommands = this.commandList.length-1;

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

  async play(): Promise<void> {
    while (this.stepCounter < this.numCommands) {

      if (this.pause) {
        console.log("Paused at step " + (this.stepCounter) + "!");
        console.log("Current Line: " + this.currentLine);
        break;
      }

      // if (this.algorithm.value == "gale-shapley") {
      //   this.unboldenVariables();
      //   this.emboldenVariables();
      // }

      this.colourCurrentLine();

      await this.sleep(this.speed);

      if (!this.pause) {
        // console.log(this.stepCounter + " | " + this.numCommands);
        this.uncolourCurrentLine();
        this.stepCounter++;
        this.updateCurrentCommand();
        if (this.stepCounter >= this.numCommands) {
          this.pause = true;
        }
      }

    }
  }

  async sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

}
