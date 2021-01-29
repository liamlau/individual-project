import { ElementRef, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AlgorithmRetrievalService } from '../home-page/algorithm-tab-content/algorithm-retrieval.service';
import { PlaybackService } from './playback.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  // circle properties
  radiusOfCircles: number = 30;
  yMargin: number = 0.15;
  xMargin: number = 0.3;


  // font properties
  fontSize: number = 20;

  canvas: ElementRef<HTMLCanvasElement>;

  positions;

  public ctx: CanvasRenderingContext2D;

  constructor(public algService: AlgorithmRetrievalService, public playback: PlaybackService) { }

  ngOnInit(): void {
    
  }

  calculateEqualDistance() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    // console.log(canvas.width);
    // console.log(canvas.height);

    let effectiveHeight: number = canvas.height - (canvas.height * this.yMargin);
    // console.log(effectiveHeight);

    let spaceBetweenCircles: number = effectiveHeight / this.algService.numberOfGroup1Agents;
    let currentCirclePosition = (canvas.height * this.yMargin);
    

    this.positions = {}

    // LHS Positions

    for (let i = 1; i < this.algService.numberOfGroup1Agents + 1; i++) {
      this.positions["circle" + i] = {
        positionX: canvas.width * this.xMargin,
        positionY: currentCirclePosition
      }

      currentCirclePosition = currentCirclePosition + spaceBetweenCircles
    }


    // RHS Circle positions

    let lastLetter = 'A';
    spaceBetweenCircles = effectiveHeight / this.algService.numberOfGroup2Agents;
    currentCirclePosition = (canvas.height * this.yMargin);

    for (let i = 0; i < this.algService.numberOfGroup2Agents; i++) {
      this.positions["circle" + lastLetter ] = {
        positionX: canvas.width - (canvas.width * this.xMargin),
        positionY: currentCirclePosition
      }

      lastLetter = String.fromCharCode(((lastLetter.charCodeAt(0) + 1 - 65) % 25) + 65)

      currentCirclePosition = currentCirclePosition + spaceBetweenCircles
    }

    // console.log(this.positions);

  }

  drawLHSCircles() {

    this.ctx.beginPath();
    this.ctx.fillStyle = "#FF6332";


    // Draw LHS circles in orange
    for (let i = 1; i < this.algService.numberOfGroup1Agents + 1; i++) {
      let posX: number = this.positions["circle" + i].positionX;
      let posY: number = this.positions["circle" + i].positionY;

      this.ctx.moveTo(posX + this.radiusOfCircles, posY);
      this.ctx.arc(posX, posY, this.radiusOfCircles, 0, Math.PI * 2, true)
    }

    this.ctx.fill();
    this.ctx.stroke();


    // Draw text (numbers)
    for (let i = 1; i < this.algService.numberOfGroup1Agents + 1; i++) {
      let posX: number = this.positions["circle" + i].positionX;
      let posY: number = this.positions["circle" + i].positionY;

      this.ctx.fillStyle = "black";
      this.ctx.font = this.radiusOfCircles + 'px Arial';

      this.ctx.fillText(String(i), posX - 8, posY + 10, 20);

    }


    // this.ctx.fillText('1', 192, 85, 20);

    // this.ctx.fillText('2', 192, 204.8, 20);

    // this.ctx.fillText('3', 192, 324.6, 20);

    // this.ctx.fillText('4', 192, 444.4, 20);

    // this.ctx.fillText('5', 192, 564.2, 20);

  }


  drawRHSCircles() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#CA32FF";
    let currentLetter = 'A';

    // Draw RHS circles in orange
    for (let i = 0; i < this.algService.numberOfGroup2Agents; i++) {
      let posX: number = this.positions["circle" + currentLetter].positionX;
      let posY: number = this.positions["circle" + currentLetter].positionY;

      this.ctx.moveTo(posX + this.radiusOfCircles, posY);
      this.ctx.arc(posX, posY, this.radiusOfCircles, 0, Math.PI * 2, true)
      currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
    }

    this.ctx.fill();
    this.ctx.stroke();


    currentLetter = 'A';

    // Draw text (numbers)
    for (let i = 1; i < this.algService.numberOfGroup2Agents + 1; i++) {
      let posX: number = this.positions["circle" + currentLetter].positionX;
      let posY: number = this.positions["circle" + currentLetter].positionY;

      this.ctx.fillStyle = "black";
      this.ctx.font = this.radiusOfCircles + 'px Arial';

      this.ctx.fillText(currentLetter, posX - 9, posY + 11, 20);
      currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
    }
  }


  drawLineBetween(firstCircle: string, secondCircle: string): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.positions[firstCircle].positionX, this.positions[firstCircle].positionY);
    this.ctx.lineTo(this.positions[secondCircle].positionX, this.positions[secondCircle].positionY);
    this.ctx.stroke();
  }


  drawAllPreferences() {

    this.ctx.font = this.fontSize + 'px Arial';

    let preferenceList: Array<Array<string>> = Object.values(this.playback.algorithmData["men"]);
    // console.log(preferenceList[0].join(", "));
    console.log(preferenceList);
    // console.log(preferenceList.join(", "));

    // this.ctx.fillText("C, B, E, A, D", 235, 88);

    for (let i = 1; i < this.algService.numberOfGroup1Agents + 1; i++) {
      this.ctx.fillText(preferenceList[i-1].join(", "), this.positions["circle" + i].positionX - 175, this.positions["circle" + i].positionY + 7);
    }

    // for (let [currentAgent, preferences] of Object.entries(this.playback.algorithmData["men"])) {
    //   console.log(currentAgent);
    //   let preferenceString: string = Object.values(preferences).join(", ");
    //   console.log(preferenceString);
    //   console.log("----------");
      
    // }
  }


  redrawCanvas(): void {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    var parent = document.getElementById("parent");
    canvas.width = parent.offsetWidth - 20;
    canvas.height = parent.offsetHeight - 20;

    // update positions of all canvas elements
    this.calculateEqualDistance();

    // draw lines between circles (matches and relations)
    // this.drawLineBetween("circle1", "circleB");

    // draw circles
    this.drawLHSCircles();
    this.drawRHSCircles();

    this.drawAllPreferences();

  }

}
