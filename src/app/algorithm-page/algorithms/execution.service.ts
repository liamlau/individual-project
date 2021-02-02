import { Injectable } from '@angular/core';
import { AlgorithmRetrievalService } from 'src/app/home-page/algorithm-tab-content/algorithm-retrieval.service';
import { CanvasService } from '../canvas.service';
import { EgsResidentHSService } from './egs-resident-hs/egs-resident-hs.service';
import { GaleShapleyService } from './gale-shapley/gale-shapley.service';
import { SimpleService } from './simple/simple.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  algorithm: string = "";
  commandMap = {}
  commandList = {};
  serviceMap = {
    "simple": this.simpleService,
    "smp-man-gs": this.gsService,
    "egs-resident-hr": this.egsResidentHsService
  }

  // add the services for any new algorithms here
  constructor(
    public simpleService: SimpleService,
    public gsService: GaleShapleyService,
    public egsResidentHsService: EgsResidentHSService,
    public drawService: CanvasService,
    public algorithmRetrieval: AlgorithmRetrievalService
  ) { }


  getExecutionFlow(algorithm: string, numPeople: number): Object {
    this.algorithm = algorithm;
    let algorithmService = this.serviceMap[algorithm];
    this.commandMap = this.algorithmRetrieval.mapOfAvailableAlgorithms.get(algorithm).helpTextMap;

    let commandList = algorithmService.run(numPeople);
    commandList["descriptions"] = this.generateDescriptions(commandList);

    // this.drawService.redrawCanvas(commandList["commands"][0]);

    return commandList;
  }



  // --------------------------------------------------------- FUNCTIONS TO GENERATE LINE DESCRIPTIONS

  generateDescriptions(commandList: Object): Object {
    let descriptions = [];

    for (let step of commandList["commands"]) {

      let lineNumber = step["lineNumber"];
      let stepVariables = step["stepVariables"];

      if (stepVariables) {
        descriptions.push(this.generateMessage(lineNumber, stepVariables));
      } else {
        descriptions.push(this.commandMap[lineNumber]);
      }
    }

    return descriptions;
  }


  generateMessage(commandNum: number, replacements: Object): string {

    var str = this.commandMap[commandNum];

    // FROM: https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions
    str = str.replace(/%\w+%/g, function(all: string | number) {
      return replacements[all] || all;
    });

    return str;
  }
  

}