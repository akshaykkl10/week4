const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

const values = [
    120, 180, 150, 220,
    260, 310, 280, 350,
    300, 380, 420, 390
];

const canvas = document.querySelector("#chart");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 500;

const tooltip = document.querySelector("#tooltip");
const exportButton = document.querySelector("#export");

const chart = {
    left: 70,
    right: 30,
    top: 30,
    bottom: 60
};

const average = values.reduce((sum, value) => sum + value, 0) / values.length

const chartWidth = canvas.width - chart.left - chart.right;

const chartHeight = canvas.height - chart.top - chart.bottom;

const maxValue = Math.max(...values);

let hoveredIndex = -1;

function getY(value) {
    return (chart.top + chartHeight - (value / maxValue) * chartHeight);
}


function drawAxes() {
    ctx.beginPath()
    ctx.moveTo(chart.left, chart.top)
    ctx.lineTo(chart.left, chart.top + chartHeight)
    ctx.lineTo(chart.left + chartWidth, chart.top + chartHeight)
    ctx.strokeStyle = '#333'
    ctx.stroke()
}


function drawGrid() {
    const gridCount = 5
    ctx.strokeStyle = "#ddd";
    ctx.fillStyle = "#666";
    ctx.font = "12px Arial";

    for (let i = 0; i <= gridCount; i++){
        const value = (maxValue / gridCount) * i
        const y = getY(value)
        ctx.beginPath()
        ctx.moveTo(chart.left, y)
        ctx.lineTo(chart.left + chartWidth, y)
        ctx.stroke()
        ctx.fillText(Math.round(value), chart.left - 10, y + 4)
    }
}


const gradient = ctx.createLinearGradient(
    0, chart.top, 0, chart.top + chartHeight
)
gradient.addColorStop(0, "#f97a7a")
gradient.addColorStop(1, "#8d7af9")

const highlightGradient = ctx.createLinearGradient(
    0, chart.top, 0, chart.top + chartHeight
)
highlightGradient.addColorStop(0, "#ff3c2e")
highlightGradient.addColorStop(1, "#4a2bff")

function drawBars(progress) {
    const slotWidth = chartWidth / values.length
    const barWidth = slotWidth * 0.6
    values.forEach((value, index) => {
        const x = chart.left + (slotWidth * index) + (slotWidth - barWidth) / 2
        const y = getY((value * progress))
        const height =  chart.top + chartHeight - y
        
        if (index === hoveredIndex) {
            ctx.fillStyle = highlightGradient;
        } else {
            ctx.fillStyle = gradient;
        }

        ctx.fillRect(x, y, barWidth, height)
        ctx.fillStyle = "#333";
        ctx.textAlign = 'center'
        ctx.fillText(months[index], x + barWidth / 2, canvas.height - 20);
    })

}

function drawTargetLine() {
    const y = getY(average);

    ctx.beginPath();

    ctx.setLineDash([8, 5]);

    ctx.moveTo(chart.left, y);
    ctx.lineTo(
        chart.left + chartWidth,
        y
    );

    ctx.strokeStyle = "#dc2626";
    ctx.stroke();

    ctx.setLineDash([]);
}


function draw(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawAxes()
    drawGrid()
    drawBars(progress)
    drawTargetLine()


}

function easeOut(t) {
    return 1 - Math.pow(1-t, 3)
}

const duration = 1000
const startTime = performance.now()
function animate(now) {
    const elapsed = now - startTime
    const progress = easeOut(Math.min(1, elapsed / duration))
    draw(progress)
    if ( progress < 1 ) {
        requestAnimationFrame(animate)
    }
}
requestAnimationFrame(animate)


canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left;

    const mouseY = event.clientY - rect.top;
    const slotWidth = chartWidth / values.length;

    const index = Math.floor((mouseX - chart.left) / slotWidth);
    if (index >= 0 && index < values.length) {
        const barheight = (values[index] / maxValue) * chartHeight
        const barTop = canvas.height - chart.bottom - barheight
        // console.log(barheight)
        if(mouseY < canvas.height - chart.bottom && mouseY > barTop) {
            hoveredIndex = index;
            draw(1)
            tooltip.textContent = `${months[index]}: ${values[index]}`;
            tooltip.style.display = 'block'
            tooltip.style.left = `${mouseX + 10}px`;
            tooltip.style.top = `${mouseY - 30}px`;
        } 
    }else {
            tooltip.style.display = "none"
            hoveredIndex = -1
            draw(1)
        }
    // console.log(hoveredIndex)
})

exportButton.addEventListener('click', () =>{
    const img = canvas.toDataURL("image/png")
    const link = document.createElement('a')
    link.href = img
    link.download = "monthly-chart.png"
    link.click()
})