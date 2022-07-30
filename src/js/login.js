const form = document.querySelector('.form-login')
const inputEmail = document.querySelector('.form-login__input');
const inputPass = document.querySelector('.form-login__password');
const formErrors = document.querySelector('.form-error');

form.addEventListener('submit', (event) => {
    let submit = true;
    event.preventDefault();
    formErrors.innerHTML = ''

    if (inputEmail.value.trim() === '') { // if the email section is empty
        inputEmail.classList.add("input-error");
        formErrors.append(createError('The email address must not be empty'))
        submit = false;
    } else {
        inputEmail.classList.remove("input-error");
    }

    if (inputPass.value.trim() === '') { //if the password section is empty
        inputPass.classList.add("input-error");
        formErrors.append(createError('The password address must not be empty'))
        submit = false;
    } else if (inputPass.value.trim().length < 6 || inputPass.value.trim().length > 20) { //of the lenght of the pass is less than 5 and more than 20
        inputPass.classList.add("input-error");
        formErrors.append(createError('The password shoud have more than 5 characters'))
        submit = false;
    } else {
        inputPass.classList.remove("input-error");
    }
    if (!validateEmail(inputEmail.value)) {
        inputEmail.classList.add("input-error");
        formErrors.append(createError(`The email addess is not correct. It should be as 'example.com'`))
        submit = false;
    }
    if(submit){
        console.log('lss')
        window.location.href = './per-start.html'

    }
})

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function createError(error){
    let paragraph = document.createElement('p')
    paragraph.innerHTML = error
    return paragraph;
}