import { Injectable } from '@angular/core';
import { Algorithm } from './Algorithm';
import { HrResidentEgsService } from './algorithm-page/algorithms/algorithm-services/hr-resident-egs/hr-resident-egs.service';
import { EgsStableMarriageService } from './algorithm-page/algorithms/algorithm-services/smp-man-egs/egs-stable-marriage.service';
import { GsStableMarriageService } from './algorithm-page/algorithms/algorithm-services/smp-man-gs/gs-stable-marriage.service';
import { StableRoomIrvService } from './algorithm-page/algorithms/algorithm-services/smp-room-irv/stable-room-irv.service';
import { HrHospitalEgsService } from './algorithm-page/algorithms/algorithm-services/hr-hospital-egs/hr-hospital-egs.service';


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
        equalGroups: true,
        algorithm: "Gale-Shapley Stable Matching",
        service: this.gsStableMarriageService,
        description: "The stable marriage problem is the problem of finding a stable matching between two equally sized sets of elements. In this case: <b>men and women</b>.<br><br>To do this, the Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
          1: "Ensure there are no pre-existing matches between men and women",
          2: "While there is still a man without a match, select the first one (%man%)",
          3: "%woman% is selected as %man%'s most preferred woman who he has not yet proposed to",
          4: "Checking to see if %woman% has a match",
          5: "%woman% was free, so matching her with %man%",
          6: "%woman% is currently matched to %match%, so can't instantly engage %woman% and %man%",
          7: "Checking if %woman% likes %match% more than %man%",
          8: "%woman% likes %man% (current proposer) more than %match% (current match) so free %match% and engage %woman% and %man%",
          9: "%woman% likes %match% more than %man%",
          10: "No change to anyone's matches",
          11: "A stable matching has been generated."
        },
        code: [
          "set each person to be free;",
          "while some man m is free do:",
          "\tw = next most preferred woman on m’s list;",
          "\tif w is free then",
          "\t\tassign m to w;",
          "\telse",
          "\t\tif w prefers m to her current partner m' then",
          "\t\t\tassign m to w to be engaged and set m' to be free;",
          "\t\telse",
          "\t\t\tw rejects m’s proposal and remains with m';",
          "the stable matching consists of all n engagements"
        ]
      }
    ],

    [
      "smp-man-egs", {
        id: "smp-man-egs",
        name: "Stable Marriage Problem",
        orientation: ["Man", "Woman"],
        equalGroups: true,
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
        code: [
          "set each person to be free;",
          "while some man m is free {",
          "\tw = first woman on m's list",
          "\tif w is currently engaged to someone {",
          "\t\tbreak engagement between w and w's current partner",
          "\t}",
          "\tprovisionally engage m and w",
          "\tfor each successor m'' of m on w's list {",
          "\t\tm'' = next worst man on w's preference list",
          "\t\tremove m'' from w's preference list and vice versa",
          "\t}",
          "}"   // a stable matching between men and women has been found
        ]
      }
    ],

    [
      "hr-resident-egs", {
        id: "hr-resident-egs",
        name: "Hospitals/Residents Problem",
        orientation: ["Resident", "Hospital"],
        equalGroups: false,
        algorithm: "Extended Gale-Shapley Stable Matching",
        service: this.HrResidentEgsService,
        description: "The Hospitals/Residents Problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>resident-oriented</b> version of the algorithm, so <b>residents will propose to hospitals</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
          1: "Clear the matches of all residents and hospitals",
          2: "The next resident who doesn't have a match and still has some hospitals in their preference list is selected (%currentAgent%\)",
          3: "The first hospital on %currentAgent%\'s preference list is selected (%potentialProposee%)",
          4: "Check if %hospital% is currently full: is it already matched with %capacity% resident(s)? If not, provisionally assign %resident% to %hospital%",
          5: "%hospital%'s number of residents is equal to its max capacity, so choose the worst resident assigned to %hospital% (%worstResident%)",
          6: "Clear the match between %hospital% and %worstResident%",
          7: "Assign %resident% to %hospital%",
          8: "Check if %hospital% is full after assigning %resident% to %hospital%",
          9: "%hospital% is fully subscribed, so choose the worst resident assigned to them (%worstResident%) and remove each successor from %hospital%'s preference list",
          10: "%nextResident% is chosen as the next resident to be removed from %hospital%'s list",
          11: "Remove %nextResident% from %hospital%'s list",
          12: "A stable matching between residents and hospitals has been found",
        },
        code: [
          "set each hospital and resident to be completely free;",
          "while (some resident r is free) and (r has a nonempty list)",
          "\th := first hospital on r's list",
          "\tif h is fully subscribed then",
          "\t\tr' := worst resident provisionally assigned to h",
          "\t\tassign r' to be free (clear match)",
          "\tprovisionally assign r to h",
          "\tif h is fully subscribed (after assigning r to h) then",
          "\t\ts := worst resident provisionally assigned to h",
          "\t\tfor each successor s' of s on h's list",
          "\t\t\tremove s' and h from each other's lists",
          "the stable matching consists of all n engagements"
        ]
      }
    ],

    // ADD NEW ALGORITHMS UNDER HERE

    [
      "hr-hospital-egs", {
        id: "hr-hospital-egs",
        name: "Hospitals/Residents Problem",
        orientation: ["Hospital", "Resident"],
        equalGroups: false,
        algorithm: "Extended Gale-Shapley Stable Matching",
        service: this.HrHospitalEgsService,
        description: "The Hospitals/Residents Problem is the problem of finding a stable matching between a set of <b>hospitals and residents</b>, where a hospital can take multiple residents.<br><br>This is the <b>hospital-oriented</b> version of the algorithm, so <b>hospitals will propose to residents</b>.<br><br>To do this, the Extended Gale-Shapley Stable Marriage algorithm is used.",
        helpTextMap: {
          1 : "Set all hospitals and residents to be completely free",
          2 : "While some hospital (%hospital%) is undersubscribed and has a resident on their preferance list that is not assigned to them",
          3 : "Set r to %resident% from hospital's preferance list",
          4 : "If %resident% is assigned to another hospital, unassign them from each other",
          5 : "Unassign %resident% and %oldHospital% from each other",
          6 : "Assign %resident% and %hospital% to each other",
          7 : "For each hospital h' after %hospital% on %resident%'s preferance list, remove them from each others preferance list",
          8 : "remove %resident% from %hospital%'s preferance list and %hospital% from %resident%'s preferance list",
          9 : "Stable matching is found",

          
        },
        code: [
          "Set each hospital and resident to be completely free",
          "While some hospital h is undersubscibed, and has a resident on their preferance list",
          "\t r := first resident on h's prefernace list not assigned to h",
          "\t if r is assigned to another hospital h'",
          "\t\t unassign r and h'",
          
          "\t provisionally assign r to h",
          "\t for each successor h' of h on r's list",
          "\t\t remove h' and r from each others preferance list",
          "stable matching is found "
          
         
        ]

    
      }
    ],

    [
      "smp-room-irv", {
        id: "smp-room-irv",
        name: "Stable Roommates Problem",
        orientation: ["Person", "Person"],
        equalGroups: true,
        algorithm: "Stable Roommates - Irving's Algorithm",
        service: this.StableRoomIrvService,
        description: "The stable roommates problem is the problem of finding a stable matching between 1 group of elements. In this case <b>people</b>.<br> <br>To do this the Irving’s algorithm is used ",
        helpTextMap: {
          1: "Set all people to be free",
          2 : "While some person %person% has not been assigned to a anyone and has a non-empty preferance list",
          3 : "check if %person%\'s preferance list is empty",
          4 : "end the algorithm, there is no stable matching",

          5 : "the first person on %person%\'s preferance list is selected - %selected%",
          6 : "set %person%\ to be provisonally assigned to selected person %selected%",

          7 : "check if any other person, other than %person% is assigned to %selected% ",
          8 : "If they are, then unassign them. unassign %old_person% from %selected%",

          9 : "look through %selected%\'s preferance list - %list%, for each person less prefered than %person%",
          10 : "remove %removee% from %person%\'s preferance list and remove %person% from %removee%\'s preferance list",

          11 : "While some person %person% has more then 1 person left in their preferance list - %list%",
          12 : "look for rotations within %person%\'s preferance list, that is a cycle of ordered pairs through preferance lists",
          13 : "if a rotation is found", //%rotation%
          14 : "delete pairs in rotation - remove %removee% from %person%\'s preferance list and remove %person% from %removee%\'s preferance list",

          15 : "check if any person has only 1 preferance left",
          16 : "assign %person% to the last person in their preferance list - %preferance%",
          17 : "check if %person%\'s preferance list is empty",
          18 : "end the algorithm, there is no stable matching",
         
          19 : "Stable mathcing found.",


        },
        code: [
          "Set each person to be free",
          "While some person p is free (not assigned to someone)",
          "\t if person p has a empty preferance list",
          "\t\t end - no stable matching",

          "\t person b := first preferance on p's list",
           "\t assign p to b",

          "\t if any person a is assigned to person b",
          "\t\t free a",

          "\t for each person c less preferded than p on b's preferance list",
          "\t\t remove c from p's list and remove p from c's list",
          // 10 lines so far 

          // PAHSE 2
          "While some person p has more than 1 preferance left",
          "look for rotations in perosn p's preferance list",
          "if rotation r is found",
          "\t delete pairs in rotation r",


          "\t if a person b has 1 perferance left",
          "\t\t person b := last preferance",

          "if any people have empty preferance lists",
          "\t end - no stable matching",
         

          "done"
          // 11 ---> 17 lines 
          
          
        ]
      }
    ],

    
   


  ]);

  pluralMap: Map<string, string> = new Map([
    ["Man", "Men"],
    ["Woman", "Women"],
    ["Resident", "Residents"],
    ["Hospital", "Hospitals"],
    ["Person", "People"],

  ]);

  constructor(
    public gsStableMarriageService: GsStableMarriageService,
    public egsStableMarriageService: EgsStableMarriageService,
    public HrResidentEgsService: HrResidentEgsService,
    public StableRoomIrvService: StableRoomIrvService,
    public HrHospitalEgsService: HrHospitalEgsService,
  ) { }

  getListOfAlgorithms(): Array<Algorithm> {
    return Array.from(this.mapOfAvailableAlgorithms.values());
  }

}
