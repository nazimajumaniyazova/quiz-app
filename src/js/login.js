const form = document.querySelector('.form-login')
const inputEmail = document.querySelector('.form-login__input');
const inputPass = document.querySelector('.form-login__password');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (inputEmail.value.trim() === '') {
        inputEmail.classList.add("input-error");
        console.log('llll')
    } else {
        inputEmail.classList.remove("input-error");
    }
    if (inputPass.value.trim() === '') {
        inputPass.classList.add("input-error");
    } else if (inputPass.value.trim().length < 6 || inputPass.value.trim().length > 20) {
        console.log('error')
        inputPass.classList.add("input-error");
    } else {
        inputPass.classList.remove("input-error");
    }
    if (!validateEmail(inputEmail.value)) {
        inputEmail.classList.add("input-error");
    }
})

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}