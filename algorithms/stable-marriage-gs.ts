// Liam Lau
// The Stable Marriage Problem: Alg-GS
// From: Efficient Algorithms for Optimal Matching Problems Under Preferences (Augustine Kwanashie)

// PSEUDOCODE:
    // 1: set each person to be free;
    // 2: while some man m is free do
    // 3:   w = most preferred woman on m’s list to which he has not yet proposed;
    // 4:   if w is free then
    // 5:       assign m to w;
    // 6:   else
    // 7:       if w prefers m to her current partner m' then
    // 8:           assign m to w to be engaged and set m' to be free;
    // 9:       else
    // 10:          w rejects m’s proposal and remains with m' ; {m remains free}
    // 11: the stable matching consists of all n engagements;

// let men: Object = {
//     "Jeremy": {
//         "match": -1,
//         "ranking": [women["Jess"], "Sarah", "Lisa", "Linda"]        
//     },
//     "Jacob": {
//         "match": -1,
//         "ranking": [women["Linda"], "Sarah", "Lisa", "Jess"]
//     },
//     "Jerry": {
//         "match": -1,
//         "ranking": [women["Sarah"], "Linda", "Lisa", "Jess"]
//     },
//     "Jack": {
//         "match": -1,
//         "ranking": [women["Jess"], "Sarah", "Lisa", "Linda"]
//     }
// }

// let women: Object = {
//     "Jess": {
//         "match": -1,
//         "ranking": ["Jack", "Jerry", "Jacob", "Jeremy"]        
//     },
//     "Lisa": {
//         "match": -1,
//         "ranking": ["Jerry", "Jacob", "Jeremy", "Jack"]
//     },
//     "Sarah": {
//         "match": -1,
//         "ranking": ["Jack", "Jacob", "Jerry", "Jeremy"]
//     },
//     "Linda": {
//         "match": -1,
//         "ranking": ["Jacob", "Jeremy", "Jerry", "Jack"]
//     }
// }

let men: Object = {}
    // "Jeremy": {
    //     "name": "Jeremy",
    //     "match": null,     
    // },
    // "Jacob": {
    //     "name": "Jacob",
    //     "match": null,
    // },
    // "Jerry": {
    //     "name": "Jerry",
    //     "match": null,
    // },
    // "Jack": {
    //     "name": "Jack",
    //     "match": null,
    // }
// }

let women: Object = {}
    // "Jess": {
    //     "name": "Jess",
    //     "match": null,      
    // },
    // "Lisa": {
    //     "name": "Lisa",
    //     "match": null,
    // },
    // "Sarah": {
    //     "name": "Sarah",
    //     "match": null,
    // },
    // "Linda": {
    //     "name": "Linda",
    //     "match": null,
    // }
// }

// women["Jess"]["ranking"] = [men["Jack"], men["Jerry"], men["Jacob"], men["Jeremy"]];
// women["Lisa"]["ranking"] = [men["Jerry"], men["Jacob"], men["Jeremy"], men["Jack"]];
// women["Sarah"]["ranking"] = [men["Jack"], men["Jacob"], men["Jerry"], men["Jeremy"]];
// women["Linda"]["ranking"] = [men["Jacob"], men["Jeremy"], men["Jerry"], men["Jack"]];

// men["Jeremy"]["ranking"] = [women["Jess"], women["Sarah"], women["Lisa"], women["Linda"]];
// men["Jacob"]["ranking"] = [women["Linda"], women["Sarah"], women["Lisa"], women["Jess"]];
// men["Jerry"]["ranking"] = [women["Sarah"], women["Linda"], women["Lisa"], women["Jess"]];
// men["Jack"]["ranking"] = [women["Jess"], women["Sarah"], women["Linda"], women["Lisa"]];


let freeMen: Array<string> = [];
let freeWomen: Array<string> = [];


function createPeople(numPeople: number): void {
    for (let i=1; i<numPeople+1; i++) {
        let manName = "man" + i;
        let womanName = "woman" + i;

        men[manName] = {
            name: manName,
            "match": null
        }

        women[womanName] = {
            name: womanName,
            "match": null
        }

        freeMen.push(manName);
        freeWomen.push(womanName);
    }
}


function createRandomRankings(): void {
    // create rankings for men
    let womanObjectList = freeWomen.map(woman => women[woman]);
    for (let man in men) {
        shuffle(womanObjectList);
        let rankings = Object.assign([], womanObjectList);
        men[man]["ranking"] = rankings;
    }
    
    // create rankings for women
    let manObjectList = freeMen.map(man => men[man]);
    for (let woman in women) {
        shuffle(manObjectList);
        let rankings = Object.assign([], manObjectList);
        women[woman]["ranking"] = rankings;
    }
}

// FROM: https://javascript.info/task/shuffle
function shuffle(array: Array<Object>) {
    array.sort(() => Math.random() - 0.5);
}

createPeople(5);
createRandomRankings();

console.log("---- MEN'S RANKINGS");

for (let man in men) {
    process.stdout.write(man + "'s rankings: ");
    for (let woman in men[man]["ranking"]) {
        process.stdout.write(men[man]["ranking"][woman]["name"].slice(-1) + " ");
    }
    console.log("\n");
}

console.log("---- WOMEN'S RANKINGS");

for (let woman in women) {
    process.stdout.write(woman + "'s rankings: ");
    for (let man in women[woman]["ranking"]) {
        process.stdout.write(women[woman]["ranking"][man]["name"].slice(-1) + " ");
    }
    console.log("\n");
}

console.log("----");

// for (let man in women) {
//     console.log(women[man]["ranking"]);
// }


// let freeMen: Array<string> = ["Jeremy", "Jacob", "Jerry", "Jack"]
// let testArray = [];

// 1: set each person to be free;

// for (let man in men) {
//     men[man]["match"] = undefined;
// }

// for (let woman in women) {
//     women[woman]["match"] = undefined;
// }

// console.log("man: " + {man});
// console.log("woman: " + woman.toString);

// let man: Object = men[freeMen[0]]
// let woman: Object = man["ranking"][man["match"] + 1]

// console.log(man);

// if (woman["match"] == -1) {
//     console.log("woman free!");
// }

// console.log(women["Jess"]["ranking"].findIndex((man: { name: string; }) => man.name == men["Jeremy"]["name"]));
// console.log(men["Jack"])



// 2: while some man m is free do
while (freeMen.length > 0) {
    // 3: w = most preferred woman on m’s list to which he has not yet proposed;
    let man: Object = men[freeMen[0]];
    console.log("-------");

    let woman: Object = man["ranking"][0];

    console.log("Man: " + man["name"]);
    console.log("Woman: " + woman["name"]);

    man["ranking"].shift();
    if (!woman["match"]) {
        console.log(woman["name"] + " was free, so matching her with " + man["name"]);
        woman["match"] = man;
        freeMen.shift();
    } else {
        let manName = man["name"];
        console.log("Index of current match (" + woman["match"]["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])));
        console.log("Index of man (" + man["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName)) );
        if (woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])) > woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName))) {
            console.log(woman["name"] + " prefers " + man["name"] + " to " + woman["match"]["name"] + " (" + woman["match"]["name"] + " is free, " + man["name"] + " engaged to " + woman["name"] + ")");
            freeMen.push(woman["match"]["name"]);
            woman["match"] = man;
            freeMen.shift();
        } else {
            console.log(woman["name"] + " prefers " + woman["match"]["name"] + " to " + man["name"] + " (no change)");
        }
    }
}

let matches: Object = {}

// console.log(men);
// console.log(women);

console.log("-----");

for (let woman in women) {
    matches[woman] = women[woman]["match"]["name"];
}

console.log(matches);

console.log(men);


function isStable(matches: Object) {

}

/*

{
  woman1: 'man2',
  woman2: 'man4',
  woman3: 'man3',
  woman4: 'man5',
  woman5: 'man1'
}

*/