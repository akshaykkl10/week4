export function mobileNav() {

    const hamburger = document.querySelector("#hamburger");
    const drawer = document.querySelector("#mobile-drawer");
    const closeButton = document.querySelector("#close-drawer");

    if (!hamburger || !drawer || !closeButton) return;

    hamburger.addEventListener("click", () => {

        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");

        closeButton.focus();
    });

    closeButton.addEventListener("click", () => {

        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");

        hamburger.focus();
    });
}