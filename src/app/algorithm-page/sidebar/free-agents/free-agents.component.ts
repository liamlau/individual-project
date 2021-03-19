import { Component, OnInit } from '@angular/core';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { PlaybackService } from '../../services/playback/playback.service';

@Component({
  selector: 'free-agents',
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.scss', '../sidebar.component.scss']
})
export class FreeAgentsComponent implements OnInit {

  constructor(
    public playback: PlaybackService,  // injecting the playback service
    public algorithmService: AlgorithmRetrievalService) {}  // injecting the algorithm service) { }

  ngOnInit(): void {
  }

}
