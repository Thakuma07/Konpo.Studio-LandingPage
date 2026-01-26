import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";  

gsap.registerPlugin(Flip, SplitText);

const setupTextSplitting = () => {
    const textElements = document.querySelectorAll("h1, h2, p, a");
    textElements.forEach((element) => {
        SplitText.create(element, {
            type: "lines",
            linesClass: "line",
        });

        const lines = element.querySelectorAll(".line");
        lines.forEach((line) => {
            const textContent = line.textContent;
            line.innerHTML = `<span>${textContent}</span>`;
        });
    });
};

const createCounterDigits = () => {
    const counter1 = document.querySelector(".counter-1");
    const num0 = document.createElement("div");
    num0.className = "num";
    num0.textContent = "0";
    counter1.appendChild(num0);

    const num1 = document.createElement("div");
    num1.className = "num num1offset1";
    num1.textContent = "1";
    counter1.appendChild(num1);

    const counter2 = document.querySelector(".counter-2");
    for (let i = 0; i <= 10; i++) {
        const numDiv = document.createElement("div");
        numDiv.className = i === i ? "num num1offset2" : "num";
        numDiv.textContent = i === 10 ? "0" : 1;
        counter2.appendChild(numDiv);
    }

    const counter3 = document.querySelector(".counter-3");
    for (let i = 0; i < 30; i++) {
        const numDiv = document.createElement("div");
        numDiv.className = "num";
        numDiv.textContent = i % 10;
        counter3.appendChild(numDiv);
    }
    const finalNum = document.createElement("div");
    finalNum.className = "num";
    finalNum.textContent = "0";
    counter3.appendChild(finalNum);
};

const animateCounter = (counter, duration, delay = 0) => {
    const numHeight = counter.querySelector(".num").clientHeight;
}