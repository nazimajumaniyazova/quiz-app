const steps = document.querySelectorAll('.step');
const prevButton = document.querySelector('.button-prev');
const nextButton = document.querySelector('.button-next');
const skipButton = document.querySelector('.button-skip');
const questionAnswers = document.querySelector('.question__answers')
let currentStep = 1;

nextButton.addEventListener('click', () => {
    currentStep++
    if (currentStep > steps.length) {
        currentStep = steps.length;
    }
    stepActive()
    console.log(currentStep)
})
prevButton.addEventListener('click', () => {
    currentStep--
    if (currentStep < 1) {
        currentStep = 1;
    }
    stepInactive()
    console.log(currentStep)
})

function stepActive() {
    steps[currentStep - 1].classList.add('step_active')
}

function stepInactive() {
    steps[currentStep].classList.remove('step_active')
}
questionAnswers.addEventListener('click', (event) => {
    let answer = event.target.closest('.question__answer');
    answer.classList.add()
})