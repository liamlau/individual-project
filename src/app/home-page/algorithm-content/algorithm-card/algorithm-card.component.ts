import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { Algorithm } from '../../algorithm-tab-content/Algorithm';
import { MyErrorStateMatcher } from '../../algorithm-tab-content/algorithm-selection-dialog/algorithm-selection-dialog.component';

@Component({
  selector: 'algorithm-card',
  templateUrl: './algorithm-card.component.html',
  styleUrls: ['./algorithm-card.component.scss', '../../home-page.component.scss', '../../home-content/home-content.component.scss']
})
export class AlgorithmCardComponent implements OnInit {

  @Input() algorithm: Algorithm;


  numberOfGroup1Agents = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(10)
  ]);

  numberOfGroup2Agents = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(10)
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public algorithmService: AlgorithmRetrievalService) { }

  ngOnInit(): void {
  }

  // on clicking "Generate Preferences" change the global algorithm to the one passed into this dialog
  onGeneratePreferences(): void {
    this.algorithmService.currentAlgorithm = this.algorithm;
    this.algorithmService.numberOfGroup1Agents = this.numberOfGroup1Agents.value;
    if (this.numberOfGroup2Agents.value == '') {
      this.algorithmService.numberOfGroup2Agents = this.numberOfGroup1Agents.value;
    } else {
      this.algorithmService.numberOfGroup2Agents = this.numberOfGroup2Agents.value;
    }
  }

}
