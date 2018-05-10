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

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{

    if(request.cmd == 'get_current_url') {
        //sendResponse('我是后台，我已收到你的消息：' + window.location.href);
        getCurrentTabUrl(function(url){
            //sendResponse('您要的当前url：' + url);
        });
    } else {

    }

    //console.log('收到来自content-script的消息：');
   // console.log(request, sender, sendResponse);
   // sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
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