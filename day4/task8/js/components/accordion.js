
 
 export function accordion (){
    const accordSection = document.querySelector('.accordion-section')
    const accordItems = Array.from(document.querySelectorAll('.accordion-title'))
    if (!accordSection) return
    accordSection.addEventListener("click", (event) => {
        const accordTitle = event.target.classList.contains('accordion-title')?event.target:null;
        if (!accordTitle) return
        const accordContent = accordTitle.nextElementSibling
        accordContent.classList.toggle('opened')
        accordContent.querySelector('.accordion-inner').classList.toggle('opened')
    })
    window.addEventListener("keydown", (event) => {
        let activeElement = document.activeElement
        event.preventDefault()
        const activeIndex = accordItems.indexOf(activeElement)
        let targetIndex = activeIndex
        if (event.key == 'Enter' || event.key == "space") {
            activeElement = document.activeElement
            if (activeElement && activeElement.closest('.accordion')) {
                const content = activeElement.nextElementSibling
                content.classList.toggle('opened')
                content.querySelector('.accordion-inner').classList.toggle('opened')
            }
            return
        }
        if (activeElement && activeElement.closest('.accordion')) {
            if (event.key == "ArrowUp") {
                targetIndex = activeIndex == 0 ? accordItems.length -1 : activeIndex-1

            } else if (event.key == "ArrowDown") {
                targetIndex = activeIndex == accordItems.length -1 ? 0 : activeIndex+1
            }
            accordItems[targetIndex].focus()
        } else {
            if (event.key == "ArrowUp") {
                targetIndex = accordItems.length -1
                
            } else if (event.key == "ArrowDown") {
                targetIndex = 0
            }
        
            accordItems[targetIndex].focus()
        }

    })
 }