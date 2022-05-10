$(function() {
	$('#mail').focus();
	$("#indimdpt").hide();
	$(document).on('click','#btnOk',function(){
		validemdp();
	})

	function validemdp(){

			$.ajax({
            url: "php/login.php",
            type:'POST',
            data:{
                param:'login',	
				txtlogin:$('#mail').val(),
				txtpassword:$('#password').val(),					
            },
            success: function(data){
				console.log(data);
    				if(data > 0){
					if(data == "48")
					{
						window.location.href = "acceuil.php"; 
					}else{
						window.location.href = "situation_par_portfeuil.php";
					}
				}else{
					$('#indimdpt').fadeOut(100);
					$('#indimdpt').fadeIn(100);
				}
            },
        });
	}

	$(document).on('keyup','#password',function(e){
		if(e.keyCode == "13"){
			validemdp();
		}
	})
	
})