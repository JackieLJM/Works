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