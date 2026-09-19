export function darkMode(){
    let theme = localStorage.getItem("theme")
    const darkBtn = document.body.querySelector("#dark-btn")
    darkBtn.addEventListener("click", () => {
        console.log(theme)
        if (theme != null){
            if (theme == "dark"){
                theme = "light"
            } else if (theme == "light") {
                theme = "dark"
            }
        } else {
            theme = "dark"
        }
        document.documentElement.dataset.theme = theme
        localStorage.setItem("theme", theme)

    });
    window.addEventListener("DOMContentLoaded", ()=> {
        document.documentElement.dataset.theme = theme
    })
}