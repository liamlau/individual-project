import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { AlgorithmRetrievalService } from '../algorithm-retrieval.service';
import { CanvasService } from './canvas.service';
import { PlaybackService } from './playback.service';
declare var anime: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.scss']
})
export class AlgorithmPageComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  showCode: boolean = false;

  constructor(public playback: PlaybackService, public algorithmService: AlgorithmRetrievalService, public drawService: CanvasService) { }

  ngOnInit(): void {

    this.drawService.canvas = this.canvas;
    this.drawService.ctx = this.canvas.nativeElement.getContext('2d');

    this.algorithm.setValue("Gale-Shapley Stable Marriage");

    // this.algorithmService.currentAlgorithm = this.algorithmService.mapOfAvailableAlgorithms.get("smp-man-gs");
    // this.playback.setAlgorithm("smp-man-gs", 5);

    this.algorithmService.currentAlgorithm = this.algorithmService.mapOfAvailableAlgorithms.get("hr-resident-egs");
    this.playback.setAlgorithm("hr-resident-egs", 5);

  }

  ngAfterViewInit(): void {

    // let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    // var parent = document.getElementById("parent");
    // canvas.width = parent.offsetWidth - 20;
    // canvas.height = parent.offsetHeight - 20;
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


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.key == "ArrowRight" || event.key == "d") {
      if (!(!this.playback.pause || this.playback.stepCounter >= this.playback.numCommands)) {
        this.playback.forwardStep();
      }
    } else if (event.key == "ArrowLeft" || event.key == "a") {
      if (!(!this.playback.pause || this.playback.stepCounter == 0)) {
        this.playback.backStep();
      }
    }
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

  toggleExpansion() {
    var terminalElement = document.getElementById("terminal");
    if (this.showCode) {
      terminalElement.style.display = "none";
      terminalElement.style.visibility = "none";
      // anime({
      //   targets: '.terminal-header',
      //   easing: 'easeInOutQuint',
      //   translateY: [0, 200],
      //   duration: 400
      // })
      // anime({
      //   targets: '.terminal',
      //   easing: 'easeInOutQuint',
      //   translateY: [0, -50],
      //   opacity: [1, 0],
      //   duration: 400
      // })
    } else {
      // maybe try animating the height?
      terminalElement.style.display = "";
      terminalElement.style.visibility = "visible";
      // anime({
      //   targets: '.terminal-header',
      //   easing: 'easeInOutQuint',
      //   translateY: [200, 0],
      //   duration: 400
      // })
    }

    this.showCode = !this.showCode;

  }

}
