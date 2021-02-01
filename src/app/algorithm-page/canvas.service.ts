import { ElementRef, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { AlgorithmRetrievalService } from '../home-page/algorithm-tab-content/algorithm-retrieval.service';
import { ExecutionService } from './algorithms/execution.service';
import { PlaybackService } from './playback.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

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


  drawPreferences: boolean = true;

  canvas: ElementRef<HTMLCanvasElement>;

  positions;

  public currentCommand: Object;

  public ctx: CanvasRenderingContext2D;

  constructor(public algService: AlgorithmRetrievalService) { }

  ngOnInit(): void {

  }

  setCommand(command) {
    console.log("|| ||")
    console.log(command);
    this.currentCommand = command;
    this.redrawCanvas();
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
    console.log("----------");
    // console.log(Object.values(this.playback.algorithmData["commands"][stepCounter]["group1CurrentPreferences"]));

    // console.log(preferenceList[0].join(", "));
    console.log(group1PreferenceList);
    // console.log(preferenceList.join(", "));

    // this.ctx.fillText("C, B, E, A, D", 235, 88);

    for (let i = 1; i < this.algService.numberOfGroup1Agents + 1; i++) {
      this.drawText(this.ctx, group1PreferenceList[i-1].join(", "), this.positions["circle" + i].positionX - 175, this.positions["circle" + i].positionY + 7, this.fontSize);
    }

    let group2PreferenceList: Array<Array<string>> = Object.values(this.currentCommand["group2CurrentPreferences"]);
    let currentLetter = 'A';

    for (let i = 1; i < this.algService.numberOfGroup2Agents + 1; i++) {
      this.drawText(this.ctx, group2PreferenceList[i-1].join(", "), this.positions["circle" + currentLetter].positionX + 65, this.positions["circle" + i].positionY + 7, this.fontSize);
      // this.ctx.fillText(group2PreferenceList[i-1].join(", "), this.positions["circle" + currentLetter].positionX + 65, this.positions["circle" + currentLetter].positionY + 7);
      currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
    }


    // for (let [currentAgent, preferences] of Object.entries(this.playback.algorithmData["men"])) {
    //   console.log(currentAgent);
    //   let preferenceString: string = Object.values(preferences).join(", ");
    //   console.log(preferenceString);
    //   console.log("----------");
      
    // }
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
                    if(t === "+"){  // Increase size
                        size *= 1/(3/4);
                    }else if(t === "-"){  // decrease size
                        size *= 3/4;
                    }else if(t === "s"){ // sub script
                        y += size * (1/3);
                        size  *= (2/3);
                    }else if(t === "S"){ // super script
                        y -= size * (1/3);
                        size  *= (2/3);
                    }else if(t === "#"){
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
    // canvas.style.width = String(canvas.width / 2);
    // canvas.style.height = String(canvas.height / 2);

    this.setFont();

    // update positions of all canvas elements
    this.calculateEqualDistance();

    // draw lines between circles (matches and relations)
    for (let line of this.currentCommand["currentLines"]) {
      console.log("-------------- HEREEEEE");
      console.log(this.currentCommand["currentLines"]);
      this.drawLine(line);
    }
    // this.drawLineBetween("circle1", "circleE", "red")
    // this.drawLineBetween("circle1", "circleB");

    // draw circles
    this.drawLHSCircles();
    this.drawRHSCircles();

    if (this.drawPreferences && this.currentCommand) {
      this.drawAllPreferences();
    }

    // console.log();
    this.selectCircles(this.currentCommand["currentlySelectedAgents"]);

  }
}