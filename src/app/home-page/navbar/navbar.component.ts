import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var anime: any;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  componentMap: Object = {
    "/": ".homeContent",
    "/about": ".aboutContent",
    "/algorithms": ".algorithmContent",
    "/feedback": ".feedbackContent"
  };

  constructor(public router: Router) { }

  ngOnInit(): void {
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
      this.fadeCurrentPage();
      await this.delay(400);
      this.router.navigateByUrl(page);
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
