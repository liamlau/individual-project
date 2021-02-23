import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlgorithmRetrievalService } from '../algorithm-retrieval.service';
import { AnimationGuideDialogComponent } from './animation-guide-dialog/animation-guide-dialog.component';
import { CanvasService } from './canvas.service';
import { EditPreferencesDialogComponent } from './edit-preferences-dialog/edit-preferences-dialog/edit-preferences-dialog.component';
import { PlaybackService } from './playback.service';
declare var anime: any;
declare var $: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.scss']
})
export class AlgorithmPageComponent implements OnInit {

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  showCode: boolean = false;
  dialogOpen: boolean = false;

  tutorialStep: number;

  constructor(public playback: PlaybackService, public algorithmService: AlgorithmRetrievalService, public drawService: CanvasService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {

    this.drawService.canvas = this.canvas;
    this.drawService.ctx = this.canvas.nativeElement.getContext('2d');

    // this.algorithm.setValue("Gale-Shapley Stable Marriage");

    // this.algorithmService.currentAlgorithm = this.algorithmService.mapOfAvailableAlgorithms.get("smp-man-gs");
    // this.playback.setAlgorithm("smp-man-gs", 5);

    // smp-man-gs
    // smp-man-egs
    // hr-resident-egs

    // this.algorithmService.numberOfGroup1Agents = 9
    // this.algorithmService.numberOfGroup2Agents = 4

    // this.algorithmService.currentAlgorithm = this.algorithmService.mapOfAvailableAlgorithms.get("hr-resident-egs");
    // this.playback.setAlgorithm("hr-resident-egs", 9, 4);

    // uncomment the line below to enable working algorithm selection
    this.playback.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents);

    $(function () {
      $('[data-toggle="popover"]').popover()
    })

    this.tutorialStep = 0;

    // this.nextTutorialStep();

  }

  ngAfterViewInit(): void {

    // let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    // var parent = document.getElementById("parent");
    // canvas.width = parent.offsetWidth - 20;
    // canvas.height = parent.offsetHeight - 20;
    // var yMid = window.innerHeight / 2;
    // console.log(yMid);

    // var yPos = document.querySelector('.option-box').getBoundingClientRect().y;
    // console.log(yPos)

    anime({
      targets: '.navbar',
      easing: 'easeOutQuint',
      translateY: [-150, 0],
      // opacity: [0, 1],
      delay: 200,
      duration: 900
    })

    anime({
      targets: '.sidebar',
      easing: 'easeInOutQuint',
      translateX: [-500, 0],
      // opacity: [0, 1],
      delay: 270,
      duration: 1000
    })

    anime({
      targets: '#sidebarContent',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [0, 1],
      delay: 270,
      duration: 1500
    })

    anime({
      targets: '#mainContent',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [0, 1],
      delay: 670,
      duration: 900
    })
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.dialogOpen && this.tutorialStep == 0) {
      if (event.key == "ArrowRight" || event.key == "d") {
        if (!(!this.playback.pause || this.playback.stepCounter >= this.playback.numCommands)) {
          this.playback.forwardStep();
        }
      } else if (event.key == "ArrowLeft" || event.key == "a") {
        if (!(!this.playback.pause || this.playback.stepCounter == 0)) {
          this.playback.backStep();
        }
      }
    }
  }


  // async goToPage(page: string): Promise<void> {
  //   if (!(this.router.url == page)) {
  //     this.currentPage = page;
  //     this.fadeCurrentPage();
  //     await this.delay(400);
  //     this.router.navigateByUrl(page);
  //   }
  // }


  firstSelection: boolean = true
  algorithm = new FormControl('');
  numPeople: number;

  changeAlgorithm() {

    this.playback.firstRun = true;
    this.playback.resetPlaybackData();
    this.numPeople = 5;
    if (this.firstSelection) {
      this.firstSelection = false;
      anime({
        targets: '.title-container',
        easing: 'easeInOutQuint',
        translateY: [400, 20],
        opacity: [0, 1],
        duration: 400
      })
      anime({
        targets: '.code-block, .playback-block',
        easing: 'easeInOutQuint',
        opacity: [0, 1],
        duration: 400,
        delay: 200
      });
    } else {
      anime({
        targets: '.code-block, .playback-block',
        easing: 'easeInOutQuint',
        opacity: [0, 1],
        duration: 400,
      });
    }
  }

  toggleExpansion() {
    var terminalElement = document.getElementById("terminal");
    if (this.showCode) {
      terminalElement.style.display = "none";
      terminalElement.style.visibility = "none";
      // anime({
      //   targets: '.terminal-header',
      //   easing: 'easeInOutQuint',
      //   translateY: [0, 200],
      //   duration: 400
      // })
      // anime({
      //   targets: '.terminal',
      //   easing: 'easeInOutQuint',
      //   translateY: [0, -50],
      //   opacity: [1, 0],
      //   duration: 400
      // })
    } else {
      // maybe try animating the height?
      terminalElement.style.display = "";
      terminalElement.style.visibility = "visible";
      // anime({
      //   targets: '.terminal-header',
      //   easing: 'easeInOutQuint',
      //   translateY: [200, 0],
      //   duration: 400
      // })
    }

    this.showCode = !this.showCode;

  }


  openEditPreferencesDialog(): void {
    const dialogRef = this.dialog.open(EditPreferencesDialogComponent);

    this.dialogOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
      console.log(`Dialog result: ${result}`);
    });

  }


  openAnimationGuideDialog(): void {
    const dialogRef = this.dialog.open(AnimationGuideDialogComponent);

    this.dialogOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
      console.log(`Dialog result: ${result}`);
    });

  }


  async goHome(page: string): Promise<void> {
    if (!(this.router.url == page)) {

      anime({
        targets: '.navbar',
        easing: 'easeOutQuint',
        translateY: [0, -150],
        // opacity: [0, 1],
        delay: 400,
        duration: 900
      })
  
      anime({
        targets: '.sidebar',
        easing: 'easeInOutQuint',
        translateX: [0, -500],
        // opacity: [0, 1],
        duration: 600
      })
  
      anime({
        targets: '#sidebarContent',
        easing: 'easeInOutQuint',
        // translateX: [-1500, 0],
        opacity: [1, 0],
        duration: 600
      })
  
      anime({
        targets: '#mainContent',
        easing: 'easeInOutQuint',
        // translateX: [-1500, 0],
        opacity: [1, 0],
        duration: 600
      })

      await this.delay(1000);

      this.router.navigateByUrl(page);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  async generateNewPreferences() {

    var command = this.playback.commandList[this.playback.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.backgroundColor = "";
    a.style.color = "";

    anime({
      targets: '#myCanvas',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [1, 0],
      duration: 300
    })
    await this.delay(300);
    this.playback.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents);
    anime({
      targets: '#myCanvas',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [0, 1],
      duration: 300
    })
  }


  nextTutorialStep(): void {
    console.log(this.tutorialStep);
    if (this.tutorialStep == 0) {
      this.showCode = false;
      this.startTutorial();
    } else if (this.tutorialStep == 1) {
      this.sidebarTutorial();
    } else if (this.tutorialStep == 2) {
      this.mainContentTutorial();
    } else if (this.tutorialStep == 3) {
      this.stopTutorial();
    }
  }

  startTutorial(): void {
    this.tutorialStep += 1;
    $('.navbarPopover').popover('show');
  }

  sidebarTutorial(): void {
    console.log(this.tutorialStep);
    this.tutorialStep += 1;
    console.log(this.tutorialStep);
    $('.navbarPopover').popover('hide');
    $('.sidebarPopover').popover('show');
  }

  mainContentTutorial(): void {
    this.tutorialStep += 1;
    $('.sidebarPopover').popover('hide');
    $('.mainContentPopover').popover('show');
  }

  stopTutorial(): void {
    this.tutorialStep = 0;
    $('.navbarPopover').popover('hide');
    $('.sidebarPopover').popover('hide');
    $('.mainContentPopover').popover('hide');
  }

}
