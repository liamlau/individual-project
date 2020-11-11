import { Component, OnInit } from '@angular/core';
import { PlaybackService } from 'src/app/algorithm-page/playback.service';

@Component({
  selector: 'gs-variables',
  templateUrl: './gs-variables.component.html',
  styleUrls: ['./gs-variables.component.scss']
})
export class GsVariablesComponent implements OnInit {

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void {
  }

  mySortingFunction(a, b) {
    return a;
  }

}
