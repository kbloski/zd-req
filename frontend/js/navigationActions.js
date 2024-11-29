const linkBenefits = document.querySelector('a[href="#benefits"]');
const linkComponents = document.querySelector('a[href="#components"]');
const linkProducts = document.querySelector('a[href="#products"]');

const posTopBenefits = getTopPosEl( document.getElementById('benefits'))
const posTopComponents = getTopPosEl( document.getElementById('components'))
const posTopProducts = getTopPosEl( document.getElementById('products'))


window.addEventListener('scroll', () =>  {
    clearActiveClass()
    
    const currentPost = window.scrollY + window.screen.availHeight;
    if( posTopProducts < currentPost) {
        linkProducts.classList.add('active')
    }
    else if (posTopComponents < currentPost){
        linkComponents.classList.add('active')
    }
    else if ( posTopBenefits < currentPost) {
        linkBenefits.classList.add('active')
    }
} )


function clearActiveClass(){
    linkBenefits.classList.remove('active')
    linkComponents.classList.remove('active')
    linkProducts.classList.remove('active')
}

function getTopPosEl( domEl ){
    const rect = domEl.getBoundingClientRect();
    return rect.top + window.scrollY
}