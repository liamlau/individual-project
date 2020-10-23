import { Injectable } from '@angular/core';
import { Simple } from './simple.interface';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {

  commandMap = {
    1: "Start a loop for 7 times and increment i on each loop",
    2: "Print i (%i%) to console.",
    3: "Checking if i (%i%) is equal to 5.",
    4: "i was equal to 5, so the program entered this block of code.",
    5: "i (%i%) wasn't equal to 5, so the program skipped the if block of code.",
    6: "Done!"
  }

  commandList = {
    commands: []
  }

  constructor() { }

  update(step: number, stepVariables?: Object): void {
    let galeShapley: Simple = {
      lineNumber: step,
      stepVariables: stepVariables
    }
    this.commandList.commands.push(galeShapley);
  }

  run(): Object {

    this.commandList = {
      commands: []
    }

    this.update(1);
    for (let i=1; i<8; i++) {
      console.log(i);
      this.update(2, {"%i%": i});
      this.update(3, {"%i%": i});
      if (i == 5) {
        console.log("this is now 5!");
        this.update(4);
      } else {
        this.update(5, {"%i%": i});
      }
    }
    this.update(6);
    return this.commandList;
  }

}