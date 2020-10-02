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
    1: "Start a loop for 7 times and increment i on each loop",
    2: "Print i (%i%) to console.",
    3: "Checking if i (%i%) is equal to 5.",
    4: "i was equal to 5, so the program entered this block of code.",
    5: "i (%i%) wasn't equal to 5, so the program skipped the if block of code.",
    6: "Done!"
  };

  returnText = "Click start to run the program below!";

  executeFunction(): void {
    this.commandList = [];
    this.commandList.push(1);
    for (let i=1; i<8; i++) {
      console.log(i);
      this.commandList.push({2: {"%i%": i}});
      this.commandList.push({3: {"%i%": i}});
      if (i == 5) {
        console.log("this is now 5!");
        this.commandList.push(4);
      } else {
        this.commandList.push({5: {"%i%": i}});
      }
    }
    this.commandList.push(6);
    this.play();
  }

  async play(): Promise<void> {
    for (let command of this.commandList) {
      var commandNum: number;

      if (command instanceof Object) {
        commandNum = Number(Object.keys(command)[0]);
        this.returnText = this.generateMessage(commandNum, command[Object.keys(command)[0]]);
      } else {
        commandNum = command;
        this.returnText = this.commandMap[commandNum];
      }

      let a = document.getElementById("line" + commandNum);
      a.style.color = "#37FF00";
      this.currentStep = commandNum;

      await this.sleep(this.timeInBetween);
      a.style.color = "";

    }
  }

  generateMessage(commandNum: number, replacements: Object): string {

    var str = this.commandMap[commandNum];

    // FROM: https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions
    str = str.replace(/%\w+%/g, function(all) {
      return replacements[all] || all;
    });

    return str;
  }

  async sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
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
