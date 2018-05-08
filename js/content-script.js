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