import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { element } from 'protractor';
import { AlgorithmRetrievalService } from '../home-page/algorithm-tab-content/algorithm-retrieval.service';
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

  positions;

  private ctx: CanvasRenderingContext2D;

  constructor(public playback: PlaybackService, public algorithmService: AlgorithmRetrievalService) { }

  ngOnInit(): void { 

    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.algorithmService.currentAlgorithm = {
      id: "smp-man-gs",
      name: "Stable Marriage Problem",
      orientation: "Man",
      algorithm: "Gale-Shapley Stable Matching",
      description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Gale-Shapley Stable Marriage algorithm is used."
    };
  }

  ngAfterViewInit(): void {

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    var parent = document.getElementById("parent");
    canvas.width = parent.offsetWidth - 20;
    canvas.height = parent.offsetHeight - 20;
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

  calculateEqualDistance() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    // console.log(canvas.width);
    // console.log(canvas.height);

    let effectiveHeight: number = canvas.height - 80;
    // console.log(effectiveHeight);

    let spaceBetweenCircles: number = effectiveHeight / 5;
    let currentCirclePosition = 80;
    let lastLetter = 'A';

    this.positions = {}

    for (let i = 1; i < 6; i++) {
      this.positions["circle" + i] = {
        positionX: 300,
        positionY: currentCirclePosition
      }

      this.positions["circle" + lastLetter ] = {
        positionX: canvas.width - 300 - 20,
        positionY: currentCirclePosition
      }

      lastLetter = String.fromCharCode(((lastLetter.charCodeAt(0) + 1 - 65) % 25) + 65)

      currentCirclePosition = currentCirclePosition + spaceBetweenCircles
    }

    // console.log(this.positions);

  }

  drawCircle() {

    // this.ctx.beginPath();
    // this.ctx.moveTo(this.positions["circle1"].positionX, this.positions["circle1"].positionY);
    // this.ctx.lineTo(this.positions["circleD"].positionX, this.positions["circleD"].positionY);
    // this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = "#FF6332";

    for (let circle in this.positions) {
      let posX: number = this.positions[circle].positionX;
      let posY: number = this.positions[circle].positionY;

      this.ctx.moveTo(posX + 30, posY);
      this.ctx.arc(posX, posY, 30, 0, Math.PI * 2, true)
    }

    this.ctx.fill();
    this.ctx.stroke();


    for (let circle in this.positions) {
      let posX: number = this.positions[circle].positionX;
      let posY: number = this.positions[circle].positionY;

      this.ctx.fillStyle = "black";
      this.ctx.font = '30px Arial';

      this.ctx.fillText(circle.substring(6), posX - 8, posY + 10, 20);

    }


    // this.ctx.fillText('1', 192, 85, 20);

    // this.ctx.fillText('2', 192, 204.8, 20);

    // this.ctx.fillText('3', 192, 324.6, 20);

    // this.ctx.fillText('4', 192, 444.4, 20);

    // this.ctx.fillText('5', 192, 564.2, 20);

  }

  onResized(): void {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    var parent = document.getElementById("parent");
    canvas.style.width = String(parent.offsetWidth - 20);
    canvas.height = parent.offsetHeight - 20;

    this.calculateEqualDistance();
    this.drawCircle();

  }

}
