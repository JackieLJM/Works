/**
 * Created by aijing on 2016/8/2.
 */
window.onload=function(){
    var scrHeight= document.body.scrollHeight;
    document.getElementById("wrap").style.height=scrHeight+"px";
}

//--------------------------菜单首页1-1-------------------------------------
$(window).load(function(){
    $(".fmenu div").css({height:$(" .fmenu div").width()+"px"})
    $(".top_right div span").css({lineHeight:$(".top_right div span").height()+"px"});
})
//跳转页面
var i=0;
function front (){
    if(i==1){
        $("#one").animate({left:"0%"},500)
        $("#two").animate({left:"100%"},500);
        $(".back").css({display:"none"})
        $(".rmenu_fy i").html("1/3")
        i=0;
    }
    else if(i==2){
        $("#two").animate({left:"0%"},500)
        $("#three").animate({left:"100%"},500);
        $(".go").css({display:"block"});
        $(".rmenu_fy i").html("2/3");
        i--;
    }

}

function next(){
   i++;
    if(i==1){
        $("#one").animate({left:"-100%"},500);
        $("#two").animate({left:"0"},500);
        $(".back").css({display:"block"});
        $(".rmenu_fy i").html("2/3");

    }
    else if(i==2){
        $("#two").animate({left:"-100%"},500);
        $("#three").animate({left:"0"},500);
        $(".back").css({display:"block"});
        $(".go").css({display:"none"});
        $(".rmenu_fy i").html("3/3");

    }
    else{
        i=0;
    }

}
