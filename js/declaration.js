$(function(){
    var id_situation = "";
    var index_click = 0;
    var tabs_name="";
    var monthName=['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    var dayName= ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];

    var tet_datatable = 
            '<table id="datatablesituation" style="width:100%" class="table-bordered display text-center" width="100%">'+
            '<thead class="th_databale">'+
            '<tr>'+
            '<th class="m_code_stuation in_visible">#</th>'+
            '<th class="m_code_stuation in_visible">#</th>'+
            '<th class="in_visible"></th>' +
            '<th>dossier</th><th class="in_visible">sit_dossier</th><th class="m_code_stuation">cmt</th><th class="in_visible">cloture</th><th class="in_visible">rg_d_imp1</th><th class="in_visible">rg_d_imp2</th>'+
            '<th class="m_code_stuation">frm_jrdq</th><th class="m_code_stuation">dp_coala</th><th class="in_visible">regime TVA</th><th class="m_code_stuation">dt_ech</th><th class="m_code_stuation">sit_karlit</th><th class="m_code_stuation">date_maj</th>'+
            '<th class="m_code_stuation">etat_bl</th><th class="m_code_stuation">dt_d_envoie_bl_krlt</th><th class="m_code_stuation">cdm</th><th class="m_code_stuation">dt_rev_sup_fr</th><th class="m_code_stuation">obs_sup_fr</th><th class="m_code_stuation">dernier_pes</th>'+
            '<th class="m_code_stuation">dernier_relance</th><th class="m_code_stuation">dernier_appel_client</th></th>'+
            '<th class="in_visible">id_situation</th>' +
            '<th class="in_visible">id_dossier</th>' +
            '<th class="in_visible">id_situation</th>' +
            '<th class="in_visible">id_dossier</th>' +
            '</tr><thead><tbody>';

    
    $(document).on('click','#btn-lancer',function(){
        $('.mm').html("-");
        $('#date_cloture,#name_doss').html("");
        $('#ex1-content').hide(100);  
        $('.ttdate').html("-");
        $('.dtensemble').val("");
        $('.dtnumberensembe').val("0");
        $('.cmtensemble').val('-');
        $('.dt_trim_t').html('-');
        $('.trim_ttdate').html('-');
        var equipeselectionnes =  $('.customselect-list:eq(0) > .customselect-dropdown-text:eq(0)').html().trim().replace(/ /g,"");
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
                    "<td class='m_code_stuation'><button><i class='fas fa-eye' ></i></button></td>"+
                    "<td class='edit_list m_code_stuation'><button  data-toggle='modal' data-target='#viewsuivie'><i class='fas fa-edit'></i></button></td>"+
                    "<td class='in_visible'>"+ data[i].code +"</td>"+
                    "<td>" + data[i].dossier + "</td><td class='in_visible'>" + data[i].sit_dossier +
                     "</td></td><td class='m_code_stuation'>" + data[i].cmt + "</td></td><td class='in_visible'>" + 
                     data[i].cloture + "</td></td><td class='in_visible'>" + data[i].rg_d_imp1 +  "</td>"+
                    "<td class='in_visible'>" + data[i].rg_d_imp2 + "</td><td class='m_code_stuation'>" + data[i].frm_jrdq + 
                    "</td></td><td class='m_code_stuation'>" + data[i].dp_coala +  "</td></td><td class='in_visible'>" + data[i].regime +
                      "</td></td><td class='m_code_stuation'>" + data[i].dt_ech +  "</td>"+
                    "<td class='m_code_stuation'>" + data[i].sit_karlit + "</td><td class='m_code_stuation'>" + data[i].date_maj + "</td></td><td class='m_code_stuation'>" +
                     data[i].etat_bl +  "</td></td><td class='m_code_stuation'>" + data[i].dt_d_envoie_bl_krlt + 
                      "</td></td><td class='m_code_stuation'>" + data[i].cdm +  "</td>"+
                    "<td class='m_code_stuation'>" + data[i].dt_rev_sup_fr + "</td><td class='m_code_stuation'>" + data[i].obs_sup_fr + 
                     "</td></td><td  class='m_code_stuation'>" + data[i].dernier_pes +  "</td></td><td class='m_code_stuation'>"
                      + data[i].dernier_relance +  "</td></td><td class='m_code_stuation'>" + data[i].dernier_appel_client +  "</td>"+
                    "<td class='situation_portfeuil_id in_visible m_code_stuation'>"+data[i].situation_portfeuil_id+"</td>"+
                    "<td class='id_dossier in_visible'>"+data[i].id_dossier+"</td>"+                    
                    "<td class='id_dossier in_visible'>"+data[i].date_modif_revu+"</td>"+     
                    "<td class='id_dossier in_visible'>"+data[i].date_expert+"</td>"+     
                    "</tr>";
                    valeur = valeur.replace(/null/g,"").replace(/ 00:00:00/g,"");
                }

                $('#datatable_situation').html(tet_datatable + valeur + "</tbody></table>");
                $('#datatable_situation').css({'zoom':'70%'});
                datatable();
                $('#datatable_situation thead:eq(1)').html("");   
                $('#datatablesituation_wrapper').show(300);
                $('#loading').hide();
                $('#tab_declaration').show(100);
                $('.tr_list_general:eq(0)').click();
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
                || i == 14 || i == 15 || i == 16 || i > 17) {
                if (i == 0) $(this).html("");
                if (i == 1) $(this).html("");
                if (i == 4) $(this).html($('#sit_dossier').html());
                if (i == 6 || i == 14 || i == 16 ) $(this).html("<input type='date' class='stsearch'>");
                if (i == 7) $(this).html($('#regime_impos1').html());
                if (i == 8) $(this).html($('#regime_impos2').html());
                if (i == 10) $(this).html($('#dp_coala').html());                
                if (i == 11) $(this).html($('#tva_regime').html());
                if (i == 15) $(this).html($('#etat_bilan').html());
                if(i > 17) $(this).html("");

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
            } );
        } );
    
        var table = $('#datatablesituation').DataTable( {
            orderCellsTop: true,
            scrollY:        screen.height / 1.5,
            scrollX:        600,
            deferRender:    true,
            scroller:       true,
            filter: true,
            "paging": false,
        } );
    }
   
    $(document).on('keyup','#cmt_globale',function(){
        $('.commentaire_globale').html($(this).val());
    })

    $(document).on('keyup','#cmt_st1',function(){
        $('.etat_cmt_1').html($(this).val());
    })
    
    $(document).on('keyup','#cmt_st2',function(){
        $('.etat_cmt_2').html($(this).val());
    })

    $(document).on('change','#date_dernierkeobiz',function(){
        $('.datedernierkeobiz').html($(this).val());
    })
    

    $(document).on('change','#select_st1',function(){
        $('.etat_1').html($('#select_st1 option:selected').text());
    })

    $(document).on('change','#select_st2',function(){
        $('.etat_2').html($('#select_st2 option:selected').text());
    })

    
    $(document).on('change','#piece_n1',function(){
        $('.etat_pice_1').html($('#piece_n1 option:selected').text());
    })

    $(document).on('change','#piece_n2',function(){
        $('.etat_pice_2').html($('#piece_n2 option:selected').text());
    })

    $(document).on('click','.customselect-list-input-item', function(){
        $('#datatablesituation_wrapper').hide(300);
        $('#tab_declaration').hide(300);
        
    })
    
    $(document).on('click','.tr_list_general', function(){
        index_click = $(this).closest('tr').index();
        $('#tab_declaration').hide(100);
         $('#tab_declaration').show(100);
         $('#ex1-content').hide(100); 
         $('.date_rp').val("");
         $('.cmt_st1').val("");
         $('.form-control').val("");
         $('.nav-link').removeClass('active');
         $('.dtnumberensembe').val(0);
         $('.tb_declaration_tabs').addClass('in_visible');
         $('#name_doss').html("Nom dossier : <b style='color:red'><i class='far fa-folder-open'></i> "+ $(this).closest('.tr_list_general').find('td:eq(3)').html() +"</b>");
         $('#date_cloture').html("Cloture : <b style='color:red'><i class='far fa-folder-open'></i> "+ $(this).closest('.tr_list_general').find('td:eq(6)').html() +"</b>");
         $('.dtechange').html($(this).closest('.tr_list_general').find('td:eq(6)').html());
         $('.ctp_tva_st').html("-");
         id_situation =  $(this).closest('tr').find('.situation_portfeuil_id').html();
         var ech = $(this).closest('.tr_list_general').find('td:eq(12)').html();
        var startdate = $(this).closest('.tr_list_general').find('td:eq(6)').html();
        var mois = moment(startdate, "YYYY-MM-DD").format('MM'); // io
        var dt = (moment(startdate, "YYYY-MM-DD").add(-mois, 'months').format('YYYY-MM')); // io

        $('.mm').html("-");
        $('.ttdate').html("-");
        $('.dtensemble').val("");

        $('.ttdate').each(function(index,value){
               if(parseInt(mois) > 11 ){
                var newDate = moment(dt, "YYYY-MM-DD").add(index + 1, 'months').format('YYYY-MM');
                $(this).html(newDate + "-" + ech);
                $('.mm:eq('+ index +')').html(monthName[parseInt(moment(startdate, "YYYY-MM-DD").add(index + 1, 'months').format('MM')) - 1]);
                }else{
                    var newDate = moment(startdate, "YYYY-MM-DD").add(-1,'years').add(index + 1, 'months').format('YYYY-MM');
                    $(this).html(newDate + "-" + ech);
                    $('.mm:eq('+ index +')').html(monthName[parseInt(moment(startdate, "YYYY-MM-DD").add(index + 1, 'months').format('MM')) - 1]);
        
                }
            
        })

        $('.dt_trim_t').each(function(index,value){
            $(this).html((index + 1) + "T" + "-" +  moment(startdate, "YYYY-MM-DD").add(index + 1, 'months').format('YYYY') );
        })
        $('.trim_ttdate:eq(0)').html(moment(startdate, "YYYY-MM-DD").add(-8, 'months').format('YYYY-MM') + "-" + ech);
        $('.trim_ttdate:eq(1)').html(moment(startdate, "YYYY-MM-DD").add(-5, 'months').format('YYYY-MM') + "-" + ech);
        $('.trim_ttdate:eq(2)').html(moment(startdate, "YYYY-MM-DD").add(-2, 'months').format('YYYY-MM') + "-" + ech);
        $('.trim_ttdate:eq(3)').html(moment(startdate, "YYYY-MM-DD").add(+1, 'months').format('YYYY-MM') + "-" + ech);

        $('.dt_cvae:eq(0)').html(moment(startdate, "YYYY-MM-DD").add(-1, 'years').add(+6, 'months').format('YYYY-MM') + "-" + "15");
        $('.dt_cvae:eq(1)').html(moment(startdate, "YYYY-MM-DD").add(-1, 'years').add(+9, 'months').format('YYYY-MM') + "-" + "15");
        $('.dt_cfe:eq(0)').html(moment(startdate, "YYYY-MM-DD").add(-1, 'years').add(+6, 'months').format('YYYY-MM') + "-" + "15");
        $('.dt_cfe:eq(1)').html(moment(startdate, "YYYY-MM-DD").add(-1, 'years').add(+9, 'months').format('YYYY-MM') + "-" + "15");

        $('.n_tvs').html(moment(startdate, "YYYY-MM-DD").add(+1, 'months').format('YYYY-MM') + "-" + ech);

        var mois = moment(startdate, "YYYY-MM-DD").format('DD');

        $('.ctp_tva_st:eq(0)').html(moment(startdate, "YYYY-MM-DD").format('YYYY') + "-07-" + ech);
        $('.ctp_tva_st:eq(1)').html(moment(startdate, "YYYY-MM-DD").format('YYYY') + "-12-" + ech);

        if(Date.parse(startdate) < Date.parse(moment(startdate, "YYYY-MM-DD").format('YYYY') + "-07-" + ech)){
            $('.ctp_tva_st:eq(0)').html(moment(startdate, "YYYY-MM-DD").add(-1,'years').format('YYYY') + "-07-" + ech);
        }     

        if(Date.parse(startdate) < Date.parse(moment(startdate, "YYYY-MM-DD").format('YYYY') + "-12-" + ech)){
            $('.ctp_tva_st:eq(1)').html(moment(startdate, "YYYY-MM-DD").add(-1,'years').format('YYYY') + "-12-" + ech);
        }

        var tva_regime = $(this).closest('.tr_list_general').find('td:eq(11)').html();
  
            if(tva_regime== "EM" || tva_regime== "RM"){
                $('.tb_declaration_tabs:eq(0)').removeClass('in_visible');
                $('.tb_declaration_tabs:eq(3)').removeClass('in_visible');
            }
    
            if(tva_regime== "ET" || tva_regime== "RT"){
                $('.tb_declaration_tabs:eq(1)').removeClass('in_visible');
                $('.tb_declaration_tabs:eq(3)').removeClass('in_visible');
            }

            if(tva_regime== "ST"){
                $('.tb_declaration_tabs:eq(2)').removeClass('in_visible');
                $('.tb_declaration_tabs:eq(3)').removeClass('in_visible');
                
             }

            if(tva_regime== "IS"){
                $('.tb_declaration_tabs:eq(3)').removeClass('in_visible');
               }

            $('.tb_declaration_tabs:eq(4)').removeClass('in_visible');
            $('.tb_declaration_tabs:eq(5)').removeClass('in_visible');
            $('.tb_declaration_tabs:eq(6)').removeClass('in_visible');
            $('.tb_declaration_tabs:eq(7)').removeClass('in_visible');
            $('.tb_declaration_tabs:eq(8)').removeClass('in_visible');
            var tvs_select = {param:'tvs_select',id_situation:id_situation}
            //declartion(tvs_select); 

            var bilan_select = {param:'bilan_select',id_situation:id_situation}
            //declartion(bilan_select);
            recuper_v_d(id_situation,$(this).closest('tr').find('td:eq(16)').html(),$(this).closest('tr').find('td:eq(25)').html(),$(this).closest('tr').find('td:eq(26)').html());

            var cvae_select = {param:'cvae_select',id_situation:id_situation}
            declartion(cvae_select);

            var acompt_tva_st_select = {param:'acompt_tva_st_select',id_situation:id_situation}
            declartion(acompt_tva_st_select);

            var acompte_is_select = {param:'acompte_is_select',id_situation:id_situation}
            declartion(acompte_is_select);

            

            var tva_trim_select = {param:'tva_trim_select',id_situation:id_situation}
            declartion(tva_trim_select);

            var tva_mens_select = {param:'tva_mens_select',id_situation:id_situation}
            declartion(tva_mens_select);

            var liquidation_is = {param:'liquidation_is',id_situation:id_situation}
            declartion(liquidation_is);

            var cpte_cfe = {param:'cpte_cfe',id_situation:id_situation}
            declartion(cpte_cfe);

    })

    function recuper_v_d(id,thiss,thiss2,thiss3){
        $.ajax({
            url: "route.php",
            type: 'POST',
            dataType: 'json',
            data: {
                param:"recuper_val_decl",
                id_situation_s: id,
            },
            success: function(data) {
                try{
                    if(data.length > 0){
                        $('.dt_bl_default1:eq(0)').val(thiss);
                        $('.dt_bl_default1:eq(1)').val(thiss);
                        $('.dt_bl_default1:eq(2)').val(thiss);
                        $('.dt_bl_default1:eq(3)').val(thiss);
                        $('.dt_bl_default1:eq(4)').val(thiss);
                        $('.dt_bl_default1:eq(5)').val(thiss);
                        $('.dt_bl_default1:eq(6)').val(thiss);
                        $('.dt_bl_default1:eq(7)').val(thiss); 

                        $('.dt_bl_default2:eq(0)').val(thiss2);
                        $('.dt_bl_default2:eq(1)').val(thiss2);
                        $('.dt_bl_default2:eq(2)').val(thiss2);
                        $('.dt_bl_default2:eq(3)').val(thiss2);
                        $('.dt_bl_default2:eq(4)').val(thiss2);
                        $('.dt_bl_default2:eq(5)').val(thiss2);
                        $('.dt_bl_default2:eq(6)').val(thiss2);
                        $('.dt_bl_default2:eq(7)').val(thiss2); 

                        $('.dt_bl_default3:eq(0)').val(thiss3);
                        $('.dt_bl_default3:eq(1)').val(thiss3);
                        $('.dt_bl_default3:eq(2)').val(thiss3);
                        $('.dt_bl_default3:eq(3)').val(thiss3);
                        $('.dt_bl_default3:eq(4)').val(thiss3);
                        $('.dt_bl_default3:eq(5)').val(thiss3);
                        $('.dt_bl_default3:eq(6)').val(thiss3);
                        $('.dt_bl_default3:eq(7)').val(thiss3); 

                            
                        $('.commentaire_declaration:eq(0)').val(data[5].zz_comm_declaration[0].liase_fiscal);
                        $('.commentaire_declaration:eq(1)').val(data[5].zz_comm_declaration[0].ca12);
                        $('.commentaire_declaration:eq(2)').val(data[5].zz_comm_declaration[0].solde_is);
                        $('.commentaire_declaration:eq(3)').val(data[5].zz_comm_declaration[0].cva1330);
                        $('.commentaire_declaration:eq(4)').val(data[5].zz_comm_declaration[0].solde_cvae);
                        $('.commentaire_declaration:eq(5)').val(data[5].zz_comm_declaration[0].decloyer);
                        $('.commentaire_declaration:eq(6)').val(data[5].zz_comm_declaration[0].das2);
                        $('.commentaire_declaration:eq(7)').val(data[5].zz_comm_declaration[0].c3s);   
                                                
                            $('.dt_bl_default4:eq(0)').val(data[0].zz_com_client_cdm_fr[0].liase_fiscal);
                            $('.dt_bl_default4:eq(1)').val(data[0].zz_com_client_cdm_fr[0].ca12);
                            $('.dt_bl_default4:eq(2)').val(data[0].zz_com_client_cdm_fr[0].solde_is);
                            $('.dt_bl_default4:eq(3)').val(data[0].zz_com_client_cdm_fr[0].cva1330);
                            $('.dt_bl_default4:eq(4)').val(data[0].zz_com_client_cdm_fr[0].solde_cvae);
                            $('.dt_bl_default4:eq(5)').val(data[0].zz_com_client_cdm_fr[0].decloyer);
                            $('.dt_bl_default4:eq(6)').val(data[0].zz_com_client_cdm_fr[0].das2);
                            $('.dt_bl_default4:eq(7)').val(data[0].zz_com_client_cdm_fr[0].c3s); 

                            $('.dt_bl_default5:eq(0)').val(data[1].zz_valid_client_cdm_fr[0].liase_fiscal);
                            $('.dt_bl_default5:eq(1)').val(data[1].zz_valid_client_cdm_fr[0].ca12);
                            $('.dt_bl_default5:eq(2)').val(data[1].zz_valid_client_cdm_fr[0].solde_is);
                            $('.dt_bl_default5:eq(3)').val(data[1].zz_valid_client_cdm_fr[0].cva1330);
                            $('.dt_bl_default5:eq(4)').val(data[1].zz_valid_client_cdm_fr[0].solde_cvae);
                            $('.dt_bl_default5:eq(5)').val(data[1].zz_valid_client_cdm_fr[0].decloyer);
                            $('.dt_bl_default5:eq(6)').val(data[1].zz_valid_client_cdm_fr[0].das2);
                            $('.dt_bl_default5:eq(7)').val(data[1].zz_valid_client_cdm_fr[0].c3s); 
                            
                            $('.dt_bl_default6:eq(0)').val(data[2].zz_valid_manager_fr[0].liase_fiscal);
                            $('.dt_bl_default6:eq(1)').val(data[2].zz_valid_manager_fr[0].ca12);
                            $('.dt_bl_default6:eq(2)').val(data[2].zz_valid_manager_fr[0].solde_is);
                            $('.dt_bl_default6:eq(3)').val(data[2].zz_valid_manager_fr[0].cva1330);
                            $('.dt_bl_default6:eq(4)').val(data[2].zz_valid_manager_fr[0].solde_cvae);
                            $('.dt_bl_default6:eq(5)').val(data[2].zz_valid_manager_fr[0].decloyer);
                            $('.dt_bl_default6:eq(6)').val(data[2].zz_valid_manager_fr[0].das2);
                            $('.dt_bl_default6:eq(7)').val(data[2].zz_valid_manager_fr[0].c3s); 
                            
                            $('.dt_bl_default7:eq(0)').val(data[3].zz_trait_tel_cdm_fr[0].liase_fiscal);
                            $('.dt_bl_default7:eq(1)').val(data[3].zz_trait_tel_cdm_fr[0].ca12);
                            $('.dt_bl_default7:eq(2)').val(data[3].zz_trait_tel_cdm_fr[0].solde_is);
                            $('.dt_bl_default7:eq(3)').val(data[3].zz_trait_tel_cdm_fr[0].cva1330);
                            $('.dt_bl_default7:eq(4)').val(data[3].zz_trait_tel_cdm_fr[0].solde_cvae);
                            $('.dt_bl_default7:eq(5)').val(data[3].zz_trait_tel_cdm_fr[0].decloyer);
                            $('.dt_bl_default7:eq(6)').val(data[3].zz_trait_tel_cdm_fr[0].das2);
                            $('.dt_bl_default7:eq(7)').val(data[3].zz_trait_tel_cdm_fr[0].c3s); 
                            
                            $('.dt_bl_default8:eq(0)').val(data[4].zz_valid_edi_cdm_fr[0].liase_fiscal);
                            $('.dt_bl_default8:eq(1)').val(data[4].zz_valid_edi_cdm_fr[0].ca12);
                            $('.dt_bl_default8:eq(2)').val(data[4].zz_valid_edi_cdm_fr[0].solde_is);
                            $('.dt_bl_default8:eq(3)').val(data[4].zz_valid_edi_cdm_fr[0].cva1330);
                            $('.dt_bl_default8:eq(4)').val(data[4].zz_valid_edi_cdm_fr[0].solde_cvae);
                            $('.dt_bl_default8:eq(5)').val(data[4].zz_valid_edi_cdm_fr[0].decloyer);
                            $('.dt_bl_default8:eq(6)').val(data[4].zz_valid_edi_cdm_fr[0].das2);
                            $('.dt_bl_default8:eq(7)').val(data[4].zz_valid_edi_cdm_fr[0].c3s); 

                    }
                  
                }catch{}
            },
        });
    }

    $(document).on('click','.tb_declaration_tabs',function(){
     $('#ex1-content').show(100);
    })

    $(document).on('click','#valide_tabs', function(){
        $('.toast').toast('show');
        //$('html').scrollBottom(screen.height);

        switch(tabs_name){

            case "TVA MENS":
                var dt_fait_karlit_mens = "";
                var dt_envoie_client_mens = "";
                var dt_validation_client_mens = "";
                var dt_teletransmision_mens = "";
                var dt_validation_edi_mens = "";
                var commentaire_mens = "";
                var adddate_mens ="";
                $('.dt_tva_mens').find('input').each(function(index,value){
                    dt_fait_karlit_mens += $(this).val() + "#"
                })

                $('.dt_fait_k_mens').find('input').each(function(index,value){
                    dt_envoie_client_mens += $(this).val() + "#"
                })

                $('.dt_env_cli_mens').find('input').each(function(index,value){
                    dt_validation_client_mens += $(this).val() + "#"
                })
                
                $('.dt_val_client_mens').find('input').each(function(index,value){
                    dt_teletransmision_mens += $(this).val() + "#"
                })
                
                $('.dt_tel_mens').find('input').each(function(index,value){
                    dt_validation_edi_mens += $(this).val() + "#"
                })
                
                $('.cmt_mens').find('textarea').each(function(index,value){
                    commentaire_mens += $(this).val() + "#"
                }) 

                $('.adddate_mens').each(function(index,value){
                    adddate_mens += $(this).html() + "#"
                })  

                tab_insert = {
                    param:"TVA MENS",
                    id_situation:id_situation,
                    dt_fait_karlit:dt_fait_karlit_mens,
                    dt_envoie_client:dt_envoie_client_mens,
                    dt_validation_client:dt_validation_client_mens,
                    dt_teletransmision:dt_teletransmision_mens,
                    dt_validation_edi:dt_validation_edi_mens,
                    commentaire:commentaire_mens,
                    adddate:adddate_mens
                }                
                declartion(tab_insert); 
                
            break;
            case "TVA TRIM":
                tab_insert = {
                    param:"TVA TRIM",
                    id_situation:id_situation,
                    dt_fait_karlit:$('#dt_fait_karlit_trim1').val() + "#" + $('#dt_fait_karlit_trim2').val() + "#" + $('#dt_fait_karlit_trim3').val() + "#" + $('#dt_fait_karlit_trim4').val(),
                    dt_envoie_client:$('#dt_envoie_client_trim1').val() + "#" + $('#dt_envoie_client_trim2').val() + "#" + $('#dt_envoie_client_trim3').val() + "#" + $('#dt_envoie_client_trim4').val(),
                    dt_validation_client:$('#dt_validation_client_trim1').val() + "#" + $('#dt_validation_client_trim2').val() + "#" + $('#dt_validation_client_trim3').val() + "#" + $('#dt_validation_client_trim4').val(),
                    dt_teletransmision:$('#dt_teletransmision_trim1').val() + "#" + $('#dt_teletransmision_trim2').val() + "#" + $('#dt_teletransmision_trim3').val() + "#" + $('#dt_teletransmision_trim4').val(),
                    dt_validation_edi:$('#dt_validation_edi_trim1').val() + "#" + $('#dt_validation_edi_trim2').val() + "#" + $('#dt_validation_edi_trim3').val() + "#" + $('#dt_validation_edi_trim4').val(),
                    commentaire:$('#comt_trim1').val() + "#" + $('#comt_trim2').val() + "#" + $('#comt_trim3').val() + "#" + $('#comt_trim4').val(),
                }
                
                   declartion(tab_insert);                    
                
            break;
            case "ACOMPTE TVA ST":
                tab_insert = {
                    param:"ACOMPTE TVA ST",
                    id_situation:id_situation,
                    montant:$('#montant_acpt_st_1').val() + "#" + $('#montant_acpt_st_2').val(),
                    dt_acpt_fait_karlit:$('#dt_acpt_k_acpt_st_1').val() + "#" + $('#dt_acpt_k_acpt_st_2').val(),
                    date_envoie_client:$('#dt_env_client_acpt_st_1').val() + "#" + $('#dt_env_client_acpt_st_2').val(),
                    date_de_validation_client:$('#dt_valid_client_acpt_st_1').val() + "#" + $('#dt_valid_client_acpt_st_2').val(),
                    date_teletransmission:$('#dt_tel_acpt_st_1').val() + "#" + $('#dt_tel_acpt_st_2').val(),
                    date_validation_edi:$('#dt_vedi_acpt_st_1').val() + "#" + $('#dt_vedi_acpt_st_2').val(),
                    commentaire:$('#cmt_acpt_st_1').val() + "#" + $('#cmt_acpt_st_2').val(),
                    montant_st:$("#txtis_acpt_st_cvae").val()
                }
                   declartion(tab_insert);                
            break;
            case "ACOMPTE IS":

                tab_insert = {
                    param:"ACOMPTE IS",
                    id_situation:id_situation,
                    montant:$('#txtis').val(),
                    dt_fait_karlit:$('.dtfaik:eq(0)').val() + "#" + $('.dtfaik:eq(1)').val() + "#" + $('.dtfaik:eq(2)').val() + "#" + $('.dtfaik:eq(3)').val(),
                    dt_envoie_client:$('.dtenvcli_t:eq(0)').val() + "#" + $('.dtenvcli_t:eq(1)').val() + "#" + $('.dtenvcli_t:eq(2)').val() + "#" + $('.dtenvcli_t:eq(3)').val(),
                    dt_validation_client:$('.dtvd_cli_t:eq(0)').val() + "#" + $('.dtvd_cli_t:eq(1)').val() + "#" + $('.dtvd_cli_t:eq(2)').val() + "#" + $('.dtvd_cli_t:eq(3)').val(),
                    dt_teletransmision:$('.dt_cli_tr:eq(0)').val() + "#" + $('.dt_cli_tr:eq(1)').val() + "#" + $('.dt_cli_tr:eq(2)').val() + "#" + $('.dt_cli_tr:eq(3)').val(),
                    dt_validation_edi:$('.dt_vl_edi:eq(0)').val() + "#" + $('.dt_vl_edi:eq(1)').val() + "#" + $('.dt_vl_edi:eq(2)').val() + "#" + $('.dt_vl_edi:eq(3)').val(),
                    montant_is:$('.mt_acptsi:eq(0)').val() + "#" + $('.mt_acptsi:eq(1)').val() + "#" + $('.mt_acptsi:eq(2)').val() + "#" + $('.mt_acptsi:eq(3)').val(),
                    commentaire:$('.cmt_cpits:eq(0)').val() + "#" + $('.cmt_cpits:eq(1)').val() + "#" + $('.cmt_cpits:eq(2)').val() + "#" + $('.cmt_cpits:eq(3)').val(),
                }            
                declartion(tab_insert); 
            break;

            case "LQUIDIATION IS":
                tab_insert = {
                    param:"LQUIDIATION IS",
                    id_situation:id_situation,
                    montant:$('#lquidmtis').val(),
                    dt_fait_karlit:$('.LQdtfaik').val(),
                    dt_envoie_client:$('.LQdtenvcli_t').val(),
                    dt_validation_client:$('.LQdtvd_cli_t').val(),
                    dt_teletransmision:$('.LQdt_cli_tr').val(),
                    dt_validation_edi:$('.LQdt_vl_edi').val(),
                    commentaire:$('.LQcmt_cpits').val(),
                }            
                declartion(tab_insert); 
            break;
            case "CVAE":
                tab_insert = {
                    param:"CVAE",
                    id_situation:id_situation,
                    montant:$('#montant_1').val() + "#" + $('#montant_2').val(),
                    date_cvae_karlit:$('#dt_acpt_k_1').val() + "#" + $('#dt_acpt_k_2').val(),
                    date_envoie_client:$('#dt_env_cvaeclient_1').val() + "#" + $('#dt_env_cvaeclient_2').val(),
                    date_de_validation_client:$('#dt_valid_client_1').val() + "#" + $('#dt_valid_client_2').val(),
                    date_teletransmission:$('#dt_tel_1').val() + "#" + $('#dt_tel_2').val(),
                    date_validation_edi:$('#dt_vedi_1').val() + "#" + $('#dt_vedi_2').val(),
                    commentaire:$('#cmt_1').val() + "#" + $('#cmt_2').val(),
                    montant_cvae:$("#txtis_cvae").val()
                }
                   declartion(tab_insert);                
            break;

            case "CFE":
                tab_insert = {
                    param:"CFE",
                    id_situation:id_situation,
                    montant:$('.montant_cfe:eq(0)').val() + "#" + $('.montant_cfe:eq(1)').val(),
                    date_cfe_karlit:$('.dt_acpt_k_1:eq(0)').val() + "#" + $('.dt_acpt_k_1:eq(1)').val(),
                    date_envoie_client:$('.dt_env_cfeclient_1:eq(0)').val() + "#" + $('.dt_env_cfeclient_1:eq(1)').val(),
                    date_de_validation_client:$('.dt_cfevalid_client_1:eq(0)').val() + "#" + $('.dt_cfevalid_client_1:eq(1)').val(),
                    date_teletransmission:$('.dt_cfetel_1:eq(0)').val() + "#" + $('.dt_cfetel_1:eq(1)').val(),
                    date_validation_edi:$('.dt_vecfedi_1:eq(0)').val() + "#" + $('.dt_vecfedi_1:eq(1)').val(),
                    commentaire:$('.cmt_1cfe:eq(0)').val() + "#" + $('.cmt_1cfe:eq(1)').val(),
                    montant_cfe:$('#txtis_cfe').val(),
                }
                   declartion(tab_insert);                
            break;            
            
            case "TVS":
                tab_insert = {
                param:"TVS",
                id_situation:id_situation,
                montant:$('#mt_tvs').val(),
                date_cvae_karlit:$('#date_cvae_karlit').val(),
                date_envoie_client:$('#date_envoie_client').val(),
                date_de_validation_client:$('#date_de_validation_client').val(),
                date_teletransmission:$('#date_teletransmission').val(),
                date_validation_edi:$('#date_validation_edi').val(),
                commentaire:$('.commentaire_tvs').val(),
            }
               declartion(tab_insert);

            break;


            case "BILAN":
               /* tab_insert = {
                    param:"BILAN",
                    id_situation:id_situation,
                    dt_validation_fr:$('#dt_bl_1').val() + "#" + $('#dt_bl_2').val() + "#" + $('#dt_bl_3').val() + "#" + $('#dt_bl_4').val() + "#" +
                    $('#dt_bl_5').val() + "#" + $('#dt_bl_6').val() + "#" + $('#dt_bl_7').val() + "#" + $('#dt_bl_8').val(),
                    dt_fait_karlit:$('#dt_fait_k_1').val() + "#" + $('#dt_fait_k_2').val() + "#" + $('#dt_fait_k_3').val() + "#" + $('#dt_fait_k_4').val() + "#" +
                    $('#dt_fait_k_5').val() + "#" + $('#dt_fait_k_6').val() + "#" + $('#dt_fait_k_7').val() + "#" + $('#dt_fait_k_8').val(),
                    dt_envoie_client:$('#dt_env_client_1').val() + "#" + $('#dt_env_client_2').val() + "#" + $('#dt_env_client_3').val() + "#" + $('#dt_env_client_4').val() + "#" +
                    $('#dt_env_client_5').val() + "#" + $('#dt_env_client_6').val() + "#" + $('#dt_env_client_7').val() + "#" + $('#dt_env_client_8').val(),
                    dt_validation_client:$('#dt_valid_client1').val() + "#" + $('#dt_valid_client2').val() + "#" + $('#dt_valid_client3').val() + "#" + $('#dt_valid_client4').val() + "#" +
                    $('#dt_valid_client5').val() + "#" + $('#dt_valid_client6').val() + "#" + $('#dt_valid_client7').val() + "#" + $('#dt_valid_client8').val(),
                    dt_teletransmision:$('#dt_tran_1').val() + "#" + $('#dt_tran_2').val() + "#" + $('#dt_tran_3').val() + "#" + $('#dt_tran_4').val() + "#" +
                    $('#dt_tran_5').val() + "#" + $('#dt_tran_6').val() + "#" + $('#dt_tran_7').val() + "#" + $('#dt_tran_8').val(),
                    dt_validation_edi:$('#dt_val_edi_1').val() + "#" + $('#dt_val_edi_2').val() + "#" + $('#dt_val_edi_3').val() + "#" + $('#dt_val_edi_4').val() + "#" +
                    $('#dt_val_edi_5').val() + "#" + $('#dt_val_edi_6').val() + "#" + $('#dt_val_edi_7').val() + "#" + $('#dt_val_edi_8').val(),
                    commentaire:$('.cmt_st_bl1').val() + "#" + $('.cmt_st_bl2').val() + "#" + $('.cmt_st_bl3').val() + "#" + $('.cmt_st_bl4').val() + "#" +
                    $('.cmt_st_bl5').val() + "#" + $('.cmt_st_bl6').val() + "#" + $('.cmt_st_bl7').val() + "#" + $('.cmt_st_bl8').val(),
                }
                
                   declartion(tab_insert);     */           
            break;
        }
    })

    $(document).on('click','.nav-link',function(){
        var tabsclick = $(this).closest('a').html();
        tabs_name = tabsclick;
    })

    function declartion(tabs){
        $.ajax({
            url:'declaration.php',
            type:'POST',
            data:tabs,
            dataType:'json',
            success:function(data){
                try {
                    switch(tabs.param){
                        case "tva_mens_select":
                            var dt_fait_karlit = data[0].dt_fait_karlit.split("#");
                            var dt_envoie_client = data[0].dt_envoie_client.split("#");
                            var dt_validation_client = data[0].dt_validation_client.split("#");
                            var dt_teletransmision = data[0].dt_teletransmision.split("#");
                            var dt_validation_edi = data[0].dt_validation_edi.split("#");
                            var commentaire = data[0].commentaire.split("#");
                           
                            $('.dt_tva_mens').find('input').each(function(index,value){
                                $(this).val(dt_fait_karlit[index]);
                                
                            })
            
                            $('.dt_fait_k_mens').find('input').each(function(index,value){
                                $(this).val(dt_envoie_client[index]);
                            })
            
                            $('.dt_env_cli_mens').find('input').each(function(index,value){
                                $(this).val(dt_validation_client[index]);
                            })
                            
                            $('.dt_val_client_mens').find('input').each(function(index,value){
                                $(this).val(dt_teletransmision[index]);
                            })
                            
                            $('.dt_tel_mens').find('input').each(function(index,value){
                                $(this).val(dt_validation_edi[index]);
                            })
                            
                            $('.cmt_mens').find('textarea').each(function(index,value){
                                $(this).val(commentaire[index]);
                            }) 
         
                        break;
                        case "tva_trim_select":
                            var dt_fait_karlit = data[0].dt_fait_karlit.split("#");
                            var dt_envoie_client = data[0].dt_envoie_client.split("#");
                            var dt_validation_client = data[0].dt_validation_client.split("#");
                            var dt_teletransmision = data[0].dt_teletransmision.split("#");
                            var dt_validation_edi = data[0].dt_validation_edi.split("#");
                            var commentaire = data[0].commentaire.split("#");

                            $('#dt_fait_karlit_trim1').val(dt_fait_karlit[0]) ; $('#dt_fait_karlit_trim2').val(dt_fait_karlit[1]) ;
                             $('#dt_fait_karlit_trim3').val(dt_fait_karlit[2]) ; $('#dt_fait_karlit_trim4').val(dt_fait_karlit[3]) ;

                            $('#dt_envoie_client_trim1').val(dt_envoie_client[0]) ; $('#dt_envoie_client_trim2').val(dt_envoie_client[1]) ;
                             $('#dt_envoie_client_trim3').val(dt_envoie_client[2]) ; $('#dt_envoie_client_trim4').val(dt_envoie_client[3]) ;

                            $('#dt_validation_client_trim1').val(dt_validation_client[0]) ; $('#dt_validation_client_trim2').val(dt_validation_client[1]) ;
                             $('#dt_validation_client_trim3').val(dt_validation_client[2]) ; $('#dt_validation_client_trim4').val(dt_validation_client[3]) ;

                            $('#dt_teletransmision_trim1').val(dt_teletransmision[0]) ; $('#dt_teletransmision_trim2').val(dt_teletransmision[1]) ;
                             $('#dt_teletransmision_trim3').val(dt_teletransmision[2]) ; $('#dt_teletransmision_trim4').val(dt_teletransmision[3]) ;

                            $('#dt_validation_edi_trim1').val(dt_validation_edi[0]) ; $('#dt_validation_edi_trim2').val(dt_validation_edi[1]) ; 
                            $('#dt_validation_edi_trim3').val(dt_validation_edi[2]) ; $('#dt_validation_edi_trim4').val(dt_validation_edi[3]) ;
                            
                            $('#comt_trim1').val(commentaire[0]) ; $('#comt_trim2').val(commentaire[1]) ; 
                            $('#comt_trim3').val(commentaire[2]) ; $('#comt_trim4').val(commentaire[3]);

                        break;

                        case "acompt_tva_st_select":
                            if(data.length >0){
                                var montant = data[0].montant.split("#");
                                var dt_acpt_k = data[0].dt_acpt_fait_karlit.split("#");
                                var dt_env_client= data[0].dt_envoie_client.split("#");
                                var dt_valid_client= data[0].dt_validation_client.split("#");
                                var dt_tel= data[0].date_teletransmission.split("#");
                                var dt_vedi= data[0].dt_validation_edi.split("#");
                                var cmt= data[0].commentaire.split("#");
                                $('#montant_acpt_st_1').val(montant[0]);$('#montant_acpt_st_2').val(montant[1]);
                                $('#dt_acpt_k_acpt_st_1').val(dt_acpt_k[0]);$('#dt_acpt_k_acpt_st_2').val(dt_acpt_k[1]);
                                $('#dt_env_client_acpt_st_1').val(dt_env_client[0]);$('#dt_env_client_acpt_st_2').val(dt_env_client[1]);
                                $('#dt_valid_client_acpt_st_1').val(dt_valid_client[0]);$('#dt_valid_client_acpt_st_2').val(dt_valid_client[1]);
                                $('#dt_tel_acpt_st_1').val(dt_tel[0]);$('#dt_tel_acpt_st_2').val(dt_tel[1]);
                                $('#dt_vedi_acpt_st_1').val(dt_vedi[0]);$('#dt_vedi_acpt_st_2').val(dt_vedi[1]);
                                $('#cmt_acpt_st_1').val(cmt[0]);$('#cmt_acpt_st_2').val(cmt[1]);
                                $('#txtis_acpt_st_cvae').val(data[0].montant_st)
                            }                                 
                        break;

                        case "acompte_is_select":
                            var montant = data[0].montant;
                            var montant_is = data[0].montant_is.split("#");
                            var dt_acpt_fait_karlit = data[0].dt_acpt_fait_karlit.split("#");
                            var dt_envoie_client = data[0].dt_envoie_client.split("#");
                            var dt_validation_client = data[0].dt_validation_client.split("#");
                            var date_teletransmission = data[0].date_teletransmission.split("#");                            
                            var dt_validation_edi = data[0].dt_validation_edi.split("#");
                            var commentaire = data[0].commentaire.split("#");                            
                            
                            $('#txtis').val(montant);
                            $('.mt_acptsi').each(function(index){
                               $(this).val(montant_is[index]);
                               $('.dtfaik:eq('+index+')').val(dt_acpt_fait_karlit[index]);
                               $('.dtenvcli_t:eq('+index+')').val(dt_envoie_client[index]);
                               $('.dtvd_cli_t:eq('+index+')').val(dt_validation_client[index]);
                               $('.dt_cli_tr:eq('+index+')').val(date_teletransmission[index]);
                               $('.dt_vl_edi:eq('+index+')').val(dt_validation_edi[index]);
                               $('.cmt_cpits:eq('+index+')').val(commentaire[index]);
                            })
                        break;


                        case "cvae_select":
                            if(data.length >0){
                                var montant = data[0].montant.split("#");
                                var dt_acpt_k = data[0].date_cvae_karlit.split("#");
                                var dt_env_client= data[0].date_envoie_client.split("#");
                                var dt_valid_client= data[0].date_de_validation_client.split("#");
                                var dt_tel= data[0].date_teletransmission.split("#");
                                var dt_vedi= data[0].date_validation_edi.split("#");
                                var cmt= data[0].commentaire.split("#");
                                $('#montant_1').val(montant[0]);$('#montant_2').val(montant[1]);
                                $('#dt_acpt_k_1').val(dt_acpt_k[0]);$('#dt_acpt_k_2').val(dt_acpt_k[1]);
                                $('#dt_env_cvaeclient_1').val(dt_env_client[0]);$('#dt_env_cvaeclient_2').val(dt_env_client[1]);
                                $('#dt_valid_client_1').val(dt_valid_client[0]);$('#dt_valid_client_2').val(dt_valid_client[1]);
                                $('#dt_tel_1').val(dt_tel[0]);$('#dt_tel_2').val(dt_tel[1]);
                                $('#dt_vedi_1').val(dt_vedi[0]);$('#dt_vedi_2').val(dt_vedi[1]);
                                $('#cmt_1').val(cmt[0]);$('#cmt_2').val(cmt[1]);
                                $('#txtis_cvae').val(data[0].montant_cvae)
                            }                            
                        break;


                        case "cpte_cfe":
                            if(data.length >0){
                                var montant = data[0].montant.split("#");
                                var dt_acpt_k = data[0].date_cvae_karlit.split("#");
                                var dt_env_client= data[0].date_envoie_client.split("#");
                                var dt_valid_client= data[0].date_de_validation_client.split("#");
                                var dt_tel= data[0].date_teletransmission.split("#");
                                var dt_vedi= data[0].date_validation_edi.split("#");
                                var cmt= data[0].commentaire.split("#");
                                $('.montant_cfe:eq(0)').val(montant[0]);$('.montant_cfe:eq(1)').val(montant[1]);
                                $('.dt_acpt_k_1:eq(0)').val(dt_acpt_k[0]);$('.dt_acpt_k_1:eq(1)').val(dt_acpt_k[1]);
                                $('.dt_env_cfeclient_1:eq(0)').val(dt_env_client[0]);$('.dt_env_cfeclient_1:eq(1)').val(dt_env_client[1]);
                                $('.dt_cfevalid_client_1:eq(0)').val(dt_valid_client[0]);$('.dt_cfevalid_client_1:eq(1)').val(dt_valid_client[1]);
                                $('.dt_cfetel_1:eq(0)').val(dt_tel[0]);$('.dt_cfetel_1:eq(1)').val(dt_tel[1]);
                                $('.dt_vecfedi_1:eq(0)').val(dt_vedi[0]);$('.dt_vecfedi_1:eq(1)').val(dt_vedi[1]);
                                $('.cmt_1cfe:eq(0)').val(cmt[0]);$('.cmt_1cfe:eq(1)').val(cmt[1]);
                                $('#txtis_cfe').val(data[0].montant_cfe)
                            }                            
                        break;
                        
                        case "tvs_select":
                            if(data.length >0){
                                $('#mt_tvs').val(data[0].montant);
                                $('#date_cvae_karlit').val(data[0].date_cvae_karlit);
                                $('#date_envoie_client').val(data[0].date_envoie_client);
                                $('#date_de_validation_client').val(data[0].date_de_validation_client);
                                $('#date_teletransmission').val(data[0].date_teletransmission);
                                $('#date_validation_edi').val(data[0].date_validation_edi);
                                $('.commentaire_tvs').val(data[0].commentaire);
                            }
                        break;

                        case "liquidation_is":
                            $('#lquidmtis,.lquidmtis,.LQdtfaik,.LQdtenvcli_t,.LQdtvd_cli_t,.LQdt_cli_tr,.LQdt_vl_edi,.LQcmt_cpits').val("");
                            if(data.length >0){
                                $('#lquidmtis').val(data[0].montant);
                                $('.LQdtfaik').val(data[0].dt_acpt_fait_karlit);
                                $('.LQdtenvcli_t').val(data[0].dt_envoie_client);
                                $('.LQdtvd_cli_t').val(data[0].dt_validation_client);
                                $('.LQdt_cli_tr').val(data[0].date_teletransmission);
                                $('.LQdt_vl_edi').val(data[0].dt_validation_edi);
                                $('.LQcmt_cpits').val(data[0].commentaire);
                            }
                        break;

                        
    
                        case "bilan_select":
                            if(data.length >0){
                                var dt_validation_fr = data[0].dt_validation_fr.split("#");
                                var dt_fait_karlit = data[0].dt_fait_karlit.split("#");
                                var dt_envoie_client = data[0].dt_envoie_client.split("#");
                                var dt_validation_client = data[0].dt_validation_client.split("#");
                                var dt_teletransmision = data[0].dt_teletransmision.split("#");
                                var dt_validation_edi = data[0].dt_validation_edi.split("#");
                                var commentaire = data[0].commentaire.split("#");
    
                                $('#dt_bl_1').val(dt_validation_fr[0]) ; $('#dt_bl_2').val(dt_validation_fr[1]) ; $('#dt_bl_3').val(dt_validation_fr[2]) ; $('#dt_bl_4').val(dt_validation_fr[3]) ;
                                $('#dt_bl_5').val(dt_validation_fr[4]) ; $('#dt_bl_6').val(dt_validation_fr[5]) ; $('#dt_bl_7').val(dt_validation_fr[6]) ; $('#dt_bl_8').val(dt_validation_fr[7]) ;
    
                                $('#dt_fait_k_1').val(dt_fait_karlit[0]) ; $('#dt_fait_k_2').val(dt_fait_karlit[1]) ; $('#dt_fait_k_3').val(dt_fait_karlit[2]) ; $('#dt_fait_k_4').val(dt_fait_karlit[3]) ;
                                $('#dt_fait_k_5').val(dt_fait_karlit[4]) ; $('#dt_fait_k_6').val(dt_fait_karlit[5]) ; $('#dt_fait_k_7').val(dt_fait_karlit[6]) ; $('#dt_fait_k_8').val(dt_fait_karlit[7]);
    
                                $('#dt_env_client_1').val(dt_envoie_client[0]) ; $('#dt_env_client_2').val(dt_envoie_client[1]) ; $('#dt_env_client_3').val(dt_envoie_client[2]) ; $('#dt_env_client_4').val(dt_envoie_client[3]) ;
                                $('#dt_env_client_5').val(dt_envoie_client[4]) ; $('#dt_env_client_6').val(dt_envoie_client[5]) ; $('#dt_env_client_7').val(dt_envoie_client[6]) ; $('#dt_env_client_8').val(dt_envoie_client[7]);
    
                                $('#dt_valid_client1').val(dt_validation_client[0]) ; $('#dt_valid_client2').val(dt_validation_client[1]) ; $('#dt_valid_client3').val(dt_validation_client[2]) ; $('#dt_valid_client4').val(dt_validation_client[3]) ;
                                $('#dt_valid_client5').val(dt_validation_client[4]) ; $('#dt_valid_client6').val(dt_validation_client[5]) ; $('#dt_valid_client7').val(dt_validation_client[6]) ; $('#dt_valid_client8').val(dt_validation_client[7]);
    
                                $('#dt_tran_1').val(dt_teletransmision[0]) ; $('#dt_tran_2').val(dt_teletransmision[1]) ; $('#dt_tran_3').val(dt_teletransmision[2]) ; $('#dt_tran_4').val(dt_teletransmision[3]) ;
                                $('#dt_tran_5').val(dt_teletransmision[4]) ; $('#dt_tran_6').val(dt_teletransmision[5]) ; $('#dt_tran_7').val(dt_teletransmision[6]) ; $('#dt_tran_8').val(dt_teletransmision[7]);
    
                                $('#dt_val_edi_1').val(dt_validation_edi[0]) ; $('#dt_val_edi_2').val(dt_validation_edi[1]) ; $('#dt_val_edi_3').val(dt_validation_edi[2]) ; $('#dt_val_edi_4').val(dt_validation_edi[3]) ;
                                $('#dt_val_edi_5').val(dt_validation_edi[4]) ; $('#dt_val_edi_6').val(dt_validation_edi[5]) ; $('#dt_val_edi_7').val(dt_validation_edi[6]) ; $('#dt_val_edi_8').val(dt_validation_edi[7]);
                                
                                $('.cmt_st_bl1').val(commentaire[0]) ; $('.cmt_st_bl2').val(commentaire[1]) ; $('.cmt_st_bl3').val(commentaire[2]) ; $('.cmt_st_bl4').val(commentaire[3]);
                                $('.cmt_st_bl5').val(commentaire[4]) ; $('.cmt_st_bl6').val(commentaire[5]) ; $('.cmt_st_bl7').val(commentaire[6]) ; $('.cmt_st_bl8').val(commentaire[7]);
                            }
    
                        break;
                 }                    
                } catch (error) {
                    
                }
               
            }
        })

    }

    $(document).on('click','#btn_annuler', function(){
        $('.tr_list_general:eq('+ index_click + ')').click();
    })

    $(document).on('keyup','#txtis_cvae', function(){
        $('#montant_1').val((parseInt($(this).val()) / 2).toFixed(2));
        $('#montant_2').val((parseInt($(this).val()) / 2).toFixed(2));
    })

    $(document).on('keyup','#txtis_acpt_st_cvae', function(){
        $('#montant_acpt_st_1').val((parseInt($(this).val()) * 0.55).toFixed(2));
        $('#montant_acpt_st_2').val((parseInt($(this).val()) * 0.45).toFixed(2));
    })

    $(document).on('keyup','#txtis',function(t){
          $(this).val($(this).val().trim());
          var montant = $(this).val();
            $('.mt_acptsi').val((parseInt(montant) / 4));
          $(this).val($(this).val());
  
      })

      $(document).on('keyup','#txtis_cfe',function(){
        var valeur = (parseInt($(this).val() / 2)).toFixed(2);
        $('.montant_cfe:eq(0)').val(valeur);
        $('.montant_cfe:eq(1)').val(valeur);


    })

      

})