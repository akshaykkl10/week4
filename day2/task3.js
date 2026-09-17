const pages = {
    "/": `
        <h1>Home</h1>
        <p>Welcome to my portfolio.</p>
    `,

    "/about": `
        <h1>About</h1>
        <p>About me.</p>
    `,

    "/projects": `
        <h1>Projects</h1>
        <p>My projects.</p>

        <select id="project-filter">
            <option value="all">All</option>
            <option value="ai">AI</option>
            <option value="web">Web</option>
            <option value="ml">ML</option>
        </select>
    `,

    "/contact": `
        <h1>Contact</h1>
        <p>Contact me.</p>
    `
};

function linkUpdater() {
    const path = window.location.pathname
    links.forEach(element => {
        if (element.getAttribute('href') == path){
            element.classList.add('active')
        }else {
            element.classList.remove('active')
        }
    });
}

function filterUpdater() {
    const filterIn = document.body.querySelector('#project-filter')
    if (!filterIn) return
    const params = new URLSearchParams(location.search)
    console.log(params)
    filterIn.value = params.get('filter')
}

function updateBreadcrumb() {

    const breadcrumb = document.querySelector("#breadcrumb");

    const path = window.location.pathname;

    if (path === "/") {
        breadcrumb.textContent = "Home";
        return;
    }

    const parts = path
        .split("/")
        .filter(Boolean);

    const labels = parts.map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
    });

    breadcrumb.textContent = "Home / " + labels.join(" / ");
}

function router(){
    const linkPath = window.location.pathname
    const app = document.body.querySelector('#app')
    if (pages[linkPath]) {
        app.innerHTML = pages[linkPath];
    } else {
        app.innerHTML = `
            <h1>404</h1>
            <p>Page not found.</p>
        `;
    }

    linkUpdater()
    filterUpdater()
    updateBreadcrumb()
}

const links = document.body.querySelectorAll('[data-route]')
links.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const linkPath = element.href
        history.pushState({}, '', linkPath)
        router()
    })
});

const app = document.body.querySelector('#app')
app.addEventListener("change", (event) => {
    console.log(event.target)
    if (event.target.id != "project-filter")return 
    const filter = event.target.value
    console.log(filter);
    const url = new URL(window.location.href)
    if (filter == "all") {
        url.searchParams.delete("filter")
    } else {
        url.searchParams.set("filter", filter)
    }
    history.pushState({}, "", url)
    router()
});

window.addEventListener('popstate', router)
router()