$(function(){
	$('.animgif').hide();
	$('#affListuser').hide();
	$('#listexcel').hide();
	var equipe___id;
	function listequipe(){
	    $.ajax({
	        url: "php/script_equipe.php",
	        type:'POST',
	        data:{
	            param:'ListEquipe',
	        },
	        success: function(data){
				//console.log(data);
				$('.chkequipe').html('<datalist id="chkequipe">' + data + '</datalist><input list="chkequipe" id="myoptions" autocomplete="off" >');
	        },
	    });
    }
    listequipe();


    $(document).on('change','.chkequipe',function(){
    	$('#listdosssier').html("");
    	$('#listUtilisateur').html("");
    	$('#affListuser').hide();
    	$('#iddossier').html("0");
    	var element_input = document.getElementById('myoptions');
	    var element_datalist = document.getElementById('chkequipe');
	    var opSelected = element_datalist.querySelector(`[value="${element_input.value}"]`);
	    var id = opSelected.getAttribute('data-value');
	    id_equipe = id;
	    equipe___id = id_equipe;
	    $.ajax({
	        url: "php/script_modif_dossier.php",
	        type:'POST',
	        data:{
	            param:'list_dossier_select',
	            id_equipe:id_equipe
	        },
	        success: function(data){
				//console.log(data);
				$('#listdosssier').html(data);
				$('#listexcel').show();
				$('#listexcel').val("");
				$('#tbdonnerexcel').html("");
				$('#countdoss').html($('#lstdoss option').size());
	        },
	    });
    })

        $(document).on('keyup','#recherdoss',function(){
	    $.ajax({
	        url: "php/script_modif_dossier.php",
	        type:'POST',
	        data:{
	            param:'listrecherchedoss',
	            dossierrecherche:$(this).val(),
	        },
	        success: function(data){
				//console.log(data);
				$('#listdosssier').html(data);
				$('#listexcel').show();
				$('#listexcel').val("");
				$('#tbdonnerexcel').html("");
				$('#countdoss').html($('#lstdoss option').size());
	        },
	    });
    })

    

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




$('#chrcnom').keyup();

$(document).on('dblclick','#myoptions',function(){
	$(this).val("");
	$(this).focus();
})
    /*$(document).on('change','#lstdoss',function(){

    	$('#listUtilisateur').html("");
		$.ajax({
	        url: "php/script_modif_dossier.php",
	        type:'POST',
	        data:{
	            param:'list_utilisateur_and_dossier',
	            iddossier:$(this).val(),
				equipe___id:equipe___id,
	        },
	        success: function(data){
				$('#listUtilisateur').html(data);
				$('#iddossier').html($('#lstdoss').val());
				$('#affListuser').show();
				$('#listexcel').hide();
				$('#listexcel').val("");
				$('#tbdonnerexcel').html("");
				$('#countdoss').html($('#lstdoss option').size());


	        },
	    });
    })*/
 	var idlist_doss = "";
    $(document).on('click','#affListuser',function(){
   		//alert("Encours de maintenance");
		//location.reload();	
		
	 for(var i=(document.getElementById('lstdoss').options.length-1);i>=0;i--)
	        {
	        if(document.getElementById('lstdoss').options[i].selected)
	        {
	                idlist_doss += document.getElementById('lstdoss').options[i].value + ";";
	        }
	 }

    	if($('#iddossier').html() != "0"){
			$.ajax({
		        url: "php/script_modif_dossier.php",
		        type:'POST',
		        data:{
		            param:'listUser',
		            id_equipe:idlist_doss,
		        },
		        success: function(data){
					$('#listUser').html(data);
		        },
		    });
	    }
    })
    
    $(document).on('click','#ajoutafectation',function(){

    		$('.animgif').show();
	    	var tousid = "";
		$(".idlineUser").each(function(index,tr){ 
			if($('.idlineUser:eq('+index+')').find('.chck').is(':checked')){
				tousid += ";" + $('.idlineUser:eq('+index+')').find('.idU').html();
			}
		});



		$.ajax({
	        url: "php/script_modif_dossier.php",
	        type:'POST',
	        data:{
	            param:'ajoutafectation',
	            iddossier:idlist_doss,
	            touidUtilisateur:tousid,
	        },
	        success: function(data){
				location.reload();				
	        },
	    });
    })
    
    $(document).on('click','.sprU',function(){
    	$('#idaffect').html($(this).find('.idselctUser').html());
    })

	$(document).on('click','#supreaffecatation',function(){
	idlist_doss = "";
	 for(var i=(document.getElementById('lstdoss').options.length-1);i>=0;i--)
	        {
	        if(document.getElementById('lstdoss').options[i].selected)
	        {
	                idlist_doss += document.getElementById('lstdoss').options[i].value + ";";
	        }
	 }
		var id_affectation = $('#idaffect').html();
		$.ajax({
	        url: "php/script_modif_dossier.php",
	        type:'POST',
	        data:{
	            param:'supreaffecatation',
			idlist_doss:idlist_doss,	
	            id_affectation:id_affectation,
				equipe_id:equipe___id,
				
	        },
	        success: function(data){
			$('#lstdoss').change();
	        },
	    });
    	
    })    


    $(document).on('click','#saveListdossier',function(){
	if(parseInt($('#tbdonnerexcel br').size()) > 65){
		alert("import liste dossiers doivent inferieur ou egale 65");
		return;		
	}
	
    	$.ajax({
	        url: "php/script_modif_dossier.php",
	        type:'POST',
	        data:{
	            param:'ListdossierAjout',
	            list:$('#tbdonnerexcel').html(),
	            equipe_id:equipe___id,
	        },
	        success: function(data){
				$('.close').click();
				location.reload();
	        },
	    });
    })
var str = "{ name: 'world',}";
var json = JSON.stringify(eval("(" + str + ")"));
	$.contextMenu({
            selector: '.context-menu-one', 
            callback: function(key, options) {
                var m = key;
		idlist_doss  = "";
		var dnom = "";
		 for(var i=(document.getElementById('lstdoss').options.length-1);i>=0;i--)
	        	{
		        if(document.getElementById('lstdoss').options[i].selected)
	 	       {
	                idlist_doss += document.getElementById('lstdoss').options[i].value + ";";
			 dnom += document.getElementById('lstdoss').options[i].text + ";";

	        	}
		}
		if(m == "fold1"){
			var ttab = "";
			//alert(idlist_doss); 

			$("#chkequipe option").each(function(){
		   	var opSelected = $(this).attr('data-value');
			ttab += "<tr><td class='id_e' style='display:none'>"+ opSelected +"</td><td>"+ $(this).val() + '</td><td><input class="form-check-input exampleRadios1" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></td></tr>';
			})
			$("#tsequipe").html("<textarea class='form-control' id='exampleFormControlTextarea1' rows='3' disabled>"+dnom +"</textarea><b style='color:red'> Deplacer vers : </b><div style='overflow:auto;height:450px'><table>"+ ttab  + "</table></div>");
			$('#btnequippop').click();
		}
              
            },
            items: {
            "fold1": {
                "name": "transferer", "icon": "edit"  },
            "sep1": "---------",
            "quit": {"name": "Quitter", "icon": "quit"},

     
        }
    });

	var id_equi_transfert = "";

	$(document).on('click','#validtransfer',function(){
		$.ajax({
	        url: "php/script_modif_dossier.php",
	        type:'POST',
	        data:{
	            param:'transfert_dossier',
	            idlist_doss:idlist_doss,
	            id_equi_transfert:id_equi_transfert,
	        },
	        success: function(data){
			$('.close').click();
			location.reload();

	        },
	    });

	
	})
	
	
	$(document).on('change','.exampleRadios1',function(){
		id_equi_transfert = "";
		id_equi_transfert = $(this).closest('tr').find('.id_e').html();
	})


})

