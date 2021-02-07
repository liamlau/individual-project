import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
