import { Injectable } from '@angular/core';
import { Algorithm } from './Algorithm';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmRetrievalService {

  currentAlgorithm: Algorithm;

  numberOfGroup1Agents: number = 5;
  numberOfGroup2Agents: number = 5;

  mapOfAvailableAlgorithms: Map<String, Algorithm> = new Map([
    [
      "smp-man-gs", {
        id: "smp-man-gs",
        name: "Stable Marriage Problem",
        orientation: ["Man", "Woman"],
        algorithm: "Gale-Shapley Stable Matching",
        description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
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
          11: "A stable matching has been generated."
        }
      }
    ],

    [
      "smp-man-egs", {
        id: "smp-man-egs",
        name: "Stable Marriage Problem",
        orientation: ["Man", "Woman"],
        algorithm: "Extended Gale-Shapley Stable Matching",
        description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
  
        },
      }
    ],

    [
      "hr-hospital-egs", {
        id: "hr-hospital-egs",
        name: "Hospital/Residents Problem",
        orientation: ["Hospital", "Resident"],
        algorithm: "Extended Gale-Shapley Stable Matching",
        description: "The hospital/residents problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>hospital-oriented</b> version of the algorithm, so <b>hospitals will propose to residents</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
  
        },
      }
    ],

    [
      "hr-resident-egs", {
        id: "hr-resident-egs",
        name: "Hospital/Residents Problem",
        orientation: ["Resident", "Hospital"],
        algorithm: "Extended Gale-Shapley Stable Matching",
        description: "The hospital/residents problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>resident-oriented</b> version of the algorithm, so <b>residents will propose to hospitals</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
          1: "placeholder 1",
          2: "placeholder 2",
          3: "placeholder 3",
          4: "placeholder 4",
          5: "placeholder 5",
          6: "placeholder 6",
          7: "placeholder 7",
          8: "placeholder 8",
          9: "placeholder 9",
          10: "placeholder 10",
          11: "placeholder 11",
          12: "placeholder 12",
        },
      }
    ],
  ]);

  pluralMap: Map<string, string> = new Map([
    ["Man", "Men"],
    ["Woman", "Women"],
    ["Resident", "Residents"],
    ["Hospital", "Hospitals"]
  ]);

  constructor() { }

  getListOfAlgorithms(): Array<Algorithm> {
    return Array.from(this.mapOfAvailableAlgorithms.values());
  }

}
