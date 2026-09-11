const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 27000 },
    { month: "Jun", sales: 24000 },
    { month: "Jul", sales: 30000 },
    { month: "Aug", sales: 28000 },
    { month: "Sep", sales: 32000 },
    { month: "Oct", sales: 36000 },
    { month: "Nov", sales: 40000 },
    { month: "Dec", sales: 45000 }
];


const canvas = document.querySelector("#sales-chart");
const ctx = canvas.getContext("2d");

const width = canvas.width
const height = canvas.height
const padding = 60
const barwidth = 50
const maxValue = 45000

const gradient = ctx.createLinearGradient(0, 0, 0, height);

gradient.addColorStop(0, "blue");
gradient.addColorStop(1, "lightblue");
ctx.fillStyle = gradient

let count = 1
let x = 100;

salesData.forEach((data, index)=> {
    const x = (index + 1) * 150;
    const barHeight = (data.sales / maxValue) * (height - padding*2) ;
    const chartBottom = height - padding
    const progress = salesData.map(() => 0);

    function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    salesData.forEach((data, index) => {

        const x = (index + 1) * 100;

        const barHeight =
            (data.sales / maxValue) *
            (height - padding * 2);

        const chartBottom = height - padding;

        progress[index] += 0.02;

        if (progress[index] > 1) {
            progress[index] = 1;
        }

        const currentHeight =
            barHeight * progress[index];

        const currentY =
            chartBottom - currentHeight;

        ctx.fillRect(
            x,
            currentY,
            barwidth,
            currentHeight
        );

        ctx.fillText(
            data.month,
            x,
            chartBottom + 20
        );
    });

    requestAnimationFrame(animate);
}

animate();



})

