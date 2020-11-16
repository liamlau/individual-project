import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { PlaybackService } from './playback.service';
declare var anime: any;

@Component({
  selector: 'app-algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.scss']
})
export class AlgorithmPageComponent implements OnInit {

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // var yMid = window.innerHeight / 2;
    // console.log(yMid);

    // var yPos = document.querySelector('.option-box').getBoundingClientRect().y;
    // console.log(yPos)

    anime({
      targets: '.title-container',
      easing: 'easeInOutQuint',
      translateY: [-150, 0],
      opacity: [0, 1],
      duration: 1200
    })
  }

  firstSelection: boolean = true
  algorithm = new FormControl('');
  numPeople: number;

  changeAlgorithm() {

    this.playback.firstRun = true;
    this.playback.resetPlaybackData();
    this.numPeople = 5;
    if (this.firstSelection) {
      this.firstSelection = false;
      anime({
        targets: '.title-container',
        easing: 'easeInOutQuint',
        translateY: [400, 20],
        opacity: [0, 1],
        duration: 400
      })
      anime({
        targets: '.code-block, .playback-block',
        easing: 'easeInOutQuint',
        opacity: [0, 1],
        duration: 400,
        delay: 200
      });
    } else {
      anime({
        targets: '.code-block, .playback-block',
        easing: 'easeInOutQuint',
        opacity: [0, 1],
        duration: 400,
      });
    }
  }

}
