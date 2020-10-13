var lrc = `[00:01.06]难念的经
[00:03.95]演唱：周华健
[00:06.78]
[00:30.96]笑你我枉花光心计
[00:34.15]爱竞逐镜花那美丽
[00:36.75]怕幸运会转眼远逝
[00:39.32]为贪嗔喜恶怒着迷
[00:41.99]责你我太贪功恋势
[00:44.48]怪大地众生太美丽
[00:47.00]悔旧日太执信约誓
[00:49.66]为悲欢哀怨妒着迷
[00:52.56]啊 舍不得璀灿俗世
[00:57.66]啊 躲不开痴恋的欣慰
[01:02.86]啊 找不到色相代替
[01:08.09]啊 参一生参不透这条难题
[01:13.15]吞风吻雨葬落日未曾彷徨
[01:15.73]欺山赶海践雪径也未绝望
[01:18.23]拈花把酒偏折煞世人情狂
[01:20.90]凭这两眼与百臂或千手不能防
[01:23.76]天阔阔雪漫漫共谁同航
[01:26.09]这沙滚滚水皱皱笑着浪荡
[01:28.68]贪欢一刻偏教那女儿情长埋葬
[01:32.38]
[01:34.09]吞风吻雨葬落日未曾彷徨
[01:36.50]欺山赶海践雪径也未绝望
[01:39.07]拈花把酒偏折煞世人情狂
[01:41.69]凭这两眼与百臂或千手不能防
[01:44.68]天阔阔雪漫漫共谁同航
[01:46.93]这沙滚滚水皱皱笑着浪荡
[01:49.54]贪欢一刻偏教那女儿情长埋葬
[01:53.41]
[02:15.45]笑你我枉花光心计
[02:18.53]爱竞逐镜花那美丽
[02:21.14]怕幸运会转眼远逝
[02:23.76]为贪嗔喜恶怒着迷
[02:26.43]责你我太贪功恋势
[02:28.98]怪大地众生太美丽
[02:31.60]悔旧日太执信约誓
[02:34.26]为悲欢哀怨妒着迷
[02:36.90]啊 舍不得璀灿俗世
[02:42.04]啊 躲不开痴恋的欣慰
[02:47.34]啊 找不到色相代替
[02:52.52]啊 参一生参不透这条难题
[02:57.47]吞风吻雨葬落日未曾彷徨
[03:00.05]欺山赶海践雪径也未绝望
[03:02.64]拈花把酒偏折煞世人情狂
[03:05.27]凭这两眼与百臂或千手不能防
[03:08.22]天阔阔雪漫漫共谁同航
[03:10.49]这沙滚滚水皱皱笑着浪荡
[03:13.06]贪欢一刻偏教那女儿情长埋葬
[03:18.45]吞风吻雨葬落日未曾彷徨
[03:20.90]欺山赶海践雪径也未绝望
[03:23.54]拈花把酒偏折煞世人情狂
[03:26.21]凭这两眼与百臂或千手不能防
[03:29.07]天阔阔雪漫漫共谁同航
[03:31.32]这沙滚滚水皱皱笑着浪荡
[03:33.92]贪欢一刻偏教那女儿情长埋葬
[03:39.32]吞风吻雨葬落日未曾彷徨
[03:41.84]欺山赶海践雪径也未绝望
[03:44.38]拈花把酒偏折煞世人情狂
[03:47.04]凭这两眼与百臂或千手不能防
[03:49.99]天阔阔雪漫漫共谁同航
[03:52.20]这沙滚滚水皱皱笑着浪荡
[03:54.89]贪欢一刻偏教那女儿情长埋葬
[04:00.28]吞风吻雨葬落日未曾彷徨
[04:02.68]欺山赶海践雪径也未绝望
[04:05.25]拈花把酒偏折煞世人情狂
[04:07.90]凭这两眼与百臂或千手不能防
[04:10.85]天阔阔雪漫漫共谁同航
[04:13.08]这沙滚滚水皱皱笑着浪荡
[04:15.75]贪欢一刻偏教那女儿情长埋葬
[04:19.48]`;
var audio = document.querySelector("audio");
var ul = document.querySelector(".lrc-container ul")
var lrcArray = createLrcArray();//得到歌词对象数组
var config = {
    height: 400,
    liHeight: 35,
    revise: 0.8//修正值，音频当前事件加上该时间进行比较
}
/**
 * 得到歌词数组
 */
function createLrcArray() {
    var reg = /^(\[[\d:\.]+\])(.*)$/gm;
    var arr = [];
    while (result = reg.exec(lrc)) {
        arr.push(createLrcObject(result));
    }
    return arr;
    function createLrcObject(execResult) {
        var time = execResult[1],
            word = execResult[2];
        time = getSeconds(time);
        return {
            time,
            word
        }
    }

    function getSeconds(timeStr) {
        var parts = timeStr.replace("[", "").replace("]", "").split(":")
        var [m, s] = parts;
        return m * 60 + +s;
    }
}
/**
 * 得到当前正在播放的歌词的下标
 * @param {*} lrcArray 歌词数组
 */
function getCurrentWordIndex(lrcArray) {
    var curTime = audio.currentTime + config.revise;
    for (let i = lrcArray.length - 1; i >= 0; i--) {
        const element = lrcArray[i];
        if (curTime >= element.time) {
            return i;
        }
    }
    return -1;
}

/**
 * 根据歌词数组创建li
 */
function createLis() {
    ul.innerHTML = "";
    var fragment = document.createDocumentFragment();
    for (const item of lrcArray) {
        createLi(item);
    }
    ul.appendChild(fragment);
    function createLi(lrcObj) {
        var li = document.createElement("li");
        li.innerText = lrcObj.word;
        fragment.appendChild(li);
    }
}

function setCurrent() {
    var index = getCurrentWordIndex(lrcArray);
    //设置li样式
    var li = ul.querySelector(".active")
    li && li.classList.remove("active");
    if (index !== -1) {
        ul.children[index].classList.add("active");
    }
    //设置margin-top
    var top = 0;
    if (index >= 0) {
        //计算当前li的偏移量
        var maxOffset = config.height / 2 - config.liHeight;
        var curOffset = index * config.liHeight;
        var dis = curOffset - maxOffset;
        if (dis <= 0) {
            top = 0;
        }
        else {
            top = -dis;
        }
    }
    ul.style.marginTop = top + "px";
}

function init() {
    createLis()
    setCurrent();
}


init();

audio.ontimeupdate = function () {
    setCurrent();
}