$(".nav").on("click","li",function(){
	$(this).siblings().removeClass("current");
	var hasChild = !!$(this).find(".subnav").size();
	if(hasChild){
		$(this).toggleClass("hasChild");
	}
	$(this).addClass("current");
	// 点击其他菜单项去掉颜色
	if($(this)[0].classList[0]!=="nav-info"){
		$(".nav>.nav-info>.nav-header").css({"background-color":"#F1F8FC"})
		$(".nav>.nav-info>.nav-header>a>span").css({"color":"black"})
	}
	if($(this)[0].classList[0]==="nav-info"){
		$(".nav>.nav-info>.nav-header").css({"background-color":"#6EC672"})
		$(".nav>.nav-info>.nav-header>a>span").css({"color":"white"})
	}
});


$(window).resize(function(e) {
    $("#bd").height($(window).height() - $("#hd").height() - $("#ft").height()-6);
	$(".wrap").height($("#bd").height()-6);
	$(".nav").css("minHeight", $(".sidebar").height() - $(".sidebar-header").height()-1);
	$("#iframe").height($(window).height() - $("#hd").height() - $("#ft").height()-12);
}).resize();

$(".nav>li").css({"borderColor":"#dbe9f1"});
$(".nav>.current").prev().css({"borderColor":"#7ac47f"});
$(".nav").on("click","li",function(e){
	var aurl = $(this).find("a").attr("date-src");
	$("#iframe").attr("src",aurl);
	$(".nav>li").css({"borderColor":"#dbe9f1"});
	$(".nav>.current").prev().css({"borderColor":"#7ac47f"});
	return false;
});
// 点击子菜单去掉父菜单颜色
$(".subnav>li").on("click",function(e){
	$(".nav>.current>.nav-header").css({"background-color":"#F1F8FC"});
	$(".nav>.current>.nav-header>a>span").css({"color":"black"})
	// $(".nav>.current>.nav-header>a").css({"borderColor":"black"})
})
// 点击导航信息管理添加绿色背景色
$(".nav>.nav-info>.nav-header").on("click",function(e){
	$(".nav>.nav-info.current.hasChild>.nav-header").css({"background-color":"#6EC672"})
	$(".nav>.nav-info.current.hasChild>.nav-header>a>span").css({"color":"white"})
});
$('.exitDialog').Dialog({
	title:'提示信息',
	autoOpen: false,
	width:400,
	height:200
	
});

$('.exit').click(function(){
	$('.exitDialog').Dialog('open');
});



$('.exitDialog input[type=button]').click(function(e) {
    $('.exitDialog').Dialog('close');
	
	if($(this).hasClass('ok')){
		window.location.href = "login.html"	;
	}
});