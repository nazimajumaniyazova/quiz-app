import { Modal } from './Modal.js';

const QUESTIONS_API_URL ='http://127.0.0.1:5502/db/question.json';
//"https://the-trivia-api.com/api/questions?categories=history&limit=5&difficulty=easy";

const stepsList = document.querySelectorAll('.step');
const stepsProgress = document.querySelector('.step__progress');
const stepsContainer = document.querySelector('.questions__steps');

const prevButton = document.querySelector('.button-prev');
const nextButton = document.querySelector('.button-next');
const skipButton = document.querySelector('.button-skip');

const questionContainer = document.querySelector(".questions");
const questionText  =document.querySelector('.question__desc');

const answersContainer = document.querySelector('.question__answers');
const answersList = document.querySelectorAll('.question__answer');

const timerIcon = document.querySelector('.icon_timer')
let currentStep = 1;
let userAnswers = [];
let anwsersDisplayOrder = [];
window.onload = () =>{
    fetchQuestions().then( questionsArray =>{
        setTimer(questionsArray)
        anwsersDisplayOrder = generateAnswersOrder(questionsArray)
        insertQuestion(questionsArray)
        insertAnswers(questionsArray)

        nextButton.addEventListener('click', () => {
            nextStep()
            answersContainer.innerHTML = ''
            insertQuestion(questionsArray)
            insertAnswers(questionsArray)
            activeStep()
            isAnswerSelected()
         })
        prevButton.addEventListener('click', () => {
            prevStep()
            answersContainer.innerHTML = ''
            insertQuestion(questionsArray)
            insertAnswers(questionsArray)
            inactiveStep()
            isAnswerSelected()
       
        })
        skipButton.addEventListener('click',()=>{
            nextStep()
            answersContainer.innerHTML = ''
            insertQuestion(questionsArray)
            insertAnswers(questionsArray)
            activeStep()
            isAnswerSelected()
       
        })
        answersContainer.addEventListener('click', (event) => {
            let answer = event.target.closest('.question__answer');
            if(answer){
                let answersList = document.querySelectorAll('.question__answer')
                Array.from(answersList).forEach( answer =>{ 
                    answer.classList.remove('question__answer_selected')
                })
                answer.classList.add('question__answer_selected')
                if(!answer.classList.contains('.question__answer_selected')){
                    userAnswers[currentStep-1] = answer.textContent.trim().slice(0,-2)
                }  
                console.log(userAnswers)
            }  
        })
    }); 
   
}
function nextStep(){
    currentStep++
    if (currentStep > stepsList.length) {
        currentStep = stepsList.length;
    }
    if(currentStep > 1){
        prevButton.classList.add('button_colored');
        prevButton.classList.remove('button_inactive');
    }
    if(currentStep === stepsList.length){
        nextButton.classList.add('button_inactive')
        nextButton.classList.remove('button_colored')

        skipButton.classList.add('button_inactive')
    }
}
function prevStep(){
    currentStep--
    if (currentStep < 1) {
        currentStep = 1;
    }
    if(currentStep === 1){
        prevButton.classList.remove('button_colored');
        prevButton.classList.add('button_inactive');
    }
    if(currentStep >1){
        nextButton.classList.remove('button_inactive')
        nextButton.classList.add('button_colored')

        skipButton.classList.remove('button_inactive')
    }
}
function activeStep() {
    stepsList[currentStep - 1].classList.add('step_active');
    stepsProgress.style.width = (stepsContainer.offsetWidth/stepsList.length)*currentStep - stepsList[0].offsetWidth + 'px';
 }
 
function inactiveStep() {
     stepsList[currentStep].classList.remove('step_active')
     stepsProgress.style.width = (stepsContainer.offsetWidth/stepsList.length)*currentStep - stepsList[0].offsetWidth + 'px';
 
}

async function fetchQuestions(){
    let response = await fetch(QUESTIONS_API_URL)
    let questionsArray = await response.json()
    return questionsArray
}
function createElement(tagName, ...className){
    let element = document.createElement(tagName)
    element.classList.add(...className)
    return element
}
function insertQuestion(questionsArray){
    questionText.innerHTML = questionsArray[currentStep-1].question
}
function insertAnswers(questionsArray){
    let anwersArray = []
    anwersArray.push(questionsArray[currentStep - 1].correctAnswer);
    anwersArray = anwersArray.concat(questionsArray[currentStep - 1].incorrectAnswers)

    anwsersDisplayOrder[currentStep - 1].forEach( (answerPostion, index) =>{
        let answerElement =  createElement('p','question__answer')
        let answerNumber = createElement('span','question__answer-badge')
        answerElement.innerText = anwersArray[answerPostion];
        answerNumber.innerHTML = index +1 + '.';
        // if(answerPostion ===0){
        //     let correctAns = createElement('span','question__answer')
        //     correctAns.innerHTML = 'CORRECT'
        //     answerElement.append(correctAns)
        // }
        answerElement.append(answerNumber)
        answersContainer.append(answerElement)
    })
    
}
function generateAnswersOrder(questionsArray){
    let answersDisplayingOrder = []
    let asnwersLength =  questionsArray[0].incorrectAnswers.length +1
    for(let i=0;i<questionsArray.length;i++){
        let setNumberRandom = new Set();
        while(setNumberRandom.size < asnwersLength ){
            setNumberRandom.add(Math.floor(Math.random() * asnwersLength));
        }
        answersDisplayingOrder[i] = Array.from(setNumberRandom)
    }
    return answersDisplayingOrder
}
function isAnswerSelected(){
    let answersList = document.querySelectorAll('.question__answer')
    Array.from(answersList).forEach( answer =>{ 
        if(answer.textContent.trim().slice(0,-2) === userAnswers[currentStep-1]){
            answer.classList.add('question__answer_selected')
        }
    })
}
function setTimer(questionsArray){
    let seconds = 10, stop = 0, counterStarted = false, counter, animate;
    function setCounter(){
        if(counterStarted === false){
        counterStarted = true;
        counter = setInterval(function(){
            if(seconds >= stop){
            document.querySelector('.time').innerHTML = seconds;
            seconds--;
          }else{
                timerIcon.classList.add('time-out-animation')
                clearInterval(counter);
                setTimeout(createModal(questionsArray),5000)
                counterStarted = false;
                seconds = 0;
              }
            },1000)
        }
        
    }
    setCounter()
    return seconds
}
function createModal(questionsArray){
    let userScoreContent = createElement('div','user-score__content')

    let userScoreTitle = createElement('h3','user-score__title')
    userScoreTitle.innerHTML = "Great job, username";

    let userScoreAmount  = createElement('p','user-score__text')
    let userScore = countUserScore(questionsArray)
    userScoreAmount.innerHTML = `Your score is ${userScore}`

    let answeredQuestions =  createElement('p','user-score__text')
    answeredQuestions.innerText = `You got ${userScore/2} correct out of 5`
    
    let userScoreButtons = createElement('div','user-score__buttons')

    let retakeQuizButton = createElement('button','button', 'button_colored')
    retakeQuizButton.innerHTML = 'Retake Quiz'
    retakeQuizButton.addEventListener('click', ()=>{
        window.location='per-start.html';
    })

    let backHomeButton  =  createElement('a', 'link-button')
    backHomeButton.innerHTML = 'Back Home'
    backHomeButton.setAttribute("href", "./../index.html");

    userScoreButtons.append(retakeQuizButton)
    userScoreButtons.append(backHomeButton)

    userScoreContent.append(userScoreTitle)
    userScoreContent.append(userScoreAmount)
    userScoreContent.append(answeredQuestions)
    userScoreContent.append(userScoreButtons)

    let modal =  new Modal ('user-score__modal');
    modal.buildModal(userScoreContent);
}
function countUserScore(questionsArray){
    let score = 0;
    userAnswers.forEach((answer,index) =>{
        if(answer){
            if(answer === questionsArray[index].correctAnswer){
                score = score + 2
            }
        }
    })
   return score;
}