$(function(){
    var valeur = "";
    var valeur_list_post = "";
    var valeur_equipe = "";
    var id_us = "";
    var index_click = "";
    var tet_datatable = 
    '<table id="datatablesituation" class="table-bordered display text-center" width="100%">'+
    '<thead class="th_databale">'+
    '<tr>'+
    '<th>NUMERO</th>'+
    '<th>NOM MACHINE</th>'+
    '<th>MATRICULE</th>'+
    '<th>NOM</th>'+
    '<th>POSTE</th>'+
    '<th>EQUIPE</th>'+
    '<th>MOT DE PASSE</th>'+
    '<th>#</th>'+
    '<th style="display:none">id</th>'+
    '</tr>';

    tablelist();

    function tablelist(){

        $.ajax({
            url:'php/gestion_domaine.php',
            type:'POST',
            dataType:'json',
            data:{
                param:'list_domaine',
            },
            success: function(data) {
                $.each(data, function(index, value) { 
                    valeur+= "<tr class='tr_list_general'>"+
                    "<td>"+ index +"</td>"+
                    "<td data-toggle='modal' data-target='#modifsituationportfeuil'>PK-"+ value.matricule.substring(1,value.matricule.leght) +"</button></td>"+
                    "<td data-toggle='modal' data-target='#modifsituationportfeuil'>"+value.matricule+"</button></td>"+
                    "<td class='edit_list'>"+value.nom+"</td>"+
                    "<td>" + value.poste +"</td>"+
                    "<td class='ndoss' style='white-space:nowrap'>" + value.equipe + "</td>"+ 
                    "<td class='ndoss' style='white-space:nowrap'>"+ value.mdp  + "</td>"+
                    "<td data-toggle='modal' data-toggle='modal' data-target='#exampleModalCenter' class='edit_line' style='cursor:pointer;white-space:nowrap'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></td>"+
                    "<td class='ndoss' style='white-space:nowrap;display:none'>" + value.id + "</td>"+
                    "</tr>";
                });
                $('#datatable_situation').html(
                    tet_datatable + "<tbody>" + valeur + "</tbody></table>");
                $('#datatable_situation').css({'zoom':'80%'});
                recuper_list_poste();
            },
        })  

}


function datatable(){
        // Setup - add a text input to each footer cell
        if($("#valeur_poste").html() != "" && $("#valeurequipe").html() != "" ){
        $('#datatablesituation thead tr').clone(true).appendTo( '#datatablesituation thead' );
        $('#datatablesituation thead tr:eq(1) th').each( function (i) {
            var title = $(this).text();
            if(i == 0)$(this).html("");
            if(i == 1 || i == 2 || i == 5 || i == 3 || i == 6)$(this).html("<input type='text' class='stsearch'>");
            if(i == 4)$(this).html("<select class='txtserach'><option></option>"+valeur_list_post+"</select>");

            $( '.txtserach,.stsearch,.txequip', this ).on( 'keyup change', function () {
                if ( table.column(i).search() !== this.value ) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
                
            });
        } );
        }
    

   var table = $('#datatablesituation').DataTable( {
            orderCellsTop: true,
            scrollY:        screen.height / 1.6,
            scrollX:        screen.width,
            deferRender:    true,
            scroller:       true,
            filter: true,
            "paging": false
        });
    }

    function recuper_list_poste(){
        $.ajax({
            url:'php/gestion_domaine.php',
            type:'POST',
            dataType:'json',
            data:{
                param:'list_poste',
            },
            success: function(data) {
                $.each(data, function(index, value) { 
                    valeur_list_post+= '<option value="'+value.nom+'">'+value.nom+'</option>';
                });
                $('.valeur_poste').html("<select class='form-control m_vp'><option></option>"+valeur_list_post+"</select>");
                $('.s_poste').html("<select class='form-control spost'><option></option>"+valeur_list_post+"</select>");
                
                recuper_equipe();
            },
        })  
    }

    function recuper_equipe(){
        $.ajax({
            url:'php/gestion_domaine.php',
            type:'POST',
            dataType:'json',
            data:{
                param:'list_equipe',
            },
            success: function(data) {
                $.each(data, function(index, value) { 
                    valeur_equipe+= '<option value="'+value.code+'">'+value.code+'</option>';
                });
               
                datatable();
            },
        })  
    }

$(document).on('click','.tr_list_general',function(){
    id_us = $(this).closest('tr').find('td:eq(8)').html();
    index_click = $(this).index();
    var matricule = $(this).closest('tr').find('td:eq(2)').html();
    var nom = $(this).closest('tr').find('td:eq(3)').html();
    var poste = $(this).closest('tr').find('td:eq(4)').html();
    var equip = $(this).closest('tr').find('td:eq(5)').html();
    var mdp = $(this).closest('tr').find('td:eq(6)').html();

    $('.m_matricule').val(matricule);
    $('.m_nom').val(nom);
    $('.m_vp').val(poste);
    $('.m_v_e').val(equip);
    $('.m_mdp').val(mdp);    
})

$(document).on('click','#ajoutaffiche',function(){
    $('.a_matricule').val("");
    $('.a_nom').val("");
    $('.spost').val("");
    $('.sxequip').val("");
    $('.a_mdp').val("");    
    $('.a_matricule').focus();
})

$(document).on('click','#sav_nouveau',function(){
    var matricule = $('.a_matricule').val();
    var nom = $('.a_nom').val();
    var post = $('.spost').val();
    var equip = $('.sxequip').val();
    var mdp = $('.a_mdp').val();
  
    if(matricule != "" && nom != "" & post != "" && equip != "" && mdp != ""){
        $.ajax({
            url:'php/gestion_domaine.php',
            type:'POST',
            data:{
                param:'ajout_user',
                matricule:matricule,
                nom:nom,
                post:post,
                equip:equip,
                mdp:mdp,
            },
            success: function(data) {
                if(data == "AJOUT"){
                    location.reload();    
                }else{
                    alert("ATTENTION MATRICULE EXISTANT");
                }
            },
        })  


    }else{
        alert("CHAMP NE DOIT ETRE VIDE ");
    }
})


$(document).on('click','#savemodif',function(){
    //alert(id_us); id modifier
    //alert(index_click); index click
    var matricule = $('.m_matricule').val();
    var nom = $('.m_nom').val();
    var post = $('.valeur_poste:eq(1) > .m_vp').val();
    var equip = $('.m_v_e').val();
    var mdp = $('.m_mdp').val();

    if(matricule != "" && nom != "" & post != "" && equip != "" && mdp != ""){
        $.ajax({
            url:'php/gestion_domaine.php',
            type:'POST',
            data:{
                param:'modif_user',
                matricule:matricule,
                nom:nom,
                post:post,
                equip:equip,
                mdp:mdp,
                id:id_us             
            },
            success: function(data) {
                if(data == "modif_ok"){
                    location.reload();
                }
            },
        })  

    }else{
        alert("misy vida ah ");
    }
})



})