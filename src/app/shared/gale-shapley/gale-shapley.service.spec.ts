import { TestBed } from '@angular/core/testing';

import { GaleShapleyService } from './gale-shapley.service';

describe('GaleShapleyService', () => {
  let service: GaleShapleyService;
  let commandStructure: Object;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaleShapleyService);
    commandStructure = service.run(10);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('generates stable matching', () => {
    let allStable = false;
    for (let i = 0; i < 100; i++) {
      let commandList = service.run(10);
      allStable = !(checkStability(commandList["men"], commandList["women"], commandList["commands"][commandList["commands"].length-1]["matches"]));
    }
    expect(allStable).toBeFalsy();
  });

  it('generates some commands', () => {
    expect(commandStructure["commands"].length).toBeGreaterThan(0, "there is nothing in commandStructure[commands]");
  });

});


function checkStability(menRankings: Object, womenRankings: Object, matches: Object): boolean {

  let menMatchList = generateInverseMapping(matches);
  // console.log(menMatchList);

  // console.log("------------");
  for (let woman in matches) {
      // console.log(woman);
      // console.log(matches[woman]);
      let womanNumber = woman.slice(5);
      let manNumber = matches[woman].slice(3);
      // console.log(womenRankings[womanNumber]);
      let manPositionInRankings = womenRankings[womanNumber].findIndex(((element: string) => element == manNumber));
      // console.log("Position of man: " + manPositionInRankings);

      // for men in positions (manPositionInRankings..0)
      for (let i=manPositionInRankings-1; i >= 0; i--) {
          let womanPositionInRankings = menRankings[womenRankings[womanNumber][i]].findIndex(((element: string) => element == womanNumber));
          // console.log("Woman position in man" + womenRankings[womanNumber][i] + "'s rankings: " + womanPositionInRankings);
          let matchRanking = menRankings[womenRankings[womanNumber][i]].findIndex(((element: string) => element == menMatchList["man"+womenRankings[womanNumber][i]].slice(5)));
          // console.log("Man's match ranking (" + menMatchList["man"+womenRankings[womanNumber][i]] + "): " + matchRanking);

          if (matchRanking > womanPositionInRankings) {
              return false;
          }
      }
      // console.log("------------");
  }
  // console.log("stable: " + stable);
  return true;
}


function generateInverseMapping(womenMatches: Object) {

  let menMatches = {};

  for (var key in womenMatches) {
      if (womenMatches.hasOwnProperty(key)) {
          menMatches[womenMatches[key]] = key;
      }
  }
  return menMatches;
}