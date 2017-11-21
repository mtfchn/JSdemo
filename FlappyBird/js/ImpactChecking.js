function check_box_collision(box1, box2) {
    var center1 = {
        x: box1.offsetLeft + box1.offsetWidth / 2,
        y: box1.offsetTop + box1.offsetHeight / 2
    };
    var center2 = {
        x: box2.offsetLeft + box2.offsetWidth / 2,
        y: box2.offsetTop + box2.offsetHeight / 2
    };
    var distX = Math.abs(center1.x - center2.x);
    var distY = Math.abs(center1.y - center2.y);
    if (distX < (box1.offsetWidth + box2.offsetWidth) / 2 &&
        distY < (box1.offsetHeight + box2.offsetHeight) / 2) {
        return true;
    }
    return false;
}






