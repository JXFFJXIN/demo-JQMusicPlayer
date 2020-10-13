(function(){
    var audioNode = document.createElement('audio');
    audioNode.setAttribute('src',$('.active_song').attr('data-origin'));
    var timeLine = $('.player_timeLine').get(0).offsetWidth;
    var t = new TimelineMax();
    t.to('.player_cdData',3,{
        rotation:"360deg",
        ease: Power0.easeNone,
        repeat:-1
    },
    "-=0.2s"
    );
    t.pause();
// 点击播放
    $('.player_play').click(function(){
        // $('.player').addClass('play');
        if($('.player').hasClass('play')){// 判断.player上是否拥有play属性
            // 有的话就去除play
            $('.player').removeClass('play')
            // 设置暂停状态
            TweenMax.to(//CD变小
                '.player_cdData',0.2,
                {
                    scale:1,
                    ease: Power0.easeNone
                }
            );
            TweenMax.to(//背景下降
                '.backMask',0.2,
                {
                    top:0,
                    ease: Power0.easeNone
                }
            );
            t.pause();
            audioNode.pause();



        }else{
            // 否则就添加play属性
            $('.player').addClass('play');
            // 设置播放状态
            TweenMax.to(// CD变大
                '.player_cdData',0.2,
                {
                    scale:1.1,
                    ease: Power0.easeNone
                }
            );
            TweenMax.to(//背景上升
                '.backMask',0.2,
                {
                    top:'-50%',
                    ease: Power0.easeNone
                }
            );
            t.play();//CD转起来
            // audioNode.play();
            songPlay();
            changeSoneLrc();
            durationLine();

        }


    })

// 下一曲
$('.player_next').click(function(){
    if($('.player .player_cdData.active_song').is(":last-child")){// 判断是否是最后一首歌
        $('.player .player_cdData.active_song').removeClass('active_song');// 是的话，移除active
        $('.player .player_cdData:first-child').addClass('active_song');// 给第一首歌添加active
    }else{
        $('.player .player_cdData.active_song').removeClass('active_song').next().addClass('active_song')//否则，给下一首歌加active

    }
    if($('.player').hasClass('play')){
        songPlay();
        changeSoneLrc();
        durationLine();
    }
})

// 上一曲
$('.player_prev').click(function(){
    if($('.player .player_cdData.active_song').is(":first-child")){
        $('.player .player_cdData.active_song').removeClass('active_song');
        $('.player .player_cdData:last-child').addClass('active_song');
    }else{
        $('.player .player_cdData.active_song').removeClass('active_song').prev().addClass('active_song')

    }
    if($('.player').hasClass('play')){
        songPlay();
        changeSoneLrc();
        durationLine();
    }
   

})
// 歌曲加载播放函数
function songPlay(){
    audioNode.setAttribute('src',$('.active_song').attr('data-origin'));
    audioNode.play();
}
//文本显示
function changeSoneLrc(){
    $('.songName').text($('.active_song').attr('data-song'));
    $('.singer').text($('.active_song').attr('data-singer'));
}
//进度条
function durationLine(){
    // 监听audio标签中的timeupdate方法
    audioNode.addEventListener('timeupdate',function(){
        var durationTime = this.duration//整首歌的长度；
        var current = this.currentTime;//当前的时间s为单位
        var percent  = current/durationTime;//百分比=当前时间/整首歌的时间
        console.log(percent);
        $('.player_bar').css({
            width:parseInt(percent*timeLine)+'px'
        })
    })

}


})()