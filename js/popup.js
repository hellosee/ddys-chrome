$(function() {
    $("#about").on("click",function(e){
        window.open(chrome.extension.getURL('play.html'));
    });
    $('#donate').click(function(e){
        window.open(chrome.extension.getURL('play.html'));
    });

    $('#playbtn').click(function(e){
        window.open(chrome.extension.getURL('play.html'));
    });

});
var parse = {
    /**
     * Get the current URL.
     *
     * @param {function(string)} callback called when the URL of the current tab
     *   is found.
     */
    "getCurrentTabUrl" :function(callback){
        // Query filter to be passed to chrome.tabs.query - see
        // https://developer.chrome.com/extensions/tabs#method-query
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
}

// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
document.addEventListener('DOMContentLoaded', function() {
    parse.getCurrentTabUrl(function(url,title){
        console.log(url);
        console.log(title);
        cHasMediaDiv(url,title);
        /*
        $.ajax({
            url:"http://dw.local.com/vod/index",
            type:'post',
            async:true,
            data:{'url':url},
            dataType:'json',
            beforeSend:function(){cLoadingDiv();},
            success:function(data){
                if(data.code == 1){
                    var data = data.data;
                    cHasMediaDiv(data.playUrl,data.title);
                }
            },
            complete: function(){
            }
        });


        chrome.tabs.getSelected(null, function (tab) {　　// 先获取当前页面的tabID
            chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
                console.log(response);　　// 向content-script.js发送请求信息
            });
        });*/
    });
});



