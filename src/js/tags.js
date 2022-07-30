const COUNT_OF_SELECTED_TAGS_TO_START_QUIZ = 5;
const SELECTED_LEVELS = 1;
window.onload = function() {
    loadCategories()
    loadLevels()
    addCategoriesClickHandler()
    addLevelClickHandler()
    canStartQuiz()
}

function addCategoriesClickHandler() {
    document.querySelector(".categories__tags").addEventListener('click', (e) => {
        let tag = e.target.closest('.tag');
        let tagSelected = e.target.closest('.tag_selected');
        if (!tag) { return }
        if (tagSelected) {
            removeSelectedTags(tag)
            canStartQuiz()
            return
        }
        if (tag) {
            selectClickedTag(tag)
            canStartQuiz()
        }
    })
}
function addLevelClickHandler(){
    document.querySelector('.levels__tags').addEventListener('click', (e)=>{
        let tag =  e.target.closest('.tag');
        let tagSelected = e.target.closest('.tag_selected');
        if(!tag){return}
        if (tagSelected) {
            removeSelectedTags(tag)
            console.log(tag)
            return
        }
        if (tag) {
            selectClickedTag(tag)
            console.log(tag)
        }
    })
}
function removeSelectedTags(clickedTag) {
    clickedTag.classList.remove('tag_selected')
}

function selectClickedTag(clickedTag) {
    clickedTag.classList.add('tag_selected')
}

function countTagsAmount() {
    let selectedTagsAmount = 0;
    document.querySelectorAll(".tag").forEach(tag => {
        if (tag.classList.contains('tag_selected')) {
            selectedTagsAmount++
        }
    })
    return selectedTagsAmount
}

function canStartQuiz() {
    let startQuizButton = document.querySelector(".button-start")
    let count = document.querySelectorAll('.categories__tags .tag_selected').length
    if (count >= COUNT_OF_SELECTED_TAGS_TO_START_QUIZ) {
        startQuizButton.disabled = false
    } else {
        startQuizButton.disabled = true;
        startQuizButton.addEventListener('click', ()=>{
            location.href='./../../pages/questions.html'
        })
    }
}

function loadCategories(){
    let categoriesTagsContainer = document.querySelector('.categories__tags')
    let categoriesURL = 'https://nazimajumaniyazova.github.io/quiz-app/db/categories.json'
    fetch(categoriesURL)
    .then(response => response.json())
    .then(categories => {
        categories.forEach(category => {

            let tagcontainer = document.createElement('div')
            tagcontainer.classList.add('tag')
            let categoryTag = document.createElement('span')
            categoryTag.classList.add('tag__name')

            categoryTag.innerText = category.name;
            tagcontainer.append(categoryTag)
            
            categoriesTagsContainer.append(tagcontainer)
        })
    })

}

function loadLevels(){
    let levelsTagsContainer = document.querySelector('.levels__tags')
    let levelsURL = './../../db/levels.json'
    fetch(levelsURL)
    .then(response => response.json())
    .then(levels => {
        levels.forEach(level => {

            let levelContainer = document.createElement('div')
            levelContainer.classList.add('tag')
            let levelTag = document.createElement('span')
            levelTag.classList.add('tag__name')

            levelTag.innerText = level.name;
            levelContainer.append(levelTag)
            
            levelsTagsContainer.append(levelContainer)
        })
    })
}





