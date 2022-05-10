$(function(){
$('#btnnotifi').hide();
$('#sucalert').hide();
var idsup = "";
	var nomsuperviseur = "";
   		$.ajax({
        url: "php/spsuperv.php",
        type:'POST',
        data:{
            param:'listSup',
        },
        success: function(data){
			var resl = data.split("#");
			$('#tablesupmada').html(resl[1]);
			$('#tablesupfr').html(resl[0]);
        },
    });

	var nomsuperviseur = "";
   		$.ajax({
        url: "php/spsuperv.php",
        type:'POST',
        data:{
            param:'listEquip',
        },
        success: function(data){
			$('#listeQup').html(data);
        },
    });   		

   		$(document).on('click','.linesup',function(){
   			idsup = $(this).closest('tr').find('.idsup').html();
   			$('#idutilisateur').html(idsup);
   			nomsuperviseur = $(this).closest('td').html();
   			$.ajax({
        	url: "php/spsuperv.php",
	        type:'POST',
	        data:{
	            param:'selectsonportfeuil',
	            id:idsup,
	        },
	        success: function(data){
	        	$('#animat').fadeOut(200);
	        	$('#animat').fadeIn(200);
				$('#tableport').html(data)
				$('#namesup').html(nomsuperviseur);
				$('#idul').html(nomsuperviseur);
				$("#prtexist").addClass("original");
	        },
   		});
   	})
   		$(document).on('click','.adportf', function(){
   			if($('#namesup').html() != ""){
   			$('#prtdeja').html($('#tableport').html());
   		}else{
   			alert("chossir au moin un Superviseur !")
   			$('.close').click();
   		}
   		})
   		
})

$(document).on('click','.suprln',function(){
	$(this).closest('table tr').remove();
	$('#btnnotifi').show(500);
})

$(document).on('click','#btnnotifi',function(){
	var listtotal = "";
	$('.original:eq(0) .nomE').each(function(index){
		listtotal += $(this).html() + "#";
	})

	$.ajax({
        url: "php/spsuperv.php",
        type:'POST',
        data:{
            param:'envoielist',
            listtotal:listtotal,
            idsup:$('#idutilisateur').html(),
        },
        success: function(data)
        {
			$('#animat').fadeOut(300);
			$('#animat').fadeIn(500);
			$('#btnnotifi').hide();
			$('#sucalert').fadeIn(300);
			$('#sucalert').fadeOut(2000);
        },
    });   


})

$(document).on('keyup','#keyprfeui',function(){
  		$.ajax({
        url: "php/spsuperv.php",
        type:'POST',
        data:{
            param:'keylistequi',
            code: $(this).val(),
        },
        success: function(data){
			$('#listeQup').html(data);
        },
    }); 
})


	$(document).on('click','#selectright', function(){
		if($(".original").html() == ""){
			$(".original").html("<tbody></tbody>");
		}
		$('.chkbox').each(function( index ) {
			if($(this).is(':checked')){
				if($('.original:eq(1)').html().indexOf($( this ).closest('tr').find('.clportfeuil').html()) > -1)
				{
  					alert($( this ).closest('tr').find('.clportfeuil').html() + "=> portfeuille Exist !")
  				}else{
  					$(".original:eq(1) > tbody").prepend("<tr><td class='nomE'>" + $( this ).closest('tr').find('.clportfeuil').html() +"</td><td></td><td class='suprln text-center'><span class='glyphicon glyphicon-trash'></span></td></tr>");
  				}
  			}
		});

	})

$(document).on('click','#valide', function(){
	$('.original:eq(0)').html($('.original:eq(1)').html());
	$('.close').click();
	$('#btnnotifi').show(100);
})