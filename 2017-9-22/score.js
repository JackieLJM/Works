var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.insertBefore(canvas, document.body.firstChild);

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
var i = 0,
    arr = [],
    sum = 0;
var sumIn = document.getElementById('sum');
var infoTitle = document.getElementById('infoTitle');
var menu = document.getElementById('menu');

infoTitle.style.display='none';
menu.style.display='none';
document.getElementById('scoreBoard').onclick = function(event) {
    arr[i] = event.target.textContent;


    if (arr[i] === '全零') {
        sum = 0;
        arr[i] = 0;
        // sumIn.value=arr[i];
        // sum = sum + arr[i];
    } else if (typeof Number(arr[i]) !== NaN) {
        arr[i] = parseFloat(arr[i]);
        // sumIn.value=arr[i];
        // sum = sum + arr[i];
    } else if (arr[i] === '·') {
        arr[i]=0;
    }
    sumIn.value = arr[i];
    i++;
}

document.getElementById('information').onclick = function(event) {
	event.preventDefault();
    infoTitle.style.display === 'none' ? infoTitle.style.display = 'inline-block' : infoTitle.style.display = 'none';
    menu.style.display='none';
}

document.getElementById('more').onclick = function(event) {
	event.preventDefault();
    menu.style.display === 'none' ? menu.style.display = 'inline-block' : menu.style.display = 'none';
    infoTitle.style.display='none';
}