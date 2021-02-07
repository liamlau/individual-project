import { Component, OnInit } from '@angular/core';
import { simpleFadeAnimation } from 'src/app/animations';

@Component({
  selector: 'home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss', '../home-page.component.scss'],
  animations: [
    simpleFadeAnimation
  ]
})
export class HomeContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
