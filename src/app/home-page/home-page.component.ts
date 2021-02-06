import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

declare var anime: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class HomePageComponent implements OnInit {

  componentMap: Object = {
    "/": ".homeContent",
    "/algorithms": ".algorithmContent"
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  async goToFeedback(): Promise<void> {
    // console.log(this.router.url);
    // console.log(this.componentMap[this.router.url]);
    // anime({
    //   targets: [this.componentMap[this.router.url]],
    //   easing: 'easeInOutQuint',
    //   opacity: [1, 0],
    //   duration: 500
    // })
    // await this.delay(100);
    // this.router.navigateByUrl('/algorithms');
    // console.log(this.componentMap['/algorithms']);
    // anime({
    //   targets: ".algorithmContent",
    //   easing: 'easeInOutQuint',
    //   opacity: [0, 1],
    //   duration: 500,
    //   delay: 100
    // })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }

}
