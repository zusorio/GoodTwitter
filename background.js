"use strict";

const targetPage = "https://*.twitter.com/*";

const ua = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) Waterfox/56.2 ";

function rewriteUserAgentHeader(e) {
    if (!e.url.startsWith("https://mobile.twitter.com")) {
        e.requestHeaders.forEach(function (header) {
            if (header.name.toLowerCase() === "user-agent") {
                header.value = ua;
            }else if (header.name.toLowerCase() ==="cookie") {
                header.value = header.value.replace(/rweb_optin=.*?(; .*)?$/i, "rweb_optin=off$1");
            }
        });
        return {requestHeaders: e.requestHeaders};
    }
}

function clearCache() {
    browser.browsingData.remove({"hostnames": ["twitter.com"]}, {"cache": true});
    browser.tabs.query({url: "*://*.twitter.com/*"}, function (result) {
        result.forEach(function (tab) {
            browser.tabs.reload(tab.id)
        })
    });
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: [targetPage]},
    ["blocking", "requestHeaders"]
);


browser.runtime.onInstalled.addListener(clearCache);

