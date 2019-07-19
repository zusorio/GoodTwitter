var targetPage = "https://*.twitter.com/*";

var ua = "Mozilla/5.0 (Windows NT 9.0; WOW64; Trident/7.0; rv:11.0) like Gecko";

function rewriteUserAgentHeader(e) {
    e.requestHeaders.forEach(function(header){
        if (header.name.toLowerCase() == "user-agent") {
            header.value = ua;
        }
    });
    return {requestHeaders: e.requestHeaders};
}

function removeCookie() {
    var clear = browser.browsingData.removeCookies({
        hostnames: ["twitter.com"]
    });
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: [targetPage]},
    ["blocking", "requestHeaders"]
);

browser.runtime.onInstalled.addListener(removeCookie);