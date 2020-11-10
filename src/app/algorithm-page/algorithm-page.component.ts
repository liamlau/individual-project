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

  changeAlgorithm() {
    console.log("here");
    console.log(this.playback.pause);
    this.playback.firstRun = true;
    this.playback.resetPlaybackData();
    // this.commandList = [];
    // this.commandListCounter = 0;
  
    // this.currentLine = 0;
    // this.pause = false;
  
    this.numPeople = 5;

    // this.firstRun = true;
    // this.animate = true;
  
    // this.returnText = "Click play to run the program below!";
    // this.matches = {};
    // this.freeMen = [];
  }

  toggle() {

    console.log(this.playback.stepCounter + " | " + this.playback.numCommands);
    if (this.playback.stepCounter >= this.playback.numCommands) {
      this.playback.pause = false;
      this.playback.pause = true;
    } else {
      if (this.playback.firstRun) {
        this.playback.setAlgorithm(this.algorithm.value, 5);
        this.playback.firstRun = false;
        this.playback.pause = false;
        this.playback.play();
      } else {
        if (this.playback.pause) {
          this.playback.pause = false;
          this.playback.play();
        } else {
          this.playback.pause = true;
        }
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
    }

    this.playback.pause = true;

    this.playback.stepCounter = val;

    var command = this.playback.commandList[this.playback.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.color = "";
    
    this.playback.updateCurrentCommand();
    
    this.playback.colourCurrentLine();
  }

  restart() {
    this.playback.restart();
    // this.pause = true;
    // let a = document.getElementById("line" + this.currentLine);
    // a.style.color = "";
    // this.unboldenVariables();
    // this.commandListCounter = 0;
    // this.currentLine = 1;
    // this.returnText = this.descriptions[0];
    // this.matches = this.commandList[this.commandListCounter]["matches"];
    // this.freeMen = this.commandList[this.commandListCounter]["freeMen"];
    // a = document.getElementById("line" + this.currentLine);
    // a.style.color = "#37FF00";
  }

  goToEnd() {
    this.playback.goToEnd();
    // this.pause = true;
    // this.unboldenVariables();
    // let a = document.getElementById("line" + this.currentLine);
    // a.style.color = "";
    // this.commandListCounter = this.numCommands;

    // var command = this.commandList[this.numCommands];

    // this.returnText = this.descriptions[this.commandListCounter];
    // this.matches = this.commandList[this.commandListCounter]["matches"];
    // this.freeMen = this.commandList[this.commandListCounter]["freeMen"];

    // this.currentLine = command["lineNumber"];
    // a = document.getElementById("line" + this.currentLine);
    // a.style.color = "#37FF00";
    // this.emboldenVariables();
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


  // unboldenVariables(): void {

  //   var command = this.commandList[this.commandListCounter];
  //   let changeTrace = command["changeTrace"]["reset"];

  //   console.log(changeTrace);

  //   for (let className of changeTrace) {
  //     let a = document.getElementsByClassName(className);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: normal;");
  //     }
  //   }
  // }


  // emboldenVariables(): void {

  //   var command = this.commandList[this.commandListCounter];
  //   let changeTrace = command["changeTrace"]["embolden"];

  //   for (let className of changeTrace) {
  //     let a = document.getElementsByClassName(className);
  //     for (let i = 0; i < a.length; i++) {
  //       a[i].setAttribute("style", "font-weight: bold;");
  //     }
  //   }
  // }

}
