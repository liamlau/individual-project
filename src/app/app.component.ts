import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'individual-project';
  currentStep = 0;
  timeInBetween: number = 500;
  commandList = [];

  commandMap = {
    0: "",
    1: "Start a loop for 7 times and increment i on each loop",
    2: "Print i (%i%) to console.",
    3: "Done!"
  };

  returnText = "Click start to run the program below!";

  executeFunction() {
    this.commandList = [];
    this.commandList.push(1);
    for (let i=1; i<8; i++) {
      console.log(i);
      this.commandList.push({2: {"%i%": i}});
    }
    this.commandList.push(3);
    this.play();
    console.log(this.commandList);
  }

  async play() {
    for (let command of this.commandList) {
      if (command instanceof Object) {
        let commandNum = Number(Object.keys(command)[0]);

        this.returnText = this.generateMessage(commandNum, command[Object.keys(command)[0]]);

        let a = document.getElementById("line" + commandNum);
        a.style.color = "#37FF00";
        this.currentStep = commandNum;
        await this.sleep(this.timeInBetween);
        a.style.color = "";

        this.returnText = this.commandMap[commandNum];

      } else {
        console.log("here");
        let a = document.getElementById("line" + command);
        a.style.color = "#37FF00";
        this.currentStep = command;
        this.returnText = this.commandMap[command];
        await this.sleep(this.timeInBetween);
        a.style.color = "";
      }
    }
  }

  async sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }

  generateMessage(commandNum: number, replacements: Object): string {
    console.log(commandNum);
    console.log(replacements);

    var str = this.commandMap[commandNum];

    // FROM: https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions
    str = str.replace(/%\w+%/g, function(all) {
      return replacements[all] || all;
    });

    console.log(str);

    return str;
  }

  // slow() {
  //   this.timeInBetween = 1500;
  // }

  // med() {
  //   this.timeInBetween = 500;
  // }

  // fast() {
  //   this.timeInBetween = 200;
  // }

  // pause() {
  //   this.timeInBetween = Number.MAX_SAFE_INTEGER;
  // }

}
