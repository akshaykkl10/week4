function filterServices(){
    const services = document.querySelectorAll('.service-card')
    const serviceForm = document.querySelector('.service-form')
    const category = serviceForm.querySelector('select')
    const searchInput = document.body.querySelector('#service-search')
    const searchValue = searchInput.value.toLocaleLowerCase()
    const categoryValue = category.value.toLocaleLowerCase()
    console.log('hiiii')
    for (let service of services){
        const serviceCategory = service.querySelector('h4').textContent.toLocaleLowerCase().trim()
        const serviceContent = `${service.querySelector('h2').textContent.toLocaleLowerCase().trim()} ${service.querySelector('p').textContent.toLocaleLowerCase().trim()}`
        if ((serviceCategory == categoryValue || categoryValue == "") && serviceContent.includes(searchValue)) {
            service.classList.remove('hide')
        } else {
            service.classList.add('hide')
        }
    }

}

export async function fetchJSON(url,comp) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${comp}`);
    }

    return await response.json();
}

export function debounce() {
    const searchInput = document.body.querySelector('#service-search')
    
    if (!searchInput) return
    let timeoutid;
    searchInput.addEventListener("input", () => {
        clearTimeout(timeoutid)
        timeoutid = setTimeout(() => {
            filterServices()
        }, 300);
    })
}

export function categoryFilter(){
    const serviceForm = document.querySelector('.service-form')
    
    if (!serviceForm) return
    const category = serviceForm.querySelector('select')
    category.addEventListener("input", () => {
        filterServices()
    })
}

class FormValidator {
    constructor(form) {
        this.form = form
        this.rules = {
            phone : [
                {
                    type: "pattern", 
                    value: /^[0-9]{10}$/,
                    message: "Enter Valid number"
                },
            ],
            name: [
                {
                    type: "required",
                    message: "Name is required"
                },
                {
                    type: "minLength",
                    value: 3,
                    message: "Name must be at least 3 characters"
                },
                {
                    type: "maxLength",
                    value: 20,
                    message: "Name cannot exceed 20 characters"
                }
            ],

            email: [
                {
                    type: "required",
                    message: "Email is required"
                },
                {
                    type: "email",
                    message: "Enter a valid email address"
                }
            ],
            textarea: [
                {
                    type: "required",
                    message: "Message is required"
                },
                {
                    type: "minLength",
                    value: 20,
                    message: "Minimum 20 words"
                }
            ]
        };
    }
    checkrule(value, rule) {
        console.log(rule.type)
        switch (rule.type) {
            case "pattern":
                return rule.value.test(value);
                
            case "required":
                console.log(value)
                console.log(value.trim() !== "")
                return value.trim() !== ""
                
            case "minLength":
                return rule.value <=  value.length
                
            case "maxLength":
                return rule.value >=  value.length
                
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                
        
            default:
                return true;
            }
    }

    validate(field) {
        let result = false
        const rules = this.rules[field.id]
        if (rules) {
            let spanField = field.nextElementSibling.classList.contains("error-field") ? field.nextElementSibling : null;
            console.log(field)
            console.log(spanField)
            for (let rule of rules){
                result = this.checkrule(field.value, rule)
                console.log(result, 'j')
                if (!result){
                    spanField.textContent = rule["message"]
                    field.scrollIntoView({behavior:'smooth'})
                    break
                }
            }
            if (!result) {
                spanField.style.display = "block"
            }else {
                spanField.style.display = "none"
            }
        }else{
            return true
        }
        return result

    }
}

export function showToast() {
    const form = document.body.querySelector('#contact-form');
    if (!form) return;
    const toast = document.body.querySelector('.toast')
    const validator = new FormValidator(form);
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        for (let input of form.querySelectorAll('input, textarea')){
            const ok = validator.validate(input)
            if (!ok) return
        }
        for (let input of form.querySelectorAll('input, textarea')){
            input.value = ""
        }
        setTimeout(() => {
            toast.classList.add("visible")
        },1500)
        setTimeout(() => {
            toast.classList.remove("visible")
        },3000)
    })
}

export function scrollAnimate(){
    const page = document.body.querySelector('a[aria-current="page"')
    if(page.textContent != 'Home') return
    const watcher = new IntersectionObserver((entries) => {
        
        for (let entry of entries){
        
            if (entry.isIntersecting){
                entry.target.classList.add("animate")
                watcher.unobserve(entry.target)
            }
        }
    })
    const items = document.body.querySelectorAll('.card')
    for (let item of items) {
        watcher.observe(item)
    }

}