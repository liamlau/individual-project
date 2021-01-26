import { Injectable } from '@angular/core';
import { Algorithm } from './Algorithm';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmRetrievalService {

  currentAlgorithm: Algorithm;

  numberOfGroup1Agents: number = 5;
  numberOfGroup2Agents: number = 5;

  listOfAvailableAlgorithms: Array<Algorithm> = [
    {
      id: "smp-man-gs",
      name: "Stable Marriage Problem",
      orientation: "Man",
      algorithm: "Gale-Shapley Stable Matching",
      description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Gale-Shapley Stable Marriage algorithm is used."
    },
    {
      id: "smp-man-egs",
      name: "Stable Marriage Problem",
      orientation: "Man",
      algorithm: "Extended Gale-Shapley Stable Matching",
      description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used."
    },
    {
      id: "hr-hospital-egs",
      name: "Hospital/Residents Problem",
      orientation: "Hospital",
      algorithm: "Extended Gale-Shapley Stable Matching",
      description: "The hospital/residents problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>hospital-oriented</b> version of the algorithm, so <b>hospitals will propose to residents</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used."
    },
    {
      id: "hr-resident-egs",
      name: "Hospital/Residents Problem",
      orientation: "Resident",
      algorithm: "Extended Gale-Shapley Stable Matching",
      description: "The hospital/residents problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>resident-oriented</b> version of the algorithm, so <b>residents will propose to hospitals</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used."
    },
  ];

  constructor() { }
}
