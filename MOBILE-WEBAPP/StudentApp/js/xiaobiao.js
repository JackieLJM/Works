/**
 * Created by aijing on 2016/2/25.
 */
$(function(){
    var a=0;
    $(".redd").click(function(){

        if(a==0){

            $(this).find("b").css({color:"#798487"})

            a=1;
        }
        else{

            $(this).find("b").css({color:"#FD8A23"});
            a=0;
        }

    })

    $(".del").click(function(){
        $(this).parent().parent().parent().css({display:"none"})

    })

})