// simply tell the javascript of the page that we're on an up-to-date version
Object.defineProperty(navigator, 'userAgent', {
  get: ()=>"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0"
})
