var playBtns = [];
$(function() {
    getAllPlays();
    $("#donate").on('click',function(){
        window.open(chrome.extension.getURL('donate.html'));
    });
});

$(document).on('click','.changeline',function(e){
    $(".changeline").removeClass('btn-primary');
    $(".changeline").removeClass('disabled');
    var clickedButtonDOM=$(this)[0];
    $(clickedButtonDOM).addClass('btn-primary');
    $(clickedButtonDOM).addClass('disabled');
    var type = $(clickedButtonDOM).attr('data-type');
    playgetPlayIframe(type);
});

function playgetPlayIframe(type){
    chrome.storage.sync.get({playUrl: '',title:'',oPlayUrl:''}, function(items) {
        console.log(playBtns);
        console.log(items);
        var playIframe = '<iframe src="'+playBtns[type].url+items.oPlayUrl+'" class="embed-responsive-item" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen"' +
            '                                         msallowfullscreen="msallowfullscreen"' +
            '                                         oallowfullscreen="oallowfullscreen"' +
            '                                         webkitallowfullscreen="webkitallowfullscreen" style="width:100%;height:100%;"></iframe>';
        $(document).attr('title',items.title);
        $("#playtitle").text('正在播放：'+items.title);
        $("#player").html(playIframe);
    });
}

function getAllPlays(){
    $.ajax({
        url:"http://api.phpnote.com/chrome/playType",
        type:'post',
        async:true,
        data:{'op':true},
        dataType:'json',
        success:function(data){
            playBtns =  data.data;
            if(playBtns.length !=0){
                var html = "";
                for(var i=0;i<playBtns.length;i++){
                    if(i==0){
                        html += '<button type="button" data-type="'+i+'" class="btn btn-default btn-primary disabled changeline">'+playBtns[i].name+'</button>';
                    } else {
                        html += '<button type="button" data-type="'+i+'" class="btn btn-default changeline">'+playBtns[i].name+'</button>';
                    }
                }
                $("#btnline").html(html);
                playgetPlayIframe(0);
            }
        },
        complete: function(){}
    });
}

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

function getPlayUrl(type){

}


