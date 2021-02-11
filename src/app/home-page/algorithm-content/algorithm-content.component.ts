import { Component, OnInit } from '@angular/core';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { simpleFadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-algorithm-content',
  templateUrl: './algorithm-content.component.html',
  styleUrls: ['./algorithm-content.component.scss', '../home-page.component.scss', '../home-content/home-content.component.scss'],
  animations: [
    simpleFadeAnimation
  ]
})
export class AlgorithmContentComponent implements OnInit {

  constructor(public algorithmRetrieval: AlgorithmRetrievalService) { }

  ngOnInit(): void {
  }

}
