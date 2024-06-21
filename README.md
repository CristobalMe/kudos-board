## Unit Assignment: Kudos Board

Submitted by: **Cristobal Medina meza**

Deployed Application (optional): [Kudos Board Deployed Site](https://kudos-board-1-o6pe.onrender.com/)

### Application Features

#### CORE FEATURES

- [X] **Home Page**
  - [X] Displays header, banner, search, board grid, and footer.
  - [X] Displays preview of all boards on initial page load.
    - [X] Boards previews should show an image/gif and board title.
  - [X] Users can click on a category (recent, celebration, thank you, inspiration) to filter the boards.
    - [X] Recent displays most recently created boards.
    - [X] Other categories display boards of that type.
  - [X] Users can search for a board by name.
  - [X] Users can click on a board to navigate to a new page containing that board.
  - [X] Users can create a new board.
    - [X] Boards should have a title, category, and author (optional).
  - [X] User can delete boards.
  
- [X] **Board Page**
  - [X] Displays a list of all cards for a board.
    -  [X] Each card features a text message.
    -  [X] Each card features a gif found using the [GIPHY API](https://developers.giphy.com/docs/api/).
    -  [X] Users can optionally sign the card as the author.  
-   [X] Cards can be upvoted.
-   [X] Cards can be deleted.


#### STRETCH FEATURES


- [ ] **User Accounts**
  - [ ] Users should be able to log in with a username and password.
  - [ ] Users should be able to sign up for a new account.
  - [ ]  Boards and cards should be associated with a user.
    - [ ]  Anonymous cards or cards by guest users should still be allowed.
  - [ ] Add a new filter option on the home page to display only the current user's boards.
  - [ ] Allow boards to be deleted only if they are owned by the user.
- [X] **Deployment**
  - [X] Website is deployed via Render.
- [ ] **Comments**
  - [ ] Users should be able to comment on cards.


### Walkthrough Video

https://github.com/CristobalMe/kudos-board/assets/112215849/e6b70d9c-9acf-4776-8ba5-4884c03386be




### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Not that much, but they were usefull for the begining of the project.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would create route files for both boards and cards, make my functions more readable and invest more time on the css.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Everything went well

### Open-source libraries used

- react-router: https://reactrouter.com/en/main
- axios: https://axios-http.com/docs/intro

### Shout out

Shout out to Paige Godfrey and my manager Tori Yan, for helping me with the backend
