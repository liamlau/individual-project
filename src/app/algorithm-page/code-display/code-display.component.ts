import { Component, Input, OnInit } from '@angular/core';
import { PlaybackService } from '../playback.service';

declare var anime: any;

@Component({
  selector: 'code-display',
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.scss']
})
export class CodeDisplayComponent implements OnInit {

  @Input() algorithm: string;
  animate: boolean = true;

  constructor(public playback: PlaybackService) { }

  ngOnInit(): void {
  }

  toggleExpansion() {
    var terminalElement = document.getElementById("terminal");
    if (this.animate) {
      console.log(terminalElement.style.display);
      terminalElement.style.display = "none";
      // anime({
      //   targets: '.terminal-header',
      //   easing: 'easeInOutQuint',
      //   translateY: [0, 200],
      //   duration: 400
      // })
      anime({
        targets: '.terminal',
        easing: 'easeInOutQuint',
        translateY: [0, -50],
        opacity: [1, 0],
        duration: 400
      })
    } else {
      // maybe try animating the height?
      terminalElement.style.display = "";
      // anime({
      //   targets: '.terminal-header',
      //   easing: 'easeInOutQuint',
      //   translateY: [200, 0],
      //   duration: 400
      // })
      anime({
        targets: '.terminal',
        easing: 'easeInOutQuint',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 400
      })  
    }
    this.animate = !this.animate;

  }

}
