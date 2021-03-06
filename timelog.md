# Timelog
* A web app for visualising matching algorithms through animation
* Liam Lau
* 2314991L
* Sofiat Olaosebikan

## Guidance
* This file contains the time log for your project. It will be submitted along with your final dissertation.
* **YOU MUST KEEP THIS UP TO DATE AND UNDER VERSION CONTROL.**
* This timelog should be filled out honestly, regularly (daily) and accurately. It is for *your* benefit.
* Follow the structure provided, grouping time by weeks.  Quantise time to the half hour.

<hr>

## Total Time Spent: **522 hours**

<br><br>

# Semester 1 - 86.5 hours
# Semester 2 - 435.5 hours

<!-- ------------------------------------------------------------------------------------------------------- WEEK 1 -->

## **Week 1** (21 Sep 2020 - 27 Sep 2020) - **4 hours**
### 23 Sep 2020 (Wed) - 4 hours
* *2 hours*: Read the project guidance notes
* *2 hours*: Read all projects, picked 8

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 2 -->

## **Week 2** (28 Sep 2020 - 4 Oct 2020) - **18.5 hours**
### 29 Sep 2020 (Tue) - 4.5 hours
* *0.5 hours*: Created GitHub repository for Angular project, did initial setup and set up meeting with supervisor
* *1 hour*: Researched similar projects (websites provided in description)
* *2.5 hours*: Prototyped initial ideas on Angular app (basic code replay system) and documented ideas
* *0.5 hours*: Wrote up progress in logbook

### 1 Oct 2020 (Thu) - 6 hours
* *4 hours*: Added more functionality to prototype: parameterising logic to be more generic + cleaning up code
* *1.5 hours*: Came up with a broad plan for the project, and planned the first meeting with supervisor
* *0.5 hours*: Went through similar website (visualgo.net) and came up with plan to implement features from there

### 2 Oct 2020 (Fri) - 5 hours
* *1 hour*: Supervisor meeting
* *3 hours*: Implementing pausing/stepping through execution
* *1 hour*: Added continuous integration to GitHub project

### 4 Oct 2020 (Sun) - 3 hours
* *3 hour*: Overhauled structure of playback app to allow easier addition of new algorithms

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 3 -->

## Week 3 (5 Oct 2020 - 11 Oct 2020) - **11 hours**
### 5 Oct 2020 (Mon) - 1.5 hours
* *1 hour*: Added time slider to prototype to adjust speed of execution
* *0.5 hours*: Wrote up report since last meeting for Sofiat in advance of tomorrow's meeting

### 6 Oct 2020 (Tue) - 3.5 hours
* *1.5 hours*: Publishing Angular Github project to Github Pages
* *1 hour*: Supervisor meeting
* *1 hour*: Preliminary reading of stable matching Gale-Shapley algorithm

### 9 Oct 2020 (Fri) - 3 hours
* *3 hours*: Programmed initial working Gale-Shapley algorithm in separate TypeScript file to later be implemented

### 11 Oct 2020 (Sun) - 3 hours
* *2.5 hours*: Refactored Gale-Shapley algorithm to allow random matches and people
* *0.5 hours*: Started refactoring Angular code to allow implementation of Gale-Shapley algorithm

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 4 -->

## Week 4 (12 Oct 2020 - 18 Oct 2020) - **12.5 hours**
### 12 Oct 2020 (Mon) - 2 hours
* *0.5 hours*: Added restart button to algorithm page
* *1.5 hours*: Integrated Gale-Shapley algorithm into main page

### 13 Oct 2020 (Tue) - 1 hour
* *1 hour*: Supervisor meeting

### 16 Oct 2020 (Fri) - 5 hours
* *5 hours*: Installing Bootstrap, working on look, feel and design of the app

### 17 Oct 2020 (Sat) - 2.5 hours
* *1.5 hours*: Implemented slider to control stepping through an algorithm
* *0.5 hours*: Disabled clicking of buttons when they shouldn't be clicked
* *0.5 hours*: Removed prebuilt Angular CSS classes and styles and made preliminary layout

### 18 Oct 2020 (Sun) - 2 hours
* *1.5 hours*: Added descriptions for Gale-Shapley
* *0.5 hours*: Fixed miscellaneous bugs

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 5 -->

## Week 5 (19 Oct 2020 - 25 Oct 2020) - **10 hours**
### 20 Oct 2020 (Tue) - 1 hour
* *0.5 hours*: Supervisor meeting
* *0.5 hours*: Looked at similar provided Java program (previous student's project) and made notes to try implement in my own app

### 23 Oct 2020 (Fri) - 5 hours
* *5 hours*: Refactored all code to be more generic and implemented display for important variables in real time

### 25 Oct 2020 (Sun) - 4 hours
* *1.5 hour*: Gave dynamic classes to all variables (in order to select them to "animate" them)
* *2.5 hours*: Attempted to implement system to highlight relevant variables during execution - tried lots of stuff, but didn't manage to quite get it yet

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 6 -->

## Week 6 (26 Oct 2020 - 1 Nov 2020) - **0.5 hours**
### (This was a coursework heavy week, so didn't manage to get much done)
### 27 Oct 2020 (Tue) - 0.5 hours
* *0.5 hours*: Supervisor meeting

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 7 -->

## Week 7 (2 Nov 2020 - 8 Nov 2020) - **5.5 hours**
### 4 Nov 2020 (Wed) - 3 hours
* *3 hours*: Implemented tests (unit and e2e) to check for stability for stable matchings

### 6 Nov 2020 (Thu) - 2.5 hours
* *0.5 hours*: Merged testing branch into master
* *0.5 hours*: Reorganised file structure for easier future programming
* *0.5 hours*: Created different components for the algorithm code to make it more modular
* *1 hour*: Made the algorithm page semi-responsive (now doesn't break completely on different screen sizes)

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 8 -->

## Week 8 (9 Nov 2020 - 15 Nov 2020) - **18.5 hours**
### 9 Nov 2020 (Mon) - 5.5 hours
* *0.5 hours*: Created initial playback service to refactor algorithm page
* *4.5 hours*: Extracted and implemented most of the functionality again from the algorith page into the playback service (play, stepping, slider)
* *0.5 hours*: Fixed icon to animate properly based on state of system

### 10 Nov 2020 (Tue) - 3.5 hours
* *0.5 hours*: Supervisor meeting
* *3 hours*: Finished refactoring of the algorithm-page into a service (now can share state between all components)

### 11 Nov 2020 (Wed) - 3 hours
* *1 hour*: Abstracted out algorithm variables and playback sections into their separate components to allow modularity
* *1 hour*: Installed and experimented with anime.js (animation library)
* *1 hour*: Learned how to use anime.js, and made initial animations for the app

### 12 Nov 2020 (Thu) - 3.5 hours
* *0.5 hours*: Merged refactoring branch into master
* *2 hours*: Researched alternative animation technique - came across some problems with responsiveness
* *1 hour*: Researched alternative layout technique - Bootstrap wasn't working properly with animations

### 13 Nov 2020 (Fri) - 3 hours
* *1.5 hours*: Learned about CSS Grid and experimented with it
* *1.5 hours*: Made responsive animations within grid layout

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 9 -->

## Week 9 (16 Nov 2020 - 22 Nov 2020)
Time was spent on other subjects and coursework.

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 10 -->

## Week 10 (23 Nov 2020 - 29 Nov 2020) - **0.5 hours**
Time was spent on other subjects and coursework.

### 24 Nov 2020 (Tue) - 0.5 hours
* *0.5 hours*: Supervisor meeting

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 11 -->

## Week 11 (30 Nov 2020 - 6 Dec 2020) - **0.5 hours**
Break was taken due to personal issues.

### 1 Dec 2020 (Tue) - 0.5 hours
* *0.5 hours*: Supervisor meeting

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 12 -->

## Week 12 (7 Dec 2020 - 13 Dec 2020) - **2.5 hours**
### 10 Dec 2020 (Thu) - 2.5 hours
* *2.5 hours*: Wrote status report

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 13 -->

## Week 13 (14 Dec 2020 - 20 Dec 2020) - **2.5 hours**
### 16 Dec 2020 (Tue) - 2.5 hours
* *2.5 hours*: Organised all wiki pages and created some issues for the rest of the project

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WINTER BREAK (week 1) -->

<br><br>

# Winter Break - 15.5 hours

## Week 1 (21 Dec 2020 - 27 Dec 2020)
Holiday taken for Christmas.

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WINTER BREAK (week 2) -->

## Week 2 (28 Dec 2020 - 3 Jan 2021) - **7 hours**
### 30 Dec 2020 (Wed) - 3 hours
* *3 hours*: Fleshed out lots of pages on the wiki (documentation)

### 2 Jan 2020 (Fri) - 2 hours
* *1.5 hours*: Wrote up meeting notes (converted from local machine to GitHub) and worked on wiki
* *0.5 hours*: Created more in-depth plan for the next few weeks

### 3 Jan 2020 (Sat) - 2 hours
* *2 hours*: Learned how the Hospitals/Residents Problem works, and wrote up documentation on how I am to implement it into the application

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WINTER BREAK (week 3) -->

## Week 3 (4 Jan 2021 - 10 Jan 2021) - **8.5 hours**
### 8 Jan 2020 (Fri) - 3 hours
* *3 hours*: Class plan/learning egs

### 9 Jan 2020 (Sat) - 4.5 hours
* *4.5 hours*: Implemented class, worked through dry run

### 10 Jan 2020 (Sun) - 1 hour
* *1 hour*: Rewrote existing GS stable marriage algorithm in class form

<!-- ------------------------------------------------------------------------------------------------------- SEMESTER 2 -->

<br><br>

# Semester 2 - 94 hours

<!-- ------------------------------------------------------------------------------------------------------- WEEK 17 -->

## Week 17 (11 Jan 2021 - 17 Jan 2021) - **9 hours**
### 13 Jan 2020 (Wed) - 3 hours
* *3 hours*: Designed revised wireframes for app

### 14 Jan 2020 (Thu) - 5.5 hours
* *0.5 hours*: Made plan for supervisor meeting
* *0.5 hours*: Refining and rethinking plan for rest of semester
* *4.5 hours*: Further design on the app (wireframes)

### 15 Jan 2020 (Fri) - 0.5 hours
* *0.5 hours*: Supervisor meeting

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 18 -->

## Week 18 (18 Jan 2021 - 24 Jan 2021) - **11 hours**
### 19 Jan 2020 (Tue) - 4 hours
* *4 hours*: Refinement of design (specifically Hospitals/Residents Problem)

### 24 Jan 2020 (Sun) - 7 hours
* *3 hours*: Implementation of design wireframes (layout)
* *4 hours*: Further implementation of wireframes (home page content, color scheme, redesigning things that don't work)

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 19 -->

## Week 19 (25 Jan 2021 - 31 Jan 2021) - **28 hours**
### 25 Jan 2020 (Mon) - 7 hours
* *7 hours*: Finishing implementation of redesign of the app

### 26 Jan 2020 (Tue) - 3 hours
* *3 hours*: Learning HTML canvas in order to be able to animate algorithms as per my redesign

### 27 Jan 2020 (Wed) - 2 hours
* *1 hour*: Drawing circles on canvas (initial testing)
* *1 hour*: Designing how circles will have to be displayed to be responsive

### 28 Jan 2020 (Thu) - 4 hours
* *2 hours*: Positioning circles correctly
* *2 hours*: Linking up all previously developed features

### 29 Jan 2020 (Fri) - 6 hours
* *6 hours*: Figuring out how to display and animate everything (spent a lot of time figuring out how to draw specific things certain colours with canvas - quite finnicky)

### 31 Jan 2020 (Sun) - 6 hours
* *3 hours*: Making correct variable display green colour for canvas animation

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 20 -->

## Week 20 (1 Feb 2021 - 7 Feb 2021) - **36 hours**
### 1 Feb 2020 (Mon) - 10 hours
* *4 hours*: Writing the residents->hospitals algorithm using oop principles
* *2 hours*: General refactoring / removing old code / preparing codebase for additional algorithms to be implemented (oop method)
* *4 hours*: Implementing hospital residents into app (halfway done)

### 3 Feb 2020 (Wed) - 2 hours
* *2 hours*: Adding finishing touches to Hospitals/Residents Problem

### 4 Feb 2020 (Thu) - 2 hours
* *2 hours*: Refining hospital/residents algorithm

### 5 Feb 2020 (Fri) - 3 hours
* *3 hours*: Finishing hospital/residents (apart from descriptions)

### 6 Feb 2020 (Sat) - 8 hours
* *1.5 hours*: Designing new home page (research, testing and iterating on old design)
* *3 hours*: Implementing responsive layout of new home page
* *2.5 hours*: Created new components for all of the pages (Home, About, Algorithms, Feedback)
* *1 hour*: Clean-up and initial polishing

### 7 Feb 2020 (Sun) - 11 hours
* *2 hours*: Designing new algorithm page (iterating on old design)
* *6 hours*: Implementing layout and linking components to the new algorithm page
* *3 hours*: Integrating things I've done before

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 21 -->

## Week 21 (8 Feb 2021 - 14 Feb 2021) - **28 hours**
### 8 Feb 2020 (Mon) - 10 hours
* *6 hours*: Finalising alg page
* *2 hours*: Linking up app to alg page properly (halfway done)
* *2 hours*: Implementing new features on alg page (hide code/show preferences/execution trace)

### 11 Feb 2020 (Thu) - 8 hours
* *3 hours*: Organising the codebase and fixing misc bugs
* *3 hours*: Fixing pre-existing tests and implementing additional e2e tests
* *1 hour*: Cleaned up timelog
* *1 hour*: Merged work into main branch and did general GitHub organisation

### 13 Feb 2020 (Sat) - 5 hours
* *2 hours*: Fixed bugs with going to algorithm page and number of agents not working properly
* *2 hours*: Fully implemented gs-stable-marriage problem algorithm
* *1 hour*: Fixing misc bugs

### 14 Feb 2020 (Sun) - 5 hours
* *5 hours*: Implementing and bug fixing egs version of stable marriage problem

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 22 -->

## Week 22 (15 Feb 2021 - 21 Feb 2021) - **51 hours**

### 15 Feb 2020 (Mon) - 8 hours
* *7 hours*: Finished implementing and bug fixing egs version of stable marriage problem
* *1 hour*: General bug fixing

### 17 Feb 2020 (Wed) - 12 hours
* *6 hours*: Implemented functionality to edit preferences (with a few bugs)
* *3 hours*: Attempted to implement tutorial (dimming rest of screen to highlight) - had to abandon as would take too long
* *3 hours*: Researched SCSS to reduce the amount of duplicate styles throughout the project

### 18 Feb 2020 (Thu) - 9 hours
* *2 hours*: More research on how to optimise the app (make it responsive/reduce lines of code)
* *1 hour*: Changed the home page slightly to look better (put images round circles - looks more modern now)
* *2 hours*: Dissertation research and planning (looked at Moodle slides for guidance)
* *3 hour*: Read all relevant example dissertations given to us
* *1 hour*: Started planning out dissertation sections

### 19 Feb 2020 (Fri) - 7 hours
* *2 hours*: General home page fixes and responsiveness changes
* *2 hours*: Thinking/researching and designing how to fix the algorithm page's design
* *1 hour*: Refactor of code storage (no longer in separate component, now in service) to cut down superfluous components 
* *2 hours*: Implementing new code display

### 20 Feb 2020 (Sat) - 5 hours
* *5 hours*: Got new idea for tutorial, been experimenting, designing and implementing

### 21 Feb 2020 (Sun) - 10 hours
* *5 hours*: Fixed almost all formatting for algorithm page
* *3 hours*: Misc bug fixing
* *2 hours*: Implementing animations for routes

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 23 -->

## Week 23 (22 Feb 2021 - 28 Feb 2021) - **48.5 hours** (overall: 313.5 hours)

### 22 Feb 2020 (Mon) - 11 hours
* *2 hours*: Miscellaneous bug/positional fixes
* *2 hours*: Added updated, refactored pseudocode for smp-gs-man and hr-egs-resident
* *7 hours*: Created animation guide, lots of bug fixes, started implementing checks for edit preferences

### 23 Feb 2020 (Tue) - 13 hours
* *2 hours*: Fixing bugs with hr-resident-egs (now doesn't break with erroneous input)
* *3 hours*: Fixed all positioning with preferences (it's all responsive now)
* *3 hours*: Implemented auto filling for edit preferences (changing the number of agents now changes the textarea appropriately)
* *1 hour*: Designed and implemented animation for sidebar expansion/retraction
* *4 hours*: Fixed urgent bugs with canvas going off screen unexpectedly + in middle of responsive rewriting of canvas

### 24 Feb 2020 (Wed) - 8 hours
* *4 hours*: Fixed positioning of canvas circles properly
* *4 hours*: Making progress on edit preferences (lots of edge cases for hr-resident-egs)

### 25 Feb 2020 (Thu) - 8.5 hours
* *4.5 hours*: Implemented edit preferences that checks and automatically fills in dependant on group size
* *1 hour*: General bug-fixing (implemented guards for inputs, autoplay videos, input locks during animations)
* *3 hours*: Created evaluation sheet (Google Forms)

### 26 Feb 2020 (Fri) - 8 hours
* *4 hours*: Finalised edit preferences functionality (error checking and autocomplete)
* *1 hour*: Fixed cards for algorithm content page
* *1.5 hours*: General main page additions (about page text, font changes, finishing touches)
* *1.5 hours*: Bug fixes (fixed app breaking bugs with going from hr to sm - some variables kept their state)
* *0.5 hours*: Fixed e2e tests
* *0.5 hours*: Deployed app using Github pages and sent email to supervisor with finished evaluation and project link

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 24 -->

## Week 24 (1 Mar 2021 - 7 Mar 2021) - **0 hours**

Week spent on coursework and catching up with subjects.

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 25 -->

## Week 25 (8 Mar 2021 - 14 Mar 2021) - **0 hours**

Week spent on coursework and catching up with subjects.

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 26 -->

## Week 26 (15 Mar 2021 - 21 Mar 2021) - **13 hours**

### 15 Mar 2020 (Mon) - 1 hours
* *0.5 hours*: Updated timelog for March
* *0.5 hours*: Merged current branch into master

### 21 Mar 2020 (Sun) - 12 hours
* *2 hours*: Writing up testing framework, making sure everything has been covered
* *4 hours*: Writing unit tests
* *6 hours*: Writing dissertation

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 27 -->

## Week 27 (22 Mar 2021 - 28 Mar 2021) - **55 hours**

### 22 Mar 2020 (Mon) - 10 hours
* *10 hours*: Writing dissertation

### 23 Mar 2020 (Tue) - 12 hours
* *0.5 hours*: Supervisor meeting
* *11.5 hours*: Writing dissertation

### 24 Mar 2020 (Wed) - 8 hours
* *8 hours*: Writing dissertation

### 25 Mar 2020 (Thu) - 8 hours
* *8 hours*: Writing dissertation

### 26 Mar 2020 (Fri) - 5 hours
* *5 hours*: Writing e2e tests

### 27 Mar 2020 (Sat) - 9 hours
* *9 hours*: Writing dissertation

### 28 Mar 2020 (Sun) - 3 hours
* *3 hours*: Writing dissertation

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 28 -->

## Week 28 (29 Mar 2021 - 4 Apr 2021) - **38 hours**

### 29 Mar 2020 (Mon) - 4 hours
* *4 hours*: Writing dissertation

### 30 Mar 2020 (Tue) - 6 hours
* *6 hours*: Writing dissertation

### 31 Mar 2020 (Wed) - 3 hours
* *3 hours*: Writing dissertation

### 1 Apr 2020 (Thu) - 10 hours
* *10 hours*: Writing dissertation

### 2 Apr 2020 (Fri) - 10 hours
* *10 hours*: Writing dissertation

### 3 Apr 2020 (Sat) - 1 hour
* *1 hour*: Writing dissertation

### 4 Apr 2020 (Sun) - 4 hours
* *4 hours*: Writing dissertation

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 29 -->

## Week 29 (5 Apr 2021 - 11 Apr 2021) - **36 hours**

### 5 Apr 2020 (Mon) - 2 hours
* *2 hours*: Writing dissertation

### 6 Apr 2020 (Tue) - 2 hours
* *2 hours*: Writing dissertation

### 7 Apr 2020 (Wed) - 10 hours
* *10 hours*: Writing dissertation

### 8 Apr 2020 (Thu) - 12 hours
* *6 hours*: Writing dissertation
* *6 hours*: Writing documentation

### 9 Apr 2020 (Fri) - 3 hours
* *3 hours*: Writing dissertation

### 10 Apr 2020 (Sat) - 1 hour
* *1 hour*: Writing dissertation

### 11 Apr 2020 (Sun) - 6 hours
* *6 hours*: Writing dissertation

<hr>

<!-- ------------------------------------------------------------------------------------------------------- WEEK 30: FINAL WEEK -->

## Week 30 (12 Apr 2021 - 19 Apr 2021) - **66.5 hours**

### 12 Apr 2020 (Mon) - 6.5 hours
* *6.5 hours*: Writing dissertation
* *2 hours*: Presentation

### 13 Apr 2020 (Tue) - 5.5 hours
* *0.5 hours*: Supervisor meeting
* *5 hours*: Writing dissertation

### 14 Apr 2020 (Wed) - 10 hours
* *10 hours*: Writing dissertation

### 15 Apr 2020 (Thu) - 12 hours
* *12 hours*: Writing dissertation

### 16 Apr 2020 (Fri) - 11 hours
* *5 hours*: Writing dissertation
* *6 hours*: Presentation

### 17 Apr 2020 (Sat) - 2.5 hours
* *2.5 hours*: Writing dissertation

### 18 Apr 2020 (Sun) - 11 hours
* *1 hours*: Writing dissertation
* *2 hours*: Cleaning application tests
* *8 hours*: Finishing presentation

### 19 Apr 2020 (Mon) - 8 hours
* *8 hours*: Finishing dissertation