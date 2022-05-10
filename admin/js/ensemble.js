	
$(function(){
	$(document).on('dblclick','.dtensemble',function(){
      if($(this).html().substring(0,1) == "<"){return;}
      var valeur = $(this).html();
      var object = '<div class="input-group date" data-provide="datepicker">'+
        '<input class="dateInput txtdtensemble" type="text" class="form-control" value="' + valeur +'">'+
                  '<button  class="btn-warning Anlr">X</button><div class="input-group-addon"><span class="glyphicon glyphicon-th"></span>'+
                  '</div></div>';
       $(this).html(object);
      $('.txtdatecoloture').focus();
   })


	$(document).on('keyup','.txtdtensemble',function(e){

      if(e.keyCode == 13){
         $(this).closest('td').html($(this).val());
         $('.datepicker').hide();
      }
   	})


  $(document).on('click','.Anlr',function(){
      

      keyupfrm($('#tva_trim'));
      keyupfrm($('#acpmpte_is'));
      keyupfrm($('#cvae'));
      keyupfrm($('#tvs'));
      keyupfrm($('#actpe_tva_st'));
      keyupfrm($('#tva_mensuel'));
  })

function keyupfrm(frm){
    if(frm.html() != "undefined")
        {
          var e = jQuery.Event("keyup");
          e.which = 13; 
          e.keyCode = 13
          $('.txtdtensemble').val("");
          $('.txtdtensemble').trigger(e);
    }
}

$(document).on('click','.input-group-addon',function(){
  alert("k");
})

   	$(document).on('dblclick','.cmtensemble',function(){
        if($(this).html().substring(0,1) == "<"){return;}
        $(this).html('<div class="form-group"><textarea class="form-control txtareacmtensemble"' +
          'rows="5">' + $(this).html() +'</textarea>'+
          '</div><div class="text-center"><button class="validerobservation btn-primary">Enregistrer</button></div>');
        $('#comment').focus();
      })

   	$(document).on('click','.validerobservation',function(){
         $(this).closest('td').html($('.txtareacmtensemble').val());
    })

   $(document).on('dblclick','.dtnumberensembe',function(){
      if($(this).html().substring(0,1) == "<"){return;}
      var valeur = $(this).html().replace("€","").trim();
      var object = '<div class="container-fluid form-control"><input type="number" size = "60" min="0" max="3120123202" id="tensmeblenumber"  value= "'+ valeur +'"></div>';
       $(this).html(object);
       $(this).focus();
   })


     $(document).on('keypress','#tensmeblenumber',function(e){
      if(e.keyCode == 13){
         $(this).closest('td').html($(this).val());
      };
   	})

})