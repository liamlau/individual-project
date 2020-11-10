import { Component, Input, OnInit } from '@angular/core';
import { PlaybackService } from '../playback.service';

@Component({
  selector: 'playback-controls',
  templateUrl: './playback-controls.component.html',
  styleUrls: ['./playback-controls.component.scss']
})
export class PlaybackControlsComponent implements OnInit {

  @Input() algorithm: string;
  @Input() numPeople: number;

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void {
  }

  toggle() {
    if (this.playback.firstRun) {
      this.playback.setAlgorithm(this.algorithm, this.numPeople);
      // this.playback.setAlgorithm(this.algorithm, this.numPeople);
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
