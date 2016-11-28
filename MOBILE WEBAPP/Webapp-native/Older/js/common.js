/**
 * Created by aijing on 2016/8/1.
 */
window.onload=function(){
    var scrHeight= document.body.clientHeight;
    var headHeight=document.getElementsByTagName("header")[0].clientHeight;
    var tabheight=document.getElementsByClassName("tabheader")[0].clientHeight;
    document.getElementById("content").style.height=(scrHeight-headHeight)+"px";
    var bottoM=document.getElementById("bottomenu").clientHeight;
    document.getElementById("tscroll").style.height=(scrHeight-headHeight-tabheight-bottoM)+"px";
};
