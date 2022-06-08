$(function () {
  var return_id = "";
  $(document).on("change", "#listpaysselect", function () {
    $(".as_sup").hide();
    $("#aneselect").val("");
    $("#listptt").html("");
    var select = "";
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "selectsup_2",
        valeur_id: $(this).val()
      },
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          var id = data[i].id;
          var nom = data[i].nom;
          select += "<option value='" + id + "'>" + nom + "</option>";
        }
        $("#sup").html("<select id='supselect' class='form-control'><option value='0'></option>" + select + "</select>");
        $(".as_sup").show();
      }
    });
  });

  function progressbar(valeur) {
    return ('<div class="w3-light-blue"><div class="w3-container w3-green w3-center w3-animate-left" style="height:26px;width:' + valeur + '%">' + valeur + "%</div></div>");
  }


  $.ajax({
    url: "route.php",
    type: "POST",
    dataType: "json",
    data: {
      param: "selectsup",
      valeur_id: 2
    },
    success: function (data) {
      var select = "";
      for (var i = 0; i < data.length; i++) {
        var id = data[i].id;
        var nom = data[i].nom;
        select += "<option value='" + id + "'>" + nom + "</option>";
      }
      $("#b_manager").html("<select id='select_manager' class='form-control'><option value='0'></option>" + select + "</select>");
    }
  });

  $(document).on('change','#cdm_fr_select,#vehicle1', function(){
    $('.total_dossier_select').html("00");
  })
  

  $(document).on('change','#select_manager', function(){
    $('.total_dossier_select').html("00");
    $.ajax({
      url: "route.php",
      type: 'POST',
      dataType:'json',
      data: {
          param:'selectsonportfeuil',
          id: $(this).val(),
      },
      success: function(data) {
          
              var listequi = "";   
              
              if(data.length > 0){
                for(var x =0; x < data.length; x++){
                  listequi += "<option value='"+data[x].id +"'>" + data[x].code + "</option>";
                }
              }
                
              
              $('#b_manager_cdm').html("<select class='form-control' id='cdm_fr_select'><option></option>" + listequi + "</select>");                        
          
      },
  });
  })

  function progressbar_cdm(valeur) {
    return ('<div class="w3-light-blue"><div class="w3-container w3-green w3-center w3-animate-left" style="height:26px;width:' + valeur + '%"></div></div>');
  }

  $(document).on("click", ".validgraphsup_all_equipe", function () {
    $("#chartContainertableau").html("");
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "selectall_ptf",
        select_mm: $("#select_mm").val(),
        select_aa: $("#select_aa").val()
      },
      success: function (data_reponse) {
        var listequi = "";
        var rang = 1;
        $.each(data_reponse.sort(function (a, b) {
          return b.pourcentage - a.pourcentage;
        }), function (index) {
          if (data_reponse[index].nom_equipe != "") {
            try {
              if (progressbar(parseFloat(data_reponse[index].pourcentage.trim())) == progressbar(parseFloat(data_reponse[index - 1].pourcentage.trim()))) {
                rang = rang;
                listequi += "<tr><td>" + rang + "<b style='color:red'>ex</b></td><td>" + data_reponse[index].nom_equipe + "</td><td>" + data_reponse[index].total_bilan + "</td><td>" + data_reponse[index].fait + "</td><td>" + progressbar(parseFloat(data_reponse[index].pourcentage.trim())) + "<td></td>";
              } else {
                rang++;
                listequi += "<tr><td>" + rang + "<b style='color:blue'>eme</b></td></td><td>" + data_reponse[index].nom_equipe + "</td><td>" + data_reponse[index].total_bilan + "</td><td>" + data_reponse[index].fait + "</td><td>" + progressbar(parseFloat(data_reponse[index].pourcentage.trim())) + "<td></td>";
              }
            } catch  {
              listequi += "<tr><td>" + rang + "er</td><td>" + data_reponse[index].nom_equipe + "</td><td>" + data_reponse[index].total_bilan + "</td><td>" + data_reponse[index].fait + "</td><td>" + progressbar(parseFloat(data_reponse[index].pourcentage.trim())) + "<td></td>";
            }
          }
        });

        $("#tbody_parequip").html(listequi);
      }
    });
  });

  $(document).on("click", ".validgraphsup_parcdm", function () {
    $("#chartContainertableau").html("");
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "selectall_ptf_cdm",
        select_mm: $("#select_mm").val(),
        select_aa: $("#select_aa").val()
      },
      success: function (data_reponse) {
        var listequi = "";
        var rang = 1;
        $.each(data_reponse.sort(function (a, b) {
          return b.total_fait - a.total_fait;
        }), function (index) {
          if (data_reponse[index].nom_equipe != "") {
            try {
              if (parseInt(data_reponse[index].total_fait) == parseInt(data_reponse[index - 1].total_fait)) {
                rang = rang;
                listequi += "<tr><td>" + rang + "<b style='color:red'>ex</b></td><td>" + data_reponse[index].nom_cdm + "</td><td>" + data_reponse[index].total_fait + "<td>" + progressbar_cdm(parseInt(data_reponse[index].total_fait) / 50) + "<td></td>";
              } else {
                rang++;
                listequi += "<tr><td>" + rang + "<b style='color:blue'>eme</b></td><td>" + data_reponse[index].nom_cdm + "</td><td>" + data_reponse[index].total_fait + "<td>" + progressbar_cdm(parseInt(data_reponse[index].total_fait) / 50) + "<td></td>";
              }
            } catch (error) {
              listequi += "<tr><td>" + rang + "<b style='color:blue'>er</b></td><td>" + data_reponse[index].nom_cdm + "</td><td>" + data_reponse[index].total_fait + "<td>" + progressbar_cdm(parseInt(data_reponse[index].total_fait) / 50) + "<td></td>";
            }
          }
        });

        $("#tbody_parcdm").html(listequi);
      }
    });
  });

  $(document).on("click", ".graphsup", function () {
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "selectsonportfeuil_grap",
        id: $("#supselect").val(),
        aneselect: $("#aneselect").val()
      },
      success: function (data_reponse) {
        console.log(data_reponse);
        chart_par_sup(data_reponse);
        chart_par_teletranms(data_reponse);
        chart_par_validataion_edi(data_reponse);
      }
    });
  });

  function chart_par_sup(data_reponse){
    var listequi = [];
        $.each(data_reponse.sort(function (a, b) {
          return a.pourcentage - b.pourcentage;
        }), function (index) {
          if (data_reponse[index].nom_equipe != "") {
            listequi.push({
              label: data_reponse[index].nom_equipe,
              y: parseFloat(data_reponse[index].pourcentage.trim()),
              fait: data_reponse[index].fait,
              total_bilan: data_reponse[index].total_bilan
            });
          }
        });

        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "dark2", // "light1", "light2", "dark1", "dark2"
          title: {
            text: $("#supselect option:selected").text() + " BILAN 31/12/" + $("#aneselect").val()
          },
          subtitles: [
            {
              text: "BILAN",
              fontSize: 11
            }
          ],

          axisY: {
            minimum: 0,
            maximum: 100,
            suffix: "%"
          },
          data: [
            {
              type: "column",
              yValueFormatString: "##.##'%'",
              indexLabelPlacement: "inside",
              axisYType: "primary",
              legendText: "EVOLUTION",
              showInLegend: true,
              toolTipContent: "{label}: <strong>{y}</strong><br>Total : {total_bilan}<br>Fait : {fait}",
              dataPoints: listequi,
              indexLabel: "{y}"
            }
          ]
        });
        chart.render();
  }

  function chart_par_teletranms(data_reponse){
    var listequi = [];
        $.each(data_reponse.sort(function (a, b) {
          return a.pourcentage_trans - b.pourcentage_trans;
        }), function (index) {
          if (data_reponse[index].nom_equipe != "") {
            listequi.push({
              label: data_reponse[index].nom_equipe,
              y: parseFloat(data_reponse[index].pourcentage_trans.trim()),
              total_bilan_trans_fait: data_reponse[index].total_bilan_trans_fait,
              total_bilan_trans: data_reponse[index].total_bilan_trans
            });
          }
        });

        var chart = new CanvasJS.Chart("chartTeletransmission", {
          animationEnabled: true,
          theme: "dark2", // "light1", "light2", "dark1", "dark2"
          title: {
            text: $("#supselect option:selected").text() + " TELETRANSMISSION 31/12/" + $("#aneselect").val()
          },
          subtitles: [
            {
              text: "TELETRANSMISSION",
              fontSize: 11
            }
          ],

          axisY: {
            minimum: 0,
            maximum: 100,
            suffix: "%"
          },
          data: [
            {
              type: "column",
              yValueFormatString: "##.##'%'",
              indexLabelPlacement: "inside",
              axisYType: "primary",
              legendText: "EVOLUTION",
              showInLegend: true,
              toolTipContent: "{label}: <strong>{y}</strong><br>Total : {total_bilan_trans}<br>Fait : {total_bilan_trans_fait}",
              dataPoints: listequi,
              indexLabel: "{y}"
            }
          ]
        });
        chart.render();
  }

  function chart_par_validataion_edi(data_reponse){
    var listequi = [];
        $.each(data_reponse.sort(function (a, b) {
          return a.pourcentage_edi - b.pourcentage_edi;
        }), function (index) {
          if (data_reponse[index].nom_equipe != "") {
            if(data_reponse[index].total_bilan_v_edi_fait == data_reponse[index].total_bilan_v_edi && data_reponse[index].total_bilan_v_edi_fait != "0"){
              var pourcent = "100.00";
            }else{
              pourcent =  data_reponse[index].pourcentage_edi.trim();
            }
            listequi.push({
              label: data_reponse[index].nom_equipe,
              y: parseFloat(pourcent.trim()),
              total_bilan_v_edi_fait: data_reponse[index].total_bilan_v_edi_fait,
              total_bilan_v_edi: data_reponse[index].total_bilan_v_edi
            });
          }
        });

        var chart = new CanvasJS.Chart("chartvalidationedi", {
          animationEnabled: true,
          theme: "dark2", // "light1", "light2", "dark1", "dark2"
          title: {
            text: $("#supselect option:selected").text() + " VALIDATION EDI 31/12/" + $("#aneselect").val()
          },
          subtitles: [
            {
              text: "VALIDATION EDI",
              fontSize: 11
            }
          ],

          axisY: {
            minimum: 0,
            maximum: 100,
            suffix: "%"
          },
          data: [
            {
              type: "column",
              yValueFormatString: "##.##'%'",
              indexLabelPlacement: "inside",
              axisYType: "primary",
              legendText: "EVOLUTION",
              showInLegend: true,
              toolTipContent: "{label}: <strong>{y}</strong><br>Total : {total_bilan_v_edi}<br>Fait : {total_bilan_v_edi_fait}",
              dataPoints: listequi,
              indexLabel: "{y}"
            }
          ]
        });
        chart.render();
        
  }



  $(document).on("click", ".imprime", function () {
    window.print();
  });

  $(document).on("click", "#click_parsup", function () {
    $("#optio_critere").html($(this).html());
    $(".par_sup").show(60);
    $(".par_Equipe,.par_gestionEquipe,#tbody_gevo,.par_evo").hide(60);
  });

  $(document).on("click", "#click_parequip", function () {
    $("#optio_critere").html($(this).html());
    $(".par_Equipe, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip").show(60);
    $(".par_sup,.validgraphsup_parcdm,#head_parcdm,#tbody_parcdm,#tbody_gestion_equipe,.par_gestionEquipe,.par_evo,#tbody_gevo").hide(60);
  });

  $(document).on("click", "#gestion_equipe", function () {
    $("#optio_critere").html($(this).html());
    $('#tbody_gestion_equipe,.par_gestionEquipe').show(60)
    $(".par_Equipe, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip").hide(60);
    $(".par_sup,.validgraphsup_parcdm,#head_parcdm,#tbody_parcdm,.par_evo,#tbody_gevo").hide(60);
  });

  $(document).on("click", "#click_evolu", function () {
    $("#optio_critere").html($(this).html());
    $('#tbody_gevo,.par_evo').show(60)
    $(".par_Equipe, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip,#tbody_gestion_equipe").hide(60);
    $(".par_sup,.validgraphsup_parcdm,#head_parcdm,#tbody_parcdm,.par_gestionEquipe").hide(60);
  });

  

  $(document).on("click", "#click_parcdm", function () {
    $("#optio_critere").html($(this).html());
    $(".par_Equipe, .validgraphsup_parcdm,#head_parcdm,#tbody_parcdm").show(60);
    $(".par_sup, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip,#tbody_gestion_equipe,.par_gestionEquipe,#tbody_gevo,.par_evo").hide(60);
  });

  $(document).on("click", "#reporting_social", function () {
    $('#tbody_gestion_equipe').hide(20);
    lance_cout_detail("button");
    $('#tbody_gestion_equipe').show(100);
  });

  $(document).on("click", "#lance_detail_sx,.total_dossier_select", function () {
    if(parseInt($('.total_dossier_select').html()) > 0){
      lance_cout_detail("modal");
      document.getElementById('id01').style.display='block';
    }else{
      return;
    }
  });

  $(document).on("change", "#select_evo", function () {
    $('.anne_select').html($(this).val());
    $.ajax({
      url:'route.php',
      type:'POST',
      dataType:'json',
      data:{
        param:'envoieannee',
        annee:$('#select_evo').val()

      },
      success:function(data){
        console.log(data);

        for(var x = 0; x < $('.anne_select').length; x++){
          if( parseInt(data[x]["nbcde"][0][0]) > 0){
            $(".anne_select:eq("+x+")").closest("tr").find('.col2').html("<a href='#' class='dt_nb'>" +data[x]["nbcde"][0][0] + "</a>");
          }else{
            $(".anne_select:eq("+x+")").closest("tr").find('.col2').html(0);
          }          
        }

        for(var z = 0; z < $('.entrer_user').length; z++){
          $(".entrer_user:eq("+z+")").closest("tr").find('.col2').html("<a href='#' class='dt_nb'>" +data[z].entrerenbcde + "</a>");          
        }

        for(var z = 0; z < $('.sortie_user').length; z++){
          $(".sortie_user:eq("+z+")").closest("tr").find('.col2').html("<a href='#' class='dt_nb'>" +data[z].srotieenbcde +"</a>");          
        }

        for(var z = 0; z < $('.variation_user').length; z++){
          $(".variation_user:eq("+z+")").closest("tr").find('.col2').html("<i style='color:red'>" +("<b>" + (data[z].entrerenbcde - data[z].srotieenbcde)) + "</i></b>");          
        }

        //---------------------------cdm------------------

        for(var x = 0; x < $('.anne_select').length; x++){
          if( parseInt(data[x]["nbcde"][0][0]) > 0){
            $(".anne_select:eq("+x+")").closest("tr").find('.col3').html("<a href='#' class='dt_nb'>" + data[x]["nbcdm"][0][0] + "</a>");
          }else{
            $(".anne_select:eq("+x+")").closest("tr").find('.col3').html(0);
          }          
        }

        for(var z = 0; z < $('.entrer_user').length; z++){
          $(".entrer_user:eq("+z+")").closest("tr").find('.col3').html( "<a href='#' class='dt_nb'>" +data[z].entrerenbcdm + "</a>");          
        }

        for(var z = 0; z < $('.sortie_user').length; z++){
          $(".sortie_user:eq("+z+")").closest("tr").find('.col3').html("<a href='#' class='dt_nb'>" + data[z].srotieenbcdm + "</a>");          
        }

        for(var z = 0; z < $('.variation_user').length; z++){
          $(".variation_user:eq("+z+")").closest("tr").find('.col3').html("<i style='color:red'>" +( "<b>" + (data[z].entrerenbcdm - data[z].srotieenbcdm)) + "</i></b>");          
        }
        

        
        //---------------------------ass------------------

        for(var x = 0; x < $('.anne_select').length; x++){
          if( parseInt(data[x]["nbcde"][0][0]) > 0){
            $(".anne_select:eq("+x+")").closest("tr").find('.col4').html( "<a href='#' class='dt_nb'>" +data[x]["nbass"][0][0] + "</a>");
          }else{
            $(".anne_select:eq("+x+")").closest("tr").find('.col4').html(0);
          }          
        }

        for(var z = 0; z < $('.entrer_user').length; z++){
          $(".entrer_user:eq("+z+")").closest("tr").find('.col4').html("<a href='#' class='dt_nb'>" + data[z].entrerenbass +"</a>");          
        }

        for(var z = 0; z < $('.sortie_user').length; z++){
          $(".sortie_user:eq("+z+")").closest("tr").find('.col4').html("<a href='#' class='dt_nb'>" + data[z].srotieenbass+ "</a>");          
        }

        for(var z = 0; z < $('.variation_user').length; z++){
          $(".variation_user:eq("+z+")").closest("tr").find('.col4').html("<i style='color:red'>" +((data[z].entrerenbass - data[z].srotieenbass)) + "</i>");          
        }
        
        
      }
    })
  });
  
  $(document).on("click", ".dt_nb", function () {
    document.getElementsByClassName('id03')[0].style.display='block';
  })
  
  $(document).on("dblclick", ".niveau_etp", function () {
    return_id = "";
    var liste = "";
    for(var x = 1; x< 11; x++){
      liste += "<option value='"+x+"'>"+x+"</option>";
    }
    $(this).closest("th").html("<select class='change_etp'><option></option>"+liste+"</select>");
    return_id =  $(this).closest("tr").find(".recupere_id").html();
   
  });
  
  $(document).on("change", ".change_etp", function () {
    var valeur = $(this).val();
    $(this).closest("tr").find(".niveau_etp").html(valeur);

    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "_update_niveau_etp",
        id_user: return_id,
        niveau: $(this).val(),
      },
      success: function (data) {
       
      }
    });   

  });
  

  function lance_cout_detail(detection){
    var tete =     '<tr><th>Nom</th><th class="teteaff">Matricule</th><th style="text-align:center;color:red" >Nb dossier</th>'+
    '<th  style="text-align:center;color:red">Ancienneté ETP</th>'+
    '<th style="text-align:center;color:red">Niveau ETP</th></tr>';
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "lance_reporting",
        manager: $("#select_manager").val(),
        cdm_fr: $("#cdm_fr_select").val(),
        type_ma: $('#vehicle1').prop('checked'),
        dectect:detection,
      },
      success: function (data) {
        if(detection == "button"){
          $('#sup_k').html("");
          $("#table_ass_list,#table_cdm_list,#table_technique_list").html("");
          
          $('#sup_k').html(data[0]["nom_sup_mada"][0].nom);
          $('#mat_su').html(data[0]["nom_sup_mada"][0].prenom);
          
          var list_ass = "";
          var list_cdm = "";
          var list_cde = "";
          var list_ref = "";
        if(data[0]["total_dossier"].length > 0){
        $('.total_dossier_select').html(data[0]["total_dossier"][0].total_dossier)

        for(var t = 0; t < data[0]["nom_assistant"].length; t++){
          var anci = "";
          if(data[0]["nom_assistant"][t].ancienter != null){anci =  ("  "+ data[0]["nom_assistant"][t].ancienter / 12 | 0) + " ans  " + data[0]["nom_assistant"][t].ancienter % 12 +" mois";}
          list_ass += "<tr><th>"+data[0]["nom_assistant"][t].prenom_mail+"<th>"+data[0]["nom_assistant"][t].prenom+"</th><th class='id_ass recupere_id'>"+data[0]["nom_assistant"][t].id_ass+"</th><th class='click_dts'><b>" + data[0]["nom_assistant"][t].total + "</b></th><th>"+anci.replace("0 ans ","").replace(" 0 mois","")+"</th><th class='niveau_etp'>"+data[0]["nom_assistant"][t].niveau_etp+"</th></tr>"
        }
        $("#table_ass_list").html( tete + list_ass);


        for(var tt = 0; tt < data[0]["nom_cdm"].length; tt++){
          var anci = "";
          if(data[0]["nom_cdm"][tt].ancienter != null){anci =  ("  "+ data[0]["nom_cdm"][tt].ancienter / 12 | 0) + " ans  " + data[0]["nom_cdm"][tt].ancienter % 12 +" mois";}
          list_cdm += "<tr><th>"+data[0]["nom_cdm"][tt].prenom_mail+"<th>"+data[0]["nom_cdm"][tt].prenom+"</th><th class='id_cdm recupere_id'>"+data[0]["nom_cdm"][tt].id_cdm+"</th><th class='click_dts'><b>" + data[0]["nom_cdm"][tt].total + "</b></th><th>"+anci.replace("0 ans ","").replace(" 0 mois","")+"</th><th class='niveau_etp'>"+data[0]["nom_cdm"][tt].niveau_etp+"</th></tr>"
        }
        $("#table_cdm_list").html(tete + list_cdm);


        for(var ttt = 0; ttt < data[0]["nom_cde"].length; ttt++){
          var anci = "";
          if(data[0]["nom_cde"][ttt].ancienter != null){anci =  ("  "+ data[0]["nom_cde"][ttt].ancienter / 12 | 0) + " ans  " + data[0]["nom_cde"][ttt].ancienter % 12 +" mois";}          
          list_cde += "<tr><th>"+data[0]["nom_cde"][ttt].prenom_mail+"<th>"+data[0]["nom_cde"][ttt].prenom +"</th><th class='id_cde recupere_id'>"+data[0]["nom_cde"][ttt].id_cde+"</th><th class='click_dts'><b>" + data[0]["nom_cde"][ttt].total + "</b></th><th>"+anci.replace("0 ans ","").replace(" 0 mois","")+"</th><th class='niveau_etp'>"+data[0]["nom_cde"][ttt].niveau_etp+"</th></tr>"
        }
        $("#table_cde_list").html( tete + list_cde);

        for(var ttt = 0; ttt < data[0]["nom_ref"].length; ttt++){
          var anci = "";
          if(data[0]["nom_ref"][ttt].ancienter != null){anci =  ("  "+ data[0]["nom_ref"][ttt].ancienter / 12 | 0) + " ans  " + data[0]["nom_ref"][ttt].ancienter % 12 +" mois";}          
          list_ref += "<tr><th>"+data[0]["nom_ref"][ttt].prenom_mail+"<th>"+data[0]["nom_ref"][ttt].prenom +"</th><th class='id_ref recupere_id'>"+data[0]["nom_ref"][ttt].id_ref+"</th><th class='click_dts'><b>" + data[0]["nom_ref"][ttt].total + "</b></th><th>"+anci.replace("0 ans ","").replace(" 0 mois","")+"</th><th class='niveau_etp'>"+data[0]["nom_ref"][ttt].niveau_etp+"</th></tr>"
        }
        $("#table_technique_list").html( tete + list_ref);        


        }else{
          $('.total_dossier_select').html("0");
        }
      }else{
        $('#reponsemytable').html("");
        if(data[0]["total_dossier"].length >0){
          var mytable = "";
          for(var z = 0; z < data[0]["total_dossier"].length; z++){
            mytable += "<tr class='click_attrib'><td>"+ (z +1) +"</td><td class='id_dossier_'>"+data[0]["total_dossier"][z].id+"</td><td>"+ data[0]["total_dossier"][z].code + "</td>" + "<td>"+ data[0]["total_dossier"][z].nom + "</td>" + "<td>"+ data[0]["total_dossier"][z].idsituation_dossier + "</td>" + "<td>"+ data[0]["total_dossier"][z].date_cloturation + "</td>" + "<td>"+ data[0]["total_dossier"][z].etat_bilan + "</td></tr>"
          }
          $('#reponsemytable').html(mytable);
        }

      }
      }
    });    
  }


  $(document).on('click','.click_dts', function(){
    if($(this).closest("tr").find(".recupere_id").hasClass("id_ass") == true)
    {
      __lance_cout_detail("_ass",$(this).closest("tr").find(".recupere_id").html());
    }

    if($(this).closest("tr").find(".recupere_id").hasClass("id_cdm") == true)
    {
      __lance_cout_detail("_cdm",$(this).closest("tr").find(".recupere_id").html());
    }
    
    if($(this).closest("tr").find(".recupere_id").hasClass("id_cde") == true)
    {
      __lance_cout_detail("_cde",$(this).closest("tr").find(".recupere_id").html());
    }

    if($(this).closest("tr").find(".recupere_id").hasClass("id_ref") == true)
    {
      __lance_cout_detail("_ref",$(this).closest("tr").find(".recupere_id").html());
    }    
  })



  $(document).on('click','.click_attrib', function(){
    $('#doss_select').html("")
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "__attrib",
        iddossier: $(this).closest("tr").find(".id_dossier_").html(),
      },
      success: function (data) {
        if(data.length > 0){
          document.getElementsByClassName('id02')[0].style.display='block';
          $('#doss_select').html(data[0].nom_dsss)
          $('.nom_dd:eq(0)').html(data[0].nom_cde);
          $('.nom_dd:eq(1)').html(data[0].nom_rf);
          $('.nom_dd:eq(2)').html(data[0].nom_cdm);
          $('.nom_dd:eq(3)').html(data[0].nom_ass);
          $('.nom_dd:eq(4)').html(data[0].nom_mgr);
          $('.nom_dd:eq(5)').html(data[0].nom_cdmfr);

          $('.prenom_dd:eq(0)').html(data[0].matricule_cde);
          $('.prenom_dd:eq(1)').html(data[0].matricule_rf);
          $('.prenom_dd:eq(2)').html(data[0].matricule_cdm);
          $('.prenom_dd:eq(3)').html(data[0].matricule_ass);
          $('.prenom_dd:eq(4)').html(data[0].matricule_mgr);
          $('.prenom_dd:eq(5)').html(data[0].matricule_cdmfr);

          $('.mail_dd:eq(0)').html(data[0].mail_cde);
          $('.mail_dd:eq(1)').html(data[0].mail_rf);
          $('.mail_dd:eq(2)').html(data[0].mail_cdm);
          $('.mail_dd:eq(3)').html(data[0].mail_ass);
          $('.mail_dd:eq(4)').html(data[0].mail_mgr);
          $('.mail_dd:eq(5)').html(data[0].mail_cdmfr);          
          

        }
      }
    }); 
  })  

  function __lance_cout_detail(collab,id){
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "__det__click",
        manager: $("#select_manager").val(),
        cdm_fr: $("#cdm_fr_select").val(),
        type_ma: $('#vehicle1').prop('checked'),
        collab:collab,
        id:id
      },
      success: function (data) {
       console.log(data);
       if(data.length >0){
        var mytable = "";
        for(var z = 0; z < data.length; z++){
          mytable += "<tr class='click_attrib'><td>"+ (z +1) +"</td><td class='id_dossier_'>"+data[z].id+"</td><td>"+ data[z].code + "</td>" + "<td>"+ data[z].nom + "</td>" + "<td>"+ data[z].idsituation_dossier + "</td>" + "<td>"+ data[z].date_cloturation + "</td></tr>"
        }
        $('#reponsemytable').html(mytable);
        document.getElementById('id01').style.display='block';
      }
      }
    });    
  }

});
