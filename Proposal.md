# Faulty-Rocket

## Overview
Faulty Rocket is a typewriting game to help the user improve upon his or her typing skills. 
A random quote will be generated, and the user will be timed on how fast he or she completes typing the quote.
The words per minute will be calculated and used to determine the travel distance for the rocket. 
There are five checkpoints which are the different atmosphere layers: troposphere, stratosphere, mesosphere, thermosphere, and exosphere.
The user must type at a certain speed to reach the next checkpoint. At each checkpoint, a new quote will be rendered 
for the user to complete. The user has 3 tries to get to the next checkpoint. Each try will render a new quote. If the user can not get to the next checkpoint within 3 tries, it is game over. The goal to get the rocket from the ground level to space, the exosphere. 

## Functionality and MVPs
- [ ] Interactive Typing Console
- [ ] Upward or Downwards Rocket Trajectory 
- [ ] Dynamic Backgrounds 
- [ ] Muisc and Rocket Color Toggling


## Technologies
* Vanilla javascript for the overall structure and game logic
* HTML5 Canvas for rendering graphics
* Api.quotable.io for generating a random quote 
* Web Audio API for music 

## Wireframe
![Screen Shot 2022-12-01 at 7 10 42 PM](https://user-images.githubusercontent.com/26070301/205212945-5f1801b4-20a9-453f-92d7-77478b191877.png)
* Nav links to this project's Github repo, my LinkedIn, game directions, mute button, and rocket color selection
* The input box represents the typewriting interface 
* Above the input box, the quotes will be rendered on that quote box
* The clock will be the timer to keep track of the user's input  

## Implementation Timeline

### Day 1
- [ ] Setup the structure and install required apis
- [ ] Implement the typewriting interface
- [ ] Implement functionality for the typewriting interface
- [ ] Implement random quote generater and it's display
- [ ] Implement a clock/timer 
- [ ] Implement error counter 
- [ ] Implement WPM calculator 

### Day 2
- [ ] Implement the projectile object's (rocket) upward trajectory based on the wpm 
- [ ] Implement the Checkpoints and their intended behaviour 
- [ ] Implement the 3 strike functionality 
- [ ] Test, fix, and ensure the game's workflow 

## Day 3
- [ ] Decide on the styling of the site
- [ ] Create the desired sprites and assests 

## Day 4
- [ ] Implement the sprites and assests
- [ ] Test, fix, and ensure the game's workflow after design implemnetation 
- [ ] Implement CSS Stylings and MVPs

## Day 5
- [ ] Create model for the site 
- [ ] Implement CSS Stylings and MVPs

## Day 6
- [ ] Finish implementing CSS Stylings and MVPs
- [ ] Test and ensure the game's workflow and site 
- [ ] Deploy game to the public 

