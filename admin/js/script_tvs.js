$(function(){
	$('.animgif').hide();
	var index = "";
	var colomns = "";


      $.ajax({
           url: "php/script_tvs.php",
           type:'POST',
           data:{
               param:'recupre_ligne_acompte_tva_st',
           },
           success: function(data){
            var rep = data.split(";");
            $('#tvs td:eq(1)').html(rep[0]);
            $('#tvs td:eq(2)').html(rep[1].replace(" 00:00:00",""));
            $('#tvs td:eq(3)').html(rep[2].replace(" 00:00:00",""));
            $('#tvs td:eq(4)').html(rep[3].replace(" 00:00:00",""));
            $('#tvs td:eq(5)').html(rep[4].replace(" 00:00:00",""));
            $('#tvs td:eq(6)').html(rep[5].replace(" 00:00:00",""));
            $('#tvs td:eq(7)').html(rep[6]);
           },
       });


	$(document).on('keyup','.txtdtensemble',function(e){
      if(e.keyCode == 13){
        var startDate = new Date($(this).val());
        var endDate = new Date();

         if (startDate <= endDate){
        }else{
          $(this).closest('td').html("");
        }
        
         index = $(this).closest('td').index();
  			valide($(this).val());
      	}
   	})

	$(document).on('keypress','#tensmeblenumber',function(e){
      if(e.keyCode == 13){
         index = $(this).closest('td').index();
         $(this).closest('td').html($(this).val() + " €")
  			   valide($('.dtnumberensembe').html());
      	}
   	})
   	

	function valide(valeur){
		 if(index == "1"){colomns = "montant";}
	     if(index == "2"){colomns = "date_cvae_karlit";}
	     if(index == "3"){colomns = "date_envoie_client";}
	     if(index == "4"){colomns = "date_de_validation_client";}
	     if(index == "5"){colomns = "date_teletransmission";}
	     if(index == "6"){colomns = "date_validation_edi";}
	     if(index == "7"){colomns = "commentaire";}

	      $.ajax({
	           url: "php/script_tvs.php",
	           type:'POST',
	           data:{
	               param:'saveligne_acompte',
	               colomns:colomns,
	               valeur:valeur,
	           },
	           success: function(data){
	            $('.animgif').fadeIn();
               	$('.animgif').fadeOut(200);
	           },
	       });
	}


   	$(document).on('click','.validerobservation',function(){
		index = $(this).closest('td').index();
  		valide($('.txtareacmtensemble').val());
    })


})