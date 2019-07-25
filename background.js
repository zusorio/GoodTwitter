"use strict";

const targetPage = "https://*.twitter.com/*";

const ua = "Mozilla/5.0 (Windows NT 9.0; WOW64; Trident/7.0; rv:11.0) like Gecko";

function rewriteUserAgentHeader(e) {
    e.requestHeaders.forEach(function(header) {
        if (header.name.toLowerCase() == "user-agent") {
            header.value = ua;
        }
    });
    return {requestHeaders: e.requestHeaders};
}

function clearCache() {
    browser.browsingData.remove({"hostnames": ["twitter.com"]}, {"cache": true});
    browser.tabs.query({url: "*://*.twitter.com/*"}, function (result) {
        result.forEach(function (tab) {
            chrome.tabs.reload(tab.id)
        })
    });
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: [targetPage]},
    ["blocking", "requestHeaders"]
);


browser.runtime.onInstalled.addListener(clearCache);

