import { Component, OnInit } from '@angular/core';
import { simpleFadeAnimation } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss', '../home-page.component.scss', '../home-content/home-content.component.scss'],
  animations: [
    simpleFadeAnimation
  ]
})
export class AboutContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
