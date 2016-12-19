//------------------statement------------------------------------------
$(window).load(function(){
	//样式
	//---------------------------------------------------------------------
		$(".tab .uk:nth-child(1) .uk-top").css({backgroundColor:"#f8ac59"});
		$(".tab .uk:nth-child(2) .uk-top").css({backgroundColor:"#1ab394"});
		$(".tab .uk:nth-child(3) .uk-top").css({backgroundColor:"#1c84c6"});
		$(".tab .uk:nth-child(4) .uk-top").css({backgroundColor:"#ed5565"});
		$(".tab .uk:nth-child(5) .uk-top").css({backgroundColor:"#f8ac59"});
		$(".tab .uk:nth-child(6) .uk-top").css({backgroundColor:"#1ab394"});
		$(".tab .uk:nth-child(1)").css({border:"1px solid #f8ac59" });
		$(".tab .uk:nth-child(2)").css({border:"1px solid #1ab394" });
		$(".tab .uk:nth-child(3)").css({border:"1px solid #1c84c6" });
		$(".tab .uk:nth-child(4)").css({border:"1px solid #ed5565" });
		$(".tab .uk:nth-child(5)").css({border:"1px solid #f8ac59" });
		$(".tab .uk:nth-child(6)").css({border:"1px solid #1ab394" });

		$("#morelast").css({position:"relative"});
		
		
		$(".class_nav li").click(function(){
	        $(this).addClass("hover_back");
	        $(this).children(0).addClass("hover_a");
	        $(this).siblings().removeClass("hover_back");
	        $(this).siblings().children(0).removeClass("hover_a");
		});
		
		$(".uk").click(function(){
		        $("#tdisplay").css({display:"block"});
		});
		
		$("#morelast").click(function () {
			$(this).parent().parent().siblings().children("ul").children("li").children(".more").css({display:"none"});
			
		    $(this).children("dl").css({display:"block"});
		        
		 });
	    $(".class_nav li").not($("#morelast")).click(function () {
	    
	        $(".more").css({display:"none"});
	             
	    });
	    
	    
	    $(".more dd a").click(function(){

	        var str=$(this).html();
	         $("#clickmore").html(str);
	         var ddList = $(this).parent().parent().children();
	         $(this).parent().parent().find("a").removeClass("hover_a");
	         $(this).parent().parent().find("a").css({backgroundColor:"#D6D6D6"});
	         $(this).addClass("hover_a");
	         $(this).css({backgroundColor:"#1ab394"});
	         $(this).parent().parent().slideToggle(500);


	        })
	    
});
