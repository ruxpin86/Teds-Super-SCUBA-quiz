// determine correct answer w/ comparison of user choice 'button' to current question answer
// on incorrect user choice -10seconds from secondsLeft
//terminate the quiz when last question index is reached
//log secondsLeft as user score
//on secondsLeft 0 or no more questions display game over
//prompt user for initials using a prompt
//log user score in local storage
//display user score in #high-score



// declared global variables
var startButton = document.querySelector('#start-button')
var questionEl = document.querySelector('#question')
var userScores = document.querySelector('#userScores')
var timerEL = document.querySelector('#timer')
var answerBtn = document.querySelector("#answer-btns")
var userName = document.querySelector("#username")
var secondsLeft;
var duration = 60
var score;
var timerId;
var currentQuestionIndex = 0

//varriabl for array of questions as objects to be called upon
var questionArray = [
    {
        question: "What is the max depth for recreational SCUBA diving?",
        choices: ["100ft", "60ft", "50ft", "130ft"],
        answer: "130ft"
        // a1: "100ft",
        // a2: "60ft",
        // a3: "50ft",
        // a4: "130ft",
    },
    {
        question: "Who invented the aqualung?",
        choices: ["Jean Luc Picard", "Jacques-Yves Cousteau", "Nicola Tesla", "Benjamin Franklin"],
        answer: "Jacques-Yves Cousteau"
        // a1: "Jean Luc Picard",
        // a2: "Jacques-Yves Cousteau",
        // a3: "Nicola Tesla",
        // a4: "Benjamin Franklin",
    },
    {
        question: "Which of these is NOT a recreational diving training agency?",
        choices: ["PADI", "SSI", "NAUI", "WWF"],
        answer: "WWF"
        // a1: "PADI",
        // a2: "SSI",
        // a3: "NAUI",
        // a4: "WWF",
    },
    {
        question: "Having decompression sickness is commonly known as _________.",
        choices: ["having the bends", "running the loops", "having the runs", "getting narc'd"],
        answer: "having the bends",
        // a1: "having the bends",
        // a2: "running the loops",
        // a3: "having the runs",
        // a4: "getting narc'd",
    }
]

// event listener for "CLICK TO START" button
startButton.addEventListener("click", startQuiz)

// this function, in conjunction with the clockTick function 
function startQuiz() {
    secondsLeft = duration
    currentQuestionIndex = 0 //start at the [0] question index
    timerId = setInterval(clockTick, 1000)
    console.log('game start') //check to make sure button is working properly
    getQuestion()
}

// function to decrement the quiz timer
function clockTick() {
    secondsLeft--; //decrement the timer
    timerEL.textContent = "Time remaining: " + secondsLeft //display the time remaining
    if (secondsLeft <= 0) { //prevents timer from going into negative numbers
        endQuiz() //call endQuiz 
    }
}

// function to pull questions out of the questionArray object
function getQuestion() {
    var currentQuestion = questionArray[currentQuestionIndex] //set the currentQuestion to be equal to the index value of the questionArray
    questionEl.textContent = currentQuestion.question //call and display question using dot notation to target in object
    answerBtn.innerHTML = "" //set answerButton to an empty string
    currentQuestion.choices.forEach(function (choice) { //have object choices assigned to buttons dynamically
        var choiceButton = document.createElement("button") //create button
        choiceButton.textContent = choice //call to function parameter
        choiceButton.onclick = questionClick //call to questionClick function
        choiceButton.name = currentQuestion.answer //use .name method and set equal to object answer
        answerBtn.appendChild(choiceButton) //display choices on answer buttons
    })
}


//function to handle user answer clicks, and increment through questionArray
function questionClick(event) {
    currentQuestionIndex++ //increment question index position by one 
    console.log("count", questionArray.length, currentQuestionIndex)
    if (questionArray.length > currentQuestionIndex) { //get next question
        getQuestion()
    } else {
        console.log("end of questions"); //checking to make sure everything is cool
        endQuiz() //end quiz when last question is reached
    }
    if (event.target.textContent !== event.target.name) { //if statement to handle incorrect responses and decrement timer
        console.log("incorrect", event.target.textContent, event.target.name)
        secondsLeft -= 5 //5 second penalty, SCUBA is for making friends ;]
    } else {
        console.log("correct", event.target.textContent, event.target.name) //check to make sure this is doing the right thing
    }
}


// Ends the quiz and displays user score based upon `secondsLeft`
function endQuiz() {
    score = secondsLeft //set user score to time remaining on timer
    timerEL.textContent = score //display that score BABY!
    answerBtn.innerHTML = `You Scored ${score} enter your initials!\n <input id="username"/><button onclick="saveScore()">SUBMIT</button>` //picked up this move from my tutor to use template strings
    questionEl.innerHTML = "GAME OVER" //display GAME OVER... man -Bill Paxton
    console.log("GAME OVER", score) //check that everything is kosher
    clearInterval(timerId) //clear timer
}

//function to save scores to local storage with a prompt for the user
function saveScore() {
    var userName = document.querySelector("#username").value //set userName equal to template string from endQuiz function
    let scores = localStorage.getItem("QUIZ_SCORES") || "[]"
    scores = JSON.parse(scores)
    scores.push(`${userName}: ${score}`)
    scores = JSON.stringify(scores)
    localStorage.setItem("QUIZ_SCORES", scores)
    answerBtn.innerHTML = ""
    printScores() //call printScores function
}

//have those beautiful score display on the page
function printScores() {
    var scores = JSON.parse(localStorage.getItem("QUIZ_SCORES") || "[]")
    var string = ""
    scores.forEach((x) => {
        string += `<br/>${x}`
    })

    userScores.innerHTML = string
}
