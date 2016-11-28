/**
 * Created by aijing on 15-12-16.
 */
//---------------------mistakeList---------------------------------

$(function(){

     $(".cTop1 span,.cTop1 img").click(function(){
         var string= $(this).parent().parent().next().css("display")
          if(string=="none"){
              $(this).parent().parent().parent().css({border:"1px solid #1AA97B"})
          }
         else{
              $(this).parent().parent().parent().css({border:"1px solid #F1F1F1"})
          }
         $(this).parent().parent().next().slideToggle(500)
     })



})

//------------------statement-------------------------
$(window).load(function(){
//点击菜单事件
//-----------------------------------------------------------
    $(".class_nav li").click(function(){
        $(this).addClass("hover_back")
        $(this).children(0).addClass("hover_a")
        $(this).siblings().removeClass("hover_back")
        $(this).siblings().children(0).removeClass("hover_a")
    })
    //列表收起
//-------------------------------------------------------------------
    $(".uk-top-right img:nth-child(1)").click(function(){

        $(this).parent().parent().siblings().slideToggle(500)
    })

    //样式
//---------------------------------------------------------------------

    $(".tab .uk:nth-child(1) .uk-top").css({backgroundColor:"#FFB849"});
    $(".tab .uk:nth-child(2) .uk-top").css({backgroundColor:"#36AA47"});
    $(".tab .uk:nth-child(3) .uk-top").css({backgroundColor:"#4B8EF9"});
    $(".tab .uk:nth-child(4) .uk-top").css({backgroundColor:"#AE5CC2"});
    $(".tab .uk:nth-child(1)").css({border:"1px solid #FFB849" })
    $(".tab .uk:nth-child(2)").css({border:"1px solid #36AA47" })
    $(".tab .uk:nth-child(3)").css({border:"1px solid #4B8EF9" })
    $(".tab .uk:nth-child(4)").css({border:"1px solid #AE5CC2" })
    $(".class_nav li:last-child").css({position:"relative"})

    //---------------------------------------

    $(".cdisplay").click(function(){

        $(this).parent().parent().parent().hide(500)


    })
        $(".uk").click(function(){

            $("#tdisplay").css({display:"block"})
        })
        $(".close img").click(function(){
            $("#tdisplay").slideUp(500)
        })
    $("#sucai").niceScroll({
        cursorcolor:"#1AA97B",
        cursoropacitymax:1,
        touchbehavior:false,
        cursorwidth:"5px",
        cursorborder:"0",
        cursorborderradius:"5px"
    });

//---------------------更多-------------------------------
     //-------------------------------------------------------
	 $(".class_nav li:last-child").click(function () {
        $(this).children("dl").css({display:"block"})
        $(this).parent().parent().siblings().children("ul").children("li").children(".more").css({display:"none"})

    });
    $(".class_nav li").not($(".class_nav li:last-child")).click(function () {
        $(".more").css({display:"none"})
    })


    $(".more dd a").click(function(){

    var str=$(this).html()
     $("#clickmore").html(str)

     $(this).parent().parent().slideToggle(500)


    })
})