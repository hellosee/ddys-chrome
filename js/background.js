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

chrome.contextMenus.create({
    title: "点点影视VIP视频解析",
    onclick: function(){alert('您点击了右键菜单！');}
});

function getPlayUrl(type){
    var url = new Array();
    url[0] = 'http://yun.baiyug.cn/vip/?url=';
    url[1] = 'http://jx.aeidu.cn/index406.php?url='
    url[2] = 'http://88wx.pw/vip/playe.php?url='
    url[3] = 'http://jiexi.92fz.cn/player/vip.php?url='
    url[4] = 'http://wwwhe73.177kdy.cn/1.php?url='
    url[5] = 'http://jqaaa.com/jq3/?url='
    url[6] = 'http://aikan-tv.com/?url='
    url[7] = 'http://www.wpswan.com/mzr/vipparse/index.php?url='
    url[8] = 'http://player.jidiaose.com/supapi/iframe.php?v='
    url[9] = 'https://api.flvsp.com/?url='
    url[10] = 'http://api.bbbbbb.me/svip/v.php?url='
    url[11] = 'http://000o.cc/jx/ty.php?url=='
    return url[type];
}
