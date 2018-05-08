/**
 * Created by lishoujie on 2018/5/3.
 */
/**
 * 创建加载中的动画
 */
function cLoadingDiv(){
    var html = '<div class="spinner"></div>';
    $("#main-content").html(html);
}
function cNoMediaDiv(){
    var html = '<div class="no-media">';
    html += '<h1>没有在当前标签页检测到任何视频</h1>';
    html += '<p>点击播放视频以帮助检测文件…</p>';
    html += '</div>';
    $("#main-content").html(html);
}

function cHasMediaDiv(url,title){
    var html = '<div class="has-media">';
    html += '<div class="click hit ">';
    html += '<div class="vdh-container">';
    html += '<div>';
    html += '<div class="vdh-fullwidth hit-descr">';
    html += '<div class="hit-title">';
    html += '<div class="hit-title-text hit-title-text-right" style="font-size: 1rem;padding:10px 0px;" id="playbtn">'+title+'</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="click hit-actions"><div>';
    html += '<img class="more-actions" src="img/icon-3dots-64.png"></div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $("#main-content").html(html);
}

