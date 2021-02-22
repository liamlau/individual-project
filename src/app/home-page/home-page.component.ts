import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

declare var anime: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    anime({
      targets: '.navbar',
      easing: 'easeInOutQuint',
      translateY: [-150, 0],
      opacity: [0, 1],
      delay: 100,
      duration: 1000
    })

    anime({
      targets: '.main-page',
      easing: 'easeInOutQuint',
      opacity: [0, 1],
      // translateY: [-100, 0],
      delay: 550,
      duration: 900
    })
  }
}
