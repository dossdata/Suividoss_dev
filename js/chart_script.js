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
    $(".par_Equipe,.par_gestionEquipe,#tbody_gevo,.par_evo,#parametragecd,.pfbref").hide(60);
  });

  $(document).on("click", "#click_parequip", function () {
    $("#optio_critere").html($(this).html());
    $(".par_Equipe, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip,.pfbref").show(60);
    $(".par_sup,.validgraphsup_parcdm,#head_parcdm,#tbody_parcdm,#tbody_gestion_equipe,.par_gestionEquipe,.par_evo,#tbody_gevo,#parametragecd").hide(60);
  });

  $(document).on("click", "#gestion_equipe", function () {
    $("#optio_critere").html($(this).html());
    $('#tbody_gestion_equipe,.par_gestionEquipe,.pfbref').show(60)
    $(".par_Equipe, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip").hide(60);
    $(".par_sup,.validgraphsup_parcdm,#head_parcdm,#tbody_parcdm,.par_evo,#tbody_gevo,#parametragecd").hide(60);
  });

  $(document).on("click", "#click_evolu", function () {
    $("#optio_critere").html($(this).html());
    $('#tbody_gevo,.par_evo,.pfbref').show(60)
    $(".par_Equipe, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip,#tbody_gestion_equipe").hide(60);
    $(".par_sup,.validgraphsup_parcdm,#head_parcdm,#tbody_parcdm,.par_gestionEquipe,#parametragecd").hide(60);
  });

  

  $(document).on("click", "#click_parcdm", function () {
    $("#optio_critere").html($(this).html());
    $(".par_Equipe, .validgraphsup_parcdm,#head_parcdm,#tbody_parcdm,.pfbref").show(60);
    $(".par_sup, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip,#tbody_gestion_equipe,.par_gestionEquipe,#tbody_gevo,.par_evo,#parametragecd").hide(60);
  });

  $(document).on("click", "#parametrage_cdm", function () {
    $("#parametragecd").show(60);
    $(".pfbref,.par_Equipe,.par_sup, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip,#tbody_gestion_equipe,.par_gestionEquipe,#tbody_gevo,.par_evo,#chartContainertableau").hide(60);
    for(var i = 1 ; i < 33 ; i++){
      $('.rep_' + i).html(0);
    }
    for(var x = 1; x < 9; x++){
      $('#srow' + x).html('0%')
    }
    $('#list_mana_bl_karlit').html("<tr><td colspan='20' style='font-size:18px;color:blue'>Chargement encours ........</td></tr>");
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "parametrage_cdm",

      },
      success: function (data) {
        var bilan_fait_karlit = data.bilan_fait_karlit;
        var revision = data.revision;
        var validation_ec = data.validation_ec;
        var envoie_client = data.envoie_client;
        var validation_client = data.validation_client;
        var validation_manager_fr = data.validation_manager_fr;
        var teletransmission = data.teletransmission;
        var control_edi = data.control_edi;
        
        var bilan_fait_karlit_list = "";
        var bfr = [0,0,0,0,0,0,0,0,0,0,0,0];
        var bft = [0,0,0,0,0,0,0,0,0,0,0];
        var prb = [0,0,0,0,0,0,0,0];
        var pdr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        try {
          
       
        for(var a = 0; a < bilan_fait_karlit.length; a++ ){
          $('#list_mana_bl_karlit').html("Chargement encours ....");
           if(a > 0){
             bfr[0] = parseInt(bfr[0]) + parseInt(bilan_fait_karlit[a - 1].total_bilan);            
             bft[0] = parseInt(bft[0]) + parseInt(bilan_fait_karlit[a - 1].fait); 
             prb[0] =   ((parseInt(bft[0]) * 100) /  parseInt(bfr[0])).toFixed(2) ;

             bfr[1] = parseInt(bfr[1]) + parseInt(revision[a - 1].total_bilan);            
             bft[1] = parseInt(bft[1]) + parseInt(revision[a - 1].fait); 
             prb[1] =   ((parseInt(bft[1]) * 100) /  parseInt(bfr[1])).toFixed(2) ;

             bfr[2] = parseInt(bfr[2]) + parseInt(validation_ec[a - 1].total_bilan);            
             bft[2] = parseInt(bft[2]) + parseInt(validation_ec[a - 1].fait); 
             prb[2] =   ((parseInt(bft[2]) * 100) /  parseInt(bfr[2])).toFixed(2) ;

             bfr[3] = parseInt(bfr[3]) + parseInt(envoie_client[a - 1].total_bilan);            
             bft[3] = parseInt(bft[3]) + parseInt(envoie_client[a - 1].fait); 
             prb[3] =   ((parseInt(bft[3]) * 100) /  parseInt(bfr[3])).toFixed(2) ;

             bfr[4] = parseInt(bfr[4]) + parseInt(validation_client[a - 1].total_bilan);            
             bft[4] = parseInt(bft[4]) + parseInt(validation_client[a - 1].fait); 
             prb[4] =   ((parseInt(bft[4]) * 100) /  parseInt(bfr[4])).toFixed(2) ;

             bfr[5] = parseInt(bfr[5]) + parseInt(validation_manager_fr[a - 1].total_bilan);            
             bft[5] = parseInt(bft[5]) + parseInt(validation_manager_fr[a - 1].fait); 
             prb[5] =   ((parseInt(bft[5]) * 100) /  parseInt(bfr[5])).toFixed(2) ;

             bfr[6] = parseInt(bfr[6]) + parseInt(teletransmission[a - 1].total_bilan);            
             bft[6] = parseInt(bft[6]) + parseInt(teletransmission[a - 1].fait); 
             prb[6] =   ((parseInt(bft[6]) * 100) /  parseInt(bfr[6])).toFixed(2) ;

             
             bfr[7] = parseInt(bfr[7]) + parseInt(control_edi[a - 1].total_bilan);            
             bft[7] = parseInt(bft[7]) + parseInt(control_edi[a - 1].fait); 
             prb[7] =   ((parseInt(bft[7]) * 100) /  parseInt(bfr[7])).toFixed(2) ;

       
             bft[8] = parseInt(bft[8]) + parseInt(control_edi[a - 1].fait); 

             pdr[0] = bfr[0];pdr[1] = bft[0];
             pdr[2] = bfr[1];pdr[3] = bft[1];
             pdr[4] = bfr[3];
             pdr[5] = bfr[4];
             pdr[6] = bfr[5];
             pdr[7] = bfr[6];
             pdr[8] = bfr[7];
             pdr[9] = bft[8];

             if(bilan_fait_karlit[a - 1].manager != bilan_fait_karlit[a].manager){
              //var d = dectetion == "bilan_fait_karlit" ? "<td colspan='2'>Total "+ bilan_fait_karlit[a].manager +"</td>" : null 
              bilan_fait_karlit_list += 
              ("<tr class='click_index'><td class='sticky-col first-col' style='background:#c4bfcd' colspan='2' > TOTAL "+bilan_fait_karlit[a-1].manager+
               "</td><td style='font-weight: bold;background:#e9e3f3' class='total_bilan_s'>"+ bfr[0] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_fait_s'>"+ bft[0] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3'>"+ (bfr[0] - bft[0]) +"</td>"+
               "<td style='color:red;background:#e9e3f3'>"+ prb[0] +" %</td>"+ 

               "<td style='font-weight: bold;background:#e9e3f3'>"+ bfr[1] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_fait_rev'>"+ bft[1] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3'>"+ (bfr[1] - bft[1]) +"</td>"+
               "<td style='color:red;background:#e9e3f3'>"+ prb[1] +" %</td>"+

               "<td style='font-weight: bold;background:#e9e3f3'>"+ bfr[2] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_vc_rev'>"+ bft[2] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3'>"+ (bfr[2] - bft[2]) +"</td>"+
               "<td style='color:red;background:#e9e3f3'>"+ prb[2] +" %</td>"+

               "<td style='font-weight: bold;background:#e9e3f3'>"+ bfr[3] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_ev_rev'>"+ bft[3] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3'>"+ (bfr[3] - bft[3]) +"</td>"+
               "<td style='color:red;background:#e9e3f3'>"+ prb[3] +" %</td>" +
               
               
               "<td style='font-weight: bold;background:#e9e3f3'>"+ bfr[4] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_cv_rev'>"+ bft[4] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3'>"+ (bfr[4] - bft[4]) +"</td>"+
               "<td style='color:red'>"+ prb[4] +" %</td>"+

               
               "<td style='font-weight: bold;background:#e9e3f3'>"+ bfr[5] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_mgr_rev'>"+ bft[5] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' >"+ (bfr[5] - bft[5]) +"</td>"+
               "<td style='color:red;background:#e9e3f3'>"+ prb[5] +" %</td>"+

               
               "<td style='font-weight: bold;background:#e9e3f3'>"+ bfr[6] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_tr_rev'>"+ bft[6] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3'>"+ (bfr[6] - bft[6]) +"</td>"+
               "<td style='color:red;background:#e9e3f3'>"+ prb[6] +" %</td>"+ 
               
               "<td style='font-weight: bold;background:#e9e3f3'>"+ bfr[7] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3' class='total_vi_rev'>"+ bft[7] +"</td>"+
               "<td style='font-weight: bold;background:#e9e3f3'>"+ (bfr[7] - bft[7]) +"</td>"+
               "<td style='color:red;background:#e9e3f3'>"+ prb[7] +" %</td></tr>");  
               bfr = [0,0,0,0,0,0,0,0,0,0,0];
               bft = [0,0,0,0,0,0,0,0,0,0,0];
               prb = [0,0,0,0,0,0,0,0,0,0,0];
             }
            }

          bilan_fait_karlit_list += 
          "<tr><td class='sticky-col first-col'>"+bilan_fait_karlit[a].manager+
          "</td><td>"+bilan_fait_karlit[a].code+
          "</td><td>"+bilan_fait_karlit[a].total_bilan+
          "</td><td>"+bilan_fait_karlit[a].fait+
          "</td><td>"+bilan_fait_karlit[a].restant+
          "</td><td style='color: #dc3545;'>"+bilan_fait_karlit[a].pourcent+

          " %</td><td>"+revision[a].total_bilan+
          "</td><td>"+revision[a].fait+
          "</td><td>"+revision[a].restant+
          "</td><td style='color: #dc3545;'>"+revision[a].pourcent+

          " %</td><td>"+validation_ec[a].total_bilan+
          "</td><td>"+validation_ec[a].fait+
          "</td><td>"+validation_ec[a].restant+
          "</td><td style='color: #dc3545;'>"+validation_ec[a].pourcent+

          " %</td><td>"+envoie_client[a].total_bilan+
          "</td><td>"+envoie_client[a].fait+
          "</td><td>"+envoie_client[a].restant+
          "</td><td style='color: #dc3545;'>"+envoie_client[a].pourcent+

          " %</td><td>"+validation_client[a].total_bilan+
          "</td><td>"+validation_client[a].fait+
          "</td><td>"+validation_client[a].restant+
          "</td><td style='color: #dc3545;'>"+validation_client[a].pourcent+

          " %</td><td>"+validation_manager_fr[a].total_bilan+
          "</td><td>"+validation_manager_fr[a].fait+
          "</td><td>"+validation_manager_fr[a].restant+
          "</td><td style='color: #dc3545;'>"+validation_manager_fr[a].pourcent+

          " %</td><td>"+teletransmission[a].total_bilan+
          "</td><td>"+teletransmission[a].fait+
          "</td><td>"+teletransmission[a].restant+
          "</td><td style='color: #dc3545;'>"+teletransmission[a].pourcent+  
          
          " %</td><td>"+control_edi[a].total_bilan+
          "</td><td>"+control_edi[a].fait+
          "</td><td>"+control_edi[a].restant+
          "</td><td style='color: #dc3545;'>"+control_edi[a].pourcent+           

          " %</td></tr>";
          
        }
      } catch (error) {
          
      }


        $('#list_mana_bl_karlit').html(bilan_fait_karlit_list);
        pdr[0] = pdr[0] + parseInt($('#list_mana_bl_karlit tr:last td:eq(2)').html());
        pdr[1] = pdr[1] + parseInt($('#list_mana_bl_karlit tr:last td:eq(3)').html());

        pdr[2] = pdr[2] + parseInt($('#list_mana_bl_karlit tr:last td:eq(6)').html());
        pdr[3] = pdr[3] + parseInt($('#list_mana_bl_karlit tr:last td:eq(7)').html());

        pdr[4] = pdr[4] + parseInt($('#list_mana_bl_karlit tr:last td:eq(10)').html());
        pdr[5] = pdr[5] + parseInt($('#list_mana_bl_karlit tr:last td:eq(11)').html());

        pdr[6] = pdr[6] + parseInt($('#list_mana_bl_karlit tr:last td:eq(22)').html());
        pdr[7] = pdr[7] + parseInt($('#list_mana_bl_karlit tr:last td:eq(23)').html());
        pdr[8] = pdr[8] + parseInt($('#list_mana_bl_karlit tr:last td:eq(30)').html());
        pdr[9] = pdr[9] + parseInt($('#list_mana_bl_karlit tr:last td:eq(31)').html());

        $('#sm8').append('<tr style="background:#c4bfcd" class="click_index"><td colspan="2" class="sticky-col first-col" style="background:#c4bfcd!important">TOTAL '+bilan_fait_karlit[a - 1].manager+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_bilan_s" >'+pdr[0]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_fait_s">'+pdr[1]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+ (parseInt(pdr[0]) - parseInt(pdr[1]))  + '</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[1]) * 100 ) / parseInt(pdr[0])).toFixed(2)  +' %</td>'+

            '<td style="background:#c4bfcd;font-weight: bold">'+pdr[2]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_fait_rev">'+pdr[3]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+ (parseInt(pdr[2]) - parseInt(pdr[3]))  + '</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[3]) * 100 ) / parseInt(pdr[2])).toFixed(2)  +' %</td>'+


            '<td style="background:#c4bfcd;font-weight: bold">'+pdr[3]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_vc_rev">'+pdr[4]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+(parseInt(pdr[3]) - parseInt(pdr[4]))+'</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[4]) * 100 ) / parseInt(pdr[3])).toFixed(2)  +' %</td>'+

            '<td style="background:#c4bfcd;font-weight: bold">'+pdr[4]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_ev_rev">'+pdr[5]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+(parseInt(pdr[4]) - parseInt(pdr[5]))+'</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[5]) * 100 ) / parseInt(pdr[4])).toFixed(2)  +' %</td>'+

            
            '<td style="background:#c4bfcd;font-weight: bold">'+pdr[5]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_cv_rev">'+pdr[6]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+(parseInt(pdr[5]) - parseInt(pdr[6]))+'</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[6]) * 100 ) / parseInt(pdr[5])).toFixed(2)  +' %</td>'+


            
            '<td style="background:#c4bfcd;font-weight: bold">'+pdr[6]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_mgr_rev">'+pdr[7]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+(parseInt(pdr[6]) - parseInt(pdr[7]))+'</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[7]) * 100 ) / parseInt(pdr[6])).toFixed(2)  +' %</td>'+

            '<td style="background:#c4bfcd;font-weight: bold">'+pdr[7]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_tr_rev">'+pdr[8]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+(parseInt(pdr[7]) - parseInt(pdr[8]))+'</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[8]) * 100 ) / parseInt(pdr[7])).toFixed(2)  +' %</td>'+

            '<td style="background:#c4bfcd;font-weight: bold">'+pdr[8]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold" class="total_vi_rev">'+pdr[9]+'</td>'+
            '<td style="background:#c4bfcd;font-weight: bold">'+(parseInt(pdr[8]) - parseInt(pdr[9]))+'</td>'+
            '<td style="color: #dc3545">'+ ((parseInt(pdr[9]) * 100 ) / parseInt(pdr[8])).toFixed(2)  +' %</td>'+
        '</tr>');
        //
        $('.total_bilan_s').each(function(aa,value){$('.rep_1').html( parseInt($('.rep_1').html()) + parseInt($(value).html()))});
        $('.total_fait_s').each(function(aa,value){$('.rep_2').html( parseInt($('.rep_2').html()) + parseInt($(value).html()))});
        $('.rep_3').html(parseInt($('.rep_1').html()) - parseInt($('.rep_2').html()));
        $('.rep_4').html( "<b style='color:red'>"  + ((parseInt($('.rep_2').html()) * 100) / parseInt($('.rep_1').html())).toFixed(2) + " %" + "</b>" )
        
        $('.rep_5').html($('.rep_2').html());
        $('.total_fait_rev').each(function(aa,value){$('.rep_6').html( parseInt($('.rep_6').html()) + parseInt($(value).html()))});
        $('.rep_7').html(parseInt($('.rep_5').html()) - parseInt($('.rep_6').html()));
        $('.rep_8').html( "<b style='color:red'>"  + ((parseInt($('.rep_6').html()) * 100) / parseInt($('.rep_5').html())).toFixed(2) + " %" + "</b>" )
      
        $('.rep_9').html($('.rep_6').html());
        $('.total_vc_rev').each(function(aa,value){$('.rep_10').html( parseInt($('.rep_10').html()) + parseInt($(value).html()))});
        $('.rep_11').html(parseInt($('.rep_9').html()) - parseInt($('.rep_10').html()));
        $('.rep_12').html( "<b style='color:red'>"  + ((parseInt($('.rep_10').html()) * 100) / parseInt($('.rep_9').html())).toFixed(2) + " %" + "</b>" )




        $('.rep_13').html($('.rep_10').html());
        $('.total_ev_rev').each(function(aa,value){$('.rep_14').html( parseInt($('.rep_14').html()) + parseInt($(value).html()))});
        $('.rep_15').html(parseInt($('.rep_13').html()) - parseInt($('.rep_14').html()));
        $('.rep_16').html( "<b style='color:red'>"  + ((parseInt($('.rep_14').html()) * 100) / parseInt($('.rep_13').html())).toFixed(2) + " %" + "</b>" )
        
        $('.rep_17').html($('.rep_14').html());
        $('.total_cv_rev').each(function(aa,value){$('.rep_18').html( parseInt($('.rep_18').html()) + parseInt($(value).html()))});
        $('.rep_19').html(parseInt($('.rep_17').html()) - parseInt($('.rep_18').html()));
        $('.rep_20').html( "<b style='color:red'>"  + ((parseInt($('.rep_18').html()) * 100) / parseInt($('.rep_17').html())).toFixed(2) + " %" + "</b>" )

        $('.rep_21').html(  $('.rep_18').html());
        $('.total_mgr_rev').each(function(aa,value){$('.rep_22').html( parseInt($('.rep_22').html()) + parseInt($(value).html()))});
        $('.rep_23').html(parseInt($('.rep_21').html()) - parseInt($('.rep_22').html()));
        $('.rep_24').html( "<b style='color:red'>"  + ((parseInt($('.rep_22').html()) * 100) / parseInt($('.rep_21').html())).toFixed(2) + " %" + "</b>" )
        

        $('.rep_25').html(  $('.rep_22').html());
        $('.total_tr_rev').each(function(aa,value){$('.rep_26').html( parseInt($('.rep_26').html()) + parseInt($(value).html()))});
        $('.rep_27').html(parseInt($('.rep_25').html()) - parseInt($('.rep_26').html()));
        $('.rep_28').html( "<b style='color:red'>"  + ((parseInt($('.rep_26').html()) * 100) / parseInt($('.rep_25').html())).toFixed(2) + " %" + "</b>" )
        

        $('.rep_29').html(  $('.rep_26').html());
        $('.total_vi_rev').each(function(aa,value){$('.rep_30').html( parseInt($('.rep_30').html()) + parseInt($(value).html()))});
        $('.rep_31').html(parseInt($('.rep_29').html()) - parseInt($('.rep_30').html()));
        $('.rep_32').html( "<b style='color:red'>"  + ((parseInt($('.rep_30').html()) * 100) / parseInt($('.rep_29').html())).toFixed(2) + " %" + "</b>" )


        $('#srow1').html($('.rep_4').html());
        $('#srow2').html( "<b style='color:red'>"  +  ((parseInt($('.rep_6').html()) / parseInt($('.rep_1').html())) * 100).toFixed(2) + " %" + "</b>");
        $('#srow3').html( "<b style='color:red'>"  +  ((parseInt($('.rep_10').html()) / parseInt($('.rep_1').html())) * 100).toFixed(2) + " %" + "</b>");
        $('#srow4').html( "<b style='color:red'>"  +  ((parseInt($('.rep_14').html()) / parseInt($('.rep_1').html())) * 100).toFixed(2) + " %" + "</b>");
        $('#srow5').html( "<b style='color:red'>"  +  ((parseInt($('.rep_18').html()) / parseInt($('.rep_1').html())) * 100).toFixed(2) + " %" + "</b>");
        $('#srow6').html( "<b style='color:red'>"  +  ((parseInt($('.rep_22').html()) / parseInt($('.rep_1').html())) * 100).toFixed(2) + " %" + "</b>");
        $('#srow7').html( "<b style='color:red'>"  +  ((parseInt($('.rep_26').html()) / parseInt($('.rep_1').html())) * 100).toFixed(2) + " %" + "</b>");
        $('#srow8').html( "<b style='color:red'>"  +  ((parseInt($('.rep_30').html()) / parseInt($('.rep_1').html())) * 100).toFixed(2) + " %" + "</b>");

        

      }

    });
      
  });

  

  $(document).on('click','.click_index td', function(){
        alert($(this).index());
  })

 

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
//        console.log(data);

        
        for(var x = 0; x < $('.anne_select').length; x++){
          if(data[x]["va_mens"].length > 0){
            $(".anne_select:eq("+x+")").closest("tr").find('.col1').html("<a href='#' class='' data=''>" + data[x]["va_mens"][0].total_dossier + "</a>");
          }else{
            $(".anne_select:eq("+x+")").closest("tr").find('.col1').html(0);
          }
               
        }

        for(var z = 0; z < $('.entrer_user').length; z++){
          $(".entrer_user:eq("+z+")").closest("tr").find('.col1').html("#NA");          
        }

        for(var z = 0; z < $('.sortie_user').length; z++){
          $(".sortie_user:eq("+z+")").closest("tr").find('.col1').html("#NA");          
        }

        for(var z = 0; z < $('.variation_user').length; z++){
          $(".variation_user:eq("+z+")").closest("tr").find('.col1').html("#NA");          
        }

        //---------------------------------------------

        for(var x = 0; x < $('.anne_select').length; x++){
          if( parseInt(data[x]["nbcde"][0][0]) > 0){
            $(".anne_select:eq("+x+")").closest("tr").find('.col2').html("<a href='#' class='dt_nb' data='9' data_s='1'>" +data[x]["nbcde"][0][0] + "</a>");
          }else{
            $(".anne_select:eq("+x+")").closest("tr").find('.col2').html(0);
          }          
        }

        for(var z = 0; z < $('.entrer_user').length; z++){
          $(".entrer_user:eq("+z+")").closest("tr").find('.col2').html("<a href='#' class='dt_nb' data='9' data_s='2'>" +data[z].entrerenbcde + "</a>");          
        }

        for(var z = 0; z < $('.sortie_user').length; z++){
          $(".sortie_user:eq("+z+")").closest("tr").find('.col2').html("<a href='#' class='dt_nb' data='9' data_s='3'>" +data[z].srotieenbcde +"</a>");          
        }

        for(var z = 0; z < $('.variation_user').length; z++){
          $(".variation_user:eq("+z+")").closest("tr").find('.col2').html("<i style='color:red'>" +("<b>" + (data[z].entrerenbcde - data[z].srotieenbcde)) + "</i></b>");          
        }

        //---------------------------cdm------------------

        for(var x = 0; x < $('.anne_select').length; x++){
          if( parseInt(data[x]["nbcdm"][0][0]) > 0){
            $(".anne_select:eq("+x+")").closest("tr").find('.col3').html("<a href='#' class='dt_nb' data='1' data_s='1'>" + data[x]["nbcdm"][0][0] + "</a>");
          }else{
            $(".anne_select:eq("+x+")").closest("tr").find('.col3').html(0);
          }          
        }

        for(var z = 0; z < $('.entrer_user').length; z++){
          $(".entrer_user:eq("+z+")").closest("tr").find('.col3').html( "<a href='#' class='dt_nb' data='1 data_s='2''>" +data[z].entrerenbcdm + "</a>");          
        }

        for(var z = 0; z < $('.sortie_user').length; z++){
          $(".sortie_user:eq("+z+")").closest("tr").find('.col3').html("<a href='#' class='dt_nb' data='1' data_s='3'>" + data[z].srotieenbcdm + "</a>");          
        }

        for(var z = 0; z < $('.variation_user').length; z++){
          $(".variation_user:eq("+z+")").closest("tr").find('.col3').html("<i style='color:red'>" +( "<b>" + (data[z].entrerenbcdm - data[z].srotieenbcdm)) + "</i></b>");          
        }
        

        
        //---------------------------ass------------------

        for(var x = 0; x < $('.anne_select').length; x++){
          if( parseInt(data[x]["nbass"][0][0]) > 0){
            $(".anne_select:eq("+x+")").closest("tr").find('.col4').html( "<a href='#' class='dt_nb' data='4' data_s='1'>" +data[x]["nbass"][0][0] + "</a>");
          }else{
            $(".anne_select:eq("+x+")").closest("tr").find('.col4').html(0);
          }          
        }

        for(var z = 0; z < $('.entrer_user').length; z++){
          $(".entrer_user:eq("+z+")").closest("tr").find('.col4').html("<a href='#' class='dt_nb' data='4' data_s='2'>" + data[z].entrerenbass +"</a>");          
        }

        for(var z = 0; z < $('.sortie_user').length; z++){
          $(".sortie_user:eq("+z+")").closest("tr").find('.col4').html("<a href='#' class='dt_nb' data='4' data_s='3'>" + data[z].srotieenbass+ "</a>");          
        }

        for(var z = 0; z < $('.variation_user').length; z++){
          $(".variation_user:eq("+z+")").closest("tr").find('.col4').html("<i style='color:red'>" +((data[z].entrerenbass - data[z].srotieenbass)) + "</i>");          
        }
        

               //--------------------------reference------------------

               for(var x = 0; x < $('.anne_select').length; x++){
                if( parseInt(data[x]["nbref"][0][0]) > 0){
                  $(".anne_select:eq("+x+")").closest("tr").find('.col5').html( "<a href='#' class='dt_nb' data='8' data_s='1'>" +data[x]["nbref"][0][0] + "</a>");
                }else{
                  $(".anne_select:eq("+x+")").closest("tr").find('.col5').html(0);
                }          
              }
      
              for(var z = 0; z < $('.entrer_user').length; z++){
                $(".entrer_user:eq("+z+")").closest("tr").find('.col5').html("<a href='#' class='dt_nb' data='8' data_s='2'>" + data[z].entrerenbref +"</a>");          
              }
      
              for(var z = 0; z < $('.sortie_user').length; z++){
                $(".sortie_user:eq("+z+")").closest("tr").find('.col5').html("<a href='#' class='dt_nb' data='8' data_s='3'>" + data[z].srotieenbref+ "</a>");          
              }
      
              for(var z = 0; z < $('.variation_user').length; z++){
                $(".variation_user:eq("+z+")").closest("tr").find('.col5').html("<i style='color:red'>" +((data[z].entrerenbref - data[z].srotieenbref)) + "</i>");          
              }
        
      }
    })
  });
  
  $(document).on("click", ".dt_nb", function () {
    document.getElementsByClassName('id03')[0].style.display='block';
    $.ajax({
      url: "route.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "select_an_post",
        metier:  $(this).closest("a").attr("data"),
        type_s: $(this).closest("a").attr("data_s"),
        aneselect:  $('#select_evo').val() + "-" + $(this).closest("tr").find(".date_rch").html()
      },
      success: function (data) {
        var tbodd = "";
       $('#sbod').html("");
        if(data.length > 0){
          for(var x =0; x<data.length; x++){
            var anci = ("  "+ data[x].ancienter / 12 | 0) + " ans  " + data[x].ancienter % 12 +" mois";            
            tbodd += "<tr><td>"+data[x].nom_mail+"</td><td>"+data[x].prenom_mail+"</td><td>"+data[x].prenom+"</td><td>"+anci.replace("0 ans ","").replace(" 0 mois","")+"</td><td>"+data[x].niveau_etp+"</td></tr>";
          }
          $('#sbod').html(tbodd);
          document.getElementsByClassName('id03')[0].style.display='block';
        }
        
      }
    });


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
