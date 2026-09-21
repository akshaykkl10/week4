const container = document.querySelector("#container");
const badbutton = document.querySelector("#run-bad");
const goodbutton = document.querySelector("#run-good");
for (let i = 0; i < 1000; i++) {
    const box = document.createElement("div");

    box.className = "box";

    container.appendChild(box);
}

badbutton.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".box");

    for (const box of boxes) {
        box.style.height = "200px";

        console.log(box.offsetHeight);
    }
});
// 417.96 ms for this


goodbutton.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".box");

    for (const box of boxes) {
        box.style.height = "200px";
    }

    for (const box of boxes) {
        console.log(box.offsetHeight);
    }
});
// 70.58ms and 10ms