// 实现滚动条功能

var barHelper = (function(){
    var listDom = document.querySelector(".music .list");//ul列表
    var barDom = document.querySelector(".music .scroll-bar")//滚动条
    // 列表的可见高度
    var listClientHeight = listDom.clientHeight;
    /* 
    设置滚动内条的高度 
    */
    function setBarHeight(){
        var scrollHeight = listDom.scrollHeight;
        // var h = ul可见的高度/ul所有内容的高度 * ul可见的高度
        var h = listClientHeight / scrollHeight * listClientHeight;
        if(h>=listClientHeight){
            h = 0;
        }
        barDom.style.height = h + 'px';
    }
    /*
    设置滚动内条的位置
    */
    function setBarTop(){
        var top = listDom.scrollTop/listDom.scrollHeight * listClientHeight;
        barDom.style.top = top + "px";
    }
    /*
    初始化
    */
    function init(){
        setBarHeight();
        setBarTop();
    }
    init();

    /*
    设置列表的scrollTop
    更新scrollTop
    */
   var timer = null;
   function setListScrollTop(newScrollTop){
       clearInterval(timer);//避免重复调用函数，停止之前的移动
       //使用动画实现滚动
       //例如：scrollTop 100 -> 300
        var spd = 0.5;//速度：1毫秒变化的距离
        var dis = newScrollTop - listDom.scrollTop;//距离：新的scrollTop减去旧的scrollTop
        var tick = 10;//频率：多少毫秒移动一次
        var duration = Math.abs(dis/spd);//计算移动的总时间
        var times = Math.ceil(duration/tick);//总共移动多少次
        var curTimes = 0;//当前移动了多少次
        var everyDis = dis/times;//每次移动的距离
        timer = setInterval(function(){
            curTimes++;
            listDom.scrollTop+=everyDis;
            setBarTop();//更新bar的定位
            if(curTimes === times){
                clearInterval(timer);
            }
        },tick);
   }
   /*
   根据滚动内条的位置，直接设置（没有动画）列表的滚动高度
   */
   function setListScrollTopFromBarTop(top){
        var sh = top / listClientHeight * listDom.scrollHeight;
        listDom.scrollTop = sh;
   }

    /*
    鼠标滚轮事件onmousewheel
    利用e.deltaY数值获取新的scrollTop
    */
   listDom.onmousewheel = function(e){
       //e.deltaY表示理论上，scrollTop应该改变的数值
        setListScrollTop(listDom.scrollTop + e.deltaY);
   }

   /*
   拖动事件onmousedown,onmousemove,onmouseup
   记录e.pageY_表示整个网页的Y坐标,跟新ListScrollTop
   */
   barDom.onmousedown = function(e){
       var y = e.pageY;//相对于网页的y坐标
       var top = parseFloat(getComputedStyle(this).top);//按下时的top值
       var h = barDom.clientHeight;//滚动条自身的高度
       window.onmousemove = function(e){
           var newY = e.pageY;
           var newTop = top + (newY - y);
            if(newTop<0){
                newTop = 0;
            }else if(newTop > listClientHeight - h){
                newTop = listClientHeight - h;
            }
           barDom.style.top = newTop + "px";//更新滚动条的top值
           setListScrollTopFromBarTop(newTop);//更新ul列表的top值
       }
       window.onmouseup = function(){
          window.onmousemove = null 
       }
   }
   return {
       setBarHeight,
       init,
       setBarTop,
       setListScrollTop,
   }
})()