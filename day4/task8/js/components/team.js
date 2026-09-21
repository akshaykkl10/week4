import { fetchJSON } from "../utils.js";
import { errorCatch } from "./error.js";
const teamSection = document.querySelector('.teams')
const teamCat = document.querySelector('#team-category')

function teamFilter(){
    if (!teamCat) return
    const teams = document.body.querySelectorAll('.team-card')
    console.log(teams, "kk")
    teamCat.addEventListener("input", () => {
        const category = teamCat.value
        for (let team of teams){
            if (team.querySelector('.dep').textContent == category || category == "") {
                team.classList.remove('hide')
            } else {
                team.classList.add('hide')
            }
        }
        
    })
}



function renderTeams(userList){
    for (let user of userList) {

        const card = document.createElement('div')
        const name = document.createElement('h2')
        const username = document.createElement('h3')
        const website = document.createElement('a')
        const department =  document.createElement('p')
        card.classList.add('card','team-card')
        name.textContent = user.name
        username.textContent = user.username
        website.src = user.website
        website.textContent = user.website
        department.textContent = user.id%3 ==0 ? "Marketing" : user.id%2 == 0 ? "Design" : "Development";
        department.classList.add("dep")
        card.appendChild(department)
        card.appendChild(name)
        card.appendChild(username)
        card.appendChild(website)
        teamSection.appendChild(card)

    }
}

export async function users() {   
    if (!teamSection)  return
    try {
        const userList =  await fetchJSON("https://jsonplaceholder.typicode.com/users","Teams")
        
        renderTeams(userList)
        teamFilter()
        
    } catch (error) {
        errorCatch(error, users)
    }
}