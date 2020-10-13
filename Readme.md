# 播放器主体
## 播放器结构
div.player
|———div.player_nav<!--面板部分 -->
|   |———div.player_CD<!--CD里的数据 -->
|   |   |———div.player_cdData active_song
|   |   |———div.player_cdData
|   |———div.player_control<!--控制部分 -->
|   |   |———div.player_prev<!--上一首按钮 -->
|   |   |   |———svg.icon
|   |   |———div.player_play<!--播放暂停按钮 -->
|   |   |   |———svg.icon
|   |   |———div.player_next<!--下一首按钮 -->
|   |   |   |———svg.icon
|———div.backMask<!--背景部分 -->
|   |———p.songName<!--歌名 -->
|   |———p.singer<!--歌手 -->
|———div.player_timeLine<!--进度条 -->
|   |———div.player_bar
## 歌曲列表
1. 后台传入数据
2. dom存数据，将数据引入字符串内
```html
<div class="player_cdData active_song" style="background-image: url(img/a1.png)" data-song = 'yourName' data-origin = './mp3/1.mp3' data-singer = 'deng'></div>
```
## 播放器样式
1. 居中
```css
.player{
    /* 居中 */
    position: absolute;
    /* 1.脱离文档流 */
    left: 50%;
    top: 50%;
    /* 2.控制位置 */
    transform: translate(-50%,-50%);
    /* 3.移动自身百分之五十 */
}
```
2. background属性设置
```css
.player .player_nav .player_CD .player_cdData{
    display: none;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* background属性 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```
3. box-shadow属性
```css
.player.play .player_nav .player_CD::before{
    /* CD的阴影 */
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    /* box-shdow属性 */
    /* 水平偏移量 垂直偏移量 深度 阴影范围 颜色 */
    box-shadow: 0px 30px 28px -10px rgba(0, 0, 0, 0.3);
}
```
4. svg标签
```html
<svg class="icon play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
    <path d="M51.109 30.335l-36-24A2 2 0 0 0 12 8v48a2.003 2.003 0 0 0 2 2c.388 0 .775-.113 1.109-.336l36-24a2 2 0 0 0 0-3.329z"></path>
</svg>
<svg class="icon pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path d="M22.537 8.046h17.791c1.104 0 2.003.898 2.003 1.993v79.912a2.005 2.005 0 0 1-2.003 2.003h-17.79a2.005 2.005 0 0 1-2.003-2.003V10.04c0-1.095.898-1.993 2.002-1.993zM59.672 8.046h17.8c1.095 0 1.993.898 1.993 1.993v79.912a2.003 2.003 0 0 1-1.993 2.003h-17.8a1.997 1.997 0 0 1-1.993-2.003V10.04c0-1.095.889-1.993 1.993-1.993z"></path>
</svg>
```
* 通过fill改变svg背景颜色
5. flex属性
* 需要变成一排的元素的共同父元素添加display：flex即可
* flex相关属性
```css
.player .player_nav .player_control{
    display: flex;
    align-items: center;
    /* 居中对象各项div元素 */
    justify-content: space-around;
    /* 平均分布的时候留空白 */
}
```
6. em，rem单位
7. cursor属性
```css
.icon{
    width: 2em;
    height: 2em;
    font-size: 30px;
    fill: #d7dce2;
    /* cursor属性 */
    cursor: pointer;
}
```
8. transform属性
9. transition补间动画
```css
.player .player_nav .player_control>div{
    width: 80px;
    height: 80px;
    border-radius: 15px;
    display: flex;
    /* background: #323232; */
    justify-content: space-around;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
```
## 播放器行为
1. 获取dom上对的MP3路劲，让其可以进行播放
```js
var audioNode = document.createElement('audio');//创建audio标签
audioNode.setAttribute('src',$('.active_song').attr('data-origin'));//设置audio标签的src属性
// 使用
audioNode.pause();//暂停
audioNode.play();//播放
// 歌曲加载播放函数
function songPlay(){
    audioNode.setAttribute('src',$('.active_song').attr('data-origin'));
    audioNode.play();
}
```
2. 点击播放/暂停 切换按钮
```js
$('.player_play').click(function(){
        // $('.player').addClass('play');
        if($('.player').hasClass('play')){// 判断.player上是否拥有play属性
            // 有的话就去除play
            $('.player').removeClass('play')
            // 设置暂停状态
            ...
        }else{
            // 否则就添加play属性
            $('.player').addClass('play');
            // 设置播放状态
            ...
        }
    })
```
3. 动画效果 cd旋转+背景上下升降
```js
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
```
4. 上下曲 随时切换
```js
// 下一首
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
// 上一首，同上
```
5. 进度条
### TweenMax动画库
> TweenMax 原flash制作团队转向JS+H5的JS库，特点：轻量+效率高+模块使用+独立性强+灵活
```js
var t = new TimelineMax();
// 参数1-让谁动
// 参数2-时间
// 参数3-提前进入
t.to('.player_cdData',3,{
    rotation:"360deg",//旋转
    ease: Power0.easeNone,//动画效果曲线
    repeat:-1//是否重复
},
"-=0.2s"//提前重复
);
t.pause();//暂停
```
# 歌词滚动
# 日食音量