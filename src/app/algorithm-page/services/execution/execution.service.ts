import { Injectable } from '@angular/core';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
import { AlgorithmRetrievalService } from 'src/app/algorithm-retrieval.service';
import { MatchingAlgorithm } from '../../algorithms/abstract-classes/MatchingAlgorithm';
import { AlgorithmData } from '../../algorithms/interfaces/AlgorithmData';

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

  getExecutionFlow(algorithm: string, numberOfAgents: number, numberOfGroup2Agents: number = numberOfAgents, preferences: Map<String, Array<String>>, SRstable: boolean = true): Object {
    this.initialise();
    let algorithmService: MatchingAlgorithm = this.algorithmRetrieval.mapOfAvailableAlgorithms.get(algorithm).service;
    this.commandMap = this.algorithmRetrieval.mapOfAvailableAlgorithms.get(algorithm).helpTextMap;
    // console.log(this.commandMap);

    console.log("get execution flow", SRstable)
    let commandList: AlgorithmData = algorithmService.run(numberOfAgents, numberOfGroup2Agents, preferences, SRstable);

    commandList.descriptions = this.generateDescriptions(commandList);

    console.log(commandList);

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