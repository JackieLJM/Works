/**
 * 时间戳转日期
 * 
 * @param timeStamp
 *            时间戳
 * @returns
 */
function formatDateTime(timeStamp) {

	if (timeStamp == undefined || timeStamp == null || timeStamp == "") {
		return "";
	}

	var now = new Date(timeStamp);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();

	var result = year;

	result += "-";
	if (month < 10) {
		result += "0";
	}
	result += month;

	result += "-";
	if (date < 10) {
		result += "0";
	}
	result += date;

	result += " ";
	if (hour < 10) {
		result += "0";
	}
	result += hour;

	result += ":";
	if (minute < 10) {
		result += "0";
	}
	result += minute;

	result += ":";
	if (second < 10) {
		result += "0";
	}
	result += second;

	return result;

}

/**
 * 日期比较：start是否位于end之后
 * 
 * @param start
 *            开始日期
 * @param end
 *            截止日期
 * @returns
 */
function compareDate(start, end) {
	return ((new Date(start.replace(/-/g, "\/"))) > (new Date(end.replace(/-/g,
			"\/"))));
}

/**
 * 获取当前时间，格式YYYY-MM-DD
 * 
 * @returns {String}
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

/**
 * 休眠
 * 
 * @param second
 */
function sleep(second) {
	var now = new Date();
	var exitTime = now.getTime() + second;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

/**
 * 获取DATATABLES语言设置
 * 
 * @returns
 */
function getDatatablesZhLanguage() {
	return {
		"sProcessing" : "加载中...",
		"sLengthMenu" : "显示 _MENU_ 项结果",
		"sZeroRecords" : "暂无数据",
		"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
		"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
		"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
		"sInfoPostFix" : "",
		"sSearch" : "搜索:",
		"sUrl" : "",
		"sEmptyTable" : "表中数据为空",
		"sLoadingRecords" : "载入中...",
		"sInfoThousands" : ",",
		"oPaginate" : {
			"sFirst" : "首页",
			"sPrevious" : "上页",
			"sNext" : "下页",
			"sLast" : "末页"
		},
		"oAria" : {
			"sSortAscending" : ": 以升序排列此列",
			"sSortDescending" : ": 以降序排列此列"
		}
	};
}

/**
 * DATATABLES指定跳转页
 * 
 * @param table
 *            DATATABLES表格
 */
function jumpPage(table) {
	var page = parseInt($('#jump_page_space').val());
	var page_num = parseInt($("#list_next").prev().children('a').text());
	if (page >= 1 && page <= page_num) {
		table.page(page - 1).draw(false);
	}
}

/**
 * 根据文件字节数获取文件大小
 * 
 * @param fileByte
 *            文件字节数
 * @returns {String}
 */
function getFileSize(fileByte) {

	var fileSizeByte = fileByte;

	var fileSizeMsg = "";

	if (fileSizeByte < 1048576)
		fileSizeMsg = keepTwoDecimalFull(fileSizeByte / 1024) + "KB";
	else if (fileSizeByte == 1048576)
		fileSizeMsg = "1MB";
	else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
		fileSizeMsg = keepTwoDecimalFull(fileSizeByte / (1024 * 1024)) + "MB";
	else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
		fileSizeMsg = "1GB";
	else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
		fileSizeMsg = keepTwoDecimalFull(fileSizeByte / (1024 * 1024 * 1024))
				+ "GB";
	else if (fileSizeByte >= 1099511627776)
		fileSizeMsg = keepTwoDecimalFull(fileSizeByte
				/ (1024 * 1024 * 1024 * 1024))
				+ "TB";

	return fileSizeMsg;

}

/**
 * 四舍五入保留2位小数（不够位数，则用0替补）
 * 
 * @param num
 * @returns
 */
function keepTwoDecimalFull(num) {
	var result = parseFloat(num);
	if (isNaN(result)) {
		return false;
	}
	result = Math.round(num * 100) / 100;
	var s_x = result.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

/**
 * 计算时间差
 * 
 * @param start
 *            开始时间
 * @param end
 *            结束时间
 * @returns {String}
 */
function timeDifference(start, end) {

	if (start == null) {
		return "";
	}

	start = new Date(formatDateTime(start));

	if (start != null && (end == null)) {
		end = new Date();
	}

	end = new Date(formatDateTime(end));

	// 时间差的毫秒数
	var msec = end.getTime() - start.getTime();

	// 计算出相差天数
	var days = Math.floor(msec / (24 * 3600 * 1000));

	// 计算出小时数E
	var leave1 = msec % (24 * 3600 * 1000);

	// 计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000))

	// 计算相差分钟数
	var leave2 = leave1 % (3600 * 1000);

	// 计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000));

	// 计算相差秒数
	var leave3 = leave2 % (60 * 1000);

	// 计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000);

	var html = "";
	if (days > 0) {
		html += days + "天 ";
	}

	if (hours > 0) {
		html += hours + "小时 ";
	}

	if (minutes > 0) {
		html += minutes + " 分钟";
	}

	if (seconds > 0) {
		html += seconds + " 秒";
	}

	return html;

}

/**
 * 将秒转换为文字
 * 
 * @param seconds
 *            秒数
 */
function time2Text(seconds) {

	seconds = parseInt(seconds);

	if (seconds <= 0) {
		return seconds + "秒";
	}

	// 计算天数
	var days = Math.floor(seconds / (24 * 3600));

	var leave = null;

	// 计算小时数
	leave = seconds % (24 * 3600);
	var hours = Math.floor(leave / 3600)

	// 计算分钟数
	leave = leave % 3600;
	var minutes = Math.floor(leave / 60);

	// 计算相差秒数
	leave = leave % 60;
	var seconds = Math.round(leave / 1);

	var html = "";
	if (days > 0) {
		html += days + " 天  ";
	}

	if (hours > 0) {
		html += hours + " 小时  ";
	}

	if (minutes > 0) {
		html += minutes + " 分钟 ";
	}

	if (seconds > 0) {
		html += seconds + " 秒 ";
	}

	return html;

}

/**
 * 模态框垂直居中
 */
function centerModals() {
	$('.modal').each(
			function(i) {
				var $clone = $(this).clone().css('display', 'block').appendTo(
						'body');
				var top = Math.round(($clone.height() - $clone.find(
						'.modal-content').height()) / 2);
				top = top > 0 ? top : 0;
				$clone.remove();
				$(this).find('.modal-content').css("margin-top", top - 50);
			});
}

/**
 * TAB切换初始化
 */
function tabInit() {
	$(".title-list ul").on(
			"click",
			"li",
			function() {
				var aIndex = $(this).index();
				$(this).addClass("tab_current").siblings().removeClass(
						"tab_current");
				$(".matter-content").removeClass("tab_current").eq(aIndex)
						.addClass("tab_current");
			});
}

function activeLastPointToolip(chart) {
	var points = chart.series[0].points;
	chart.tooltip.refresh(points[points.length - 1]);
}