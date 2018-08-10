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
                            '<a class="ant-calendar-prev-year-btn" role="button" title="上一年"><<</a>'+
                            '<a class="ant-calendar-prev-month-btn" role="button" title="上个月"><</a>'+
                            '<span class="ant-calendar-ym-select">'+
                                '<a class="ant-calendar-year-select" role="button">2018年</a>'+
                                '<a class="ant-calendar-month-select" role="button">8月</a>'+
                            '</span>'+
                            '<a class="ant-calendar-next-month-btn" title="下个月">></a>'+
                            '<a class="ant-calendar-next-year-btn" title="下一年">>></a>'+
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
                target.style[prop] = cssObj[prop];
            }
            return target;
        },
        show: function(target) {
            this.css(target, { display: 'block' });
        },
        hide: function(target) {
            this.css(target, { display: 'none' });
        },
        formatDate: function(num) {
            return num < 10 ? '0' + num : num;
        }
    };

    function Calendar(opt) {
        // 参数
        this.timer = null; // 本插件异步全都用macroTask中的setTimeout来处理
        this.isSelected = false; // 是否触发了选择日期动作
        this.isYearChange = false; // 是否触发了切换年
        this.isMonthChange = false; // 是否触发了切换月份
        this.opt = {};
        var date = new Date();
        this.dateOpt = {
            _year: date.getFullYear(),
            _month: date.getMonth(),
            _date: date.getDate(),
            selectYear: date.getFullYear(),
            selectMonth: date.getMonth(),
            selectDate: date.getDate(),
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
            this.initState();
            this.initEvent();
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
        getTemplate: function() {
            // 当月第一天日期对象
            var currentMonthFirstDateObj = new Date(this.dateOpt.year, this.dateOpt.month, 1);
            // 当月第一天星期
            var currentMonthFirstDay = currentMonthFirstDateObj.getDay() || 7;
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
                var date = '';
                var className = '';
                if (i<currentMonthFirstDay) {
                    date = lastMonthLastDate-currentMonthFirstDay+i+1;
                    className = 'ant-calendar-last-month-cell';
                } else if (i>currentMonthFirstDay+currentMonthLastDay-1) {
                    date = i-currentMonthFirstDay-currentMonthLastDay+1;
                    className = 'ant-calendar-next-month-btn-day';
                } else {
                    // 今天
                    date = i-currentMonthFirstDay+1;
                    if (this.dateOpt.year === this.dateOpt.curYear &&
                        this.dateOpt.month === this.dateOpt.curMonth &&
                        this.dateOpt.curDate === date) className = 'ant-calendar-cell ant-calendar-today';
                    if (this.dateOpt.selectYear === this.dateOpt.year && this.dateOpt.selectMonth === this.dateOpt.month && this.dateOpt.selectDate === date) className += ' ant-calendar-selected-date';
                    if (this.dateOpt.date === date) className += ' ant-calendar-selected-day';
                }
                html += '<td class="ant-calendar-cell '+ className +'"><div class="ant-calendar-date">'+date+'</div></td>';

                if (i%7 === 7) {
                    html += '</tr>'
                }
            }
            return html;
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
        initState: function() {
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
                    self.isYearChange = true;
                    self.render()
                }
            })
            Object.defineProperty(this.dateOpt, 'month', {
                get: function() {
                    return this._month;
                },
                set: function(newVal) {
                    console.log(newVal, 'month new value');
                    if (newVal > 11) {
                        this.year++;
                        this._month = 0;
                    } else if (newVal < 0) {
                        this.year--;
                        this._month = 11;
                    } else this._month = newVal;
                    self.isMonthChange = true;
                    self.render()
                }
            })
            Object.defineProperty(this.dateOpt, 'date', {
                get: function() {
                    return this._date;
                },
                set: function(newVal) {
                    this._date = newVal;
                    self.render();
                }
            })
        },
        initEvent: function() {
            var self = this;
           
            document.addEventListener('click', function(e) {
                var target = e.target;
                if (utils.hasClass(target, self.opt.classN)) {
                    self.openPanel(target);
                } else if (utils.hasClass(target, 'ant-calendar-next-month-btn')) {
                    self.dateOpt.month++;
                } else if (utils.hasClass(target, 'ant-calendar-prev-month-btn')) {
                    self.dateOpt.month--;
                } else if (utils.hasClass(target, 'ant-calendar-next-year-btn')) {
                    self.dateOpt.year++;
                } else if (utils.hasClass(target, 'ant-calendar-prev-year-btn')) {
                    self.dateOpt.year--;
                } else if (utils.hasClass(target, 'ant-calendar-date')) {
                    self.handleSelect(target);
                }
            }, false);
        },
        updateHtml: function(type) {
            console.log('updateHtml type=>', type);
            switch (type) {
                case 'yearChange':
                    Calendar.Target.querySelector('.ant-calendar-year-select').innerHTML = this.dateOpt._year + '月';
                    Calendar.Target.querySelector('.ant-calendar-month-select').innerHTML = this.dateOpt._month + 1 + '月';
                    break;
                case 'monthChange':
                    Calendar.Target.querySelector('.ant-calendar-month-select').innerHTML = this.dateOpt._month + 1 + '月';
                    break;
                default:
            }
            if (this.isSelected) {
                this.dateOpt.selectYear = this.dateOpt.year;
                this.dateOpt.selectMonth = this.dateOpt.month;
                this.dateOpt.selectDate = this.dateOpt.date;
                Calendar.Target.querySelector('.ant-calendar-input ').value = this.dateOpt._year + '-' + utils.formatDate(this.dateOpt._month + 1) + '-' + utils.formatDate(this.dateOpt._date);
            }
            Calendar.Target.querySelector('tbody').innerHTML = this.getTemplate();
            this.resetOnoff();
        },
        // 重置开关状态
        resetOnoff: function() {
            this.isSelected = false;
            this.isMonthChange = false;
            this.isYearChange = false;
        },
        render: function() {
            if (this.timer) return;
            var self = this;

            var fn = function() {
                if (self.isYearChange) {
                    // 渲染1、2、3、4
                    self.updateHtml('yearChange');
                } else if (self.isMonthChange) {
                    // 渲染1、3、4
                    self.updateHtml('monthChange');
                } else if (self.isSelected) {
                    // 渲染1、4
                    self.updateHtml('dateChange');
                }
                self.timer = null;
            }
            // 宏任务渲染
            if (typeof setImmediate !== 'undefined') {
                self.timer = setImmediate(fn);
            } else {
                self.timer = setTimeout(fn, 0);
            }
        },
        handleSelect: function(target) {
            this.isSelected = true;
            var parentElem = target.parentNode;
            this.dateOpt.date = parseInt(target.innerHTML);
            if (utils.hasClass(parentElem, 'ant-calendar-next-month-btn-day')) {
                this.dateOpt.month++;
            } else if (utils.hasClass(parentElem, 'ant-calendar-last-month-cell')) {
                this.dateOpt.month--;
            }
            // utils.hide(Calendar.Target);
        }
    }
    window.Calendar = Calendar;
})()

var calendar = new Calendar({
    classN: 'calendar-item'
});


// todo:
/*
1.点击今天按钮
2.表单输入
3.定位
4.理下代码渲染的部分 换成vue的mvvm去实现渲染功能
*/