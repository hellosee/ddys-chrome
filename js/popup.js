var oPlayUrl = "";
var otitle = "";
$(function() {
    $("#about").on("click",function(e){
        window.open(chrome.extension.getURL('play.html'));
    });
    $('#donate').click(function(e){
        console.log('donate');
        sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'},function(response){
            if(response){
                alert(response);
            }
        })
    });

    $('#main-content').click(function(e){

        var op = $(this).attr('data-url');
        chrome.storage.sync.set({playUrl: "",title:otitle,oPlayUrl:op}, function() {
            window.open(chrome.extension.getURL('play.html'));
        });
    });

});

function sendMessageToContentScript(message,callback){
    getCurrentTabId(function(tabId){
        chrome.tabs.sendMessage(tabId,message,function(response){
            if(callback){
                callback(response);
            }
        });
    });
}
// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}


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
        oPlayUrl = url;
        otitle = title;
        $("#main-content").attr('data-url',url);
        cHasMediaDiv(url,title);
    });
});



