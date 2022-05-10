$(function(){

	$(".cbody").css({ opacity: 0.05 });

	$('.prtfeuil').on('click',function(){
		var prt = $(this).closest('.prtfeuil').html();
		$( ".cbody" ).animate({opacity: 1,}, 2000, function() {});
		$('#pttitleprt').html(prt);
		$('.dialogprt').css("visibility", "hidden");
	})

	$('.dialpt').on('click',function(){
		$(".cbody" ).animate({opacity: 0.05,}, 500, function() {});
		$('.dialogprt').css("visibility", "visible");
	})

})