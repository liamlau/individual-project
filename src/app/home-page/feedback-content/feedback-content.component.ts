import { Component, OnInit } from '@angular/core';
import { simpleFadeAnimation } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-feedback-content',
  templateUrl: './feedback-content.component.html',
  styleUrls: ['./feedback-content.component.scss'],
  animations: [
    simpleFadeAnimation
  ]
})
export class FeedbackContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
