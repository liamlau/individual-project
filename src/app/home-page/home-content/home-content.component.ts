import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { simpleFadeAnimation } from 'src/app/animations/fadeAnimation';

declare var anime: any;

@Component({
  selector: 'home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss', '../home-page.component.scss'],
  animations: [
    simpleFadeAnimation
  ]
})
export class HomeContentComponent implements OnInit {

  @ViewChild('animationVid') animationVid: ElementRef;
  @ViewChild('descriptionVid') descriptionVid: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let vid: HTMLVideoElement = this.animationVid.nativeElement;
    vid.muted = true;
    vid.play();

    vid = this.descriptionVid.nativeElement;
    vid.muted = true;
    vid.play();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
