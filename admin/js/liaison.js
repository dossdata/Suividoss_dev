$(function(){

    $(document).on('keyup','#cherche_manag', function(){
        $('#recherche').html("");
        if($(this).val() != ""){
        $.ajax({
            url: "php/script_parametList.php",
            type:'POST',
            dataType:'json',
            data:{
                param:'cherche_manag',
                valeur:$(this).val()
            },
            success: function(data){
                if(data.length > 0){
                    var zzz = "";
                    for(var x = 0; x < data.length; x++){
                        zzz += "<tr class='click_choix'><td class='click_choix_id'>"+data[x].id_fr+"</td><td>"+data[x].nom_fr+"</td></tr>  "
                        $('#recherche').html(zzz);
                    }
                    
                }
                
           },
        });
    }
    })

    
    $(document).on('click','.click_choix', function(){
        $("#cherche_manag").val($(this).closest("tr").find('.click_choix_id').html());       
    })


    $(document).on('keyup','#cherche_sup_karlit', function(){
        $('#recherche2').html("");
        if($(this).val() != ""){
        $.ajax({
            url: "php/script_parametList.php",
            type:'POST',
            dataType:'json',
            data:{
                param:'cherche_manag_2',
                valeur:$(this).val()
            },
            success: function(data){
                if(data.length > 0){
                    var zzz = "";
                    for(var x = 0; x < data.length; x++){
                        zzz += "<tr class='click_choix2'><td class='click_choix_id2'>"+data[x].id_mada+"</td><td>"+data[x].nom_mada+"</td></tr>  "
                        $('#recherche2').html(zzz);
                    }
                    
                }
                
           },
        });
    }
    })

    

    $(document).on('click','.click_choix2', function(){
        $("#cherche_sup_karlit").val($(this).closest("tr").find('.click_choix_id2').html());       
    })

    $(document).on('click','#valide_valide', function(){
        $('#recherche2').html("");
        if(parseInt($("#cherche_manag").val()) > 0 && parseInt($("#cherche_sup_karlit").val()) > 0 ){
        $.ajax({
            url: "php/script_parametList.php",
            type:'POST',
            data:{
                param:'valide_sss',
                valeur1:$("#cherche_sup_karlit").val(),
                valeur2:$("#cherche_manag").val()
            },
            success: function(data){
               alert(" valide bien !");
               location.reload();

           },
        });
    }
    })

    $(document).on('click','.delet_liaison', function(){
        
        if(parseInt($(this).closest("tr").find('.id_sukpr').html()) > 0){

            let text = "Surprimer OK or Cancel.";
            if (confirm(text) == true) {
                $.ajax({
                    url: "php/script_parametList.php",
                    type:'POST',
                    data:{
                        param:'supre',
                        valeur1:$(this).closest("tr").find('.id_sukpr').html(),
                    },
                    success: function(data){
                       alert(" supre ok  !");
                       location.reload();
        
                   },
                });
            } else {
              
            }


       
    }
    })

    
    
})