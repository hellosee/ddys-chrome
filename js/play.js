$(function() {
    // 读取数据，第一个参数是指定要读取的key以及设置默认值
    chrome.storage.sync.get({playUrl: '',title:''}, function(items) {
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
});

