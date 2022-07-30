function burgerMenu() {
    const burger = document.querySelector('.hamburger')
    const menu = document.querySelector('.header__navigation')
    const body = document.querySelector('body')
    burger.addEventListener('click', () => {
        if (!menu.classList.contains('active')) {
            menu.classList.add('active')
            burger.classList.add('active-hamburger')
            body.classList.add('locked')

        } else {
            menu.classList.remove('active')
            burger.classList.remove('active-hamburger')
            body.classList.remove('locked')

        }
    })
}
burgerMenu()