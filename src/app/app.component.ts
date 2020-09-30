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
    1: "Start a loop for 2 times",
    2: "Print 1 to console.",
    3: "Print 2 to console.",
    4: "Print 3 to console.",
    5: "Print 4 to console.",
    6: "Print 5 to console.",
    7: "Print 6 to console.",
  };

  test() {
    this.commandList = [];
    this.commandList.push(1);
    for (let i=0; i<2; i++) {
      console.log(1);
      this.commandList.push(2);
      console.log(2);
      this.commandList.push(3);
      console.log(3);
      this.commandList.push(4);
      console.log(4);
      this.commandList.push(5);
      console.log(5);
      this.commandList.push(6);
      console.log(6);
      this.commandList.push(7);
    }
    this.play();
    console.log(this.commandList);
  }

  async play() {
    for (let command of this.commandList) {
      let a = document.getElementById("line" + command);
      a.style.color = "#37FF00";
      this.currentStep = command;
      await this.sleep(this.timeInBetween);
      a.style.color = "";
    }
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
