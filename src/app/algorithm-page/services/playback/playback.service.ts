import { Injectable } from '@angular/core';
import { ExecutionService } from '../execution/execution.service';
import { CanvasService } from '../canvas/canvas.service';

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

  constructor(public exeService: ExecutionService, public drawService: CanvasService) { }

  initialise(): void {
    this.algorithmData = {};
    this.commandList = [];
    this.currentCommand = {};
  }

  resetPlaybackData(): void {
    this.firstRun = true;
    this.stepCounter = 0;
    this.previousStepCounter = 0;
    this.currentLine = 0;
    this.pause = true;

    this.description = "Click play to run the program below!";
  }

  setAlgorithm(algorithm: string, numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents, preferences: Map<String, Array<String>> = null, SRstable: boolean = true): void {

    this.initialise();
    console.log("Set algorithm", SRstable)
    this.algorithmData = this.exeService.getExecutionFlow(algorithm, numberOfAgents, numberOfGroup2Agents, preferences, SRstable);
    this.commandList = this.algorithmData["commands"];
    this.resetPlaybackData();
    this.numCommands = this.commandList.length-1;

    // console.log(this.algorithmData);
    this.updateCurrentCommand();

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
    this.drawService.redrawCanvas(this.currentCommand);
  }


  restart(): void {
    this.pause = true;
    this.uncolourCurrentLine();
    this.stepCounter = 0;
    this.updateCurrentCommand();
    this.colourCurrentLine();
  }

  goToEnd(): void {
    this.pause = true;
    this.uncolourCurrentLine();
    this.stepCounter = this.numCommands;
    this.updateCurrentCommand();
    this.colourCurrentLine();
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

  async toggle() {
    if (this.firstRun) {
      this.firstRun = false;
      this.pause = false;
      this.play();
    } else {
      if (this.pause) {
        this.pause = false;
        this.play();
      } else {
        this.pause = true;
      }
    }
  }

  async play(): Promise<void> {
    while (this.stepCounter < this.numCommands) {

      if (this.pause) {
        console.log("Paused at step " + (this.stepCounter) + "!");
        console.log("Current Line: " + this.currentLine);
        break;
      }

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


  uncolourCurrentLine(): void {
    let codeLineHTML = document.getElementById("line" + this.currentLine);
    codeLineHTML.style.backgroundColor = "";
    codeLineHTML.style.color = "";
  }

  colourCurrentLine(): void {
    let codeLineHTML = document.getElementById("line" + this.currentLine);
    codeLineHTML.style.backgroundColor = "black";
    codeLineHTML.style.color = "#37FF00";
  }


  onSliderChange(val: number) {

    if (this.firstRun) {
      this.firstRun = false;
    }

    if (this.previousStepCounter != this.stepCounter) {
      this.previousStepCounter = this.stepCounter;
    }

    this.pause = true;

    this.stepCounter = val;

    var command = this.commandList[this.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.backgroundColor = "";
    a.style.color = "";

    this.updateCurrentCommand();
    
    this.colourCurrentLine();
  }


  // unboldenVariables(): void {

  //   var command = this.commandList[this.stepCounter-1];
  //   let changeTrace = command["changeTrace"]["embolden"];

  //   console.log(changeTrace);

  //   for (let className of changeTrace) {
  //     let a = document.getElementsByClassName(className);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: normal;");
  //     }
  //   }
  // }

  // unboldenPreviousVariables(): void {

  //   var command = this.commandList[this.previousStepCounter];
  //   let changeTrace = command["changeTrace"]["embolden"];

  //   console.log(changeTrace);

  //   for (let className of changeTrace) {
  //     let a = document.getElementsByClassName(className);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: normal;");
  //     }
  //   }
  // }

  // unboldenCurrentVariables(): void {

  //   var command = this.commandList[this.stepCounter];
  //   let changeTrace = command["changeTrace"]["embolden"];

  //   console.log(changeTrace);

  //   for (let className of changeTrace) {
  //     let a = document.getElementsByClassName(className);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: normal;");
  //     }
  //   }
  // }


  // emboldenVariables(): void {

  //   var command = this.commandList[this.stepCounter];
  //   let changeTrace = command["changeTrace"]["embolden"];

  //   for (let className of changeTrace) {
  //     let a = document.getElementsByClassName(className);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: bold;");
  //     }
  //   }
  // }

}
