const COUNT_OF_SELECTED_TAGS_TO_START_QUIZ = 5;
window.onload = function() {
    addTagsClickHandler()
    canStartQuiz()
}

function addTagsClickHandler() {
    document.querySelector(".tags").addEventListener('click', (e) => {
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
    let count = document.querySelectorAll('.tag_selected').length
    if (count >= COUNT_OF_SELECTED_TAGS_TO_START_QUIZ) {
        startQuizButton.disabled = false
    } else {
        startQuizButton.disabled = true
    }
}