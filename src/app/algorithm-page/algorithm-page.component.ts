import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExecutionService } from '../shared/execution.service';

@Component({
  selector: 'app-algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.scss']
})
export class AlgorithmPageComponent implements OnInit {

  constructor(public exeService: ExecutionService) { }

  ngOnInit(): void {
  }

  firstRun: boolean = true;

  commandList: any[] = [];
  commandMap: Map<number, string>;
  commandListCounter: number = 0;
  numCommands: number = 0;

  currentLine: number = 0;
  timeInBetween: number = 500;
  pause: Boolean = false;
  prevStep: number = 0;

  algorithm = new FormControl('');

  numPeople = 5;

  returnText = "Click start to run the program below!";

  animate = false;

  toggleAnimateStop(){
    this.animate = true;
  }

  toggleAnimatePlay(){
    this.animate = false;
  }

  toggle() {
    if (this.firstRun) {
      var algorithmData = this.exeService.getExecutionFlow(this.algorithm.value, this.numPeople);
      this.commandList = algorithmData[0];
      this.commandMap = algorithmData[1];
      this.numCommands = this.commandList.length - 1;
      this.firstRun = false;
      this.play()
    } else {
      if (this.pause) {
        this.pause = false;
        this.play()
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
    this.timeInBetween = 3050 - val;
  }

  formatSteps(val: number) {

    if (this.prevStep != this.commandListCounter) {
      this.prevStep = this.commandListCounter;
      this.pause = true;
    }

    this.commandListCounter = val;

    var commandNum: number;
    var command = this.commandList[this.prevStep];

    if (command instanceof Object) {
      commandNum = Number(Object.keys(command)[0]);
      this.returnText = this.generateMessage(commandNum, command[Object.keys(command)[0]]);
    } else {
      commandNum = command;
      this.returnText = this.commandMap[commandNum];
    }

    let a = document.getElementById("line" + commandNum);
    a.style.color = "";
    
    this.colorLine();
  }

  changeAlgorithm() {
    this.commandList = [];
    this.commandMap = new Map<number, string>();
    this.commandListCounter = 0;
  
    this.currentLine = 0;
    this.timeInBetween = 500;
    this.pause = false;
  
    this.numPeople = 5;

    this.firstRun = true;
    this.toggleAnimatePlay();
  
    this.returnText = "Click start to run the program below!";
  }

  executeFunction(): void {
    if (!this.pause) {
      var algorithmData = this.exeService.getExecutionFlow(this.algorithm.value, this.numPeople);
      this.commandList = algorithmData[0];
      this.commandMap = algorithmData[1];
    } else {
      this.pause = false;
    }

    this.play();
  }

  async play(): Promise<void> {
    
    while (this.commandListCounter < this.commandList.length) {

      if (this.pause) {
        console.log("Paused at step " + (this.commandListCounter+1) + "!");
        console.log("Current Line: " + this.currentLine);
        this.toggleAnimatePlay();
        break;
      }

      this.toggleAnimateStop();

      this.colorLine();

      await this.sleep(this.timeInBetween);

      if (!this.pause) {
        if (!(this.commandListCounter >= this.commandList.length - 1)) {
          let a = document.getElementById("line" + this.currentLine);
          a.style.color = "";
          this.commandListCounter++;
        } else {
          // this.toggleAnimateStop();
          console.log(this.animate);
          this.pause = true;
        }
      }

    }

  }

  restart() {
    this.pause = true;
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";
    this.commandListCounter = 0;
    this.currentLine = 1;
    this.returnText = this.commandMap["1"];
    a = document.getElementById("line" + this.currentLine);
    a.style.color = "#37FF00";
    this.toggleAnimatePlay();
  }

  goToEnd() {
    this.pause = true;
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";
    this.commandListCounter = this.numCommands;

    var commandNum: number;
    var command = this.commandList[this.numCommands];

    if (command instanceof Object) {
      commandNum = Number(Object.keys(command)[0]);
      this.returnText = this.generateMessage(commandNum, command[Object.keys(command)[0]]);
    } else {
      commandNum = command;
      this.returnText = this.commandMap[commandNum];
    }

    this.currentLine = commandNum;
    this.returnText = this.commandMap[commandNum];
    a = document.getElementById("line" + this.currentLine);
    a.style.color = "#37FF00";
    this.toggleAnimatePlay();
  }

  pauseExecution() {
    if (this.commandListCounter < this.commandList.length-1) {
      this.pause = true;
      // this.toggleAnimatePlay();
    }
  }

  backStep() {
    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";

    if (this.commandListCounter > 0) {
      this.commandListCounter--;
    }

    this.colorLine();

  }

  forwardStep() {

    let a = document.getElementById("line" + this.currentLine);
    a.style.color = "";

    if (this.commandListCounter < this.commandList.length-1) {
      this.commandListCounter++;
    }

    this.colorLine();

  }

  colorLine(): void {
    var commandNum: number;
    var command = this.commandList[this.commandListCounter];

    if (command instanceof Object) {
      commandNum = Number(Object.keys(command)[0]);
      this.returnText = this.generateMessage(commandNum, command[Object.keys(command)[0]]);
    } else {
      commandNum = command;
      this.returnText = this.commandMap[commandNum];
    }

    let a = document.getElementById("line" + commandNum);
    a.style.color = "#37FF00";
    this.currentLine = commandNum;
  }


  generateMessage(commandNum: number, replacements: Object): string {

    var str = this.commandMap[commandNum];

    // FROM: https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions
    str = str.replace(/%\w+%/g, function(all: string | number) {
      return replacements[all] || all;
    });

    return str;
  }

  async sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

}
