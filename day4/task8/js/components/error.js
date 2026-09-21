const errorField = document.body.querySelector('.error-indicator')
const errorMessageField = document.body.querySelector('.error-message')
const retryBtn = document.body.querySelector('.retry-btn')
function renderError(error, callback) {
    errorMessageField.textContent = error.message;
    errorField.style.display = "block"
    retryBtn.addEventListener("click", () => {
        hideError()
    }) 
    callback()
}
export function hideError() {
    errorField.style.display = "none"
}

export function errorCatch(error, callback) {
    renderError(error, callback)
}