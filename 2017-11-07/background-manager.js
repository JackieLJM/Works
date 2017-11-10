$('#data').click(function(event) {
    $('.data').show();
    $('.exam').hide();
    $('.grade').hide();
    $('.blank').hide();
    $('#data').addClass('chosed');    
}).hover(function() {
	$('#exam').removeClass('chosed');
    $('#grade').removeClass('chosed');
});


$('#exam').click(function(event) {
    $('.data').hide();
    $('.exam').show();
    $('.grade').hide();
    $('.blank').hide();
    $('#exam').addClass('chosed');
}).hover(function(){
	$('#data').removeClass('chosed');
    $('#grade').removeClass('chosed');
})


$('#grade').click(function(event) {
    $('.data').hide();
    $('.exam').hide();
    $('.grade').show();
    $('.blank').hide();
    $('#grade').addClass('chosed');
}).hover(function(){
	$('#data').removeClass('chosed');
    $('#exam').removeClass('chosed');
});