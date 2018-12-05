package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB

var err error

/* The tables for the code */
type User struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Admin    bool   `json:"admin"`
}

type Quiz struct {
	ID       uint   `json:"qid"`
	Genre    string `json:"genre"`
	Qname    string `json:"qname"`
	Question string `json:"question"`
	Image    string `json:"image"`
	OptionA  string `json:"optionA"`
	OptionB  string `json:"optionB"`
	OptionC  string `json:"optionC"`
	OptionD  string `json:"optionD"`
	AnswerA  bool   `json:"answerA"`
	AnswerB  bool   `json:"answerB"`
	AnswerC  bool   `json:"answerC"`
	AnswerD  bool   `json:"answerD"`
}

type Genres struct {
	ID    uint   `json:"gid"`
	Genre string `json:"genre"`
}

type QGenres struct {
	ID    uint   `json:"gid"`
	Genre string `json:"genre"`
	Qname string `json:"qname"`
}

type Score struct {
	ID       uint   `json:"sid"`
	Username string `json:"username"`
	Genre    string `json:"genre"`
	Qname    string `json:"qname"`
	Score    uint   `json:"score"`
}

/* This acts as a meta table */
type Leaderboard struct {
	Username string `json:"username"`
	Total    uint   `json:"total"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &QGenres{}, &Quiz{}, &Genres{}, &Score{})
	r := gin.Default()
	r.GET("/people/", GetPeople)                 // This sends the set of users
	r.POST("/people", CreatePerson)              // This creates a new user
	r.POST("/signin/", LoginUser)                // This is for login
	r.GET("/people/users/:username", ReturnUser) // This sends a particular user info
	r.DELETE("/people/:id", DeletePerson)

	r.POST("/quiz/", CreateQuestion)                          // This creates a new question
	r.GET("/quiz/", ViewQuestion)                             // This sends the set of questions
	r.GET("/quiz/:qname", ShowQuiz)                           // This sends a particular quiz
	r.GET("/quiz/:qname/:question", ShowQuestion)             // This sends ta particular question
	r.PUT("/quiz/:qname/:question", UpdateQuestion)           //This sends an update on a question
	r.DELETE("/quiz/:genre/:qname/:question", DeleteQuestion) //This deletes a qiven question

	r.GET("/genres/", ViewQuiz)            // This sends the set of quiz
	r.GET("/all-genres/", ViewGenres)      // This sends all genres
	r.GET("/genres/:genre", GetQuiz)       //This sends quiz of a particular genre
	r.DELETE("/genres/:qname", DeleteQuiz) //This deletes a particular quiz

	r.POST("/score/", PostScore)                          //This adds a new score
	r.PUT("/score/", UpdateScore)                         //Updates a pre-existing score
	r.GET("/score/:username/:genre/:qname", GetUserScore) //gets a particular quiz score
	r.GET("/score/", GetAllScores)                        //gets all scores
	r.GET("/score-genre/:genre", GetGenreScores)          //gets a particular genre score
	r.GET("/score-users/:username", GetUserQuiz)          //gets quizname and score for a particular user

	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func CreatePerson(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	/* Password is hashed here */
	temp := user.Password
	hash, e := HashPassword(temp)
	if e == nil {
		user.Password = hash
	}
	username := user.Username
	flag := 0
	if err := db.Select([]string{"username"}).Where("username = ?", username).Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.AbortWithStatus(400)
		flag = 1
	}
	if flag == 0 {
		db.Create(&user)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, user)

}

func GetPeople(c *gin.Context) {
	var people []User
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, people)
	}
}

func LoginUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	var tempy User
	if db.Where(&User{Username: user.Username}).First(&tempy).RecordNotFound() {
		c.Header("access-control-allow-origin", "*")
		c.JSON(400, user)
		fmt.Println("Error", err)
	} else {
		match := CheckPasswordHash(user.Password, tempy.Password)
		if match == false {
			c.Header("access-control-allow-origin", "*")
			c.JSON(400, user)
			fmt.Println("Error", err)
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, tempy)
		}
	}
}

func ReturnUser(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	if err := db.Select([]string{"username"}).Where("username = ?", username).Find(&user).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}
}

func GetPerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person User
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	}
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person User
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func CreateQuestion(c *gin.Context) {
	var question Quiz
	c.BindJSON(&question)
	fmt.Println(question.AnswerA, question.AnswerB, question.AnswerC, question.AnswerD)
	db.Create(&question)
	var genre QGenres
	var genres Genres
	if db.Where(&Genres{Genre: question.Genre}).First(&genres).RecordNotFound() {
		db.Create(&Genres{Genre: question.Genre})
	}
	if db.Where(&QGenres{Genre: question.Genre, Qname: question.Qname}).First(&genre).RecordNotFound() {
		db.Create(&QGenres{Genre: question.Genre, Qname: question.Qname})
	}
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func ViewQuestion(c *gin.Context) {
	var quiz []Quiz
	if err := db.Find(&quiz).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}
}

func ViewQuiz(c *gin.Context) {
	var genre []QGenres
	if err := db.Find(&genre).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genre)
	}
}

func ViewGenres(c *gin.Context) {
	var genre []Genres
	if err := db.Find(&genre).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genre)
	}
}

func DeleteQuiz(c *gin.Context) {
	qname := c.Params.ByName("qname")
	var question Quiz
	var genres QGenres
	var g Genres
	var score Score
	d := db.Where("qname = ?", qname).Delete(&genres)
	d1 := db.Where("qname = ?", qname).Delete(&question)
	db.Where(&Score{Qname: qname}).Delete(&score)
	if db.Where(&QGenres{Genre: question.Genre}).First(&genres).RecordNotFound() {
		db.Where(&Genres{Genre: question.Genre}).Delete(&g)
	}
	fmt.Println(d, d1)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"qname #" + qname: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
	genre := c.Params.ByName("genre")
	qname := c.Params.ByName("qname")
	question := c.Params.ByName("question")
	var ques Quiz
	var qg QGenres
	var g Genres
	var score Score
	db.Where(&Quiz{Genre: genre, Qname: qname, Question: question}).Delete(&ques)
	if db.Where(&Quiz{Qname: qname}).First(&ques).RecordNotFound() {
		db.Where(&QGenres{Qname: qname}).Delete(&qg)
		db.Where(&Score{Qname: qname}).Delete(&score)
	}
	if db.Where(&QGenres{Genre: genre}).First(&qg).RecordNotFound() {
		db.Where(&Genres{Genre: genre}).Delete(&g)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"qname #" + qname: "deleted"})

}

func ShowQuiz(c *gin.Context) {
	qname := c.Params.ByName("qname")
	var question []Quiz
	if err := db.Where("qname = ?", qname).Find(&question).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	}
}

func GetQuiz(c *gin.Context) {
	genre := c.Params.ByName("genre")
	var qgenre []QGenres
	if err := db.Where("genre = ?", genre).Find(&qgenre).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, qgenre)
	}
}

func ShowQuestion(c *gin.Context) {
	qname := c.Params.ByName("qname")
	question := c.Params.ByName("question")
	var quiz Quiz
	if err := db.Where(&Quiz{Qname: qname, Question: question}).Find(&quiz).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}
}
func UpdateQuestion(c *gin.Context) {
	var quiz Quiz
	qname := c.Params.ByName("qname")
	question := c.Params.ByName("question")
	if err := db.Where(&Quiz{Qname: qname, Question: question}).Find(&quiz).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	}
	c.BindJSON(&quiz)
	db.Save(&quiz)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, quiz)
}

func PostScore(c *gin.Context) {
	var score Score
	c.BindJSON(&score)
	db.Create(&score)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, score)
}

func UpdateScore(c *gin.Context) {
	var score Score
	if err := db.Where(&Score{Username: score.Username, Genre: score.Genre, Qname: score.Qname}).First(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&score)
	db.Save(&score)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, score)
}

func GetUserScore(c *gin.Context) {
	var score Score
	user := c.Params.ByName("username")
	qname := c.Params.ByName("qname")
	genre := c.Params.ByName("genre")
	fmt.Println(user, qname, genre)
	if err := db.Where(&Score{Username: user, Genre: genre, Qname: qname}).First(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, score)
	}
}

func GetAllScores(c *gin.Context) {
	var leader []Leaderboard
	if err := db.Table("scores").Select("username, sum(score) as total").Group("username").Scan(&leader).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, leader)
	}
}

func GetGenreScores(c *gin.Context) {
	var leader []Leaderboard
	genre := c.Params.ByName("genre")
	if err := db.Table("scores").Select("username, sum(score) as total").Where("genre = ?", genre).Group("username").Scan(&leader).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, leader)
	}
}

func GetUserQuiz(c *gin.Context) {
	user := c.Params.ByName("username")
	var score []Score
	if err := db.Where(&Score{Username: user}).Find(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, score)
	}
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
