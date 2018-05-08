$(function() {
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get({playUrl: '',title:'',oPlayUrl:''}, function(items) {
        /*
        var playIframe = '<iframe src="'+items.playUrl+'" class="embed-responsive-item" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen"' +
            '                                         msallowfullscreen="msallowfullscreen"' +
            '                                         oallowfullscreen="oallowfullscreen"' +
            '                                         webkitallowfullscreen="webkitallowfullscreen" style="width:100%;height:100%;"></iframe>';
            */
        var playIframe = '<iframe width="100%" height="100%" src="http://jiexi.92fz.cn/player/vip.php?url=https://v.qq.com/x/cover/fse52rd4klx7qn2.html" allowFullScreen="ture" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>';
        $(document).attr('title',items.title);
        $("#playtitle").text('正在播放：'+items.title);
        $("#player").html(playIframe);
    });

    $(".changeline").on('click',function(e){
        var clickedButtonDOM=$(this)[0];
        window.postMessage({"test": '你好！'}, '*');
        //var bg = chrome.extension.getBackgroundPage();
        //console.log(bg.getPlayUrl(clickedButtonDOM));
        /*
        sendMessageToContentScript({cmd:'change_type', type:$(clickedButtonDOM).attr('data-type')},function(response){
            if(response){
                alert(response);
            }
        })*/
        //console.log(clickedButtonDOM);    // 查看结果
    });
});

function sendMessageToContentScript(message,callback){
   // console.log(message);
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

