const buttons = document.querySelectorAll('.copy-button')

buttons.forEach(btn => {
    btn.addEventListener('click', async() => {
        const block = btn.closest('.code-block')
        const codeText = block.querySelector('code').innerText
        await navigator.clipboard.writeText(codeText)
        btn.textContent = 'Copied!'
        setTimeout(() => {
            btn.textContent = 'Copy'
        }, 3000);
    })
})