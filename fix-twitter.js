// simply tell the javascript of the page that we're on an up-to-date version
window.eval(`
Object.defineProperty(navigator, 'userAgent', {
  get: ()=>"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0"
})
`) // firefox is weird, if we didn't do this it'd define useragent on a shadow navigator that doesn't show to the website
