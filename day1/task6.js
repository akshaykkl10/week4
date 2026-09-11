const articles = document.querySelectorAll('article')

const articleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.classList.add('visible')
            articleObserver.unobserve(entry.target)
        }
    })
})
articles.forEach(element => {
    articleObserver.observe(element)
});

const feedMutationObserver = new MutationObserver(mutations => {
    console.log(mutations)
    mutations.forEach(mutation => {
        let span;
        span = document.createElement('span')
        if (mutation.type == 'childList'){
            mutation.addedNodes.forEach(node => {
                span.textContent = ` ${node.tagName} added`
                articleObserver.observe(node)
            })
            
            mutation.removedNodes.forEach(node => {
                span = document.createElement('span')
                span.textContent = ` ${node.tagName} deleted`
            })
            logger.appendChild(span)
        }
        if (mutation.type == 'attributes'){
            span.textContent = `${mutation.attributeName} changed`
            logger.appendChild(span)
        }
    })
});
const logger = document.body.querySelector('.log')
const feed =  document.body.querySelector('.feed')
feedMutationObserver.observe(feed, {
    childList: true,
    attributes:true
})
let count = 1
const form = document.body.querySelector('.add-form')
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const title = event.target.title.value
    event.target.title.value = ""
    const content = event.target.content.value
    event.target.content.value = ""
    if (title == "" || content == "") return;
    const article = document.createElement('article')
    const titleElement = document.createElement('h1')
    const contentElement = document.createElement('p')
    const delBtn = document.createElement('button')
    delBtn.classList.add('del-btn')
    delBtn.textContent = 'Delete'
    titleElement.textContent = title
    contentElement.textContent = content
    article.appendChild(titleElement)
    article.appendChild(contentElement)
    article.appendChild(delBtn)
    feed.appendChild(article)
    feed.dataset.count = count
    count++
})

feed.addEventListener("click", (event) => {
    const btn = event.target
    if (!btn.classList.contains('del-btn')) return;
    const article = btn.closest('article')
    article.classList.remove('visible')
    setTimeout(() => {
        article.remove()
    },300)
}) 

const firstLooker = window.matchMedia('(min-width:768px)')
const secondLooker = window.matchMedia('(min-width:1024px)')
firstLooker.addEventListener("change", event => {
    console.log("768px breakpoint crossed:", event.matches);
});

secondLooker.addEventListener("change", event => {
    console.log("1024px breakpoint crossed:", event.matches);
});

const container = document.querySelector('.chart-container')
const canvas = document.querySelector("#chart");
canvas.style.border = "1px solid"

const ctx = canvas.getContext("2d");
function drawChart(width, height) {

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();

    ctx.moveTo(0, height);

    ctx.lineTo(width * 0.25, height * 0.6);
    ctx.lineTo(width * 0.5, height * 0.7);
    ctx.lineTo(width * 0.75, height * 0.3);
    ctx.lineTo(width, height * 0.4);

    ctx.stroke();
}
drawChart(300, 400)
const chartSizeObserver = new ResizeObserver(elements => {
    elements.forEach(element => {
        const width = element.contentRect.width
        const height = element.contentRect.width
        console.log(width, height)
        drawChart(width, height)
    })
})
chartSizeObserver.observe(container)