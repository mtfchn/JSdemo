var bird = document.querySelector('.bird');
var all = document.querySelector('.all');
var speed = 0;//初始速度

function birdFall() {
    bird.style.top = bird.offsetTop + speed + 'px';
    speed += 2;//加速度
    if(speed < 0){
        bird.style.transform = 'rotate(-30deg)';
    }else if(speed > 0){
        bird.style.transform = 'rotate(30deg)';
    }else {
        bird.style.transform = 'rotate(0deg)';
    }//鸟角度变化
    if (bird.offsetTop < 0) {
        speed = 2;
    }
    if (speed >= 12) {
        speed = 12;//最大下落速度
    }

}





