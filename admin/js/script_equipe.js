 $(function(){
	 $('.animgif').hide();
	var id_equipe = ""; 
	var id_user = "";
	var id_equipe = 0; 
	//var id_user = 0;

$(document).on('change','#myoptions',function(){
	var element_input = document.getElementById('myoptions');
    var element_datalist = document.getElementById('chkequipe');
    var opSelected = element_datalist.querySelector(`[value="${element_input.value}"]`);
    var id = opSelected.getAttribute('data-value');
    id_equipe = id
})
	$(document).on('change','#myoptions',function(){
		var element_input = document.getElementById('myoptions');
	    var element_datalist = document.getElementById('chkequipe');
	    var opSelected = element_datalist.querySelector(`[value="${element_input.value}"]`);
	    var id = opSelected.getAttribute('data-value');
	    id_equipe = id
	})

$(document).on('change','#useroptions',function(){
	var element_input = document.getElementById('useroptions');
    var element_datalist = document.getElementById('chkuser');
    var opSelected = element_datalist.querySelector('[value="${element_input.value}"]');
    var id = opSelected.getAttribute('data-value');
    id_user = id
})
	/*$(document).on('change','#useroptions',function(){
		var element_input = document.getElementById('useroptions');
	    var element_datalist = document.getElementById('chkuser');
	    var opSelected = element_datalist.querySelector(`[value="${element_input.value}"]`);
	    var id = opSelected.getAttribute('data-value');
	    id_user = id
	})*/

$(document).on('click','#annuler',function(){
	//alert(id_equipe);
})
	$(document).on('click','#annuler',function(){
		
	})

    $("#chkequipe").change(function(){         
        $(".timeTextBox").val($(".editableBox option:selected").html());
    });
	$("#chkequipe").change(function(){         
	    $(".timeTextBox").val($(".editableBox option:selected").html());
	});


$(document).on('click','#btnOk',function(){
	var txtnom = $('#txtnom').val();
	var txtprenom = $('#txtprenom').val(); 
	var txtmail = $('#txtmail').val();
	var txtcode = $('#txtcode').val();

		if(txtnom == "" || txtprenom == "" || txtmail == "" || txtcode == "" )
		{ 
			alert("Une champ ne doit être vide !"); 
			return;
		}
	
	$.ajax({
        url: "php/script_equipe.php",	
        type:'POST',
        data:{
            param:'addequipe',	
			Otxtnom:txtnom,
			Otxtprenom:txtprenom,
			Otxtmail:txtmail,
			Otxtcode:txtcode,
        },
        success: function(data){
			$('#txtnom').val("");
			$('#txtprenom').val(""); 
			$('#txtmail').val("");
			$('#txtcode').val("");
			listequipe();
			return;
        },
    });
})

	$(document).on('click','#btn_doss',function(){
		if(id_equipe > 0 && $('#txtnamedoss').val() != "")
		{
			$.ajax({
		        url: "php/script_equipe.php",
		        type:'POST',
		        data:{
		            param:'Adddossier',
		            idequipe:id_equipe,
		            nomdossier:$('#txtnamedoss').val(),
		        },
		        success: function(data){
			if(data.length > 10){
				$('#corp_message').html(data);
					startBlink();
				$('#message_erreur').click();
				return;
			}else{
					$('#txtnamedoss').val("");
					$('#txtnamedoss').focus();
					id_equipe = 0; 
					location.reload();
					}
		        },
		    });

	    }else{
	    	alert("equipe ou utilisateur vide ! ");

	    }
	})

function startBlink(){
       window.blinker = setInterval(function(){
           if(window.blink){
              $('.blink').css('color','red');
              window.blink=false;
            }
           else{
               $('.blink').css('color','yellow');
               window.blink = true;
           }
       },1000);
     }


})