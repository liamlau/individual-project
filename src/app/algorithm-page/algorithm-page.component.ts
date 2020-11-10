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

  ngOnInit(): void { }

  algorithm = new FormControl('');

  numPeople: number;

  men;
  women;
  freeMen;

  matches = {};

  mySortingFunction(a, b) {
    return a;
  }

  changeAlgorithm() {
    this.playback.firstRun = true;
    this.playback.resetPlaybackData();
    this.numPeople = 5;
  }

  toggle() {
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

}
