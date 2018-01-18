(function(){

    function Colorpicker(){

    };
/*
    var default = {
        elem:obj,
        cards:['#000','#fff'],
        afterCreat : fn
    }
*/



    Colorpicker.prototype = {
        render : function(elem,initColor,cards){
            tpl = '<div class="colorpicker-wrap">'+
                '<div class="color-panels">'+
                    '<div class="main-panel">'+
                        '<div class="color-mask1">'+
                            '<div class="color-mask2">'+
                                '<div class="colorpicker-btn-outer">'+
                                    '<div class="colorpicker-btn-inner"></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="bar-panel">'+
                        '<div class="bar-panel-btn">'+
                            '<div class="bar-panel-btn-left"></div>'+
                            '<div class="bar-panel-btn-right"></div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="color-input-wrap">'+
                    '<div class="color-input-hex-wrap">'+
                        '<span class="show-hexcolor"></span>'+
                        '<input type="text" value="123456" maxlength="6" size="6">'+
                    '</div>'+
                    '<div class="opacity-input-wrap">'+
                        '<span class="arrow-left"></span>'+
                        '<input type="text" value="100">'+
                        '<span class="arrow-right"></span>'+
                    '</div>'+
                '</div>'+
                '<div class="color-cards">';

                if(this.isArray(cards)){
                    for(var i=0;i<cards.length;i++){
                        tpl += '<div style="background-color:'+cards[i]+'" class="color-card"></div>'
                    }
                }

                tpl += '</div></div>';

            return tpl;
        },
        create : function(userData){
            var body = document.getElementsByTagName("body")[0];
            body.innerHTML += this.render(userData.elem,userData.initColor,userData.cards);
        },
        bindEvent : function(obj,fn,bool){

        },
        isArray : function(obj){
            return Object.prototype.toString.call(obj) == "[object Array]";
        }
    }

    var picker = new Colorpicker();
    window.colorpicker = picker;
})()
