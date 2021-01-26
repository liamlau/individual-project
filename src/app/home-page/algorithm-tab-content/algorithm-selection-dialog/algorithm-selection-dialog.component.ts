import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Algorithm } from '../Algorithm';
import { AlgorithmRetrievalService } from '../algorithm-retrieval.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-algorithm-selection-dialog',
  templateUrl: './algorithm-selection-dialog.component.html',
  styleUrls: ['./algorithm-selection-dialog.component.scss', '../../home-page.component.scss']
})
export class AlgorithmSelectionDialogComponent implements OnInit {

  algorithm: Algorithm;

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

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData, public algorithmService: AlgorithmRetrievalService) { 
    this.algorithm = dialogData.algorithm;
  }

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
