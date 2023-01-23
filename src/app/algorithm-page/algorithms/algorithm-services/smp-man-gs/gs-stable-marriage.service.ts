import { Injectable } from '@angular/core';
import { GaleShapley } from '../../abstract-classes/GaleShapley';
import { Agent } from '../../interfaces/Agent';
import { AlgorithmData } from '../../interfaces/AlgorithmData';
import { Man } from '../../interfaces/Man';

@Injectable({
  providedIn: 'root'
})
export class GsStableMarriageService extends GaleShapley {

  group1Name = "man";
  group2Name = "woman";

  group1Agents: Map<String, Man> = new Map();


  generateAgents() {
      for (let i = 1; i < this.numberOfAgents + 1; i++) {
          let group1AgentName = this.group1Name + i;

          this.group1Agents.set(group1AgentName, {
              name: group1AgentName,
              match: new Array(),
              ranking: new Array(),
              lastProposed: 0
          });

          this.freeAgentsOfGroup1.push(group1AgentName);

      }

      let currentLetter = 'A';

      for (let i = 1; i < this.numberOfGroup2Agents + 1; i++) {
          let group2AgentName = this.group2Name + currentLetter;

          this.group2Agents.set(group2AgentName, {
              name: group2AgentName,
              match: new Array(),
              ranking: new Array(),
          });

          currentLetter = String.fromCharCode((((currentLetter.charCodeAt(0) + 1) - 65 ) % 26) + 65);
      }

  }


  match(): AlgorithmData {
      this.update(1);
  
      // console.log("\n\nAlgorithm Steps:");

    //   console.log("Here", this.group1Agents)
    //   console.log(this.getGroupRankings(this.group1Agents))
  
      // 2: while some man m is free do
      while (this.freeAgentsOfGroup1.length > 0) {

          this.currentlySelectedAgents = [];
          this.relevantPreferences = [];
        
          let man: Man = this.group1Agents.get(this.freeAgentsOfGroup1[0]);
          this.relevantPreferences.push(man["name"].substring(3));
          this.currentlySelectedAgents.push(man["name"].substring(3));

        //   console.log("in loop", man.name)

          this.update(2, {"%man%": man.name});
          // console.log("-------");

          // 3: w = most preferred woman on m’s list to which he has not yet proposed;
          let woman: Agent = man.ranking[man.lastProposed];

          this.currentlySelectedAgents.push(woman["name"].substring(5));
          this.relevantPreferences.push(woman["name"].substring(5));

          let redLine = [man["name"].substring(3), woman["name"].substring(5), "red"];
          this.currentLines.push(redLine);
    
          let greenLine = [];
    
        //   console.log("change...", woman["name"].substring(5), this.findPositionInMatches(woman, man), "red")

          this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), this.findPositionInMatches(woman, man), "red");
          this.changePreferenceStyle(this.group1CurrentPreferences, man["name"].substring(3), this.findPositionInMatches(man, woman), "red");

          this.update(3, {"%woman%": woman.name, "%man%": man.name});

          // console.log("Man: " + man["name"]);
          // console.log("Woman: " + woman["name"]);

          man.lastProposed += 1;
          // man["ranking"].shift();
          this.update(4, {"%woman%": woman.name});

          if (woman.match.length <= 0) {
              // console.log(woman["name"] + " was free, so matching her with " + man["name"]);
              woman.match.splice(0, 1);
              woman.match.push(man);
              man.match[0] = woman;
              this.freeAgentsOfGroup1.shift();

              // colour preferences (for when a partner is instantly selected)
              this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), this.findPositionInMatches(woman, man), "green");
              this.changePreferenceStyle(this.group1CurrentPreferences, man["name"].substring(3), this.findPositionInMatches(man, woman), "green");

              this.removeArrayFromArray(this.currentLines, redLine);
              // this.currentLines = this.currentLines.filter(arr => arr[0] != redLine[0] && arr[1] != redLine[1] && arr[2] != redLine[2]);
              greenLine = [man["name"].substring(3), woman["name"].substring(5), "green"];
              this.currentLines.push(greenLine);

              this.update(5, {"%woman%": woman.name, "%man%": man.name});
          } else {
              this.relevantPreferences.push(woman.match[0].name.substring(3));
              this.update(6, {"%woman%": woman.name, "%man%": man.name, "%match%": woman.match[0].name})
              let manName = man.name;
              this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), this.findPositionInMatches(woman, man), "red");
              // console.log("Index of current match (" + woman["match"]["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == woman["match"]["name"])));
              // console.log("Index of man (" + man["name"] + "): " + woman["ranking"].findIndex(((man: { name: string; }) => man.name == manName)) );
              this.update(7, {"%woman%": woman.name, "%man%": man.name, "%match%": woman.match[0].name})

              

              if (woman.ranking.findIndex(((man: { name: string; }) => man.name == woman.match[0].name)) > woman.ranking.findIndex(((man: { name: string; }) => man.name == manName))) {

                  this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), this.findPositionInMatches(woman, woman["match"][0]), "grey");
                  this.changePreferenceStyle(this.group1CurrentPreferences, woman.match[0].name.substring(3), this.findPositionInMatches(woman.match[0], woman), "grey");
                  this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5), this.findPositionInMatches(woman, man), "green");
      
                  this.removeArrayFromArray(this.currentLines, redLine);
                  this.removeArrayFromArray(this.currentLines, [woman.match[0].name.substring(3), woman["name"].substring(5), "green"]);

                  // console.log(woman["name"] + " prefers " + man["name"] + " (current match) to " + woman["match"]["name"] + " (" + woman["match"]["name"] + " is free, " + man["name"] + " engaged to " + woman["name"] + ")");
                  let match: string = woman.match[0].name;

                  this.freeAgentsOfGroup1.push(match);
                  woman.match[0] = man;

                  greenLine = [man["name"].substring(3), woman["name"].substring(5), "green"];
                  this.currentLines.push(greenLine);
        
                  this.changePreferenceStyle(this.group1CurrentPreferences, man["name"].substring(3), this.findPositionInMatches(man, woman), "green");        

                  this.freeAgentsOfGroup1.shift();
                  this.update(8, {"%woman%": woman.name, "%man%": man.name, "%match%": match})
              } else {
                  this.changePreferenceStyle(this.group1CurrentPreferences, man["name"].substring(3), this.findPositionInMatches(man, woman), "grey");
                  this.changePreferenceStyle(this.group2CurrentPreferences, woman["name"].substring(5),this.findPositionInMatches(woman, man), "grey");
                  // this.currentLines = this.currentLines.filter(arr => arr[0] != redLine[0] && arr[1] != redLine[1] && arr[2] != redLine[2]);
                  this.removeArrayFromArray(this.currentLines, redLine);
                  this.update(9, {"%woman%": woman.name, "%man%": man.name, "%match%": woman.match[0].name})

                  // console.log(woman["name"] + " prefers " + woman["match"]["name"] + " to " + man["name"] + " (no change)");
                  this.update(10);

              }
          }
      }
  
      // let matches = this.generateMatches();
  
      this.currentlySelectedAgents = [];
      this.relevantPreferences = [];

      this.update(11);

      for (let woman of Array.from(this.group2Agents.values())) {
          woman.match[0].match[0] = woman;
      }
  
      return;
  }

}
