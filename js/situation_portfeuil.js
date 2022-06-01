$(function(){
    $('#ds_export').hide();
    $('#nom_poste_select').html($('#nom_poste_select').html().trim());
    $('#execut_view').html($('#modal_view').html());
    window.history.forward(1);
    var bool_checked_affiche_bilan = "";
    var id_situation = "";
    var id_dossier = "";
    var id_pes = "";
    var id_relance = "";
    var id_relancebaqnque = "";
    var id_relance_pieces = "";
    
    var row_dossier ="";
    var row_situation ="";
    var row_cmt = "";
    var row_cloture = "";
    var row_imp1 = "";
    var row_imp2 = "";
    var row_frmjrd = "";
    var row_dpcoala = "";
    var row_regimtva= "";
    var row_dtech = "";
    var date_de_depot_dernier_keobiz = "";
    var row_sit_karlit = "";
    var row_date_mj = "";
    var row_eta_bl = "";
    var row_dt_envoie_karlit = "";
    var row_cdm = "";
    var row_dte_rev_sup = "";
    var row_obs_sup = "";
    var row_dernier_pes = "";
    var row_deernier_relance = "";
    var row_dernier_appel_client = "";
    var mem_autre_equipe = "";

    var Activite = "";
    var social = "";
    var tns  = "";
    var releve  = "";
    var commentaire_releve  = "";
    var achat  = "";
    var vente  = "";
    var commentaire_et_autre  = "";
    var date_debut_exo = "";

    var tet_datatable = 
            '<table id="datatablesituation" class="text-center" width="100%">'+
            '<thead class="th_databale">'+
            '<tr>'+
            '<th>#</th>'+
            '<th>#</th>'+
            '<th></th>' +
            '<th>dossier</th><th>sit_dossier</th>'+
            '<th>cmt</th><th>cloture</th><th>rg_d_imp1</th><th>rg_d_imp2</th>'+
            '<th>frm_jrdq</th><th>dp_coala</th><th>regime</th><th>dt_ech</th><th>der_depot_keobiz</th><th>sit_karlit</th>'+
            '<th>Encours de :</th><th>Total images : <b style="color:red" id="viewsum"></b></th></th>'+
            '<th>date_maj</th>'+
            '<th>etat_bl</th><th>dt_d_envoie_bl_krlt</th><th>cdm</th><th>dt_rev_sup_fr</th><th>obs_sup_fr</th><th>dernier_pes</th>'+
            '<th>dernier_relance</th><th>dernier_appel_client</th></th>'+
            '<th class="in_visible">id_situation</th>' +
            '<th class="in_visible">id_dossier</th>' +
            '<th class="in_visible">meme_equipe_autre</th>' +

            '<th class="in_visible">Activite</th>' +
            '<th class="in_visible">social</th>' +
            '<th class="in_visible">tns</th>' +
            '<th class="in_visible">releve</th>' +
            '<th class="in_visible">commentaire_releve</th>' +
            '<th class="in_visible">achat</th>' +
            '<th class="in_visible">vente</th>' +
            '<th class="in_visible">commentaire_et_autre</th>' +
            '</tr><thead><tbody>';

           var virtuel_tet_datatable = 
            '<thead class="th_databale"><tr><th>#</th><th>#</th>'+'<th></th><th>dossier</th><th>sit_dossier</th><th>cmt</th><th>cloture</th><th>rg_d_imp1</th><th>rg_d_imp2</th>'+
            '<th>frm_jrdq</th><th>dp_coala</th><th>regime</th><th>dt_ech</th><th>dernier_depo</th><th>sit_karlit</th><th>Encours de :</th><th>Total images</th></th><th>date_maj</th>'+
            '<th>etat_bl</th><th>dt_d_envoie_bl_krlt</th><th>cdm</th><th>dt_rev_sup_fr</th><th>obs_sup_fr</th><th>dernier_pes</th>'+
            '<th>dernier_relance</th><th>dernier_appel_client</th></th>'+'<th class="in_visible">id_situation</th>' +
            '<th class="in_visible">id_dossier</th><th class="in_visible">meme_equipe_autre</th>' +'</tr><thead><tbody id="tbody_virtuel">';            

            var virtuel_tet_juridque = '<thead><tr>'+
            '<th>Equipe</th><th>Dossier</th><th>Situation</th>'+

            '<th style="background: #e0eafd;">Cloture</th>'+
            '<th style="background: #e0eafd;">Regime 1</th>'+
            '<th style="background: #e0eafd;">Regime 2</th>'+
            '<th style="background: #e0eafd;">Forme juridique</th>'+
            '<th style="background: #e0eafd;">Depot coala</th>'+
            '<th style="background: #e0eafd;">Regime</th>'+
            '<th style="background: #e0eafd;">Echeance</th>'+
            '<th style="background: #e0eafd;">Date dernie keobiz</th>'+
            '<th style="background: #e0eafd;">Situation Karlit</th>'+
            '<th style="background: #e0eafd;">Date maj</th>'+
            '<th style="background: #e0eafd;">Etat bilan</th>'+
            '<th style="background: #e0eafd;">Date d envoie bilan</th>'+
            '<th style="background: #e0eafd;">Dernier Pes</th>'+
            '<th style="background: #e0eafd;">Dernier Relance</th>'+
            '<th style="background: #e0eafd;">Dernier appel client</th>'+
            '<th style="background: #e0eafd;">Activite</th>'+
            '<th style="background: #e0eafd;">social</th>'+
            '<th style="background: #e0eafd;">Tns</th>'+
            '<th style="background: #e0eafd;">Releve</th>'+
            '<th style="background: #e0eafd;">Commentaire releve</th>'+
            '<th style="background: #e0eafd;">Achat</th>'+
            '<th style="background: #e0eafd;">Vente</th>'+



            '<th>Manager france</th>'+
            '<th>Cdm france</th>'+
            '<th>Directeur de mission</th>'+
            '<th>Reviseur</th><th>Cdm Karlit</th><th>Assistant Karlit</th>'+
            '<th>Siren</th><th>Siret</th>'+
            '<th>Representant</th><th>Telephone</th><th>Mail</th>'+            
            '<th>sauvegarde Coala</th><th>Chemin Appstream</th><th>'+
                'Nom Banque / RIB IBAN 1 / Journal	/ Compte Banque'
            '</th><tbody>'; 
    
     function datatable(){
        // Setup - add a text input to each footer cell
        $('#datatablesituation thead tr').clone(true).appendTo( '#datatablesituation thead' );
        $('#datatablesituation thead tr:eq(1) th').each( function (i) {
            var title = $(this).text();
            $(this).html( '<input type="text" class="txtserach"/>' );

            var title = $(this).text();
            if (i == 0 || i == 1 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 10 || i == 11 || i == 13 
                || i == 14 || i == 15 || i == 16 || i == 17 || i == 18 || i > 19 ) {
                if (i == 0) $(this).html("");
                if (i == 1) $(this).html("");
                if (i == 4) $(this).html($('#sit_dossier').html());
                if (i == 6) $(this).html("<input type='date' class='stsearch'> <button data-toggle='modal' data-target='#intervalcloture' class='btn-primary' id='filter_date' data-backdrop='static' data-keyboard='false'> Interval <i class='fas fa-filter'></i></button>");
                if(i == 14 || i == 16)$(this).html("<input type='date' class='stsearch'>");
                if (i == 7) $(this).html($('#regime_impos1').html());
                if (i == 8) $(this).html($('#regime_impos2').html());
                if (i == 10) $(this).html($('#dp_coala').html());                
                if (i == 11) $(this).html($('#tva_regime').html());
                if (i == 14) $(this).html($('#situation_traitement_karlit').html());
                if (i == 16) $(this).html("");
                if (i == 17) $(this).html("");
                if(i == 18) $(this).html($('#etat_bilan').html());
                if(i > 18) $(this).html("");
                if($('.align-items-center').html().indexOf("HARIVELO") > 0){
                    $('#filter_date').show();
                }else{
                    $('#filter_date').hide();
                }
        

            } else {
                $(this).html('<input type="text" class="txtserach"/>');
            
            }
    
            $( '.txtserach,.stsearch', this ).on( 'keyup change', function () {
                if ( table.column(i).search().replace() !== this.value ) {
                    console.log(table.column(i).search());
                    table
                        .column(i)
                        .search("^" + $(this).val() + "$", true, false, true)
                        .draw();

                    if(this.value == "tous"){
                        table
                        .column(i)
                        .search('^')
                        .draw();                            
                    }
                    
                    if(i == 3){
                        table
                        .column(i)
                        .search( this.value )
                        .draw();
                    }
                }
                $('#tbody_virtuel').html($('#datatablesituation > tbody').html());
                var totalAmount = 0;
                $('#tbody_virtuel .nb_image_somme').each(function(){
                    totalAmount += parseInt($(this).html());
                });
                $("#viewsum").html(totalAmount);
            });
        } );
    

    var table = $('#datatablesituation').DataTable( {
            orderCellsTop: true,
            scrollY:        parseInt($(window).height()) - (parseInt($(window).height()) / 4.5),
            scrollX:        screen.width,
            deferRender:    true,
            scroller:       true,
            filter: true,
            "paging": false,
            
            "footerCallback": function (row, data, start, end, display) {                
                var totalAmount = 0;
                for (var i = 0; i < data.length; i++) {
                    totalAmount += parseFloat(data[i][15]);
                }
                $("#viewsum").html(totalAmount);
            }
        } );
    }

    
    $(document).on('click','#avec_nombre_image',function(){
        list_g('list_general_avec_nombre_image');
    })
   
    $(document).on('click','#btn-lancer',function(){
        list_g('list_general');
    })

    function list_g(paramettres){
        $('#svSituation').removeClass("disabled_as")
        var equipeselectionnes =  $('.customselect-list:eq(0) > .customselect-dropdown-text:eq(0)').html().trim().replace(/ /g,"");
        if(equipeselectionnes == "votreequipe"){
            alert("Selectionnez un Equipe svp !");
            return;
        }
        var array = equipeselectionnes.split('|');
        var resultatidequipe = "";
        var idEquipe = "";
        var Annee = "";
        valeur_juridque = "";

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
        if(anneeselectionnes == "choisissezexercice(s)" && $('#dernier_exercice').is(':checked') == false){
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
        if($('#dernier_exercice').is(':checked') == false){
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param:paramettres,
                id: idEquipe,
                annee: Annee,
            },
            success: function(data) {
                $('#datatablesituation').DataTable().clear().destroy(); 
                valeur = "";
                valeur_virtuel = "";
                for(var i = 0; i < data.length; i++){
                    valeur += "<tr class='tr_list_general'>"+
                    "<td data-toggle='modal' data-target='#modifsituationportfeuil'><button><i class='fas fa-eye' ></i></button></td>"+
                    "<td class='edit_list'><button  data-toggle='modal' data-target='#viewsuivie' data-backdrop='static' data-keyboard='false'><i class='fas fa-edit' data-backdrop='static' data-keyboard='false'></i></button></td>"+
                    "<td>"+ data[i].code +"</td>"+
                    "<td class='ndoss' style='white-space:nowrap'>" + data[i].dossier + "</td><td>" + data[i].sit_dossier + "</td></td><td><div class='truncate'>" + data[i].cmt + "</div></div></td></td><td>" + data[i].cloture + "</td></td><td>" + data[i].rg_d_imp1 +  "</td>"+
                    "<td>" + data[i].rg_d_imp2 + "</td><td style='white-space:nowrap'>" + data[i].frm_jrdq + "</td></td><td style='white-space:nowrap'>" + data[i].dp_coala +  "</td></td><td>" + data[i].regime +  "</td></td><td>" + data[i].dt_ech +  "</td>"+
                    "<td style='white-space:nowrap'>" + data[i].date_de_depot_dernier_keobiz + "</td>" +
                    "<td style='white-space:nowrap'>" + data[i].sit_karlit + "</td>" +
                    "<td class=''>"+data[i].encours_de+"</td>"+
                    "<td class='nb_image_somme'>"+data[i].sumimage+"</td>"+
                    "<td>" + data[i].date_maj + "</td></td><td style='white-space:nowrap'>" + data[i].etat_bl +  "</td></td><td>" + data[i].dt_d_envoie_bl_krlt +  "</td></td><td style='white-space:nowrap'>" + data[i].cdm +  "</td>"+
                    "<td>" + data[i].dt_rev_sup_fr + "</td><td>" + data[i].obs_sup_fr +  "</td></td><td>" + data[i].dernier_pes +  "</td></td><td>" + data[i].dernier_relance +  "</td></td><td>" + data[i].dernier_appel_client +  "</td>"+
                    "<td class='situation_portfeuil_id in_visible'>"+data[i].situation_portfeuil_id+"</td>"+
                    "<td class='id_dossier in_visible'>"+data[i].id_dossier+"</td>"+                    
                    "<td class='mem_autre_equipe in_visible'>"+data[i].mem_autre_equipe+"</td>"+ 

                    
                    "<td class='Activite in_visible'>"+data[i].Activite+"</td>"+
                    "<td class='social in_visible'>"+data[i].social+"</td>"+
                    "<td class='tns in_visible'>"+data[i].tns+"</td>"+
                    "<td class='releve in_visible'>"+data[i].releve+"</td>"+
                    "<td class='commentaire_releve truncate in_visible'>"+data[i].commentaire_releve+"</td>"+
                    "<td class='achat in_visible'>"+data[i].achat+"</td>"+
                    "<td class='vente in_visible'>"+data[i].vente+"</td>"+
                    "<td class='commentaire_et_autre truncate in_visible'>"+data[i].commentaire_et_autre+"</td>"+
                    "</tr>";
                    
                    valeur_juridque += "<tr class=''>"+
                        "<td>"+ data[i].code +"</td>"+
                        "<td class='ndoss' style='white-space:nowrap;width:30%'>" + data[i].dossier + "</td><td>" + data[i].sit_dossier + 

                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].cloture +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].rg_d_imp1 +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].rg_d_imp2 +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].frm_jrdq +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dp_coala +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].regime +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dt_ech +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].date_de_depot_dernier_keobiz +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].sit_karlit +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].date_maj +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].etat_bl +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dt_d_envoie_bl_krlt +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dernier_pes +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dernier_relance +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dernier_appel_client +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].Activite +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].social +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].tns +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].releve +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].commentaire_releve +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].achat +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].vente +"</td>"+

                        "</td><td><table><tr><td>" + data[i].manage_fr +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_manag +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_mamanag +  "</td></tr></table></td>"+
                        "</td><td><table><tr><td>" + data[i].cdm_frr +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_cdm_m +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_cdm_m +  "</td></tr></table></td>"+
                        "</td><td><table><tr><td>" + data[i].cde +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_cde +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_cde +  "</td></tr></table></td>"+
                        "<td><table><tr><td>" + data[i].reference +  "</tr></td><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_reviseur +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_rev +  "</td></tr></table></td>"+
                        "<td><table><tr><td>" + data[i].cdm_j +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_cdm +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail__cdm +  "</td></tr></table></td>" +
                        "<td><table><tr><td>" + data[i].ass +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_ass +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_ss +  "</td></tr></table></td>" +
                        "<td style='white-space:nowrap'>'" + data[i].siren + "</td>"+"<td style='white-space:nowrap'>'" + data[i].siret + "</td>"+
                        "<td class=''>"+data[i].presentant+"</td>"+
                        "<td class=''>"+data[i].tel+"</td>"+
                        "<td class=''>"+data[i].mail_presentant+"</td>"+
                        "<td class=''>"+data[i].fs_coala+"</td>"+
                        "<td>" + data[i].fs_apptream + "</td></td><td style='white-space:nowrap'><table>" + data[i].table_banque +  "</table></td></tr>";

                    valeur = valeur.replace(/null/g,"").replace(/ 00:00:00/g,"").replace(/RB COMPLET \+ PES/g,"RB_COMPLET_PLUS_PES");
                    valeur_juridque = valeur_juridque.replace(/null/g,"").replace(/ 00:00:00/g,"");                    
                }
                
                $('#datatable_situation').html(
                    tet_datatable + valeur + "</tbody></table>");
                $('#datatable_situation').css({'zoom':'80%'});
                datatable();
                $('#datatable_situation thead:eq(1)').html("");   
                $('#datatablesituation_wrapper').show(300);
                $('#ds_export').show(300);
                
                $('#tablvirtuel_suivie').html("<table id='table_export_virtuel'>" + virtuel_tet_datatable + valeur+"</tbody></table>");
                
                $('#tb_moda_juridque').html("<table id='s_expor_virt' class='table-bordered' style='zoom:92%'>" + virtuel_tet_juridque + valeur_juridque +"</tbody></table>");

                $('.visualiser').html("Modification");
                $('#loading').hide();

            },
        });
        }else{
            $.ajax({
                url: "route_Situation_portfeuille.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param:'list_general_dernier_exo',
                    id: idEquipe,
                },
                success: function(data) {
                    console.log(data);
                    $('#datatablesituation').DataTable().clear().destroy(); 
                    valeur = "";
                    valeur_juridque = "";
                    valeur_virtuel = "";
                    for(var i = 0; i < data.length -1; i++){
                        valeur += "<tr class='tr_list_general'>"+
                        "<td data-toggle='modal' data-target='#modifsituationportfeuil'><button><i class='fas fa-eye' ></i></button></td>"+
                        "<td class='edit_list'><button  data-toggle='modal' data-target='#viewsuivie' data-backdrop='static' data-keyboard='false'><i class='fas fa-edit' data-backdrop='static' data-keyboard='false'></i></button></td>"+
                        "<td>"+ data[i].code +"</td>"+
                        "<td class='ndoss' style='white-space:nowrap'>" + data[i].dossier + "</td><td>" + data[i].sit_dossier + "</td></td><td><div class='truncate'>" + data[i].cmt + "</div></div></td></td><td>" + data[i].cloture + "</td></td><td>" + data[i].rg_d_imp1 +  "</td>"+
                        "<td>" + data[i].rg_d_imp2 + "</td><td style='white-space:nowrap'>" + data[i].frm_jrdq + "</td></td><td style='white-space:nowrap'>" + data[i].dp_coala +  "</td></td><td>" + data[i].regime +  "</td></td><td>" + data[i].dt_ech +  "</td>"+
                        "<td style='white-space:nowrap'>" + data[i].date_de_depot_dernier_keobiz + "</td>"+
                        "<td style='white-space:nowrap'>" + data[i].sit_karlit + "</td>"+
                        "<td class=''>"+data[i].encours_de+"</td>"+
                        "<td class='nb_image_somme'>"+data[i].sumimage+"</td>"+
                        "<td>" + data[i].date_maj + "</td></td><td style='white-space:nowrap'>" + data[i].etat_bl +  "</td></td><td>" + data[i].dt_d_envoie_bl_krlt +  "</td></td><td style='white-space:nowrap'>" + data[i].cdm +  "</td>"+
                        "<td>" + data[i].dt_rev_sup_fr + "</td><td>" + data[i].obs_sup_fr +  "</td></td><td>" + data[i].dernier_pes +  "</td></td><td>" + data[i].dernier_relance +  "</td></td><td>" + data[i].dernier_appel_client +  "</td>"+
                        "<td class='situation_portfeuil_id in_visible'>"+data[i].situation_portfeuil_id+"</td>"+
                        "<td class='id_dossier in_visible' >"+data[i].id_dossier+"</td>"+                    
                        "<td class='mem_autre_equipe in_visible'>"+data[i].mem_autre_equipe+"</td>"+ 

                        "<td class='activite in_visible'>"+data[i].Activite+"</td>"+
                        "<td class='social in_visible'>"+data[i].social+"</td>"+
                        "<td class='tns in_visible'>"+data[i].tns+"</td>"+
                        "<td class='releve in_visible'>"+data[i].releve+"</td>"+
                        "<td class='commentaire_releve truncate in_visible'>"+data[i].commentaire_releve+"</td>"+
                        "<td class='achat in_visible'>"+data[i].achat+"</td>"+
                        "<td class='vente in_visible'>"+data[i].vente+"</td>"+
                        "<td class='commentaire_et_autre truncate in_visible'>"+data[i].commentaire_et_autre+"</td>"+                        
                        "</tr>";

                        valeur_juridque += "<tr class=''>"+
                        "<td>"+ data[i].code +"</td>"+
                        "<td class='ndoss' style='white-space:nowrap;width:30%'>" + data[i].dossier + "</td><td>" + data[i].sit_dossier + 
                        
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].cloture +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].rg_d_imp1 +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].rg_d_imp2 +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].frm_jrdq +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dp_coala +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].regime +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dt_ech +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].date_de_depot_dernier_keobiz +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].sit_karlit +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].date_maj +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].etat_bl +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dt_d_envoie_bl_krlt +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dernier_pes +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dernier_relance +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].dernier_appel_client +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].Activite +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].social +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].tns +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].releve +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].commentaire_releve +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].achat +"</td>"+
                        "<td style='background:#f1f3f7;border:1px solid gray'>"+ data[i].vente +"</td>"+

                        "</td><td><table><tr><td>" + data[i].manage_fr +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_manag +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_mamanag +  "</td></tr></table></td>"+
                        "</td><td><table><tr><td>" + data[i].cdm_frr +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_cdm_m +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_cdm_m +  "</td></tr></table></td>"+
                        "</td><td><table><tr><td>" + data[i].cde +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_cde +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_cde +  "</td></tr></table></td>"+
                        "<td><table><tr><td>" + data[i].reference +  "</tr></td><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_reviseur +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_rev +  "</td></tr></table></td>"+
                        "<td><table><tr><td>" + data[i].cdm_j +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_cdm +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail__cdm +  "</td></tr></table></td>" +
                        "<td><table><tr><td>" + data[i].ass +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].prenom_mail_ass +  "</td></tr><tr><td style='white-space:nowrap'>" + data[i].mail_ss +  "</td></tr></table></td>" +
                        "<td style='white-space:nowrap'>'" + data[i].siren + "</td>"+"<td style='white-space:nowrap'>'" + data[i].siret + "</td>"+
                        "<td class=''>"+data[i].presentant+"</td>"+
                        "<td class=''>"+data[i].tel+"</td>"+
                        "<td class=''>"+data[i].mail_presentant+"</td>"+
                        "<td class='nb_image_somme'>"+data[i].fs_coala+"</td>"+
                        "<td>" + data[i].fs_apptream + "</td></td><td style='white-space:nowrap'><table>" + data[i].table_banque +  "</table></td></tr>";
    
                        valeur = valeur.replace(/null/g,"").replace(/ 00:00:00/g,"");
                        valeur_juridque = valeur_juridque.replace(/null/g,"").replace(/ 00:00:00/g,"");
                    }
                    
                    $('#datatable_situation').html(
                        tet_datatable + valeur + "</tbody></table>");
                    $('#datatable_situation').css({'zoom':'80%'});
                    datatable();
                    $('#datatable_situation thead:eq(1)').html("");   
                    $('#datatablesituation_wrapper').show(300);
                    $('#ds_export').show(300);
                    $('#tablvirtuel_suivie').html("<table id='table_export_virtuel'>" + virtuel_tet_datatable + valeur+"</tbody></table>");

                    $('#tb_moda_juridque').html("<table id='s_expor_virt' class='table-bordered' style='zoom:92%'>" + virtuel_tet_juridque + valeur_juridque+"</tbody></table>");

                    
                    //$('#svSituation').addClass("disabled_as");
                    $('#loading').hide();
                },
            });
           
        }
    }


    
    $(document).on('click','.customselect-list-input-item', function(){
        $('#datatablesituation_wrapper').hide(300);
        $('#ds_export').hide(300);
    })
    
   

    $(document).on('click','#contact_dossier_click', function(){
        $('#presantant_client').val("");
        $('#phone_client').val("");
        $('#mail_client').val("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'contact_dossier',
                id_dossier: id_dossier,
            },
            success: function(data) {
            if(data.length > 0){
              $('#presantant_client').val(data[0].presentant);
              $('#phone_client').val(data[0].tel);
              $('#mail_client').val(data[0].mail);
            }
            //$('#contactclient').modal('show');
            },
        });

    })
    
    $(document).on('click','#btn-contact_client', function(){
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'save_contact_dossier',
                id_dossier: id_dossier,
                presantant_client:$('#presantant_client').val(),
                phone_client:$('#phone_client').val(),
                mail_client:$('#mail_client').val(),
            },
            success: function(data) {
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000);
            },
        });        
    })


    
    $(document).on('click','#contact_sie_click', function(){
        $('#phone_contact_sie').val("");
        $('#mail_contact_sie').val("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'contact_sie',
                id_dossier: id_dossier,
            },
            success: function(data) {
            if(data.length > 0){
              $('#phone_contact_sie').val(data[0].tel);
              $('#mail_contact_sie').val(data[0].mail);
            }
            },
        });

    })
    $(document).on('click','#btn-contact_sie', function(){
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'save_contact_sie',
                id_dossier: id_dossier,
                phone_contact_sie:$('#phone_contact_sie').val(),
                mail_contact_sie:$('#mail_contact_sie').val(),
            },
            success: function(data) {
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000);;
            },
        });        
    })


    $(document).on('keyup','#frmj_siren', function(){
        var text = "";
        var text = $(this).val().replace(/./,"").replace(/ /,"").trim();
        //$(this).val(text);
    })

    $(document).on('keyup','#frmj_sieret', function(){
        var text = "";
        var text = $(this).val().replace(/./,"").replace(/ /,"").trim();        
        //$(this).val(text);
    })

    $(document).on('click','#reseignement_juridique_click', function(){
        $('#frmj').val("");
        $('#frmj_siren').val("");
        $('#frmj_sieret').val("");
        $('#frmj_activite').val("");
        $('#frmj_adresse').val("");
        $('#frmj_capital').val("");
        $('#frmj_imma').val("");
        $('#frmj_maj').val("");
        $('#frmj_gerant').val("");

        $('#fs_coala').val("");
        $('#fs_apptream').val("");
        $('#table_banque').html("");

        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'reseignement_juridique',
                id_dossier: id_dossier,
            },
            success: function(data) {
                console.log(data);
            if(data.length > 0){
                $('#frmj').val(data[0].forme_juridique);
                $('#frmj_siren').val(data[0].siren);
                $('#frmj_sieret').val(data[0].siret);
                $('#frmj_activite').val(data[0].activite);
                $('#frmj_adresse').val(data[0].adress);
                $('#frmj_capital').val(data[0].capital_social);
                $('#frmj_imma').val(data[0].rcs);
                $('#frmj_maj').val(data[0].dernier_maj);
                $('#frmj_gerant').val(data[0].gerant);

                $('#fs_coala').val(data[0].fs_coala);
                $('#fs_apptream').val(data[0].fs_apptream);
                $('#table_banque').html(data[0].table_banque);

             }
            },
        });
    })

    $(document).on('click', '#add_bq', function(){
        if($('#n_bq').val() == "" || $('#n_rib').val() == "" || $('#n_journa').val() == "" || $('#n_cd_bq').val() == "")
        {
            alert("Attention les champs ne doivent être vide ");
            return;
        }
        var row  = "<tr><td>" + $('#n_bq').val() + "</td><td>" + $('#n_rib').val() + "</td><td>" +  $('#n_journa').val() + "</td><td>" +  $('#n_cd_bq').val() + "</td><td class='remove_row_bq'><a href='#' style='color:red' title='Suprimer'> X</a></td></tr>";
        $('#table_banque').append(row);
        $('#n_bq').val("");
        $('#n_rib').val("");
        $('#n_journa').val("");
        $('#n_cd_bq').val("");
        $('#n_bq').focus();
    })

    
    $(document).on('click', '.remove_row_bq', function(){
        let text = "Voulez vous suprimer ?";
        if (confirm(text) == true) {
            $(this).closest(".rsgjuridique tr").remove();
        } else {
          return;
        }
        
      
    })
    


    $(document).on('click','#btn-reseignement_juridique', function(){
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'save_reseignement_juridique',
                id_dossier: id_dossier,
                forme_juridique: $('#frmj').val(),
                siren:$('#frmj_siren').val(),
                siret:$('#frmj_sieret').val(),
                activite:$('#frmj_activite').val(),
                adress:$('#frmj_adresse').val(),
                capital_social:$('#frmj_capital').val(),
                rcs:$('#frmj_imma').val(),
                dernier_maj:$('#frmj_maj').val(),
                gerant:$('#frmj_gerant').val(),
                fs_coala:$('#fs_coala').val(),
                fs_apptream:$('#fs_apptream').val(),
                table_banque:$('#table_banque').html()
            },
            success: function(data) {
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000);
            },
        });        
    })    

    $(document).on('click','#btn_chiffre_d_affaire', function(){
        var valeur = "non_exist";
        $('.annedecteter').each(function(index,value){
            if($(this).html() == $('#date_chiffre_affaire').val()){
                valeur = "exist";
            }
        })

        if(valeur == "exist" || $('#date_chiffre_affaire').val() == "" || $('#chiffre_affaire_v').val() == ""){
            $('.popclient').html("Attention ,  année existant ou chiffre vide");
            $('.popclient').fadeIn(500); 
            $('.popclient').fadeOut(2000);
            return;
        }
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'save_chiffre_d_affaire',
                id_dossier: id_dossier,
                date_chiffre_affaire: $('#date_chiffre_affaire').val(),
                nombre_chiffre_affaire:$('#nombre_chiffre_affaire').val(),
                chiffre_affaire_v:$('#chiffre_affaire_v').val(),
             },
            success: function(data) {
                $('.popclient2').html(data);
                $('.popclient2').fadeIn(500); 
                $('.popclient2').fadeOut(2000);
                chiffre_affaire();
            },
        });        
    })       

       
    
    $(document).on('click','#btn_chiffre_d_affaire_click', function(){
        chiffre_affaire();
    })    
    
    function chiffre_affaire(){
        $('#date_chiffre_affaire').val("");
        $('#nombre_chiffre_affaire').val("");
        $('#chiffre_affaire_v').val("");
        $('#tb_chiffred_afaire').html("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'chiffre_d_affaire',
                id_dossier: id_dossier,
            },
            success: function(data) {
            stable = "";
            if(data.length > 0){
                for(var i = 0; i< data.length; i++){
                    stable += "<tr><td class='annedecteter' width='32%'>" + data[i].annee + "</td>"+
                    "<td width='32%'>" + data[i].nbligne + "</td>"+
                    "<td width='32%'>" + data[i].chiffreAffaire + "</td>"+
                    "<td class='id_chrd_afaire in_visible' width='2%'>" + data[i].id + "</td>"+
                    '<td class="supre_chifr" width="2%"><i class="fas fa-trash-alt"></i></td>'+
                    "</tr>";
                }
                $('#tb_chiffred_afaire').html('<table class="table-bordered text-center"  width="100%">' +stable + "</table>");
             }
            },
        });
    }
    
    $(document).on('click', '.supre_chifr' ,function(){
        var id = $(this).closest('tr').find('.id_chrd_afaire').html();
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'supre_chiffre_d_affaire',
                id_dossier: id,
            },
            success: function(data) {
                chiffre_affaire();   
            },
        });
    })


    $(document).on('click','#Pole_juridique_click', function(){
        $('#datrecue').val("");
        $('#situation_option').val("");
        $('#datfait').val("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'pole_juridique',
                id_dossier: id_dossier,
            },
            success: function(data) {
            if(data.length > 0){
                var array = data[0];
                $('.datrecue:eq(0)').val(array.juridique_annuel.split("#")[0]) ; $('.situation_option:eq(0)').val(array.juridique_annuel.split("#")[1]) ; $('.datfait:eq(0)').val(array.juridique_annuel.split("#")[2]);
                $('.datrecue:eq(1)').val(array.juridique_exceptionnel.split("#")[0]) ; + $('.situation_option:eq(1)').val(array.juridique_exceptionnel.split("#")[1]) ; $('.datfait:eq(1)').val(array.juridique_exceptionnel.split("#")[2]);
                $('.datrecue:eq(2)').val(array.juridique_mixte.split("#")[0]); $('.situation_option:eq(2)').val(array.juridique_mixte.split("#")[1]) ; $('.datfait:eq(2)').val(array.juridique_mixte.split("#")[2]);
                $('.datrecue:eq(3)').val(array.mandat_banque.split("#")[0]) ; $('.situation_option:eq(3)').val(array.mandat_banque.split("#")[1]) ; $('.datfait:eq(3)').val(array.mandat_banque.split("#")[2]);
                $('.datrecue:eq(4)').val(array.projet.split("#")[0]) ; $('.situation_option:eq(4)').val(array.projet.split("#")[1]) ; $('.datfait:eq(4)').val(array.projet.split("#")[2]);
                $('.datrecue:eq(5)').val(array.dossier_complet.split("#")[0]) ; $('.situation_option:eq(5)').val(array.dossier_complet.split("#")[1]) ; $('.datfait:eq(5)').val(array.dossier_complet.split("#")[2]);
                $('.datrecue:eq(6)').val(array.depot_au_greffe.split("#")[0]) ; $('.situation_option:eq(6)').val(array.depot_au_greffe.split("#")[1]) ; $('.datfait:eq(6)').val(array.depot_au_greffe.split("#")[2]);
                $('.datrecue:eq(7)').val(array.envoie_mail_de_bienvenue.split("#")[0]) ; $('.situation_option:eq(7)').val(array.envoie_mail_de_bienvenue.split("#")[1]) ; $('.datfait:eq(7)').val(array.envoie_mail_de_bienvenue.split("#")[2]);
                $('.datrecue:eq(8)').val(array.saisie_ldm_ebp_et_hubspot.split("#")[0]) ; $('.situation_option:eq(8)').val(array.saisie_ldm_ebp_et_hubspot.split("#")[1]) ; $('.datfait:eq(8)').val(array.saisie_ldm_ebp_et_hubspot.split("#")[2]);
                $('.datrecue:eq(9)').val(array.creation_efi.split("#")[0]) ; $('.situation_option:eq(9)').val(array.creation_efi.split("#")[1]) ; $('.datfait:eq(9)').val(array.creation_efi.split("#")[2]);
                $('.datrecue:eq(10)').val(array.creation_sepa.split("#")[0]) ; $('.situation_option:eq(10)').val(array.creation_sepa.split("#")[1]) ; $('.datfait:eq(10)').val(array.creation_sepa.split("#")[2]);
            }
            },
        });

    })
    

    
    $(document).on('click', '#btn_pole_juridique' ,function(){
        //affaire
        var juridique_annuel;
        var juridique_exceptionnel;
        var juridique_mixte;
        var mandat_banque;
        var projet;
        var dossier_complet;
        var depot_au_greffe;
        var envoie_mail_de_bienvenue;
        var saisie_ldm_ebp_et_hubspot;
        var creation_efi;
        var creation_sepa;

        juridique_annuel= $('.datrecue:eq(0)').val() + "#" + $('.situation_option:eq(0)').val() + "#" + $('.datfait:eq(0)').val();
        juridique_exceptionnel = $('.datrecue:eq(1)').val() + "#" + $('.situation_option:eq(1)').val() + "#" + $('.datfait:eq(1)').val();
        juridique_mixte= $('.datrecue:eq(2)').val() + "#" + $('.situation_option:eq(2)').val() + "#" + $('.datfait:eq(2)').val();
        mandat_banque=$('.datrecue:eq(3)').val() + "#" + $('.situation_option:eq(3)').val() + "#" + $('.datfait:eq(3)').val();
        projet= $('.datrecue:eq(4)').val() + "#" + $('.situation_option:eq(4)').val() + "#" + $('.datfait:eq(4)').val();
        dossier_complet= $('.datrecue:eq(5)').val() + "#" + $('.situation_option:eq(5)').val() + "#" + $('.datfait:eq(5)').val();
        depot_au_greffe= $('.datrecue:eq(6)').val() + "#" + $('.situation_option:eq(6)').val() + "#" + $('.datfait:eq(6)').val();
        envoie_mail_de_bienvenue= $('.datrecue:eq(7)').val() + "#" + $('.situation_option:eq(7)').val() + "#" + $('.datfait:eq(7)').val();
        saisie_ldm_ebp_et_hubspot=$('.datrecue:eq(8)').val() + "#" + $('.situation_option:eq(8)').val() + "#" + $('.datfait:eq(8)').val();
        creation_efi= $('.datrecue:eq(9)').val() + "#" + $('.situation_option:eq(9)').val() + "#" + $('.datfait:eq(9)').val();
        creation_sepa=$('.datrecue:eq(10)').val() + "#" + $('.situation_option:eq(10)').val() + "#" + $('.datfait:eq(10)').val();


            $.ajax({
                url: "route_Situation_portfeuille.php",
                type: 'POST',
                data: {
                    param: 'save_pole_juridique',
                    id_dossier: id_dossier,
                    juridique_annuel:juridique_annuel,
                    juridique_exceptionnel:juridique_exceptionnel,
                    juridique_mixte:juridique_mixte,
                    mandat_banque:mandat_banque,
                    projet:projet,
                    dossier_complet:dossier_complet,
                    depot_au_greffe:depot_au_greffe,
                    envoie_mail_de_bienvenue:envoie_mail_de_bienvenue,
                    saisie_ldm_ebp_et_hubspot:saisie_ldm_ebp_et_hubspot,
                    creation_efi:creation_efi,
                    creation_sepa:creation_sepa,
                },
                success: function(data) {
                    $('.popclient').html(data);
                    $('.popclient').fadeIn(500); 
                    $('.popclient').fadeOut(2000);                
                },
            });
    })

    function click_pes(){
        $('#types_pes').val("");
        $('#dat_pes').val("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'pes_relance',
                id_dossier: id_dossier,
                id_situation:id_situation,
            },
            success: function(data) {
                if(data.length > 0){
                    resultat = "";
                for(var i =0; i< data.length; i++){
                    if(data[i].date_pes == null){date_pes = "";}else{date_pes = data[i].date_pes.replace(" 00:00:00","");}
                    if(data[i].date_retour == null){date_retour = "";}else{date_retour = data[i].date_retour.replace(" 00:00:00","");}
                    resultat += '<tr><td class="id_pes invis in_visible">'+ data[i].id  +'</td>' + 
                    '<td class="addnompes">' + "PES N " + (parseInt(i) + 1)   + '</td><td class="psdt">' +
                        '<input type="date" class="form-control" value="' +  date_pes + '"></td>' +
                        '<td class="td_date_retoure"><input type="date" class="form-control" value="'+ date_retour + '"></td>' +
                        '<td class="savemodif_pes supre_chifr" title="Enregistrer la modification"><i class="far fa-save"></i></td></td></td><td class="remorowsps supre_chifr" data-toggle="modal" data-target="#supression_pes" data-backdrop="static" data-keyboard="false"> <a href="#" style="color:red" title="Suprimer" > X</a></td></tr>';
                    }
                    $('#types_pes').val("PES N " + (parseInt(data.length) + 1) );
                    $('#pes_tbody_l').html(resultat);
                    $('#typerelance').val("rel PES N " + (parseInt(data.length)) );
            }else{
                $('#types_pes').val("PES N 1");
            }
            },
        });  
    }
    


    $(document).on('click', '.savemodif_pes', function() { 
        id_pes = $(this).closest('tr').find('.id_pes').html();
        var date_pes_m =   $(this).closest('tr').find('.psdt > input').val();
        var date_retour_m =   $(this).closest('tr').find('.td_date_retoure > input').val();
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'save_modif_pes_relance',
                id_pes: id_pes,
                dat_pes: date_pes_m,
                date_retour: date_retour_m,
            },
            success: function(data) {
                click_pes();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });
    })

    $(document).on('click', '.savemodif_relance_pieces', function() { 
        id_relance_pieces = $(this).closest('tr').find('.id_relance_pieces').html();
        var date_pieces_m =   $(this).closest('tr').find('.rel_piecesncedt > input').val();
        var date_retour_pieces_m =   $(this).closest('tr').find('.rel_piecedate  > input').val();
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'save_modif_relance_pieces',
                id_relance_pieces: id_relance_pieces,
                date_pieces_m: date_pieces_m,
                date_retour_pieces_m: date_retour_pieces_m,
            },
            success: function(data) {
                click_relance_piece();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });
    })
    

    $(document).on('click', '.savemodif_banque', function() { 
        id_relancebaqnque = $(this).closest('tr').find('.id_relance_banque').html();
        var date_relancebanque_m =   $(this).closest('tr').find('.relncedtbanque > input').val();
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'savemodif_banque',
                id_relancebaqnque: id_relancebaqnque,
                date_relancebanque_m: date_relancebanque_m,
            },
            success: function(data) {
                click_relance_banque();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });
    })    

    

    $(document).on('click', '.savemodif_relance', function() { 
        id_relance = $(this).closest('tr').find('.id_relance').html();
        var date_realnce_m =   $(this).closest('tr').find('.relncedt > input').val();
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'save_modif_relance',
                id_relance: id_relance,
                date_realnce_m: date_realnce_m,
            },
            success: function(data) {
                click_relance();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });
    })    
    

    $(document).on('click', '.supre_chifr', function() {   
        id_pes = $(this).closest('tr').find('.id_pes').html();
        $('#pes_motif').html($(this).closest('tr').find('.addnompes').html());
    })

    $(document).on('click', '.supre_chifr_relance', function() {   
        id_relance = $(this).closest('tr').find('.id_relance').html();
        $('#relance_motif').html($(this).closest('tr').find('.addnomrelance').html());
    })

    $(document).on('click', '.supre_chifr_relance_pieces', function() {   
        id_relance_pieces = $(this).closest('tr').find('.id_relance_pieces').html();
        $('#relance_pieces_motif').html($(this).closest('tr').find('.rel_piecesncedt').html());
    })

    

    $(document).on('click', '#supression_line_relancepieces', function() {  
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'supre_relance_pes',
                id_relance_pieces: id_relance_pieces,
            },
            success: function(data) {
                click_relance_piece();
                $('#annulsupression_line_relance_pieces').click();
            },
        });         
    })
    
    $(document).on('click', '#supression_line_pes', function() {  
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'supre_pes_relance',
                id_pes: id_pes,
            },
            success: function(data) {
                click_pes();
                $('#annulsupression_line_pes').click();
            },
        });         
    })

    $(document).on('click', '#supression_line_relancebanque', function() {  
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'supre_pes_relancebanque',
                id_relancebaqnque: id_relancebaqnque,
            },
            success: function(data) {
                click_relance_banque();
                $('#annulsupression_line_relancebanque').click();
            },
        });         
    })
    

    $(document).on('click', '#supression_line_relance', function() {  
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'supre_relance',
                id_relance: id_relance,
            },
            success: function(data) {
                click_relance();
                $('#annulsupression_line_relance').click();
            },
        });         
    })

    $(document).on('click', '#supre_chifr_relance_banque', function() {  
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'supre_pes_relancebanque',
                id_relancebaqnque: id_relancebaqnque,
            },
            success: function(data) {
                click_relance_banque();
                $('#annulsupression_line_relance').click();
            },
        });         
    })
    
    

    $(document).on('click', '#pes_relance_click', function() {   
	$('#pes_tbody_l').html("");
	$('#relance_body_l').html("");

        click_pes();
        click_relance();
    })

    $(document).on('click', '#relance_piece_etbanque_click', function() { 
	$('#relance_body_l_pieces').html("");
	$('#tb_relance_banque').html("");

        click_relance_banque();
        click_relance_piece();
    })
    

    $(document).on('click', '#btn_validepes', function() {   
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'save_pes_relance',
                id_dossier: id_dossier,
                id_situation:id_situation,
                pes_num: $('#types_pes').val(),
                dat_pes: $('#dat_pes').val(),
            },
            success: function(data) {
                click_pes();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });    
    })

    function click_relance(){
        $('#relance_body_l').html("");
        $('#dat_relance').val("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'click_relance',
                id_dossier: id_dossier,
                id_situation:id_situation,
            },
            success: function(data) {
                if(data.length > 0){
                    var resultat = "";
                    for(var i =0; i< data.length; i++){
                        var date_relance;var relance_num
                        if(data[i].date_relance == null){date_relance = "";}else{date_relance = data[i].date_relance.replace(" 00:00:00","");}
                        if(data[i].relance_num == null){date_retour = "";}else{relance_num = data[i].relance_num}

                        resultat += '<tr><td class="id_relance invis in_visible">'+ data[i].id  +'</td>' + 
                        '<td class="addnomrelance">' + relance_num   + '</td><td class="relncedt">' +
                        '<input type="date" class="form-control" value="' +  date_relance + '"></td>' +
                        '<td class="savemodif_relance supre_chifr" title="Enregistrer la modification"><i class="far fa-save"></i></td></td></td><td class="remorowsps supre_chifr_relance" data-toggle="modal" data-target="#supression_relance" data-backdrop="static" data-keyboard="false"> <a href="#" style="color:red" title="Suprimer" > X</a></td></tr>';
                    }
                    $('#relance_body_l').html(resultat);
                }
            },
        });  
    }    
    
    function click_relance_piece(){
        $('#relance_body_l_pieces').html("");
        //$('#dat_relance').val("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'click_relance_pieces',
                id_dossier: id_dossier,
                id_situation:id_situation,
            },
            success: function(data) {
                if(data.length > 0){
                    var resultat = "";
                    for(var i =0; i< data.length; i++){
                        var date_pes;var date_retour
                        if(data[i].date_pes == null){date_pes = "";}else{date_pes = data[i].date_pes.replace(" 00:00:00","");}
                        if(data[i].date_retour == null){date_retour = "";}else{date_retour = data[i].date_retour.replace(" 00:00:00","");}
                        resultat += '<tr><td class="id_relance_pieces invis in_visible">'+ data[i].id  +'</td>' + 
                        '<td class="addnomrelance_pieces">' + "RELANCE PIECE N " + (parseInt(i) + 1)   + '</td><td class="rel_piecesncedt">' +
                        '<input type="date" class="form-control" value="' +  date_pes + '"></td>' +
                        '<td class="rel_piecedate"><input type="date" class="form-control" value="' +  date_retour + '"></td>' +
                        '<td class="savemodif_relance_pieces supre_chifr" title="Enregistrer la modification"><i class="far fa-save"></i></td></td></td><td class="remorowsps supre_chifr_relance_pieces" data-toggle="modal" data-target="#supression_relance_pieces" data-backdrop="static" data-keyboard="false"> <a href="#" style="color:red" title="Suprimer" > X</a></td></tr>';
                    }
                    $('#relance_body_l_pieces').html(resultat);
                    $('#types_relancepiece').val("RELANCE PIECE N " + (parseInt(data.length) + 1 ))
                }else{
                    $('#types_relancepiece').val("RELANCE PIECE N 1");
                }
            },
        });  
    }        
    
    

    function click_relance_banque(){
        $('#tb_relance_banque').html("");
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'click_relance_banque', //CODE RELANCE BANQUE
                id_dossier: id_dossier,
                id_situation:id_situation,
            },
            success: function(data) {
                if(data.length > 0){
                    var resultat = "";
                    for(var i =0; i< data.length; i++){
                        var date_relance;var relance_num
                        if(data[i].date_relance == null){date_relance = "";}else{date_relance = data[i].date_relance.replace(" 00:00:00","");}
                        if(data[i].relance_num == null){date_retour = "";}else{relance_num = data[i].relance_num}

                        resultat += '<tr><td class="id_relance_banque invis in_visible">'+ data[i].id  +'</td>' + 
                        '<td class="addnomrelancepiece">' + relance_num   + '</td><td class="relncedtbanque">' +
                        '<input type="date" class="form-control" value="' +  date_relance + '"></td>' +
                        '<td class="savemodif_banque supre_chifr" title="Enregistrer la modification"><i class="far fa-save"></i></td></td></td><td class="remorowsps supre_chifr_relance_banque" data-toggle="modal" data-target="#supression_relancebanque" data-backdrop="static" data-keyboard="false"> <a href="#" style="color:red" title="Suprimer" > X</a></td></tr>';
                    }
                    $('#tb_relance_banque').html(resultat);
                    $('#typerelancebanque').val("RELANCE BQ N " + (parseInt(data.length) + 1));
                }else{
                    $('#typerelancebanque').val("RELANCE BQ N 1");
                }
            },
        });  
    } 
    
    $(document).on('click', '.supre_chifr_relance_banque', function() {   
        id_relancebaqnque = $(this).closest('tr').find('.id_relance_banque').html();
        $('#relancebanque_motif').html($(this).closest('tr').find('.addnomrelance').html());
    })

    $(document).on('click', '#btn_validerelance', function() {   
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'save_relance',
                id_dossier: id_dossier,
                id_situation:id_situation,
                pes_num: $('#typerelance').val(),
                dat_relance: $('#dat_relance').val(),
            },
            success: function(data) {
                click_relance();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });    
    })

    $(document).on('click', '#btn_validerelancebanque', function() {   
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'save_relancebanque',
                id_dossier: id_dossier,
                id_situation:id_situation,
                relnce_pieces_num: $('#typerelancebanque').val(),
                relance_date_piece: $('#dat_relancebanque').val(),
            },
            success: function(data) {
                click_relance_banque();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });    
    })
    

    $(document).on('click', '#btn_validerelancepieces', function() {   
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param: 'save_relancepieces',
                id_dossier: id_dossier,
                id_situation:id_situation,
                relnce_pieces_num: $('#types_relancepiece').val(),
                relance_date_piece: $('#dat_relancepiece').val(),
            },
            success: function(data) {
                click_relance_piece();
                $('.popclient').html(data);
                $('.popclient').fadeIn(500); 
                $('.popclient').fadeOut(2000); 
            },
        });    
    })

    $(document).on('click', '#btnnouveauExo', function() {
        var ss_check = "";
        if( $('#ajout_non_affiche').is(':checked')){
            ss_check = "n_affiche_pas";
        } else {
            ss_check  = "";
        }

        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'add_new_cloture',
                id_dossier: id_dossier,
                id_situation: row_situation,
                date_cloturation: $('#dtclnov').val(),
                regime_dimpos: row_imp1 ,
                regime_dimpos2: row_imp2 ,
                forme_juridique: row_frmjrd ,
                dpcoala: row_dpcoala ,
                tvregime: row_regimtva,
                tvadate_echeance: row_dtech ,
                ss_check,ss_check
            },
            success: function(data) {
                alert(data);
                if(data == "nouveau cloture ok"){
                    $('.btnnouveauExoannuler').click();
                    $('.close').click();
                }
            },
        });

    })
    
    $(document).on('click', '#suprimersituation', function() {
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'suprimer_cloture',
                id_situation: id_situation,
                action: "nom dossier suprimer est : " + row_dossier + " reference dossier : " + id_dossier + " reference situation : " +id_situation,
            },
            success: function(data) { 
                $('#suprimersituationannuler').click();
                $('#btn-lancer').click();
                $('.close').click();
            },
        });
    })   
    
    $(document).on('click', '#svSituation', function() {
        let Liase_ = 1,
            ca12_ =1,
            solde_ = 1,
            cvae_ = 1,
            svae_ = 1,
            decl_ = 1,
            das_ = 1,
            c3s_ =1;

            if ($('#Liase_').is(':checked')){Liase_ = 1;}else{Liase_ = 0;}
            if ($('#ca12_').is(':checked')){ca12_ = 1;}else{ca12_ = 0;}
            if ($('#solde_').is(':checked')){solde_ = 1;}else{solde_ = 0;}
            if ($('#cvae_').is(':checked')){cvae_ = 1;}else{cvae_ = 0;}
            if ($('#svae_').is(':checked')){svae_ = 1;}else{svae_ = 0;}
            if ($('#decl_').is(':checked')){decl_ = 1;}else{decl_ = 0;}
            if ($('#das_').is(':checked')){das_ = 1;}else{das_ = 0;}
            if ($('#c3s_').is(':checked')){c3s_ = 1;}else{c3s_ = 0;}

            if( $('#non_affiche').is(':checked')){
                bool_checked_affiche_bilan = "n_affiche_pas";
            } else {
                bool_checked_affiche_bilan  = "";
            }
       
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'saveS',
                id_situation: id_situation,
                selectsituationdoss: $('#selectsituationdoss').val(),
                date_cloturation: $('#dtdrapl').val(),
                regime_dimpos: $('.rgimposition').val(),
                regime_dimpos2: $('.rgimposition2').val(),
                forme_juridique: $('.frjr').val(),
                dpcoala: $('#dpkl').val(),
                tvregime: $('#tvargtm').val(),
                tvadate_echeance: $('#tvaechange').val(),
                date_de_depot_dernier_keobiz:$('#date_de_depot_dernier_keobiz').val(),
                situation_trait_karlit: $('#situationk').val(),
                date_dernier_maj: $('#dmaj').val(),
                etat_bilan: $('#etabl').val(),
                date_envoie_bilan_karlit: $('#ddkv').val(),
                date_rev_bilan_fr: $('#dtsbfr').val(),
                observation: $('#obsfr').val(),
                date_dernier_appel_client: $('#dddp').val(),
                mem_autre_equipe: $('#listautredt').val(),
                cmtkarlit: $('#cmtkkkarlit').val(),
                user_fait: parseInt($('#user_fait').html().replace(/ /g,"").trim()),
                user_post:parseInt($('#user_post').html().replace(/ /g,"").trim()),
                date_debut_de_mission:$('#dt_db_mission').val(),

                Activite:"",
                social_bilan:$('#social_bilan').val(),
                tns_bilan:$('#tns_bilan').val(),
                releve_bilan:$('#releve_bilan').val(),
                cmt_relve_bilan:$('#cmt_relve_bilan').val(),
                achat_bilan:$('#achat_bilan').val(),
                vente_bilan:$('#vente_bilan').val(),
                cmt_autre_bilan:$('#cmt_autre_bilan').val(),
                Liase_:Liase_,
                ca12_:ca12_,
                solde_:solde_,
                cvae_:cvae_,
                svae_:svae_,
                decl_:decl_,
                das_:das_,
                c3s_:c3s_,
                bool_checked_affiche_bilan:bool_checked_affiche_bilan
            },
            success: function(data) {
                $('.optiondossclass').click();
                $('.close').click();
                $('#btn-lancer').click();
                $('#anulle_st').click();
            },

        });
    })
    
    $(document).on('change','#non_affiche', function(){
        $('#alert_mdp').hide();
        if( $(this).is(':checked')){
            bool_checked_affiche_bilan = false;
        } else {
            bool_checked_affiche_bilan  = true;
        }
    });

    $("#demande_mdp").on('hide.bs.modal', function(e){
        if( $("#non_affiche").is(':checked')){
            $("#non_affiche").prop("checked", false);
        } else {
            $("#non_affiche").prop("checked", true);
        }
        $('#txt_passwd,#txt_passwd_conf').val("");
    });
    
    $(document).on('click','#Valider_v', function(e){
      
        if($('#txt_passwd').val() == "" || $('#txt_passwd_conf').val() ==""){
            $('#alert_mdp').show();
            $('#txt_passwd').focus();
            return;
        }

        if(recuperlogin() == 0){
            $('#alert_mdp').show();
            $('#txt_passwd').focus();
        }else{
            $("#Annuller_v").click();                    
            if( $("#non_affiche").is(':checked')){
                $("#non_affiche").prop("checked", false);
            } else {
                $("#non_affiche").prop("checked", true);
            }
        };      

        $('#txt_passwd,#txt_passwd_conf').val("");
    });

    function recuperlogin(){
        var reponse = "";
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            async:false,
            data: {
                param: 'login_mdp',
                pwd: $('#txt_passwd_conf').val(), 
            },
            success: function(data) {
                reponse = data;
            },
        });
        return reponse;
    }
      
    function initialize(){
        $("#non_affiche").prop("checked", false);
        $("#ajout_non_affiche").prop("checked", false);
        $('#txt_passwd,#txt_passwd_conf').val("");
        $('#selectsituationdoss').val("");
        $('.s_cloture').html("")
        $('#dtdrapl').val("");
        $('.rgimposition').val("");
        $('.rgimposition2').val("");
        $('.frjr').val("");
        $('#dpkl').val("");
        $('#tvargtm').val("");
        $('#dt_db_mission').val("");
        $('#tvaechange').val("");
        $('#date_de_depot_dernier_keobiz').val("");
        $('#situationk').val("");
        $('#dmaj').val("");
        $('#etabl').val("");
        $('#ddkv').val("");
        $('#dtsbfr').val("");
        $('#obsfr').val("");
        $('#dddp').val("");
        $('#listautredt').val("");
        $('#cmtkkkarlit').val("");       
        $('.name_doss').html(""); 
        $('#dtclnov').val("");
        $('#Activite').val("");
        $('#social_bilan').val("");
        $('#tns_bilan').val("");
        $('#releve_bilan').val("");
        $('#cmt_relve_bilan').val("");
        $('#achat_bilan').val("");
        $('#vente_bilan').val("");
        $('#cmt_autre_bilan').val("");
    }

    $(document).on('click','#btnfiltre', function(){
        for(var i = 0; i < $('.tr_list_general').length; i++ ){
           var list_tableau  =  Date.parse($('.tr_list_general:eq('+i+') > td:eq(6)').html());
           $('.tr_list_general:eq('+i+')').removeClass('in_visible');
           if((list_tableau >= Date.parse($('#debutcl').val())) && (list_tableau <= Date.parse($('#finclo').val())) ){
            $('.tr_list_general:eq('+i+')').removeClass('in_visible');
           }else{
            $('.tr_list_general:eq('+i+')').addClass('in_visible');
           }
           $('.fermer_filtre').click();
        }
    })
    $(document).on('click','.annulefiltre', function(){
        $('#debutcl').val("");
        $('#finclo').val("");
        $('.tr_list_general').removeClass('in_visible');
    })     
    
    $(document).on('click', '#valideimport', function() {
        $('.idimport').each(function(index) {

            $.ajax({
                url: "route_Situation_portfeuille.php",
                type: 'POST',
                data: {
                    param: 'updateimport',
                    ID: $('.idimport:eq(' + index + ')').html(),
                    SITUATION_DOSSIER: $('.stdosst:eq(' + index + ')').html(),
                    COMMENTAIRE: $('.dscomt:eq(' + index + ')').html(),
                    DATE_CLOTURATION: $('.dtcltr:eq(' + index + ')').html(),
                    REGIME_D_IMPOS_1: $('.rg_1:eq(' + index + ')').html(),
                    REGIME_D_IMPOS_2: $('.rg_2:eq(' + index + ')').html(),
                    FORME_JURIDIQUE: $('.frmjd:eq(' + index + ')').html(),
                    DP_COALA: $('.dpscola:eq(' + index + ')').html(),
                    REGIME: $('.rgmoring:eq(' + index + ')').html(),
                    DATE_ECH: $('.dtecha:eq(' + index + ')').html(),
                    SITUATION_KARLIT: $('.stkarlits:eq(' + index + ')').html(),
                    DATE_MAJ: $('.dtmajj:eq(' + index + ')').html(),
                    ETAT_BILAN: $('.etbllbil:eq(' + index + ')').html(),
                },
                success: function(data) {

                },
            });
        })
        $('.optiondossclass').click();
        $('.close').click();
        $('#btn-lancer').click();
    })



    

    $(document).on('click','.tr_list_general', function(){
        $('.txt_rchrch:eq(0)').val("");
        $('.txt_rchrch:eq(1)').val("");
        $('.txt_rchrch:eq(2)').val("");
        $('.txt_rchrch:eq(3)').val("");
        $('.txt_rchrch:eq(4)').val("");
        $('.txt_rchrch:eq(5)').val("");
        $('.txt_rchrch:eq(6)').val("");
        $('.txt_rchrch:eq(7)').val("");

        id_situation = $(this).closest('tr').find('.situation_portfeuil_id').html();  
        id_dossier =    $(this).closest('tr').find('.id_dossier').html(); 
        $('#opacity_k').css({"opacity": "1"});
        $('#dossier_id_voalcick').html(id_dossier);
        $('#iddossier_chr').html(id_dossier);
        
        row_dossier = $(this).closest('.tr_list_general').find('td:eq(3)').html();
        row_situation = $(this).closest('.tr_list_general').find('td:eq(4)').html();
        row_cmt = $(this).closest('.tr_list_general').find('td:eq(5)').html();
        row_cloture = $(this).closest('.tr_list_general').find('td:eq(6)').html();
        row_imp1 = $(this).closest('.tr_list_general').find('td:eq(7)').html();
         row_imp2 = $(this).closest('.tr_list_general').find('td:eq(8)').html();
         row_frmjrd = $(this).closest('.tr_list_general').find('td:eq(9)').html();
         row_dpcoala = $(this).closest('.tr_list_general').find('td:eq(10)').html();
         row_regimtva= $(this).closest('.tr_list_general').find('td:eq(11)').html();
         row_dtech = $(this).closest('.tr_list_general').find('td:eq(12)').html();
         date_de_depot_dernier_keobiz = $(this).closest('.tr_list_general').find('td:eq(13)').html();
         row_sit_karlit = $(this).closest('.tr_list_general').find('td:eq(14)').html();
         row_date_mj = $(this).closest('.tr_list_general').find('td:eq(17)').html();
         row_eta_bl = $(this).closest('.tr_list_general').find('td:eq(18)').html();
         row_dt_envoie_karlit = $(this).closest('.tr_list_general').find('td:eq(19)').html();
         row_cdm = $(this).closest('.tr_list_general').find('td:eq(20)').html();
         row_dte_rev_sup = $(this).closest('.tr_list_general').find('td:eq(21)').html();
         row_obs_sup = $(this).closest('.tr_list_general').find('td:eq(22)').html();
         row_dernier_pes = $(this).closest('.tr_list_general').find('td:eq(23)').html();
         row_deernier_relance = $(this).closest('.tr_list_general').find('td:eq(24)').html();
         row_dernier_appel_client = $(this).closest('.tr_list_general').find('td:eq(25)').html();
         mem_autre_equipe =  $(this).closest('.tr_list_general').find('.mem_autre_equipe').html();

         
        Activite=  $(this).closest('.tr_list_general').find('.Activite').html();
        social=  $(this).closest('.tr_list_general').find('.social').html();
        tns =  $(this).closest('.tr_list_general').find('.tns').html();
        releve =  $(this).closest('.tr_list_general').find('.releve').html();
        commentaire_releve =  $(this).closest('.tr_list_general').find('.commentaire_releve').html();
        achat =  $(this).closest('.tr_list_general').find('.achat').html();
        vente =  $(this).closest('.tr_list_general').find('.vente').html();
        commentaire_et_autre =  $(this).closest('.tr_list_general').find('.commentaire_et_autre').html();


         initialize();
        $('#selectsituationdoss').val(row_situation);
        $('#dtdrapl').val(row_cloture);
        $('.rgimposition').val(row_imp1);
        $('.rgimposition2').val(row_imp2);
        $('.frjr').val(row_frmjrd);
        $('#dpkl').val(row_dpcoala);
        $('#tvargtm').val(row_regimtva);
        $('#tvaechange').val(row_dtech);
        $('#date_de_depot_dernier_keobiz').val(date_de_depot_dernier_keobiz)
        $('#situationk').val(row_sit_karlit);
        $('#dmaj').val(row_date_mj);
        $('#etabl').val(row_eta_bl);
        $('#ddkv').val(row_dt_envoie_karlit);
        $('#dtsbfr').val(row_dte_rev_sup);
        $('#obsfr').val(row_obs_sup);
        $('#dddp').val(row_dernier_appel_client);
        $('#listautredt').val(mem_autre_equipe);
        $('#cmtkkkarlit').val(row_cmt.replace(/<div class="truncate">/g,"").replace(/<\/div>/g,""));
        $('.name_doss').html("NOM DOSSIER : <b style='color:red'>" + row_dossier + "</b>");

        $('#Activite').val(Activite);
        $('#social_bilan').val(social);
        $('#tns_bilan').val(tns);
        $('#releve_bilan').val(releve);
        $('#cmt_relve_bilan').val(commentaire_releve);
        $('#achat_bilan').val(achat);
        $('#vente_bilan').val(vente);
        $('#cmt_autre_bilan').val(commentaire_et_autre);
        $('.s_cloture').html("CLOTURE : " + row_cloture)
        recupere_checked_suivi(id_situation);
        if(row_dt_envoie_karlit != "" && $('#nom_poste_select').html() != "CDM"){
            $('#svSituation').css({"display":"none"})
            $('#bodysuivi').addClass("disabled_as");
        }else{
            $('#svSituation').css({"display":""});
            $('#bodysuivi').removeClass("disabled_as");
        }
    })

    function date_format(date){
        var datev = date.closest('tr').find('.ms').html();
        var annee = datev.substring(6, 10);
        var mois = datev.substring(3, 5);
        var date_cloture = annee + "-" + mois;
        return date_cloture;
    }

    function recupere_checked_suivi(id){
        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param:"recupere_checked",
                id:id
            },
            success: function(data) {

                let Liase__ = 1,
                ca12__= 1,
                solde__= 1,
                cvae__= 1,
                svae__= 1,
                decl__= 1,
                das__= 1,
                c3s__= 1;

                if(data[0].param_liase_fiscal == 1 || data[0].param_liase_fiscal == null){Liase__ = true;}else{Liase__ = false;}
                if(data[0].param_ca12 == 1 || data[0].param_ca12 == null){ca12__ = true;}else{ca12__ = false;}
                if(data[0].param_solde_is == 1 || data[0].param_solde_is == null){solde__ = true;}else{solde__ = false;}
                if(data[0].param_cva1330 == 1 || data[0].param_cva1330 == null){cvae__ = true;}else{cvae__ = false;}
                if(data[0].param_solde_cvae == 1 || data[0].param_solde_cvae == null){svae__ = true;}else{svae__ = false;}
                if(data[0].param_decloyer == 1 || data[0].param_decloyer == null){decl__ = true;}else{decl__ = false;}
                if(data[0].param_das2 == 1 || data[0].param_das2 == null){das__ = true;}else{das__ = false;}
                if(data[0].param_c3s == 1 || data[0].param_c3s == null){c3s__ = true;}else{c3s__ = false;}

                $('#Liase_').prop('checked', Liase__);
                $('#ca12_').prop('checked', ca12__);
                $('#solde_').prop('checked', solde__);
                $('#cvae_').prop('checked', cvae__);
                $('#svae_').prop('checked', svae__);
                $('#decl_').prop('checked', decl__);
                $('#das_').prop('checked', das__);
                $('#c3s_').prop('checked', c3s__);
                    
                var moiscloture = $('#dtdrapl').val().substring(5,7);
                var anneecloture = $('#dtdrapl').val().substring(0,4);

                if(data[0].affiche_dans_stat == null){
                $("#non_affiche").prop("checked", false);
                }else{
                    $("#non_affiche").prop("checked", true); 
                }

                if(data[0].date_debut_de_mission == null){
                    if((parseInt(moiscloture) - 11) == 0){
                        moiscloture = parseInt(moiscloture) + 1;
                        if(moiscloture < 10){
                            moiscloture = "0" + moiscloture
                        }
                       anneecloture = parseInt(anneecloture) - 1;
                       $('#dt_db_mission').val(anneecloture + "-" + moiscloture + "-" + "01" )
                    }else{
                        if((parseInt(moiscloture) - 11) < 0){
                            anneecloture = parseInt(anneecloture) - 1;
                            moiscloture =  parseInt(moiscloture) + 1;
                            if(moiscloture < 10){
                                moiscloture = "0" + moiscloture
                            }
                            $('#dt_db_mission').val(anneecloture + "-" + moiscloture + "-" + "01" )
                         }else{
                            if((parseInt(moiscloture) - 11) > 0){
                                moiscloture =  parseInt(moiscloture) - 11;
                                if(moiscloture < 10){
                                    moiscloture = "0" + moiscloture
                                }
                                $('#dt_db_mission').val(anneecloture + "-" + moiscloture + "-" + "01" )
                             }
                         }
                    }
               
                }else{
                    $('#dt_db_mission').val(data[0].date_debut_de_mission);
                }
                

            },
        });
    }

    $(document).on('dblclick',".tr_list_general", function(){
        var index = $(this).index();
        $('.tr_list_general:eq('+index+') > td:eq(0)').click();
        return;
    });

    $(document).on('change','#dernier_exercice',function(){
        if( $(this).is(':checked') ){
            $('.choiexo').hide(50);
        } else {
            $('.choiexo').show(50);
        }
    })
    $('#upload').click();
   
    $(document).on('click','.edit_list',function(){
        $('#precompta_assd').hide();
    })    
    
    $(document).on("click","#anulle_st", function(){
        $('.modal-backdrop').remove();
        $('body').removeClass( "modal-open" );
    })
$(document).on('click','.opacity_ex',function(){
    $('#opacity_k').css({"opacity": "0.3"});
})

$(document).on('click','.close,.closex',function(){
    $('#opacity_k').css({"opacity": "1"});
})

$(document).on('click','.closeg',function(){
    $('#opacity_k').css({"opacity": "1"});
    $('.modal-backdrop').remove();
})

    
})

