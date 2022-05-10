$(function () {
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
        param: "selectsup",
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
    $(".par_Equipe").hide(60);
  });

  $(document).on("click", "#click_parequip", function () {
    $("#optio_critere").html($(this).html());
    $(".par_Equipe, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip").show(60);
    $(".par_sup,.validgraphsup_parcdm,#head_parcdm,#tbody_parcdm").hide(60);
  });

  $(document).on("click", "#click_parcdm", function () {
    $("#optio_critere").html($(this).html());
    $(".par_Equipe, .validgraphsup_parcdm,#head_parcdm,#tbody_parcdm").show(60);
    $(".par_sup, .validgraphsup_all_equipe,#head_parequipe,#tbody_parequip").hide(60);
  });
});
