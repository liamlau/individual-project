import { Injectable } from '@angular/core';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { CanvasService } from '../canvas.service';
import { MatchingAlgorithm } from './abstract-classes/MatchingAlgorithm';
import { EgsResidentHSService } from './egs-resident-hs/egs-resident-hs.service';
import { GaleShapleyService } from './gale-shapley/gale-shapley.service';
import { AlgorithmData } from './interfaces/AlgorithmData';
import { SimpleService } from './simple/simple.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  commandMap = {}
  commandList = {};

  // add the services for any new algorithms here
  constructor(
    public algorithmRetrieval: AlgorithmRetrievalService
  ) { }

  initialise(): void {
    this.commandMap = {};
    this.commandList = {};
  }

  getExecutionFlow(algorithm: string, numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents): Object {
    this.initialise();
    let algorithmService: MatchingAlgorithm = this.algorithmRetrieval.mapOfAvailableAlgorithms.get(algorithm).service;
    this.commandMap = this.algorithmRetrieval.mapOfAvailableAlgorithms.get(algorithm).helpTextMap;

    let commandList: AlgorithmData = algorithmService.run(numberOfAgents, numberOfGroup2Agents);
    commandList.descriptions = this.generateDescriptions(commandList);

    // this.drawService.redrawCanvas(commandList["commands"][0]);

    return commandList;
  }



  // --------------------------------------------------------- FUNCTIONS TO GENERATE LINE DESCRIPTIONS

  generateDescriptions(commandList: AlgorithmData): String[] {
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