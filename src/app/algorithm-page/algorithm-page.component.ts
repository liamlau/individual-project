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

}
