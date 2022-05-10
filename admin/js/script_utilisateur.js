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


$(document).on('keyup','#txtnom',function(){
	$('#txtlogin').val($(this).val());
	$('#txtpassword').val($(this).val());
});

$(document).on('click','#btnOk',function(){
	var txtnom = $('#txtnom').val();
	var txtprenom = $('#txtprenom').val(); 
	var txtlogin = $('#txtlogin').val();
	var txtpassword = $('#txtpassword').val();
	var chkpays = $('#chkpays').val();
	var chcpost = $('#chcpost').val();
	var chkmodifdoss = $('#chkmodifdoss').is(":checked");
	var chksuprdoss = $('#chksuprdoss').is(":checked");
	var chksmodifequip = $('#chksmodifequip').is(":checked");
	var chksuprequip = $('#chksuprequip').is(":checked");
	var chkmodifprofil = $('#chkmodifprofil').is(":checked");
	var chkvisualisation = $('#chkvisualisation').is(":checked");

	$.ajax({
        url: "php/script_utilisateur.php",
        type:'POST',
        data:{
            param:'add',	
			Otxtnom:txtnom,
			Otxtprenom:txtprenom,
			Otxtlogin:txtlogin,
			Otxtpassword:txtpassword,
			Ochkpays:chkpays,
			Ochcpost :chcpost,
			Ochkmodifdoss :chkmodifdoss,
			Ochksuprdoss:chksuprdoss,
			Ochksmodifequip:chksmodifequip,
			Ochksuprequip :chksuprequip,
			Ochkmodifprofil:chkmodifprofil,
			Ochkvisualisation:chkvisualisation,	
		
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