// start game
var startBtn = document.getElementById("button");
var homeBtn = document.getElementById("home");
var homePage = document.getElementById("firstPage");
var questionsPage = document.getElementById("questionsPage");
var hiScoreBtn = document.getElementById("hsbutton");

// choices 
var choicesAll = document.getElementById("choices");
var choiceA = document.getElementById("a");
var choiceB = document.getElementById("b");
var choiceC = document.getElementById("c");
var choiceD = document.getElementById("d");



// non-gameplay vars
var result = document.getElementById("result");
var scoreContainer = document.getElementById("score");
var form = document.getElementById("form");
var submitBtn = document.getElementById("submitButton");
var nameInput = document.querySelector("#name");
var timer = document.querySelector("#timer");
var hiScore = document.getElementById("highscore");
var hiScoreList = document.getElementById("highscoreList");



// Quiz Questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Which is not a sport?",
        choices: ["baseball", "soccer", "string cheese", "Football"],
        answer: "string cheese"
    },
    {
        title: "Which was never a U.S president?",
        choices: ["Hulk Hogan", "Barack Obama", "George Washington", "Abe Lincoln"],
        answer: "Hulk Hogan"
    },
    {
        title: "What type of bear is best?",
        choices: ["Grizzly Bear", "Black Bear", "There Are Basically 2 Schools of Thought....", "Chicago Bears"],
        answer: "Black Bear"
    },
]

// gameplay
var score = 0;
var questPosition=0;
var lastQuestion = questions.length -1;
var secondsLeft = 75;
var timerInterval
var masterList



var q = questions[questPosition]


window.onload = function (){
  questionsPage.style.display = "none";
  choicesAll.style.display = "none";
  form.style.display = "none";
  highscore.style.display="none";
  homePage.style.display= "block";
  homeBtn.style.display= "block";
};


startBtn.addEventListener("click", function(){
  homePage.style.display = "none";
  questionsPage.style.display = "block";
  choices.style.display = "block";
  highscore.style.display="none";
  setTime();
  enterQuestions();
});


function setTime(){
    timerInterval = setInterval(function(){
    secondsLeft--;
    timer.innerHTML = "Timer: " + secondsLeft;

    if (secondsLeft===0){
      quizScore();
    }
  },1000);
};

function enterQuestions(){
  q = questions[questPosition]
  questionsPage.innerHTML = questPosition+1 + ":   " + q.title;
  choiceA.innerHTML = 'A:   '+ q.choices[0];
  choiceB.innerHTML = 'B:   '+ q.choices[1];
  choiceC.innerHTML = 'C:   '+ q.choices[2];
  choiceD.innerHTML = 'D:   '+ q.choices[3];
};

choiceA.addEventListener("click", function(){
checkAnswer(q.choices[0]);
});

choiceB.addEventListener("click", function(){
checkAnswer(q.choices[1]);
});

choiceC.addEventListener("click", function(){
checkAnswer(q.choices[2]);
});

choiceD.addEventListener("click", function(){
checkAnswer(q.choices[3]);
});


function checkAnswer(choice){
  if (choice === questions[questPosition].answer){
    score++;
      result.innerHTML = "Nailed it!";
  }
  else {
      result.innerHTML = "Ope! That was wrong!";
      secondsLeft -= 10;
  }
  if (questPosition +1 <= lastQuestion ) {
    questPosition++;
    enterQuestions();
  }
  else {
    quizScore();
  }
};


//Show score and show input field for high score name 
function quizScore(){
  result.style.display="none";
  questionsPage.style.display = "none";
  choices.style.display = "none";
  scoreContainer.innerHTML = "Completed with " + secondsLeft + " seconds left";
  form.style.display = "block";
  clearInterval(timerInterval);
  timer.innerHTML = "Timer: 0";
  highscore.style.display="none";
}


//Gathers data for high score list

var masterList = [];


function renderLastUser (){
  var userName = localStorage.getItem("name");

  var showlist = localStorage.getItem("score") + " seconds: " + (userName);
      console.log(showlist) 
    
   
    hiScore = document.createElement("li");
    hiScore.textContent = showlist;

    hiScoreList.appendChild(hiScore);

  //hiScore.push(masterList);

 console.log(localStorage)
}

function init(){
var storedList = JSON.parse(localStorage.getItem("masterList"));
if(storedList !== null) {
  masterList = storedList;
}
renderLastUser()
}

function storedList() {
  localStorage.setItem("masterList", JSON.stringify(masterList));
  
}

submitBtn.addEventListener("click", function(){
  event.preventDefault();
  var name = document.querySelector("#name").value;
  localStorage.setItem("name", name);
  localStorage.setItem("score", secondsLeft);
  form.style.display="none";
  hiScore.style.display="block";

  
  

  
  //console.log(showList)  
  renderLastUser();
})

// Enables the home button at the end to bring to home screen
homeBtn.addEventListener("click", function(){
  window.location.reload();

;})

//Enables high score button to go to the view high scores page
hiScoreBtn.addEventListener("click", function () {

  hiScore.style.display="block";
  homePage.style.display = "none";
})


 