# QuizApp
The given quizapp has been made in Go and React. This Readme is a walkthrough off all API endpoints as well as functionalities if any added.

## Setup
To setup the given project follow the instructions separately for each - 

### React
     Download the project
     Run `yarn install` to install all dependencies
     If no error is encountered then run `yarn start`
     
     OR
     
     If npm is already installed on your system then
     Run 'npm install' to install all dependencies(if you get some warnings then ignore it) 
     If no error is encountered then run `npm start` it will start App on local server
     
### Go
     Download the project
     Install the following libraries for it to run - 
     - "github.com/gin-contrib/cors"
     - "github.com/gin-gonic/gin"  
     - "github.com/jinzhu/gorm"
     - "github.com/jinzhu/gorm/dialects/sqlite"
     - "golang.org/x/crypto/bcrypt"

    To set your GOPATH add these lines into ~/.bashrc
    export GOPATH=$HOME/go
    export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
    
    Install packages by run go get -u <name of package>

### Database - 
The project uses sqlite3 for RDBMS and has teh following tables  

SNo | Table | Brief Description
--- | --- | ---
1 | Users | List of Registered Users, alpha is admin
2 | Quiz | List of question pertaining to a quiz and the answers
3 | Genres | List of Genres
4 | QGenres | List of Quiz within each Genre
5 | Score | List of Scores of each user played

`Alpha` is the admin username
Password is `sad`. This wasnt hashed while the rest were.


## API Endpoints
The following are the Api endpoinst along with what they do  
### User table
+ GET :`/people/` This sends the set of users
+ POST : `/people`  This creates a new user
+ POST: `/signin/`  This is for login
+ GET : `people/users/:username ` This sends a particular user info
+ DELETE : `/people/:id` This deletes a particular user
### Quiz/Genre table
+ POST : `/quiz/` This creates a new question
+ GET : `/quiz/`  This sends the set of questions
+ GET : ` /quiz/:qname`  This sends a particular quiz
+ GET : `/quiz/:qname/:question ` This sends ta particular question
+ PUT : `/quiz/:qname/:question` This sends an update on a question
+ DELETE : `/quiz/:genre/:qname/:question` This deletes a qiven question
+ GET : `/genres/` This sends the set of quiz
+ GET : `/all-genres/`  This sends all genres
+ GET : `/genres/:genre` This sends quiz of a particular genre
+ DELETE : `/genres/:qname` This deletes a particular quiz
### Score table
+ POST : `/score/` This adds a new score
+ PUT : `/score/` Updates a pre-existing score
+ GET : `/score/:username/:genre/:qname` Gets a particular quiz score
+ GET : `/score/` Gets all scores
+ GET : `/score-genre/:genre` Gets a particular genre score
+ GET : `/score-users/:username` Gets Quiz Scores based on username

## Functionalities

### Guest
+ Can Register
+ Can Login

### User
+ Can Play Quiz
+ Can View Quiz Played By It
+ Can View Leaderboard of All Genres

### Admin 
+ Can Create Quiz
+ Can Delete Quiz
+ Can Update/Delete Questions is a Quiz
+ Can View all users and Delete Users
+ Questions can also have images
