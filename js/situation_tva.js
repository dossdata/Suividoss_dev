    $(function(){
        row_situation = "";
        var index_click = 0;
        var index_click2 = 0;
        var index_cmt = 0;
        var tva_regime = "";
        var id_situation =  "";
        var monthName=['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
        var tet_datatable = 
        '<table id="datatablesituation" style="width:100%" class="table-bordered display text-center" width="100%">'+
        '<thead class="th_databale">'+
        '<tr>'+
        '<th class="m_code_stuation in_visible">#</th>'+
        '<th class="m_code_stuation in_visible">#</th>'+
        '<th class="in_visible"></th>' +
        '<th>dossier</th><th class="in_visible">sit_dossier</th><th class="m_code_stuation">cmt</th><th>cloture</th><th class="in_visible">rg_d_imp1</th><th class="in_visible">rg_d_imp2</th>'+
        '<th class="m_code_stuation">frm_jrdq</th><th class="m_code_stuation">dp_coala</th><th>regime tva</th><th class="m_code_stuation">dt_ech</th><th class="m_code_stuation">sit_karlit</th><th class="m_code_stuation">date_maj</th>'+
        '<th class="m_code_stuation">etat_bl</th><th class="m_code_stuation">dt_d_envoie_bl_krlt</th><th class="m_code_stuation">cdm</th><th class="m_code_stuation">dt_rev_sup_fr</th><th class="m_code_stuation">obs_sup_fr</th><th class="m_code_stuation">dernier_pes</th>'+
        '<th class="m_code_stuation">dernier_relance</th><th class="m_code_stuation">dernier_appel_client</th></th>'+
        '<th class="in_visible">id_situation</th>' +
        '<th class="in_visible">id_dossier</th>' +
        '</tr><thead><tbody>';

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
                "<td class='m_code_stuation'><button><i class='fas fa-eye' ></i></button></td>"+
                "<td class='edit_list m_code_stuation'><button  data-toggle='modal' data-target='#viewsuivie'><i class='fas fa-edit'></i></button></td>"+
                "<td class='in_visible'>"+ data[i].code +"</td>"+
                "<td class='n_dosss'>" + data[i].dossier + "</td><td class='in_visible st_doss_n'>" + data[i].sit_dossier +
                "</td></td><td class='m_code_stuation'>" + data[i].cmt + "</td></td><td class='dt_clot'>" + 
                data[i].cloture + "</td></td><td class='in_visible'>" + data[i].rg_d_imp1 +  "</td>"+
                "<td class='in_visible'>" + data[i].rg_d_imp2 + "</td><td class='m_code_stuation'>" + data[i].frm_jrdq + 
                "</td></td><td class='m_code_stuation'>" + data[i].dp_coala +  "</td></td><td class=''>" + data[i].regime +
                "</td></td><td class='m_code_stuation'>" + data[i].dt_ech +  "</td>"+
                "<td class='m_code_stuation'>" + data[i].sit_karlit + "</td><td class='m_code_stuation'>" + data[i].date_maj + "</td></td><td class='m_code_stuation'>" +
                data[i].etat_bl +  "</td></td><td class='m_code_stuation'>" + data[i].dt_d_envoie_bl_krlt + 
                "</td></td><td class='m_code_stuation'>" + data[i].cdm +  "</td>"+
                "<td class='m_code_stuation'>" + data[i].dt_rev_sup_fr + "</td><td class='m_code_stuation'>" + data[i].obs_sup_fr + 
                "</td></td><td  class='m_code_stuation dt_dern_pes'>" + data[i].dernier_pes +  "</td></td><td class='m_code_stuation dt_dern_relance'>"
                + data[i].dernier_relance +  "</td></td><td class='m_code_stuation dr_app_client'>" + data[i].dernier_appel_client +  "</td>"+
                "<td class='situation_portfeuil_id in_visible m_code_stuation'>"+data[i].situation_portfeuil_id+"</td>"+
                "<td class='id_dossier in_visible'>"+data[i].id_dossier+"</td>"+                    
                "</tr>";
                valeur = valeur.replace(/null/g,"").replace(/ 00:00:00/g,"");
            }
            
            $('#datatable_situation').html(tet_datatable + valeur + "</tbody></table>");
            $('#datatable_situation').css({'zoom':'80%'});
            datatable();
            $('#datatable_situation thead:eq(1)').html("");   
            $('#datatablesituation_wrapper, #table_tabs').show(300);
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
        scrollY:        screen.height / 1.8,
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
        
        $(document).on('click','.tr_list_general', function(){
            $('#situation_tva_st > table > tbody > tr > td > select').val("");
            $('select').attr('style','background: #fff !important')
            $('#situation_tva_st > table > tbody > tr > td > textarea').val("");
            
            $('.dernierappelclient').html("");
            $('.dernierpes').html("");
            $('.dernierrelance').html("");

            $('.etat_mens_rm').val("");
            $('.etat_tva_mens_g').val("");
            $('.piece_mens_n').val("");
            $('.commentaire_mens_g').html("");
            $('#dt_rm_em_mens').val("");
            $('#commentaire_mens_single').val("");

            index_click = $(this).closest('tr').index();
            $('#tab_declaration').hide(100);
            $('#tab_declaration').show(100);
            $('#btn_opt').show(100);
            row_situation = $(this).closest('.tr_list_general').find('.dt_clot').html();
            $('.stdossier').html($(this).closest('.tr_list_general').find('.st_doss_n').html());
            id_situation = $(this).closest('tr').find('.situation_portfeuil_id').html();
            $('.n_om_doss').html( $(this).closest('tr').find('.n_dosss').html())
            
            $('.dernierappelclient').html($(this).closest('.tr_list_general').find('.dr_app_client').html());
            $('.dernierpes').html($(this).closest('.tr_list_general').find('.dt_dern_pes').html());
            $('.dernierrelance').html($(this).closest('.tr_list_general').find('.dt_dern_relance').html());

            $('#name_doss').html("Nom dossier : <b style='color:red'><i class='far fa-folder-open'></i> "+ $(this).closest('.tr_list_general').find('td:eq(3)').html() +"</b>");
            
            $('#situation_tva_st').hide(100);
            $('#situation_rt_et').hide(100);
            $('#tva_rm_em').hide(100);         
            
            tva_regime = $(this).closest('.tr_list_general').find('td:eq(11)').html();
    
            if(tva_regime== "EM" || tva_regime== "RM" || tva_regime == "RFB"){
                $('#tva_rm_em').show(100);
                var i =  parseInt(row_situation.substring(5,7));
                $(".mois_rm").each(function(index, value){
                    if(i > 11){
                        i = 0;
                    }
                        $(this).html(monthName[i]);
                    i++;
                })

                $.ajax({
                    url:'Situation_tva.php',
                    type:'POST',
                    dataType:'json',
                    data:{
                        param:'select_situation_em_rm',
                        id_situation:id_situation,
                    },
                    success:function(data){
                        try{
                        var etat_g = data[0].etat_g.split(";"); 
                        var etat = data[0].etat.split(";"); 
                        var piece_manquant = data[0].piece_manquant.split(";"); 
                        var commentaire = data[0].commentaire.split(";");
                        if(data[0].etat_g  !== null){
                            if(etat.length > 20){
                                var etats = data[0].etat_g.split(";;");
                                $('.etat_tva_mens_g').each(function(index,value){$(this).val(etats[index].replace(";",""))});
                            }else{
                                var etat_g = data[0].etat_g.split(";"); 
                                $('.etat_tva_mens_g').each(function(index,value){$(this).val(etat_g[index].replace(";",""));})
                            }
            
                        }else{
                            $('.etat_tva_mens_g').each(function(index,value){$(this).val("");})
                        }

                        
                        if(data[0].etat  !== null){
                            if(etat.length > 20){
                                var etats = data[0].etat.split(";;");
                                $('.etat_mens_rm').each(function(index,value){$(this).val(etats[index].replace(";",""))});
                            }else{
                                var etat = data[0].etat.split(";"); 
                                $('.etat_mens_rm').each(function(index,value){$(this).val(etat[index].replace(";",""));})
                            }
            
                        }else{
                            $('.etat_mens_rm').each(function(index,value){$(this).val("");})
                        }
        
                        if(data[0].piece_manquant  !== null){
                            if(piece_manquant.length > 20){
                                var piece_manquant = data[0].piece_manquant.split(";;");
                                $('.piece_mens_n').each(function(index,value){$(this).val(piece_manquant[index].replace(";",""))});
                            }else{
                                var piece_manquant = data[0].piece_manquant.split(";"); 
                                $('.piece_mens_n').each(function(index,value){$(this).val(piece_manquant[index]);})
                            }
                        }else{
                            $('.piece_mens_n').each(function(index,value){$(this).val("")});
                        }


                        if(data[0].commentaire  !== null){
                            if(commentaire.length > 20){
                                var commentaire = data[0].commentaire.split(";;");
                                $('.commentaire_mens_g').each(function(index,value){$(this).val(commentaire[index].replace(";",""))});
                            }else{
                                var commentaire = data[0].commentaire.split(";"); 
                                $('.commentaire_mens_g').each(function(index,value){$(this).val(commentaire[index]);})
                            }
                        }else{
                            $('.commentaire_mens_g').each(function(index,value){$(this).val("")});
                        }
                        

                        //$('.etat_mens_rm').each(function(index,value){$(this).val(etat[index]);})
                        //$('.piece_mens_n').each(function(index,value){$(this).val(piece_manquant[index]);})
                        //$('.commentaire_mens_g').each(function(index,value){$(this).html(commentaire[index]);})
                        $('#dt_rm_em_mens').val(data[0].date_dernier_keobiz);
                        $('#commentaire_mens_single').val(data[0].commentaire_g.replace("&nbsp"," "));
                        //$('.etat_tva_mens_g').each(function(index,value){$(this).val(etat_g[index]);})
                                        

                        }catch(error){}
                    }
                })
            }
    
            if(tva_regime== "ET" || tva_regime== "RT"){
                $('#situation_rt_et').show(100);
                $.ajax({
                    url:'Situation_tva.php',
                    type:'POST',
                    dataType:'json',
                    data:{
                        param:'select_situation_et_rt',
                        id_situation:id_situation,
                    },
                    success:function(data){
                        try{
                            $('#etat_tva_et_rt_1').val(data[0].etat_g.split(";")[0]) ; $('#etat_tva_et_rt_2').val(data[0].etat_g.split(";")[1]) ;
                            $('#etat_tva_et_rt_3').val(data[0].etat_g.split(";")[2]) ; $('#etat_tva_et_rt_4').val(data[0].etat_g.split(";")[3]) ;
    
                            $('#date_rt_et_tva').val(data[0].date_dernier_keobiz);
    
                            $('#etat_et_rt_1').val(data[0].etat.split(";")[0]) ; $('#etat_et_rt_2').val(data[0].etat.split(";")[1]);
                            $('#etat_et_rt_3').val(data[0].etat.split(";")[2]) ; $('#etat_et_rt_4').val(data[0].etat.split(";")[3]);
    
                            $('#piece_et_rt_n1').val(data[0].piece_manquant.split(";")[0]) ; $('#piece_et_rt_n2').val(data[0].piece_manquant.split(";")[1]);
                            $('#piece_et_rt_n3').val(data[0].piece_manquant.split(";")[2]) ; $('#piece_et_rt_n4').val(data[0].piece_manquant.split(";")[3]);
    
                            $('#cmt_rt_et_1').val(data[0].commentaire.split(";")[0]) ; $('#cmt_rt_et_2').val(data[0].commentaire.split(";")[1]);
                            $('#cmt_rt_et_3').val(data[0].commentaire.split(";")[2]) ; $('#cmt_rt_et_4').val(data[0].commentaire.split(";")[3]);
    
                            $('#cmt_globale_rt_et').val(data[0].commentaire_g);

                        if(data[0].dt_validation_edi.split("#")[0] != ""){$('#etat_tva_et_rt_1').val("FAIT");$('#etat_et_rt_1').val("OK");$('#piece_et_rt_n1').val("");$('#cmt_rt_et_1').val("");}
                        if(data[0].dt_validation_edi.split("#")[1] != ""){$('#etat_tva_et_rt_2').val("FAIT");$('#etat_et_rt_2').val("OK");$('#piece_et_rt_n2').val("");$('#cmt_rt_et_2').val("");}
                        if(data[0].dt_validation_edi.split("#")[2] != ""){$('#etat_tva_et_rt_3').val("FAIT");$('#etat_et_rt_3').val("OK");$('#piece_et_rt_n3').val("");$('#cmt_rt_et_3').val("");}
                        if(data[0].dt_validation_edi.split("#")[3] != ""){$('#etat_tva_et_rt_4').val("FAIT");$('#etat_et_rt_4').val("OK");$('#piece_et_rt_n4').val("");$('#cmt_rt_et_4').val("");}

                        }catch(error){}
                    }
                })
            }

            if(tva_regime== "ST" || tva_regime == "EXO"){
                $('#situation_tva_st').show(100);
                $.ajax({
                    url:'Situation_tva.php',
                    type:'POST',
                    dataType:'json',
                    data:{
                        param:'select_situation_st',
                        id_situation:id_situation,
                    },
                    success:function(data){
                        try {
                        $('#etat_tva_1').val(data[0].etat_g.split(";")[0]) ; $('#etat_tva_2').val(data[0].etat_g.split(";")[1]) ;
                        $('#date_dernierkeobiz').val(data[0].date_dernier_keobiz);
                        $('#select_st1').val(data[0].etat.split(";")[0]) ; $('#select_st2').val(data[0].etat.split(";")[1]);
                        $('#piece_n1').val(data[0].piece_manquant.split(";")[0]) ; $('#piece_n2').val(data[0].piece_manquant.split(";")[1]);
                        $('#cmt_st1').val(data[0].commentaire.split(";")[0]) ; $('#cmt_st2').val(data[0].commentaire.split(";")[1]);
                        $('#cmt_globale').val(data[0].commentaire_g);

                        if(data[0].dt_validation_edi.split("#")[0] != ""){
                              $('#select_st1').val("OK");$('#piece_n1').val("");$('#cmt_st1').val("");
                        }
                        if(data[0].dt_validation_edi.split("#")[1] != ""){
                            $('#select_st2').val("OK");$('#piece_n2').val("");$('#cmt_st2').val("");
                        } 

                        } catch (error) {
                                                      
                        }
                      
                    
                    }
                })


            }

            if(tva_regime== "IS"){
                ////code
            }

            $('.card-body').css('height', (parseInt(screen.height) / 1.8) + "px")
        })
        
    

        $(document).on('click','#valide_tabs', function(){
            if(tva_regime== "EM" || tva_regime== "RM" || tva_regime == "RFB"){
                var etat_g = ""; var etat = ""; var piece_manquant = ""; var commentaire = "";         
                $('.etat_mens_rm').each(function(index,value){etat += $(this).val() + ";";})
                $('.etat_tva_mens_g').each(function(index,value){etat_g += $(this).val() + ";";})
                $('.piece_mens_n').each(function(index,value){piece_manquant += $(this).val() + ";";})
                $('.commentaire_mens_g').each(function(index,value){commentaire += $(this).html() + ";";})
                $.ajax({
                    url:'Situation_tva.php',
                    type:'POST',
                    data:{
                        param:'insertion_tva',
                        id_situation:id_situation,
                        etat_g:etat_g,
                        date_dernier_keobiz :$('#dt_rm_em_mens').val(),
                        etat:etat,
                        piece_manquant:piece_manquant,
                        commentaire:commentaire,
                        commentaire_g: $('#commentaire_mens_single').val(),
                    },
                    success:function(data){
                        $('.toast').toast('show');
                        $('html')(screen.height);
                    }
                })
            }
    
            if(tva_regime== "ET" || tva_regime== "RT"){
                $.ajax({
                    url:'Situation_tva.php',
                    type:'POST',
                    data:{
                        param:'insertion_tva',
                        id_situation:id_situation,
                        etat_g:$('#etat_tva_et_rt_1').val() + ";" + $('#etat_tva_et_rt_2').val() + ";" + $('#etat_tva_et_rt_3').val() + ";" + $('#etat_tva_et_rt_4').val(),
                        date_dernier_keobiz : $('#date_dernierkeobiz').val(),
                        etat:$('#etat_et_rt_1').val() + ";" + $('#etat_et_rt_2').val() + ";" + $('#etat_et_rt_3').val() + ";" + $('#etat_et_rt_4').val(),
                        piece_manquant: $('#piece_et_rt_n1').val() + ";" + $('#piece_et_rt_n2').val() + ";" + $('#piece_et_rt_n3').val() + ";" + $('#piece_et_rt_n4').val() ,
                        commentaire:$('#cmt_rt_et_1').val() + ";" + $('#cmt_rt_et_2').val() + ";" + $('#cmt_rt_et_3').val() + ";" + $('#cmt_rt_et_4').val(),
                        commentaire_g: $('#cmt_globale_rt_et').val()
                    },
                    success:function(data){
                        $('.toast').toast('show');
                        $('html').scrollBottom(screen.height);
                    }
                })
                
            }

            if(tva_regime== "ST" || tva_regime == "EXO"){
                $.ajax({
                    url:'Situation_tva.php',
                    type:'POST',
                    data:{
                        param:'insertion_tva',
                        id_situation:id_situation,
                        etat_g:$('#etat_tva_1').val() + ";" + $('#etat_tva_2').val(),
                        date_dernier_keobiz : $('#date_dernierkeobiz').val(),
                        etat:$('#select_st1').val() + ";" + $('#select_st2').val(),
                        piece_manquant: $('#piece_n1').val() + ";" + $('#piece_n2').val() ,
                        commentaire:$('#cmt_st1').val() + ";" + $('#cmt_st2').val(),
                        commentaire_g: $('#cmt_globale').val()
                    },
                    success:function(data){
                        $('.toast').toast('show');
                        $('html').scrollTop(screen.height);
                    }
                })
            }

            if(tva_regime== "IS"){
                
            }
        })

        
        $(document).on('click','#btn_annuler',function(){
            $('.tr_list_general:eq('+ index_click + ')').click();
        })

        $(document).on('change','#etat_tva_et_rt_1',function(){
            if($(this).val() == "FAIT"){$('#etat_et_rt_1').val("OK");$('#piece_et_rt_n1').val("");$('#cmt_rt_et_1').val("");}
        })
        $(document).on('change','#etat_tva_et_rt_2',function(){
            if($(this).val() == "FAIT"){$('#etat_et_rt_2').val("OK");$('#piece_et_rt_n2').val("");$('#cmt_rt_et_2').val("");}
        })
        $(document).on('change','#etat_tva_et_rt_3',function(){
            if($(this).val() == "FAIT"){$('#etat_et_rt_3').val("OK");$('#piece_et_rt_n3').val("");$('#cmt_rt_et_3').val("");}
        })
        $(document).on('change','#etat_tva_et_rt_4',function(){
            if($(this).val() == "FAIT"){$('#etat_et_rt_4').val("OK");$('#piece_et_rt_n4').val("");$('#cmt_rt_et_4').val("");}
        })

        $(document).on('change','#etat_tva_1',function(){
            if($(this).val() == "FAIT"){$('#select_st1').val("OK");$('#piece_n1').val("");$('#cmt_st1').val("");}
        })

        $(document).on('change','#etat_tva_2',function(){
            if($(this).val() == "FAIT"){$('#select_st2').val("OK");$('#piece_n2').val("");$('#cmt_st2').val("");}
        })

        $(document).on('change','.etat_tva_mens_g',function(){
            if($(this).val() == "FAIT")
            {
               $(this).closest('tr').find('.etat_mens_rm').val("OK");
               $(this).closest('tr').find('.piece_mens_n').val("");
               $(this).closest('tr').find('.commentaire_mens_g').html("");
            }
        })

        

        $(document).on('click','.edit_cmt_rm',function(){
            index_click2 = $(this).closest('tr').index();
            $('#ms_rm').html("");
            $('#cmt_ajout_rm').html("");
            $('#cmt_ajout_rm').val($(this).closest('tr').find('.commentaire_mens_g').html());
            $('#ms_rm').html($(this).closest('tr').find('.mois_rm').html());
        })


        $(document).on('click','#btn_valide_cmt',function(){
            $('.commentaire_mens_g:eq(' + ( parseInt(index_click2) - 2) + ')').html($('#cmt_ajout_rm').val() + " ");
            $('#annulercmt_t').click();
        })

      
    })