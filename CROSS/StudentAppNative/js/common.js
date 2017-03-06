/**
 * Created by aijing on 2016/1/25.
 */
window.onload = function(){
    var scr_height=document.body.clientHeight;
    var header_height=document.getElementsByTagName("header")[0].clientHeight;
    var footer_height=document.getElementsByTagName("footer")[0].clientHeight;
    var f=document.getElementById("content").style.height=scr_height-header_height-footer_height+"px";
    document.getElementById("warp_hide").style.height=scr_height+"px";
    var cheight=document.getElementById("content").clientHeight- document.getElementById("userTop").clientHeight;
    document.getElementById("usernr").style.height=cheight+"px";
    document.getElementById("vide1").style.height=scr_height+"px";

};
//隐藏菜单
function menuShow(i){

    $("#warp_hide").show(500);
    $("#warp_hide").find(".dhide").eq(i).css({display:"block"});

}
function menuHide(){
    $("#warp_hide").hide(300)
    $("#warp_hide").find(".dhide").css({display:"none"});
}
//错题本折叠收起
var num=0;
function openClick(e){

    if(num==0){

        $("#content .error_topbottom").eq(e).slideDown(500)
        $("#content .open").eq(e).find("a").html("收起解析")
        $("#content .open").eq(e).find("b").html("∧")
        num++;
    }
    else{
        $(".error_topbottom").slideUp(500)
        $(".open").find("a").html("展开解析")
        $(".open").find("b").html("∨")
        num=0
    }
}

//成绩单
function listOpen(n){

    $("#content .title_click_hide").eq(n).slideDown(500);
    //$(".title_click").next().next().slideDown(500);
    $(".title_click_hide").not( $("#content .title_click_hide").eq(n)).slideUp(500);

}
//收藏
function collection(){
    $(".redd").css({color:"red"})

}
//视频隐藏
function vide(){
document.getElementById('v').pause();
    document.getElementById('vide1').style.display="none"

}
function videhidden(){
    document.getElementById('vide1').style.display="block"

}