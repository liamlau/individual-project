import { Injectable } from '@angular/core';
import { GaleShapley } from './gale-shapley.interface';

@Injectable({
  providedIn: 'root'
})
export class GaleShapleyService {

  men: Object = {};
  women: Object = {};

  freeMen: Array<string> = [];
  freeWomen: Array<string> = [];

  matches: Object = {};

  group1CurrentPreferences: Object;
  group2CurrentPreferences: Object;

  currentlySelectedAgents: Array<string> = [];

  currentLines: Array<Array<string>> = [];

  commandList = {
    men: null,
    women: null,
    commands: []
  };

  commandMap = {
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
  };

  constructor() { }

  initialise(): void {
    this.freeMen = [];
    this.freeWomen = [];
    this.commandList = {
      men: null,
      women: null,
      commands: []
    };
  }

  createPeople(numPeople: number): void {

    let currentLetter = 'A';

    for (let i=1; i<numPeople+1; i++) {
      let manName = "man" + i;
      let womanName = "woman" + currentLetter;

      this.men[manName] = {
          name: manName,
          "match": null,
          "lastProposed": 0
      }

      this.women[womanName] = {
          name: womanName,
          "match": null
      }

      this.freeMen.push(manName);
      this.freeWomen.push(womanName);

      currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);

    }
  }

  createRandomRankings(): void {
    // create rankings for men
    let womanObjectList = this.freeWomen.map(woman => this.women[woman]);
    for (let man in this.men) {
        this.shuffle(womanObjectList);
        let rankings = Object.assign([], womanObjectList);
        this.men[man]["ranking"] = rankings;
    }
    
    // create rankings for women
    let manObjectList = this.freeMen.map(man => this.men[man]);
    for (let woman in this.women) {
        this.shuffle(manObjectList);
        let rankings = Object.assign([], manObjectList);
        this.women[woman]["ranking"] = rankings;
    }
  }


  getMenRankings(): Object {
    let matches: Object = {};
    for (let man in this.men) {
      let rankingsList = [];
      // matches[woman] = this.women[woman]["ranking"];
      for (let woman of this.men[man]["ranking"]) {
        rankingsList.push(woman["name"].slice(5));
      }
      matches[man.slice(3)] = rankingsList;
    }
    return matches;
  }


  getWomenRankings(): Object {
    let matches: Object = {};
    for (let woman in this.women) {
      let rankingsList = [];
      // matches[woman] = this.women[woman]["ranking"];
      for (let man of this.women[woman]["ranking"]) {
        rankingsList.push(man["name"].slice(3));
      }
      matches[woman.slice(5)] = rankingsList;
    }
    return matches;
  }


  generateMatches(): Object {
    let matches: Object = {}

    // // console.log(men);
    // // console.log(women);

    // matches["matchString"] = "| ";

    for (let woman in this.women) {
      if (this.women[woman]["match"]) {
        matches[woman] = this.women[woman]["match"]["name"];
      } else {
        matches[woman] = "";
      }
      // matches["matchString"] += woman + ": " + this.women[woman]["match"]["name"] + " | ";
    }

    return matches;
  }


  // TODO: make it so that at every step, we know what is emboldened
    // this way, we can reset by using the playback tools

  generateChanges(): void {

    let currentSelected = new Set();
    
    for (let stepNumber in this.commandList["commands"]) {

      let step = this.commandList["commands"][stepNumber];

      let changeTrace = {};
      let embolden = [];

      if (step["lineNumber"] == 2 || step["lineNumber"] == 1) {
        changeTrace["reset"] = Array.from(currentSelected);
        currentSelected = new Set();
      } else {
        changeTrace["reset"] = [];
      }

      if (step["stepVariables"]) {
        for (let key in step["stepVariables"]) {
          embolden.push(step["stepVariables"][key]);
          currentSelected.add(step["stepVariables"][key]);
        }
        if (step["lineNumber"] == 3) {
          currentSelected.add(embolden[1] + embolden[0]);
          currentSelected.delete(embolden[0]);
          currentSelected.delete(embolden[1]);
          embolden = [embolden[1] + embolden[0]];
        } else if (step["lineNumber"] == 7) {
          currentSelected.add(embolden[0] + embolden[1]);
          currentSelected.add(embolden[0] + embolden[2]);
          currentSelected.delete(embolden[1]);
          currentSelected.delete(embolden[2]);
          embolden = [embolden[0] + embolden[1], embolden[0] + embolden[2]];
        }
      }

      if (Number(stepNumber) > 0) {
        if (step["lineNumber"] != 2) {
          for (let item of this.commandList["commands"][Number(stepNumber)-1]["changeTrace"]["embolden"]) {
            embolden.push(item);
          }
        }
      }

      console.log(stepNumber + ": " + embolden);

      changeTrace["embolden"] = embolden;
      
      step["changeTrace"] = changeTrace;
      // this.commandList["commands"]["changeTrace"] = changeTrace;

    }
  }


  // #53D26F (green)
  // #C4C4C4 (grey)
  changePreferenceStyle(preferenceList: Object, person: string, position: number, style: string) {

    let currentAgent: string = "";

    if (preferenceList[person][position].includes("#")) {
      currentAgent = preferenceList[person][position].charAt(preferenceList[person][position].length - 2);
    } else {
      currentAgent = preferenceList[person][position].charAt(preferenceList[person][position].length - 1);
    }

    if (style == "green") {
      style = "#53D26F";
    } else if (style == "red") {
      style = "#EB2A2A";
    } else if (style == "grey") {
      style = "#C4C4C4";
    } else if (style == "black") {
      style = "#000000";
    }

    console.log("agent: " + person);
    console.log("position: " + String(position));

    preferenceList[person][position] = "{" + style + currentAgent + "}";

  }


  // FROM: https://javascript.info/task/shuffle
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  update(step: number, stepVariables?: Object): void {

    // let tempGroup1Preferences = Object.assign([], this.group1CurrentPreferences);

    let galeShapley: GaleShapley = {
      lineNumber: step,
      freeMen: Object.assign([], this.freeMen),
      matches: this.generateMatches(),
      stepVariables: stepVariables,
      changeTrace: {},
      group1CurrentPreferences: JSON.parse(JSON.stringify(this.group1CurrentPreferences)),
      group2CurrentPreferences: JSON.parse(JSON.stringify(this.group2CurrentPreferences)),
      currentlySelectedAgents: JSON.parse(JSON.stringify(this.currentlySelectedAgents)),
      currentLines: JSON.parse(JSON.stringify(this.currentLines)),
    }
    this.commandList.commands.push(galeShapley);
  }


  checkArrayEquality(a: Array<string>, b: Array<string>) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }


  removeArrayFromArray(a: Array<Array<string>>, b: Array<string>) {
    let arrayPositionCounter: number = 0;
    for (let subArray of a) {
      if (this.checkArrayEquality(subArray, b)) {
        a.splice(arrayPositionCounter, 1);
      }
      arrayPositionCounter++;
    }
  }


  run(numPeople: number): Object {

    this.initialise();
    
    this.createPeople(numPeople);
    this.createRandomRankings();

    console.log(this.commandList);

    this.commandList["men"] = this.getMenRankings();
    this.commandList["women"] = this.getWomenRankings();
    this.commandList["commands"] = [];

    this.group1CurrentPreferences = this.getMenRankings();
    this.group2CurrentPreferences = this.getWomenRankings();

    this.update(1);

    // console.log("\n\nAlgorithm Steps:");

    // 2: while some man m is free do
    while (this.freeMen.length > 0) {

      this.currentlySelectedAgents = [];
      
      let man: Object = this.men[this.freeMen[0]];
      this.currentlySelectedAgents.push(man["name"].substring(3));
      this.update(2, {"%man%": man["name"]});
      // console.log("-------");

      // 3: w = most preferred woman on m’s list to which he has not yet proposed;
      let woman: Object = man["ranking"][man["lastProposed"]];
      this.currentlySelectedAgents.push(woman["name"].substring(5));

      let redLine = [man["name"].substring(3), woman["name"].substring(5), "red"];
      this.currentLines.push(redLine);

      let greenLine = [];

      this.update(3, {"%woman%": woman["name"], "%man%": man["name"]});

      // console.log("Man: " + man["name"]);
      // console.log("Woman: " + woman["name"]);

      man["lastProposed"] += 1;
      // man["ranking"].shift();
      this.update(4, {"%woman%": woman["name"]});

      if (!woman["match"]) {
          // console.log(woman["name"] + " was free, so matching her with " + man["name"]);
          woman["match"] = man;
          man["match"] = woman;
          this.freeMen.shift();

          // colour preferences (for when a partner is instantly selected)
          this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), woman["ranking"].findIndex(((manToFind: { name: string; }) => manToFind.name == man["name"])), "green");
          this.changePreferenceStyle(this.group1CurrentPreferences, man["name"].substring(3), man["ranking"].findIndex(((womanToFind: { name: string; }) => womanToFind.name == woman["name"])), "green");

          this.removeArrayFromArray(this.currentLines, redLine);
          // this.currentLines = this.currentLines.filter(arr => arr[0] != redLine[0] && arr[1] != redLine[1] && arr[2] != redLine[2]);
          greenLine = [man["name"].substring(3), woman["name"].substring(5), "green"];
          this.currentLines.push(greenLine);

          this.update(5, {"%woman%": woman["name"], "%man%": man["name"]});

      } else {
        this.update(6, {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]})
        let manName = man["name"];
        this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), woman["ranking"].findIndex(((manToFind: { name: string; }) => manToFind.name == manName)), "red");
        // console.log("Index of current match (" + woman["match"]["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])));
        // console.log("Index of man (" + man["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName)) );
        this.update(7, {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]})

        // if the current woman prefers the current man to her current match
        if (woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])) > woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName))) {
          this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), woman["ranking"].findIndex(((manToFind: { name: string; }) => manToFind.name == woman["match"]["name"])), "grey");
          this.changePreferenceStyle(this.group1CurrentPreferences, woman["match"]["name"].substring(3), woman["match"]["ranking"].findIndex(((womanToFind: { name: string; }) => womanToFind.name == woman["name"])), "grey");
          this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), woman["ranking"].findIndex(((manToFind: { name: string; }) => manToFind.name == manName)), "green");

          this.removeArrayFromArray(this.currentLines, redLine);
          this.removeArrayFromArray(this.currentLines, [woman["match"]["name"].substring(3), woman["name"].substring(5), "green"]);

          // console.log(woman["name"] + " prefers " + man["name"] + " (current match) to " + woman["match"]["name"] + " (" + woman["match"]["name"] + " is free, " + man["name"] + " engaged to " + woman["name"] + ")");
          let match: string = woman["match"]["name"];

          this.freeMen.push(woman["match"]["name"]);
          woman["match"] = man;
          man["match"] = woman;
          
          greenLine = [man["name"].substring(3), woman["name"].substring(5), "green"];
          this.currentLines.push(greenLine);

          this.changePreferenceStyle(this.group1CurrentPreferences, man["name"].substring(3), man["ranking"].findIndex(((womanToFind: { name: string; }) => womanToFind.name == woman["name"])), "green");

          this.freeMen.shift();
          this.update(8, {"%woman%": woman["name"], "%man%": man["name"], "%match%": match})
        } else {
          this.changePreferenceStyle(this.group1CurrentPreferences, man["name"].substring(3), man["ranking"].findIndex(((womanToFind: { name: string; }) => womanToFind.name == woman["name"])), "grey");
          this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), woman["ranking"].findIndex(((manToFind: { name: string; }) => manToFind.name == manName)), "grey");
          // this.currentLines = this.currentLines.filter(arr => arr[0] != redLine[0] && arr[1] != redLine[1] && arr[2] != redLine[2]);
          this.removeArrayFromArray(this.currentLines, redLine);
          this.update(9, {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]})

          // console.log(woman["name"] + " prefers " + woman["match"]["name"] + " to " + man["name"] + " (no change)");
          this.update(10);

        }
      }
    }

    // let matches = this.generateMatches();
    this.currentlySelectedAgents = [];

    this.update(11);

    // // console.log(this.men);

    this.generateChanges();

    // console.log("------- COMMAND LIST")
    // console.log(this.commandList);

    // console.log("------- MATCHES")
    // console.log(this.generateMatches());
    console.log(this.men);
    console.log(this.women);

    // console.log(this.commandList["men"][1][0])
    // this.commandList["men"][1][0] = "{#53D26F" + this.commandList["men"][1][0] + "}";
    // this.changePreferenceStyle(this.commandList["men"], "1", 0, "green");


    return this.commandList;
  }

}


// // console.log("---- MEN'S RANKINGS");

// for (let man in this.men) {
//     let menRankings = [];
//     for (let woman in this.men[man]["ranking"]) {
//         menRankings.push(this.men[man]["ranking"][woman]["name"].slice(5));
//     }
//     // console.log(man + "'s rankings: [" + menRankings + "]");
// }

// // console.log("\n---- WOMEN'S RANKINGS");

// for (let woman in this.women) {
//     let womenRankings = [];
//     for (let man in this.women[woman]["ranking"]) {
//       womenRankings.push(this.women[woman]["ranking"][man]["name"].slice(3));
//     }
//     // console.log(woman + "'s rankings: [" + womenRankings + "]");
// }