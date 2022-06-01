$(function(){

    $(document).on('keyup','.td_keyup', function(){
        $('#recherche_id_nm').html("");
        if($(this).closest("tr").find("td_keyup").html() != ""){
        $.ajax({
            url: "php/script_parametList.php",
            type:'POST',
            dataType:'json',
            data:{
                param:'cherche_manag',
                valeur:$(this).closest("tr").find(".td_keyup").html()
            },
            success: function(data){
                console.log(data);
                if(data.length > 0){
                        $('#recherche_id_nm').html(data[0].id + " --- " + data[0].nom);
                }
                
           },
        });
    }
    })


    $(document).on('keyup','#cherche_manag_vrai', function(){
        $('#recherche_vrai').html("");
        if($(this).val() != ""){
        $.ajax({
            url: "php/script_parametList.php",
            type:'POST',
            dataType:'json',
            data:{
                param:'cherche_manag_vrai',
                valeur:$(this).val()
            },
            success: function(data){
                console.log(data);
                if(data.length > 0){
                    var zzz = "";
                    for(var x = 0; x < data.length; x++){
                        zzz += "<tr class='click_choix3'><td class='click_choix_id3'>"+data[x].id_fr+"</td><td>"+data[x].nom_fr+"</td></tr>  "
                        $('#recherche_vrai').html(zzz);
                    }
                    
                }
                
           },
        });
    }
    })

    $(document).on('click','.click_choix3', function(){
        $("#cherche_manag_vrai").val($(this).closest("tr").find('.click_choix_id3').html());       
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
        if(parseInt($("#cherche_manag").val()) > 0 && parseInt($("#cherche_sup_karlit").val()) > 0 && parseInt($("#cherche_manag_vrai").val()) > 0 ){
        $.ajax({
            url: "php/script_parametList.php",
            type:'POST',
            data:{
                param:'valide_sss',
                valeur1:$("#cherche_sup_karlit").val(),
                valeur2:$("#cherche_manag").val(),
                valeur3:$("#cherche_manag_vrai").val(),
            },
            success: function(data){
               alert(" valide bien !");
               location.reload();

           },
        });
    }
    })

    $(document).on('click','.delet_liaison', function(){
        if($('#recherche_id_nm').html() != ""){
        $(this).closest("tr").find('.td_keyup').html($('#recherche_id_nm').html().split(" ")[0])
    }else{
        alert("attention recherche invalide")
        return;
    }
        if(parseInt($(this).closest("tr").find('.id_sukpr').html()) > 0){

            let text = "Enregistrer OK or Cancel.";
            if (confirm(text) == true) {
                $.ajax({
                    url: "php/script_parametList.php",
                    type:'POST',
                    data:{
                        param:'valide_insertion',
                        valeur1:$(this).closest("tr").find('.id_sukpr').html(),
                        valeur2:$(this).closest("tr").find('.td_keyup').html(),
                    },
                    success: function(data){
                       location.reload();        
                   },
                });
            } else {
              
            }


       
    }
    })

    
    
})