import { fetchJSON } from "../utils.js";
import { errorCatch } from "./error.js";
const postSection = document.querySelector('.posts')
function renderPost(posts){
    const latest = [...posts]
                    .sort((a,b) => b.id - a.id)
                    .slice(0,3);
    for (let post of latest){
        const article = document.createElement('article')
        article.classList.add('card')
        const title = document.createElement('h2')
        title.textContent = post.title
        const content = document.createElement('p')
        content.textContent = post.body
        article.appendChild(title)
        article.appendChild(content)
        postSection.appendChild(article)
    }
}


export async function showPost(){

    if (!postSection) return
    try {
        
        const posts = await fetchJSON("https://jsonplaceholder.typicode.com/posts","Latest Posts")
        renderPost(posts)
    } catch (error) {
        errorCatch(error, showPost)
    }
}