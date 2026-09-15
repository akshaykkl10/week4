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

const width = canvas.width;
const height = canvas.height;

const padding = 60;

const barWidth = 30;

const maxValue = 45000;

const chartWidth = width - padding * 2;

const chartHeight = height - padding * 2;

const chartBottom = height - padding;

const barSpace = chartWidth / salesData.length;



const tooltip = document.querySelector("#tooltip");



const bars = [];




const gradient = ctx.createLinearGradient(
    0,
    0,
    0,
    height
);

gradient.addColorStop(0, "blue");

gradient.addColorStop(1, "lightblue");



function drawAxes() {

    ctx.beginPath();



    ctx.moveTo(
        padding,
        padding
    );

    ctx.lineTo(
        padding,
        chartBottom
    );



    ctx.lineTo(
        width - padding,
        chartBottom
    );


    ctx.strokeStyle = "black";

    ctx.lineWidth = 2;

    ctx.stroke();
}



function drawGrid() {

    const gridLines = 5;

    ctx.strokeStyle = "#dddddd";

    ctx.lineWidth = 1;

    ctx.font = "12px Arial";

    ctx.fillStyle = "black";

    for (let i = 0; i <= gridLines; i++) {

        const y =
            chartBottom -
            (i / gridLines) * chartHeight;



        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - padding,
            y
        );

        ctx.stroke();



        const value =
            (i / gridLines) * maxValue;



        ctx.fillText(
            `${value / 1000}K`,
            20,
            y + 4
        );
    }
}



function drawLabels() {

    ctx.fillStyle = "black";

    ctx.font = "14px Arial";

    salesData.forEach((data, index) => {

        const x =
            padding +
            index * barSpace +
            (barSpace - barWidth) / 2;


        ctx.fillText(
            data.month,
            x,
            chartBottom + 25
        );
    });



    ctx.save();

    ctx.translate(15, height / 2);

    ctx.rotate(-Math.PI / 2);

    ctx.textAlign = "center";

    ctx.fillText(
        "Sales",
        0,
        0
    );

    ctx.restore();



    ctx.textAlign = "center";

    ctx.fillText(
        "Month",
        width / 2,
        height - 10
    );

    ctx.textAlign = "left";
}



function easeOut(t) {

    return 1 - Math.pow(1 - t, 3);
}



const duration = 2000;

const startTime = performance.now();



function animate(currentTime) {


    ctx.clearRect(
        0,
        0,
        width,
        height
    );



    drawGrid();



    drawAxes();



    drawLabels();



    const elapsed =
        currentTime - startTime;



    const progress =
        Math.min(
            elapsed / duration,
            1
        );



    const easedProgress =
        easeOut(progress);



    bars.length = 0;



    salesData.forEach((data, index) => {


        const x =
            padding +
            index * barSpace +
            (barSpace - barWidth) / 2;



        const barHeight =
            (data.sales / maxValue) *
            chartHeight;



        const currentHeight =
            barHeight *
            easedProgress;



        const currentY =
            chartBottom -
            currentHeight;



        bars.push({
            x: x,
            y: currentY,
            width: barWidth,
            height: currentHeight,
            month: data.month,
            sales: data.sales
        });



        ctx.fillStyle = gradient;



        ctx.fillRect(
            x,
            currentY,
            barWidth,
            currentHeight
        );
    });



    if (progress < 1) {

        requestAnimationFrame(animate);

    }
}



requestAnimationFrame(animate);



canvas.addEventListener(
    "mousemove",
    (event) => {


        const rect =
            canvas.getBoundingClientRect();



        const mouseX =
            event.clientX - rect.left;

        const mouseY =
            event.clientY - rect.top;



        const hoveredBar =
            bars.find((bar) => {

                return (
                    mouseX >= bar.x &&
                    mouseX <= bar.x + bar.width &&
                    mouseY >= bar.y &&
                    mouseY <= bar.y + bar.height
                );

            });



        if (hoveredBar) {

            tooltip.style.display = "block";


            tooltip.textContent =
                `${hoveredBar.month}: ₹${hoveredBar.sales.toLocaleString("en-IN")}`;


            tooltip.style.left =
                `${event.clientX + 10}px`;


            tooltip.style.top =
                `${event.clientY + 10}px`;

        }


        else {

            tooltip.style.display = "none";

        }
    }
);



canvas.addEventListener(
    "mouseleave",
    () => {

        tooltip.style.display = "none";

    }
);




const downloadButton =
    document.querySelector("#download-chart");


downloadButton.addEventListener(
    "click",
    () => {


        const image =
            canvas.toDataURL("image/png");



        const link =
            document.createElement("a");



        link.download =
            "sales-chart.png";



        link.href = image;



        link.click();
    }
);