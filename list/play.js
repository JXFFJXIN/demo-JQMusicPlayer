(function(){
    var songs = [
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
        {name:"歌曲A",author:"歌手A",url:"./mp3/1.mp3"},
        {name:"歌曲B",author:"歌手B",url:"./mp3/2.mp3"},
        {name:"歌曲C",author:"歌手C",url:"./mp3/3.mp3"},
    ];
    var listDom = document.querySelector(".music .list");
    var titleDom = document.querySelector(".title span");
    var audDom = document.querySelector("audio");
    var playIndex = 0;//播放的歌曲对的数组下标，-1表示不播放任何歌曲
    //初始化歌曲列表
    function initSongList(){
        for(var i = 0 ; i < songs.length ; i ++ ){
            var li = document.createElement("li");
            var s = songs[i];//获取当前歌曲
            li.innerHTML = `
                <span class="pause iconfont">&#xe606;</span>
                <span class="play iconfont">&#xe638;</span>
                <span class="name">${s.name} - ${s.author}</span>
                <span class="close iconfont">&#xe614;</span>
            `
            listDom.appendChild(li);
        }
        // 由于执行文件顺序不同，初始化时候li长度为0，所以不会出现滚动条
        // 解决方法，
        // 1. 调整文件顺序
        // 2. 将初始方法通过闭包返回，在需要使用的时候进行调用。
        barHelper.init();
    }

    // 根据playIndex，播放一首歌
    function play(){
        var beforeDom = listDom.querySelector(".playing");
        if(beforeDom){
            // 去掉之前li的playing样式
            beforeDom.classList.remove("playing");
        }
        // 暂停播放
        if(playIndex === -1 ){
            audDom.src = "";//清空src
            titleDom.innerHTML = "";//清空标题
            return;
        }
        var s = songs[playIndex];//拿到歌曲对象
        audDom.src = s.url;//将歌曲的文件链接传递给audDom
        titleDom.innerHTML = `${s.name} - ${s.author}`;//设置标题
        // 播放方式
        audDom.play();//play方法进行播放
        // 为对应的子元素添加playing类
        listDom.children[playIndex].classList.add("playing");
    }

    initSongList();

    // 事件注册
    listDom.onclick = function(e){
        console.log(e.target);
        if(e.target.className==="play iconfont"){
            // 切换歌曲
            // 得到元素在父元素中的下标
            // 将类数组转换为真数组
            // 注意事件冒泡和事件捕获
            var children = Array.from(listDom.children);
            playIndex = children.indexOf(e.target.parentElement);
            console.log("playIndex")
            play();
        }else if (e.target.className === "close iconfont"){
            //移除歌曲
            var children = Array.from(listDom.children);
            var index = children.indexOf(e.target.parentElement);
            console.log("index")
            songs.splice(index,1);//歌曲数组中移除
            e.target.parentElement.remove();//元素移除
            if(index === playIndex){
                playIndex = -1;
                play();
            }
            barHelper.init();
        }
    }

    // 播放进度改变事件
    audDom.ontimeupdate = function(){
        // audDom.currentTime:当前播放时间
        // audDom.duration:总时间
        if(audDom.currentTime >= audDom.duration){
            // 播放结束
            playIndex ++;
            if(playIndex > songs.length - 1){
                playIndex = 0;
            }
            play();
        }
    }
    play();
})()