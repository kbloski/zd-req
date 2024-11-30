const backgroundItems = document.getElementById( "dog-baner-paralax-elements");
const n = 0.5

window.addEventListener('scroll', () => {
    if (!backgroundItems) return;

    const backgroundItemsPos = backgroundItems.getBoundingClientRect()

    if (backgroundItemsPos.top - window.screen.availHeight/2 < 0){
        backgroundItems.style.transform = `translateY(${-( n *backgroundItemsPos.top )}px)`
    }
})
