$(function(){
var id_click_utilisateur = "";
  	var xsitationp = "";
	var xsituationtva = "";
	var xsituationbilan = "";
	var xtvamens= "";
	var xtvatrim= "";
	var xtvs= "";
	var xacpt_is= "";
	var xcvae= "";
	var xbilbq= "";

		   $(document).on('keyup','#chrcnom',function(){
	   		$.ajax({
		        url: "php/script_modif_dossier.php",
		        type:'POST',
		        data:{
		            param:'listUserSINGLE',
		            nomequip:$(this).val(),
		        },
		        success: function(data){
					$('#listUser').html(data);
		        },
		    });
    		})



	$(document).on('change','#exampleCheck1',function(){
		if (this.checked) {
			$("#situation input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck1').html("Decocher tous");
		}else{
			$('#situation input:checkbox').removeAttr('checked');
			$('.lblexampleCheck1').html("Cocher tous");
		}
	})

	$(document).on('change','#exampleCheck3',function(){
		if (this.checked) {
			$("#sttva input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck3').html("Decocher tous");
		}else{
			$('#sttva input:checkbox').removeAttr('checked');
			$('.lblexampleCheck3').html("Cocher tous");
		}
	})

$(document).on('change','#exampleCheck5',function(){
		if (this.checked) {
			$("#stbl input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck5').html("Decocher tous");
		}else{
			$('#stbl input:checkbox').removeAttr('checked');
			$('.lblexampleCheck5').html("Cocher tous");
		}
	})

$(document).on('change','#exampleCheck7',function(){
		if (this.checked) {
			$("#tvmens input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck7').html("Decocher tous");
		}else{
			$('#tvmens input:checkbox').removeAttr('checked');
			$('.lblexampleCheck7').html("Cocher tous");
		}
	})

$(document).on('change','#exampleCheck9',function(){
		if (this.checked) {
			$("#sttrim input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.exampleCheck9').html("Decocher tous");
		}else{
			$('#sttrim input:checkbox').removeAttr('checked');
			$('.exampleCheck9').html("Cocher tous");
		}
	})

$(document).on('change','#exampleCheck11',function(){
		if (this.checked) {
			$("#tvsst input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck11').html("Decocher tous");
		}else{
			$('#tvsst input:checkbox').removeAttr('checked');
			$('.lblexampleCheck11').html("Cocher tous");
		}
	})

$(document).on('change','#exampleCheck3',function(){
		if (this.checked) {
			$("#sttva input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck3').html("Decocher tous");
		}else{
			$('#sttva input:checkbox').removeAttr('checked');
			$('.lblexampleCheck3').html("Cocher tous");
		}
	})

$(document).on('change','#exampleCheck13',function(){
		if (this.checked) {
			$("#stacptis input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck13').html("Decocher tous");
		}else{
			$('#stacptis input:checkbox').removeAttr('checked');
			$('.lblexampleCheck13').html("Cocher tous");
		}
	})


$(document).on('change','#exampleCheck15',function(){
		if (this.checked) {
			$("#acve input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck15').html("Decocher tous");
		}else{
			$('#acve input:checkbox').removeAttr('checked');
			$('.lblexampleCheck15').html("Cocher tous");
		}
	})									

$(document).on('change','#exampleCheck17',function(){
		if (this.checked) {
			$("#bqd input[type=checkbox]").prop("checked", $(this).prop("checked"));	
			$('.lblexampleCheck17').html("Decocher tous");
		}else{
			$('#bqd input:checkbox').removeAttr('checked');
			$('.lblexampleCheck17').html("Cocher tous");
		}
})	


$(document).on('click','.non_u',function(){
	$( "#corpaccess").fadeOut("slow");
	$( "#corpaccess").fadeIn("slow");
	$('#nomU').html("<b style='color:red'>" + $(this).closest('td').html() + "</b>");
	id_click_utilisateur = $(this).closest('tr').find('.idU').html();

		$.ajax({
		        url: "php/script_access.php",
		        type:'POST',
		        data:{
		            param:'selectaccess',
		            id:id_click_utilisateur,
	           
		        },
		        success: function(data){
		        	var subdata = data.split(";");
		        	var sitationp = subdata[0];
					var situationtva = subdata[1];
					var situationbilan = subdata[2];
					var tvamens = subdata[3];
					var tvatrim = subdata[4];
					var tvs = subdata[5];
					var acpt_is = subdata[6];
					var cvae = subdata[7];
					var bilbq = subdata[8];
					var id = subdata[9]; 
					rempliraccess(sitationp,"situation");
					rempliraccess(situationtva,"sttva");
					rempliraccess(situationbilan,"stbl");
					rempliraccess(tvamens,"tvmens");
					rempliraccess(tvatrim,"sttrim");
					rempliraccess(tvs,"tvsst");
					rempliraccess(acpt_is,"stacptis");
					rempliraccess(cvae,"acve");
					rempliraccess(bilbq,"bqd");

		        },
		 });

}) 

var nomuli;
function rempliraccess(datas,nomuli){
	var arr = datas.split('#');
    $.each(arr, function(i, obj){
        //alert(obj);
        if(obj == "0"){
        	$("#"+nomuli+" input[type=checkbox]:eq("+ i +")").prop("checked", true); 
        }else{
        	$('#'+nomuli+' input[type=checkbox]:eq('+ i +')').removeAttr('checked');
        }
    })
}

function variableselect(nomaction,variabaction){
	variabaction = "";
	$("#" + nomaction + " input[type=checkbox]").each(function(){
		if($(this).is(':checked')){
			variabaction += "0#";
		}else{
			variabaction += "1#";
		}
	})
	return variabaction;
}


$(document).on('click','#btn_valider',function(){
	//active 0
	// desactiver 1
	xsitationp = variableselect("situation",xsitationp);
	xsituationtva = variableselect("sttva",xsituationtva);
	xsituationbilan = variableselect("stbl",xsituationbilan);
	xtvamens = variableselect("tvmens",xtvamens);
	xtvatrim = variableselect("sttrim",xtvatrim);
	xtvs = variableselect("tvsst",xtvs);
	xacpt_is = variableselect("stacptis",xacpt_is);
	xcvae = variableselect("acve",xcvae);
	xbilbq = variableselect("bqd",xbilbq);


	$.ajax({
		        url: "php/script_access.php",
		        type:'POST',
		        data:{
		            param:'addaccessparam',
		            id:id_click_utilisateur,
		            sitationp:xsitationp,
		            situationtva:xsituationtva,
		            situationbilan:xsituationbilan,
		            tvamens:xtvamens,
		            tvatrim:xtvatrim,
		            tvs:xtvs,
		            acpt_is:xacpt_is,
		            cvae:xcvae,
		            bilbq:xbilbq,
		            
		        },
		        success: function(data){
					$( "#corpaccess").fadeOut("slow");
					$( "#corpaccess").fadeIn("slow");
		        },
		    });

}) 

})

