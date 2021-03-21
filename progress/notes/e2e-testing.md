Things to e2e test:

Home Page:
    - 

Algorithm Page:
- Go through each problem (smp and h/r | gs/egs):

    Initial Tests (20):
        - Navbar Tests:
            - Make sure the title displays properly (Problem name / Algorithm name / Orientation)
            - Make sure the show sidebar button appears
            - Make sure the refresh (Generate New Random Preferences) button appears
            - Make sure the pencil (Edit Preferences) button appears
            - Make sure the eye (Only Show Relevant Preferences) button appears
            - Make sure the info (Animation Guide) button appears
            - Make sure the help (Tutorial) button appears
        - Sidebar Tests:
            - Make sure the description text is correct
            - Make sure the free agents show properly
            - Make sure the pseudocode shown is correct
            - Make sure the execution log is initialised correctly
        - Animation Content Tests:
            - Make sure the agent names appear properly (Men/Women/Hospital/Residents)
            - Make sure the canvas has the correct content in it (may be difficult to do)
            - Make sure the speed control slider appears
            - Make sure the play button appears
            - Make sure the "go to start" button appears
            - Make sure the "step backwards" button appears
            - Make sure the "go forward" button appears
            - Make sure the "go to end" button appears
            - Make sure the playback slider appears

    Feature Tests (7):
        Navbar Tests:
            - Click on "Close Panel" and make sure the sidebar gets hidden after x ms (after animation)
            - Click on "Generate New Random Preferences" and make sure the animation gets reset with different preferences
            - Click on "Edit Preferences" and make sure the edit preferences modal appears
            - Click on "Animation Guide" and make sure the animation guide modal appears
            - Click on "Tutorial" and make sure the correct divs have the appropriate tutorial class attributed to it
        - Playback Control Tests:
            - Click on play and make sure the pseudocode is highlighted at some point
            - Click on play and make sure the playback stops