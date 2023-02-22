import { Injectable } from '@angular/core';
declare var anime: any;  // declaring the animejs animation library for use in this file

@Injectable({
  providedIn: 'root'
})
export class AlgorithmAnimationService {

  constructor() { }

  loadPage(): void {
    // animation for sliding the navbar down from Y-150 its position
    anime({
      targets: '.navbar',
      easing: 'easeOutQuint',
      translateY: [-150, 0],
      delay: 200,
      duration: 900
    })

    // animation for sliding the sidebar right from X-500 its position
    anime({
      targets: '.sidebar',
      easing: 'easeInOutQuint',
      translateX: [-500, 0],
      delay: 270,
      duration: 1000
    })

    anime({
      targets: '.info-sidebar',
      easing: 'easeInOutQuint',
      translateX: [0, 500],
      opacity: [0, 1],
      duration: 600
    })
    
    anime({
      targets: '#infosidebarContent',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [0, 1],
      duration: 600
    })

    // animation for fading the sidebar content in as the sidebar slides in
    anime({
      targets: '#sidebarContent',
      easing: 'easeInOutQuint',
      opacity: [0, 1],
      delay: 270,
      duration: 1500
    })

    // animation for fading the main content in as the sidebar finishes sliding in
    anime({
      targets: '#mainContent',
      easing: 'easeInOutQuint',
      opacity: [0, 1],
      delay: 670,
      duration: 900
    })
  }


  goHome(): void {
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
  }


  fadeCanvasOut(): void {
    anime({
      targets: '#myCanvas',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [1, 0],
      duration: 300
    })
  }

  fadeCanvasIn(): void {
    anime({
      targets: '#myCanvas',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [0, 1],
      duration: 300
    })
  }


  hideSidebar(): void {
    anime({
      targets: '.sidebar',
      easing: 'easeInOutQuint',
      translateX: [0, -800],
      delay: 200,
      duration: 700
    })
  }

  showSidebar(): void {
    anime({
      targets: '.sidebar',
      easing: 'easeInOutQuint',
      translateX: [-500, 0],
      // opacity: [0, 1],
      duration: 600
    })
    

    anime({
      targets: '#sidebarContent',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [0, 1],
      duration: 600
    })
  }

  hideInfoSidebar(): void {
    anime({
      targets: '.info-sidebar',
      easing: 'easeInOutQuint',
      // translateX: [0],
      opacity: [1, 0],
      direction: 'reverse',
      delay: 200,
      duration: 3700
    })
  }

  showInfoSidebar(): void {
    anime({
      targets: '.info-sidebar',
      easing: 'easeInOutQuint',
      // translateX: [0, 500],
      direction: 'reverse',
      opacity: [0, 1],
      duration: 1000
    })
    

    anime({
      targets: '#infosidebarContent',
      easing: 'easeInOutQuint',
      // translateX: [-1500, 0],
      opacity: [0.5, 1],
      duration: 600
    })
  }


  hideMainContent(): void {
    anime({
      targets: '#mainContent',
      easing: 'easeInOutQuint',
      opacity: [1, 0],
      duration: 500
    })
  }

  showMainContent(): void {
    anime({
      targets: '#mainContent',
      easing: 'easeInOutQuint',
      opacity: [0, 1],
      duration: 500
    })
  }

}
