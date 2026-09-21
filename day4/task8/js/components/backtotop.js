export function backToTop(){
    const topBtn = document.body.querySelector('#top-btn')
    window.addEventListener("scroll", () => {
        if(scrollY > 350){
            topBtn.style.display = "block"
        }else {
            topBtn.style.display = "none"
        }
    })
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top:0,
            behavior :"smooth"
        })
    })
}