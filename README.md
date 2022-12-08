# Faulty-Rocket

##Live Site
[Click To Play!] https://kaushaltheeg.github.io/Faulty-Rocket/

## Overview 
Faulty Rocket is a type writting game which was created to help users improve upon their typing skills. 
This game was implemented within a week and created using vanilla JavaScript, HTML5, and CSS. 

Start Screen
![Screen Shot 2022-12-08 at 9 06 30 AM](https://user-images.githubusercontent.com/26070301/206517436-f611f65b-dfe2-409d-83ef-24c589ac7cec.png)

Run Screen
![Screen Shot 2022-12-08 at 10 02 07 AM](https://user-images.githubusercontent.com/26070301/206530203-08de16a6-425a-456c-a7f6-28d5954d5879.png)


## Features
* Typewriting interface which indicates the user's input in real time
* Virual Keyboard shows the user's key strocks in real time; excluding special characters
* Run data is posted after user completes a quote.
* The Typwriting interface calculates the WPM in order to lauch the rocket
* Async animations within the canvas
* A rotation of chill house music at user's convience

## How to play
* As soon as the timer and quote is rendered, start typing the quote within the input box
* The user must correctly complete the quote in order to retrive his or her results
* There is 5 different levels each with their own wpm threshold
* The user has 3 tries to complete a level
* The goal is to get the rocket to space

## Implementation 

### Calculating the WPM 

The forumula used to calculate the net WPM is [(totalChars/5) - errors] / time(min). 
  1. Word Count
    _ A word is considered a word if it has more than 5 characters 
    _ The character count is determined after retriving the quote from the qutoable api
    _ The information is passed to the game class
  2. Time
    _ The timer starts as soon as the quote is rendered
    _ The time is calculated by creating a new Date instance and constanly subtrating the start date with the current date
    _ This provides a more accurate time span 
  3. Error Count 
    _ Each character and space within the quote belongs to its own span element
    _ I am consistantly looping through each element to check if that span element includes the 'inccorect' class attribute 
      _ If so, I add the index of that node list array into my error array, and ensure the error was not counted twice
    _ I retrive the length of the error array and set to my error count placeholder which stores the max error count for that specific run
    
![Screen Shot 2022-12-08 at 10 18 42 AM](https://user-images.githubusercontent.com/26070301/206534465-01a47593-6f8d-437b-9560-5de7a572bcfa.png) 
 
 ### Passing Data to the Canvas

The above data is passed to the TypeWrittingConsole class in which is calculates the net WPM. 

![Screen Shot 2022-12-08 at 9 40 09 AM](https://user-images.githubusercontent.com/26070301/206524626-72fb9618-26e8-43e0-b56b-348a9e945969.png)

The WPM data is passed to the Rocket class in which the rocket utilizes the information to perform the animation

![Screen Shot 2022-12-08 at 9 42 01 AM](https://user-images.githubusercontent.com/26070301/206524889-7d4a0d42-bc60-470f-930f-9b35dc0a8a00.png)
![Screen Shot 2022-12-08 at 9 43 04 AM](https://user-images.githubusercontent.com/26070301/206525091-66025d35-1053-4165-b93a-a2f8894cbba0.png)
![Screen Shot 2022-12-08 at 9 41 44 AM](https://user-images.githubusercontent.com/26070301/206525231-d05277af-bba5-4ab6-82b3-1c7a6104360b.png)


### Virual Key Board

In order to show the user's keystrockes in real time, I utitlize a keydown and keyup event listener. The event listeners are constantly added and removing a class attribute.

![Screen Shot 2022-12-08 at 9 48 17 AM](https://user-images.githubusercontent.com/26070301/206526161-a3ec0e74-8437-4e08-9f4c-6be542692c6a.png)

## Future Work and Features for V2
1. Improve upon the current architecture of the game
  _ DRY up the code more 
2. Implement a formula which determines the rocket's travel distance using the next WPM
  _ Currently the rocket travels based on preset bounds
  _ The rocket travel is not as dynamic as it could be
3. Improve upon the animations
  _ the rocket and level backgrounds have to the potential to be better
4. Change the UI of the site


