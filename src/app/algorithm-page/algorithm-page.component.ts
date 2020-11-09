import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExecutionService } from './algorithms/execution.service';
import { PlaybackService } from './playback.service';

@Component({
  selector: 'app-algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.scss']
})
export class AlgorithmPageComponent implements OnInit {

  constructor(public exeService: ExecutionService, public playback: PlaybackService) { }

  ngOnInit(): void {
  }

  algorithmData;

  firstRun: boolean = true;

  commandList: any[] = [];
  commandListCounter: number = 0;
  numCommands: number = 0;

  currentLine: number = 0;
  timeInBetween: number = 500;
  pause: Boolean = false;
  prevStep: number = 0;

  algorithm = new FormControl('');

  numPeople: number;

  descriptions = [];

  returnText = "Click play to run the program below!";

  animate = false;

  men;
  women;
  freeMen;

  matches = {};

  mySortingFunction(a, b) {
    return a;
  }

  toggleAnimateStop(){
    this.animate = true;
  }

  toggleAnimatePlay(){
    this.animate = false;
  }

  changeAlgorithm() {
    this.commandList = [];
    this.commandListCounter = 0;
  
    this.currentLine = 0;
    this.pause = false;
  
    this.numPeople = 5;

    this.firstRun = true;
    this.toggleAnimatePlay();
  
    this.returnText = "Click play to run the program below!";
    this.matches = {};
    this.freeMen = [];
  }

  toggle() {
    
    if (this.firstRun) {
      this.playback.setAlgorithm(this.algorithm.value, this.numPeople);

      var algorithmData = this.exeService.getExecutionFlow(this.algorithm.value, this.numPeople);
      this.algorithmData = algorithmData;
      this.freeMen = algorithmData["commands"]["freeMen"];
      this.men = algorithmData["men"];
      this.women = algorithmData["women"];
      this.commandList = algorithmData["commands"];
      this.matches = this.commandList["matches"];
      // this.commandList = algorithmData[0]
      this.descriptions = algorithmData["descriptions"];
      this.numCommands = this.commandList.length - 1;
      this.firstRun = false;
      this.playback.play();
    } else {
      if (this.playback.pause) {
        this.playback.pause = false;
        this.playback.play();
      } else {
        this.pauseExecution();
      }
    }
  }

  formatLabel(value: number) {

    // pause
    value = 3050 - value;
    // play? (maybe not cause so many changes to this.timeInBetween value)

    if (value >= 1000) {
      return Math.round(value / 1000) + 's';
    }

    return value;
  }

  updateSpeed(val: number): void {
    this.playback.speed = 3050 - val;
  }

  formatSteps(val: number) {

    if (this.playback.previousStepCounter != this.playback.stepCounter) {
      this.playback.previousStepCounter = this.playback.stepCounter;
      this.playback.pause = true;
    }

    this.playback.stepCounter = val;

    var command = this.playback.commandList[this.playback.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.color = "";

    this.playback.updateCurrentCommand();
    
    this.playback.colourCurrentLine();
  }

  async play(): Promise<void> {
    
    // while (this.playback.stepCounter < this.playback.numCommands) {

    //   if (this.playback.pause) {
    //     console.log("Paused at step " + (this.playback.stepCounter) + "!");
    //     console.log("Current Line: " + this.playback.currentLine);
    //     break;
    //   }

    //   // if (this.algorithm.value == "gale-shapley") {
    //   //   this.unboldenVariables();
    //   //   this.emboldenVariables();
    //   // }

    //   this.playback.colourCurrentLine();

    //   await this.sleep(this.timeInBetween);

    //   if (!this.playback.pause) {
    //     if (!(this.playback.stepCounter >= this.playback.numCommands)) {
    //       this.playback.uncolourCurrentLine();
    //       this.playback.stepCounter++;
    //       this.playback.updateCurrentCommand();
    //     } else {
    //       this.playback.pause = true;
    //     }
    //   }

    // }

  }


  // async play(): Promise<void> {
    
  //   while (this.commandListCounter < this.commandList.length) {

  //     if (this.pause) {
  //       console.log("Paused at step " + (this.commandListCounter+1) + "!");
  //       console.log("Current Line: " + this.currentLine);
  //       this.toggleAnimatePlay();
  //       break;
  //     }

  //     this.toggleAnimateStop();

  //     if (this.algorithm.value == "gale-shapley") {
  //       this.unboldenVariables();
  //       this.emboldenVariables();
  //     }

  //     this.colorLine();

  //     await this.sleep(this.timeInBetween);

  //     if (!this.pause) {
  //       if (!(this.commandListCounter >= this.commandList.length - 1)) {
  //         let a = document.getElementById("line" + this.currentLine);
  //         a.style.color = "";
  //         this.commandListCounter++;
  //       } else {
  //         // this.toggleAnimateStop();
  //         console.log(this.animate);
  //         this.pause = true;
  //       }
  //     }

  //   }

  // }

  restart() {
    this.pause = true;
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";
    this.unboldenVariables();
    this.commandListCounter = 0;
    this.currentLine = 1;
    this.returnText = this.descriptions[0];
    this.matches = this.commandList[this.commandListCounter]["matches"];
    this.freeMen = this.commandList[this.commandListCounter]["freeMen"];
    a = document.getElementById("line" + this.currentLine);
    a.style.color = "#37FF00";
    this.toggleAnimatePlay();
  }

  goToEnd() {
    this.pause = true;
    this.unboldenVariables();
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";
    this.commandListCounter = this.numCommands;

    var command = this.commandList[this.numCommands];

    this.returnText = this.descriptions[this.commandListCounter];
    this.matches = this.commandList[this.commandListCounter]["matches"];
    this.freeMen = this.commandList[this.commandListCounter]["freeMen"];

    this.currentLine = command["lineNumber"];
    a = document.getElementById("line" + this.currentLine);
    a.style.color = "#37FF00";
    this.emboldenVariables();
    this.toggleAnimatePlay();
  }

  pauseExecution() {
    if (this.playback.stepCounter < this.playback.numCommands) {
      this.playback.pause = true;
      // this.toggleAnimatePlay();
    }
  }

  backStep() {
    this.playback.backStep();

  }

  forwardStep() {

    this.playback.forwardStep();

    // let a = document.getElementById("line" + this.currentLine);
    // a.style.color = "";

    // if (this.commandListCounter < this.commandList.length-1) {
    //   this.commandListCounter++;
    // }

    // this.colorLine();

  }


  unboldenVariables(): void {

    var command = this.commandList[this.commandListCounter];
    let changeTrace = command["changeTrace"]["reset"];

    console.log(changeTrace);

    for (let className of changeTrace) {
      let a = document.getElementsByClassName(className);
      for (let i = 0; i < a.length; i++) {
        a[i].setAttribute("style", "font-weight: normal;");
      }
    }
  }


  emboldenVariables(): void {

    var command = this.commandList[this.commandListCounter];
    let changeTrace = command["changeTrace"]["embolden"];

    for (let className of changeTrace) {
      let a = document.getElementsByClassName(className);
      for (let i = 0; i < a.length; i++) {
        a[i].setAttribute("style", "font-weight: bold;");
      }
    }
  }


  colorLine(): void {
    var command = this.commandList[this.commandListCounter];

    this.returnText = this.descriptions[this.commandListCounter];

    this.matches = command["matches"];
    this.freeMen = command["freeMen"];

    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.color = "#37FF00";
    this.currentLine = command["lineNumber"];
  }


  async sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

}
