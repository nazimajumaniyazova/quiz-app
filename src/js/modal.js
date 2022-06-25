let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay');
let btn = document.querySelector(".link-button");

btn.addEventListener('click', () => {
    overlay.style.top = '0'
})
window.onclick = function(event) {
    if (event.target == overlay) {
        overlay.style.top = '100%'
    }
}