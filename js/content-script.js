chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    console.log('收到来自：' + (sender.tab?"content-script(" + sender.tab.url + ")":"popup或者background") + ' 的消息：',request);
    if(request.cmd == 'update_font_size'){

    } else {
        console.log('我收到消息');
        sendResponse("我收到你的消息："+ JSON.stringify(request));
    }
});