import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { PlaybackService } from '../playback.service';

declare var anime: any;

@Component({
  selector: 'playback-controls',
  templateUrl: './playback-controls.component.html',
  styleUrls: ['./playback-controls.component.scss']
})
export class PlaybackControlsComponent implements OnInit {

  @Input() algorithm: string;

  constructor(public playback: PlaybackService, public algService: AlgorithmRetrievalService) { }

  ngOnInit(): void {
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
