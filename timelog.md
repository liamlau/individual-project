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

## Total Time Spent (so far): 4 + 18.5 + 11 + 12.5 + 10 + 0.5 + 5.5 + 12 = **74 hours**
Current expected time spent (using 15 hours a week estimation - excluding week before being allocated project): 7 * 15 = **105 hours**

<hr>

# Semester 1

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

<!-- ------------------------------------------------------------------------------------------------------- WEEK 9 -->

## Week 9 (16 Nov 2020 - 22 Nov 2020)
Time was spent on other subjects and coursework.

<!-- ------------------------------------------------------------------------------------------------------- WEEK 10 -->

## Week 10 (23 Nov 2020 - 29 Nov 2020) - **0.5 hours**
Time was spent on other subjects and coursework.

### 24 Nov 2020 (Tue) - 0.5 hours
* *0.5 hours*: Supervisor meeting


<!-- ------------------------------------------------------------------------------------------------------- WEEK 11 -->

## Week 11 (30 Nov 2020 - 6 Dec 2020) - **0.5 hours**
Break was taken due to personal issues.

### 1 Dec 2020 (Tue) - 0.5 hours
* *0.5 hours*: Supervisor meeting


<!-- ------------------------------------------------------------------------------------------------------- WEEK 12 -->

## Week 12 (7 Dec 2020 - 13 Dec 2020) - **2.5 hours**
### 10 Dec 2020 (Thu) - 2.5 hours
* *2.5 hours*: Wrote status report



<!-- ------------------------------------------------------------------------------------------------------- WEEK 13 -->

## Week 13 (14 Dec 2020 - 20 Dec 2020) - **2.5 hours**
### 16 Dec 2020 (Tue) - 2.5 hours
* *2.5 hours*: Organised all wiki pages and created some issues for the rest of the project


<!-- ------------------------------------------------------------------------------------------------------- WINTER BREAK (week 1) -->

## WINTER BREAK (week 1) (21 Dec 2020 - 27 Dec 2020)
Holiday taken for Christmas.


<!-- ------------------------------------------------------------------------------------------------------- WINTER BREAK (week 2) -->

## WINTER BREAK (week 2) (28 Dec 2020 - 3 Jan 2021) - **7 hours**
### 30 Dec 2020 (Wed) - 3 hours
* *3 hours*: Fleshed out lots of pages on the wiki (documentation)

### 2 Jan 2020 (Fri) - 2 hours
* *1.5 hours*: Wrote up meeting notes (converted from local machine to GitHub) and worked on wiki
* *0.5 hours*: Created more in-depth plan for the next few weeks

### 3 Jan 2020 (Sat) - 2 hours
* *2 hours*: Learned how the Hospital/Residents problem works, and wrote up documentation on how I am to implement it into the application

<!-- ------------------------------------------------------------------------------------------------------- WINTER BREAK (week 3) -->

## WINTER BREAK (week 3) (4 Jan 2021 - 10 Jan 2021) - **8.5 hours**
08/01/21:
- 3 hours class plan/learning egs

09/01/21:
- 4.5 hours implementing class, working through dry run

10/01/21:
- 1 hour rewrote existing GS stable marriage algorithm in class form

<hr>

<!-- ------------------------------------------------------------------------------------------------------- SEMESTER 2 -->

# Semester 2

13/01/21:
- 3 hours designing revised wireframes for app

14/01/21:
- 0.5 hours planning tomorrow's meeting
- 0.5 hours refining plan
- 4.5 hours designing

19/01/21:
- 4 hours refinement of design (specifically hospital/residents problem)

24/01/21:
- 7 hours: working on redesign of app (implementation)

25/01/21:
- 7 hours: working on redesign of app (implementation)

26/01/21:
- 2 hours: learning canvas

27/01/21:
- 1 hour: drawing circles on canvas and testing things

28/01/21:
- 4 hours: positioning circles correctly, linking up all previously developed features

29/01/21:
- 11 - 12 play games
- 12 - 12 do work
    - 12 - 13: design how drawing system will work
    - 14 - 17: implement drawing system
    - 18 - 20: responsiveness
    - 20 - 21: organisation (issues and stuff)