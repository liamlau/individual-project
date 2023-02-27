import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { Algorithm } from '../../../Algorithm';

declare var anime: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


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
    Validators.max(9),
  ]);

  numberOfGroup2Agents = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(9)
  ]);


  evenOnly(event): boolean {

    if (event.key == "enter"){
      return true
    }
  
    if (["2", "4", "6", "8", "1", "0"].includes(event.key)) {
      return true
    }

    return false
  }

  // matcher = new MyErrorStateMatcher();

  constructor(public algorithmService: AlgorithmRetrievalService, public router: Router) { }

  ngOnInit(): void {
  }


  // on clicking "Generate Preferences" change the global algorithm to the one passed into this dialog
  async onGeneratePreferences(): Promise<void> {
    this.algorithmService.currentAlgorithm = this.algorithm;
    this.algorithmService.numberOfGroup1Agents = this.numberOfGroup1Agents.value;
    if (this.numberOfGroup2Agents.value == '') {
      this.algorithmService.numberOfGroup2Agents = this.numberOfGroup1Agents.value;
    } else {
      this.algorithmService.numberOfGroup2Agents = this.numberOfGroup2Agents.value;
    }


    anime({
      targets: '.main-page',
      easing: 'easeOutQuint',
      opacity: [1, 0],
      duration: 500
    })

    anime({
      targets: '.navbar',
      easing: 'easeOutQuint',
      translateY: [0, -150],
      opacity: [1, 0],
      delay: 300,
      duration: 500
    })

    await this.delay(700);

    this.router.navigateByUrl("/animation", { skipLocationChange: true });
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
