import backgroudImage from './background.png'
import hero1 from './hero1.png'
import enemy1 from './enemy1.png'
import enemy1_down1 from './enemy1_down1.png'
import enemy1_down2 from './enemy1_down2.png'
import enemy1_down3 from './enemy1_down3.png'
import enemy1_down4 from './enemy1_down4.png'
import bullet1 from './bullet1.png'


export default function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        _backgroudImage = new Image(),
        _hero1 = new Image(),
        _bullet1 = new Image(),
        _enemy1 = new Image(),
        _enemy1_down1 = new Image(),
        _enemy1_down2 = new Image(),
        _enemy1_down3 = new Image(),
        _enemy1_down4 = new Image(),
        shoot = true,
        gameflag = true,
        enemyCount = 20,
        heroPos = {
            x: 215,
            y: 726,
            w: 51,
            h: 63
        },
        bulletList = [],
        enemyDataList = [{
            name: 'enemy1',
            w: 51,
            h: 43,
            live: _enemy1,
            down: [_enemy1_down1, _enemy1_down2, _enemy1_down3, _enemy1_down4],
            downSize: {
                w: 51,
                h: 57
            }
        }],
        enemyList = [],
        interval



    function drawBackground() {
        context.drawImage(_backgroudImage, 0, 0, 480, 852, 0, 0, 480, 850)
    }

    function drawPlane() {
        context.drawImage(_hero1, 0, 0, 102, 126, heroPos.x, heroPos.y, heroPos.w, heroPos.h)
    }

    function drawEnemy() {
        enemyList.map((item, index) => {
            if (!item) {
                return;
            }
            if(item.islive===0){
                var timestamp = Date.parse( new Date())
                // console.log(timestamp)
                var delayTimetamp = Math.abs(timestamp-item.timestamp)
                // console.log(delayTimetamp)
                if(delayTimetamp>150&&delayTimetamp<300){
                    item.live = item.down[1]
                }else if(delayTimetamp>300&&delayTimetamp<600){
                    item.live = item.down[2]
                }else if(delayTimetamp>600&&delayTimetamp<750){
                    item.live = item.down[3]
                }else if(delayTimetamp>750){
                    item.islive = -1
                }
            }
            context.drawImage(item.live, 0, 0, item.w, item.h, item.x, item.y, item.w, item.h)
        })

    }

    function drawBullet() {
        bulletList.map(item => {
            if (!item) {
                return
            }
            context.drawImage(_bullet1, 0, 0, 5, 11, item.x, item.y, item.w, item.h)
        })

    }

    function loadImage() {
        _backgroudImage.src = backgroudImage;
        _hero1.src = hero1;
        _bullet1.src = bullet1;
        _enemy1.src = enemy1;
        _enemy1_down1.src = enemy1_down1
        _enemy1_down2.src = enemy1_down2
        _enemy1_down3.src = enemy1_down3
        _enemy1_down4.src = enemy1_down4
    }

    _backgroudImage.onload = function () {
        drawBackground()
    }
    _hero1.onload = function () {
        start()
    }

    function moveToRight() {
        if (heroPos.x + heroPos.w < 472) {
            heroPos.x += 12
        }
    }

    function moveToLeft() {
        if (heroPos.x >= 6) {
            heroPos.x -= 12
        }
    }

    function gameRS() {
        gameflag = !gameflag
    }

    function createEnemy() {
        if (enemyList.length >= enemyCount) {
            return
        }
        var enemy = {
            name: 'enemy1',
            w: 51,
            h: 43,
            live: _enemy1,
            down: [_enemy1_down1, _enemy1_down2, _enemy1_down3, _enemy1_down4],
            downSize: {
                w: 51,
                h: 57
            }
        };
        var x = ~~(Math.random() * 480 + 1);
        if (x > 429) {
            x = 429;
        }
        enemy.x = x;
        enemy.y = 0;
        enemy.islive = 1;
        enemyList.push(enemy)
    }

    function destoryEnemy(index) {
        enemyList[index].islive = 0;
        enemyList[index].live = enemyList[index].down[0]
        enemyList[index].timestamp = Date.parse( new Date())
        console.log( enemyList[index].timestamp)
    }

    function createBullet() {
        if (shoot) {
            shoot = false;
            var bulletPos = {
                x: heroPos.x + heroPos.w / 2,
                y: heroPos.y - 20,
                w: 5,
                h: 11,
                islive:1
            }
            bulletList.push(bulletPos)
            setTimeout(function () {
                shoot = true
            }, 600)
        }
    }

    function destoryBullet(index) {
        // bulletList[index] = null;
        bulletList[index].islive = 0
    }

    window.onkeydown = function (e) {
        if (e.keyCode == 39) {
            moveToRight()
        } else if (e.keyCode == 37) {
            moveToLeft()
        } else if (e.keyCode == 32) {
            createBullet()
        } else if (e.keyCode == 83) {
            gameRS()
        }
    }

    loadImage()

    function collisionDetection(a, b) {
        if (!a || !b) {
            return false
        }
        if (((a.x >= b.x && a.x <= b.x + b.w) ||
                (a.x + a.w >= b.x && a.x + a.w <= b.x + b.w)) &&
            ((a.y >= b.y && a.y + a.h <= b.y + b.h) ||
                (a.y + a.h >= b.y && a.y + a.h <= b.y + b.h))) {
            return true
        } else if (((b.x >= a.x && b.x <= a.x + a.w) ||
                (b.x + b.w >= a.x && b.x + b.w <= a.x + a.w)) &&
            ((b.y >= a.y && b.y + b.h <= a.y + a.h) ||
                (b.y + b.h >= a.y && b.y + b.h <= a.y + a.h))) {
            return true
        } else {
            return false
        }
    }

    function gameTest() {
        for (var i = 0; i < enemyList.length; i++) {
            if (enemyList[i] && enemyList[i].islive) {

                if (collisionDetection(enemyList[i], heroPos)) {
                    gameflag = false
                    console.log('游戏结束')
                }
                for (var j = 0; j < bulletList.length; j++) {
                    if (collisionDetection(bulletList[j], enemyList[i])) {
                        console.log('击中敌机')
                        destoryBullet(j)
                        destoryEnemy(i)
                    }
                }
            }
        }
    }

    function clearEnemy() {
        var _enemyList = []
        enemyList.map((item, index) => {
            if (!item) {
                return
            }
            if (item.y < 850 && item.islive!==-1) {
                _enemyList.push(item)
            }
        })
        enemyList = _enemyList;
    }

    function clearBullet() {
        var _bulletList = []
        bulletList.map((item, index) => {
            if (!item) {
                return
            }
            if (item.y > 0 && item.islive==1) {
                _bulletList.push(item)
            }
        })
        bulletList = _bulletList
    }

    function start() {
        context.clearRect(0, 0, 480, 850);
        drawBackground();
        drawPlane();
        drawBullet();
        drawEnemy();
        if (gameflag) {
            clearEnemy()
            clearBullet()
            gameTest()
            requestAnimationFrame(start)
        }

    }
    createEnemy();
    var enemyInterval = setInterval(function () {
        createEnemy();
    }, 1000)
    createBullet();

    interval = setInterval(() => {
        enemyList.map((item, index) => {
            if (!item) {
                return
            }
            if (item.y < 850 && item.islive) {
                item.y += 3
            }
        })
        bulletList.map((item, index) => {
            if (!item) {
                return
            }
            if (item.y > -10) {
                item.y -= 3
            }
        })
    }, 30)
}