$(document).ready(function(){
    $(".a").hover(function(){
        $(".a1").show();
    },function(){
        $(".a1").hide();
    });
    $(".a1").hover(function(){
        $(".a1").show();
    },function(){
        $(".a1").hide();
    });
})