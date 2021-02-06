import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";

export const simpleFadeAnimation =
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

        // the "in" style determines the "resting" state of the element when it is visible.
        state('in', style({opacity: 1})),
  
        // fade in when created. this could also be written as transition('void => *')
        transition(':enter', [
          style({opacity: 0}),
          animate('400ms 0ms cubic-bezier(0.5, 0, 0.75, 0)')
        ]),
  
        // fade out when destroyed. this could also be written as transition('void => *')
        transition(':leave',
          animate(500, style({opacity: 0})))
      ]);