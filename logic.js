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
let questions =[]

//determine the question 
if(document.documentElement.lang == "en"){
    questions = [    {
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
}else if(document.documentElement.lang == "ar"){
    questions = [    {
        question:"لماذا يعيش السمك بالماء",
        a : "انت بتقوول ايه",
        b : "السلاااامو عليكم",
        c : "صبح صباح ياعم الحج",
        d : "انا  فين انا مين ",
        choicesNumber: 4,
        correct : "a"
    },
    {
        question:"طب بص هقولك حاجة",
        a : "الدنية",
        b : "مش",
        c : "محتاجة",
        d : "اه",
        choicesNumber: 4,
        correct : "b"
    },
    {
        question:"نادي القرن الافريقي",
        a : "الاهلي",
        b : "الاهلي",
        c : "الاهلي",
        d : "ريال مدريد",
        choicesNumber: 4,
        correct : "c"
    }, 
    {
        question:"العب العب العب ",
        a : "اه",
        b : "لا",
        choicesNumber: 2,
        correct : "a"
    }];
}

//score tracker
let score = 0;
//Answers traker to display progress in scoreScreen
answers =[];

//when Start button is clicked
function start(){

    // ADD ANIMATIONS CLASSES TO ELEMENTS TO FADEIN & FADEOUT
    startScreen.classList.add('hidden')

    quizScreen.classList.remove('hidden')
    quizScreen.classList.add('fadein')


    //reder progress bar which will start displaying questions
    renderProgress()
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
    
            choiseContainer.innerHTML += `<div id="${choiseTag}" class="choise-bg fadein" onclick="checkAnswer('${choiseTag}')">
                                        <div class="number-bg">
                                            <p class="choise-number">${englishToArabic(choiseTag).toUpperCase()}</p>
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

//change English to arabic letters
function englishToArabic(letter){
    if(document.documentElement.lang == "ar"){
        switch (letter){
            case "a":
                letter = "ا"
                break;
            case "b":
                letter = "ب"
                break;
            case "c":
                letter = "ج"
                break;
            case "d":
                letter = "د"
                break;            
        }
    }
    return letter;
}

//render progress
function renderProgress(){
    for(i=0 ; i < quizSize ; i++){
        progress.innerHTML += `<div id="prog-${i}" class="progs-circle"></div>`
    }
    //start Rendering questions
    generateQuestion()
}

//checking Answers
function checkAnswer(x){
    if (x == questions[currentQuestion].correct){
        answerIsCorrect(x)
    }else{
        answerIsWrong(x)
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
    
    //Add green glow 
    document.getElementById(x).classList.add("greenGlow")

    //add animation
    document.getElementById(x).classList.add("isright")
    

    //return to questions
    currentQuestion++
    setTimeout(() =>generateQuestion()  , 1000 )
}

//If Answer Is wrong
function answerIsWrong(x){
    //change progress to red
    document.getElementById(`prog-${currentQuestion}`).classList.add('wrong')
    
    //add tag to question
    answers.push('wrong')

    //Hightight wrong answer glow 
    document.getElementById(x).classList.add("redGlow")

    //Animate the wrong answer
    document.getElementById(x).classList.add("iswrong")

    // HIGHLIGHT RIGHT ANSWER
    document.getElementById(questions[currentQuestion].correct).classList.add("greenGlow")

    //return to questions
    currentQuestion++
    setTimeout(() =>generateQuestion()  , 2000 )
}


function veiwScore(){
    //remove quizScreen
    quizScreen.classList.add("hidden")
    //Display scoreScreen
    socreScreen.classList.remove('hidden')
    //Animate the scorescreen
    socreScreen.classList.add('fadein')

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

//Function that calculate score
function calculateScore(){
    return Math.ceil((score / quizSize) * 100)
}
