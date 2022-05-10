$(function(){
$('#btnnotifi').hide();
$('#sucalert').hide();

var id_access = "";
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
        url: "php/access_portfeuil.php",
        type:'POST',
        data:{
            param:'collab',
        },
        success: function(data){
			$('#collab').html(data);
        },
    });   		

   		$(document).on('click','.linenom',function(){
   			idsup = $(this).closest('tr').find('.idcollab').html();
			$("input[type=checkbox").prop('checked', false);
			$('#id_user_u').html(idsup);
		   nom = $(this).closest('tr').find('.linenom').html();
		   $('#nom_id').html(nom);
   			$.ajax({
        	url: "php/access_portfeuil.php",
	        type:'POST',
			dataType:'Json',
	        data:{
	            param:'select_nom',
	            id:idsup,
	        },
	        success: function(data){
				$('#prtdeja').html("");
				$('#id_access_u').html("");
				try {
					var list  = "";
					for(var i = 0; i< data[0].tous_portfeuil_nom.split("#").length; i ++){
						if(data[0].tous_portfeuil_id.split("#")[i] != "")
						list += "<tr><td class='idselect_c' style='display:none'>"+data[0].tous_portfeuil_id.split("#")[i]+"</td><td class='nomE'>"+  data[0].tous_portfeuil_nom.split("#")[i] +"</td><td></td><td class='suprln text-center'><span class='glyphicon glyphicon-trash'></span></td></tr>";
					};
					$('#id_access_u').html(+data[0].id);
					$("#prtdeja").html("<table class='table'><tbody id='addtbl'>"+list+"</tbody></table>");
				} catch (error) {
				
				}
					
		
	        },
   		});
   	})

   		
})

$(document).on('click','.suprln',function(){
	$(this).closest('table tr').remove();
	$('#btnnotifi').show(500);
})

$(document).on('click','#btnnotifi',function(){
	

	var listtotal = "";
	var listid = "";
	$('#addtbl .nomE').each(function(index){
		listtotal += $(this).html() + "#";
	})

	$('#addtbl .idselect_c').each(function(index){
		listid += $(this).html() + "#";
	})

	if($('#id_access_u').html() != ""){
		$.ajax({
			url: "php/access_portfeuil.php",
			type:'POST',
			data:{
				param:'envoielist',
				listtotal:listtotal,
				listid:listid,
				id_change:$('#id_access_u').html(),
				id_user:$('#id_user_u').html(),
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

		return;
	}else{
		$.ajax({
			url: "php/access_portfeuil.php",
			type:'POST',
			data:{
				param:'envoielist',
				listtotal:listtotal,
				listid:listid,
				id_user:$('#id_user_u').html(),
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

		return;
	}


})

$(document).on('keyup','#keyprfeui',function(){
  		$.ajax({
        url: "php/access_portfeuil.php",
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

$.ajax({
	url: "php/access_portfeuil.php",
	type:'POST',
	data:{
		param:'keylistequi',
		code: "",
	},
	success: function(data){
		$('#listeQup').html(data);
	},
}); 


$(document).on('keyup','.text_recherche',function(){
	$('#collab').html("");
	$.ajax({
  url: "php/access_portfeuil.php",
  type:'POST',
  data:{
	  param:'keycheche_nom',
	  nom: $(this).val(),
  },
  success: function(data){
	$('#collab').html(data);
  },
}); 
})



	$(document).on('click','#selectright', function(){
		
		if($("#prtdeja").html().trim() == ""){
			$("#prtdeja").html("<table class='table'><tbody id='addtbl'></tbody></table>");
		}
		$('.chkbox').each(function( index ) {
			if($(this).is(':checked')){
				if( $("#addtbl").html().indexOf($( this ).closest('tr').find('.clportfeuil').html()) > -1)
				{
  					//alert($( this ).closest('tr').find('.clportfeuil').html() + "=> portfeuille Exist !")
  				}else{
  					$("#addtbl").prepend("<tr><td class='idselect_c' style='display:none'>"+$( this ).closest('tr').find('.id_code_id').html()+"</td><td class='nomE' style='background: #d4d4f1;'>" + $( this ).closest('tr').find('.clportfeuil').html() +"</td><td></td><td class='suprln text-center'><span class='glyphicon glyphicon-trash'></span></td></tr>");
					  $('#btnnotifi').show(100);
  				}
  			}
		});

	})

	$(document).on('click','#cauchtous', function(){
		$("input[type=checkbox").prop('checked', true);
	})

	$(document).on('click','#dacacuhe', function(){
		$("input[type=checkbox").prop('checked', false);
	})
	

$(document).on('click','#valide', function(){
	$('.original:eq(0)').html($('.original:eq(1)').html());
	$('.close').click();
	$('#btnnotifi').show(100);
})