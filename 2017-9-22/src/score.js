// 为canvas设置初始宽高和样式
// var canvas = document.createElement('canvas');
// var ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// canvas.id = 'canvas';
// document.body.insertBefore(canvas, document.body.firstChild);

// 输入行列数创建等同行列数打分板
// var div=document.createElement('div');
// div.id='scoreBoard';
// div.width=window.innerWidth;
// div.height=window.innerHeight;
// document.body.insertBefore(div, document.body.lastChild);
// function createScoreBoard(col, row) {
//     var ul = document.createElement('ul')
//     var li = document.createElement('li');
//     var scoreBoard = document.getElementById('scoreBoard');
//     for (var i = 0; i < col; i++) {
//         for (var j = 0; j < row; j++) {
//             ul.appendChild(li);
//         }
//         scoreBoard.insertBefore(ul, scoreBoard.lastChild);
//     }
// }
// createScoreBoard(3, 3);


// 用js初始化样式属性
var i = 0,
    arr = [];
var sumText = document.getElementById('sum'),
    infoTitle = document.getElementById('infoTitle'),
    menu = document.getElementById('menu'),
    scoreBoard = document.getElementById('scoreBoard'),
    scoreli = document.getElementById('scoreBoard').children,
    information = document.getElementById('information'),
    more = document.getElementById('more'),
    bigButton = document.getElementById('bigButton'),
    ui = document.getElementById('ui'),
    background = document.getElementById('background'),
    enter = document.getElementById('enter');
infoTitle.style.display = 'none';
menu.style.display = 'none';
for (var j = 0; j < scoreli.length; j++) {
    scoreli[j].setAttribute('class', 'small');
}

// id值为background的对象为背景层，保持背景层与窗口大小一致，监听窗口变化改变字体大小，从而响应式改变组件大小
(function(doc, win, back) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth,
                clientHeight = docEl.clientHeight;
            if (!clientWidth) return;
            // 规则一窗口宽度大于414，高度小于444
            if (clientWidth > 414) {
                docEl.style.fontSize = 20 + 'px';
                document.querySelector('input[name=img]').style.backgroundSize = '60px';
                if (clientHeight <= 444) {
                    docEl.style.fontSize = 20 * (clientHeight / 500) + 'px';
                    document.querySelector('input[name=img]').style.backgroundSize = 60 * (clientHeight / 375) + 'px';
                }
            }
            // 规则二窗口小于414，高度小于444
            else if (clientWidth <= 414) {
                docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
                document.querySelector('input[name=img]').style.backgroundSize = 60 * (clientWidth / 375) + 'px';
                if (clientHeight <= 444) {
                    docEl.style.fontSize = 20 * (clientHeight / 500) + 'px';
                    document.querySelector('input[name=img]').style.backgroundSize = 60 * (clientHeight / 375) + 'px';
                }
            }


            // 屏幕空白区域被点中决定是否显示前面板,该功能于屏幕宽度小于414启用,屏幕宽度小于414加载自动隐藏前面板
            var i=0;
            if (clientWidth <= 414) {
                ui.style.display = 'none';
                var listener=function() {
                    ui.style.display === 'none' ? ui.style.display = 'block' : ui.style.display = 'none';                    
                    i++;
                    // console.log(i);
                }
                back.addEventListener('click', listener, false); 
                var listenerUI=function(){
                    ui.style.display = 'none';
                    infoTitle.style.display = 'none';
                    menu.style.display = 'none';
                    sumText.value = 0;
                    i++;
                    // console.log(i);
                }
                ui.addEventListener('click',listenerUI,false);

            } else if(clientWidth>414){
                ui.style.display = "block";
                
                // back.removeEventListener('click',listener,false);
                // ui.removeEventListener('click', listenerUI,false);
                // var listenerUI=function(){
                    // ui.style.display = 'none';
                    // infoTitle.style.display = 'none';
                    // menu.style.display = 'none';
                    // sumText.value = 0;
                // }
                // ui.addEventListener('click',listenerUI,false);
                // console.log("obj");
            }
            console.log(screen.orientation.type,'screen.orientation.angle');
        };
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    // 监听窗口事件动态改变背景图层大小，因为边框设置为1px，所以在这里减2
    win.addEventListener(resizeEvt, function() {
        back.width = docEl.clientWidth - 2;
        back.height = docEl.clientHeight - 2;
    }, false);
    doc.addEventListener('DOMContentLoaded', function() {
        back.width = docEl.clientWidth - 2;
        back.height = docEl.clientHeight - 2;
    }, false);
})(document, window, background);


// 为各个元素添加事件监听和停止冒泡
enter.onclick = function(event) {
    event.stopPropagation();
}
infoTitle.onclick = function(event) {
    event.stopPropagation();
}
menu.onclick = function(event) {
    event.stopPropagation();
}




//———— 此部分打分板处理逻辑未处理完善 ———— //
sumText.onchange = function(event) {
    if (typeof event.target.value === 'string') {
        sumText.value = 'X'
    }
}
scoreBoard.onclick = function(event) {
    event.stopPropagation();
    arr[i] = event.target.textContent;
    if (arr[i] === '全零') {
        arr[i] = 0;
    } else if (arr[i] === '·') {
        arr[i] = 0;
    } else if (typeof Number(arr[i]) !== NaN) {
        arr[i] = parseFloat(arr[i]);
    }
    sumText.value = arr[i];
    i++;
}
// ————此部分打分板处理逻辑未处理完善———— //




information.onclick = function(event) {
    event.stopPropagation();
    infoTitle.style.display === 'none' ? infoTitle.style.display = 'inline-block' : infoTitle.style.display = 'none';
    menu.style.display = 'none';
}
more.onclick = function(event) {
    event.stopPropagation();
    menu.style.display === 'none' ? menu.style.display = 'inline-block' : menu.style.display = 'none';
    infoTitle.style.display = 'none';
}
bigButton.onclick = function(event) {
    event.stopPropagation();
    bigButton.checked ? changBigButton() : cancelBigButton();
}
var changBigButton = function() {
    for (var k = 0; k < scoreli.length; k++) {
        scoreli[k].setAttribute('class', 'big');
    }
}
var cancelBigButton = function() {
    for (var k = 0; k < scoreli.length; k++) {
        scoreli[k].setAttribute('class', 'small');
    }
}