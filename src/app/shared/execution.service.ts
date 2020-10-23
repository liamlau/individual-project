import { Injectable } from '@angular/core';
import { GaleShapleyService } from './gale-shapley/gale-shapley.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  commandMap = {
    "simple": {
      1: "Start a loop for 7 times and increment i on each loop",
      2: "Print i (%i%) to console.",
      3: "Checking if i (%i%) is equal to 5.",
      4: "i was equal to 5, so the program entered this block of code.",
      5: "i (%i%) wasn't equal to 5, so the program skipped the if block of code.",
      6: "Done!"
    },
    "gale-shapley": {
      1: "Set the 'match' attribute of men and women to null",
      2: "While freeMen still has men in it, select the first one as m (%man%)",
      3: "%woman% is selected as %man%'s most preferred woman who he has not yet proposed to",
      4: "Checking to see if %woman% has a match",
      5: "%woman% was free, so matching her with %man%",
      6: "%woman% is currently matched to %match%, so can't instantly engage %woman% and %man%",
      7: "Checking if %woman% likes %match% more than %man%",
      8: "%woman% likes %man% (current proposer) more than %match% (current match) so free %match% and engage %woman% and %man%",
      9: "%woman% likes %match% more than %man%",
      10: "No change to anyone's matches",
      11: "A stable matching has been generated: %matches%"
    }
  }

  algorithm: string;
  commandList = {};

  constructor(public gsService: GaleShapleyService) { }

  getExecutionFlow(algorithm: string, numPeople: number): any[] {
    this.algorithm = algorithm;
    if (algorithm == "gale-shapley") {
      return [this.gsStableMarriage(numPeople), this.commandMap[algorithm]];
    }
    return [this.simpleFunction(), this.commandMap[algorithm]];
  }

  simpleFunction(): Object {
    let commandList = [];
    commandList.push(1);
    for (let i=1; i<8; i++) {
      console.log(i);
      commandList.push({2: {"%i%": i}});
      commandList.push({3: {"%i%": i}});
      if (i == 5) {
        console.log("this is now 5!");
        commandList.push(4);
      } else {
        commandList.push({5: {"%i%": i}});
      }
    }
    commandList.push(6);
    this.commandList["commands"] = commandList;
    return this.commandList;
  }


  public gsStableMarriage(numPeople: number): Object {
    this.commandList = this.gsService.galeShapley(numPeople);
    this.commandList["descriptions"] = this.generateDescriptions();
    return this.commandList;
  }


  generateDescriptions(): Object {
    let descriptions = [];

    for (let step of this.commandList["commands"]) {

      let lineNumber = Number(Object.keys(step)[0]);
      let stepVariables = step[lineNumber]["stepVariables"];

      if (stepVariables) {
        descriptions.push(this.generateMessage(lineNumber, stepVariables));
      } else {
        descriptions.push(this.commandMap[this.algorithm][lineNumber]);
      }
    }

    console.log(descriptions[15]);

    return descriptions;
  }


  generateMessage(commandNum: number, replacements: Object): string {

    var str = this.commandMap[this.algorithm][commandNum];

    // FROM: https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions
    str = str.replace(/%\w+%/g, function(all: string | number) {
      return replacements[all] || all;
    });

    return str;
  }

}
