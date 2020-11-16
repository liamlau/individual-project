import { Component, Input, OnInit } from '@angular/core';
import { PlaybackService } from '../playback.service';

@Component({
  selector: 'code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.scss']
})
export class CodeDisplayComponent implements OnInit {

  @Input() algorithm: string;
  animate: boolean = true;

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void {
  }

  toggleExpansion() {
    this.animate = !this.animate;
  }

}
