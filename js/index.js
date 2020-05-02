$(function () {
    //鼠标移走 移进时显示隐藏
     $('.lun-picture').mouseenter(function () {
        $('.icon_l').show();
        $('.icon_r').show();
        clearInterval(timer);
        timer = null;
    });
    $('.lun-picture').on('mouseleave', function () {
        $('.icon_l').hide();
        $('.icon_r').hide();
        timer = setInterval(function() {
            //手动调用点击事件
            $('.icon_r').click();
        }, 2000);
    });
    //获取图片宽度
    var imgwidth = $('.fcous').width();
    console.log(imgwidth);
    $('.imgs_lun li').each(function(i, ele){
        // console.log(i);
        // console.log(ele);
        var li = $('<li></li>');
        li.attr('index', i);
        $('.circle').append(li);
        //设置文字属性
        $('.list1 a').eq(i).attr('index1', i);

        //获取ol li索引
        $('.circle li').eq(i).on('click', function(){
            var index = $(this).index();
            // console.log(index);
            num = index;
            circles = index;
            fonts = index;
            $('.imgs_lun').animate({
                left: -imgwidth * index,
                top: 0,
            }, 500);
            fontChange();
        });
        
        //排他思想
        $('li').on('click', function(){
            $(this).addClass('current1').siblings().removeClass();
        });
        //文字模块被点击事件
        $('.list1 li').eq(i).on('click', function () {

            var index1 = $(this).index();
            circles = index1;
            num = index1;
            fonts = index1;
            circleChange();
            $('.imgs_lun').animate({
                left: -imgwidth * index1,
                top: 0,
            }, 500);
        });

        $('.list1 li').on('click', function () {
            $(this).addClass('color_font').siblings().removeClass();
        })
      
    });
    $('.circle li').eq(0).addClass('current1');
    $('.list1 li').eq(0).addClass('color_font');
    //复制操作clone()
    var newli = $('.imgs_lun').children().eq(0).clone(true);
    $('.imgs_lun').append(newli);
    // console.log($('.imgs_lun').children().eq(0));
    var num = 0; //计算图片点击次数
    var circles = 0; //计算小圆圈的次数
    var fonts = 0;
    var flag = true;
    //右击事件
    $('.icon_r').on('click', function(){
        if (flag) {
            flag = false;
            if (num == $('.imgs_lun').children().length - 1) {
                num = 0;
                $('.imgs_lun').css('left', 0);
            }
            num++;
            $('.imgs_lun').animate({
                left: -imgwidth * num,
            }, 500, function(){
                flag = true;
            });
            circles++;
            if (circles == $('.circle').children().length) {
                circles = 0;
            }
            circleChange();

            fonts++;
            console.log($('.list1 ul').children().length)
            if (fonts == $('.list1 ul').children().length) {
                fonts = 0;
            }
            fontChange();
        }
        // console.log( $('.imgs_lun').children().length);
        
    });
    //左击事件
    $('.icon_l').on('click', function(){
        if (flag) {
            flag = false;
            if (num == 0) {
                num = $('.imgs_lun').children().length - 1;
                $('.imgs_lun').css('left', -num * imgwidth);
            }
            num--;
            $('.imgs_lun').animate({
                left: -imgwidth * num,
            }, 500, function(){
                flag = true;
            });
            circles--;
            if (circles < 0) {
                circles = $('.circle').children().length - 1;
            }
            circleChange();

            fonts--;
            if (fonts < 0) {
                fonts = $('.list1 ul').children().length - 1;
            }
            fontChange();
        }
        // console.log( $('.imgs_lun').children().length);  
    });
    function circleChange(){
        $('.circle').children().removeClass();
        $('.circle').children().eq(circles).addClass('current1');
    }
    var timer = setInterval(function(){
        $('.icon_r').click();
    }, 2000);

    function fontChange() {
        $('.list1 ul').children().removeClass();
        $('.list1 ul').children().eq(fonts).addClass('color_font');
    };
})