import { Injectable } from '@angular/core';
import { Algorithm } from './Algorithm';
import { EgsResidentHSService } from './algorithm-page/algorithms/egs-resident-hs/egs-resident-hs.service';
import { EgsStableMarriageService } from './algorithm-page/algorithms/smp-man-egs/egs-stable-marriage.service';
import { GsStableMarriageService } from './algorithm-page/algorithms/smp-man-gs/gs-stable-marriage.service';


// ------------------------------------------------------- ALGORITHM TEMPLATE

// [
//   "smp-man-egs", {
//     id: "smp-man-egs",
//     name: "Stable Marriage Problem",
//     orientation: ["Man", "Woman"],
//     algorithm: "Extended Gale-Shapley Stable Matching",
//     service: null,
//     description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
//     helpTextMap: {

//     },
//   }
// ],

// -------------------------------------------------------


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
        service: this.gsStableMarriageService,
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
        service: this.egsStableMarriageService,
        description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
          1: "Set all men and women to have no engagements",
          2: "While there are some men who are not engaged, select the next one (%currentAgent%)",
          3: "%potentialProposee% is selected as %currentAgent%'s most preferred woman who he has not yet proposed to",
          4: "Check if %woman% is currently engaged to someone",
          5: "%woman% is engaged to %currentPartner%, so break the engagement between them",
          6: "%woman% is not engaged, so continue with algorithm",
          7: "Engage %man% and %woman%",
          8: "Select each man with a worse preference ranking than %man% on %woman%\'s list",
          9: "%nextWorstMan% is chosen as the next worst man on %woman%\'s preference list",
          10: "Remove %nextWorstMan% and %woman% from each other\'s lists",
          11: "All men worse than %man% on %woman%\'s preference list have been removed",
          12: "A stable matching between men and women has been found",
        },
      }
    ],

    // base template for hr-hospital-egs
    // [
    //   "hr-hospital-egs", {
    //     id: "hr-hospital-egs",
    //     name: "Hospital/Residents Problem",
    //     orientation: ["Hospital", "Resident"],
    //     algorithm: "Extended Gale-Shapley Stable Matching",
    //     description: "The hospital/residents problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>hospital-oriented</b> version of the algorithm, so <b>hospitals will propose to residents</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
    //     helpTextMap: {
  
    //     },
    //   }
    // ],

    [
      "hr-resident-egs", {
        id: "hr-resident-egs",
        name: "Hospital/Residents Problem",
        orientation: ["Resident", "Hospital"],
        algorithm: "Extended Gale-Shapley Stable Matching",
        service: this.egsResidentHsService,
        description: "The hospital/residents problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>resident-oriented</b> version of the algorithm, so <b>residents will propose to hospitals</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
          1: "Clear the matches of all residents and hospitals",
          2: "The next resident who doesn't have a match and still has some hospitals in their preference list is selected (%currentAgent%\)",
          3: "The first hospital on %currentAgent%\'s preference list is selected (%potentialProposee%)",
          4: "Check if %hospital% is currently full: does it have the same number of residents as its available capacity?",
          5: "%hospital%'s number of residents is equal to its max capacity, so choose the worst resident assigned to %hospital% (%worstResident%)",
          6: "Clear the match between %hospital% and %worstResident%",
          7: "Assign %resident% to %hospital%",
          8: "Check if %hospital% is full after assigning %resident% to %hospital%",
          9: "%hospital% is fully subscribed, so choose the worst resident (%worstResident%) assigned to %hospital% and remove each successor to %worstResident%",
          10: "%nextResident% is chosen as the next resident to be removed from %hospital%'s list",
          11: "Remove %nextResident% from %hospital%'s list",
          12: "A stable matching between residents and hospitals has been found",
        },
      }
    ],

    // ADD NEW ALGORITHMS UNDER HERE

  ]);

  pluralMap: Map<string, string> = new Map([
    ["Man", "Men"],
    ["Woman", "Women"],
    ["Resident", "Residents"],
    ["Hospital", "Hospitals"]
  ]);

  constructor(
    public gsStableMarriageService: GsStableMarriageService,
    public egsStableMarriageService: EgsStableMarriageService,
    public egsResidentHsService: EgsResidentHSService,
  ) { }

  getListOfAlgorithms(): Array<Algorithm> {
    return Array.from(this.mapOfAvailableAlgorithms.values());
  }

}
