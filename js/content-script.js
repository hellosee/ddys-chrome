chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log('收到来自：' + (sender.tab?"content-script(" + sender.tab.url + ")":"popup或者background") + ' 的消息：',request);
    if(request.cmd == 'change_type'){
        sendResponse(JSON.stringify(request));
        /*
        chrome.storage.sync.get({playUrl: '',title:'',oPlayUrl:''}, function(items) {
            sendResponse(JSON.stringify(request));//getPlayUrl(request.type) + items.oPlayUrl
        });*/
    } else {
        console.log('我收到消息');
        sendResponse("我收到你的消息："+ JSON.stringify(request));
    }
});
window.addEventListener("message", function(e)
{
    console.log(e.data);
}, false);



// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', function() {
    var currentTabUrl = window.location.href;
    checkUrl(currentTabUrl);

});

function checkUrl(urlString){
    if(urlString!=""){
        var reg=/iqiyi\.com/;
        if(!reg.test(urlString)){
            console.log("不是正确的网址吧，请注意检查一下");
        } else {
            window.onload = function(){
                var playIframe = '<iframe src="http://yun.baiyug.cn/vip/?url='+urlString+'" class="embed-responsive-item" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen"' +
                    '                                         msallowfullscreen="msallowfullscreen"' +
                    '                                         oallowfullscreen="oallowfullscreen"' +
                    '                                         webkitallowfullscreen="webkitallowfullscreen" style="width:100%;height:100%;"></iframe>';
               // $(".pw-video").html('');
               // $(".videoArea").html(playIframe);
            }

        }
    }
}

function getCurrentTabUrl(callback){
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active:true,
        currentWindow:true
    };
    /*
    chrome.runtime.sendMessage({cmd: 'get_current_url'}, function(response) {
        console.log('收到来自后台的回复：' + response);
    });*/
    console.log(window.location.href);
    /*
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
        callback(url);
    });*/
}