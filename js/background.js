chrome.runtime.onInstalled.addListener(function(){
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    // 测试网址
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'local.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开爱奇艺才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'iqiyi.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开腾讯视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'qq.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开优酷视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'youku.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开搜狐视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'sohu.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开土豆视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'tudou.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开56视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: '56.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开ku6视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'ku6.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开乐视视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'le.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开芒果视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'mgtv.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
            {
                conditions: [
                    // 只有打开芒果视频才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({pageUrl: {urlContains: 'mgtv.com'}})
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            },
        ]);
    });
});