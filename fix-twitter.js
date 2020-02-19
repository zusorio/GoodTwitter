// simply tell the javascript of the page that we're on an up-to-date version
// There is no other known way to change this property, eval is needed here and simply evals a string!!
window.eval(`
Object.defineProperty(navigator, 'userAgent', {
  get: ()=>"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0"
})
`);
// firefox is weird, if we didn't do this it'd define useragent on a shadow navigator that doesn't show to the website


// Remove warning banners that the browser is outdated
let topBannerContainer = document.getElementById("banners");
if (topBannerContainer !== null) {
    topBannerContainer.classList.add("hidden")
}


// Resize the large padding removing the banner creates
let topSpacerBar = document.getElementsByClassName("topbar-spacer");
if (topSpacerBar !== null && topSpacerBar[0] !== undefined) {
    topSpacerBar[0].style.paddingTop = "50px";
}


// Remove search warning banner
let searchWarningContainer = document.getElementsByClassName("BannersContainer");
if (searchWarningContainer !== null && searchWarningContainer[0] !== undefined) {
    searchWarningContainer[0].classList.add("hidden");
}


// make sure that if the banner doesn't exist, wait until it does before removing it
let searchObserver = new MutationObserver(mutations => {
    let searchWarningContainer = document.getElementsByClassName("BannersContainer");
    if (searchWarningContainer !== null && searchWarningContainer[0] !== undefined) {
        searchWarningContainer[0].classList.add("hidden");
        searchObserver.disconnect();
    }
});
searchObserver.observe(document.body, {childList: true, subtree: true});


