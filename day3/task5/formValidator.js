

export class FormValidator {
    constructor(){
        console.log("CONSTRUCTOR RUNNING");
        this.rules = {
            telephone : [
                { 
                    type: "required", 
                    message: "Phone number is required"

                },
                {
                    type: "pattern", 
                    value: /^[0-9]{10}$/,
                    message: "Enter Valid number"
                },
            ],
            username: [
                {
                    type: "required",
                    message: "Username is required"
                },
                {
                    type: "minLength",
                    value: 3,
                    message: "Username must be at least 3 characters"
                },
                {
                    type: "maxLength",
                    value: 20,
                    message: "Username cannot exceed 20 characters"
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

            password: [
                {
                    type: "required",
                    message: "Password is required"
                },
                {
                    type: "minLength",
                    value: 8,
                    message: "Password must be at least 8 characters"
                }
            ],

            confirmpassword: [
                {
                    type: "required",
                    message: "Please confirm your password"
                },
                {
                    type: "match",
                    value: "password",
                    message: "Passwords do not match"
                }
            ]
        };
    }
    
    checkRule(field, rule){
        const value = field.value
        switch (rule.type) {
            case "required":
                return value.trim() != "";
            case "pattern":
                    return rule.value.test(value);
            case "minLength":
                    return value.length >= rule.value;
            case "maxLength":
                    return value.length <= rule.value;
            case "email":
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            default:
                return true;
        }
    }
    validate(form){
        const formInputs = form.querySelectorAll('input')
        let result = false
        for(const input of formInputs){
            const rules = this.rules[input.id]
            if (rules){
                let spanField = input.nextElementSibling.classList.contains("error-field")?input.nextElementSibling:null;
                for (let rule of rules) {
                    result = this.checkRule(input, rule)
                    if(!result){
                        spanField.textContent = rule["message"]
                        break
                    }
                    spanField.textContent = ""
                }
                if(!result){
                    spanField.classList.add("visible")
                }else{
                    spanField.classList.remove("visible")
                }
        
            }else {
                result = true
            }
        }
        return result
    }
}




// const submitBtn = form.querySelector('button')

// submitBtn.addEventListener('click', (event) => {
//     let result = true;
//     for (let input of formInputs){

//         result = validator.validateField(input)
//         if (!result){
//             event.preventDefault()
//             break
//         }
//     }
// })