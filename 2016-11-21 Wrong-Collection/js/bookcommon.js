/**
 * Created by aijing on 15-12-16.
 */
$(function(){

//    ------------菜单---------------------
    $(" .navRight").click(function(){
        $(".unav").slideToggle(500)

    })
     $(".navLeft a").click(function(){
         $(this).addClass("alink")
         $(this).siblings().removeClass()


     })

})

    $(document).ready(function(){

        $(".prev,.next").hover(function(){
            $(this).stop(true,false).fadeTo("show",0.9);
        },function(){
            $(this).stop(true,false).fadeTo("show",0.4);
        });

        $(".banner-box").slide({
            titCell:".hd ul",
            mainCell:".bd ul",
            effect:"fold",
            interTime:3500,
            delayTime:500,
            autoPlay:true,
            autoPage:true,
            trigger:"click"
        });

    });




