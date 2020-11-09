import { Injectable } from '@angular/core';
import { ExecutionService } from './algorithms/execution.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  public algorithmData: Object;
  public playbackData: Object;

  constructor(public exeService: ExecutionService) { }

  setAlgorithm(algorithm: string, numPeople: number) { 
    this.algorithmData = this.exeService.getExecutionFlow(algorithm, numPeople);
    console.log(this.algorithmData);
  }
}
