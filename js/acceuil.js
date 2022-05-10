$(function(){
    window.history.forward(1);
    var returnselect= "<select class='selectx'><option></option><option>X</option></select>";
    var returouinon = "<select class='ouinon_select'><option></option><option value='Oui'>Oui</option><option value='Non'>Non</option><option value='NA'>NA</option></select>";
    var returnbil = "<select class='ouinon_select'><option></option><option value='Bilan validé'>Bilan validé</option><option value='Bilan non validé'>Bilan non validé</option><option value='En attente'>En attente</option></select>";
    var idequipe = 0;
    var id_situation_s
    var recuper_bil = "";
    var recupertabl_g = "";
    var Allportfeuil = "";
    var equipeselectionnes = "";
    var declaratoin_com = "";
    var click_decl_ = "";
    
    var tete_nb_linge = '<table id="table_tiana_alex_nbligne" class="table-bordered text-center" width="100%" style="zoom:75%">'+
    '<thead>'+
    '<tr>'+
     '   <th style="background:#ddd;color:red;font-size:15px">EQUIPE</th>' +
      '  <th style="background:#ddd;color:red;font-size:15px">DOSSIER</th>' +
      '  <th id="o" style="background:#ddd;color:red;font-size:15px">SITUATION DOSSIER</th>' +
       ' <th id="stedralb" style="font-size:15px">ANNEE</th>' +
        '<th style="font-size:15px">NOMBRE DE LIGNE</th>' +
        '<th style="font-size:15px">CHIFFRE D AFFAIRE</th>' +
      '</tr>' +
    '</thead>';

    $("input[type=date]").val("");
    $("input[type=text]").val("");
    $("select").val("");

    $('#card_perso').css('height',(screen.height / 1.27) + "px");
    var monthName=['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    function GetLastDayOfThisMonth(aa, mm) {
        var myDate = new Date(aa + "-" + mm + "-" + 01);
        var myMonth = myDate.setMonth(myDate.getMonth() + 1);
        var theDay = myDate.setDate(0);
        var lastDay = myDate.getDate();
        return lastDay;
    }

    function date_format(date){
        var datev = date.closest('tr').find('.ms').html();
        var annee = datev.substring(6, 10);
        var mois = datev.substring(3, 5);
        var date_cloture = annee + "-" + mois;
        return date_cloture;
    }

    $('.select2').select2(
        {
            placeholder: "......",
            width:300,
          }).on('change', function(e) {
            var data = $(".select2").val();
            $('#anneeselect').val("");
            idequipe = data;
            $('#sEquipe').html($(".select2 option:selected").text());
            $('#anneeselect').val("");
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:'listusersimple',
                    idequipe:idequipe,
                },
                success: function(data) {
                    listcdm= "";   
                    $.each(data, function(index, value) { 
                        listcdm +=  '&nbsp;<i class="fas fa-user-alt fa-sm"></i>&nbsp;'+ value ;
                    });
                    $('.ms').html("-");
                    $('.anneliquid').html("-");
                    $('.repms').html("-");
                    $('.faitrep').html("-");
                    $('.t_moins_fait').html("-");
                    $('.pt_moins_fait').html("-");
                    $('.pt_moins_fait').html("-");
                    $('.totalrepms').html("-");
                    $('.totalfaitrep').html("-");
                    $('.totalt_moins_fait').html("-");
                    $('#horsmams').hide();
                    $('#horsma').hide();
                    $('.navbar-toggler').click(); 
                    $('#anneeselect').val("");
                    $('#elm_blq').html("");
                    $('#nomcdmlist').html(listcdm);
                    $('.col-md-2').show(150);
                    $('.lqdttl').html("-");
                    $('.faitliqd').html("-");
                    $('.moinlsqud').html("-");
                    $('.prliqudt').html("-");
                    $('#dttable_alert').html("");
                    $('.ttis').html("-");
                    $('.fft').html("-");
                    $('.rstfft').html("-");
                    $('.prsft,.exper_fait,.fait_expert,.restant_expert,.afaire_v_exp').html("-");
                    $('.p_expert').html('0.00 %')
                    $('#nomcdmlist').css('position','absolute');
                    $('#nomcdmlist').css('overflow','auto');
                    //$('#nomcdmlist').css('height',(screen.height / 1.7) + "px");
                    $('.nomcdm').css('background','#f5f5f5');
                    
                    
                },
            })  


          }		
    );

    $(document).on('click', '.list-group-item-action', function(){
        
    })

    

    $(document).on('change', '#anneeselect', function() {
        $('#clone_export').html("");
      $('.e_m_m').html("-");$('.faitrep').html("-");$('t_moins_fait').html("-");
      $('.fe_m_m').html("-");$('.moinfe_m_m').html("-");$('.r_m_m').html("-");
      $('.fr_m_m').html("-");$('.moifr_m_m').html("-");$('.rt_rep').html("-");
      $('.rt_repres').html("-");$('.rt_reprmoins').html("-");$('.zt').html("-");
      $('.faitzt').html("-");$('.restfzt').html("-");
      $('.rst_m_m').html("-");$('.pmoifr_m_m').html("-");$('.rt_resul').html("-");
      $('.pourcetf').html("-");$('.prrestfait').html("-");$('.prsft').html("-");
      $('#loading2stat').show();
      if($('#sEquipe').html() == ""){
            alert("Choisissez un Equipe !");
            $('#loading2stat').hide();
            return;
        }
        $('#dttable_alert').html("");
        $('.marsttt').html("mars-" + $(this).val());
        $('.juinttt').html("juin-" + $(this).val());
        $('.septttt').html("septembre-" + $(this).val());
        $('.decttt').html("decembre-" + $(this).val());
        $('.anneliquid').html($(this).val());

        $('.janv').html(GetLastDayOfThisMonth($(this).val(), 1) + "/" + "01/" + $(this).val());
        $('.fev').html(GetLastDayOfThisMonth($(this).val(), 2) + "/" + "02/" + $(this).val());
        $('.mars').html(GetLastDayOfThisMonth($(this).val(), 3) + "/" + "03/" + $(this).val());
        $('.avri').html(GetLastDayOfThisMonth($(this).val(), 4) + "/" + "04/" + $(this).val());
        $('.mais').html(GetLastDayOfThisMonth($(this).val(), 5) + "/" + "05/" + $(this).val());
        $('.juin').html(GetLastDayOfThisMonth($(this).val(), 6) + "/" + "06/" + $(this).val());
        $('.juil').html(GetLastDayOfThisMonth($(this).val(), 7) + "/" + "07/" + $(this).val());
        $('.aout').html(GetLastDayOfThisMonth($(this).val(), 8) + "/" + "08/" + $(this).val());
        $('.sept').html(GetLastDayOfThisMonth($(this).val(), 9) + "/" + "09/" + $(this).val());
        $('.oct').html(GetLastDayOfThisMonth($(this).val(), 10) + "/" + "10/" + $(this).val());
        $('.nov').html(GetLastDayOfThisMonth($(this).val(), 11) + "/" + "11/" + $(this).val());
        $('.dec').html(GetLastDayOfThisMonth($(this).val(), 12) + "/" + "12/" + $(this).val());

        $('.janvt').html("janvier-" + $(this).val());
        $('.fevt').html("fevrier-" + $(this).val());
        $('.marst').html("mars-" + $(this).val());
        $('.avrit').html("avril-" + $(this).val());
        $('.maist').html("mais-" + $(this).val());
        $('.juint').html("juin-" + $(this).val());
        $('.juilt').html("juillet-" + $(this).val());
        $('.aoutt').html("aout-" + $(this).val());
        $('.septt').html("septembre-" + $(this).val());
        $('.octt').html("octobre-" + $(this).val());
        $('.novt').html("novembre-" + $(this).val());
        $('.dect').html("decembre-" + $(this).val());
        $('.octt').html("octobre-" + $(this).val());
        $('.novt').html("novembre-" + $(this).val());
        $('.dect').html("decembre-" + $(this).val());
       
        $.ajax({
            url:'route.php',
            type:'POST',
            dataType:'json',
            data:{
                param:'aa_mm',
                id:idequipe,
                exercice:$(this).val(),
            },
            success: function(data) {
                $('#clone_export').html("");
                listcdm= "";   
                sumrepms = 0;sumfait = 0;sumprest = 0;
                $.each(data, function(index, value) { 
                var valeur = value.split('#');  
                sumrepms += parseInt(valeur[0])
                sumfait += parseInt(valeur[1])
                sumprest += parseInt(valeur[2])
                $('.repms:eq(' + index +')').html(valeur[0]);
                $('.faitrep:eq(' + index +')').html(valeur[1]);
                $('.t_moins_fait:eq(' + index +')').html(valeur[2]);
                $('.pt_moins_fait:eq(' + index +')').html(valeur[3]);


                
                
                $('.t_transmis:eq(' + index +')').html(valeur[8]); 
                $('.pr_t_transmis:eq(' + index +')').html(valeur[9]); 
                $('.s_valt_edi:eq(' + index +')').html(valeur[10]); 
                $('.pr_s_valt_edi:eq(' + index +')').html(valeur[11]); 

       

                

                

                
                $('.exper_fait:eq(' + index +')').html(valeur[1]);
                $('.valid_exp:eq(' + index +')').html(valeur[6]);

                $('.restant_expert:eq(' + index +')').html(valeur[12]); 

                $('.fait_expert:eq(' + index +')').html(valeur[13]); 
                $('.afaire_v_exp:eq(' + index +')').html(valeur[13]); 
                $('.p_expert:eq(' + index +')').html(valeur[14]);

                $('.expert_restant:eq(' + index +')').html(valeur[15]);
                $('.expert_ft:eq(' + index +')').html(valeur[16]);


                if(valeur[13] > 0 ){
                    $('.p_expert:eq(' + index +')').html( ((valeur[13] * 100) / valeur[1]).toFixed(2) + " %" );
                }else{
                    $('.p_expert:eq(' + index +')').html( "0.00 %" );
                }


                if(valeur[16] > 0 ){
                        $('.pour_expert_ft:eq(' + index +')').html( ((valeur[16] * 100) / valeur[13]).toFixed(2) + " %" );
                    }else{
                        $('.pour_expert_ft:eq(' + index +')').html( "0.00 %" );
                    }

                    $('.pt_envclik_bl:eq(' + index +')').html(valeur[16]); 
                    $('.pt_envclik_bl_restant:eq(' + index +')').html(valeur[17]);
                    $('.pt_envclik_bl_fait:eq(' + index +')').html(valeur[18]);

                    if(valeur[16] > 0 ){
                        $('.prt_pt_envclik_bl:eq(' + index +')').html( ((valeur[18] * 100) / valeur[16]).toFixed(2) + " %" );
                    }else{
                        $('.prt_pt_envclik_bl:eq(' + index +')').html( "0.00 %" );
                    }
                    $('.v_client:eq(' + index +')').html(valeur[18]); 

                    $('.v_client_restant:eq(' + index +')').html(valeur[19]); 
                    $('.v_client_fait:eq(' + index +'),.v_manager:eq(' + index +')').html(valeur[20]); 

                    if(valeur[20] > 0){
                        $('.pr_v_client:eq(' + index +')').html(((valeur[20] * 100) / valeur[18]).toFixed(2) + " %");
                    }else{
                        $('.pr_v_client:eq(' + index +')').html( "0.00 %" );
                    }

                    $('.v_manager_restant:eq(' + index +')').html(valeur[21]); 
                    $('.v_manager_fait:eq(' + index +'),.t_transmis:eq(' + index +')').html(valeur[22]); 
                    if(valeur[20] > 0){
                        $('.v_manager_pourcent:eq(' + index +')').html(((valeur[22] * 100) / valeur[20]).toFixed(2) + " %");
                    }else{
                        $('.v_manager_pourcent:eq(' + index +')').html( "0.00 %" );
                    }

                    $('.t_transmis_restant:eq(' + index +')').html(valeur[23]); 
                    $('.t_transmis_fait:eq(' + index +'),.s_valt_edi:eq(' + index +')').html(valeur[24]); 
                    if(valeur[22] > 0){
                        $('.pr_t_transmis:eq(' + index +')').html(((valeur[24] * 100) / valeur[22]).toFixed(2) + " %");
                    }else{
                        $('.pr_t_transmis:eq(' + index +')').html( "0.00 %" );
                    }

                    $('.s_valt_edi_restant:eq(' + index +')').html(valeur[25]); 
                    $('.s_valt_edi_fait:eq(' + index +')').html(valeur[26]); 
                    if(valeur[24] > 0){
                        $('.pr_s_valt_edi:eq(' + index +')').html(((valeur[26] * 100) / valeur[24]).toFixed(2) + " %");
                    }else{
                        $('.pr_s_valt_edi:eq(' + index +')').html( "0.00 %" );
                    }
                });
                
            
                

                $('.totalrepms').html(sumrepms);
                $('.totalfaitrep').html(sumfait);
                $('.totalt_moins_fait').html(sumprest);
                $('#exportbil').show(100);
                $('#horsma').show(100);
                $('#horsmams').hide(100);  
                et_rt();
                rm();
                em();
                ca12();
                cvae();
                cfe();
                acompteIs();
                $('#loading2stat').hide(); 
                $('#clone_export').html("<table id='clone_export'>"+ 
                 $('#statparporftfeuil').html().replace(/toggle_pre_dr/g," toggle_pre_dr_s").
                 replace(/toggle_rev/g," toggle_rev_s").
                 replace(/toggle_v_ex/g," toggle_v_ex_s").
                 replace(/toggle_v_ccfr/g," toggle_v_ccfr_s").
                 replace(/toggle_v_vvclfr/g," toggle_v_vvclfr_s").
                 replace(/toggle_v_mgr/g," toggle_v_mgr_s").
                 replace(/toggle_v_tlr/g," toggle_v_tlr_s").
                 replace(/toggle_EDI/g," toggle_EDI_s").
                 replace(/#343d49/g,"yellow")
                 
                 + "</tbody></table>" )
                
               $('#clone_export .toggle_pre_dr_s').attr("colspan","4");
                $('#clone_export  .toggle_rev_s').attr("colspan","4");
                $('#clone_export  .toggle_v_ex_s').attr("colspan","4");
                $('#clone_export  .toggle_v_ccfr_s').attr("colspan","4");
                $('#clone_export  .toggle_v_vvclfr_s').attr("colspan","4");
                $('#clone_export  .toggle_v_mgr_s').attr("colspan","4");
                $('#clone_export  .toggle_v_tlr_s').attr("colspan","4");
                $('#clone_export  .toggle_EDI_s').attr("colspan","5");      
            },
        })        
    })


    //detail tab1
 
    var tete_clone =
    '<thead>'+
      '<tr id="tete_shide">'+
      '<th style="display:none">idsituation</th>'+
        '<th style="display:none">Page</th>'+
        '<th style="display:">Equipe</th>'+
        '<th>Nom dossier</th>'+
        '<th>Situation dossier</th>'+
        '<th>Etat bilan</th>'+
        '<th>Date cloture</th>'+
        '<th>Date d\'envoie bilan</th>'+
      '</tr>'+
    '</thead>';
    $(document).on('click','.repms',function(){
        detailtab($(this),'bilan_detailtab1',"detail__1");
        $('#clickdtD').hide(200);
    })

    $(document).on('click','#click_detail__1',function(){
        var tableau = "<table id='detail__1_clone'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__1_clone","Detail");
    })



    //detail tab1
    $(document).on('click','.faitrep',function(){
        detailtab($(this),'bilan_detailtab2',"detail__2");
        $('#clickdtD').hide(200);
    })

    $(document).on('click','#click_detail__2',function(){
        var tableau = "<table id='detail__2_clone'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__2_clone","Detail");
    })

    $(document).on('click','.t_moins_fait',function(){
        detailtab($(this),'bilan_detailtab3',"detail__3");
        $('#clickdtD').hide(200);
    })

    $(document).on('click','#click_detail__3',function(){
        var tableau = "<table id='detail__3_clone'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__3_clone","Detail");
    })

    //detail tab1
    $(document).on('click','.exper_fait',function(){
        detailtab_autre($(this),'bilan_detailtab2',"detail__autre_1");
        $('#clickdt').hide();
    })  

    $(document).on('click','#click_detail__autre_1',function(){
        var tableau = "<table id='detail__autre_1'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__autre_1","Detail");
    })
    
    
    $(document).on('click','.restant_expert',function(){
        detailtab_expert($(this),'bilan_expert',"detail__autre_2");
        $('#clickdt').hide();
    })  
    
    $(document).on('click','#click_detail__autre_2',function(){
        var tableau = "<table id='detail__autre_2'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__autre_2","Detail");
    })
 
    $(document).on('click','.expert_restant',function(){
        detailtab_v_rest($(this),'bilan_expert_v',"detail__exp_rest_s");
    })  

    $(document).on('click','#click_detail__exp_rest_s',function(){
        var tableau = "<table id='detail__exp_rest_s'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__exp_rest_s","Detail");
    })

    

    $(document).on('click','.expert_ft',function(){
        $('#clickdtD_expert').hide();
        expert_ft($(this),'bilan_expert_v_fait',"detail__expfait_s");
    })  

    
        
    $(document).on('click','#click_detail__expfait_s',function(){
        var tableau = "<table id='detail__expfait_s'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__expfait_s","Detail");
    })

    

      $(document).on('click','.pt_envclik_bl',function(){
        $('#clickdtD_expert').hide();
        expert_ft_vfait($(this),'bilan_expert_v_fait',"detail__expfait_com_s");
    })

    $(document).on('click','#click_detail__expfait_com_s',function(){
        var tableau = "<table id='detail__expfait_com_s'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__expfait_com_s","Detail");
    })
    
 
    

    $(document).on('click','.fait_expert,.afaire_v_exp',function(){
        detailtab_expert_fait($(this),'bilan_expert_fait',"detail__fait_s");
        $('#clickdt').hide();
    })  

    $(document).on('click','#click_detail__fait_s',function(){
        var tableau = "<table id='detail__fait_s'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
        $('#table_clones').html(tableau);
        tableToExcel("detail__fait_s","Detail");
    })


    
    $(document).on('click','.pt_envclik_bl_restant',function(){
        fonction_v_ccfr($(this),'click_pt_envclik_bl_restant',"detail__exprestant_com_s");
        $('#clickdt').hide();
    }) 


    function recuper_v_d(id){        
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

  



    $(document).on('click','.declaration_telec',function(){
        $('#nom_d').html("");
        
        for(var z = 1; z< 9; z++){
                $('.dt_bl_default' + z + '').val("");
        }
        $('.r_disable td textarea').val("");
        
        id_situation_s = $(this).closest('tr').find('.id_sttt').html();
        $('#nom_d').html('nom dossier : <br><i class="fas fa-folder"></i>&nbsp;'+ $(this).closest('tr').find('.nom_x_dossier').html());
        $('.dt_bl_default1').val($(this).closest('tr').find('.dt_bl_com_cdm_frm').html());        
        $('.dt_bl_default2').val($(this).closest('tr').find('.date_revue_e').html()); 
        $('.dt_bl_default3').val($(this).closest('tr').find('.date_validat_e').html()); 
        

        $.ajax({
            url: "route_Situation_portfeuille.php",
            type: 'POST',
            dataType:'json',
            data: {
                param:"recupere_checked",
                id:id_situation_s
            },
            success: function(datas) {
                if(datas[0].param_liase_fiscal == 1 || datas[0].param_liase_fiscal == null){$('.r_disable:eq(0)').css({"display":""});}else{$('.r_disable:eq(0)').css({"display":"none"});}
                if(datas[0].param_ca12 == 1 || datas[0].param_ca12 == null){$('.r_disable:eq(1)').css({"display":""});}else{$('.r_disable:eq(1)').css({"display":"none"});}
                if(datas[0].param_solde_is == 1 || datas[0].param_solde_is == null){$('.r_disable:eq(2)').css({"display":""});}else{$('.r_disable:eq(2)').css({"display":"none"});}
                if(datas[0].param_cva1330 == 1 || datas[0].param_cva1330 == null){$('.r_disable:eq(3)').css({"display":""});}else{$('.r_disable:eq(3)').css({"display":"none"});}
                if(datas[0].param_solde_cvae == 1 || datas[0].param_solde_cvae == null){$('.r_disable:eq(4)').css({"display":""});}else{$('.r_disable:eq(4)').css({"display":"none"});}
                if(datas[0].param_decloyer == 1 || datas[0].param_decloyer == null){$('.r_disable:eq(5)').css({"display":""});}else{$('.r_disable:eq(5)').css({"display":"none"});}
                if(datas[0].param_das2 == 1 || datas[0].param_das2 == null){$('.r_disable:eq(6)').css({"display":""});}else{$('.r_disable:eq(6)').css({"display":"none"});}
                if(datas[0].param_c3s == 1 || datas[0].param_c3s == null){$('.r_disable:eq(7)').css({"display":""});}else{$('.r_disable:eq(7)').css({"display":"none"});}

            },
        });        
        
        recuper_v_d(id_situation_s);

    }) 

    
    
    function fonction_v_ccfr(nomclick,test,nom_table){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        clone_table = "";
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th style='display:none'></th>" +
                        "<th class='cd' >Date modif</th>" +
                        "<th class='cd'>Responsable</th></tr>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='declaration_telec' data-toggle='modal' data-target='#declaration_modal' data-backdrop='static' data-keyboard='false'>"+
                        "<td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd nom_x_dossier'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd dt_bl_com_cdm_frm'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                   "<td class='cd date_revue_e' style='background: #20a0bd;color:white;display:none'>"+data[i].date_modif_revu+"</td>" +
                   "<td class='cd date_validat_e'  style='background: #20a0bd;color:white'>"+data[i].date_expert+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_expert+"</td></tr>" ;
             
                    }
                    
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");                    
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                },
                })  
        }else{
            alert("error");
        }

    }

    function fonction_v_fai_tous(nomclick,test,nom_table,avec_click){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        clone_table = "";
        var modal_s = "";
        var nom_class = "";
        if(avec_click){ modal_s ="data-toggle='modal' data-target='#declaration_modal' data-backdrop='static' data-keyboard='false'"; nom_class = "declaration_telec" }else{modal_s = "" ; nom_class = "";}
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th style='display:none'></th>" +
                        "<th class='cd' >COMM ° CLIENT</th>" +
                        "<th class='cd'>Responsable</th>" +
                        "<th style='display:none'>date_expert</th>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='"+ nom_class +"' " + modal_s + ">"+
                        "<td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd nom_x_dossier'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd dt_bl_com_cdm_frm'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                   "<td class='cd date_revue_e' style='background: #20a0bd;color:white;display:none'>"+data[i].date_modif_revu+"</td>" +
                   "<td class='cd com_client_cdm_fr'  style='background: #20a0bd;color:white'>"+data[i].com_client_cdm_fr+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_valid+"</td>"+
                        "<td class='cd date_validat_e'  style='background: #20a0bd;color:white;display:none'>"+data[i].date_expert+"</td>" +
                        "</tr>" ;
             
                    }
                    
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");                    
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                },
                })  
        }else{
            alert("error");
        }

    }

    function click_edi_fait_tous(nomclick,test,nom_table,condtion,avec_click){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        clone_table = "";
        var modal_s = "";
        var nom_class = "";
        if(avec_click){ modal_s ="data-toggle='modal' data-target='#declaration_modal' data-backdrop='static' data-keyboard='false'"; nom_class = "declaration_telec" }else{modal_s = "" ; nom_class = "";}
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    condtion:condtion,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th style='display:none'></th>" +
                        "<th class='cd' >COMM ° CLIENT</th>" +
                        "<th class='cd'>Responsable</th>" +
                        "<th style='display:none'>date_expert</th>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='"+ nom_class +"' "+ modal_s +"'>"+
                        "<td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd nom_x_dossier'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd dt_bl_com_cdm_frm'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                   "<td class='cd date_revue_e' style='background: #20a0bd;color:white;display:none'>"+data[i].date_modif_revu+"</td>" +
                   "<td class='cd com_client_cdm_fr'  style='background: #20a0bd;color:white'>"+data[i].com_client_cdm_fr+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_valid+"</td>"+
                        "<td class='cd date_validat_e'  style='background: #20a0bd;color:white;display:none'>"+data[i].date_expert+"</td>" +
                        "</tr>" ;
             
                    }
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");                    
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                },
                })  
        }else{
            alert("error");
        }

    }

    function click_teletrans_fait_tous(nomclick,test,nom_table,condtion,avec_click){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        clone_table = "";
        var modal_s = "";
        var nom_class = "";
        if(avec_click){ modal_s ="data-toggle='modal' data-target='#declaration_modal' data-backdrop='static' data-keyboard='false'"; nom_class = "declaration_telec" }else{modal_s = "" ; nom_class = "";}
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    condtion:condtion,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th style='display:none'></th>" +
                        "<th class='cd' >COMM ° CLIENT</th>" +
                        "<th class='cd'>Responsable</th>" +
                        "<th style='display:none'>date_expert</th>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='"+ nom_class +"' "+ modal_s +"'>"+
                        "<td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd nom_x_dossier'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd dt_bl_com_cdm_frm'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                   "<td class='cd date_revue_e' style='background: #20a0bd;color:white;display:none'>"+data[i].date_modif_revu+"</td>" +
                   "<td class='cd com_client_cdm_fr'  style='background: #20a0bd;color:white'>"+data[i].com_client_cdm_fr+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_valid+"</td>"+
                        "<td class='cd date_validat_e'  style='background: #20a0bd;color:white;display:none'>"+data[i].date_expert+"</td>" +
                        "</tr>" ;
             
                    }
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");                    
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                    
                },
                })  
        }else{
            alert("error");
        }

    }
    
    function fonction_manager_tous(nomclick,test,nom_table,condtion,avec_click){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        clone_table = "";
        var modal_s = "";
        var nom_class = "";
        if(avec_click){ modal_s ="data-toggle='modal' data-target='#declaration_modal' data-backdrop='static' data-keyboard='false'"; nom_class = "declaration_telec" }else{modal_s = "" ; nom_class = "";}
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    condtion:condtion,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th style='display:none'></th>" +
                        "<th class='cd' >COMM ° CLIENT</th>" +
                        "<th class='cd'>Responsable</th>" +
                        "<th style='display:none'>date_expert</th>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='"+ nom_class +"' "+ modal_s +"'>"+
                        "<td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd nom_x_dossier'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd dt_bl_com_cdm_frm'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                   "<td class='cd date_revue_e' style='background: #20a0bd;color:white;display:none'>"+data[i].date_modif_revu+"</td>" +
                   "<td class='cd com_client_cdm_fr'  style='background: #20a0bd;color:white'>"+data[i].com_client_cdm_fr+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_valid+"</td>"+
                        "<td class='cd date_validat_e'  style='background: #20a0bd;color:white;display:none'>"+data[i].date_expert+"</td>" +
                        "</tr>" ;
             
                    }
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                },
                })  
        }else{
            alert("error");
        }

    }

    function fonction_valide_fai_tous(nomclick,test,nom_table,condtion,avec_click){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        clone_table = "";
        var modal_s = "";
        var nom_class = "";
        if(avec_click){ modal_s ="data-toggle='modal' data-target='#declaration_modal' data-backdrop='static' data-keyboard='false'"; nom_class = "declaration_telec" }else{modal_s = "" ; nom_class = "";}
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    condtion:condtion,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th style='display:none'></th>" +
                        "<th class='cd' >COMM ° CLIENT</th>" +
                        "<th class='cd'>Responsable</th>" +
                        "<th style='display:none'>date_expert</th>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='"+ nom_class +"' "+ modal_s +"'>"+
                        "<td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd nom_x_dossier'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd dt_bl_com_cdm_frm'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                   "<td class='cd date_revue_e' style='background: #20a0bd;color:white;display:none'>"+data[i].date_modif_revu+"</td>" +
                   "<td class='cd com_client_cdm_fr'  style='background: #20a0bd;color:white'>"+data[i].com_client_cdm_fr+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_valid+"</td>"+
                        "<td class='cd date_validat_e'  style='background: #20a0bd;color:white;display:none'>"+data[i].date_expert+"</td>" +
                        "</tr>" ;
             
                    }
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                },
                })  
        }else{
            alert("error");
        }

    }
    
    function detailtab_autre(nomclick,test,nom_table){
        clone_table = "";
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";

                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                        '<thead>'+
                          '<tr id="tete_shide">'+
                          '<th style="display:none">idsituation</th>'+
                            '<th width="3%" style="display:none">Page</th>'+
                            '<th style="display:">Equipe</th>'+
                            '<th>Nom dossier</th>'+
                            '<th>Situation dossier</th>'+
                            '<th style="display:none">Etat bilan</th>'+
                            '<th>Date cloture</th>'+
                            '<th style="display:none">Date d\'envoie bilan</th>'+
                            "<td class='cd' style='display:none'>-</td>" +
                            "<td class='cd'style='display:none'>-</td></tr>" +
                          '</tr>'+
                        '</thead>'+
                        '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class=''><td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  width='3%' style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                        "<td class='cd' style='display:none'>-</td>" +
                        "<td class='cd'  style='display:none'>-</td>"+
                        "<td class='cd date_validat_e'  style='background: #20a0bd;color:white;display:none'>"+data[i].date_expert+"</td>" +
                        "</tr>" ;
             
                    }
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>");                     
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");
                    clone_table = tableau.replace(/null/g, "-");
                    datatable_1(nom_table);
                },
                })  
        }else{
            alert("error");
        }

    }

    function detailtab_expert(nomclick,test,nom_table){
        clone_table = "";
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<td class='cd' style='display:none'>-</td>" +
                        "<td class='cd'style='display:none'>-</td></tr>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='click_dt_expert'><td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                        "<td class='cd' style='display:none'>-</td>" +
                        "<td class='cd'style='display:none'>-</td></tr>" ;
             
                    }
                     $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                     $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'><i class='fas fa-file-excel'></i>&nbsp;Export</a>");
                     clone_table = tableau.replace(/null/g, "-");
                    datatable_1(nom_table);
       
                },
                })  
        }else{
            alert("error");
        }

    }

    function detailtab_expert_fait(nomclick,test,nom_table){
        clone_table = "";
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th class='cd' >Date modif</th>" +
                        "<th class='cd'>Responsable</th></tr>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';
                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='click_dt_expert' ><td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].date_modif_revu+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].responsable+"</td></tr>" ;
             
                    }
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'><i class='fas fa-file-excel'></i>&nbsp;Export</a>");
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                },
                })  
        }else{
            alert("error");
        }

    }


    function detailtab_v_rest(nomclick,test,nom_table){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th class='cd' >Date modif</th>" +
                        "<th class='cd'>Responsable</th></tr>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';
                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='autre_iexpert' data-toggle='modal' data-target='#clickdtD_expert_restant' data-backdrop='static' data-keyboard='false'><td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  width='4%' style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd' >"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd' >"+data[i].date_cloturation+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].date_modif_revu+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].responsable+"</td></tr>" ;
             
                    }
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'><i class='fas fa-file-excel'></i>&nbsp;Export</a>");
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
      
                },
                })  
        }else{
            alert("error");
        }

    }


    function expert_ft(nomclick,test,nom_table){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th class='cd' >Date modif</th>" +
                        "<th class='cd'>Responsable</th></tr>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';

                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class='autre_iexpert' data-toggle='modal' data-target='#clickdtD_expert_restant' data-backdrop='static' data-keyboard='false'><td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  width='4%' style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd' width='13%'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd' >"+data[i].date_cloturation+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].date_expert+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_expert+"</td></tr>" ;
             
                    }
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'><i class='fas fa-file-excel'></i>&nbsp;Export</a>");
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
      
                },
                })  
        }else{
            alert("error");
        }

    }

    function expert_ft_vfait(nomclick,test,nom_table){
        $('#detail_expert').html(""); 
        $('#tete_shide_expert,#xk,#detail_expert').show();
        if(idequipe > 0){
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:test,
                    id:idequipe,
                    date_exercice:date_format(nomclick),
                },
                success: function(data) {
                    var tableau = "";
                    var tete ='<table id="' + nom_table + '" class="table-bordered" width="100%">'+
                    '<thead>'+
                      '<tr id="tete_shide">'+
                      '<th style="display:none">idsituation</th>'+
                        '<th width="3%" style="display:none">Page</th>'+
                        '<th style="display:">Equipe</th>'+
                        '<th>Nom dossier</th>'+
                        '<th>Situation dossier</th>'+
                        '<th style="display:none">Etat bilan</th>'+
                        '<th>Date cloture</th>'+
                        '<th style="display:none">Date d\'envoie bilan</th>'+
                        "<th class='cd' >Date modif</th>" +
                        "<th class='cd'>Responsable</th></tr>" +
                      '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%">';
                    for(var i = 0; i< data.length; i++){
                        tableau += 
                        "<tr class=''><td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                        "<td  width='4%' style='display:none'>"+(i + 1 )+"</td>" +
                        "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                        "<td class='cd'>"+data[i].nomdossier+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].etat_bilan+"</td>" +
                        "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                        "<td class='cd' >"+data[i].date_cloturation+"</td>" +
                        "<td class='cd'  style='display:none'>"+data[i].date_envoie_bilan_karlit+"</td>"+
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].date_expert+"</td>" +
                        "<td class='cd' style='background: #20a0bd;color:white'>"+data[i].nom_expert+"</td></tr>" ;
             
                    }
                    $('#choix_exp_autre').html( "<a href='#' id ='click_"+nom_table+"'><i class='fas fa-file-excel'></i>&nbsp;Export</a>");
                    $('#detail_expert').html(tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                    datatable_1(nom_table);
                    clone_table = tableau.replace(/null/g, "-");
                },
                })  
        }else{
            alert("error");
        }

    }
    

        var clone_table = "";

        function detailtab(nomclick,test,nom_table){
            clone_table = "";
            if(idequipe > 0){
                $.ajax({
                    url:'route.php',
                    type:'POST',
                    dataType:'json',
                    data:{
                        param:test,
                        id:idequipe,
                        date_exercice:date_format(nomclick),
                    },
                    success: function(data) {
                        var tableau = "";
                        var tete ='<table id="' + nom_table + '" class="table-bordered">'+
                        '<thead>'+
                          '<tr id="tete_shide">'+
                          '<th style="display:none">idsituation</th>'+
                            '<th style="display:none">Page</th>'+
                            '<th style="display:">Equipe</th>'+
                            '<th>Nom dossier</th>'+
                            '<th>Situation dossier</th>'+
                            '<th>Etat bilan</th>'+
                            '<th>Date cloture</th>'+
                            '<th>Date d\'envoie bilan</th>'+
                          '</tr>'+
                        '</thead>'+
                        '<tbody style="zoom:80%" class="mytableau">';
                      
                        for(var i = 0; i< data.length; i++){
                            tableau += 
                            "<tr class='click_dt_bl'><td class='id_sttt' style='display:none'>"+data[i].id_situation+"</td>" +
                            "<td style='display:none'>"+(i + 1 )+"</td>" +
                            "<td class='cd' style='display:' width='2%'>"+data[i].code+"</td>" +
                            "<td class='cd'>"+data[i].nomdossier+"</td>" +
                            "<td class='cd'>"+data[i].etat_bilan+"</td>" +
                            "<td class='cd'>"+data[i].idsituation_dossier+"</td>" +
                            "<td class='cd'>"+data[i].date_cloturation+"</td>" +
                            "<td class='cd'>"+data[i].date_envoie_bilan_karlit+"</td></tr>";
                         
                 
                        }
                        clone_table = tableau.replace(/null/g, "-"); 
                        $('#export_choix').html( "<a href='#' id ='click_"+nom_table+"'><i class='fas fa-file-excel'></i>&nbsp;Export</a>");
                        $('#detailtab_tab1').html(
                            tete + tableau.replace(/null/g, "-") + "</tbody></table>"); 
                        datatable_1(nom_table);
                    },
                    })  
            }else{
                alert("error");
            }

        }

        function datatable_1(nomid){
            $('#'+ nomid + ' thead tr').clone(true).appendTo('#'+nomid+' thead' );
            $('#'+ nomid + ' thead tr:eq(1) th').each( function (i) {
                if (i == 3 || i == 4 ){
                    $(this).html("<input type='text' class='stsearch'>");
                }else{
                    $(this).html("<input type='text' class='stsearch form-control' style='visibility:hidden'>");
                }
                $('.stsearch').val("");
                        $( '.txtserach,.stsearch', this ).on( 'keyup', function () {
                            if ( table.column(i).search() !== this.value ) {
                                table
                                    .column(i)
                                    .search(this.value )
                                    .draw();
                                    
                            }
                            clone_table = $('.mytableau').html().replace(/null/g, "-"); 
                        });
  
                    } );

                    var table = $('#'+ nomid + '').DataTable( {
                        orderCellsTop: true,
                        deferRender:    true,
                        scroller:       true,
                        filter: true,
                        "paging": false,
           
                    } );
                    
        }

    
        function et_rt(){
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param:"recupereET_RT",
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.rt_rep,.zt,.tmars,.sdmars,.tjuiin,.sdjuin,.tsept,.sdsept,.tdece,.sddec,.pret_env_c').html(0);
                    $('.rt_reprmoins,.restfzt,.pret_env_c_rt,.pret_dtv_c_rt,.rt_faik,.faitkpr,.tfakpr,.pret_dtlet_c,.pret_dtvet_c').html(0);
                   
                    $('.rt_rep').html(data.total_RT);
                    $('.zt').html(data.total_ET);
                         if(data.mars_ET.length > 0){$('.tfak:eq(0)').html(data.mars_ET[0].mars_et)}else{$('.tfak:eq(0)').html(0)};
                         if(data.mars_RT.length > 0){$('.prrt_faik:eq(0)').html(data.mars_RT[0].mars_rt)}else{$('.sdmars').html(0)};
        
                         if(data.juin_ET.length != "0"){$('.tfak:eq(1)').html(data.juin_ET[0].juin_et)}else{$('.tfak:eq(1)').html(0)};
                         if(data.juin_RT.length != "0"){$('.prrt_faik:eq(1)').html(data.juin_RT[0].juin_rt)}else{$('.sdjuin').html(0)};
                            
                         if(data.septembre_ET.length != "0"){$('.tfak:eq(2)').html(data.septembre_ET[0].septembre_et)}else{('.tfak:eq(2)').html(0)};
                         if(data.septembre_RT.length != "0"){ $('.prrt_faik:eq(2)').html(data.septembre_RT[0].septembre_rt)}else{$('.sdsept').html(0)};
        
                         if(data.decembre_ET.length != "0") {$('.tfak:eq(3)').html(data.decembre_ET[0].decembre_et)}else{$('.tfak:eq(3)').html(0)};
                         if(data.decembre_RT.length != "0") {$('.prrt_faik:eq(3)').html(data.decembre_RT[0].decembre_rt)}else{$('.sddec').html(0) };     
                         
                         if(data.mars_RT_F.length > 0){$('.sdmars').html(data.mars_RT_F[0].mars_rt)}else{$('.prrt_faik:eq(0)').html(0)};
                         if(data.juin_RT_F.length != "0"){$('.sdjuin').html(data.juin_RT_F[0].juin_rt)}else{$('.prrt_faik:eq(1)').html(0)};
                         if(data.septembre_RT_F.length != "0"){ $('.sdsept').html(data.septembre_RT_F[0].septembre_rt)}else{$('.prrt_faik:eq(2)').html(0)};
                         if(data.decembre_RT.length_F != "0") {$('.sddec').html(data.decembre_RT_F[0].decembre_rt)}else{$('.prrt_faik:eq(3)').html(0)};

                         if(data.mars_ET_F.length > 0){$('.tmars').html(data.mars_ET_F[0].mars_et)}else{$('.prrt_faik:eq(0)').html(0)};
                         if(data.juin_ET_F.length != "0"){$('.tjuiin').html(data.juin_ET_F[0].juin_et)}else{$('.prrt_faik:eq(1)').html(0)};
                         if(data.septembre_ET_F.length != "0"){ $('.tsept').html(data.septembre_ET_F[0].septembre_et)}else{$('.prrt_faik:eq(2)').html(0)};
                         if(data.decembre_ET_F.length_F != "0") {$('.tdece').html(data.decembre_ET_F[0].decembre_et)}else{$('.prrt_faik:eq(3)').html(0)};


                         $('.et_env_c_rt:eq(0)').html(data.mars_envoie_client_rt);
                         $('.et_env_c_rt:eq(1)').html(data.juin_envoie_client_rt);
                         $('.et_env_c_rt:eq(2)').html(data.septembre_envoie_client_rt);
                         $('.et_env_c_rt:eq(3)').html(data.decembre_envoie_client_rt);

                         $('.et_env_c:eq(0)').html(data.mars_envoie_client_et);
                        $('.et_env_c:eq(1)').html(data.juin_envoie_client_et);
                        $('.et_env_c:eq(2)').html(data.septembre_envoie_client_et);
                        $('.et_env_c:eq(3)').html(data.decembre_envoie_client_et);


                        $('.et_dtv_c_rt:eq(0)').html(data.mars_dtv_rt);
                        $('.et_dtv_c_rt:eq(1)').html(data.juin_dtv_rt);
                        $('.et_dtv_c_rt:eq(2)').html(data.septembre_dtv_rt);
                        $('.et_dtv_c_rt:eq(3)').html(data.decembre_dtv_rt);

                        $('.et_dtvet_c:eq(0)').html(data.mars_dtv_et);
                       $('.et_dtvet_c:eq(1)').html(data.juin_dtv_et);
                       $('.et_dtvet_c:eq(2)').html(data.septembre_dtv_et);
                       $('.et_dtvet_c:eq(3)').html(data.decembre_dtv_et);


                       $('.et_dtl_c_rt:eq(0)').html(data.mars_dtl_rt);
                       $('.et_dtl_c_rt:eq(1)').html(data.juin_dtl_rt);
                       $('.et_dtl_c_rt:eq(2)').html(data.septembre_dtl_rt);
                       $('.et_dtl_c_rt:eq(3)').html(data.decembre_dtl_rt);

                       $('.et_dtlet_c:eq(0)').html(data.mars_dtl_et);
                      $('.et_dtlet_c:eq(1)').html(data.juin_dtl_et);
                      $('.et_dtlet_c:eq(2)').html(data.septembre_dtl_et);
                      $('.et_dtlet_c:eq(3)').html(data.decembre_dtl_et);

                        

                         
                    $('.rt_reprmoins:eq(0)').html(parseInt(data.total_RT) - parseInt($('.sdmars:eq(0)').html()));
                    $('.rt_reprmoins:eq(1)').html(parseInt(data.total_RT) - parseInt($('.sdjuin:eq(0)').html()));
                    $('.rt_reprmoins:eq(2)').html(parseInt(data.total_RT) - parseInt($('.sdsept:eq(0)').html()));
                    $('.rt_reprmoins:eq(3)').html(parseInt(data.total_RT) - parseInt($('.sddec:eq(0)').html()));
                
                                      
                    $('.restfzt:eq(0)').html(parseInt(data.total_ET) - parseInt($('.tmars:eq(0)').html()));
                    $('.restfzt:eq(1)').html(parseInt(data.total_ET) - parseInt($('.tjuiin:eq(0)').html()));
                    $('.restfzt:eq(2)').html(parseInt(data.total_ET) - parseInt($('.tsept:eq(0)').html()));
                    $('.restfzt:eq(3)').html(parseInt(data.total_ET) - parseInt($('.tdece:eq(0)').html()));

                    
                    if(data.total_RT > 0){ 
                        $('.rt_resul:eq(0)').html(((parseInt($('.sdmars').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");
                        $('.rt_resul:eq(1)').html(((parseInt($('.sdjuin').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");
                        $('.rt_resul:eq(2)').html(((parseInt($('.sdsept').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");
                        $('.rt_resul:eq(3)').html(((parseInt($('.sddec').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");

                        $('.faitkpr:eq(0)').html(((parseInt($('.prrt_faik:eq(0)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");
                        $('.faitkpr:eq(1)').html(((parseInt($('.prrt_faik:eq(1)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");
                        $('.faitkpr:eq(2)').html(((parseInt($('.prrt_faik:eq(2)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");
                        $('.faitkpr:eq(3)').html(((parseInt($('.prrt_faik:eq(3)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%");


                        $('.pret_env_c_rt:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.et_env_c_rt:eq(0)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_env_c_rt:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_env_c_rt:eq(1)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_env_c_rt:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_env_c_rt:eq(2)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_env_c_rt:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_env_c_rt:eq(3)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");     

                        $('.pret_dtv_c_rt:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.et_dtv_c_rt:eq(0)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_dtv_c_rt:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtv_c_rt:eq(1)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_dtv_c_rt:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtv_c_rt:eq(2)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_dtv_c_rt:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtv_c_rt:eq(3)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");     


                        $('.pret_dtl_c_rt:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.et_dtl_c_rt:eq(0)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_dtl_c_rt:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtl_c_rt:eq(1)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_dtl_c_rt:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtl_c_rt:eq(2)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");
                        $('.pret_dtl_c_rt:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtl_c_rt:eq(3)').html()) * 100) / parseInt(data.total_RT)).toFixed(2) + "%</b>");     
                        


                    }
                    if(data.total_ET > 0){
                        $('.pourcetf:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.tmars').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pourcetf:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.tjuiin').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pourcetf:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.tsept').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pourcetf:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.tdece').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");                    
                        
                        $('.tfakpr:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.tfak:eq(0)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.tfakpr:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.tfak:eq(1)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.tfakpr:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.tfak:eq(2)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.tfakpr:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.tfak:eq(3)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");     

                        $('.pret_env_c:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.et_env_c:eq(0)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_env_c:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_env_c:eq(1)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_env_c:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_env_c:eq(2)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_env_c:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_env_c:eq(3)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");     
                        
                        $('.pret_dtvet_c:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.et_dtvet_c:eq(0)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_dtvet_c:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtvet_c:eq(1)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_dtvet_c:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtvet_c:eq(2)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_dtvet_c:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtvet_c:eq(3)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");     

                        $('.pret_dtlet_c:eq(0)').html( "<b style='color:#e0afaf'>" + ((parseInt($('.et_dtlet_c:eq(0)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_dtlet_c:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtlet_c:eq(1)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_dtlet_c:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtlet_c:eq(2)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");
                        $('.pret_dtlet_c:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt($('.et_dtlet_c:eq(3)').html()) * 100) / parseInt(data.total_ET)).toFixed(2) + "%</b>");     

                        
                    }
                },
            });
        }

        function rm(){
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:"dt_tva_clik",
                    idequipe: idequipe,
                    tvareg:"RM",
                    exercice_v:$('#anneeselect').val(),

                },
                success: function(data) {
                  $('.e_m_m').html(data.length);
                },
            });
        }

        function em(){
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'dt_tva_clik',
                    idequipe: idequipe,
                    tvareg:"EM",
                    exercice_v:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.r_m_m').html(data.length);              
                },
            });

            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'click_recupere_rm_etm',
                    idequipe: idequipe,
                    exercice_v:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.prenvclitrm,.envclitrm,.prvdclientclitrm,.vdclientclitrm,.rmtramnss,.prrmtramnss').html(0);
                    $('.envclitems,.vdclientclitems,.rmtramnssems,.prrmtramnssems,.prvdclientclitems,.prenvclitems').html(0);
                    for(var z = 0; z < 12; z++){
                        $('.fe_m_m:eq('+ z + ')').html(data.rm[z]["rmF"]);
                        $('.ftrmk:eq('+ z + ')').html(data.rm[z]["rm"]);

                        $('.fr_m_m:eq('+ z + ')').html(data.em[z]["emF"]);
                        $('.nbfaitk:eq('+ z + ')').html(data.em[z]["em"]);
                    }

                    //--------------------RM---------------------------------
                    $('.envclitrm:eq(0)').html(data.sum_envoi_client_janvier);
                    $('.envclitrm:eq(1)').html(data.sum_envoi_client_fevrier);
                    $('.envclitrm:eq(2)').html(data.sum_envoi_client_mars);
                    $('.envclitrm:eq(3)').html(data.sum_envoi_client_avril);
                    $('.envclitrm:eq(4)').html(data.sum_envoi_client_mais);
                    $('.envclitrm:eq(5)').html(data.sum_envoi_client_juin);
                    $('.envclitrm:eq(6)').html(data.sum_envoi_client_juillet);
                    $('.envclitrm:eq(7)').html(data.sum_envoi_client_aout);
                    $('.envclitrm:eq(8)').html(data.sum_envoi_client_septembre);
                    $('.envclitrm:eq(9)').html(data.sum_envoi_client_octobre);
                    $('.envclitrm:eq(10)').html(data.sum_envoi_client_novembre);
                    $('.envclitrm:eq(11)').html(data.sum_envoi_client_decembre);


                    $('.vdclientclitrm:eq(0)').html(data.sum_valide_client_janvier);
                    $('.vdclientclitrm:eq(1)').html(data.sum_valide_client_fevrier);
                    $('.vdclientclitrm:eq(2)').html(data.sum_valide_client_mars);
                    $('.vdclientclitrm:eq(3)').html(data.sum_valide_client_avril);
                    $('.vdclientclitrm:eq(4)').html(data.sum_valide_client_mais);
                    $('.vdclientclitrm:eq(5)').html(data.sum_valide_client_juin);
                    $('.vdclientclitrm:eq(6)').html(data.sum_valide_client_juillet);
                    $('.vdclientclitrm:eq(7)').html(data.sum_valide_client_aout);
                    $('.vdclientclitrm:eq(8)').html(data.sum_valide_client_septembre);
                    $('.vdclientclitrm:eq(9)').html(data.sum_valide_client_octobre);
                    $('.vdclientclitrm:eq(10)').html(data.sum_valide_client_novembre);
                    $('.vdclientclitrm:eq(11)').html(data.sum_valide_client_decembre);

                    $('.rmtramnss:eq(0)').html(data.sum_transm_janvier);
                    $('.rmtramnss:eq(1)').html(data.sum_transm_fevrier);
                    $('.rmtramnss:eq(2)').html(data.sum_transm_mars);
                    $('.rmtramnss:eq(3)').html(data.sum_transm_avril);
                    $('.rmtramnss:eq(4)').html(data.sum_transm_mais);
                    $('.rmtramnss:eq(5)').html(data.sum_transm_juin);
                    $('.rmtramnss:eq(6)').html(data.sum_transm_juillet);
                    $('.rmtramnss:eq(7)').html(data.sum_transm_aout);
                    $('.rmtramnss:eq(8)').html(data.sum_transm_septembre);
                    $('.rmtramnss:eq(9)').html(data.sum_transm_octobre);
                    $('.rmtramnss:eq(10)').html(data.sum_transm_novembre);
                    $('.rmtramnss:eq(11)').html(data.sum_transm_decembre);

                    //--------------------EM---------------------------------

                    $('.envclitems:eq(0)').html(data.sum_envoi_client_janvier_et);
                    $('.envclitems:eq(1)').html(data.sum_envoi_client_fevrier_et);
                    $('.envclitems:eq(2)').html(data.sum_envoi_client_mars_et);
                    $('.envclitems:eq(3)').html(data.sum_envoi_client_avril_et);
                    $('.envclitems:eq(4)').html(data.sum_envoi_client_mais_et);
                    $('.envclitems:eq(5)').html(data.sum_envoi_client_juin_et);
                    $('.envclitems:eq(6)').html(data.sum_envoi_client_juillet_et);
                    $('.envclitems:eq(7)').html(data.sum_envoi_client_aout_et);
                    $('.envclitems:eq(8)').html(data.sum_envoi_client_septembre_et);
                    $('.envclitems:eq(9)').html(data.sum_envoi_client_octobre_et);
                    $('.envclitems:eq(10)').html(data.sum_envoi_client_novembre_et);
                    $('.envclitems:eq(11)').html(data.sum_envoi_client_decembre_et);


                    $('.vdclientclitems:eq(0)').html(data.sum_valide_client_janvier_et);
                    $('.vdclientclitems:eq(1)').html(data.sum_valide_client_fevrier_et);
                    $('.vdclientclitems:eq(2)').html(data.sum_valide_client_mars_et);
                    $('.vdclientclitems:eq(3)').html(data.sum_valide_client_avril_et);
                    $('.vdclientclitems:eq(4)').html(data.sum_valide_client_mais_et);
                    $('.vdclientclitems:eq(5)').html(data.sum_valide_client_juin_et);
                    $('.vdclientclitems:eq(6)').html(data.sum_valide_client_juillet_et);
                    $('.vdclientclitems:eq(7)').html(data.sum_valide_client_aout_et);
                    $('.vdclientclitems:eq(8)').html(data.sum_valide_client_septembre_et);
                    $('.vdclientclitems:eq(9)').html(data.sum_valide_client_octobre_et);
                    $('.vdclientclitems:eq(10)').html(data.sum_valide_client_novembre_et);
                    $('.vdclientclitems:eq(11)').html(data.sum_valide_client_decembre_et);

                    $('.rmtramnssems:eq(0)').html(data.sum_transm_janvier_et);
                    $('.rmtramnssems:eq(1)').html(data.sum_transm_fevrier_et);
                    $('.rmtramnssems:eq(2)').html(data.sum_transm_mars_et);
                    $('.rmtramnssems:eq(3)').html(data.sum_transm_avril_et);
                    $('.rmtramnssems:eq(4)').html(data.sum_transm_mais_et);
                    $('.rmtramnssems:eq(5)').html(data.sum_transm_juin_et);
                    $('.rmtramnssems:eq(6)').html(data.sum_transm_juillet_et);
                    $('.rmtramnssems:eq(7)').html(data.sum_transm_aout_et);
                    $('.rmtramnssems:eq(8)').html(data.sum_transm_septembre_et);
                    $('.rmtramnssems:eq(9)').html(data.sum_transm_octobre_et);
                    $('.rmtramnssems:eq(10)').html(data.sum_transm_novembre_et);
                    $('.rmtramnssems:eq(11)').html(data.sum_transm_decembre_et);                 




                    var i = 0;
                    $('.moinfe_m_m').each(function(){
                        $(this).html( parseInt($('.e_m_m:eq(0)').html()) - parseInt(data.rm[i]["rmF"]));
                        if(parseInt($('.e_m_m:eq(0)').html()) > 0) $('.rst_m_m:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt(data.rm[i]["rmF"]) * 100) / parseInt($('.e_m_m:eq(0)').html())).toFixed(2) + "%</b>");
                        if(parseInt($('.e_m_m:eq(0)').html()) > 0) $('.prftrmk:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt(data.rm[i]["rm"]) * 100) / parseInt($('.e_m_m:eq(0)').html())).toFixed(2) + "%</b>");

                        if(parseInt($('.e_m_m:eq(0)').html()) > 0) $('.prenvclitrm:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt( $('.envclitrm:eq('+i+')').html()) * 100) / parseInt($('.e_m_m:eq(0)').html())).toFixed(2) + "%</b>");
                        if(parseInt($('.e_m_m:eq(0)').html()) > 0) $('.prvdclientclitrm:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt( $('.vdclientclitrm:eq('+i+')').html()) * 100) / parseInt($('.e_m_m:eq(0)').html())).toFixed(2) + "%</b>");
                        if(parseInt($('.e_m_m:eq(0)').html()) > 0) $('.prrmtramnss:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt( $('.rmtramnss:eq('+i+')').html()) * 100) / parseInt($('.e_m_m:eq(0)').html())).toFixed(2) + "%</b>");
                        
                        //--------------------------x---------------------------------------------------
                        $('.moifr_m_m:eq('+i+')').html( parseInt($('.r_m_m:eq(0)').html()) - parseInt(data.em[i]["emF"]));
                        if(parseInt($('.r_m_m:eq(0)').html()) > 0) $('.pmoifr_m_m:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt(data.em[i]["emF"]) * 100) / parseInt($('.r_m_m:eq(0)').html())).toFixed(2) + "%</b>");
                        //$('.moifr_m_m:eq('+i+')').html( parseInt($('.r_m_m:eq(0)').html()) - parseInt($().em[i]["em"]));
                        if(parseInt($('.r_m_m:eq(0)').html()) > 0) $('.prnbfaitk:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt(data.em[i]["em"]) * 100) / parseInt($('.r_m_m:eq(0)').html())).toFixed(2) + "%</b>");


                        if(parseInt($('.r_m_m:eq(0)').html()) > 0) $('.prenvclitems:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt( $('.envclitems:eq('+i+')').html()) * 100) / parseInt($('.r_m_m:eq(0)').html())).toFixed(2) + "%</b>");
                        if(parseInt($('.r_m_m:eq(0)').html()) > 0) $('.prvdclientclitems:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt( $('.vdclientclitems:eq('+i+')').html()) * 100) / parseInt($('.r_m_m:eq(0)').html())).toFixed(2) + "%</b>");
                        if(parseInt($('.r_m_m:eq(0)').html()) > 0) $('.prrmtramnssems:eq('+i+')').html("<b style='color:#fb785a'>" + ((parseInt( $('.rmtramnssems:eq('+i+')').html()) * 100) / parseInt($('.r_m_m:eq(0)').html())).toFixed(2) + "%</b>");

                        i++;
                    })


                },
            });
        }
            
        function ca12(){
            $('.acttotal,.faitacttotal,.faitacttotal,.envlclt_,.restfatit,.prrestfait,.prenvlclt_').html(0);
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'valeurca12',
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.acttotal').html(data.total)
                    $('.faitacttotal:eq(0)').html(data.dt_acpt_1);
                    $('.faitacttotal:eq(1)').html(data.dt_acpt_2);

                    $('.envlclt_:eq(0)').html(data.dt_envoie_client_dt_acpt_1);
                    $('.envlclt_:eq(1)').html(data.dt_envoie_client_dt_acpt_2);

                    $('.restfatit:eq(0)').html(parseInt(data.total) - parseInt(data.dt_acpt_1));
                    $('.restfatit:eq(1)').html(parseInt(data.total) - parseInt(data.dt_acpt_2));

                    $('.dtvliclient:eq(0)').html(data.dt_validation_client_1);
                    $('.dtvliclient:eq(1)').html(data.dt_validation_client_2);

                    $('.dttrms_:eq(0)').html(data.dt_date_teletransmission_1);
                    $('.dttrms_:eq(1)').html(data.dt_date_teletransmission_2);

                    $('.dtvledi:eq(0)').html(data.dt_validation_edi_1);
                    $('.dtvledi:eq(1)').html(data.dt_validation_edi_2);
                    


                    $('.prrestfait').html("<b style='color:#e0afaf'>0%</b>");

                    $('.prrestfait:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_acpt_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prrestfait:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_acpt_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");

                    $('.prenvlclt_:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_envoie_client_dt_acpt_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prenvlclt_:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_envoie_client_dt_acpt_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");

                    $('.prdtvliclient:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_validation_client_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prdtvliclient:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_validation_client_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");

                    $('.prdttrms_:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_date_teletransmission_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prdttrms_:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_date_teletransmission_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");

                    $('.prdtvledi:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_validation_edi_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prdtvledi:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_validation_edi_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                },
            });
        }


        function cvae(){
            $('.fns0,.cfe0,.faitacttotal,.envlclt_,.restfatit,.prrestfait,.prenvlclt_'
            ,'.fns1','.fns2','.fns3','.fns4','.fns5','.fns6','.fns7','.fns8','.fns9','.fns10','.fns11').html(0);
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'valeurcvae',
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.fns0,.cfe0').html(data.total)
                    $('.fns1:eq(0)').html(data.dt_acpt_1);
                    $('.fns1:eq(1)').html(data.dt_acpt_2);

                    $('.fns2:eq(0)').html(data.total - data.dt_acpt_1);
                    $('.fns2:eq(1)').html(data.total - data.dt_acpt_2);
                    
                    $('.fns3:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_acpt_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.fns3:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_acpt_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");

                    $('.fns4:eq(0)').html(data.dt_envoie_client_dt_acpt_1);
                    $('.fns4:eq(1)').html(data.dt_envoie_client_dt_acpt_2);
                    $('.fns5:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_envoie_client_dt_acpt_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.fns5:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_envoie_client_dt_acpt_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                    

                    $('.fns6:eq(0)').html(data.dt_validation_client_1);
                    $('.fns6:eq(1)').html(data.dt_validation_client_2);

                    $('.fns7:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_validation_client_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.fns7:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_validation_client_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                    

                    $('.fns8:eq(0)').html(data.dt_date_teletransmission_1);
                    $('.fns8:eq(1)').html(data.dt_date_teletransmission_2);

                    $('.fns9:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_date_teletransmission_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.fns9:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_date_teletransmission_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                    

                    $('.fns10:eq(0)').html(data.dt_validation_edi_1);
                    $('.fns10:eq(1)').html(data.dt_validation_edi_2);

                    $('.fns11:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_validation_edi_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.fns11:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_validation_edi_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                    
                },
            });
        }

        function cfe(){
            $('.cfe1','.cfe2','.cfe3','.cfe4','.cfe5','.cfe6','.cfe7','.cfe8','.cfe9','.cfe10','.cfe11').html(0);
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'valeurcfe',
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.cfe1:eq(0)').html(data.dt_acpt_1);
                    $('.cfe1:eq(1)').html(data.dt_acpt_2);

                    $('.cfe2:eq(0)').html(data.total - data.dt_acpt_1);
                    $('.cfe2:eq(1)').html(data.total - data.dt_acpt_2);
                    
                    $('.cfe3:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_acpt_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.cfe3:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_acpt_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");

                    $('.cfe4:eq(0)').html(data.dt_envoie_client_dt_acpt_1);
                    $('.cfe4:eq(1)').html(data.dt_envoie_client_dt_acpt_2);
                    $('.cfe5:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_envoie_client_dt_acpt_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.cfe5:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_envoie_client_dt_acpt_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                    

                    $('.cfe6:eq(0)').html(data.dt_validation_client_1);
                    $('.cfe6:eq(1)').html(data.dt_validation_client_2);

                    $('.cfe7:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_validation_client_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.cfe7:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_validation_client_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                    

                    $('.cfe8:eq(0)').html(data.dt_date_teletransmission_1);
                    $('.cfe8:eq(1)').html(data.dt_date_teletransmission_2);

                    $('.cfe9:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_date_teletransmission_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.cfe9:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_date_teletransmission_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                    

                    $('.cfe10:eq(0)').html(data.dt_validation_edi_1);
                    $('.cfe10:eq(1)').html(data.dt_validation_edi_2);

                    $('.cfe11:eq(0)').html("<b style='color:#e0afaf'>" + ((parseInt(data.dt_validation_edi_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.cfe11:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_validation_edi_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");                   
                },
            });
        }

        function acompteIs(){
            $('.fft,.rstfft,.prsft,.lqdttl').html(0)
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'acompteIs',
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.ttis').html(data.total)
                    $('.fft:eq(0)').html(data.dt_acpt_1);
                    $('.fft:eq(1)').html(data.dt_acpt_2);
                    $('.fft:eq(2)').html(data.dt_acpt_3);
                    $('.fft:eq(3)').html(data.dt_acpt_4);

                    $('.rstfft:eq(0)').html(parseInt(data.total) - parseInt(data.dt_acpt_1));
                    $('.rstfft:eq(1)').html(parseInt(data.total) -parseInt(data.dt_acpt_2));
                    $('.rstfft:eq(2)').html(parseInt(data.total) -parseInt(data.dt_acpt_3));
                    $('.rstfft:eq(3)').html(parseInt(data.total) - parseInt(data.dt_acpt_4));

                    $('.prsft:eq(0)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_acpt_1) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prsft:eq(1)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_acpt_2) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prsft:eq(2)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_acpt_3) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    $('.prsft:eq(3)').html("<b style='color:#e0afaf'>" +((parseInt(data.dt_acpt_4) * 100)  / parseInt(data.total)).toFixed(2) + " %</b>");
                    
                    //liquid total
                    $('.lqdttl').html(data.total);
                    liquidation();
                },
            });
        }

        function liquidation(){
            $('.faitliqd,.moinlsqud,.prliqudt').html(0)
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'liquidation',
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                    $('.faitliqd').html(data.v_liquidation_is)
                    $('.moinlsqud').html(parseInt($('.lqdttl').html()) - parseInt(data.v_liquidation_is));
                    var drep = Math.round(((parseInt(data.v_liquidation_is) * 100)  / parseInt($('.lqdttl').html())));
                    $('.prliqudt').html(drep + "%");
                
                },
            });
        }
        $(document).on('click', '#horsmams', function(){
            $(this).hide(200);
            $('#horsma').show(200);
            $('#bilanbody').html(recuper_bil);
            return;
        })
        $(document).on('click', '#horsma', function(){
            $(this).hide(200);
            $('#horsmams').show(200);
            recuper_bil = $('#bilanbody').html();
            $.ajax({
                url:'route.php',
                type:'POST',
                data:{
                    param:'aa_mm__ms',
                    id:idequipe,
                    exercice:$('#anneeselect').val(),
                },
                success: function(data) {
                    var numbersString = data.replace(/{"status":\[/g,"").replace(/]}/g,"");
                    var numbersArray = numbersString.split(',');
                    listcdm= "";   
                    sumrepms = 0;sumfait = 0;sumprest = 0;
                    $.each(numbersArray, function(index, value) { 
                    var numbersArray2 = value.split('#');                                                
                    sumrepms += parseInt(numbersArray2[0].replace(/"/g,"").replace(/\[/g,""))
                    sumfait += parseInt(numbersArray2[1].replace(/"/g,"") )
                    sumprest += parseInt(numbersArray2[2].replace(/"/g,""))
                    $('.repms:eq(' + index +')').html(numbersArray2[0].replace(/"/g,"").replace(/\[/g,"") );
                    $('.faitrep:eq(' + index +')').html(numbersArray2[1].replace(/"/g,"") );
                    $('.t_moins_fait:eq(' + index +')').html(numbersArray2[2].replace(/"/g,"") );
                    $('.pt_moins_fait:eq(' + index +')').html(numbersArray2[3].replace(/"/g,"").replace(/]/g,"") );
                    });    
                    $('.totalrepms').html(sumrepms);
                    $('.totalfaitrep').html(sumfait);
                    $('.totalt_moins_fait').html(sumprest);
                    $('#exportbil').show(100);
                 },
            })               
        })

        $(document).on('change', '#exo', function() {
            $('#horsmamsdt').hide(20);
            $('.janvz').html(GetLastDayOfThisMonth($(this).val(), 1) + "/" + "01/" + $(this).val());
            $('.fevz').html(GetLastDayOfThisMonth($(this).val(), 2) + "/" + "02/" + $(this).val());
            $('.marsz').html(GetLastDayOfThisMonth($(this).val(), 3) + "/" + "03/" + $(this).val());
            $('.avriz').html(GetLastDayOfThisMonth($(this).val(), 4) + "/" + "04/" + $(this).val());
            $('.maisz').html(GetLastDayOfThisMonth($(this).val(), 5) + "/" + "05/" + $(this).val());
            $('.juinz').html(GetLastDayOfThisMonth($(this).val(), 6) + "/" + "06/" + $(this).val());
            $('.juilz').html(GetLastDayOfThisMonth($(this).val(), 7) + "/" + "07/" + $(this).val());
            $('.aoutz').html(GetLastDayOfThisMonth($(this).val(), 8) + "/" + "08/" + $(this).val());
            $('.septz').html(GetLastDayOfThisMonth($(this).val(), 9) + "/" + "09/" + $(this).val());
            $('.octz').html(GetLastDayOfThisMonth($(this).val(), 10) + "/" + "10/" + $(this).val());
            $('.novz').html(GetLastDayOfThisMonth($(this).val(), 11) + "/" + "11/" + $(this).val());
            $('.decz').html(GetLastDayOfThisMonth($(this).val(), 12) + "/" + "12/" + $(this).val());    
            $('#loading').show();
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:'stat_g',
                    exercice:$(this).val(),
                },
                success: function(data) {
                    console.log(data);
                    for(var i = 0; i < 12 ; i++){
                        $('.bilan_afaire:eq(' + i +')').html(data[i].total);
                        $('.fait:eq(' + i +')').html(data[i].fait);
                        $('.afairemoisfait:eq(' + i +')').html(data[i].restant);
                        $('.pourcentagefait:eq(' + i +')').html(data[i].pourcentage);

                        $('.afaire_trans:eq(' + i +')').html(data[i].trans_afaire);
                        $('.fait_trans:eq(' + i +')').html(data[i].trans_fait);
                        $('.afairemoisfait_trans:eq(' + i +')').html(data[i].trans_restant);
                        $('.pourcentagefait_trans:eq(' + i +')').html(data[i].trans_pourcentage);        
                        

                        $('.afaire_vedi:eq(' + i +')').html(data[i].v_edi_afaire);
                        $('.fait_vedi:eq(' + i +')').html(data[i].v_edi_fait);
                        $('.afairemoisfait_vedi:eq(' + i +')').html(data[i].v_edi_restant);
                        $('.pourcentagefait_vedi:eq(' + i +')').html(data[i].t_edi_pourcentage);  


                        $('.afaire_com_client:eq(' + i +')').html(data[i].total);
                        $('.fait_com_client:eq(' + i +')').html(data[i].com_cl_fait);
                        $('.afairemoisfait_com_client:eq(' + i +')').html(data[i].com_cl_restant);
                        $('.pourcentagefait_com_client:eq(' + i +')').html(data[i].com_cl_pourcentage);  
                        
                        
                        $('.afaire_v_client_s:eq(' + i +')').html(data[i].v_cli_fr_afaire);
                        $('.fait_v_client_s:eq(' + i +')').html(data[i].v_cli_fr_fait);
                        $('.afairemoisfait_v_client_s:eq(' + i +')').html(data[i].v_cli_fr_restant);
                        $('.pourcentagefait_v_client_s:eq(' + i +')').html(data[i].v_cli_fr_pourcentage); 
                        
                        

                    }
                    $('#loading').hide();
                    $('#horsmamsdt').show(20);
                    $('#horsmamsdet').hide();
                    $('.exports').show(20);
                    
                },
            }) 
        })

        $(document).on('change', '#exovfr', function() {
            $('#option_fr').val("");
            $('#option_fr').change();
            for(var i = 0; i < $('.mois_vfr').length; i++){
                if(i > 8 ){
                    $('.mois_vfr:eq('+i+')').html(GetLastDayOfThisMonth($(this).val(), (i+1)) + "/" + (i + 1) + "/" + $(this).val());
                }else{
                    $('.mois_vfr:eq('+i+')').html(GetLastDayOfThisMonth($(this).val(), (i+1)) + "/0" + (i+1) + "/" + $(this).val());
                }
            }
        })

        $(document).on('change', '#option_fr', function() {
            $('#horsmamsdt').hide(20);
            $('#bl_option').html($(this).val());
            
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:'stat_g_fr',
                    exercice:$('#exovfr').val(),
                },
                success: function(data) {
                    console.log(data);
                    for(var i = 0; i < 12 ; i++){
                        $('.mois_vfr_faire:eq(' + i +')').html(data[i].total);
                        $('.mois_vfr_faire_fait:eq(' + i +')').html(data[i].fait);
                        $('.mois_vfr_restant:eq(' + i +')').html(data[i].restant);
                        //$('.mois_vfr_faire_pourcent:eq(' + i +')').html(data[i].pourcentage);
                    }
                        
                },
            })               
 
        })
        
        

        $(document).on('click','#horsmamsdt',function(){
            $(this).hide(10);
            $('#horsmamsdet').show(10);
            recupertabl_g = $("#statG").html();
            $('#loading').show();
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType: 'json',
                data:{
                    param:'stat_g_avec_ms',
                    exercice:$("#exo").val(),
                },
                success: function(data) {
                    for(var i = 0; i < 12 ; i++){
                        $('.bilan_afaire:eq(' + i +')').html(data[i].total);
                        $('.fait:eq(' + i +')').html(data[i].fait);
                        $('.afairemoisfait:eq(' + i +')').html(data[i].restant);
                        $('.pourcentagefait:eq(' + i +')').html(data[i].pourcentage);
                    }
                    $('#loading').hide();              
                },
            }) 
        })
        
        $(document).on('click','#horsmamsdet',function(){
            $(this).hide(10);
            $('#horsmamsdt').show(10);
            $("#statG").html(recupertabl_g);
        })

        $(document).on('change', '#listpaysselect', function() {
            $('#aneselect,#moisblc').val("");
            $('#listptt').html("");
            initalise();
            var select = "";
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'selectsup',
                    valeur_id: $(this).val(),
                },
                success: function(data) {
                    for(var i = 0; i< data.length; i++)
                    {
                        var id = data[i].id;
                        var nom = data[i].nom;
                        select += "<option value='" + id + "'>"+ nom +"</option>";
                    }
                    $('#sup').html( " Superviseur : <select id='supselect'><option value='0'></option>"+ select +"</select>")
                },
            });
        })   
        
        $(document).on('change', '#listpaysselect', function() {
            $('#aneselect').val("");
            $('#listptt').html("");
            initalise();
            var select = "";
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'selectsup',
                    valeur_id: $(this).val(),
                },
                success: function(data) {
                    for(var i = 0; i< data.length; i++)
                    {
                        var id = data[i].id;
                        var nom = data[i].nom;
                        select += "<option value='" + id + "'>"+ nom +"</option>";
                    }
                    $('#sup').html( " Superviseur : <select id='supselect'><option value='0'></option>"+ select +"</select>")
                },
            });
        })

        $(document).on('change', '#listpaysselectblc', function() {
            $('#aneselectblc').val("");
            $('#listpttblc').html("");
            initalise();
            var select = "";
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'selectsup',
                    valeur_id: $(this).val(),
                },
                success: function(data) {
                    for(var i = 0; i< data.length; i++)
                    {
                        var id = data[i].id;
                        var nom = data[i].nom;
                        select += "<option value='" + id + "'>"+ nom +"</option>";
                    }
                    $('#supbc').html( " Superviseur : <select id='supselectbcl'><option value='0'></option>"+ select +"</select>")
                },
            });
        })        

        function initalise(){
            $('#tablesup .moisstg').html("-");
            $('#tablesup .bilan_afaire').html("-");
            $('#tablesup .fait').html("-");
            $('#tablesup .afairemoisfait').html("-");
            $('#tablesup .pourcentagefait').html("-");
        }
        $('#loading4').hide();
        $('#loading_d').hide();
        $(document).on('change', '#supselect', function() {
            $('#aneselect').val("");
            initalise();
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param:'selectsonportfeuil',
                    id: $(this).val(),
                },
                success: function(data) {
                    try {
                        Allportfeuil = data[0].sonportfeuilles;
                        var portfeuil = Allportfeuil.split('#');
                        var listequi = "";                    
                        $.each(portfeuil, function(index) {
                            listequi += "<tr><td class='nomE text-center'>" + portfeuil[index] + "</td></tr>";
                        });
                        $('#listptt').html("<div style='position:relative;overflow:scroll;height:320px'><table border='1' width='100%'>" + listequi + "</table></div>");                        
                    } catch (error) {
                        
                    }
                   
                },
            });
        })

        $(document).on('change', '#supselectbcl', function() {
            $('#aneselectblc').val("");
            initalise();
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param:'selectsonportfeuil',
                    id: $(this).val(),
                },
                success: function(data) {
                    try {
                        Allportfeuil = data[0].sonportfeuilles;
                        var portfeuil = Allportfeuil.split('#');
                        var listequi = "";    
                        var corps = "";                
                        $.each(portfeuil, function(index) {
                            if(portfeuil[index] != ""){
                                listequi += "<th class='nomE text-center'>" + portfeuil[index] + "</th>";
                                corps += "<td></td>"
                            }
                        });
                       var tbody = "<tr><td>TOTAL DOSSIER ACTIF</td>" + corps + "<td></tr>" +
                        "<tr><td>TOTAL DOSSIER</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL TVA TRIM</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL TVA MENS</td>"+ corps + "</tr>"+
                        "<tr><td>NOMBRE DOSSIER A DEPOSER PIECES</td>"+ corps + "</tr>"+
                        "<tr><td>NOMBRE DOSSIER A DEPOSER PIECES (TVA FAIT)</td>"+ corps + "</tr>"+
                        "<tr><td>NOMBRE DOSSIER A DEPOSER PIECES (TVA NON FAISABLE)</td>"+ corps + "</tr>"+
                        "<tr><td>NOMBRE DOSSIER QUI N'A PAS DEPOSER PIECES</td>"+ corps + "</tr>"+
                        "<tr><td>TVA MENS BILAN NON FAISABLE</td>"+ corps + "</tr>"+
                        "<tr><td>GROS DOSSIER</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL BILAN FAIT</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL DR FAISABLE</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL DOSSIER COMPLET RB</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL DOSSIER COMPLET RB EN ATTENTE RETOUR PES</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL DOSSIER COMPLET RB PAS DE PES</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL DOSSIER INCOMPLET RB EN ATTENTE RETOUR PES</td>"+ corps + "</tr>"+
                        "<tr><td>TOTAL DOSSIER PAS DE PIECES</td>"+ corps + "</tr>";

                        $('#tablesupblc').html("<thead><th></th>"+listequi+"<th style='background:yellow'>TOTAL</th></thead><tbody>"+tbody+"</tbody>");                        
                    } catch (error) {
                        
                    }
                   
                },
            });
        })

        $(document).on('change', '#aneselect', function() {
           
            $('.janvx').html(GetLastDayOfThisMonth($(this).val(), 1) + "/" + "01/" + $(this).val());
            $('.fevx').html(GetLastDayOfThisMonth($(this).val(), 2) + "/" + "02/" + $(this).val());
            $('.marsx').html(GetLastDayOfThisMonth($(this).val(), 3) + "/" + "03/" + $(this).val());
            $('.avrix').html(GetLastDayOfThisMonth($(this).val(), 4) + "/" + "04/" + $(this).val());
            $('.maisx').html(GetLastDayOfThisMonth($(this).val(), 5) + "/" + "05/" + $(this).val());
            $('.juinx').html(GetLastDayOfThisMonth($(this).val(), 6) + "/" + "06/" + $(this).val());
            $('.juilx').html(GetLastDayOfThisMonth($(this).val(), 7) + "/" + "07/" + $(this).val());
            $('.aoutx').html(GetLastDayOfThisMonth($(this).val(), 8) + "/" + "08/" + $(this).val());
            $('.septx').html(GetLastDayOfThisMonth($(this).val(), 9) + "/" + "09/" + $(this).val());
            $('.octx').html(GetLastDayOfThisMonth($(this).val(), 10) + "/" + "10/" + $(this).val());
            $('.novx').html(GetLastDayOfThisMonth($(this).val(), 11) + "/" + "11/" + $(this).val());
            $('.decx').html(GetLastDayOfThisMonth($(this).val(), 12) + "/" + "12/" + $(this).val());  
            $('#loading4').show();
            var allpt = "";
            $('#listptt table .nomE').each(function(){
                allpt += $(this).html() + "#"
            });
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:'supstatg',
                    Allportfeuil:Allportfeuil,
                    //Allportfeuil:allpt,
                    annee:$(this).val(),
                },
                success:function(data){
                    for(var i = 0; i < 12 ; i++){
                    $('#tablesup .bilan_afaire_sup:eq(' + i + ')').html(data[i].total);
                    $('#tablesup .fait_sup:eq(' + i + ')').html(data[i].fait);
                    $('#tablesup .afairemoisfait_sup:eq(' + i + ')').html(data[i].restant);
                    $('#tablesup .pourcentagefait_sup:eq(' + i + ')').html(data[i].pourcentage);
                    }
                    $('#loading4').hide();
                },
            })
        })

        $(document).on('change', '#aneselectblc', function() {
           
            $('#listptt table .nomE').each(function(){
                allpt += $(this).html() + "#"
            });
            $.ajax({
                url:'route.php',
                type:'POST',
                dataType:'json',
                data:{
                    param:'supstatgblc',
                    Allportfeuil:Allportfeuil,
                    //Allportfeuil:allpt,
                    annee:$(this).val() + "-" + $('#moisblc').val(),
                },
                success:function(data){
                    console.log(data);
                    $('#loading_d').hide();
                },
            })
        })

        function alert_pes(){
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'alert_pes',
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                    var entete = 
                    '<table id="alertpes" class="table-bordered" cellspacing="0"><thead>'+
                    '<tr>'+
                    '<th class="th-sm" style="display:none">id</th>'+
                      '<th class="th-sm">Dossier</th>'+
                      '<th class="th-sm">Cloture</th>'+
                      '<th class="th-sm" style="display:none">PES N</th>'+
                      '<th class="th-sm">DERNIER PES</th>'+
                      '<th class="th-sm">DERNIER RELANCE</th>'+
                      '<th class="th-sm">RETOUR</th>'+
                      '<th class="th-sm">DATE DEPOT DERNIER KEOBIZ</th>'+
                      '<th class="th-sm">NOTIFICATION</th>'+
                      '<th class="th-sm" style="display:none">NOTIFICATION</th>'+
                      '<th class="th-sm">VOIR</th>'+
                      '</tr>'+
                  '</thead>'+
                  '<tbody>';
                    var select_list = "<option value=''></option><option value='OK'>OK</option><option value='A traiter'>A traiter</option><option value='A Relancer'>A Relancer</option>"
                    var tr = "";
                    for(var i = 0; i< data.length; i++)
                    {
                      tr +=   "<tr class='alrt_ps'>" +
                        "<td style='display:none' class='id_stion'>"+ data[i].id +"</td>"+
                        "<td style='color:#549650;cursor:pointer' class='nomdossier_s'><i class='fas fa-folder'></i> "+ data[i].nom +"</td>"+
                        "<td class='n_cloture'>"+ data[i].date_cloturation +"</td>"+
                        "<td style='display:none'>"+ data[i].pes_num +"</td>"+
                        "<td>"+ data[i].date_pes +"</td>"+
                        "<td>"+ data[i].date_relance +"</td>"+
                        "<td>"+ data[i].date_retour +"</td>"+
                        "<td>"+ data[i].date_de_depot_dernier_keobiz +"</td>"+
                        "<td style='display:none'>"+ data[i].notification +"</td>"+
                        "<td class='select_notif'><select style='font-size:16px'><option value='"+data[i].notification+"'>"+ data[i].notification + "</option>" + select_list + "</select></td>"+
                        "<td class='n_doss text-center' data-toggle='modal' data-target='#datailpes' data-backdrop='static' data-keyboard='false'><i class='fas fa-eye'></i></td>";
                        "</tr>";
                    }
                    $('#dttable_alert').html(entete + 
                        tr.replace(/null/g,"-").replace(/<td>OK<\/td>/g, "<td style='color:green'>OK</td>")
                        .replace(/<td>A relance<\/td>/g, "<td style='color:red'>A relance</td>")
                        .replace(/<td>En attente<\/td>/g, "<td style='color:blue'>En attente</td>")
                        .replace(/0000-00-00/g, "")
                         + "</tbody></table>");
      
                    $('#alertpes thead tr').clone(true).appendTo( '#alertpes thead' );
                    $('#alertpes thead tr:eq(1) th').each( function (i) {
                        $(this).html("");
                        if(i == 1 ){$(this).html("<input type='text' class='stsearch'>");}
                        if(i == 8 ){$(this).html("<select class='stsearch'>"+select_list+"</select>");}
                        $( '.txtserach,.stsearch', this ).on( 'keyup change', function () {
                            if ( table.column(i).search() !== this.value ) {
                                table
                                    .column(i)
                                    .search( this.value )
                                    .draw();
                            }
                        });
                    } );
                    
                    
                            var table = $('#alertpes').DataTable({
                                orderCellsTop: true,
                                scrollY:        screen.height / 2.5,
                                deferRender:    true,
                                scroller:       true,
                                filter: true,
                                "paging": false
                            });
                    
                            $('.dataTables_length').addClass('bs-select');
                   
                },
            });
        }
    
        $(document).on('click', '.n_doss', function() {
            var nomdossier = $(this).closest('tr').find('.nomdossier_s').html();
            var date_cloture = $(this).closest('tr').find('.n_cloture').html();
            $('.nomdossierclick').html(nomdossier);
            $.ajax({
                url: "route.php",
                type: 'POST',
                data: {
                    param: 'detail_pes',
                    nomdossier: nomdossier.replace('<i class="fas fa-folder"></i> ',''),
                    date_cloture: date_cloture,
                },
                success: function(data) {
                    $('#detail___bil').html(data);
                },
            });
        })

    
        function elementbloquant(){
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'elementbloquant',
                    id: idequipe,
                    annee:$('#anneeselect').val(),
                },
                success: function(data) {
                   var entete = 
                    '<table id="elementbloquant" class="table-bordered" cellspacing="0" width="100%"><thead>'+
                    '<tr>'+
                      '<th class="th-sm">Dossier</th>'+
                      '<th class="th-sm">Sit</th>'+
                      '<th class="th-sm">Cloture</th>'+
                      '<th class="th-sm">Etat Bilan</th>'+
                      '<th class="th-sm">Date envoie bilan</th>'+
                      '<th class="th-sm">Regime Tva</th>'+
                      '<th class="th-sm">Activité</th>'+
                      '<th class="th-sm">Releve</th>'+
                      '<th class="th-sm">Achat</th>'+
                      '<th class="th-sm">Vente</th>'+
                      '<th class="th-sm">Commentaire releve</th>'+
                      '<th class="th-sm">Commentaire et autre</th>'+
                      '<th class="th-sm">Commentaire</th>'+
                      '<th class="th-sm">CDM</th>'+
                      
                      '</tr>'+
                  '</thead>'+
                  '<tbody>';
    
                    var tr = "";
                    for(var i = 0; i< data.length; i++)
                    {
                        var stylecolor = "red";
                        if( data[i].types == "BANQUE COMPLET"){stylecolor = "green";}
                      tr +=   "<tr class='elm_blq'>" +
                        "<td><i class='fas fa-folder'></i> "+ data[i].dossier +"</td>"+
                        "<td>"+ data[i].sit_dossier +"</td>"+
                        "<td>"+ data[i].cloture +"</td>"+
                        "<td>"+ data[i].etat_bl +"</td>"+
                        "<td>"+ data[i].dt_d_envoie_bl_krlt +"</td>"+
                        "<td>"+ data[i].regime +"</td>"+
                        "<td>"+ data[i].Activite_final +"</td>"+
                        "<td>"+  data[i].releve +"</td>"+
                        "<td>"+  data[i].achat +"</td>"+
                        "<td>"+  data[i].vente +"</td>"+
                        "<td>"+  data[i].commentaire_releve +"</td>"+
                        "<td>"+  data[i].commentaire_et_autre +"</td>"+
                        "<td>"+ data[i].commentaire_et_autre +"</td>"+
                        "<td>"+ data[i].cdm +"</td>"+
                        "</tr>";
                    }
                   $('#elm_blq').html(entete + 
                        tr.replace(/null/g,"-").replace(/<td>BANQUE COMPLET<\/td>/g, "<td style='color:green'>BANQUE COMPLET</td>")
                        .replace(/<td>EN ATTENTE<\/td>/g, "<td style='color:red'>EN ATTENTE</td>")
                        .replace(/<td>BANQUE MANQUANTE<\/td>/g, "<td style='color:blue'>BANQUE MANQUANTE</td>")
                        .replace(/00:00:00/g, "")
                        
                         + "</tbody></table>");
                   /*  $('#elementbloquant').DataTable({
                        "searching": true, // false to disable search (or any other option)
                        "scrollY": "400px",
                        "scrollCollapse": true,
                        "paging": false,
                         fixedHeader: true,
                    });
                    $('.dataTables_length').addClass('bs-select');*/



// Setup - add a text input to each footer cell
$('#elementbloquant thead tr').clone(true).appendTo( '#elementbloquant thead' );
$('#elementbloquant thead tr:eq(1) th').each( function (i) {
    var title = $(this).text();
    $(this).html( '' );
    if(i == 0){$(this).html("<input type='text' class='stsearch'>");}
    if(i == 1){$(this).html($('#sit_dossier').html());}
    if(i == 2 || i ==4 ){$(this).html("<input type='date' class='stsearch'>");}
    if(i == 3){$(this).html($('#etat_bilan').html());}
    if(i == 5){$(this).html($('#tva_regime').html());}
    if(i == 7){$(this).html("<select class='stsearch'><option value=''></option><option value='COMPLET'>COMPLET</option><option value='MANQUE'>MANQUE</option><option value='EN ATTENTE'>EN ATTENTE</option></select>");}
    if(i == 8 || i == 9){$(this).html("<select class='stsearch'><option value=''></option><option value='COMPLET'>COMPLET</option><option value='MANQUE'>MANQUE</option><option value='PARTIEL'>PARTIEL</option></select>");}
    if(i > 9 || i == 6 ){$(this).html("<input type='text' class='stsearch'>");}

            $( '.txtserach,.stsearch', this ).on( 'keyup change', function () {
                if ( table.column(i).search() !== this.value ) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
            });
        } );


        var table = $('#elementbloquant').DataTable( {
            orderCellsTop: true,
            scrollY:        screen.height / 2.5,
            scrollX:        screen.width * 3,
            deferRender:    true,
            scroller:       true,
            filter: true,
            "paging": false
        } );


                    //$('.col-md-2').hide(150);
                },
});

            
        }
        $(document).on('click','#ex1-tab-1,#ex1-tab-2,#ex1-tab-3,#ex1-tab-4,#ex1-tab-5,#ex1-tab-6',function(){
            $('.col-md-2').show(150);
        })

        $(document).on('click','#ex1-tab-7,#ex1-tab-8',function(){
            //$('.col-md-2').hide(150);
            $("#elm_blq").css({"zoom" : "80%"});
            $("#dttable_alert").css({"zoom" : "80%"});
        })

        $(document).on('click', '#statparcdm', function() {
            
            var tousles_id;
            var tousles_idfr = "";
            var tousles_rev = "";
            var sum1 =0;
            var sum2 =0;
    
            $(".id_user_mada").each(function() {
                tousles_id += +$(this).text() + "#";
            });
    
            $(".id_user_france").each(function() {
                tousles_idfr += $(this).text() + "#";
            });

            $(".id_user_rev").each(function() {
                tousles_rev += $(this).text() + "#";
            });
            
            $('#loading2').show(); 
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param: 'produser',
                    txtanne: $('#anneebilan').val() + "-" + $('#moisbilan').val(),
                    tousles_iduserkarlit: tousles_id.replace("undefined", ""),
                    tousles_iduserfrance: tousles_idfr.replace("undefined", ""),
                },
                success: function(data) {                  
                    for(var i = 0; i < data.length ; i++){
                        sum1 += parseInt(data[i].meme[0].meme);
                        sum2 += parseInt(data[i].autre[0].autre);                            
                        $('.nbf:eq(' + i +')').html(data[i].meme[0].meme);
                        $('.nbfautre:eq(' + i +')').html(data[i].autre[0].autre);                        
                    }
                    $('#feq').html(sum1);
                    $('#faueq').html(sum2);
      
                }
            })

            rev($('#anneebilan').val() + "-" + $('#moisbilan').val(),tousles_rev)
        })

        function rev(txtanne,tousles_rev){
            $('#loading2').show(); 
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param: 'produser_suit',
                    txtanne: txtanne,
                    tousles_rev:tousles_rev,
                },
                success: function(data) {
                    console.log(data);
                    for(var i = 0; i < data.length ; i++){
                        $('.nbf_rev:eq(' + i +')').html(data[i].rev[0].total_bl)
                        $('#loading2').hide();  
                    }
                }
            })
        }

        $(document).on('change','#moi_ma_ms_sns', function(){
            $("#fil_ma_ms_sns").val("");
            if($(this).val() == "Tous"){
                $("#fil_ma_ms_sns,.iann").hide(20);
                lance_m_sns("Tous");
            }else{
                $("#fil_ma_ms_sns,.iann").show(20);
                
            }
        })

        
        $(document).on('change','#fil_ma_ms_sns', function(){
            lance_m_sns($('#fil_ma_ms_sns').val() + "-" + $('#moi_ma_ms_sns').val());
        })

        $(document).on('click','.isma',function(){
            var id_equipe = $(this).closest('tr').find('.idequipse').html();
            var date_bilan = $('#fil_ma_ms_sns').val() + "-" + $('#moi_ma_ms_sns').val();
            $('#mdb_cont_wh').css('height',(screen.height) + "px");
            click_isma_and_isms(id_equipe,date_bilan,"MS");
        })

        $(document).on('click','.isms',function(){
            var id_equipe = $(this).closest('tr').find('.idequipse').html();
            var date_bilan = $('#fil_ma_ms_sns').val() + "-" + $('#moi_ma_ms_sns').val();
            $('#mdb_cont_wh').css('height',(screen.height) + "px");
            click_isma_and_isms(id_equipe,date_bilan,"MA")  ;
        })


        function click_isma_and_isms(id_equipe,date_bilan,condition){
            $('#tb_clss').html("");
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'listclick_det',
                    id_equipe: id_equipe,
                    date_bilan:date_bilan,
                    condition:condition
                },
                success: function(data) {
                    console.log(data);
                    var corp = "";
                    for(var i = 0; i< data.length ; i++){
                        corp += "<tr><td>"+data[i].code+"</td><td>"+data[i].nom+ "</td><td>"+data[i].date_cloturation+"</td><td>"+data[i].etat_bilan+"</td></tr>";
                    }
                    $('#tb_clss').html(corp);
                },
            });    
        }
     

        $('#loading5').hide();
        function lance_m_sns(cond){
            $('#sumdos').html("");
            $('#sumlb').html("")
            $('#summam').html("")
            $('#sumamas').html("")
            $('#sumsms').html("")
            $('#sumcab').html("")
            $('#sumrev').html("")
            $('#sumcrea').html("")
            $('#suvide').html("")
            $('.isactif,.istotal').html('');
            $('.isms').html('');
            $('.isma').html('');
            $('.issommeil').html('');
            $('.iscab').html('');
            $('.isrev').html('');
            $('.iscreat').html('');
            $('.isbloc').html('');
            $('.rstt').html('');
            idequipeall = "";
            $("#st_tva_mmms  .idequipse").each(function() {
                idequipeall += $(this).text() + "#";
            });
            $('#loading5').show();
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'liststattotal',
                    alllistequipe: idequipeall,
                    condition:cond,
                },
                success: function(data) {
                    var sumdos = 0; var sumlb= 0; var summam= 0;var sumamas= 0;sumblq=0;
                    var sumsms= 0;var sumcab= 0; var sumrev= 0; var sumcrea= 0; var suvide= 0;
                    $(".istotal").each(function(index) {
                        
                        var sumrest = (data[index].istotal[0].istotal) - (parseInt(data[index].isactif[0].isactif) +
                        parseInt(data[index].isma[0].isma) +
                        parseInt(data[index].isms[0].isms) +
                        parseInt(data[index].issommail[0].issommail) +
                        parseInt(data[index].iscabinet[0].iscabinet) +
                        parseInt(data[index].isrev[0].isrev) +
                        parseInt(data[index].iscrea[0].iscrea) );
    
    
                        
                        $(this).html(data[index].istotal[0].istotal);
                        $('.isactif:eq('+index+')').html(data[index].isactif[0].isactif);
                        $('.isms:eq('+index+')').html(data[index].isma[0].isma);
                        $('.isma:eq('+index+')').html(data[index].isms[0].isms);
                        $('.issommeil:eq('+index+')').html(data[index].issommail[0].issommail);
                        $('.iscab:eq('+index+')').html(data[index].iscabinet[0].iscabinet);
                        $('.isrev:eq('+index+')').html(data[index].isrev[0].isrev);
                        $('.iscreat:eq('+index+')').html(data[index].iscrea[0].iscrea);
                        $('.isbloc:eq('+index+')').html(data[index].isbloque[0].isbloque);
                        $('.rstt:eq('+index+')').html(sumrest);
                        
                        sumdos += parseInt(data[index].istotal[0].istotal);
                        sumlb += parseInt(data[index].isactif[0].isactif);
                       summam += parseInt(data[index].isma[0].isma);
                        sumamas += parseInt(data[index].isms[0].isms);
                       sumsms += parseInt(data[index].issommail[0].issommail);
                        sumcab += parseInt(data[index].iscabinet[0].iscabinet);
                       sumrev += parseInt(data[index].isrev[0].isrev);
                       sumblq += parseInt(data[index].iscrea[0].iscrea);
                       sumcrea += parseInt(data[index].isbloque[0].isbloque);
                       suvide += parseInt(sumrest);
                        $('#sumdos').html(sumdos);
                        $('#sumlb').html(sumlb)
                        $('#summam').html(summam)
                        $('#sumamas').html(sumamas)
                        $('#sumsms').html(sumsms)
                        $('#sumcab').html(sumcab)
                        $('#sumrev').html(sumrev)
                        $('#sumcrea').html(sumcrea)
                        $('#suvide').html(suvide)
                    });
                    $('#loading5').hide();
                },
            });
        }

        function intialisetva(){
            $('.sumrm').html("");
            $('.sumEm').html("");
            $('.sumrt').html("");
            $('.sumEt').html("");
            $('.sumca12').html("");
            $('.sttotal').html("<b style='color:red'></b>");            
            $('#sumEm').html("");
            $('#sumrm').html("");
            $('#sumrt').html("");
            $('#sumet').html("");
            $('#sumca12').html("");
            $('#sttotal').html("");
            $('#sumExo').html("");
            $('#sumfdb').html("");
            $('#sumrfg').html("");
            $('#sumnon').html("");
            $('#sumns').html("");
            $('#sumbaringo').html("");
            $('#sttotal').html("");
            $('.sumExo').html("");
            $('.sumfdb').html("");
            $('.sumrfg').html("");
            $('.sumnon').html("");
            $('.sumns').html("");
            $('.sumbaringo').html("");
        }

        $(document).on('click','#stat_tva_click',function(){
          //alert("ENCOURS DE DEVELLOPMENET") ;
          //return;  
          $('#st_tva_mmms > table > tbody').html("");
          $('#loading_x').show();
            intialisetva();
            stat_tva_js("hors_ma");
            $('#hst_hors_ma').hide();
            $('#hst_hors_ma_s').hide();
            $('#hst_hors_ma_s').show();
            
        }) 
        
        function stat_tva_js(condition){
            idequipeall = "";
            var st = 0;
            var sttotal = 0;var sumrm = 0; var sumEm = 0; var sumrt = 0;var sumet = 0;var sumca12 = 0;var sumExo = 0;var sumfdb =0;
            var sumrfg = 0;var sumnon =0;var sumns =0;var sumbaringo =0;
            $('#loading_x').show();
            
            $("#st_tva_mmms  .idequipse").each(function() {
              
                $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'stat_tva_l',
                    condition:condition,
                    alllistequipe: $(this).text(),
                },
                success: function(data) {
                    $('#loading_x').show();
                    if(data.EQUIPE != ""){
                    $('#st_tva_mmms .prtfll:eq('+ st +')').html(data.EQUIPE);
                    $('#st_tva_mmms .sumrm:eq('+ st +')').html(data.RM);
                    $('#st_tva_mmms .sumEm:eq('+ st +')').html(data.EM);
                    $('#st_tva_mmms .sumrt:eq('+ st +')').html(data.RT);
                    $('#st_tva_mmms .sumEt:eq('+ st +')').html(data.ET);
                    $('#st_tva_mmms .sumca12:eq('+ st +')').html(data.ST);
                    $('#st_tva_mmms .sumExo:eq('+ st +')').html(data.EXO);
                    $('#st_tva_mmms .sumfdb:eq('+ st +')').html(data.FDB);
                    $('#st_tva_mmms .sumrfg:eq('+ st +')').html(data.RFB);
                    $('#st_tva_mmms .sumnon:eq('+ st +')').html(data.NON);
                    $('#st_tva_mmms .sumns:eq('+ st +')').html(data.NS);
                    $('#st_tva_mmms .sumbaringo:eq('+ st +')').html(data.vide);

                    var sous_total = (parseInt(data.RM)+parseInt(data.EM)+parseInt(data.ET)+parseInt(data.ST)+parseInt(data.EXO)+parseInt(data.FDB)+parseInt(data.RFB)+parseInt(data.NON)+parseInt(data.NS)+parseInt(data.vide))
                    $('#st_tva_mmms .sttotal:eq('+ st +')').html("<b style='color:red'>"+ sous_total + "</b>"); 
                    $('#sumrm').html(sumrm = parseInt(sumrm) + parseInt(data.RM)) ;
                    $('#sumEm').html(sumEm = parseInt(sumEm) + parseInt(data.EM)) ;
                    $('#sumrt').html(sumrt = parseInt(sumrt) + parseInt(data.RT)) ;
                    $('#sumet').html(sumet = parseInt(sumet) + parseInt(data.ET)) ;
                    $('#sumca12').html(sumca12 = parseInt(sumca12) + parseInt(data.ST)) ;
                    $('#sumExo').html(sumExo = parseInt(sumExo) + parseInt(data.EXO)) ;
                    $('#sumfdb').html(sumfdb = parseInt(sumfdb) + parseInt(data.FDB)) ;
                    $('#sumrfg').html(sumrfg = parseInt(sumrfg) + parseInt(data.RFB)) ;
                    $('#sumnon').html(sumnon = parseInt(sumnon) + parseInt(data.NON)) ;
                    $('#sumns').html(sumns = parseInt(sumns) + parseInt(data.NS)) ;
                    $('#sumbaringo').html(sumbaringo = parseInt(sumbaringo) + parseInt(data.vide)) ;
                    $('#sttotal').html(sttotal = parseInt(sttotal) + parseInt(sous_total)) ;


                    if( st  ==  ($("#st_tva_mmms  .idequipse").length  -1) ){ $('#loading_x').hide();}  
                    }
                    st++;
                   
                },
                
            });
         
            
        });  
           
        }

        var valeur_table_initial = "";
        $(document).on('click','#hst_hors_ma_s', function(){
            $(this).hide(10);
            valeur_table_initial = $('#st_tva_mmms').html();            
            intialisetva();
            stat_tva_js("hors_ma_et_ms");
            $('#hst_hors_ma').show(8000);
        })

        $(document).on('click','#hst_hors_ma', function(){
            $(this).hide(10);
            $('#st_tva_mmms > td').html("");
            $('#st_tva_mmms').html(valeur_table_initial);
            $('#hst_hors_ma_s').show(20);
        })


        $(document).on('click','#btn_ma_ms', function(){
            if($('#exo_base').val() != ""){
            var condition = "0";
            if($('#_ma').prop("checked") == true){
                condition += 1;
            }

            if($('#_ms').prop("checked") == true){
                condition += 2;
            }
            $('#loadingmamsbase').show(20)
            $('#table_list_base').html("");
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param: 'bas_ma_ms',
                    cloture:$('#exo_base').val(),
                    condition:condition
                },
                success: function(data) {
                     var corsp = "";
                     for(var i = 0; i < data.length ; i++){
                        corsp += "<tr class='base_tr'>"+
                        "<td>" + (parseInt(i) + 1) + "</td>"+
                         "<td>" + data[i].code + "</td>"+
                         "<td>" + data[i].dossier + "</td>"+
                         "<td>" + data[i].sit_dossier + "</td>"+
                         "<td>" + data[i].cloture + "</td>"+
                         "<td>" + data[i].rg_d_imp1 + "</td>"+
                         "<td>" + data[i].rg_d_imp2 + "</td>"+
                         "<td>" + data[i].frm_jrdq + "</td>"+
                         "<td>" + data[i].dp_coala + "</td>"+
                         "<td>" + data[i].regime + "</td>"+
                         "<td>" + data[i].sit_karlit + "</td>"+
                         "<td>" + data[i].etat_bl + "</td>"+
                         "<td>" + data[i].dt_d_envoie_bl_krlt + "</td>"+
                         "</tr>";
                     }
                    $('#table_list_base').html(corsp.replace(/null/g, "-"));
                    $('#loadingmamsbase').hide(20)
                    $('#scroll_tiana').css('height',(screen.height / 1.2) + "px");
                },
            });
            }else{
                alert("Choisir un Exercice !")
            }
        })

        $(document).on('click','#click_tiana', function(){
            $('#table_list_base').html("");
        })

        /*$(document).on('change','#_ma', function(){
            if($(this).prop("checked") == true){
                $('#_ms').prop('checked', false);
            }
        })
        $(document).on('change','#_ms', function(){
            if($(this).prop("checked") == true){
                $('#_ma').prop('checked', false);
            }
        })*/

        
        $(document).on('click','.n_blq', function(){
            $('.txt_etat_bl').val("");$('.piece_mqt').html("");$('.mois_bl').html("");$('.annee_bl').html("");
                var cloture = $(this).closest('tr').find('.dt_cltr_s').html();
                var etat =  $(this).closest('tr').find('.etat_bl_s').html();
                var piec_mq =  $(this).closest('tr').find('.piec_mk_t').html();
                var cmm_t =  $(this).closest('tr').find('.cmm_t').html();
                
                var i =  parseInt(cloture.substring(5,7));
                var i_annee = parseInt(cloture.substring(0,4))
            if( i < 11 ){
                $(".mois_bl").each(function(index, value){
                    if(etat.length > 10){$('.txt_etat_bl:eq('+index+')').val(etat.split(";;")[index].replace(";",""));}
                    if(piec_mq.length > 10){$('.piece_mqt:eq('+index+')').html(piec_mq.split(";;")[index].replace(";",""));}                    
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
                        if(etat.length > 10){$('.txt_etat_bl:eq('+index+')').val(etat.split(";;")[index].replace(";",""));}
                        if(piec_mq.length > 10){$('.piece_mqt:eq('+index+')').html(piec_mq.split(";;")[index].replace(";",""));}                        
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
            
            $('#date_dernierkeobiz').html($(this).closest('tr').find('.dt_keobiz').html());
            $('.n_om_doss').html($(this).closest('tr').find('.l_doss').html());
            $('.stdossier').html($(this).closest('tr').find('.sit_doss_s').html());
            $('#etat_bll').html($(this).closest('tr').find('.et_bl_l').html());   
            $('#commentaire').val(cmm_t);   
                     
            
        })  

        $(document).on('click',"#ex1-tab-8",function() {
            elementbloquant();           
        });

        $(document).on('click',"#ex1-tab-7",function() {
            alert_pes();           
        });

       /* $(document).on('change',"#ts",function() {
            var test = "";
            if($(this).prop("checked") == true){          
                $('.customselect-dropdown-text:eq(0)').html("Tous selectionnée");
            }else{
                $('.customselect-dropdown-text:eq(0)').html("");
            }
        });
        */
        

        $(document).on('click','#btn_ma_ms_nb_ligne',function(){
            $('#list_nb_aff_ligne').html("");
            equipeselectionnes =  $('.customselect-list:eq(0) > .customselect-dropdown-text:eq(0)').html().trim().replace(/ /g,"");
            if(equipeselectionnes == "votreequipe"){
                alert("Selectionnez un Equipe svp !");
                return;
            }
            var array = equipeselectionnes.split('|');
            var resultatidequipe = "";
            var idEquipe = "";
            var Annee = "";
    
            if(equipeselectionnes == "Tousselectionnée"){
                $('#select_equipe').each(function(index,val2){
                        resultatidequipe +=  $(this).val()
                })         
            }
    
            $.each(array,function(index,value){
                $('#select_equipe > option').each(function(indexf,val2f){
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
                $('#select_anne_equipe').each(function(index,val2){
                        resultatidanne +=  $(this).val()
                })         
            }
    
            $.each(arrayanne,function(indexs,valueannee){
                $('#select_anne_equipe > option').each(function(indexs,val2s){
                    if($(this).text() == valueannee){
                        resultatidanne += $(this).val() + "#";
                    }
                })
            
            })
            var condition = "0";
            if($('#_ma_').prop("checked") == true){
                condition += 1;
            }

            if($('#_ms_').prop("checked") == true){
                condition += 2;
            }
            $('#loadnombredeligne').show();
            Annee = resultatidanne.replace(/\,/g,"#").replace(/\=\"\}"/g,"");
            $.ajax({
                url: "route_Situation_portfeuille.php",
                type: 'POST',
                dataType:'json',
                data: {
                    param:'select_chif_aff',
                    id: idEquipe,
                    annee: Annee,
                    condition:condition,
                },
                success: function(data) {
                    var corsp = "";
                    for(var i = 0; i < data.length ; i++){
                        corsp += "<tr>"+
                         "<td>" + data[i].equipe + "</td>"+
                         "<td>" + data[i].nom_de_dossier + "</td>"+
                         "<td>" + data[i].situation_dossier + "</td>"+
                         "<td>" + data[i].annee + "</td>"+
                         "<td style='color: #002bff;'>" + data[i].nombre_de_ligne + "</td>"+
                         "<td style='font-size:15px;color: #28a745;'>" + data[i].chiffre_d_affaire.replace(".",",") + "</td>"+
                         "</tr>";
                     }
                     $('#list_nb_aff_ligne').show();
                     $('#list_nb_aff_ligne').html(tete_nb_linge  + "<tbody>" + corsp + "</tbody></table>");
                     $('#table_tiana_alex_nbligne').DataTable({
                        "searching": true, // false to disable search (or any other option)
                        scrollY:screen.height / 2.5,
                        scrollX: screen.width * 3,
                        "scrollCollapse": true,
                        "paging": false,
                        fixedHeader: true,
                    });
                    $('.dataTables_length').addClass('bs-select');
                    $('#loadnombredeligne').hide();
                },
            });


        })

        $(document).on('click','.customselect-list-input-item', function(){
            $('#list_nb_aff_ligne').hide(300);
        })

        $(document).on('click','.e_m_m', function(){
          click_detail_tva_chiffre("RM");
        })

        $(document).on('click','.r_m_m', function(){
            click_detail_tva_chiffre("EM");
        })

        $(document).on('click','.rt_rep', function(){
            click_detail_tva_chiffre("RT");
        })

        $(document).on('click','.zt', function(){
            click_detail_tva_chiffre("ET");
        })
        
        
          

        function click_detail_tva_chiffre(tvareg){
            $('#detail_click_tva').html("");
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'dt_tva_clik',
                    tvareg:tvareg,
                    idequipe: idequipe,
                    exercice_v:$('#anneeselect').val(),
                },
                success: function(data) {
                    var corsp = "";
                    for(var i = 0; i < data.length ; i++){
                        corsp += "<tr>"+
                         "<td>" + (i + 1) + "</td>"+
                         "<td>" + data[i].code + "</td>"+
                         "<td>" + data[i].nom_dossier + "</td>"+
                         "<td>" + data[i].situation_doss + "</td>"+
                         "<td>" + data[i].date_cloture + "</td>"+
                         "<td>" + data[i].tvadate_echeance + "</td>"+
                         "</tr>";
                     }
                     $('#detail_click_tva').html(corsp);
                },
            });
        }

        function click_detail_stat_general(date_cours,condition,nom_table){
            $('#detailtab_statg').html("");
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'click_detail_stat_general',
                    date_cours:date_cours,
                    condition: condition,
                },
                success: function(data) {
                    var corsp = "";
                    var entete =   '<table id="'+nom_table+'" class="table-bordered text-center" width="100%">'+
                    '<thead>'+
                    '<tr id="tete_hide">'+
                    '<th>Page</th>'+
                    '<th>Equipe</th>'+
                    '<th>Nom dossier</th>'+
                    '<th>Situation dossier</th>'+
                    '<th>Date cloture</th>'+
                    '<th>Etat_bilan</th>'+
                    '</th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%;overflow:auto;height:100px">';
                    for(var i = 0; i < data.length ; i++){
                        corsp += "<tr class='tr_click_detailgeneral'>"+
                        "<td class='id_situation_d'>" + data[i].id + "</td>"+ 
                        "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + (i + 1) + "</td>"+
                         "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].code + "</td>"+
                         "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].nom + "</td>"+
                         "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].idsituation_dossier + "</td>"+
                         "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].date_cloturation + "</td>"+
                         "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].etat_bilan + "</td>"+
                         "</tr>";
                     }
                     
                     $('#detailtab_statg').html(entete + corsp.replace(/null/g,"") + '</tbody></table>');    
                     $('#choix_exp_bl').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");                                       
                },
            });
        }

        function click_detail_stat_general_sup(date_cours,condition,nombre,nom_table){
            var text_ = ("#" + Allportfeuil).replace(/#/g," OR e.code=\"").replace(/ OR e/g,"\" OR e");
            var cond = "(" + text_.trim().substring(5,text_.length - 12) + ")";
            $('#detailtab_statg').html("");
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'click_detail_stat_general_sup',
                    date_cours:date_cours,
                    condition: condition,
                    allequipe:cond
                },
                success: function(data) {
                 var entete =   '<table id="'+nom_table+'" class="table-bordered text-center" width="100%">'+
                    '<thead>'+
                    '<tr id="tete_hide">'+
                    '<th>Page</th>'+
                    '<th>Equipe</th>'+
                    '<th>Nom dossier</th>'+
                    '<th>Situation dossier</th>'+
                    '<th>Date cloture</th>'+
                    '<th>Etat_bilan</th>'+
                    '</th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody style="zoom:80%;overflow:auto;height:100px">';

                    if(data.length == nombre){
                        var corsp = "";
                        for(var i = 0; i < data.length ; i++){
                            corsp += "<tr class='tr_click_detailgeneral'>"+
                            "<td class='id_situation_d'>" + data[i].id + "</td>"+ 
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + (i + 1) + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].code + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].nom + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].idsituation_dossier + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].date_cloturation + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].etat_bilan + "</td>"+
                            "</tr>";
                        }
                    }else{

                        var corsp = "";
                        for(var i = 0; i < nombre ; i++){
                            corsp += "<tr class='tr_click_detailgeneral'>"+
                            "<td class='id_situation_d'>" + data[i].id + "</td>"+ 
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + (i + 1) + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].code + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].nom + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].idsituation_dossier + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].date_cloturation + "</td>"+
                            "<td data-toggle='modal' data-target='#visuesituationportfeuil' data-backdrop='static' data-keyboard='false'>" + data[i].etat_bilan + "</td>"+
                            "</tr>";
                        }

                    }
                     
                     $('#detailtab_statg').html(entete + corsp.replace(/null/g,"") + '</tbody></table>');   
                     $('#choix_exp_bl').html( "<a href='#' id ='click_"+nom_table+"'> <i class='fas fa-file-excel'></i>&nbsp;Export</>");                      
                },
            });
        }

        

        
        $(document).on('click','.tr_click_detailgeneral', function(){
            var id_d = $(this).closest('tr').find('.id_situation_d').html();
            click(id_d);
            $('#clickdtD').show(200);
        })

        $(document).on('click','.click_dt_bl', function(){
            var id_d = $(this).closest('tr').find('.id_sttt').html();
            click(id_d);
            $('#clickdtD').show(200);
            $('#tete_shide').hide();    
            $('#detailtab_tab1').hide();
        })  

        $(document).on('dblclick','#tableau_expert tr .colorst1',function(){
            $(this).closest('tr').find('.colorst1').removeClass('vertd');
            $(this).html(returnselect);
        })

        $(document).on('dblclick','#tableau_expert tr .colorst2',function(){
            $(this).closest('tr').find('.colorst2').removeClass('bluerd');
            $(this).html(returnselect);
        })

        $(document).on('dblclick','#tableau_expert tr .colorst3',function(){
            $(this).closest('tr').find('.colorst3').removeClass('redflo');
            $(this).html(returnselect);
        })
        
        $(document).on('click','.click_dt_expert', function(){
            $('.clientselect,.actvselect,.localselect,.naturselect,.syntselect').html(returnselect);
            $('.xde').html(returouinon);
            $('.xdzd').html(returnbil);
            $('.xde').html(returouinon);
            $('.txtvlicld,#nom_expert').html("");

            $('.colorst1').removeClass('vertd');
            $('.colorst2').removeClass('bluerd');
            $('.colorst3').removeClass('redflo');

            var id_d = $(this).closest('tr').find('.id_sttt').html();
            id_situation_s = id_d;
            click(id_d);
            $('#clickdtD_expert').show(200);
            //$('#clickdtD_expert_restant').hide();
            $('#tete_shide_expert,#clickdtD').hide();  
            $('#detail_expert,.xk').hide();

        }) 
        

        $(document).on('click','.autre_iexpert', function(){
              var id_d = $(this).closest('tr').find('.id_sttt').html();
              $('.cmt_exp').html("");
            id_situation_s = id_d;
            click(id_d);
        }) 
        

             



        $(document).on('click','.quitexpert', function(){
            var id_d = $(this).closest('tr').find('.id_sttt').html();
            click(id_d);
            $('#clickdtD_expert,#clickdtD_expert_restant').hide(200);

            $('#tete_shide_expert').show(); 
            $('#detail_expert,.xk').show();
        })  

        $(document).on('click','.renvoie_rev', function(){
            click(id_situation_s);
        }) 

        

        $(document).on('click','.valide_expert_v', function(){
            $('#valide_expert_v').click();
        })  
        
        
        

        function click(id_d){
            $('#s_valide_renvoie').html("");
            $.ajax({
                url: "route_Situation_portfeuille.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'click_detail_suivi',
                    id_st:id_d,
                },
                success: function(data) {
                    try {
                        $('.ndossier').html(data[0].dossier);
                        $('.nequipe').html(data[0].code);
                        $('.responsable').html(data[0].cdm);
                        
    
                        $('.txtsit').val(data[0].sit_dossier);
                        $('.txtcloture').val(data[0].cloture);
                        $('.areacmt').val(data[0].cmt);
                        $('.txtrg1').val(data[0].rg_d_imp1);
                        $('.txtrg2').val(data[0].rg_d_imp2);
                        $('.txtjrd').val(data[0].frm_jrdq);
                        $('.txtdcoala').val(data[0].dp_coala);
                        $('.txtrgtva').val(data[0].regime);
                        $('.txtech').val(data[0].dt_ech);
                        $('.txttrtk').val(data[0].sit_karlit);
                        $('.txtetbl').val(data[0].etat_bl);
                        $('.txtdatmaj').val(data[0].date_maj);
                        $('.txtdtenvoibl').val(data[0].dt_d_envoie_bl_krlt);
                        $('.txtdtatervsupfr').val(data[0].dt_rev_sup_fr);
                        $('.txtdtdrappl').val(data[0].dernier_appel_client);
                        $('.txtdrnpes').val(data[0].dernier_pes);
                        $('.txtdrrl').val(data[0].dernier_relance);
                        $('.areaborsfr').val(data[0].obs_sup_fr);
    
                        $('.txtsocial').val(data[0].social);
                        $('.txtTNS').val(data[0].tns);
                        $('.txtrlv').val(data[0].vente);
                        $('#areacmtrl').val(data[0].commentaire_releve);
                        $('.txtacht').val(data[0].achat);
                        $('.txtvt').val(data[0].vente);
                        $('.areatcmtautre').val(data[0].commentaire_et_autre);   
                        
                             

                    $('.name_revue').html(data[0].nom_revue);
                    $('.txcloture').html(data[0].cloture);
                    $('#s_combine').html(data[0].niveau_risque);

                    //$('#s_valide_renvoie').html(data[0].niveau_risque);

                    
                    $('#s_valide_expert_v').html( $('#s_valide_expert_v_reserve').html());
                    
                    if(data[0].expert_list != null && data[0].expert_list != "" ){
                        $('#s_valide_expert_v').html(data[0].expert_list.replace(/Mantien /g,"Maintien "));
                        $('#nom_expert').html(data[0].nom_expert);     
                    }else{
                        $('.xde').html(returouinon);
                        $('.xdzd').html(returnbil);
                    }
                    
                    $('#tete_hide').hide();
                    $('#clickdt').show(200);
                    if(data[0].niveau_risque != null && data[0].niveau_risque != ""){
                        $('#tableau_expert').html(data[0].niveau_risque);
                        $('#s_valide_renvoie').html(data[0].niveau_risque);   
                        $('[data-toggle="popover-hover"]').popover({
                            html: true,
                            trigger: 'hover',
                            placement: 'right',
                            content: function () { return 'risque élevé si espèce \n risque élevé activité BTP -transaction immobilière - commerçants'; }
                          });
                    }
                    
                    } catch (error) {
                        console.log(error);
                    }
             

               
                },
            });
        }

        
        $(document).on('click','.quit',function(){
            $('#tete_hide').show();
            $('#tete_shide').show();
            $('#clickdtD').hide(200);
            $('#clickdt').hide(200);
            $('#detailtab_tab1').show();

        })

        $(document).on('click','#statG tr',function(){
            $('#clickdt').hide(200);
        })
     
        function date_format_detail(datetd){
             var annee = datetd.substring(6, 10);
            var mois = datetd.substring(3, 5);
            var date_cloture = annee + "-" + mois;
            return date_cloture;
        }        

        $(document).on('click','.bilan_afaire,.afaire_vedi,.afaire_trans,.afaire_com_client,.afaire_v_client_s',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            click_detail_stat_general(date_format_detail(date_s),"non_fait","bl_affaire_s");
        })

        $(document).on('click','.bilan_afaire_sup',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            var indeddd = $(this).closest('td').html();
            click_detail_stat_general_sup(date_format_detail(date_s),"non_fait",indeddd,"sup_t1");
            
        })

        $(document).on('click','.fait_sup',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            var indeddd = $(this).closest('td').html();
            click_detail_stat_general_sup(date_format_detail(date_s),"fait",indeddd,"sup_t2");
        })

        $(document).on('click','.afairemoisfait_sup',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            var indeddd = $(this).closest('td').html();
            click_detail_stat_general_sup(date_format_detail(date_s),"reste",indeddd,"sup_t3");
        })
        
        
        
        $(document).on('click','.fait_v_client_s',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            click_detail_stat_general(date_format_detail(date_s),"v_l_client_fait","v_l_client_fait");
        })

        $(document).on('click','#click_v_l_client_fait', function(){
            tableToExcel("v_l_client_fait","Detail");
        })

        $(document).on('click','#click_sup_t3', function(){
            tableToExcel("sup_t3","detail");
        })

        $(document).on('click','#click_sup_t1', function(){
            tableToExcel("sup_t1","detail");
        })

        $(document).on('click','#click_sup_t2', function(){
            tableToExcel("sup_t2","detail");
        })
        

        $(document).on('click','.afairemoisfait_v_client_s',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            //click_detail_stat_general(date_format_detail(date_s),"v_l_client_rstant","v_l_client_rstant");
        })

        $(document).on('click','#click_v_l_client_rstant', function(){
            tableToExcel("v_l_client_rstant","Detail");
        })

        


        $(document).on('click','.fait',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            click_detail_stat_general(date_format_detail(date_s),"fait","bl_fait");
        })

        $(document).on('click','.fait_vedi',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            click_detail_stat_general(date_format_detail(date_s),"v_edi_fait","v_edi_fait");
        })

        $(document).on('click','#click_restant_com_cli', function(){
            tableToExcel("restant_com_cli","Detail");
        })
        

        $(document).on('click','.fait_com_client',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            click_detail_stat_general(date_format_detail(date_s),"fait_com_client","fait_com_client");
        })

        $(document).on('click','#click_fait_com_client', function(){
            tableToExcel("fait_com_client","Detail");
        })
        

       $(document).on('click','#click_trans_afaire_s', function(){
            tableToExcel("trans_afaire_s","Detail");
        })
        



        $(document).on('click','.fait_trans',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            click_detail_stat_general(date_format_detail(date_s),"trans_fait","trans_fait");
        })

        $(document).on('click','.afairemoisfait_trans',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
           // click_detail_stat_general(date_format_detail(date_s),"trans_restant","trans_restant");
        })        
        
        $(document).on('click','#click_trans_restant', function(){
            tableToExcel("trans_restant","Detail");
        })
        
        $(document).on('click','#click_trans_fait', function(){
            tableToExcel("trans_fait","Detail");
        })
        
        $(document).on('click','.afairemoisfait',function(){
            var date_s = $(this).closest('tr').find('.moisstg').html();
            click_detail_stat_general(date_format_detail(date_s),"reste","bl_reste");
        })

        $(document).on('click','#click_bl_reste', function(){
            tableToExcel("bl_reste","Detail");
        }) 

        $(document).on('click','#click_bl_fait', function(){
            tableToExcel("bl_fait","Detail");
        })

        $(document).on('click','#click_bl_affaire_s', function(){
            tableToExcel("bl_affaire_s","Detail");
        })

        
        

        $(document).on('click','.prrt_faik',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("RT",date_s,$('#anneeselect').val(),'#detailtab_rt_et','default');
        })

        
        $(document).on('click','.clidt',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("ET",date_s,$('#anneeselect').val(),'#detailtab_rt_et','default');
        })

        $(document).on('click','.faitzt',function(){
            /*var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("ET",date_s,$('#anneeselect').val(),'#detailtab_rt_et','default');*/
        })

        $(document).on('click','.ftrmk',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("RM",date_s,$('#anneeselect').val(),'#detail_click_tva','default');
        })


        $(document).on('click','.nbfaitk',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("EM",date_s,$('#anneeselect').val(),'#detail_click_tva','default');
        })


        
        $(document).on('click','.rt_reprmoins',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            click_detail_et_rtNONFAIT("RT",date_s,$('#anneeselect').val(),'#detailtab_rt_et');
        })


        $(document).on('click','.restfzt',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            click_detail_et_rtNONFAIT("ET",date_s,$('#anneeselect').val(),'#detailtab_rt_et');
        })

        $(document).on('click','.moinfe_m_m',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            click_detail_et_rtNONFAIT("RM",date_s,$('#anneeselect').val(),'#detail_click_tva');
        })


        $(document).on('click','.moifr_m_m',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            click_detail_et_rtNONFAIT("EM",date_s,$('#anneeselect').val(),'#detail_click_tva');
        })
        


        $(document).on('click','.fr_m_m',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("EM",date_s,$('#anneeselect').val(),'#detail_click_tva','faitk');
        })

        $(document).on('click','.fe_m_m',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("RM",date_s,$('#anneeselect').val(),'#detail_click_tva','faitk');
        })
        

        $(document).on('click','.rt_repres',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("RT",date_s,$('#anneeselect').val(),'#detailtab_rt_et','faitk');
        }) 
        
        $(document).on('click','.faitzt',function(){
            var date_s =  $(this).closest('tr').find('td:eq(0)').html().replace("-"+$('#anneeselect').val(),"");
            recuperdetail_et_rt("ET",date_s,$('#anneeselect').val(),'#detailtab_rt_et','faitk');
        })            

        
        

        function recuperdetail_et_rt(tvaregime,mois,annee,nomid,test){
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'click_detail_et_rt',
                    id_equipe:idequipe,
                    tvaregime:tvaregime,
                    mois: mois,
                    annee:annee,
                    test:test,
                },
                success: function(data) {
                    var corsp = "";
                    for(var i = 0; i < data.length ; i++){
                        corsp += "<tr>"+
                         "<td>" + (i + 1) + "</td>"+
                         "<td>" + data[i].code + "</td>"+
                         "<td>" + data[i].nom + "</td>"+
                         "<td>" + data[i].idsituation_dossier + "</td>"+
                         "<td>" + data[i].date_cloturation + "</td>"+
                         "<td>" + data[i].tvadate_echeance + "</td>"+
                         "</tr>";
                     }
                     $(nomid).html(corsp);
                },
            });
        }

        function click_detail_et_rtNONFAIT(tvaregime,mois,annee,nomid){
            $.ajax({
                url: "route.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    param:'click_detail_et_rtNONFAIT',
                    id_equipe:idequipe,
                    tvaregime:tvaregime,
                    mois: mois,
                    annee:annee,
                },
                success: function(data) {
                    var corsp = "";
                    for(var i = 0; i < data.length ; i++){
                        corsp += "<tr>"+
                         "<td>" + (i + 1) + "</td>"+
                         "<td>" + data[i].code + "</td>"+
                         "<td>" + data[i].nom + "</td>"+
                         "<td>" + data[i].idsituation_dossier + "</td>"+
                         "<td>" + data[i].date_cloturation + "</td>"+
                         "<td>" + data[i].tvadate_echeance + "</td>"+
                         "</tr>";
                     }
                     $(nomid).html(corsp);
                },
            });
        }        
        
        $(document).on('change','.selectx',function(){
     
            var select_td = $(this).closest('tr td').prop('class').split(' ',2)[1];
            if(select_td =="colorst1"){
                $(this).closest('tr').find('.colorst2').removeClass('bluerd');
                $(this).closest('tr').find('.colorst3').removeClass('redflo');
                $(this).closest('tr').find('.colorst2').html(returnselect);
                $(this).closest('tr').find('.colorst3').html(returnselect);
                $(this).closest('tr').find('.colorst1').addClass('vertd');
                $(this).closest('tr').find('.colorst1').html("<span aria-hidden='true'>X</span>");
            }
            if(select_td =="colorst2"){
                $(this).closest('tr').find('.colorst1').removeClass('vertd');
                $(this).closest('tr').find('.colorst3').removeClass('redflo');
                $(this).closest('tr').find('.colorst1').html(returnselect);
                $(this).closest('tr').find('.colorst3').html(returnselect);
                $(this).closest('tr').find('.colorst2').addClass('bluerd');
                $(this).closest('tr').find('.colorst2').html("<span aria-hidden='true'>X</span>");
            }
            if(select_td =="colorst3"){
                $(this).closest('tr').find('.colorst1').removeClass('vertd');
                $(this).closest('tr').find('.colorst2').removeClass('bluerd');
                $(this).closest('tr').find('.colorst1').html(returnselect);
                $(this).closest('tr').find('.colorst2').html(returnselect);
                $(this).closest('tr').find('.colorst3').addClass('redflo');
                $(this).closest('tr').find('.colorst3').html("<span aria-hidden='true'>X</span>");
            }
            
        })

        $(document).on('click','#valide_revision',function(){
            $.ajax({
                url: "route.php",
                type: 'POST',
                 data: {
                    param:'ajout_rev',
                    resultat_final:$('#tableau_expert').html(),
                    id_situation_s:id_situation_s,
                    reviseur_id : $('#us_id').html().trim()
                },
                success: function(data) {
                    $('.close,.quitexpert').click();
                    $('#anneeselect').change();

                },
            });
    
        })

        $(document).on('click','#valide_expert_v',function(){
            if(parseInt($('#s_valide_expert_v').html().indexOf("En attente")) > 0){
                valide_sexper("");
                
            }else{
                valide_sexper($('#us_id').html().trim());
            }

        })

        function valide_sexper(id){
            $.ajax({
                url: "route.php",
                type: 'POST',
                 data: {
                    param:'valide_expert_v',
                    resultat_final:$('#s_valide_expert_v').html(),
                    id_situation_s:id_situation_s,  
                    valide_par : id,
                },
                success: function(data) {
                    $('.close,#quit_v_exp').click();
                    $('#anneeselect').change();

                },
            });
        }


        $(document).on('change','.ouinon_select',function(){
            $(this).closest('td').html( "<b style='color:red'>" + $(this).val() +"<a href='#' class='editclick'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fas fa-edit'></i></a></b>");
        })
        
        $(document).on('click','.editclick',function(){
            if(parseInt($(this).closest('td').html().indexOf("En attente")) > 0){
                $(this).closest('td').html(returnbil);
                return;
            }

            if( $(this).closest('td').html().indexOf("Bilan") < 0){
                $(this).closest('td').html(returouinon);
            }else{
                $(this).closest('td').html(returnbil);
            }
        })
                

        

    
        $('[data-toggle="popover-hover"]').popover({
            html: true,
            trigger: 'hover',
            placement: 'right',
            content: function () { return 'risque élevé si espèce \n risque élevé activité BTP -transaction immobilière - commerçants'; }
          });
         
       
        
            $(document).on('lostfocus','.spop',function(){
                $('.popover-body').hide();
            }) 

            var toggle_pre_dr = 0;
            var toggle_rev = 0;
          

            function disabled(valeur){
                                //option disable-------------------------------x-------------------------
                $('.dtensemble_dis').css({"background":"#fff"});
                for(var i = 0; i< $('.r_disable').length ; i++ ){
                    $('.r_disable:eq('+ i +') .dtensemble_dis').addClass("disabled_as");
                            $('.r_disable:eq('+ i +') .dtensemble_dis:eq('+ valeur + ')').removeClass("disabled_as");
                            $('.r_disable:eq('+ i +') .dtensemble_dis:eq('+ valeur +')').css({"background":"#39c0ed"});   
                }
                //----------------------------------------------------------------------- 
            }
            $(document).on('click','.toggle_rev',function(){
                $('.s_stat_t').show();
            })

            $(document).on('click','.toggle_pre_dr,.toggle_rev',function(){

                if(toggle_pre_dr == 0){
                    $('.s_stat_t').show();
                    $('.toggle_pre_dr').css({"background":"#343d49"});
                    $('.repms,.faitrep,.t_moins_fait,#stglabel,#stglabel_fait,#stglabel_restant').hide(200);
                    $('.toggle_pre_dr').html('<a href="#" style="color:#fbc1c1">PREPARATION DR - CDM KARLIT&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_pre_dr').attr("colspan","1");

                    $('.toggle_rev').css({"background":"#343d49"});
                    $('.exper_fait,.fait_expert,.restant_expert,#th_rev,#th_rev_fait,#th_rev_restant').hide(200);
                    $('.toggle_rev').html('<a href="#" style="color:#fbc1c1">REVISION&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_rev').attr("colspan","1");
                    
                    toggle_pre_dr = 1;
                    toggle_rev = 1
                }else{
                    $('.s_stat_t').show();
                    $('.repms,.faitrep,.t_moins_fait,#stglabel,#stglabel_fait,#stglabel_restant').show(200);
                    $('.toggle_pre_dr').html('<a href="#">PREPARATION DRPREPARATION DR - CDM KARLIT&nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_pre_dr').attr("colspan","4");

                    $('.exper_fait,.fait_expert,.restant_expert,#th_rev,#th_rev_fait,#th_rev_restant').show(200);
                    $('.toggle_rev').html('<a href="#"  >REVISION&nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_rev').attr("colspan","4");
                    toggle_pre_dr = 0;
                    toggle_rev = 0;
                    $('.toggle_pre_dr').css({"background":"#fff"});$('.toggle_pre_dr a').css({"color":"#0e52c1"});
                    $('.toggle_rev').css({"background":"#fff"});$('.toggle_rev a').css({"color":"#0e52c1"});
                    
                    if(toggle_v_ex ==0){$('.toggle_v_ex').click();toggle_v_ex=1;$('.toggle_v_ex').css({"background":"#343d49"});$('.toggle_v_ex a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ccfr ==0){$('.toggle_v_ccfr').click();toggle_v_ccfr=1;$('.toggle_v_ccfr').css({"background":"#343d49"});$('.toggle_v_ccfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_vvclfr ==0){$('.toggle_v_vvclfr').click();toggle_v_vvclfr=1;$('.toggle_v_vvclfr').css({"background":"#343d49"});$('.toggle_v_vvclfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_mgr ==0){$('.toggle_v_mgr').click();toggle_v_mgr=1;$('.toggle_v_mgr').css({"background":"#343d49"});$('.toggle_v_mgr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_tlr ==0){$('.toggle_v_tlr').click();toggle_v_tlr=1;$('.toggle_v_tlr').css({"background":"#343d49"});$('.toggle_v_tlr a').css({"color":"#fbc1c1"});}
                    if(toggle_EDI ==0){$('.toggle_EDI').click();toggle_EDI=1;$('.toggle_EDI').css({"background":"#343d49"});$('.toggle_EDI a').css({"color":"#fbc1c1"});}
                    }
            }) 

            var toggle_v_ex = 0;
            $(document).on('click','.toggle_v_ex',function(){
                $('.s_stat_t').hide();
                if(toggle_v_ex == 0){
                    $('.s_stat_t').hide();
                    $('.toggle_v_ex').css({"background":"#343d49"});
                    $('.afaire_v_exp,.expert_ft,.expert_restant,#toggle_v_ex_af,#toggle_v_ex_fait,#toggle_v_ex_restatnt').hide(200);
                    $('.toggle_v_ex').html('<a href="#" style="color:#fbc1c1">VALIDATION EXPERT COMPTABLE&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_v_ex').attr("colspan","1");
                    toggle_v_ex = 1;
                }else{
                    $('.s_stat_t').hide();
                    $('.afaire_v_exp,.expert_ft,.expert_restant,#toggle_v_ex_af,#toggle_v_ex_fait,#toggle_v_ex_restatnt').show(200);
                    $('.toggle_v_ex').html('<a href="#">VALIDATION EXPERT COMPTABLE&nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_v_ex').attr("colspan","4");
                    toggle_v_ex = 0;
                    $('.toggle_v_ex').css({"background":"#fff"});$('.toggle_v_ex a').css({"color":"#0e52c1"});
                    if(toggle_pre_dr ==0){$('.toggle_pre_dr').click();toggle_pre_dr=1;$('.toggle_pre_dr').css({"background":"#343d49"});$('.toggle_pre_dr a').css({"color":"#fbc1c1"});}
                    if(toggle_rev ==0){$('.toggle_rev').click();toggle_rev=1;$('.toggle_rev').css({"background":"#343d49"});$('.toggle_rev a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ccfr ==0){$('.toggle_v_ccfr').click();toggle_v_ccfr=1;$('.toggle_v_ccfr').css({"background":"#343d49"});$('.toggle_v_ccfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_vvclfr ==0){$('.toggle_v_vvclfr').click();toggle_v_vvclfr=1;$('.toggle_v_vvclfr').css({"background":"#343d49"});$('.toggle_v_vvclfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_mgr ==0){$('.toggle_v_mgr').click();toggle_v_mgr=1;$('.toggle_v_mgr').css({"background":"#343d49"});$('.toggle_v_mgr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_tlr ==0){$('.toggle_v_tlr').click();toggle_v_tlr=1;$('.toggle_v_tlr').css({"background":"#343d49"});$('.toggle_v_tlr a').css({"color":"#fbc1c1"});}
                    if(toggle_EDI ==0){$('.toggle_EDI').click();toggle_EDI=1;$('.toggle_EDI').css({"background":"#343d49"});$('.toggle_EDI a').css({"color":"#fbc1c1"});}
                }
            }) 

            var toggle_v_ccfr = 0;
            $(document).on('click','.toggle_v_ccfr',function(){
                $('.s_stat_t').hide();
                if(toggle_v_ccfr == 0){
                    $('.s_stat_t').hide();
                    $('.toggle_v_ccfr').css({"background":"#343d49"});
                    $('.pt_envclik_bl,.pt_envclik_bl_fait,.pt_envclik_bl_restant,#th_v_ccfr,#th_v_ccfr_fait,#th_v_restant').hide(200);
                    $('.toggle_v_ccfr').html('<a href="#" style="color:#fbc1c1">COMMUNICATION CLIENT CDM&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_v_ccfr').attr("colspan","1");
                    toggle_v_ccfr = 1;
                }else{
                    $('.s_stat_t').hide();
                    $('.pt_envclik_bl,.pt_envclik_bl_fait,.pt_envclik_bl_restant,#th_v_ccfr,#th_v_ccfr_fait,#th_v_restant').show(200);
                    $('.toggle_v_ccfr').html('<a href="#" >COMMUNICATION CLIENT CDM FR&nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_v_ccfr').attr("colspan","4");
                   
                    toggle_v_ccfr = 0;
                    $('.toggle_v_ccfr').css({"background":"#fff"});$('.toggle_v_ccfr a').css({"color":"#0e52c1"});
                    if(toggle_pre_dr ==0){$('.toggle_pre_dr').click();toggle_pre_dr=1;$('.toggle_pre_dr').css({"background":"#343d49"});$('.toggle_pre_dr a').css({"color":"#fbc1c1"});}
                    if(toggle_rev ==0){$('.toggle_rev').click();toggle_rev=1;$('.toggle_rev').css({"background":"#343d49"});$('.toggle_rev a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ex ==0){$('.toggle_v_ex').click();toggle_v_ex=1;$('.toggle_v_ex').css({"background":"#343d49"});$('.toggle_v_ex a').css({"color":"#fbc1c1"});}
                    if(toggle_v_vvclfr ==0){$('.toggle_v_vvclfr').click();toggle_v_vvclfr=1;$('.toggle_v_vvclfr').css({"background":"#343d49"});$('.toggle_v_vvclfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_mgr ==0){$('.toggle_v_mgr').click();toggle_v_mgr=1;$('.toggle_v_mgr').css({"background":"#343d49"});$('.toggle_v_mgr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_tlr ==0){$('.toggle_v_tlr').click();toggle_v_tlr=1;$('.toggle_v_tlr').css({"background":"#343d49"});$('.toggle_v_tlr a').css({"color":"#fbc1c1"});}
                    if(toggle_EDI ==0){$('.toggle_EDI').click();toggle_EDI=1;$('.toggle_EDI').css({"background":"#343d49"});$('.toggle_EDI a').css({"color":"#fbc1c1"});}
                }
                disabled(3);
                click_decl_ = "zz_com_client_cdm_fr";
            }) 

            var toggle_v_vvclfr = 0;
            $(document).on('click','.toggle_v_vvclfr',function(){
                $('.s_stat_t').hide();
                if(toggle_v_vvclfr == 0){
                    $('.s_stat_t').hide();
                    $('.toggle_v_vvclfr').css({"background":"#343d49"});
                    $('.v_client,.v_client_fait,.v_client_restant,#th_vc_afaire,#th_vc_fait,#th_vc_restant').hide(200);
                    $('.toggle_v_vvclfr').html('<a href="#" style="color:#fbc1c1">VALIDATION CLIENT CDM FR&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_v_vvclfr').attr("colspan","1");
                    toggle_v_vvclfr = 1;
                }else{
                    $('.s_stat_t').hide();
                    $('.v_client,.v_client_fait,.v_client_restant,#th_vc_afaire,#th_vc_fait,#th_vc_restant').show(200);
                    $('.toggle_v_vvclfr').html('<a href="#">VALIDATION CLIENT CDM FR &nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_v_vvclfr').attr("colspan","4");
                   
                    toggle_v_vvclfr = 0;
                    $('.toggle_v_vvclfr').css({"background":"#fff"});$('.toggle_v_vvclfr a').css({"color":"#0e52c1"});
                    if(toggle_pre_dr ==0){$('.toggle_pre_dr').click();toggle_pre_dr=1;$('.toggle_pre_dr').css({"background":"#343d49"});$('.toggle_pre_dr a').css({"color":"#fbc1c1"});}
                    if(toggle_rev ==0){$('.toggle_rev').click();toggle_rev=1;$('.toggle_rev').css({"background":"#343d49"});$('.toggle_rev a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ex ==0){$('.toggle_v_ex').click();toggle_v_ex=1;$('.toggle_v_ex').css({"background":"#343d49"});$('.toggle_v_ex a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ccfr ==0){$('.toggle_v_ccfr').click();toggle_v_ccfr=1;$('.toggle_v_ccfr').css({"background":"#343d49"});$('.toggle_v_ccfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_mgr ==0){$('.toggle_v_mgr').click();toggle_v_mgr=1;$('.toggle_v_mgr').css({"background":"#343d49"});$('.toggle_v_mgr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_tlr ==0){$('.toggle_v_tlr').click();toggle_v_tlr=1;$('.toggle_v_tlr').css({"background":"#343d49"});$('.toggle_v_tlr a').css({"color":"#fbc1c1"});}
                    if(toggle_EDI ==0){$('.toggle_EDI').click();toggle_EDI=1;$('.toggle_EDI').css({"background":"#343d49"});$('.toggle_EDI a').css({"color":"#fbc1c1"});}
                }
                disabled(4);
                click_decl_ = "zz_valid_client_cdm_fr";
            }) 

            var toggle_v_mgr = 0;
            $(document).on('click','.toggle_v_mgr',function(){
                $('.s_stat_t').hide();
                if(toggle_v_mgr == 0){
                    $('.s_stat_t').hide();
                    $('.toggle_v_mgr').css({"background":"#343d49"});
                    $('.v_manager,.v_manager_fait,.v_manager_restant,#th_vc_vafaire,#th_vc_vfait,#th_vc_vfait').hide(200);
                    $('.toggle_v_mgr').html('<a href="#" style="color:#fbc1c1">VALIDATION MANAGER FR&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_v_mgr').attr("colspan","1");
                    toggle_v_mgr = 1;
                }else{
                    $('.s_stat_t').hide();
                    $('.v_manager,.v_manager_fait,.v_manager_restant,#th_vc_vafaire,#th_vc_vfait,#th_vc_vfait').show(200);
                    $('.toggle_v_mgr').html('<a href="#">VALIDATION MANAGER FR &nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_v_mgr').attr("colspan","4");
                    
                    toggle_v_mgr = 0;     
                    $('.toggle_v_mgr').css({"background":"#fff"});$('.toggle_v_mgr a').css({"color":"#0e52c1"});
                    if(toggle_pre_dr ==0){$('.toggle_pre_dr').click();toggle_pre_dr=1;$('.toggle_pre_dr').css({"background":"#343d49"});$('.toggle_pre_dr a').css({"color":"#fbc1c1"});}
                    if(toggle_rev ==0){$('.toggle_rev').click();toggle_rev=1;$('.toggle_rev').css({"background":"#343d49"});$('.toggle_rev a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ex ==0){$('.toggle_v_ex').click();toggle_v_ex=1;$('.toggle_v_ex').css({"background":"#343d49"});$('.toggle_v_ex a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ccfr ==0){$('.toggle_v_ccfr').click();toggle_v_ccfr=1;$('.toggle_v_ccfr').css({"background":"#343d49"});$('.toggle_v_ccfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_vvclfr ==0){$('.toggle_v_vvclfr').click();toggle_v_vvclfr=1;$('.toggle_v_vvclfr').css({"background":"#343d49"});$('.toggle_v_vvclfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_tlr ==0){$('.toggle_v_tlr').click();toggle_v_tlr=1;$('.toggle_v_tlr').css({"background":"#343d49"});$('.toggle_v_tlr a').css({"color":"#fbc1c1"});}
                    if(toggle_EDI ==0){$('.toggle_EDI').click();toggle_EDI=1;$('.toggle_EDI').css({"background":"#343d49"});$('.toggle_EDI a').css({"color":"#fbc1c1"});}
                }
                disabled(5);
                click_decl_ = "zz_valid_manager_fr";
            }) 


            var toggle_v_tlr = 0;
            $(document).on('click','.toggle_v_tlr',function(){
                $('.s_stat_t').hide();
                if(toggle_v_tlr == 0){
                    $('.s_stat_t').hide();
                    $('.toggle_v_tlr').css({"background":"#343d49"});
                    $('.t_transmis,.t_transmis_fait,.t_transmis_restant,#th_vc_tlrfait,#th_vc_tlrfaire,#th_vc_tlrrestant').hide(200);
                    $('.toggle_v_tlr').html('<a href="#" style="color:#fbc1c1">TRAITEMENT TÉLÉTRANS CDM FR&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_v_tlr').attr("colspan","1");
                    toggle_v_tlr = 1;
                }else{
                    $('.s_stat_t').hide();
                    $('.t_transmis,.t_transmis_fait,.t_transmis_restant,#th_vc_tlrfait,#th_vc_tlrfaire,#th_vc_tlrrestant').show(200);
                    $('.toggle_v_tlr').html('<a href="#">TRAITEMENT TÉLÉTRANS CDM FR&nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_v_tlr').attr("colspan","4");
                    toggle_v_tlr = 0; 
                    $('.toggle_v_tlr').css({"background":"#fff"});$('.toggle_v_tlr a').css({"color":"#0e52c1"});
                    if(toggle_pre_dr ==0){$('.toggle_pre_dr').click();toggle_pre_dr=1;$('.toggle_pre_dr').css({"background":"#343d49"});$('.toggle_pre_dr a').css({"color":"#fbc1c1"});}
                    if(toggle_rev ==0){$('.toggle_rev').click();toggle_rev=1;$('.toggle_rev').css({"background":"#343d49"});$('.toggle_rev a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ex ==0){$('.toggle_v_ex').click();toggle_v_ex=1;$('.toggle_v_ex').css({"background":"#343d49"});$('.toggle_v_ex a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ccfr ==0){$('.toggle_v_ccfr').click();toggle_v_ccfr=1;$('.toggle_v_ccfr').css({"background":"#343d49"});$('.toggle_v_ccfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_vvclfr ==0){$('.toggle_v_vvclfr').click();toggle_v_mgr=1;$('.toggle_v_vvclfr').css({"background":"#343d49"});$('.toggle_v_vvclfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_mgr ==0){$('.toggle_v_mgr').click();toggle_v_mgr=1;$('.toggle_v_mgr').css({"background":"#343d49"});$('.toggle_v_mgr a').css({"color":"#fbc1c1"});}
                    if(toggle_EDI ==0){$('.toggle_EDI').click();toggle_EDI=1;$('.toggle_EDI').css({"background":"#343d49"});$('.toggle_EDI a').css({"color":"#fbc1c1"});}
                }
                disabled(6);
                click_decl_ = "zz_trait_tel_cdm_fr";
            }) 

            var toggle_EDI = 0;
            $(document).on('click','.toggle_EDI',function(){
                $('.s_stat_t').hide();
                if(toggle_EDI == 0){
                    $('.s_stat_t').hide();
                    $('.toggle_EDI').css({"background":"#343d49"});
                    $('.s_valt_edi,.s_valt_edi_fait,.s_valt_edi_restant,#th_vc_EDrrAFAIRE,#th_vc_EDrFAIT,#th_vc_EDrrestant').hide(200);
                    $('.toggle_EDI').html('<a href="#" style="color:#fbc1c1">VALIDATION EDI CDM FR&nbsp;<i class="fas fa-plus"></i></a>');
                    $('.toggle_EDI').attr("colspan","1");
                    toggle_EDI = 1;
                }else{
                    $('.s_stat_t').hide();
                    $('.s_valt_edi,.s_valt_edi_fait,.s_valt_edi_restant,#th_vc_EDrrAFAIRE,#th_vc_EDrFAIT,#th_vc_EDrrestant').show(200);
                    $('.toggle_EDI').html('<a href="#">VALIDATION EDI CDM FR&nbsp;<i class="fas fa-minus"></i></a>');
                    $('.toggle_EDI').attr("colspan","5");
                    
                    toggle_EDI = 0;         
                    $('.toggle_EDI').css({"background":"#fff"});$('.toggle_EDI a').css({"color":"#0e52c1"});
                    if(toggle_pre_dr ==0){$('.toggle_pre_dr').click();toggle_pre_dr=1;$('.toggle_pre_dr').css({"background":"#343d49"});$('.toggle_pre_dr a').css({"color":"#fbc1c1"});}
                    if(toggle_rev ==0){$('.toggle_rev').click();toggle_rev=1;$('.toggle_rev').css({"background":"#343d49"});$('.toggle_rev a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ex ==0){$('.toggle_v_ex').click();toggle_v_ex=1;$('.toggle_v_ex').css({"background":"#343d49"});$('.toggle_v_ex a').css({"color":"#fbc1c1"});}
                    if(toggle_v_ccfr ==0){$('.toggle_v_ccfr').click();toggle_v_ccfr=1;$('.toggle_v_ccfr').css({"background":"#343d49"});$('.toggle_v_ccfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_vvclfr ==0){$('.toggle_v_vvclfr').click();toggle_v_mgr=1;$('.toggle_v_vvclfr').css({"background":"#343d49"});$('.toggle_v_vvclfr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_mgr ==0){$('.toggle_v_mgr').click();toggle_v_mgr=1;$('.toggle_v_mgr').css({"background":"#343d49"});$('.toggle_v_mgr a').css({"color":"#fbc1c1"});}
                    if(toggle_v_tlr ==0){$('.toggle_v_tlr').click();toggle_v_tlr=1;$('.toggle_v_tlr').css({"background":"#343d49"});$('.toggle_v_tlr a').css({"color":"#fbc1c1"});}
                }
                disabled(7);
                click_decl_ = "zz_valid_edi_cdm_fr";                
            }) 

            valeur_par_default();
 
            function valeur_par_default(){
                
                

                $('.afaire_v_exp,.expert_ft,.expert_restant,#toggle_v_ex_af,#toggle_v_ex_fait,#toggle_v_ex_restatnt').hide(100);
                $('.toggle_v_ex').html('<a href="#" style="color: #fbc1c1;">VALIDATION EXPERT COMPTABLE&nbsp;<i class="fas fa-plus"></i></a>');
                $('.toggle_v_ex').attr("colspan","1");
                $('.toggle_v_ex').css({"background":"#343d49"});$('.toggle_v_ex a').css({"color":"#fbc1c1"})
                toggle_v_ex =1;

                $('.pt_envclik_bl,.pt_envclik_bl_fait,.pt_envclik_bl_restant,#th_v_ccfr,#th_v_ccfr_fait,#th_v_restant').hide(100);
                $('.toggle_v_ccfr').html('<a href="#">COMMUNICATION CLIENT CDM FR&nbsp;<i class="fas fa-plus"></i></a>');
                $('.toggle_v_ccfr').attr("colspan","1");
                $('.toggle_v_ccfr').css({"background":"#343d49"});$('.toggle_v_ccfr a').css({"color":"#fbc1c1"})
                toggle_v_ccfr = 1;

                $('.v_client,.v_client_fait,.v_client_restant,#th_vc_afaire,#th_vc_fait,#th_vc_restant').hide(100);
                $('.toggle_v_vvclfr').html('<a href="#" style="color: #fbc1c1;">VALIDATION CLIENT CDM FR &nbsp;<i class="fas fa-plus"></i></a>');
                $('.toggle_v_vvclfr').attr("colspan","1");
                $('.toggle_v_vvclfr').css({"background":"#343d49"});$('.toggle_v_vvclfr a').css({"color":"#fbc1c1"})
                toggle_v_vvclfr =1;

                $('.v_manager,.v_manager_fait,.v_manager_restant,#th_vc_vafaire,#th_vc_vfait,#th_vc_vfait').hide(100);
                $('.toggle_v_mgr').html('<a href="#">VALIDATION - MANAGER FR &nbsp;<i class="fas fa-plus"></i></a>');
                $('.toggle_v_mgr').attr("colspan","1");
                $('.toggle_v_mgr').css({"background":"#343d49"});$('.toggle_v_mgr a').css({"color":"#fbc1c1"})
                toggle_v_mgr =1;

                $('.t_transmis,.t_transmis_fait,.t_transmis_restant,#th_vc_tlrfait,#th_vc_tlrfaire,#th_vc_tlrrestant').hide(100);
                $('.toggle_v_tlr').html('<a href="#" style="color: #fbc1c1;">TRAITEMENT TÉLÉTRANS CDM FR&nbsp;<i class="fas fa-plus"></i></a>');
                $('.toggle_v_tlr').attr("colspan","1");
                $('.toggle_v_tlr').css({"background":"#343d49"});$('.toggle_v_tlr a').css({"color":"#fbc1c1"})
                toggle_v_tlr =1;

                $('.s_valt_edi,.s_valt_edi_fait,.s_valt_edi_restant,#th_vc_EDrrAFAIRE,#th_vc_EDrFAIT,#th_vc_EDrrestant').hide(100);
                $('.toggle_EDI').html('<a href="#">VALIDATION EDI CDM FR&nbsp;<i class="fas fa-plus"></i></a>');
                $('.toggle_EDI').attr("colspan","1");
                $('.toggle_EDI').css({"background":"#343d49"});$('.toggle_EDI a').css({"color":"#fbc1c1"});
                $('.stsearch').val("");
              //  toggle_EDI=1;
            }

    

  
            $(document).on('change','.dt_bl_default4:eq(0)',function(){
                for(var i = 1; i < $('.dt_bl_default4').length ; i++){
                    if($('.dt_bl_default4:eq('+ i +')').val() == ""){
                        $('.dt_bl_default4:eq('+ i +')').val($('.dt_bl_default4:eq(0)').val());
                    }
                }
            })

             $(document).on('change','.dt_bl_default5:eq(0)',function(){
                for(var i = 1; i < $('.dt_bl_default5').length ; i++){
                    if($('.dt_bl_default5:eq('+ i +')').val() == ""){
                        $('.dt_bl_default5:eq('+ i +')').val($('.dt_bl_default5:eq(0)').val());
                    }
                }
            })

            $(document).on('change','.dt_bl_default6:eq(0)',function(){
                for(var i = 1; i < $('.dt_bl_default6').length ; i++){
                    if($('.dt_bl_default6:eq('+ i +')').val() == ""){
                        $('.dt_bl_default6:eq('+ i +')').val($('.dt_bl_default6:eq(0)').val());
                    }
                }
            })

            $(document).on('change','.dt_bl_default7:eq(0)',function(){
                for(var i = 1; i < $('.dt_bl_default7').length ; i++){
                    if($('.dt_bl_default7:eq('+ i +')').val() == ""){
                        $('.dt_bl_default7:eq('+ i +')').val($('.dt_bl_default7:eq(0)').val());
                    }
                }
            })

            $(document).on('change','.dt_bl_default8:eq(0)',function(){
                for(var i = 1; i < $('.dt_bl_default8').length ; i++){
                    if($('.dt_bl_default8:eq('+ i +')').val() == ""){
                        $('.dt_bl_default8:eq('+ i +')').val($('.dt_bl_default8:eq(0)').val());
                    }
                }
            })

            

            $(document).on('click','#valide_decl',function(){
                if($('.dt_bl_default4:eq(0)').val() == ""){
                    
                    for(var i = 0; i < $('.dt_bl_default4').length ; i++){
                        if($('.dt_bl_default4:eq('+ i +')').val() != ""){
                            $('.dt_bl_default4:eq(0)').val($('.dt_bl_default4:eq('+ i +')').val());
                        }
                    } 
                }
                declaratoin_com = "";
                var v_commentaire = "";
                if(click_decl_ == "zz_com_client_cdm_fr"){
                    for(var i = 0; i < $('.dt_bl_default4').length ; i++){
                        declaratoin_com +=  $('.dt_bl_default4:eq('+ i +')').val() + "#";
                    }       
                }

                if(click_decl_ == "zz_valid_client_cdm_fr"){

                    for(var i = 0; i < $('.dt_bl_default5').length ; i++){
                        if($('.dt_bl_default5:eq('+ i +')').val() != ""){
                            $('.dt_bl_default5:eq(0)').val($('.dt_bl_default5:eq('+ i +')').val());
                        }
                    } 

                    for(var i = 0; i < $('.dt_bl_default5').length ; i++){
                        declaratoin_com +=  $('.dt_bl_default5:eq('+ i +')').val() + "#";
                    }       
                }
                if(click_decl_ == "zz_valid_manager_fr"){
                    for(var i = 0; i < $('.dt_bl_default6').length ; i++){
                        if($('.dt_bl_default6:eq('+ i +')').val() != ""){
                            $('.dt_bl_default6:eq(0)').val($('.dt_bl_default6:eq('+ i +')').val());
                        }
                    } 

                    for(var i = 0; i < $('.dt_bl_default6').length ; i++){
                        declaratoin_com +=  $('.dt_bl_default6:eq('+ i +')').val() + "#";
                    }       
                }
                
                if(click_decl_ == "zz_trait_tel_cdm_fr"){
                    for(var i = 0; i < $('.dt_bl_default7').length ; i++){
                        if($('.dt_bl_default7:eq('+ i +')').val() != ""){
                            $('.dt_bl_default7:eq(0)').val($('.dt_bl_default7:eq('+ i +')').val());
                        }
                    } 

                    for(var i = 0; i < $('.dt_bl_default7').length ; i++){
                        declaratoin_com +=  $('.dt_bl_default7:eq('+ i +')').val() + "#"; 
                    }       
                }

                if(click_decl_ == "zz_valid_edi_cdm_fr"){

                    for(var i = 0; i < $('.dt_bl_default8').length ; i++){
                        if($('.dt_bl_default8:eq('+ i +')').val() != ""){
                            $('.dt_bl_default8:eq(0)').val($('.dt_bl_default8:eq('+ i +')').val());
                        }
                    } 

                    for(var i = 0; i < $('.dt_bl_default8').length ; i++){
                        declaratoin_com +=  $('.dt_bl_default8:eq('+ i +')').val() + "#";
                    }       
                }

                for(var i = 0; i < $('.commentaire_declaration').length ; i++){
                    v_commentaire +=  $('.commentaire_declaration:eq('+ i +')').val() + "#";
                }

                return_decl_insert(v_commentaire,"zz_comm_declaration");                
                return_decl_insert(declaratoin_com,click_decl_);
                $('#anneeselect').change();
                $('.close').click();
            })

            
            $(document).on('click','.pt_envclik_bl_fait', function(){
                fonction_v_fai_tous($(this),'click_pt_fait_tous',"detail__fait_com_s_1",true);
                $('#clickdt').hide();
            })     

            $(document).on('click','#click_detail__fait_com_s_1', function(){
                var tableau = "<table id='detail__fait_com_s_1'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_1","Detail");
            })     
    
            
            $(document).on('click','.v_client', function(){
                fonction_v_fai_tous($(this),'click_pt_fait_tous',"detail__fait_com_s_2",false);
                $('#clickdt').hide();
            })  
            
            $(document).on('click','#click_detail__fait_com_s_2', function(){
                var tableau = "<table id='detail__fait_com_s_2'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_2","Detail");
            })  

            $(document).on('click','.v_client_restant', function(){
                fonction_valide_fai_tous($(this),'click_val_fait_tous',"detail__fait_com_s_3","is null",true);
                $('#clickdt').hide();
            })   

            $(document).on('click','#click_detail__fait_com_s_3', function(){
                var tableau = "<table id='detail__fait_com_s_3'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_3","Detail");
            })  

            $(document).on('click','.v_client_fait', function(){
                fonction_valide_fai_tous($(this),'click_val_fait_tous',"detail__fait_com_s_4","is not null",true);
                $('#clickdt').hide();
            })  
            
            $(document).on('click','#click_detail__fait_com_s_4', function(){
                var tableau = "<table id='detail__fait_com_s_4'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_4","Detail");
            })  
            

            $(document).on('click','.v_manager', function(){
                fonction_valide_fai_tous($(this),'click_val_fait_tous',"detail__fait_com_s_5","is not null",false);
                $('#clickdt').hide();
            })

            $(document).on('click','#click_detail__fait_com_s_5', function(){
                var tableau = "<table id='detail__fait_com_s_5'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_5","Detail");
            })  
            
            
            $(document).on('click','.v_manager_restant', function(){
                fonction_manager_tous($(this),'click_manager_fait_tous',"detail__fait_com_s_6","is null",true);
                $('#clickdt').hide();
            })

            $(document).on('click','#click_detail__fait_com_s_6', function(){
                var tableau = "<table id='detail__fait_com_s_6'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_6","Detail");
            })  
            
            $(document).on('click','.v_manager_fait', function(){
                fonction_manager_tous($(this),'click_manager_fait_tous',"detail__fait_com_s_7","is not null",true);
                $('#clickdt').hide();
            })

            $(document).on('click','#click_detail__fait_com_s_7', function(){
                var tableau = "<table id='detail__fait_com_s_7'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_7","Detail");
            })  
            
            $(document).on('click','.t_transmis', function(){
                fonction_manager_tous($(this),'click_manager_fait_tous',"detail__fait_com_s_8","is not null",false);
                $('#clickdt').hide();
            })

            
            $(document).on('click','#click_detail__fait_com_s_8', function(){
                var tableau = "<table id='detail__fait_com_s_8'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_8","Detail");
            })  

            $(document).on('click','.t_transmis_restant', function(){
                click_teletrans_fait_tous($(this),'click_teletrans_fait_tous',"detail__fait_com_s_9","is null",true);
                $('#clickdt').hide();
            })

            $(document).on('click','#click_detail__fait_com_s_9', function(){
                var tableau = "<table id='detail__fait_com_s_9'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_9","Detail");
            })  

            $(document).on('click','.t_transmis_fait', function(){
                click_teletrans_fait_tous($(this),'click_teletrans_fait_tous',"detail__fait_com_s_10","is not null",true);
                $('#clickdt').hide();
            })

            $(document).on('click','#click_detail__fait_com_s_10', function(){
                var tableau = "<table id='detail__fait_com_s_10'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_10","Detail");
            })  

            $(document).on('click','.s_valt_edi', function(){
                click_teletrans_fait_tous($(this),'click_teletrans_fait_tous',"detail__fait_com_s_11","is not null",false);
                $('#clickdt').hide();
            })

            $(document).on('click','#click_detail__fait_com_s_11', function(){
                var tableau = "<table id='detail__fait_com_s_11'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_11","Detail");
            })  
            

            $(document).on('click','.s_valt_edi_restant', function(){
                click_edi_fait_tous($(this),'click_edi_fait_tous',"detail__fait_com_s_12","is null",true);
                $('#clickdt').hide();
            })

            
            $(document).on('click','#click_detail__fait_com_s_12', function(){
                var tableau = "<table id='detail__fait_com_s_12'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_12","Detail");
            })  

            $(document).on('click','.s_valt_edi_fait', function(){
                click_edi_fait_tous($(this),'click_edi_fait_tous',"detail__fait_com_s_13","is not null",true);
                $('#clickdt').hide();
            })

            
            
            $(document).on('click','#click_detail__fait_com_s_13', function(){
                var tableau = "<table id='detail__fait_com_s_13'>"+tete_clone+"<tbody>" +clone_table+"</tbody></table>";
                $('#table_clones').html(tableau);
                tableToExcel("detail__fait_com_s_13","Detail");
            })  
           
            $(document).on('change','.select_notif select', function(){
                var id_stion = $(this).closest('tr').find('.id_stion').html();
                var valeur = $(this).closest('select').val();
                updta_alert_pes(id_stion,valeur)
            })             

            function updta_alert_pes(id_situation,valeur){
                $.ajax({
                    url: "route.php",
                    type: 'POST',
                     data: {
                        param:'update_valeur_alert_pes',
                        resultat_final:valeur,
                        id_situation:id_situation,  
                        valeur : valeur,
                    },
                    success: function(data) {
                        alert("MODIFICATION OK !");
                        alert_pes();
                    },
                });
            }
            

            function return_decl_insert(valeur,nom_table){
                $.ajax({
                    url: "route.php",
                    type: 'POST',
                     data: {
                        param:'val_dec_insert',
                        resultat_final:valeur,
                        id_situation_s:id_situation_s,  
                        valide_par : $('#us_id').html().trim(),
                        nom_table:nom_table
                    },
                    success: function(data) {
                        console.log(data);
                    },
                });
            }

            $(document).on('click','td', function(){
                $('.stsearch').val("");
            })

            var tableToExcel = (function() {
                var uri = 'data:application/vnd.ms-excel;base64,'
                    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
                    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
                    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
                return function(table, name) {
                    if (!table.nodeType) table = document.getElementById(table)
                    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
                    window.location.href = uri + base64(format(template, ctx))
                }
                })()
                
                //tableToExcel("statparporftfeuil");
        
                document.onkeydown = function(e)
                {
              
                    if(e.keyCode==27)
                    {
                        (navigator.appName.substring(0,3)=="Mic") ? event.returnValue = false : e.preventDefault();
                       $('.quitexpert,.close,.quit').click();
            
                        CancelEvent(e);
            
                    }
                }
                function CancelEvent(e)
                {
                    if(e)
                    {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    if(window.event)
                    {
                        window.event.cancelBubble = true;
                        window.event.returnValue  = false;
                        return;
                    }
                }
              
                
            
})
