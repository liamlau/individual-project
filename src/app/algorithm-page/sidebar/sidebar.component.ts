import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { AlgorithmAnimationService } from '../animations/algorithm-animation.service';
import { CanvasService } from '../canvas/canvas.service';
import { PlaybackService } from '../playback/playback.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() showCode: boolean;
  @Input() tutorialStep: number;

  constructor(
    public playback: PlaybackService,  // injecting the playback service
    public algorithmService: AlgorithmRetrievalService,  // injecting the algorithm service
    public drawService: CanvasService,  // injecting the canvas service
    public animation: AlgorithmAnimationService,
    public utils: UtilsService,
    public dialog: MatDialog,  // injecting the dialog component
    public router: Router  // injecting the router service (for programmatic route navigation)
  ) { }

  ngOnInit(): void {
  }

}
