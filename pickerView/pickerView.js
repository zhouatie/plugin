/*
    var content = document.getElementsByClassName("pickerView-box-content")[0];
    var items = document.getElementsByClassName("pickerView-items");
    var mask = document.getElementsByClassName("pickerView-box-content-mask")[0];
    var indicator = document.getElementsByClassName("pickerView-box-content-indicator")[0];

    var padding = (content.offsetHeight-34)/2;

    var top = 0;
    var startY = 0;
    var moveY = 0;
    indicator.style.top = padding+"px";
    mask.style.backgroundSize= '100% '+padding+"px";
    for(var i=0;i<items.length;i++){
        items[i].style.padding = padding+"px 0";
        content.addEventListener("touchstart",function(e){console.log(this)
            startY = e.touches[0].pageY;
            this.addEventListener("touchmove",touchmove,false)
            function touchmove(ev){
                moveY = ev.touches[0].pageY;
                var TOP = top+moveY-startY+"px";
                items[0].style.transform= "translate3d(0px, "+TOP+", 0px)";
            }
        })
    }
*/

(function(){
  var util = {
    extend: function(target) {
        for (var i = 1, len = arguments.length; i < len; i++) {
            for (var prop in arguments[i]) {
                if (arguments[i].hasOwnProperty(prop)) {
                    target[prop] = arguments[i][prop];
                }
            }
        }

        return target;
    }
  };

  function PickerView(opt){

    var _this = this;

    this.Opt = {

    };

    // 同步参数
    for(var i in this.Opt){
        if(opt[i]) this.Opt[i] = opt[i];
    }

    this.init();

    this.elem_wrap = null;
  }

  PickerView.VERSION = '1.0.0';

  PickerView.prototype = {
    constructor: PickerView,
    init: function(){
      var body = document.getElementsByTagName("body")[0];
      var div = document.createElement("div");
      div.className = "pickerView-wrap";
      this.elem_wrap = div;
    }
  }






window.PickerView = PickerView;

})();
