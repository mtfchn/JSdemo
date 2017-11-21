/**
 * Created by Administrator on 2017/9/11.
 */

//jquery插件3点：
//1. 要使用闭包，避免命名冲突
//2. 要在封装的函数中，返回this(支持链式操作)
//3. 要在函数内，遍历this中的每一个元素
//4. jQuery对象上扩展的函数，要调用$.fn.extend();


(function ($) {
    //$.fn === jQuery.prototype
    $.fn.extend({
        magnifier: function () {
            //this指向选择器取到的jQuery对象(伪数组)
            this.each(function (index, el) {
                //this指向遍历的元素（dom节点）
                var selector = this;
                $('.left', selector).mouseover(function () {
                    $('.right,.float', selector).show();
                }).mouseout(function () {
                    $('.right,.float', selector).hide();
                }).mousemove(function (evt) {
                    var x = evt.offsetX;
                    var y = evt.offsetY;

                    x = x - $('.float', selector).width() / 2;
                    y = y - $('.float', selector).height() / 2;

                    if (x < 0) {
                        x = 0;
                    }

                    if (y < 0) {
                        y = 0;
                    }

                    if (x > $(this).width() - $('.float').width()) {
                        x = $(this).width() - $('.float').width();
                    }

                    if (y > $(this).height() - $('.float').height()) {
                        y = $(this).height() - $('.float').height();
                    }

                    $('.float', selector).css({
                        left: x,
                        top: y
                    });

                    $('.right', selector).css({
                        backgroundPosition: (x * -8) + 'px ' + (y * -8) + 'px'
                    });

                })
            });

            return this;
        }
    })
})(jQuery);
