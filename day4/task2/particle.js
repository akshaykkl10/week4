const particles = []
const canvas = document.body.querySelector('canvas')
const ctx = canvas.getContext("2d")
const button = document.body.querySelector('#play-pause')

for (let i = 0; i < 200; i++) {
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        vx: (Math.random() - 0.5) *2,
        vy: (Math.random() - 0.5) *2,
        color: `hsl(${Math.random() * 360}, 100%, 40%)`
    })
    
}
console.log(particles)
let animate 

function animateParticles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let particle of particles){
        let d = Math.random()
        particle.x += (particle.vx)
        particle.y += (particle.vy)
        if (particle.x < 0 || particle.x > canvas.width){
            particle.vx *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height){
            particle.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI*2)
        ctx.fillStyle = particle.color
        ctx.fill()
    }
    animate = requestAnimationFrame(animateParticles)
}
animateParticles()
button.addEventListener("click", () => {
    if(button.textContent == 'pause'){
        cancelAnimationFrame(animate)
        button.textContent = 'play'
    } else {
        button.textContent = 'pause'
        animateParticles()
    }
})