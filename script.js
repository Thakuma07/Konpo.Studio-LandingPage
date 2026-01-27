/* ----------------------------- */
/* GSAP PLUGIN SETUP */
/* ----------------------------- */
const SplitTextPlugin = window.SplitText;
const FlipPlugin = window.Flip;

if (SplitTextPlugin && FlipPlugin) {
    gsap.registerPlugin(FlipPlugin, SplitTextPlugin);
} else {
    console.error("GSAP plugins missing: SplitText or Flip not loaded");
}

/* ----------------------------- */
/* TEXT SPLITTING */
/* ----------------------------- */
const setupTextSplitting = () => {
    if (!SplitTextPlugin) return;

    const textElements = document.querySelectorAll("h1, h2, p, a");

    textElements.forEach((el) => {
        // prevent double split
        if (el.classList.contains("is-split")) return;

        const split = SplitTextPlugin.create(el, {
            type: "lines",
            linesClass: "line",
        });

        split.lines.forEach((line) => {
            const span = document.createElement("span");
            span.textContent = line.textContent;
            line.textContent = "";
            line.appendChild(span);
        });

        el.classList.add("is-split");
    });
};

/* ----------------------------- */
/* COUNTER SETUP */
/* ----------------------------- */
const createCounterDigits = () => {
    const counter1 = document.querySelector(".counter-1");
    if (counter1) {
        counter1.innerHTML = `
            <div class="num">0</div>
            <div class="num num1offset1">1</div>
        `;
    }

    const counter2 = document.querySelector(".counter-2");
    if (counter2) {
        for (let i = 0; i <= 10; i++) {
            const div = document.createElement("div");
            div.className = "num num1offset2";
            div.textContent = i === 10 ? "0" : i;
            counter2.appendChild(div);
        }
    }

    const counter3 = document.querySelector(".counter-3");
    if (counter3) {
        for (let i = 0; i <= 30; i++) {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = i % 10;
            counter3.appendChild(div);
        }
    }
};

/* ----------------------------- */
/* COUNTER ANIMATION */
/* ----------------------------- */
const animateCounter = (counter, duration, delay = 0) => {
    if (!counter) return;

    const numHeight = counter.querySelector(".num").clientHeight;
    const distance = (counter.children.length - 1) * numHeight;

    gsap.to(counter, {
        y: -distance,
        duration,
        delay,
        ease: "power2.inOut",
    });
};

/* ----------------------------- */
/* IMAGE FLIP ANIMATION */
/* ----------------------------- */
function animateImages() {
    if (!FlipPlugin) return;

    const images = document.querySelectorAll(".img");
    if (!images.length) return;

    images.forEach((img) => img.classList.remove("animate-out"));

    const state = FlipPlugin.getState(images);

    images.forEach((img) => img.classList.add("animate-out"));

    const tl = gsap.timeline();

    tl.add(
        FlipPlugin.from(state, {
            duration: 1,
            stagger: 0.1,
            ease: "power3.inOut",
        })
    );

    images.forEach((img, i) => {
        tl.to(
            img,
            {
                scale: 2.5,
                duration: 0.45,
                ease: "power3.in",
            },
            i * 0.1
        ).to(
            img,
            {
                scale: 1,
                duration: 0.45,
                ease: "power3.out",
            },
            i * 0.1 + 0.5
        );
    });

    return tl;
}

/* ----------------------------- */
/* MAIN TIMELINE */
/* ----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    setupTextSplitting();
    createCounterDigits();

    animateCounter(document.querySelector(".counter-3"), 2.5);
    animateCounter(document.querySelector(".counter-2"), 3);
    animateCounter(document.querySelector(".counter-1"), 2, 1.5);

    gsap.set(".img", { scale: 0 });
    gsap.set(".line span", { y: "100%" });

    const tl = gsap.timeline();

    tl.to(".hero-bg", {
        scaleY: 1,
        duration: 3,
        ease: "power2.inOut",
        delay: 0.25,
    })
        .to(
            ".img",
            {
                scale: 1,
                duration: 1,
                stagger: 0.125,
                ease: "power2.out",
            },
            "<"
        )
        .to(".counter", {
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
            onStart: animateImages,
        })
        .to(".sidebar .divider", {
            scaleY: 1,
            duration: 1,
            ease: "power3.inOut",
            delay: 1.25,
        })
        .to(
            ["nav .divider", ".site-info .divider"],
            {
                scaleX: 1,
                duration: 1,
                stagger: 0.5,
                ease: "power3.inOut",
            },
            "<"
        )
        .to(
            ".logo",
            {
                scale: 1,
                duration: 1,
                ease: "power4.inOut",
            },
            "<"
        )
        .to(
            ".line span",
            {
                y: "0%",
                duration: 1,
                stagger: 0.05,
                ease: "power4.out",
                delay: 0.5,
            },
            "<"
        );
});
