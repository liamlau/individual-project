import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

declare var anime: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  currentPage: string = "";

  componentMap: Object = {
    "/": ".homeContent",
    "/about": ".aboutContent",
    "/algorithms": ".algorithmContent",
    "/feedback": ".feedbackContent"
  };

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    anime({
      targets: '.titleContent',
      easing: 'easeInOutQuint',
      translateY: [-200, 0],
      duration: 500
    })
  }

  fadeCurrentPage(): void {
    anime({
      targets: [this.componentMap[this.router.url]],
      easing: 'easeInOutQuint',
      opacity: [1, 0],
      duration: 400
    })
  }

  async goToPage(page: string): Promise<void> {
    if (!(this.router.url == page)) {
      this.currentPage = page;
      this.fadeCurrentPage();
      await this.delay(400);
      this.router.navigateByUrl(page);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }

}
