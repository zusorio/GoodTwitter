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

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: [targetPage]},
    ["blocking", "requestHeaders"]
);