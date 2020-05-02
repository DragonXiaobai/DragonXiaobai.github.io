window.addEventListener('load', function () {
    //获得元素
    var lun_picture = document.querySelector('.lun-picture');
    var focus = document.querySelector('.fcous');
    var circle = document.querySelector('.circle');
    var icon_l = document.querySelector('.icon_l');
    var icon_r = document.querySelector('.icon_r');
    var imgs_lun = document.querySelector('.imgs_lun');
    var current = document.querySelector('.current1');
    var list = document.querySelector('.list1').querySelectorAll('li');
    var as = document.querySelector('.list1').querySelectorAll('a');
    //鼠标移进显示，移走则隐藏
    lun_picture.addEventListener('mouseover', function () {
        icon_l.style.display = "block";
        icon_r.style.display = "block";
        clearInterval(timer);
        timer = null;
    })
    lun_picture.addEventListener('mouseout', function () {
        icon_l.style.display = "none";
        icon_r.style.display = "none";
        timer = setInterval(function() {
            //手动调用点击事件
            icon_r.click();
        }, 2000);
    })
    //动态获得ol下的小li
    /*console.log(ul.children.length)*/
    for (var i = 0; i < imgs_lun.children.length; i++) {
        var li = document.createElement('li');
        //给小li赋属性，目的是让图片与圆点绑定起来
        li.setAttribute('index', i);
        circle.appendChild(li);
        //设置文字a标签的属性
        as[i].setAttribute('index1', i);

        //获得图片的宽度
        var imgwidth = focus.offsetWidth;

        //排他思想，让ol下的小li点击时背景改变
        li.addEventListener('click', function () {
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            this.className = 'current1';
            /*console.log(imgwidth);*/
            //得到绑定小li 的属性值,这里不能用li代替this，因为li代表的是全部li，而this代表当前被点击的li
            var index = this.getAttribute('index');
            //同步点击小li时再点击箭头的时间缝隙
            num = index;
            circles = index;
            fonts = index;
            fontChange();
            animate(imgs_lun, - imgwidth * index);
        });

        as[i].addEventListener('click', function () {
            for (var i = 0; i < as.length; i++) {
                as[i].className = '';
            }
            this.className = 'color_font';
            var index1 = this.getAttribute('index1');
            //重新赋值，同步更新点击的时间缝隙
            circles = index1;
            num = index1;
            fonts = index1;
            circleChange();
            animate(imgs_lun, - imgwidth * index1);
        })

    }
    var newli = imgs_lun.children[0].cloneNode(true);
    imgs_lun.appendChild(newli);
    circle.children[0].className = 'current1';
    as[0].className = "color_font";
    var num = 0; //计算图片点击次数
    var circles = 0; //计算小圆圈的次数
    var fonts = 0;
    var flag = true; //气流阀 优化程序（锦上添花）
    //右边
    icon_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == imgs_lun.children.length - 1) {
                num = 0;
            imgs_lun.style.left = 0;
            }
            num++;
            animate(imgs_lun, -imgwidth * num, function () {
                flag = true;
            });
            circles++; //与num同步
            if (circles == circle.children.length) {
                circles = 0;
            }
            circleChange();

            fonts++;
            if (fonts == list.length) {
                fonts = 0;
            }
            fontChange();
        }

    })
    //左边
    icon_l.addEventListener('click', function () {
       if (flag) {
           flag = false;
           if (num == 0) {
               num = imgs_lun.children.length - 1;
               imgs_lun.style.left = -num * imgwidth + 'px';
           }
           num--;
           animate(imgs_lun, -imgwidth * num, function () {
               flag = true;
           });
           circles--; //与num同步
           if (circles < 0) {
               circles = circle.children.length - 1;
           }
           circleChange();

           fonts--;
           if (fonts < 0) {
               fonts = list.length - 1;
           }
           fontChange();
       }
    })
    function circleChange() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[circles].className = 'current1';
    }
    var timer = setInterval(function() {
        //手动调用点击事件
        icon_r.click();
    }, 2000);

    //绑定文字

    console.log(list[0].innerHTML);
    console.log(as[0]);

    function fontChange() {
        for (var i = 0; i < as.length; i++) {
            as[i].className = '';
        }
        as[fonts].className = 'color_font';
    };

})