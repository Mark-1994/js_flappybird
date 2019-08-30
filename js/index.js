var game = document.getElementById('game');
var birdEle = document.getElementById('bird');

// 初始化背景图
var sky = {
    x: 0 // 背景图横向移动距离
}

// 初始化bird
var bird = {
    speedX: 5, // 像素鸟的横坐标
    speedY: 0, // 像素鸟的纵坐标
    x: birdEle.offsetLeft, // 像素鸟距离当前父元素左边的距离
    y: birdEle.offsetTop // 像素鸟距离当前父元素顶部的距离
}

// 游戏状态
var running = false; // 默认打开网页游戏暂停
setInterval(function() {
    if (running) {
        // 移动背景 像素鸟水平运动
        sky.x -= 5;
        game.style.backgroundPositionX = sky.x + 'px';
        // 增加像素鸟距离父元素的top值 实现小鸟向下运动
        bird.speedY += 1;
        bird.y += bird.speedY;
        // 当像素鸟触碰到上下边界 游戏结束
        if (bird.y < 0) {
            running = false;
            bird.y = 0;
        } else if (bird.y + birdEle.offsetHeight > 600) {
            running = false;
            bird.y = 600 - birdEle.offsetHeight;
        }
        // 给像素鸟top样式赋值
        birdEle.style.top = bird.y + 'px';
        // 判断游戏是否结束
        if (!running) {
            alert('游戏结束');
            window.location.reload();
        }
    }
}, 30);

// 点击文档的时候像素鸟向上运动
document.onclick = function() {
    if (running) {
        bird.speedY = -10; // 每点击一次 减小像素鸟 10px top值
    }
}

var num = 0; // 统计得分
var pSpan = document.getElementsByTagName('span')[0];
// 创建管道
function createPipe(position) {
    var pipe = {
        x: position, // 管道的横坐标值
        uHeigt: 200 + parseInt(Math.random() * 100) // 上边管道的高度
    };
    pipe.dHeight = game.offsetHeight - pipe.uHeigt - 200; // 下边管道的高度

    var uPipe = document.createElement('div'); // 创建上边管道元素节点
    uPipe.style.width = '52px';
    uPipe.style.height = pipe.uHeigt + 'px';
    uPipe.style.background = 'url("./images/pipe2.png") no-repeat center bottom';
    uPipe.style.position = 'absolute';
    uPipe.style.left = pipe.x + 'px';
    game.appendChild(uPipe); // 管道元素追加到节点中

    var dPipe = document.createElement('div'); // 创建下边管道元素节点
    dPipe.style.width = '52px';
    dPipe.style.height = pipe.dHeight + 'px';
    dPipe.style.background = 'url("./images/pipe1.png") no-repeat center top';
    dPipe.style.position = 'absolute';
    dPipe.style.bottom = '0';
    dPipe.style.left = pipe.x + 'px';
    game.appendChild(dPipe);

    // 管道运动起来
    var uCheck; // 判断像素鸟是否触碰到上边管道的条件
    var dCheck; // 判断像素鸟是否触碰到下边管道的条件

    setInterval(function() {
        if (running) {
            pipe.x -= 2;
            uPipe.style.left = pipe.x + 'px';
            dPipe.style.left = pipe.x + 'px';
            // 如果管道往左超出父元素25px 重新设置管道横坐标的值 得分加1
            if (pipe.x < -52) {
                pipe.x = game.offsetWidth;
                num += 1;
                pSpan.innerText = num;
            }
            uCheck = bird.x + birdEle.offsetWidth > pipe.x && bird.x < pipe.x + 52 && bird.y < pipe.uHeigt;
            dCheck = bird.x + birdEle.offsetWidth > pipe.x && bird.x < pipe.x + 52 && bird.y + birdEle.offsetHeight > pipe.uHeigt + 200;
            // 如果像素鸟触碰到管道 游戏结束
            if (uCheck || dCheck) {
                running = false;
                alert('游戏结束');
                window.location.reload();
            }
        }
    }, 30);
}

createPipe(400);
createPipe(600);
createPipe(800);
createPipe(1000);

// 像素鸟飞行动作
var flag = 1;
setInterval(function() {
    if (running) {
        if (flag == 0) {
            birdEle.style.background = 'url("./images/birds.png") -8px -10px no-repeat';
            flag = 1;
        } else if (flag == 1) {
            birdEle.style.background = 'url("./images/birds.png") -60px -10px no-repeat';
            flag = 2;
        } else if (flag == 2) {
            birdEle.style.background = 'url("./images/birds.png") -113px -10px no-repeat';
            flag = 0;
        }

    }
}, 100)

// 空格开始或暂停游戏
document.addEventListener('keyup', function(event) {
    if (event.keyCode == 32) {
        running = running == true ? false : true;
    }
});