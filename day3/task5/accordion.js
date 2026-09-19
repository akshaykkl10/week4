
 
export function accordion (){
    const accordSection = document.querySelector('.accordion')
    if (!accordSection) return
    accordSection.addEventListener("click", (event) => {
        const accordHeader = event.target.classList.contains('accordion-header')?event.target:null;
        if (!accordHeader) return
        const accordPanel = accordHeader.nextElementSibling
        const isExpanded = accordHeader.getAttribute("aria-expanded") === "true"
        if(!isExpanded){
            accordPanel.hidden = false
            accordHeader.ariaExpanded = true
        } else{ 
            accordPanel.hidden = true
            accordHeader.ariaExpanded = false
        }
    })
}