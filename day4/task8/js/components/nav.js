export function mobileNav() {
    const navBtn = document.body.querySelector('.nav-toggler');
    const mobileNav = document.body.querySelector('.mobile-nav')
    navBtn.addEventListener("click", () => {
        if (mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open')
            document.body.style.overflow = "auto"
        } else {
            mobileNav.classList.add('open')
            document.body.style.overflow = "hidden"
        }
    });
    window.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            if (mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open')
            document.body.style.overflow = "auto"
        }
        }
    })
}