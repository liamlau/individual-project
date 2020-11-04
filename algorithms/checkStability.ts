// To check if a matching is stable, we check for each assignment (w,m) if there is some other man m' that woman w would rather be matched with and who would rather be matched to woman w.
// This function will return true if the matching is stable and false otherwise.

import { GaleShapleyService } from "src/app/shared/gale-shapley/gale-shapley.service";

function checkStability(menRankings: Object, womenRankings: Object, matches: Object): Boolean {

    let stable = true;

    let menMatchList = generateInverseMapping(matches);
    // console.log(menMatchList);

    // console.log("------------");
    for (let woman in matches) {
        // console.log(woman);
        // console.log(matches[woman]);
        let womanNumber = woman.slice(-1);
        let manNumber = matches[woman].slice(-1);
        // console.log(womenRankings[womanNumber]);
        let manPositionInRankings = womenRankings[womanNumber].findIndex(((element: string) => element == manNumber));
        // console.log("Position of man: " + manPositionInRankings);

        // for men in positions (manPositionInRankings..0)
        for (let i=manPositionInRankings-1; i >= 0; i--) {
            let womanPositionInRankings = menRankings[womenRankings[womanNumber][i]].findIndex(((element: string) => element == womanNumber));
            // console.log("Woman position in man" + womenRankings[womanNumber][i] + "'s rankings: " + womanPositionInRankings);
            let matchRanking = menRankings[womenRankings[womanNumber][i]].findIndex(((element: string) => element == menMatchList["man"+womenRankings[womanNumber][i]].slice(-1)));
            // console.log("Man's match ranking (" + menMatchList["man"+womenRankings[womanNumber][i]] + "): " + matchRanking);

            if (matchRanking > womanPositionInRankings) {
                stable = false;
                // console.log("stable: " + stable);
                return stable;
            }
        }
        // console.log("------------");
    }
    // console.log("stable: " + stable);
    return stable;
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


let menRankings = {
    1: ["4", "2", "5", "1", "3"],
    2: ["1", "5", "2", "4", "3"],
    3: ["4", "2", "5", "3", "1"],
    4: ["2", "5", "3", "1", "4"],
    5: ["2", "5", "3", "4", "1"]
};
let womenRankings = {
    1: ["5", "3", "2", "1", "4"],
    2: ["2", "4", "3", "1", "5"],
    3: ["5", "1", "3", "4", "2"],
    4: ["5", "4", "1", "3", "2"],
    5: ["3", "2", "1", "4", "5"]
};
let womenMatchList = {
    woman1: "man2",
    woman2: "man4",
    woman3: "man5",
    woman4: "man1",
    woman5: "man3"
};

console.log(checkStability(menRankings, womenRankings, womenMatchList));

let a = new GaleShapleyService();
console.log(a.run(5));