import { ElementRef, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AlgorithmRetrievalService } from '../../../algorithm-retrieval.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  originalGroup1Preferences: Array<Array<string>>;
  originalGroup2Preferences: Array<Array<string>>;

  // HTML drawing properties
  sizes = [];
  baseSize = undefined;
  font = undefined;
  controlChars = "{}\n\t";
  spaceSize = 0;
  tabSize = 8; // in spaceSize units
  tabs = (function(){var t = [];for(var i=0; i < 100; i += 8){t.push(i);}; return t;})();


  // circle properties
  radiusOfCircles: number = 30;
  yMargin: number = 0.15;
  xMargin: number = 0.3;


  // font properties
  fontSize: number = 20;


  alwaysShowPreferences: boolean = false;

  canvas: ElementRef<HTMLCanvasElement>;

  positions;

  public currentCommand: Object;

  public ctx: CanvasRenderingContext2D;

  lineSizes: Map<string, number> = new Map();

  firstRun: boolean = true;

  constructor(public algService: AlgorithmRetrievalService) { }

  ngOnInit(): void {

  }

  setCommand(command) {
    this.currentCommand = command;
    this.redrawCanvas();
  }

  initialise() {
    // this.lineSizes = new Map();
    this.firstRun = true;
  }

  // Idea:
  // Start from middle of canvas and 
  calculateEqualDistance() {

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");

    let LHSHeightOffset = 0;
    let RHSHeightOffset = 0;

    if (this.algService.numberOfGroup1Agents == 8) {
      LHSHeightOffset = 8;
      this.radiusOfCircles = 27;
    } else if (this.algService.numberOfGroup1Agents == 9) {
      LHSHeightOffset = 6;
      this.radiusOfCircles = 21;
    } else {
      LHSHeightOffset = 0;
      this.radiusOfCircles = 30;
    }

    if (this.algService.numberOfGroup2Agents == 8) {
      RHSHeightOffset = 8;
      this.radiusOfCircles = 27;
    } else if (this.algService.numberOfGroup2Agents == 9) {
      RHSHeightOffset = 6;
      this.radiusOfCircles = 21;
    } else {
      RHSHeightOffset = 0;
      this.radiusOfCircles = 30;
    }

    let effectiveHeight: number = canvas.height - (canvas.height * this.yMargin);
    let effectiveWidth: number = canvas.width - (canvas.width * this.xMargin) 
    let spaceBetweenCircles: number = (effectiveHeight / this.algService.numberOfGroup1Agents) + LHSHeightOffset;
    
    let canvasMiddle: number = (effectiveHeight / 2) + 40;
    
    // center points of the canvas for SR circles 
    let centerX = (effectiveWidth / 2) + (canvas.width * 0.15)
    let centerY = (effectiveHeight / 2)
    
    // console.log(canvasMiddle);

    this.positions = {}

    // canvas Middle 
    this.positions["middleX"] = centerX
    this.positions["middleY"] = centerY



    // LHS Positions


    if (this.algService.numberOfGroup1Agents % 2 == 1) {

      // plot middle circle
      this.positions["circle" + Math.floor((this.algService.numberOfGroup1Agents / 2) + 1)] = {
        positionX: (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? canvas.width * this.xMargin - 35 : canvas.width * this.xMargin),
        positionY: canvasMiddle
      }

      // plot circles above middle
      // console.log("above middle");
      for (let i = Math.floor((this.algService.numberOfGroup1Agents / 2)); i > 0; i--) {
        // console.log(i);
        this.positions["circle" + i] = {
          positionX: (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? canvas.width * this.xMargin - 35 : canvas.width * this.xMargin),
          positionY: canvasMiddle - ((Math.ceil((this.algService.numberOfGroup1Agents / 2)) - i) * spaceBetweenCircles)
        }
      }

      // plot circles below middle
      // console.log("below middle");
      for (let i = Math.ceil((this.algService.numberOfGroup1Agents / 2)) + 1; i < this.algService.numberOfGroup1Agents + 1; i++) {
        // console.log(i);
        this.positions["circle" + i] = {
          positionX: (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? canvas.width * this.xMargin - 35 : canvas.width * this.xMargin),
          positionY: canvasMiddle + ((i - Math.ceil((this.algService.numberOfGroup1Agents / 2))) * spaceBetweenCircles)
        }
      }

      // console.log(this.positions);

    } else {

      // plot middle circle
      // console.log(Math.floor(this.algService.numberOfGroup1Agents / 2));
      // console.log((Math.ceil(this.algService.numberOfGroup1Agents / 2)) + 1);
      this.positions["circle" + Math.floor(this.algService.numberOfGroup1Agents / 2)] = {
        positionX: (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? canvas.width * this.xMargin - 35 : canvas.width * this.xMargin),
        positionY: canvasMiddle - spaceBetweenCircles / 2
      }

      // plot middle circle
      this.positions["circle" + (Math.ceil(this.algService.numberOfGroup1Agents / 2) + 1)] = {
        positionX: (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? canvas.width * this.xMargin - 35 : canvas.width * this.xMargin),
        positionY: canvasMiddle + spaceBetweenCircles / 2
      }

      // plot circles above middle
      // console.log("above middle");
      for (let i = Math.floor((this.algService.numberOfGroup1Agents / 2)) - 1; i > 0; i--) {
        // console.log(i);
        this.positions["circle" + i] = {
          positionX: (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? canvas.width * this.xMargin - 35 : canvas.width * this.xMargin),
          positionY: canvasMiddle - (spaceBetweenCircles / 2) - ((Math.ceil((this.algService.numberOfGroup1Agents / 2)) - i) * spaceBetweenCircles)
        }
      }

      // // plot circles below middle
      // console.log("below middle");
      for (let i = Math.ceil((this.algService.numberOfGroup1Agents / 2)) + 2; i < this.algService.numberOfGroup1Agents + 1; i++) {
        // console.log(i);
        this.positions["circle" + i] = {
          positionX: (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? canvas.width * this.xMargin - 35 : canvas.width * this.xMargin),
          positionY: canvasMiddle + (spaceBetweenCircles / 2) + ((i - Math.ceil((this.algService.numberOfGroup1Agents / 2) + 1)) * spaceBetweenCircles)
        }
      }

      // console.log(this.positions);
    }


    spaceBetweenCircles = (effectiveHeight / this.algService.numberOfGroup2Agents) + RHSHeightOffset;

    // console.log(this.algService.numberOfGroup2Agents);
    // RHS Circles 

    if (this.algService.numberOfGroup2Agents % 2 == 1) {

      // plot middle circle
      this.positions["circle" + String.fromCharCode(Math.floor((this.algService.numberOfGroup2Agents / 2) + 1 + 64))] = {
        positionX: canvas.width - (canvas.width * this.xMargin),
        positionY: canvasMiddle
      }

      // plot circles above middle
      // console.log("above middle");
      for (let i = Math.floor((this.algService.numberOfGroup2Agents / 2)); i > 0; i--) {
        // console.log(i);
        this.positions["circle" + String.fromCharCode(i + 64)] = {
          positionX: canvas.width - (canvas.width * this.xMargin),
          positionY: canvasMiddle - ((Math.ceil((this.algService.numberOfGroup2Agents / 2)) - i) * spaceBetweenCircles)
        }
      }

      // plot circles below middle
      // console.log("below middle");
      for (let i = Math.ceil((this.algService.numberOfGroup2Agents / 2)) + 1; i < this.algService.numberOfGroup2Agents + 1; i++) {
        // console.log(i);
        this.positions["circle" + String.fromCharCode(i + 64)] = {
          positionX: canvas.width - (canvas.width * this.xMargin),
          positionY: canvasMiddle + ((i - Math.ceil((this.algService.numberOfGroup2Agents / 2))) * spaceBetweenCircles)
        }
      }

      // console.log(this.positions);

    } else {

      // plot middle circle
      // console.log(Math.floor(this.algService.numberOfGroup1Agents / 2));
      // console.log((Math.ceil(this.algService.numberOfGroup1Agents / 2)) + 1);
      // console.log(String.fromCharCode(Math.floor(this.algService.numberOfGroup2Agents / 2) + 64));
      this.positions["circle" + String.fromCharCode(Math.floor(this.algService.numberOfGroup2Agents / 2) + 64)] = {
        positionX: canvas.width - (canvas.width * this.xMargin),
        positionY: canvasMiddle - spaceBetweenCircles / 2
      }

      // plot middle circle
      this.positions["circle" + String.fromCharCode(Math.ceil(this.algService.numberOfGroup2Agents / 2) + 1 + 64)] = {
        positionX: canvas.width - (canvas.width * this.xMargin),
        positionY: canvasMiddle + spaceBetweenCircles / 2
      }

      // plot circles above middle
      // console.log("above middle");
      for (let i = Math.floor((this.algService.numberOfGroup2Agents / 2)) - 1; i > 0; i--) {
        // console.log(i);
        this.positions["circle" + String.fromCharCode(i + 64)] = {
          positionX: canvas.width - (canvas.width * this.xMargin),
          positionY: canvasMiddle - (spaceBetweenCircles / 2) - ((Math.ceil((this.algService.numberOfGroup2Agents / 2)) - i) * spaceBetweenCircles)
        }
      }

      // // plot circles below middle
      // console.log("below middle");
      for (let i = Math.ceil((this.algService.numberOfGroup2Agents / 2)) + 2; i < this.algService.numberOfGroup2Agents + 1; i++) {
        // console.log(i);
        this.positions["circle" + String.fromCharCode(i + 64)] = {
          positionX: canvas.width - (canvas.width * this.xMargin),
          positionY: canvasMiddle + (spaceBetweenCircles / 2) + ((i - Math.ceil((this.algService.numberOfGroup2Agents / 2) + 1)) * spaceBetweenCircles)
        }
      }
    }
  }

  calculateEqualDistance1Group() {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");

    let LHSHeightOffset = 0;
    let RHSHeightOffset = 0;

    if (this.algService.numberOfGroup1Agents == 8) {
      LHSHeightOffset = 8;
      this.radiusOfCircles = 27;
    } else if (this.algService.numberOfGroup1Agents == 9) {
      LHSHeightOffset = 6;
      this.radiusOfCircles = 21;
    } else {
      LHSHeightOffset = 0;
      this.radiusOfCircles = 30;
    }

    if (this.algService.numberOfGroup2Agents == 8) {
      RHSHeightOffset = 8;
      this.radiusOfCircles = 27;
    } else if (this.algService.numberOfGroup2Agents == 9) {
      RHSHeightOffset = 6;
      this.radiusOfCircles = 21;
    } else {
      RHSHeightOffset = 0;
      this.radiusOfCircles = 30;
    }

    let effectiveHeight: number = canvas.height - (canvas.height * this.yMargin);
    let effectiveWidth: number = canvas.width - (canvas.width * this.xMargin) 

    let spaceBetweenCircles: number = (effectiveHeight / this.algService.numberOfGroup1Agents) + LHSHeightOffset;

    
    // center points of the canvas for SR circles 
    let centerX = (effectiveWidth / 2) + (canvas.width * 0.15)
    let centerY = (effectiveHeight / 2)
    
    // console.log(canvasMiddle);

    this.positions = {}

    // canvas Middle 
    this.positions["middleX"] = centerX
    this.positions["middleY"] = centerY

    // positions 

    let number = this.algService.numberOfGroup1Agents;

    let angle = ((Math.PI * 2) / number) ;
    let r = 200;

    // number to rotated the circle, so that numbering looks more natural 
    let offset = 3; 


    // Draw LHS circles in orange
    for (let i = 2; i < this.algService.numberOfGroup1Agents + 2; i++) {
      
      this.positions["circle" + (i - 1) ] = {
        positionX: r * Math.cos(angle * i) + centerX,
        positionY: r * Math.sin(angle * i) + centerY
      }
      
    }

  }

  drawLHSCircles() {

    // console.log("LHS draw positions", this.positions)

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

  drawCircles1Group() {

    this.ctx.beginPath();
    this.ctx.fillStyle = "#FF6332";


    // number to rotated the circle, so that numbering looks more natural 
    let offset = 1;
    // Draw LHS circles in orange
    for (let i = 1; i < this.algService.numberOfGroup1Agents + 1; i++) {

      let posX: number = this.positions["circle" + i].positionX;
      let posY: number = this.positions["circle" + i].positionY;

      this.ctx.moveTo(posX + this.radiusOfCircles, posY);
      this.ctx.arc(posX, posY, this.radiusOfCircles, 0, Math.PI * 2, true)

    }


    // colours circles 
    this.ctx.fill();
    this.ctx.stroke();


    for (let i = offset; i < this.algService.numberOfGroup1Agents + offset; i++) {
      let posX: number = this.positions["circle" + i].positionX;
      let posY: number = this.positions["circle" + i].positionY;

      this.ctx.fillStyle = "black";
      this.ctx.font = this.radiusOfCircles + 'px Arial';

      this.ctx.fillText(String(i - offset + 1), posX - 8, posY + 10, 20);

    }
 
  }


  drawLine1Group(line: Array<string>): void {

    let color: string = line[2];

    if (color == "red") {
      this.ctx.strokeStyle = "#EB2A2A";
    } else if (color == "green") {
      this.ctx.strokeStyle = "#53D26F";
    }

    this.ctx.lineWidth = 3;

    
    let xLen = (this.positions["circle" + line[1]].positionX) - (this.positions["circle" + line[0]].positionX)
    let yLen = (this.positions["circle" + line[1]].positionY) - (this.positions["circle" + line[0]].positionY)


    // halfX = this.positions["circle" + line[0]].positionX + (xLen * (1 - Math.abs(this.radiusOfCircles / yLen)))
    // halfY = this.positions["circle" + line[0]].positionY + (yLen * (1 - Math.abs(this.radiusOfCircles / yLen))) 

    let halfX = this.positions["circle" + line[0]].positionX + (xLen * 0.8)
    let halfY = this.positions["circle" + line[0]].positionY + (yLen * 0.8) 



    let angle = Math.atan(yLen / xLen)

  
    let newX = 0
    let newY = 0

    let right = false;

    // if starting < ending - pointing right- canvas in bottum right quadrent
    if (this.positions["circle" + line[0]].positionX < this.positions["circle" + line[1]].positionX) {
      right = true
    } else {
      right = false
    }

    // draw arrow 
    this.ctx.beginPath();
    this.ctx.moveTo(this.positions["circle" + line[0]].positionX, this.positions["circle" + line[0]].positionY);
    

    if (color != "green") {

      this.ctx.lineTo(halfX, halfY);
    
      if (right) {

        newX = halfX + 20 * Math.cos(angle + (3 * Math.PI / 4))
        newY = halfY + 20 * Math.sin(angle + (3 * Math.PI / 4))

      } else {

        newX = halfX + 20 * Math.cos(angle + (Math.PI / 4))
        newY = halfY + 20 * Math.sin(angle + (Math.PI / 4))
      }

      this.ctx.lineTo(newX, newY)
      this.ctx.lineTo(halfX, halfY);


      if (right) {

        newX = halfX + 20 * Math.cos(angle - (3 * Math.PI / 4))
        newY = halfY + 20 * Math.sin(angle - (3 * Math.PI / 4))

      } else {

        newX = halfX + 20 * Math.cos(angle - (Math.PI / 4))
        newY = halfY + 20 * Math.sin(angle - (Math.PI / 4))
      }

      this.ctx.lineTo(newX, newY)

    } else {
      this.ctx.lineTo(this.positions["circle" + line[1]].positionX, this.positions["circle" + line[1]].positionY);
    }
    
    this.ctx.stroke();

    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;

  }

  drawLine(line: Array<string>): void {

    let color: string = line[2];

    if (color == "red") {
      this.ctx.strokeStyle = "#EB2A2A";
    } else if (color == "green") {
      this.ctx.strokeStyle = "#53D26F";
    }

    this.ctx.lineWidth = 3;

    this.ctx.beginPath();
    this.ctx.moveTo(this.positions["circle" + line[0]].positionX, this.positions["circle" + line[0]].positionY);
    this.ctx.lineTo(this.positions["circle" + line[1]].positionX, this.positions["circle" + line[1]].positionY);
    this.ctx.stroke();

    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;

  }


  drawAllPreferences() {

    this.ctx.font = this.fontSize + 'px Arial';

    let group1PreferenceList: Array<Array<string>> = Object.values(this.currentCommand["group1CurrentPreferences"]);

    if (group1PreferenceList.length <= 0) {
      group1PreferenceList = Array.from(this.currentCommand["group1CurrentPreferences"].values());
    }


    for (let i = 1; i < this.algService.numberOfGroup1Agents + 1; i++) {
      this.drawText(this.ctx, group1PreferenceList[i-1].join(", "), this.positions["circle" + i].positionX - this.lineSizes.get(String(i)) * 2 - 65, this.positions["circle" + i].positionY + 7, this.fontSize);
    }

    // only draw group2 if it is not SR
    
    let group2PreferenceList: Array<Array<string>> = Object.values(this.currentCommand["group2CurrentPreferences"]);
    let currentLetter = 'A';

    if (group2PreferenceList.length <= 0) {
      group2PreferenceList = Array.from(this.currentCommand["group2CurrentPreferences"].values());
    }

    for (let i = 1; i < this.algService.numberOfGroup2Agents + 1; i++) {
      this.drawText(this.ctx, group2PreferenceList[i-1].join(", "), this.positions["circle" + currentLetter].positionX + (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? 115 : 65), this.positions["circle" + currentLetter].positionY + 7, this.fontSize);
      currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
    }
    
  }

  drawAllPreferences1Group() {

    this.ctx.font = this.fontSize + 'px Arial';

    let group1PreferenceList: Array<Array<string>> = Object.values(this.currentCommand["group1CurrentPreferences"]);

    if (group1PreferenceList.length <= 0) {
      group1PreferenceList = Array.from(this.currentCommand["group1CurrentPreferences"].values());
    }

    let num = this.algService.numberOfGroup1Agents

    for (let i = 1; i < num / 2 + 1; i++) {
      this.drawText(this.ctx, 
      group1PreferenceList[i-1].join(", "),
      this.positions["circle" + i].positionX - (this.lineSizes.get(String(i)) * 2) - 65,
      this.positions["circle" + i].positionY + 7, this.fontSize);
    }

    for (let i = (num / 2) + 1; i < num + 1; i++) {
      this.drawText(this.ctx, 
      group1PreferenceList[i-1].join(", "),
      this.positions["circle" + i].positionX + 65,
      this.positions["circle" + i].positionY + 7, this.fontSize);
    }

  }

  drawRelevantPreferences() {

    let group1PreferenceList: Array<Array<string>> = Object.values(this.currentCommand["group1CurrentPreferences"]);

    if (group1PreferenceList.length <= 0) {
      group1PreferenceList = Array.from(this.currentCommand["group1CurrentPreferences"].values());
    }

    let group2PreferenceList: Array<Array<string>> = Object.values(this.currentCommand["group2CurrentPreferences"]);

    if (group2PreferenceList.length <= 0) {
      group2PreferenceList = Array.from(this.currentCommand["group2CurrentPreferences"].values());
    }

    for (let agent of this.currentCommand["relevantPreferences"]) {
      if (agent.match(/[A-Z]/i)) {
        this.drawText(this.ctx, group2PreferenceList[(((agent.charCodeAt(0)) - 65 ))].join(", "), this.positions["circle" + agent].positionX + (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"] ? 115 : 65), this.positions["circle" + agent].positionY + 7, this.fontSize);
      } else {
        this.drawText(this.ctx, group1PreferenceList[agent - 1].join(", "), this.positions["circle" + agent].positionX - this.lineSizes.get(agent) * 2 - 65, this.positions["circle" + agent].positionY + 7, this.fontSize);
      }
    }
  }

  drawHospitalCapacity() {
    let hospitalCapacityMap = this.currentCommand["algorithmSpecificData"]["hospitalCapacity"];

    this.ctx.font = this.fontSize + 'px Arial';

    let currentLetter = 'A';

    for (let i = 1; i < this.algService.numberOfGroup2Agents + 1; i++) {

      let currentCapacity: number = hospitalCapacityMap[currentLetter];

      this.drawText(this.ctx, "(" + String(currentCapacity) + ")", this.positions["circle" + currentLetter].positionX + 45, this.positions["circle" + currentLetter].positionY + 7, this.fontSize);
      // this.ctx.fillText(group2PreferenceList[i-1].join(", "), this.positions["circle" + currentLetter].positionX + 65, this.positions["circle" + currentLetter].positionY + 7);
      currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
    }

  }

  
  drawSPAlecturers() {
    // console.log("drawSPAlecturers" , this.currentCommand["algorithmSpecificData"]["lecturerCapacity"]);

    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1.5;

    this.ctx.beginPath();
    // this.ctx.fillStyle = "#FF6332";

    // this.ctx.moveTo(this.positions["circleA"].positionX + 110, this.positions["circleA"].positionY);
    // this.ctx.lineTo(this.positions["circleA"].positionX + 130, this.positions["circleA"].positionY);

    // console.log("projects", this.currentCommand["algorithmSpecificData"]["lecturerProjects"])
    // console.log("caps", this.currentCommand["algorithmSpecificData"]["lecturerCapacity"])

    let count = 0
    let text = ""
    for (let projectList of this.currentCommand["algorithmSpecificData"]["lecturerProjects"]) {

      

      // > 1 project 
      let first = projectList[0]
      let last = projectList.slice(-1)[0]

      let firstLetter = first.slice(-1)[0]
      let lastLetter = last.slice(-1)[0]

      let firstPos = this.positions["circle" + String(firstLetter)]
      let lastPos = this.positions["circle" + String(lastLetter)]

      let centerPos = {"positionX" : 0, "positionY" : 0}

      if (firstLetter == lastLetter){
        // console.log("middle")
        centerPos = {"positionX" : firstPos.positionX, "positionY" : firstPos.positionY + 10}

      } else {
        // console.log("subtracted", firstLetter, firstPos)
        // console.log( lastLetter, lastPos)
        centerPos = {"positionX" : firstPos.positionX, "positionY" : ((lastPos.positionY - firstPos.positionY) / 2) + firstPos.positionY + 10}
      }


      // console.log("Pos Test", centerPos.positionX, centerPos.positionY)

      // console.log(this.positions["circleA"], this.positions["circleC"])
      // console.log(firstPos, lastPos)

      // this.ctx.beginPath()
      this.ctx.moveTo(firstPos.positionX + 85, firstPos.positionY - this.radiusOfCircles);
      this.ctx.lineTo(firstPos.positionX + 100, firstPos.positionY - this.radiusOfCircles);
      // this.ctx.stroke();

      this.ctx.lineTo(lastPos.positionX + 100, lastPos.positionY + this.radiusOfCircles)

      // this.ctx.beginPath()
      this.ctx.moveTo(lastPos.positionX + 85, lastPos.positionY + this.radiusOfCircles);
      this.ctx.lineTo(lastPos.positionX + 100, lastPos.positionY + this.radiusOfCircles);
      // this.ctx.stroke();

      text = "Lecturer" + String(count + 1) + " (" + this.currentCommand["algorithmSpecificData"]["lecturerCapacity"][count + 1] + ")"

      this.drawText(this.ctx, text,centerPos.positionX + 120, centerPos.positionY, 14)
      
      
      count++
    }


    this.ctx.stroke()
   

    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 1;

  }

  selectCircles(circles: Array<string>) {

    let originalLineWidth: number = this.ctx.lineWidth;
    let originalStrokeStyle: string | CanvasGradient | CanvasPattern = this.ctx.strokeStyle;

    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "#53D26F";

    for (let agent of circles) {

      this.ctx.beginPath();

      let posX: number = this.positions["circle" + agent].positionX;
      let posY: number = this.positions["circle" + agent].positionY;

      this.ctx.moveTo(posX + this.radiusOfCircles, posY);

      this.ctx.arc(posX, posY, this.radiusOfCircles, 0, Math.PI * 2, true)

      this.ctx.stroke();

    }

    this.ctx.lineWidth = originalLineWidth;
    this.ctx.strokeStyle = originalStrokeStyle;

  }


  getNextTab(x) {
    let i = 0;
    while(i < this.tabs.length){
        if(x < this.tabs[i] * this.tabSize * this.spaceSize){
            return this.tabs[i] * this.tabSize * this.spaceSize;
        }
        i++;
    }
    return this.tabs[i-1] * this.tabSize * this.spaceSize;
  }

  getFontSize(font) {
    var numFind = /[0-9]+/;
    var number: number = Number(numFind.exec(font)[0]);
    if(isNaN(number)){
        throw Error("SimpleTextStyler Cant find font size");
    }
    return Number(number);
    
  }

  setFont(font = this.ctx.font) {
    this.font = this.ctx.font = font;
    this.baseSize = this.getFontSize(font);
    for(var i = 32; i < 256; i ++){
        this.sizes[i-32] = this.ctx.measureText(String.fromCharCode(i)).width/this.baseSize;
    }
    this.spaceSize = this.sizes[0];

}


// FROM: https://stackoverflow.com/questions/43904201/how-can-i-colour-different-words-in-the-same-line-with-html5-canvas
// adapted for use in this project
  drawText(context,text,x,y,size){
    var i,len,subText;
    var w,scale;
    var xx,yy,ctx;
    var state = [];
    if(text === undefined){ return }
    xx = x;
    yy = y;
    if(!context.setTransform){ // simple test if this is a 2D context
        if(context.ctx){ ctx = context.ctx } // may be a image with attached ctx?
        else{ return }
    }else { ctx = context }

    function renderText(text){
    
        ctx.save();
        ctx.fillStyle = colour;
        ctx.translate(x,y)
        ctx.scale(scale,scale)
        ctx.fillText(text,0,0);
        ctx.restore();
    }
    var colour = ctx.fillStyle;
    ctx.font = this.font;
    len = text.length;
    subText = "";
    w = 0;
    i = 0;
    scale = size / this.baseSize;
    while(i < len){
        var c = text[i];
        var cc = text.charCodeAt(i);
        if(cc < 256){ // only ascii
            if(this.controlChars.indexOf(c) > -1){
                if(subText !== ""){
                    scale = size / this.baseSize;
                    renderText(subText);
                    x += w;
                    w = 0;
                    subText = "";                        
                }
                if(c === "\n"){  // return move to new line
                    x = xx;
                    y += size;
                }else
                if(c === "\t"){ // tab move to next tab
                    x = this.getNextTab(x-xx)+xx;
                }else
                if(c === "{"){   // Text format delimiter                       
                    state.push({
                        size : size,
                        colour : colour,
                        x:x,
                        y:y,
                    })
                    i += 1;
                    var t = text[i];
                    if(t === "#"){
                      colour = text.substr(i,7);
                      i+= 6;
                    }
                }else if(c  === "}"){
                    var s = state.pop();
                    y = s.y;
                    size = s.size;
                    colour = s.colour;
                    scale = size / this.baseSize;
                }
            }else{
                subText += c;
                w += this.sizes[cc-32] * (size ) ;
            }
        }
        i += 1;
    }
    if(subText !== ""){
        renderText(subText);
    }
  
  }


  redrawCanvas(command?: Object): void {

    if (command) {
      this.currentCommand = command;
    }

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    var parent = document.getElementById("parent");
    canvas.width = parent.offsetWidth - 20;
    canvas.height = parent.offsetHeight - 20;

    if (this.firstRun) {
      this.originalGroup1Preferences = Array.from(this.currentCommand["group1CurrentPreferences"].values());
      this.originalGroup2Preferences = Array.from(this.currentCommand["group2CurrentPreferences"].values());
      this.firstRun = false;
    }

    this.lineSizes = new Map();
    for (let i=1; i < this.algService.numberOfGroup1Agents + 1; i++) {
      let lineSize = this.ctx.measureText(this.originalGroup1Preferences[i-1].join(", ")).width;
      this.lineSizes.set(String(i), lineSize);
    }

    this.setFont();
   
    // this.drawLineBetween("circle1", "circleE", "red")
    // this.drawLineBetween("circle1", "circleB");

    // draw circles

    // if SR Algorithm
    if (this.currentCommand["algorithmSpecificData"]["SR"]) {

      // draw lines between circles (matches and relations)
      for (let line of this.currentCommand["currentLines"]) {
        this.drawLine1Group(line);
      }

      // update positions of all canvas elements
      this.calculateEqualDistance1Group();
      this.drawCircles1Group();

    } else {

      // draw lines between circles (matches and relations)
      for (let line of this.currentCommand["currentLines"]) {
        this.drawLine(line);
      }

      // update positions of all canvas elements
      this.calculateEqualDistance();

      this.drawLHSCircles();
      this.drawRHSCircles();
    }
    
    // draw project lecturer Viz
    if (this.currentCommand) {
      if (this.currentCommand["algorithmSpecificData"]["lecturerCapacity"]) {
        this.drawSPAlecturers();
      }
    }
    

    if (this.currentCommand) {
      if (this.currentCommand["algorithmSpecificData"]["hospitalCapacity"]) {
        this.drawHospitalCapacity();
      }

      if (this.currentCommand["relevantPreferences"].length >= 1 && this.alwaysShowPreferences) {
        this.drawRelevantPreferences();
      } else {

        // preferances drawn differently for SR
        if (this.currentCommand["algorithmSpecificData"]["SR"]){
          this.drawAllPreferences1Group();
        } else {
          this.drawAllPreferences();
        }
      }
    }

    


    this.selectCircles(this.currentCommand["currentlySelectedAgents"]);

  }
}