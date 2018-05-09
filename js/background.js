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
    onclick: function(){
        getCurrentTabUrl(function(url,title){
            chrome.storage.sync.set({playUrl: "",title:title,oPlayUrl:url}, function() {
                window.open(chrome.extension.getURL('play.html'));
            });
        })
    }
});
function getCurrentTabUrl(callback){
    var queryInfo = {
        active:true,
        currentWindow:true
    };
    chrome.tabs.query(queryInfo,function(tabs){
        // chrome.tabs.query invokes the callback with a list of tabs that match the
        // query. When the popup is opened, there is certainly a window and at least
        // one tab, so we can safely assume that |tabs| is a non-empty array.
        // A window can only have one active tab at a time, so the array consists of
        // exactly one tab.
        var tab = tabs[0];
        // A tab is a plain object that provides information about the tab.
        // See https://developer.chrome.com/extensions/tabs#type-Tab
        var url = tab.url;
        // tab.url is only available if the "activeTab" permission is declared.
        // If you want to see the URL of other tabs (e.g. after removing active:true
        // from |queryInfo|), then the "tabs" permission is required to see their
        // "url" properties.
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url,tab.title);
    });
}

function getPlayUrl(type){

    ajax({
        url:"http://api.phpnote.com/chrome/playType",
        type:'post',
        async:true,
        data:{'op':true},
        dataType:'json',
        success:function(data){
            var data = data.data;
            return data[type].url;
        },
        complete: function(){

        }
    });
    alert(url);
    /*
    var url = new Array();
    url[0] = 'http://yun.baiyug.cn/vip/?url=';
    url[1] = 'http://jx.aeidu.cn/index406.php?url=';
    url[2] = 'http://88wx.pw/vip/playe.php?url=';
    url[3] = 'http://jiexi.92fz.cn/player/vip.php?url=';
    url[4] = 'http://wwwhe73.177kdy.cn/1.php?url=';
    url[5] = 'http://jqaaa.com/jq3/?url=';
    url[6] = 'http://aikan-tv.com/?url=';
    url[7] = 'http://www.wpswan.com/mzr/vipparse/index.php?url=';
    url[8] = 'http://player.jidiaose.com/supapi/iframe.php?v=';
    url[9] = 'https://api.flvsp.com/?url=';
    url[10] = 'http://api.bbbbbb.me/svip/v.php?url=';
    url[11] = 'http://000o.cc/jx/ty.php?url==';
    return url[type];
    */
}


function ajax(){
    var ajaxData = {
        type:arguments[0].type || "GET",
        url:arguments[0].url || "",
        async:arguments[0].async || "true",
        data:arguments[0].data || null,
        dataType:arguments[0].dataType || "text",
        contentType:arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend:arguments[0].beforeSend || function(){},
        success:arguments[0].success || function(){},
        error:arguments[0].error || function(){}
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType=ajaxData.dataType;
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
    xhr.setRequestHeader("Content-Type",ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                ajaxData.success(xhr.response)
            }else{
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data){
    if( typeof data === 'object' ){
        var convertResult = "" ;
        for(var c in data){
            convertResult+= c + "=" + data[c] + "&";
        }
        convertResult=convertResult.substring(0,convertResult.length-1)
        return convertResult;
    }else{
        return data;
    }
}