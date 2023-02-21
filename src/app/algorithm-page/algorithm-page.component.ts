import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlgorithmRetrievalService } from '../algorithm-retrieval.service';
import { UtilsService } from '../utils/utils.service';
import { AnimationGuideDialogComponent } from './animation-guide-dialog/animation-guide-dialog.component';
import { AlgorithmAnimationService } from './animations/algorithm-animation.service';
import { CanvasService } from './services/canvas/canvas.service';
import { EditPreferencesDialogComponent } from './edit-preferences-dialog/edit-preferences-dialog/edit-preferences-dialog.component';
import { PlaybackService } from './services/playback/playback.service';
declare var $: any;  // declaring jquery for use in this file


// -------------------------------------------------- FILE DESCRIPTION

/*

algorithm-page.component.ts

This is the Typescript file for the algorithm page (algorithm-page.component.html).

Purpose:
  - Acts as a "main" class for the algorithm page
  - Mediates interaction between all other services

Flow:
  - When algorithm page is to be loaded, run the constructor, injecting all necessary services
  - ngOnInit() is then run, linking the global canvas variable for the canvasService (having a canvasService allows us to make calls to draw elements from anywhere)
  - Set listener functions for the following actions:
    - keypress down:
        handleKeyboardEvent(event: KeyboardEvent): void
    - home link (algmatch) clicked:
        async goHome(): Promise<void>
    - generate new preferences button clicked:
        async generateNewPreferences(): Promise<void>
    - toggle sidebar button clicked:
        async toggleSidebar(): Promise<void>

Functions in this file:
  - ngOnInit(): void
  - ngAfterViewInit(): void
  - handleKeyboardEvent(event: KeyboardEvent): void

  - openEditPreferencesDialog(): void
  - openAnimationGuideDialog(): void

  - async goHome(): Promise<void>
  - async generateNewPreferences(): Promise<void>
  - async toggleSidebar(): Promise<void>

  - nextTutorialStep(): void
  - startTutorial(): void
  - sidebarTutorial(): void
  - mainContentTutorial(): void
  - stopTutorial(): void

*/


// -------------------------------------------------- CODE


@Component({
  selector: 'algorithm-page',
  templateUrl: './algorithm-page.component.html',
  styleUrls: ['./algorithm-page.component.scss']
})
export class AlgorithmPageComponent implements OnInit {

  // --------------------------------------------------------------------------------- | INSTANCE VARIABLES


  // looks for the canvas element on the algorithm page and assigns it to the canvas variable
  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;

  showCode: boolean = false;
  dialogOpen: boolean = false;

  showInfo: boolean = false

  tutorialStep: number;

  duringAnimation: boolean = false;

  firstSelection: boolean = true
  algorithm = new FormControl('');
  numPeople: number;

  // where SR is going to generate a stable matching or a unstable matching
  SRstable: boolean = true;
  SRstableText: string = "Generating Stable Matchings"


  // --------------------------------------------------------------------------------- | INIT FUNCTIONS


  constructor(
    public playback: PlaybackService,  // injecting the playback service
    public algorithmService: AlgorithmRetrievalService,  // injecting the algorithm service
    public drawService: CanvasService,  // injecting the canvas service
    public animation: AlgorithmAnimationService,
    public utils: UtilsService,
    public dialog: MatDialog,  // injecting the dialog component
    public router: Router  // injecting the router service (for programmatic route navigation)
  ) { }


  // function that runs when page is created
  ngOnInit(): void {

    // set the global canvas element (in the canvasService) to the canvas on this page
    this.drawService.canvas = this.canvas;
    this.drawService.ctx = this.canvas.nativeElement.getContext('2d');

    // debugging: use the following lines (113-121) to test individual algorithms
    // you can use this in conjunction with changing the routing in order to direct to the animation page (so you don't have to keep selecting an algorithm through the main page, etc.)
    // let group1 = 5;
    // let group2 = 5;
    // // let alg: string = "smp-man-gs";
    // let alg: string = "hr-resident-egs";

    // this.algorithmService.numberOfGroup1Agents = group1;
    // this.algorithmService.numberOfGroup2Agents = group2;

    // this.algorithmService.currentAlgorithm = this.algorithmService.mapOfAvailableAlgorithms.get(alg);
    // this.playback.setAlgorithm(alg, group1, group2);


    this.drawService.initialise();

    // (un)comment the line below to (disable)/enable working algorithm selection
    this.playback.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents);


    // initialise all of the popovers for the tutorial (they won't appear without this function)
    $(function () {
      $('[data-toggle="popover"]').popover()
    })

    // initialise the tutorial to the beginning
    this.tutorialStep = 0;

  }

  // function that runs when page is visible to user
  ngAfterViewInit(): void {
    this.animation.loadPage();
  }


  // creating a listener function for keydown events
  // Key:
    // (< arrow) or (a) == backstep in algorithm
    // (> arrow) or (d) == forward step in algorithm
    // (r) or (#) == generate new preferences
    // (e) or (]) == open edit preferences dialog
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.dialogOpen && this.tutorialStep == 0) {  // disable events on tutorial or edit preferences open
      if (event.key == "ArrowRight" || event.key == "d") {
        if (!(!this.playback.pause || this.playback.stepCounter >= this.playback.numCommands)) {
          this.playback.forwardStep();
        }
      } else if (event.key == "ArrowLeft" || event.key == "a") {
        if (!(!this.playback.pause || this.playback.stepCounter == 0)) {
          this.playback.backStep();
        }
      } else if (event.key == " ") {
        if (!(this.playback.stepCounter >= this.playback.numCommands)) {
          this.playback.toggle();
        }
      } else if (event.key == "r" || event.key == "#") {
        this.generateNewPreferences()
      } else if (event.key == "e" || event.key == "]") {
        this.openEditPreferencesDialog()
      }
    }
  }


  // --------------------------------------------------------------------------------- | GENERAL FUNCTIONS


  // open the edit preferences dialog with a callback function
  openEditPreferencesDialog(): void {
    const dialogRef = this.dialog.open(EditPreferencesDialogComponent);

    this.dialogOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
    });

  }

  // open the animation guide dialog with a callback function
  openAnimationGuideDialog(): void {
    const dialogRef = this.dialog.open(AnimationGuideDialogComponent);

    this.dialogOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
    });

  }


  // --------------------------------------------------------------------------------- | ON CLICK FUNCTIONS


  // function run when home link clicked
  // start animation for going home, delay 1000ms, then change route to home
  async goHome(): Promise<void> {
    this.animation.goHome();
    await this.utils.delay(1000);
    this.router.navigateByUrl("/");
  }


  // function run when generate new preferences button clicked
  async generateNewPreferences(): Promise<void> {
    // clears any code highlighting
    var command = this.playback.commandList[this.playback.previousStepCounter];
    let a = document.getElementById("line" + command["lineNumber"]);
    a.style.backgroundColor = "";
    a.style.color = "";


    // animates changing of preferences (fade in/out)
    this.animation.fadeCanvasOut();
    await this.utils.delay(300);
    for (let i = 0; i < 1; i++) {
      // let agent1Count: number = Math.floor(Math.random() * (9 - 2) + 2);
      // let agent2Count: number = Math.floor(Math.random() * (9 - 2) + 2);
      // this.playback.setAlgorithm(this.algorithmService.currentAlgorithm.id, agent1Count, agent2Count);

      console.log(this.algorithmService.currentAlgorithm.name)

      if (this.algorithmService.currentAlgorithm.name == "Stable Roommates Problem") {
        console.log("yes", this.SRstable)
        this.playback.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents, null, this.SRstable);

      } else {
        this.playback.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents);
      }

    }
    this.animation.fadeCanvasIn();
  }


  // function run when toggle sidebar button clicked (top left)
  async toggleSidebar(): Promise<void> {

    this.duringAnimation = true;

    let mainContent = document.getElementById("mainContent");

    if (!this.showCode) {

      // hide sidebar and content
      this.animation.hideSidebar();
      this.animation.hideMainContent();

      await this.utils.delay(700);
  
      // show sidebar and content
      mainContent.style.position = "";
      this.animation.showMainContent();
      this.showCode = !this.showCode

    } else {

      // hide content
      this.animation.hideMainContent();

      await this.utils.delay(400);

      // show sidebar
      this.showCode = !this.showCode
      this.animation.showSidebar();

      await this.utils.delay(200);

      // show content
      this.animation.showMainContent();

    }

    await this.utils.delay(200);

    this.duringAnimation = false;

    console.log("current pannels", this.showInfo, this.showCode)


  }


// function run when toggle sidebar button clicked (top left)
async toggleInfoSidebar(): Promise<void> {

  this.duringAnimation = true;

  let mainContent = document.getElementById("mainContent");

  if (!this.showInfo) {

    // hide sidebar and content
    this.animation.hideInfoSidebar();
    this.animation.hideMainContent();

    await this.utils.delay(700);

    // show sidebar and content
    mainContent.style.position = "";
    this.animation.showMainContent();
    this.showInfo = !this.showInfo

  } else {

    // hide content
    this.animation.hideMainContent();

    await this.utils.delay(400);

    // show sidebar
    this.showInfo = !this.showInfo
    this.animation.showInfoSidebar();

    await this.utils.delay(200);

    // show content
    this.animation.showMainContent();

  }

  await this.utils.delay(200);

  this.duringAnimation = false;

  console.log("current pannels", this.showInfo, this.showCode)

}
  ChangeStableSR(): void {
    
    if (this.SRstable == true) {
      this.SRstable = false
      this.SRstableText = "Generating Unstable Matchings"
    } else {
      this.SRstable = true
      this.SRstableText = "Generating Stable Matchings"

    }

    console.log("New SR setting", this.SRstable)
  }


  // --------------------------------------------------------------------------------- | TUTORIAL FUNCTIONS
  

  // function run when ">" arrow clicked in tutorial
  // progresses to next stage of tutorial
  nextTutorialStep(): void {
    // step 1 (shows sidebar so tutorial doesn't break)
    if (this.tutorialStep == 0) {
      if (this.showCode) {
        this.toggleSidebar();
      }
      this.startTutorial();
    
    // step 2
    } else if (this.tutorialStep == 1) {
      this.sidebarTutorial();

    // step 3
    } else if (this.tutorialStep == 2) {
      this.mainContentTutorial();
      
    // step 4
    } else if (this.tutorialStep == 3) {
      this.stopTutorial();
    }
  }


  // functions to hide/show appropriate popovers for tutorial steps
  startTutorial(): void {
    this.tutorialStep += 1;
    $('.navbarPopover').popover('show');
  }

  sidebarTutorial(): void {
    this.tutorialStep += 1;
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
