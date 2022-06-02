$(function(){
	var id_equipe = "0";
	function listequipe(){
	    $.ajax({
	        url: "php/script_equipe.php",
	        type:'POST',
	        data:{
	            param:'ListEquipe',
	        },
	        success: function(data){
				//console.log(data);
				$('.chkequipe').html('<datalist id="chkequipe">' + data + '</datalist><input list="chkequipe" id="myoptions">');
	        },
	    });
    }
	listequipe();

	$(document).on('change','#myoptions',function(){
		var element_input = document.getElementById('myoptions');
	    var element_datalist = document.getElementById('chkequipe');
	    var opSelected = element_datalist.querySelector(`[value="${element_input.value}"]`);
	    var id = opSelected.getAttribute('data-value');
	    id_equipe = id
	})

	$(document).on('click','#myoptions',function(){
		$(this).val("");
		
	})

	$.ajax({
        url: "php/script_utilisateur.php",
        type:'POST',
        data:{
            param:'ListPays',
        },
        success: function(data){
			//console.log(data);
			$('.chkpays').html('<select name="utilise" id="chkpays" ><option value="0"></option>' + data + '</select>');
        },
    });

    $.ajax({
        url: "php/script_utilisateur.php",
        type:'POST',
        data:{
            param:'ListPostes',
        },
        success: function(data){
			//console.log(data);
			$('.chcpost').html('<select name="utilise" id="chcpost" ><option value="0"></option>' + data + '</select>');
        },
    });




$(document).on('click','#btnOk',function(){
	var nom = $('#txtnom').val();
	var prenom = $('#txtprenom').val();
	var txtmat = $('#txtmat').val().toUpperCase();
	var login = $('#txtlogin').val();
	var paasword = $('#txtpassword').val();
	var pays = $('#chkpays').val();
	var poste = $('#chcpost').val();
	var sexe = $('#sexe').val();
	var date_de_naissance = $('#date_naissance').val();
	var date_d_entree = $('#dt_entrer').val();
	var supervision = $('#sup_select').val();
	var niveau_etp = $('#niveau_etp').val();

		if(parseInt($('#chkpays').val()) != 2){
		if(nom == "" || prenom == "" || txtmat == "" || login == "" || paasword == "" || pays == "0" || poste == "0" || sexe == "" || date_de_naissance == "" || 
		date_d_entree == "" || supervision == "" || niveau_etp == "" ){
			alert("Attention les champs ne doivent être vide !");
			return;
		}
	}


	$.ajax({
        url: "php/script_utilisateur.php",
        type:'POST',
        data:{
            param:'add',
			 nom: nom,
			 prenom: prenom,
			 txtmat:txtmat,
			 login: login,
			 paasword: paasword,
			 pays: pays,
			 poste: poste,
			 sexe: sexe,
			 date_de_naissance: date_de_naissance,
			 date_d_entree: date_d_entree,
			 supervision: supervision,
			 niveau_etp: niveau_etp,
			
        },
        success: function(data){
	if(data == "bien"){
		location.reload();	
	}else{
		alert(data);
	}
	
		
        },
    });
})

	
  $(document).on('click','#valideimport',function(){
    $('.nom').each(function(index){
             	$.ajax({
	        url: "php/script_utilisateur.php",
	        type:'POST',
	        data:{
	            param:'addinport',	
				nom:$('.nom:eq('+index+')').html(),
				login:$('.login:eq('+index+')').html(),
				password:$('.password:eq('+index+')').html(),
				poste:$('.poste:eq('+index+')').html(),
				pays:$('.pays:eq('+index+')').html(),
	        },
	        success: function(data){
	        },
	    })
    	}) 
		$('.close').click();
 	})

})