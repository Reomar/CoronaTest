//Grapping DOM elements

    //home Screen
        let startScreen = document.querySelector("#start-screen");
        let quizScreen = document.querySelector('#quiz-screen');
        let socreScreen = document.querySelector('#score-screen')
    //quiz Scetion
        let choise = document.querySelector('.choise')
        let Q = document.querySelector('#question')
        let choiseContainer = document.querySelector('#choise-container')
        let imageContainer = document.querySelector('#img-cotainer')
        let progress = document.querySelector('#prgress')
    //Score Screen
        let emoji = document.querySelector('#emoji-container');
        let percentage = document.querySelector('#score')  
        let answerBar = document.querySelector('#answer-bar')


//THE QUIZ QUESTIONS
let questions = [    {
    question:"what's your name",
    a : "omar",
    b : "malek",
    c : "amr",
    d : "huda",
    choicesNumber: 4,
    correct : "a"
},
{
    question:"what's your age",
    a : "1",
    b : "2",
    c : "3",
    d : "4",
    choicesNumber: 4,
    correct : "b"
},
{
    question:"what's your kab",
    a : "lorm",
    b : "ze[la",
    c : "jofdokofksd",
    d : "hathut",
    choicesNumber: 4,
    correct : "c"
}, 
{
    question:"what do you doo fo dooo",
    a : "ya",
    b : "na",
    choicesNumber: 2,
    correct : "a"
}];

//score tracker
let score = 0;

answers =[];

//when Start button is clicked
function start(){
    startScreen.classList.add('hidden')
    quizScreen.classList.remove('hidden')
    //start generating questions
    renderProgress();
};


//Render question
let currentQuestion = 0;
let quizSize = questions.length

function generateQuestion(){
    
    //Checks the number of the questions
    if(currentQuestion < quizSize){
        //blankout choise
        choiseContainer.innerHTML="";

        //renderquestion
        Q.innerText = questions[currentQuestion].question

        //renderchoisces
        for(i=0 ; i < questions[currentQuestion].choicesNumber ; i++){
            let choiseTag = numbersToLetters(i)
    
            choiseContainer.innerHTML += `<div id="${choiseTag}" class="choise-bg" onclick="checkAnswer('${choiseTag}')">
                                        <div class="number-bg">
                                            <p class="choise-number">${choiseTag.toUpperCase()}</p>
                                        </div>
                                        <div class="choise">${questions[currentQuestion][choiseTag]}</div>
                                        </div>`
        }

        //render Img
        imageContainer.innerHTML =`<img src="img/${currentQuestion}.png">`

    }else{
        //view Score screen when questions are finished
        veiwScore()
    }
}


//changing numbers to letters
function numbersToLetters(x){
    let letter;
    switch (x){
        case 0 :
            letter = 'a';
            break;
        case 1 :
            letter = 'b';
            break;
        case 2 :
            letter = 'c' ;
            break;
        case 3:
            letter = 'd';
            break           
    }

    return letter;
}

//render progress
function renderProgress(){
    for(i=0 ; i < quizSize ; i++){
        progress.innerHTML += `<div id="prog-${i}" class="progs-circle"></div>`
    }
    generateQuestion()
}

//checking Answers
function checkAnswer(x){
    if (x == questions[currentQuestion].correct){
        answerIsCorrect(x)
    }else{
        answerIsWrong()
    }
}


//If Answer Is Correct
function answerIsCorrect(x){
    //increase score
    score++

    //add tag to question
    answers.push('correct')
    
    //change progress to green
    document.getElementById(`prog-${currentQuestion}`).classList.add('correct')

    //return to questions
    currentQuestion++
    generateQuestion()
}

//If Answer Is wrong
function answerIsWrong(){
    //change progress to red
    document.getElementById(`prog-${currentQuestion}`).classList.add('wrong')
    
    //add tag to question
    answers.push('wrong')
    
    
    //return to questions
    currentQuestion++
    generateQuestion()
}


function veiwScore(){
    quizScreen.classList.add("hidden")
    socreScreen.classList.remove('hidden')

    let scorePercentage = calculateScore()

    //Add emoji based on reult
    if (scorePercentage < 30 ){
        emoji.innerHTML = '<img src="img/bad.svg"></img>'
    
    }else if(scorePercentage < 70) {
        emoji.innerHTML = '<img src="img/mid.svg"></img>'
    }else{
        emoji.innerHTML = '<img src="img/good.svg"></img>'
    }

    //Changing score percentage
    percentage.innerText = `${scorePercentage}%`


    //Adding colored progress bar 
    for(i=0 ; i < quizSize ; i++){
        answerBar.innerHTML += `<div id="prog-${i}" class="progs-circle ${answers[i]}"></div>`
    }

}

function calculateScore(){
    return Math.ceil((score / quizSize) * 100)
}
