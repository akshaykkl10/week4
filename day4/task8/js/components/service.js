import { fetchJSON } from "../utils.js";
import { errorCatch } from "./error.js";

const serviceSection = document.body.querySelector(".services")
async function getServices() {
    const response = await fetchJSON(
        "https://jsonplaceholder.typicode.com/posts?_limit=20",
        "Services"
    );
    return response;
}

function renderServices(services){
    console.log(services)
    

    for (let service of services){
        const article = document.createElement('article')
        article.classList.add('card', 'service-card')
        const title = document.createElement('h2')
        title.textContent = service.title
        const content = document.createElement('p')
        content.textContent = service.description
        const category = document.createElement('p')
        category.textContent = service.category
        article.appendChild(category)
        article.appendChild(title)
        article.appendChild(content)
        serviceSection.appendChild(article)
    }

}

export async function services (){
    if (!serviceSection)return
    try {
        let posts = await getServices()
        const services = posts.map((post) => {
            return {
                id:post.id,
                title: post.title,
                description: post.body,
                category: post.id % 2 === 0 ? "Design" : post.id % 3 === 0 ? "Development" : "marketing"
            }
        })
        renderServices(services)
        
    } catch (error) {
        errorCatch(error, services)
    }
}