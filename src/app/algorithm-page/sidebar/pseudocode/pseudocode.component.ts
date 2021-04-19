import { Component, OnInit } from '@angular/core';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { PlaybackService } from '../../services/playback/playback.service';

@Component({
  selector: 'pseudocode',
  templateUrl: './pseudocode.component.html',
  styleUrls: ['./pseudocode.component.scss', '../sidebar.component.scss']
})
export class PseudocodeComponent implements OnInit {

  algorithm: string;
  animate: boolean = true;

  constructor(public playback: PlaybackService, public algService: AlgorithmRetrievalService) { }

  ngOnInit(): void {
    this.algorithm = this.algService.currentAlgorithm.id;
  }

}
