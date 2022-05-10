$(function(){
    row_situation = "";
    var monthName=['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    var tet_datatable = 
    '<table id="datatablesituation" style="width:100%" class="table-bordered display text-center" width="100%">'+
    '<thead class="th_databale">'+
    '<tr>'+
    '<th class="in_visible ">#</th>'+
    '<th class=" in_visible">#</th>'+
    '<th class=""></th>' +
    '<th>dossier</th><th class="">sit_dossier</th><th class="in_visible">cmt</th><th>cloture</th><th class="in_visible">rg_d_imp1</th><th class="in_visible">rg_d_imp2</th>'+
    '<th class="">frm_jrdq</th><th class="in_visible">dp_coala</th><th>regime tva</th><th class="in_visible">dt_ech</th><th class="">sit_karlit</th><th class="">date_maj</th>'+
    '<th class="">etat_bl</th><th class="">dt_d_envoie_bl_krlt</th><th class="in_visible">cdm</th><th class="in_visible">dt_rev_sup_fr</th><th class="in_visible">obs_sup_fr</th><th class="">dernier_pes</th>'+
    '<th class="">dernier_relance</th><th class="">dernier_appel_client</th></th>'+
    '<th class="in_visible">id_situation</th>' +
    '<th class="in_visible">id_dossier</th>' +

    '<th class="">Activité</th>' +
    '<th class="">social</th>' +
    '<th class="">tns</th>' +
    '<th class="">releve</th>' +
    '<th class="">commentaire_releve</th>' +
    '<th class="">achat</th>' +
    '<th class="">vente</th>' +
    '<th class="">commentaire_et_autre</th>' +
    '</tr><thead><tbody>';

    var virtuel_tet_datatable = 
    '<thead class="th_databale"><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>'+
    '<th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th>'+
    '<th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th>'+
    '<th>18</th><th>19</th>' +    
    '<tbody id="tbody_virtuel">';                

$(document).on('click','#btn-lancer',function(){
var equipeselectionnes =  $('.customselect-list:eq(0) > .customselect-dropdown-text:eq(0)').html().trim().replace(/ /g,"");
$('#btn_opt').hide(100);
$('#tab_declaration').hide(100);

if(equipeselectionnes == "votreequipe"){
    alert("Selectionnez un Equipe svp !");
    return;
}
var array = equipeselectionnes.split('|');
var resultatidequipe = "";
var idEquipe = "";
var Annee = "";

if(equipeselectionnes == "Tousselectionnée"){
    $('#single_equipe').each(function(index,val2){
            resultatidequipe +=  $(this).val()
    })         
}

    $.each(array,function(index,value){
        $('#single_equipe > option').each(function(indexf,val2f){
            if($(this).text() == value){
                resultatidequipe += $(this).val() + "#";
            }
        })
    })
    idEquipe = resultatidequipe.replace(/\,/g,"#").replace(/\=\"\}"/g,"");


    var anneeselectionnes =  $('.customselect-list:eq(1) > .customselect-dropdown-text:eq(0)').html().trim().replace(/ /g,"");
    if(anneeselectionnes == "choisissezexercice(s)"){
        alert("Selectionnez un Exercice svp !");
        return;
    }
    var arrayanne = anneeselectionnes.split('|');
    var resultatidanne = "";
    if(anneeselectionnes == "Tousselectionnée"){
        $('#anne_equipe').each(function(index,val2){
                resultatidanne +=  $(this).val()
        })         
    }

    $.each(arrayanne,function(indexs,valueannee){
        $('#anne_equipe > option').each(function(indexs,val2s){
            if($(this).text() == valueannee){
                resultatidanne += $(this).val() + "#";
            }
        })

    })
Annee = resultatidanne.replace(/\,/g,"#").replace(/\=\"\}"/g,"");

$('#datatable_situation').html("");
$('#loading').show();

$.ajax({
    url: "route_Situation_portfeuille.php",
    type: 'POST',
    dataType:'json',
    data: {
        param:'list_general',
        id: idEquipe,
        annee: Annee,
    },
    success: function(data) {
        $('#datatablesituation').DataTable().clear().destroy(); 
        valeur = "";
        for(var i = 0; i < data.length; i++){
            valeur += "<tr class='tr_list_general'>"+
            "<td class='in_visible'><button><i class='fas fa-eye' ></i></button></td>"+
            "<td class='edit_list in_visible '><button  data-toggle='modal' data-target='#viewsuivie'><i class='fas fa-edit'></i></button></td>"+
            "<td class=''>"+ data[i].code +"</td>"+
            "<td class='n_dosss'>" + data[i].dossier + "</td><td class='st_doss_n'>" + data[i].sit_dossier +
            "</td></td><td class='in_visible'>" + data[i].cmt + "</td></td><td class='dt_clot'>" + 
            data[i].cloture + "</td></td><td class='in_visible'>" + data[i].rg_d_imp1 +  "</td>"+
            "<td class='in_visible'>" + data[i].rg_d_imp2 + "</td><td class=''>" + data[i].frm_jrdq + 
            "</td></td><td class='in_visible'>" + data[i].dp_coala +  "</td></td><td class=''>" + data[i].regime +
            "</td></td><td class='in_visible'>" + data[i].dt_ech +  "</td>"+
            "<td class=''>" + data[i].sit_karlit + "</td><td class=''>" + data[i].date_maj + "</td></td><td class='etat_bll'>" +
            data[i].etat_bl +  "</td></td><td class=''>" + data[i].dt_d_envoie_bl_krlt + 
            "</td></td><td class='in_visible'>" + data[i].cdm +  "</td>"+
            "<td class='in_visible'>" + data[i].dt_rev_sup_fr + "</td><td class='in_visible'>" + data[i].obs_sup_fr + 
            "</td></td><td  class=' dt_dern_pes'>" + data[i].dernier_pes +  "</td></td><td class=' dt_dern_relance'>"
            + data[i].dernier_relance +  "</td></td><td class=' dr_app_client'>" + data[i].dernier_appel_client +  "</td>"+
            "<td class='situation_portfeuil_id  in_visible'>"+data[i].situation_portfeuil_id+"</td>"+
            "<td class='id_dossier in_visible'>"+data[i].id_dossier+"</td>"+                    

            "<td class=''>"+data[i].Activite_final+"</td>"+ 
            "<td class=''>"+data[i].social+"</td>"+ 
            "<td class=''>"+data[i].tns+"</td>"+ 
            "<td class=''>"+data[i].releve+"</td>"+ 
            "<td class='truncate'>"+data[i].commentaire_releve+"</td>"+ 
            "<td class=''>"+data[i].achat+"</td>"+ 
            "<td class=''>"+data[i].vente+"</td>"+ 
            "<td class='truncate'>"+data[i].commentaire_et_autre+"</td>"+ 

            "</tr>";
            valeur = valeur.replace(/null/g,"").replace(/ 00:00:00/g,"");
        }
        
        $('#datatable_situation').html(tet_datatable + valeur + "</tbody></table>");
        $('#datatable_situation').css({'zoom':'80%'});
        datatable();
        //$('#datatablesituation_wrapper, #table_tabs').show(300);
        $('#datatable_situation thead:eq(1)').html("");   
        $('#tablvirtuel_suivie').html("<table id='table_export_virtuel'>" + virtuel_tet_datatable + valeur+"</tbody></table>");
        $('#loading').hide();
        //$('#tab_declaration').show(100);
        //$('.tr_list_general:eq(0)').click();
        
    },
});


})


function datatable(){
// Setup - add a text input to each footer cell
$('#datatablesituation thead tr').clone(true).appendTo( '#datatablesituation thead' );
$('#datatablesituation thead tr:eq(1) th').each( function (i) {
    var title = $(this).text();
    $(this).html( '<input type="text" class="txtserach"/>' );
    var title = $(this).text();
    if (i == 0 || i == 1 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 10 || i == 11 
        || i == 14 || i == 15 || i == 16 || i == 17 || i == 18 || i == 19 || i == 20 || i == 21 || i == 22
        || i == 23 || i == 24 || i == 25 || i == 26 || i == 27 || i == 28 || i == 30 || i == 31
        
        ) {
        if (i == 0) $(this).html("");
        if (i == 1) $(this).html("");
        if (i == 4) $(this).html($('#sit_dossier').html());
        if (i == 6 || i == 14 || i == 16 || i == 17  || i == 18 || i == 19 || i == 20
            || i == 21 || i == 22) $(this).html("<input type='date' class='stsearch'>");
            if (i == 26) $(this).html("<select class='stsearch'><option value=''></option><option value='OUI'>OUI</option><option value='NON'>NON</option><option value='CLIENT'>CLIENT</option></select>");
            if (i == 27) $(this).html("<select class='stsearch'><option value=''></option><option value='OUI'>OUI</option><option value='NON'>NON</option></select>");
            if (i == 28) $(this).html("<select class='stsearch'><option value=''></option><option value='COMPLET'>COMPLET</option><option value='MANQUE'>MANQUE</option><option value='EN ATTENTE'>EN ATTENTE</option></select>");
        if (i == 11) $(this).html($('#tva_regime').html());
        if (i == 15) $(this).html($('#etat_bilan').html());
        if (i == 30 || i == 31 ) $(this).html(
        "<select class='stsearch'><option value=''></option><option value='COMPLET'>COMPLET</option><option value='MANQUE'>MANQUE</option><option value='EN ATTENTE'>PARTIEL</option></select>"
        );

    } else {
        $(this).html('<input type="text" class="txtserach"/>');
    
    }

    $( '.txtserach,.stsearch', this ).on( 'keyup change', function () {
        if ( table.column(i).search() !== this.value ) {
            table
                .column(i)
                .search( this.value )
                .draw();
        }
        $('#tbody_virtuel').html($('#datatablesituation > tbody').html());
    } );
} );

var table = $('#datatablesituation').DataTable( {
    orderCellsTop: true,
    scrollY:        screen.height / 2,
    scrollX:        600,
    deferRender:    true,
    scroller:       true,
    filter: true,
    "paging": false,
} );
}


    $(document).on('click','.customselect-list-input-item', function(){
        $('#datatablesituation_wrapper, #table_tabs').hide(300);
    })
    /*
    $(document).on('click','.tr_list_general', function(){
       /* $('#situation_tva_st > table > tbody > tr > td > select').val("");
        $('select').attr('style','background: #fff !important')
        $('#situation_tva_st > table > tbody > tr > td > textarea').val("");
        
        $('.dernierappelclient').html("");
        $('.dernierpes').html("");
        $('.dernierrelance').html("");

        $('.etat_st_bl').val("");
        $('.etat_tva_mens_g').val("");
        $('.etat_st_bl').val("");
        $('#dt_rm_em_mens').val("");
        $('#commentaire_g').val("");
        $('#commentaire').val("");

        index_click = $(this).closest('tr').index();
        $('#tab_declaration').hide(100);
        $('#tab_declaration').show(100);
        $('#btn_opt').show(100);
        row_situation = $(this).closest('.tr_list_general').find('.dt_clot').html();
        $('.stdossier').html($(this).closest('.tr_list_general').find('.st_doss_n').html());
        id_situation = $(this).closest('tr').find('.situation_portfeuil_id').html();
        $('.n_om_doss').html( $(this).closest('tr').find('.n_dosss').html())
        $('#etat_bll').html( $(this).closest('tr').find('.etat_bll').html())
        $('.dernierappelclient').html($(this).closest('.tr_list_general').find('.dr_app_client').html());
        $('.dernierpes').html($(this).closest('.tr_list_general').find('.dt_dern_pes').html());
        $('.dernierrelance').html($(this).closest('.tr_list_general').find('.dt_dern_relance').html());

        $('#name_doss').html("Nom dossier : <b style='color:red'><i class='far fa-folder-open'></i> "+ $(this).closest('.tr_list_general').find('td:eq(3)').html() +"</b>");
        
        $('#situation_tva_st').hide(100);
        $('#situation_rt_et').hide(100);
        $('#tva_rm_em').hide(100);         
        
        $('.card-body').css('height', (parseInt(screen.height) / 1.8) + "px")

        var i =  parseInt(row_situation.substring(5,7));
        var i_annee = parseInt(row_situation.substring(0,4))
        if( i < 11 ){
        $(".mois_bl").each(function(index, value){
            if(i > 11){
                i = 0;
                i_annee++;
                $('.annee_bl:eq(' + index + ')').html(i_annee);
            }
                $(this).html(monthName[i]);
                $('.annee_bl:eq(' + index + ')').html(i_annee);
            i++;
        })
        }else{
            $(".mois_bl").each(function(index, value){
                if(i > 11){
                    i = 0;
                    i_annee++;
                    $('.annee_bl:eq(' + index + ')').html(i_annee);
                }
                    $(this).html(monthName[i]);
                    $('.annee_bl:eq(' + index + ')').html(i_annee - 1);
                i++;
            })
        }


        $.ajax({
            url:'Situation_bilan.php',
            type:'POST',
            dataType:'json',
            data:{
                param:'select_situation_bilan',
                id_situation:id_situation,
            },
            success:function(data){
               
              
                if(data[0].etat  !== null){
                    var etat = data[0].etat.split(";"); 
                    $('.etat_st_bl').each(function(index,value){$(this).val(etat[index]);})
                    if(etat.length > 20){
                        var etats = data[0].etat.split(";;");
                        $('.etat_st_bl').each(function(index,value){$(this).val(etats[index].replace(";",""))});
                    }
    
                }else{
                    $('.etat_st_bl').each(function(index,value){$(this).val("");})
                }

                if(data[0].piece_manquant  !== null){
                    var piece_manquant = data[0].piece_manquant.split(";"); 
                    $('.piece_st_bl').each(function(index,value){$(this).val(piece_manquant[index]);})

                    if(piece_manquant.length > 20){
                        var piece_manquant = data[0].piece_manquant.split(";;");
                        $('.piece_st_bl').each(function(index,value){$(this).val(piece_manquant[index].replace(";",""))});
                    }                    
                }else{
                    $('.piece_st_bl').each(function(index,value){$(this).val("")});
                }


                $('#commentaire').val(data[0].commentaire);
                $('#date_dernierkeobiz').val(data[0].date_dernier_keobiz);
                $('#commentaire_g').val(data[0].commentaire_g);


            }
        })
        
    })
    
    $(document).on('click','#valide_tabs', function(){
        var etat = ""; var piece_manquant = ""       
        $('.etat_st_bl').each(function(index,value){etat += $(this).val() + ";";})
        $('.piece_st_bl').each(function(index,value){piece_manquant += $(this).val() + ";";})
        $.ajax({
            url:'Situation_bilan.php',
            type:'POST',
            data:{
                param:'insertion_bilan',
                id_situation:id_situation,
                date_dernier_keobiz :$('#date_dernierkeobiz').val(),
                etat:etat,
                piece_manquant:piece_manquant,
                commentaire:$('#commentaire').val(),
                commentaire_g: $('#commentaire_g').val(),
            },
            success:function(data){
                $('.toast').toast('show');
                $('html').scrollBottom(screen.height);
            }
        })
    })
*/



})