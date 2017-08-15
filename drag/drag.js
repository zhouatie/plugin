/**
 * Created by star-x on 2017/8/15.
 */
// 拖拽

/*
* 说明：本插件基于jquery
* 1.传参
*       pElem 父元素的className   如 ".option"
*       cElem 子元素(要拖拽的元素)的className 如 ".option-list"
*       style 被点击拖动的元素的样式
* */

jQuery.extend({
    KF_drag:function(pElem,cElem,style){
        
        if($(pElem).css('position') == 'static') $(pElem).css("position",'relative');
        
        $(pElem).on("mousedown",cElem,function(e){
            var obj = $(this).clone(true),
                onOff = false,
                cache = $(this),
                HEIGHT = $(this).outerHeight(),
                WIDTH = $(this).outerWidth(),
                MARGIN = $(this).css('margin'),
                XXX = e.pageX - $(this).offset().left,
                YYY = e.pageY - $(this).offset().top;
            
            obj.css({'position':"absolute",top:$(this).position().top,"left":$(this).position().left});
            
            $(this).parent().css("position","relative");
            
            $(this).replaceWith("<div id='drag-plugin-move-div' style='border:2px dotted #1F8CEB' />");
            
            $("#drag-plugin-move-div").css({"height":HEIGHT,"width":WIDTH,'margin':MARGIN});
            if(style) {
                $("#drag-plugin-move-div").css(style);
            }
            obj.addClass("move-template");
            
            $(pElem).append(obj);
            $(document).on("mousemove",function(e){
                obj.offset({left:e.pageX-XXX,top:e.pageY-YYY});
                calcLong(false,e);
                return false;
            });
            
            $(document).on("mouseup",function(){
                calcLong(true);
                $(document).off();
            });
            
            var _this = $("#drag-plugin-move-div");
            
            function calcLong(onOff,e){
                $(pElem).find(cElem).not(".move-template").each(function(index,elem){
                    if(!onOff){ // 鼠标拖动
                        if($(this).offset().top<=e.pageY &&
                            e.pageY <= $(this).offset().top+$(this).height() &&
                            e.pageX >= $(this).offset().left &&
                            e.pageX <= $(this).offset().left + $(this).width()
                        ){
                            
                            if(_this.index()<$(this).index()){
                                _this.remove().insertAfter($(this));
                            }else if(_this.index()>$(this).index()){
                                _this.remove().insertBefore($(this));
                            };
                        }
                        
                    }else { // 松开鼠标
                        obj.remove();
                        _this.replaceWith(cache);
                        
                        return false;
                    }
                });
                
            };
            
        })
    }
});
