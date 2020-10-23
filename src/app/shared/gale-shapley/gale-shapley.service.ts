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

  commandList = {
    men: null,
    women: null,
    commands: []
  };

  constructor() { }

  createPeople(numPeople: number): void {
    for (let i=1; i<numPeople+1; i++) {
      let manName = "man" + i;
      let womanName = "woman" + i;

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
        rankingsList.push(woman["name"]);
      }
      matches[man] = rankingsList;
    }
    return matches;
  }


  getWomenRankings(): Object {
    let matches: Object = {};
    for (let woman in this.women) {
      let rankingsList = [];
      // matches[woman] = this.women[woman]["ranking"];
      for (let man of this.women[woman]["ranking"]) {
        rankingsList.push(man["name"]);
      }
      matches[woman] = rankingsList;
    }
    return matches;
  }


  // FROM: https://javascript.info/task/shuffle
  shuffle(array: Array<Object>) {
    array.sort(() => Math.random() - 0.5);
  }

  update(step: number, stepVariables?: Object): void {
    let galeShapley: GaleShapley = {
      freeMen: Object.assign([], this.freeMen),
      matches: Object.assign([], this.matches),
      stepVariables: stepVariables
    }
    console.log(galeShapley);
    this.commandList.commands.push({[step]: galeShapley});
  }


  galeShapley(numPeople: number): Object {

    let commandList = [];
    
    this.createPeople(numPeople);
    this.createRandomRankings();

    this.commandList["men"] = this.getMenRankings();
    this.commandList["women"] = this.getWomenRankings();
    this.commandList["commands"] = [];

    commandList.push(1);

    this.update(1);

    console.log("---- MEN'S RANKINGS");

    for (let man in this.men) {
        let menRankings = [];
        for (let woman in this.men[man]["ranking"]) {
            menRankings.push(this.men[man]["ranking"][woman]["name"].slice(5));
        }
        console.log(man + "'s rankings: [" + menRankings + "]");
    }
    
    console.log("\n---- WOMEN'S RANKINGS");
    
    for (let woman in this.women) {
        let womenRankings = [];
        for (let man in this.women[woman]["ranking"]) {
          womenRankings.push(this.women[woman]["ranking"][man]["name"].slice(3));
        }
        console.log(woman + "'s rankings: [" + womenRankings + "]");
    }

    console.log("\n\nAlgorithm Steps:");

    // 2: while some man m is free do
    while (this.freeMen.length > 0) {
      
      let man: Object = this.men[this.freeMen[0]];
      this.update(2, {"%freeMen%": this.freeMen.toString(), "%man%": man["name"]});
      commandList.push({2: {"%freeMen%": this.freeMen.toString(), "%man%": man["name"]}});
      console.log("-------");

      // 3: w = most preferred woman on m’s list to which he has not yet proposed;
      let woman: Object = man["ranking"][man["lastProposed"]];
      commandList.push({3: {"%woman%": woman["name"], "%man%": man["name"]}});
      this.update(3, {"%woman%": woman["name"], "%man%": man["name"]});

      console.log("Man: " + man["name"]);
      console.log("Woman: " + woman["name"]);

      man["lastProposed"] += 1;
      // man["ranking"].shift();
      commandList.push({4: {"%woman%": woman["name"]}});
      this.update(4, {"%woman%": woman["name"]});

      if (!woman["match"]) {
          console.log(woman["name"] + " was free, so matching her with " + man["name"]);
          woman["match"] = man;
          this.freeMen.shift();
          commandList.push({5: {"%woman%": woman["name"], "%man%": man["name"]}});
          this.update(5, {"%woman%": woman["name"], "%man%": man["name"]});
      } else {
        commandList.push({6: {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]}});
        this.update(6, {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]})
        let manName = man["name"];
        console.log("Index of current match (" + woman["match"]["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])));
        console.log("Index of man (" + man["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName)) );
        commandList.push({7: {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]}});
        this.update(7, {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]})

        if (woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])) > woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName))) {
          console.log(woman["name"] + " prefers " + man["name"] + " (current match) to " + woman["match"]["name"] + " (" + woman["match"]["name"] + " is free, " + man["name"] + " engaged to " + woman["name"] + ")");
          commandList.push({8: {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]}});
          this.update(8, {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]})

          this.freeMen.push(woman["match"]["name"]);
          woman["match"] = man;
          this.freeMen.shift();
        } else {
          commandList.push({9: {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]}});
          this.update(9, {"%woman%": woman["name"], "%man%": man["name"], "%match%": woman["match"]["name"]})

          console.log(woman["name"] + " prefers " + woman["match"]["name"] + " to " + man["name"] + " (no change)");
          commandList.push(10);
          this.update(10);

        }
      }
    }

    let matches: Object = {}

    // console.log(men);
    // console.log(women);

    console.log("-----");

    let matchString: string = "| ";

    for (let woman in this.women) {
      matches[woman] = this.women[woman]["match"]["name"];
      matchString += woman + ": " + this.women[woman]["match"]["name"] + " | ";
    }

    console.log(matches);

    commandList.push({11: {"%matches%": matchString}});
    this.update(11, {"%matches%": matchString});

    // console.log(this.men);

    console.log("------- COMMAND LIST")
    console.log(this.commandList);

    console.log("------- OTHER COMMAND LIST")
    console.log(commandList);

    return this.commandList;
  }

}


