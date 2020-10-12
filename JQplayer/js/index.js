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
        if($('.player').hasClass('play')){
            $('.player').removeClass('play')
            TweenMax.to(
                '.player_cdData',0.2,
                {
                    scale:1,
                    ease: Power0.easeNone
                }
            );
            TweenMax.to(
                '.backMask',0.2,
                {
                    top:0,
                    ease: Power0.easeNone
                }
            );
            t.pause();
            audioNode.pause();



        }else{
            $('.player').addClass('play');
            TweenMax.to(
                '.player_cdData',0.2,
                {
                    scale:1.1,
                    ease: Power0.easeNone
                }
            );
            TweenMax.to(
                '.backMask',0.2,
                {
                    top:'-50%',
                    ease: Power0.easeNone
                }
            );
            t.play();
            // audioNode.play();
            songPlay();
            changeSoneLrc();
            durationLine();

        }


    })

// 下一曲
$('.player_next').click(function(){
    if($('.player .player_cdData.active_song').is(":last-child")){
        $('.player .player_cdData.active_song').removeClass('active_song');
        $('.player .player_cdData:first-child').addClass('active_song');
    }else{
        $('.player .player_cdData.active_song').removeClass('active_song').next().addClass('active_song')

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
    audioNode.addEventListener('timeupdate',function(){
        var durationTime = this.duration//整首歌的长度；
        var current = this.currentTime;//当前的时间s为单位
        var percent  = current/durationTime;
        console.log(percent);
        $('.player_bar').css({
            width:parseInt(percent*timeLine)+'px'
        })
    })

}


})()