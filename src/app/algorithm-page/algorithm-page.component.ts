import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { AlgorithmRetrievalService } from '../home-page/algorithm-tab-content/algorithm-retrieval.service';
import { CanvasService } from './canvas.service';
import { PlaybackService } from './playback.service';
declare var anime: any;

@Component({
  selector: 'algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.scss']
})
export class AlgorithmPageComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  constructor(public playback: PlaybackService, public algorithmService: AlgorithmRetrievalService, public drawService: CanvasService) { }

  ngOnInit(): void {

    this.drawService.canvas = this.canvas;
    this.drawService.ctx = this.canvas.nativeElement.getContext('2d');

    // this.ctx = this.canvas.nativeElement.getContext('2d');

    this.algorithmService.currentAlgorithm = {
      id: "smp-man-gs",
      name: "Stable Marriage Problem",
      orientation: "Man",
      algorithm: "Gale-Shapley Stable Matching",
      description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Gale-Shapley Stable Marriage algorithm is used."
    };
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
