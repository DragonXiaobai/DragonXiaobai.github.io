function animate(obj, target, callback) {
    //避免点击或其它绑定事件重复开启定时器，可先关闭定时器
    clearInterval(obj.timer);
    //obj.timer可以让传进来的参数表现唯一性
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15)
}