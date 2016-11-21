/**
 * Created by aijing on 2016/8/1.
 */
window.onload=function(){
    var scrHeight= document.body.clientHeight;
    var headHeight=document.getElementsByTagName("header")[0].clientHeight;
    document.getElementById("content").style.height=(scrHeight-headHeight)+"px";

}