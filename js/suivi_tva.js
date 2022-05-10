$(function(){
    var id_situation = "";
    var index_tr = "";
    var name_doss = "";
     var tet_datatable = 
            '<table id="datatablesituation" class="table-bordered display text-center" width="100%">'+
            '<thead class="th_databale">'+
            '<tr>'+
            '<th style="display:none" ></th>'+
            '<th style="background:#ecfeff">DOSSIER</th>'+
            '<th>EQUIPE</th>'+
            '<th style="background:#ecfeff">SITUATION</th>'+
            '<th>DATE DE CLOTURE</th>'+
            '<th style="background:#ecfeff">_Etat</th>' +
            '<th style="display:none">ETAT</th>' +
            '<th>ECHEANCE</th>'+
            '<th>Regime tva</th>'+
            '<th style="background:#ecfeff">_RELEVE</th>'+
            '<th style="display:none">RELEVE</th>'+
            '<th style="background:#ecfeff">_ACHATS</th>'+
            '<th style="display:none">ACHATS</th>'+
            '<th style="background:#ecfeff">_VENTES</th>'+
            '<th style="display:none">VENTES</th>'+
            '<th>AUTRES</th>'+
            '<th>COMMENTAIRES</th>'+
            '<th>DATE DEPOT PIECE</th>'+
            '<th>DATE DERNIERE RELANCE PIECE</th>'+
            '<th>DATE TVA FAIT KARLIT</th>'+
            '<th>DATE ENVOIE CLIENT	</th>'+
            '<th>DATE VALIDATION CLIENT</th>'+
            '<th>DATE TÉLÉTRANSMISSION</th>'+
            '<th>DATE VALIDATION EDI</th>'+
            '<th>S</th>'+
            '<th>Responsable</th>'+


            '</tr><thead><tbody>';

            var tablevirtuel = 
            '<table id="table_export_virtuel" class="table-bordered display text-center" width="100%">'+
            '<thead class="th_databale">'+
            '<tr>'+
            '<th style="display:none" ></th>'+
            '<th>DOSSIER</th>'+
            '<th>EQUIPE</th>'+
            '<th>SITUATION</th>'+
            '<th>DATE DE CLOTURE</th>'+
            '<th>ETAT</th>' +
            '<th>ECHEANCE</th>'+
            '<th>Regime tva</th>'+
            '<th>RELEVE</th>'+
            '<th>ACHATS</th>'+
            '<th>VENTES</th>'+
            '<th>AUTRES</th>'+
            '<th>COMMENTAIRES</th>'+
            '<th>DATE DEPOT PIECE</th>'+
            '<th>DATE DERNIERE RELANCE</th>'+
            '<th>DATE TVA FAIT KARLIT</th>'+
            '<th>DATE ENVOIE CLIENT	</th>'+
            '<th>DATE VALIDATION CLIENT</th>'+
            '<th>DATE TÉLÉTRANSMISSION</th>'+
            '<th>DATE VALIDATION EDI</th>'+
            '<th>Responsable</th>'+
            '</tr><thead><tbody>';            

     function datatable(){
        // Setup - add a text input to each footer cell
        $('#datatablesituation thead tr').clone(true).appendTo( '#datatablesituation thead' );
        $('#datatablesituation thead tr:eq(1) th').each( function (i) {
            var title = $(this).text();
            $(this).html( '' );
            if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8  || i == 9  || i == 10 || i == 11  || i == 13 
                || i == 14 || i == 15 || i == 16 || i > 17) {
                if (i == 0) $(this).html("");
                if (i == 1) $(this).html("<input type='text' class='stsearch'>");
                if (i == 2) $(this).html("");
                if (i == 3) $(this).html($('#sit_dossier').html());
                if (i == 4) $(this).html("");
                if (i == 5) $(this).html("<select class='stsearch' ><option value=''></option>" + $('#etat_tva').html() +"</select>");
                if (i == 6) $(this).html("<input type='number' class='stsearch'>");
                if (i == 9) $(this).html("<select class='stsearch' ><option value=''></option><option value='OK'>OK</option><option value='A RELANCER'>A RELANCER</option></select>");
                if (i == 11) $(this).html("<select class='stsearch' ><option value=''></option><option value='OK'>OK</option><option value='A RELANCER'>A RELANCER</option></select>");
                if (i == 13) $(this).html("<select class='stsearch' ><option value=''></option><option value='OK'>OK</option><option value='A RELANCER'>A RELANCER</option></select>");
                

            } 
         
            $( '.txtserach,.stsearch', this ).on( 'keyup change', function () {
                if ( table.column(i).search() !== this.value ) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
                $('#tablvirtuel_suivie').html($('#datatablesituation > tbody').html());
            });
        } );
    

    var table = $('#datatablesituation').DataTable( {
            orderCellsTop: true,
            scrollY:        parseInt($(window).height()) - (parseInt($(window).height()) / 4.5),
            scrollX:        screen.width,
            deferRender:    true,
            scroller:       true,
            filter: true,
            "paging": false
        } );
    }
   
    $(document).on('click','#btn-lancer',function(){
        var exo = $('#select_annee').val();
        var mois = $('#select_mois').val();
        var equipe = $('#select_equip').val();
        var regim_tv = $('#et_rt').val();
        valeur_virtuel = "";
        valeur = "";
        if(exo == ""  ||mois == "" || equipe == "" || regim_tv == ""){
            alert("Attention critères incomplete ! ");
            return ;
        }
        $('#loading').show();
        $.ajax({
                url: "route_Situation_portfeuille.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param: 'list_suivi_tva',
                    equipe:equipe,
                    exo:exo,
                    mois:mois,
                    regim_tv:regim_tv,
                },
                success: function(data) {
        
                for(var i = 0; i < data.length; i++){
                    console.log(data[i].mois_selection);
                    var etat_tva_base = "";var releve_base = ""; var achats_base = ""; var vente_base = "";
                    var autres_base = ""; var commentaire_base = "";
                    var depot_piece = "";
                    var date_dernier_relance = "";
                    var date_tva_fait_karlit = "";
                    var date_envoie_client = "";
                    var date_validation_client = "";
                    var date_teletransmission = "";
                    var date_validation_edi = "";
                    var user_modif = "";
                    if(data[i].mois_selection != null){
                        etat_tva_base = data[i].mois_selection.split("#")[0];
                        releve_base = data[i].mois_selection.split("#")[1];
                        achats_base = data[i].mois_selection.split("#")[2];
                        vente_base = data[i].mois_selection.split("#")[3];
                        autres_base = data[i].mois_selection.split("#")[4];
                        commentaire_base = data[i].mois_selection.split("#")[5];

                        depot_piece = data[i].mois_selection.split("#")[6];
                        date_tva_fait_karlit = data[i].mois_selection.split("#")[8];
                        date_envoie_client = data[i].mois_selection.split("#")[9];
                        date_validation_client = data[i].mois_selection.split("#")[10];
                        date_teletransmission = data[i].mois_selection.split("#")[11];
                        date_validation_edi = data[i].mois_selection.split("#")[12];
                        user_modif = data[i].mois_selection.split("#")[13];
                        
                    }
                    valeur += "<tr class='tr_list_general'>"+
                    '<td style="display:none" class="id_st">'+data[i].situation_id+'</td>' +
                    '<td style="white-space:nowrap ;background-color: #293340f2;color:#fff"" class="name_doss">' +data[i].nom_dossier +'</td>'+
                    '<td style="white-space:nowrap ;background-color: #293340f2;color:#fff">'+data[i].equipe +'</td>'+
                    '<td style="white-space:nowrap ;background-color: #293340f2;color:#fff">'+data[i].situation_dossier +'</td>'+
                    '<td style="white-space:nowrap ;background-color: #293340f2;color:#fff" class="cloture_date">'+data[i].cloture+'</td>'+
                    '<td class="etat_tva_savex" style="display:none">'+etat_tva_base+'</td>' +
                    '<td class="etat_tva_save"><select class="stsearch">' +  "<option value='"+etat_tva_base+"'>"+etat_tva_base+"</option>" + "<option value=''></option>" + $('#etat_tva').html() +'</select></td>' +
                    '<td style="white-space:nowrap ;background-color: #7896b5;color:#fff">'+data[i].echeance +'</td>'+
                    '<td>'+data[i].regime_tva+'</td>'+
                    '<td class="etat_tva_savex" style="display:none">'+releve_base+'</td>' +
                    '<td class="releve"><select class="stsearch"> '+  "<option value='"+releve_base+"'>"+releve_base+"</option>" + "<option value=''></option>" + $('#ok_ar').html() +'</select></td>'+
                    '<td class="etat_tva_savex" style="display:none">'+achats_base+'</td>' +
                    '<td class="achats"><select class="stsearch"> '+ "<option value='"+achats_base+"'>"+achats_base+"</option>" + "<option value=''></option>" + $('#ok_ar').html() +'</select></td>'+
                    '<td class="etat_tva_savex" style="display:none">'+vente_base+'</td>' +
                    '<td class="ventes"><select class="stsearch"> '+ "<option value='"+vente_base+"'>"+vente_base+"</option>" + "<option value=''></option>" + $('#ok_ar').html() +'</select></td>'+
                    '<td class="autres"><textarea cols="30" rows="2" >'+ autres_base +'</textarea></td>'+
                    '<td class="commentaire"><textarea cols="30" rows="2" >'+commentaire_base+'</textarea></td>'+
                    '<td class="depot_piece" style="white-space: nowrap;">'+ data[i].date_de_depot_dernier_keobiz+'</td>'+
                    '<td class="date_dernier_relance" style="white-space: nowrap;">' + data[i].dernier_relance +'</td>'+
                    '<td class="date_tva_fait_karlit"><input type="date" value="'+ date_tva_fait_karlit  +'"></td>'+
                    '<td class="date_envoie_client"><input type="date" value="'+ date_envoie_client +'">	</td>'+
                    '<td class="date_validation_client"><input type="date" value="'+ date_validation_client +'"></td>'+
                    '<td class="date_teletransmission"><input type="date" value="'+ date_teletransmission +'"></td>'+
                    '<td class="date_validation_edi"><input type="date" value="'+ date_validation_edi +'"></td>'+
                    '<td class="save_list"><button data-toggle="modal"><i class="fas fa-save"></i></button></td>'+
                    '<td style="white-space:nowrap ;background-color: #293340f2;color:#fff">'+ user_modif +'</td>'+
                    "</tr>";

                    valeur_virtuel  += "<tr class='tr_list_general'>"+
                    '<td style="display:none" class="id_st">'+data[i].situation_id+'</td>' +
                    '<td style="white-space:nowrap ;background-color: #7896b5;color:#fff" class="name_doss">' +data[i].nom_dossier +'</td>'+
                    '<td style="white-space:nowrap ;background-color: #7896b5;color:#fff">'+data[i].equipe +'</td>'+
                    '<td style="white-space:nowrap ;background-color: #7896b5;color:#fff">'+data[i].situation_dossier +'</td>'+
                    '<td style="white-space:nowrap ;background-color: #7896b5;color:#fff" class="cloture_date">'+data[i].cloture+'</td>'+
                    '<td>' + etat_tva_base  + '</td>' +
                    '<td style="white-space:nowrap ;background-color: #7896b5;">'+data[i].echeance +'</td>'+
                    '<td>'+data[i].regime_tva+'</td>'+
                    '<td>'+releve_base+ '</td>'+
                    '<td>' + achats_base+'</td>'+
                    '<td>'+vente_base+ '</td>'+
                    '<td>'+ autres_base +'</td>'+
                    '<td>'+commentaire_base+'</td>'+
                    '<td>'+ depot_piece +'</td>'+
                    '<td>'+ date_dernier_relance  +'</td>'+
                    '<td>'+ date_tva_fait_karlit  +'</td>'+
                    '<td>'+ date_envoie_client +'</td>'+
                    '<td>'+ date_validation_client +'</td>'+
                    '<td>'+ date_teletransmission +'</td>'+
                    '<td>'+ date_validation_edi +'</td>'+
                    '<td style="white-space:nowrap ;background-color: #7896b5;color:#fff">'+ user_modif +'</td>'+
                    "</tr>";
                }
                
                $('#datatable_suivi_tva').html(tet_datatable + valeur.replace(/null/g, "").replace(/ 00:00:00/g,"") + "</tbody></table>");
                $('#tablvirtuel_suivie').html(tablevirtuel + valeur_virtuel.replace(/null/g, "") + "</tbody></table>");
                $('#datatable_suivi_tva').css({'zoom':'80%'});
                datatable();
                $('#datatable_suivi_tva thead:eq(1)').html("");   
                $('#loading').hide();
                },
            })
        


    })

    $(document).on('click','.tr_list_general',function(){
        //index_tr = $(this).index();
    })

    var date_test = "";
    $(document).on('click','.save_list',function(){
        id_situation = $(this).closest('tr').find('.id_st').html();
        var etat_tva_save = $(this).closest('tr').find('.etat_tva_save').find('select').val();
        var releve = $(this).closest('tr').find('.releve').find('select').val();
        var achats = $(this).closest('tr').find('.achats').find('select').val();
        var ventes = $(this).closest('tr').find('.ventes').find('select').val();
        var autres = $(this).closest('tr').find('.autres').find('textarea').val();
        var commentaire = $(this).closest('tr').find('.commentaire').find('textarea').val();

        var depot_piece = $(this).closest('tr').find('.depot_piece').html();
        var date_dernier_relance = $(this).closest('tr').find('.date_dernier_relance').find('input').val();
        var date_tva_fait_karlit = $(this).closest('tr').find('.date_tva_fait_karlit').find('input').val();
        var date_envoie_client = $(this).closest('tr').find('.date_envoie_client').find('input').val();
        var date_validation_client = $(this).closest('tr').find('.date_validation_client').find('input').val();
        var date_teletransmission = $(this).closest('tr').find('.date_teletransmission').find('input').val();
        var date_validation_edi = $(this).closest('tr').find('.date_validation_edi').find('input').val();
        var cloture_date = $(this).closest('tr').find('.cloture_date').html();

        $('#loading').show();
        var resultats = etat_tva_save + "#" + releve + "#" + achats + "#" + ventes + "#" + autres + "#" + commentaire +
        "#" + depot_piece + "#" + date_dernier_relance + "#" + date_tva_fait_karlit + "#" + date_envoie_client +
        "#" + date_validation_client + "#" + date_teletransmission + "#" + date_validation_edi;
        var date_j = ["janvier","fevier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"];

        if( parseInt(date_j.indexOf($('#select_mois').val())) + 1 < 10){
            date_test = "0"  + (parseInt(date_j.indexOf($('#select_mois').val())) + 1);
        }else{
            date_test = parseInt(date_j.indexOf($('#select_mois').val().trim())) + 1;
        };
      
        var date_selection = $('#select_annee').val() + "-" + date_test;

        if(parseInt(date_selection.replace(/-/g,"")) > parseInt(cloture_date.substring(0,7).replace(/-/g,""))){
            date_test = parseInt($('#select_annee').val()) + 1;
        }
        if(parseInt(date_selection.replace(/-/g,"")) <= parseInt(cloture_date.substring(0,7).replace(/-/g,""))){
            date_test = parseInt($('#select_annee').val());
        }

        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            data: {
                param: 'update_suivi_tva',
                id_situation:id_situation,
                colone_mois:$('#select_mois').val(),
                anne_playbilan: date_test,
                valeur_colonnes: resultats,
                user_modif:$('#nom_modif').html(),
            },
            success: function(data) {
                $('#loading').hide();
                alert("modification Ok");
            }
        })
    })

    $(document).on('change','#select_annee,#select_mois,#select_equip',function(){
        $('#datatable_suivi_tva').html("");
    })

    var annuel = '  <option value=""></option><option value="janvier">Janvier</option>'+
    '<option value="fevrier">Fevier</option>'+
    '<option value="mars">Mars</option>'+
    '<option value="avril">Avril</option>'+
    '<option value="mais">Mai</option>'+
    '<option value="juin">Juin</option>'+
    '<option value="juillet">Juillet</option>'+
    '<option value="aout">Aout</option>'+
    '<option value="septembre">Septembre</option>'+
    '<option value="octobre">Octobre</option>'+
    '<option value="novembre">Novembre</option>'+
    '<option value="decembre">Decembre</option>';

    var trimestriel = 
    '  <option value=""></option><option value="mars">Mars</option>'+
    '<option value="juin">Juin</option>'+
    '<option value="septembre">Septembre</option>'+
    '<option value="decembre">Decembre</option>';

    $(document).on('change','#et_rt',function(){
        $('#datatable_suivi_tva').html("");
        $('#select_mois').val("");
        if($(this).val() == "ET/RT"){
            $('#optionmois').html('<select id="select_mois" >' + trimestriel + '</select>');
        }else{
        $('#optionmois').html('<select id="select_mois" >' + annuel + '</select>');
        }

    })

 
})