//date
(function ($) {
    $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
        setText: '确定',
        cancelText: '取消'
    });

    $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
        dateFormat: 'yyyy-mm-dd',
        dateOrder: 'yymmdd',
        //dayNames: ['周日', '周一;', '周二;', '周三', '周四', '周五', '周六'],
        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        dayText: '日',
        //hourText: '时',
        //minuteText: '分',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthText: '月',
        //secText: '秒',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: '年'
    });

    var theme = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'mixed',
            rows: 5,
            width: 70,
            height: 36,
            showLabel: true,
            useShortLabels: true
        }
    };

    $.mobiscroll.themes['android-ics'] = theme;
    $.mobiscroll.themes['android-ics light'] = theme;

})(jQuery);

$(function () {
    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
    };

    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    $("#appTime").mobiscroll(optTime).time(optTime);
});

//sex
function sexClick(){
    $(".user_sex").css({display:"block"})
}
function selectsex(e){
     var sexText=$(".user_sex li").eq(e).text();
    $(".user_sex").css({display:"none"});
    $("#uSex").text(sexText);
}
function userClass(i){
var school=$(".newslist li span").eq(i).text()
    $(".scl").text(school);
}
function uclass(){
    $(".studentclass").css({display:"block"})

}
function studentclass(e){
    var sexText=$(".studentclass li").eq(e).text();
    $(".studentclass").css({display:"none"});
    $("#studentclass").text(sexText);
}
function bj(i){
    var bj=$(".newslist2 li span").eq(i).text();
    $(".bj").text(bj);
}