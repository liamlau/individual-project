import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlgorithmRetrievalService } from '../algorithm-retrieval.service';
import { AnimationGuideDialogComponent } from './animation-guide-dialog/animation-guide-dialog.component';
import { AlgorithmAnimationService } from './animations/algorithm-animation.service';
import { CanvasService } from './canvas/canvas.service';
import { EditPreferencesDialogComponent } from './edit-preferences-dialog/edit-preferences-dialog/edit-preferences-dialog.component';
import { PlaybackService } from './playback/playback.service';
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

  tutorialStep: number;

  duringAnimation: boolean = false;

  firstSelection: boolean = true
  algorithm = new FormControl('');
  numPeople: number;


  // --------------------------------------------------------------------------------- | INIT FUNCTIONS


  constructor(
    public playback: PlaybackService,  // injecting the playback service
    public algorithmService: AlgorithmRetrievalService,  // injecting the algorithm service
    public drawService: CanvasService,  // injecting the canvas service
    public animation: AlgorithmAnimationService,
    public dialog: MatDialog,  // injecting the dialog component
    public router: Router  // injecting the router service (for programmatic route navigation)
  ) { }


  // function that runs when page is created
  ngOnInit(): void {

    // set the global canvas element (in the canvasService) to the canvas on this page
    this.drawService.canvas = this.canvas;
    this.drawService.ctx = this.canvas.nativeElement.getContext('2d');

    // debugging: use the following lines (70-78) to test individual algorithms
    // you can use this in conjunction with changing the routing in order to direct to the animation page (so you don't have to keep selecting an algorithm through the main page, etc.)
    // let group1 = 9;
    // let group2 = 9;
    // let alg: string = "hr-resident-egs";

    // this.algorithmService.numberOfGroup1Agents = group1;
    // this.algorithmService.numberOfGroup2Agents = group2;

    // this.algorithmService.currentAlgorithm = this.algorithmService.mapOfAvailableAlgorithms.get(alg);
    // this.playback.setAlgorithm(alg, group1, group2);

    // (un)comment the line below to (disable)/enable working algorithm selection
    this.drawService.initialise();
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
  handleKeyboardEvent(event: KeyboardEvent) {
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


  // --------------------------------------------------------------------------------- | FUNCTIONS


  openEditPreferencesDialog(): void {
    const dialogRef = this.dialog.open(EditPreferencesDialogComponent);

    this.dialogOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
      // console.log(`Dialog result: ${result}`);
    });

  }


  openAnimationGuideDialog(): void {
    const dialogRef = this.dialog.open(AnimationGuideDialogComponent);

    this.dialogOpen = true;

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
      // console.log(`Dialog result: ${result}`);
    });

  }


  async goHome(page: string): Promise<void> {
    if (!(this.router.url == page)) {

      this.animation.goHome();


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

    this.animation.fadeCanvasOut();
    await this.delay(300);
    this.playback.setAlgorithm(this.algorithmService.currentAlgorithm.id, this.algorithmService.numberOfGroup1Agents, this.algorithmService.numberOfGroup2Agents);
    this.animation.fadeCanvasIn();
  }


  nextTutorialStep(): void {
    // console.log(this.tutorialStep);
    if (this.tutorialStep == 0) {
      if (this.showCode) {
        this.toggleSidebar();
      }
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
    // console.log(this.tutorialStep);
    this.tutorialStep += 1;
    // console.log(this.tutorialStep);
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


  async toggleSidebar() {

    this.duringAnimation = true;

    let mainContent = document.getElementById("mainContent");

    if (!this.showCode) {

      this.animation.hideSidebar();
      
      this.animation.hideMainContent();
      
      await this.delay(700);
  
      mainContent.style.position = "";
  
      this.animation.showMainContent();

      this.showCode = !this.showCode

    } else {

      this.animation.hideMainContent();

      await this.delay(400);

      this.showCode = !this.showCode

      this.animation.showSidebar();

      await this.delay(200);

      this.animation.showMainContent();

    }

    await this.delay(200);

    this.duringAnimation = false;

    // mainContent.style.display = "";

  }

}
