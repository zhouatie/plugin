(function(){
    var TEMPLATE1 = '<div class="ant-calendar" tabindex="0">'+
            '<div class="ant-calendar-panel">'+
                '<div class="ant-calendar-input-wrap">'+
                    '<div class="ant-calendar-date-input-wrap">'+
                        '<input class="ant-calendar-input " placeholder="请选择日期" value="2018-08-04">'+
                    '</div>'+
                    '<a class="ant-calendar-clear-btn" role="button" title="清除"></a>'+
                '</div>'+
                '<div class="ant-calendar-date-panel">'+
                    '<div class="ant-calendar-header">'+
                        '<div style="position: relative;">'+
                            '<a class="ant-calendar-prev-year-btn" role="button" title="上一年 (Control键加左方向键)">上一年</a>'+
                            '<a class="ant-calendar-prev-month-btn" role="button" title="上个月 (翻页上键)">上个月</a>'+
                            '<span class="ant-calendar-ym-select">'+
                                '<a class="ant-calendar-year-select" role="button" title="选择年份">2018年</a>'+
                                '<a class="ant-calendar-month-select" role="button" title="选择月份">8月</a>'+
                            '</span>'+
                            '<a class="ant-calendar-next-month-btn" title="下个月 (翻页下键)">下个月</a>'+
                            '<a class="ant-calendar-next-year-btn" title="下一年 (Control键加右方向键)">下一年</a>'+
                        '</div>'+
                    '</div>'+
                    '<div class="ant-calendar-body">'+
                        '<table class="ant-calendar-table" cellspacing="0" role="grid">'+
                            '<thead>'+
                                '<tr role="row">'+
                                    '<th role="columnheader" title="周一" class="ant-calendar-column-header">'+
                                        '<span class="ant-calendar-column-header-inner">一</span>'+
                                    '</th>'+
                                    '<th role="columnheader" title="周二" class="ant-calendar-column-header">'+
                                        '<span class="ant-calendar-column-header-inner">二</span>'+
                                    '</th>'+
                                    '<th role="columnheader" title="周三" class="ant-calendar-column-header">'+
                                        '<span class="ant-calendar-column-header-inner">三</span>'+
                                    '</th>'+
                                    '<th role="columnheader" title="周四" class="ant-calendar-column-header">'+
                                        '<span class="ant-calendar-column-header-inner">四</span>'+
                                    '</th>'+
                                    '<th role="columnheader" title="周五" class="ant-calendar-column-header">'+
                                        '<span class="ant-calendar-column-header-inner">五</span>'+
                                    '</th>'+
                                    '<th role="columnheader" title="周六" class="ant-calendar-column-header">'+
                                        '<span class="ant-calendar-column-header-inner">六</span>'+
                                    '</th>'+
                                    '<th role="columnheader" title="周日" class="ant-calendar-column-header">'+
                                        '<span class="ant-calendar-column-header-inner">日</span>'+
                                    '</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody class="ant-calendar-tbody">';

            var TEMPLATE2 = '</tbody>'+
                        '</table>'+
                    '</div>'+
                    '<div class="ant-calendar-footer">'+
                        '<span class="ant-calendar-footer-btn">'+
                            '<a class="ant-calendar-today-btn " role="button" title="2018年8月3日">今天</a>'+
                        '</span>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    var utils = {
        addClass: function(target, className) {
            class_arr = target.getAttribute('class') ? target.getAttribute('class').split(' ') : [];
            class_arr.push(className);
            target.setAttribute('class', class_arr.join(' '));
            return target;
        },
        hasClass: function(target, className) {
            class_arr = target.getAttribute('class') ? target.getAttribute('class').split(' ') : [];
            return class_arr.indexOf(className) > -1;
        },
        attr: function(target, prop, value) {
            if (value) {
                target.setAttribute(prop, value);
                return target;
            } else {
                return target.getAttribute(prop);
            }
        },
        css: function(target, cssObj) {
            for(var prop in cssObj) {
                target.style.prop = cssObj[prop];
            }
            return target;
        },
        show: function(target) {
            this.css(target, { display: 'block' });
        },
        hide: function(target) {
            this.css(target, { display: 'none' });
        }
    };

    function Calendar(opt) {
        // 参数
        this.opt = {};
        var date = new Date();
        this.dateOpt = {
            _year: date.getFullYear(),
            _month: date.getMonth()
        }
        // 存储页面存在的calendar对象
        this.calendars = {};

        for (var prop in opt) {
            this.opt[prop] = opt[prop];
        }

        this.elem_container = document.querySelector('body');
        this.init();
    
    };

    Calendar.originOpt = {
        PICKERNAME: 'calendar-btn',
        PANELKEY: 'self-panel-key', // 存储picker对应的calendar的唯一key
        PANELSTR: 'calendar-panel_',
        PANELWRAPCLASS: 'calendar-wrap'
    }
    Calendar.Target = null;  // 当前打开的日历视图
    Calendar.version = '1.0.0';

    Calendar.prototype = {
        constructor: Calendar,
        init: function() {
            this.initEvent();
        },
        initEvent: function() {
            var self = this;
            
            Object.defineProperty(this.dateOpt, 'curYear', {
                get: function() {
                    return new Date().getFullYear();
                },
            })
            Object.defineProperty(this.dateOpt, 'curMonth', {
                get: function() {
                    return new Date().getMonth();
                },
            })
            Object.defineProperty(this.dateOpt, 'curDate', {
                get: function() {
                    return new Date().getDate();
                },
            })
            Object.defineProperty(this.dateOpt, 'year', {
                get: function() {
                    return this._year;
                },
                set: function(newVal) {
                    if (newVal === this._year) return;
                    this._year = newVal;
                    // self.render();
                }
            })
            Object.defineProperty(this.dateOpt, 'month', {
                get: function() {
                    return this._month;
                },
                set: function(newVal) {
                    if (newVal === this._month) return;
                    this._month = newVal;
                    self.render();
                }
            })
            
            document.addEventListener('click', function(e) {
                var target = e.target;
                if (utils.hasClass(target, self.opt.classN)) {
                    self.openPanel(target);
                } else if (utils.hasClass(target, 'ant-calendar-next-month-btn')) {
                    console.log(333)
                    self.dateOpt.month++;
                }
            }, false);
        },
        render: function() {
            Calendar.Target.querySelector('tbody').innerHTML = this.getTemplate();
        },
        getTemplate: function() {
            // 当月第一天日期对象
            var currentMonthFirstDateObj = new Date(this.dateOpt.year, this.dateOpt.month, 1);
            // 当月第一天星期
            var currentMonthFirstDay = currentMonthFirstDateObj.getDay();
            // 当月最后一天日期对象
            var currentMonthLastDateObj = new Date(this.dateOpt.year, this.dateOpt.month+1, 0);
            // 当月最后一天日期
            var currentMonthLastDay = currentMonthLastDateObj.getDate();
            // 上个月最后一天日期对象
            var lastMonthLastDateObj = new Date(this.dateOpt.year, this.dateOpt.month, 0);
            // 上个月最后一天日期
            var lastMonthLastDate = lastMonthLastDateObj.getDate();
            
            var html = '';
            for (var i=1;i<=42;i++) {
                if (i%7 === 1) {
                    html += '<tr>'
                }
                if (i<currentMonthFirstDay) {
                    html += '<td class="ant-calendar-cell ant-calendar-last-month-cell"><div class="ant-calendar-date">'+(lastMonthLastDate-currentMonthFirstDay+i+1)+'</div></td>';
                } else if (i>currentMonthFirstDay+currentMonthLastDay-1) {
                    html += '<td class="ant-calendar-cell ant-calendar-next-month-btn-day"><div class="ant-calendar-date">'+(i-currentMonthFirstDay-currentMonthLastDay+1)+'</div></td>';
                } else {
                    if (this.dateOpt.month === this.dateOpt.curMonth && this.dateOpt.curDate === (i-currentMonthFirstDay+1)) html += '<td class="ant-calendar-cell ant-calendar-today">';
                    else html += '<td class="ant-calendar-cell">';
                    html += '<div class="ant-calendar-date">'+(i-currentMonthFirstDay+1)+'</div></td>';
                }
                if (i%7 === 7) {
                    html += '</tr>'
                }
            }
            return html;
        },
        create: function(target) {
            var only_key = +new Date();
            var div = document.createElement('div');

            utils.attr(target, Calendar.originOpt.PANELKEY, only_key);
            utils.addClass(target, Calendar.originOpt.PICKERNAME);

            div.className = Calendar.originOpt.PANELWRAPCLASS + ' ' + Calendar.originOpt.PANELSTR + only_key;
            div.innerHTML = TEMPLATE1 + this.getTemplate(this.dateOpt.year, this.dateOpt.month) + TEMPLATE2;
            Calendar.Target = div;
            this.elem_container.appendChild(div);
        },
        openPanel: function(target) {
            if (utils.hasClass(target, Calendar.originOpt.PICKERNAME)) { // 说明该元素已经挂载
                var only_key = utils.attr(target, Calendar.originOpt.PANELKEY);
                Calendar.Target = document.querySelector('.' + Calendar.originOpt.PANELSTR + only_key);
                utils.show(Calendar.Target);
            } else {
                this.create(target);
            }
        },
    }
    window.Calendar = Calendar;
})()

var calendar = new Calendar({
    classN: 'calendar-item'
});