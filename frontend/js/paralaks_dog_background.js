const backgroundItems = document.getElementById("dog-baner-paralax-elements");
const n = 0.5;

window.addEventListener("scroll", () => {
    if (!backgroundItems) return;

    const backgroundItemsPos = backgroundItems.getBoundingClientRect();
    if (-1 * backgroundItemsPos.top > backgroundItems.scrollHeight) return;

    if (backgroundItemsPos.top - window.screen.availHeight-100 < 0) {
        backgroundItems.style.transform = `translateY(${-(
            n * backgroundItemsPos.top
        )}px)`;
    }
});
