$(function () {
  function GetLastDayOfThisMonth(aa, mm) {
    var myDate = new Date(aa + "-" + mm + "-" + 01);
    var myMonth = myDate.setMonth(myDate.getMonth() + 1);
    var theDay = myDate.setDate(0);
    var lastDay = myDate.getDate();
    return lastDay;
}

    function date_format(date){
        var datev = date;
        var annee = datev.substring(6, 10);
        var mois = datev.substring(3, 5);
        var date_cloture = annee + "-" + mois;
        return date_cloture;
    }

//      $('.janvz').html(GetLastDayOfThisMonth($(this).val(), 1) + "/" + "01/" + $(this).val());

  var id_equipe = "";
  /*var tet_datatable = 
  '<table id="datatablesituation" class="table-bordered display text-center" width="100%">'+
  '<thead class="th_databale">'+
  '<tr>'+
  '<th>dossier</th><th>sit_dossier</th>'+
  '<th>cloture</th>'+
  '<th>frm_jrdq</th>'+
  '<th>etat_bl</th><th>dt_d_envoie_bl_krlt</th>'+
  '<th class="in_visible">id_situation</th>' +
  '<th class="in_visible">id_dossier</th>' +
  '<th class="1">TETE_ENCOURS1</th>' +
  '<th class="2">TETE_ENCOURS2</th>' +
  '<th class="3">TETE_ENCOURS3</th>' +
  '<th class="4">TETE_ENCOURS4</th>' +
  '<th class="5">TETE_ENCOURS5</th>' +
  '<th class="6">TETE_ENCOURS6</th>' +
  '<th class="7">TETE_ENCOURS7</th>' +
  '<th class="8">TETE_ENCOURS8</th>' +
  '<th class="9">TETE_ENCOURS9</th>' +
  '<th class="10">TETE_ENCOURS10</th>' +
  '</tr><thead><tbody>';*/
  
  
  $('.select2').select2(
    {
        placeholder: "......",
        width:120,
      }).on('change', function(e) {
        id_equipe =  $(".select2").val();
      })
    
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


  $(document).on("click", ".validgraphsup_all_equipe", function () {
  
  });

  $(document).on("click", ".validgraphsup_parcdm", function () {
  
  });

  $(document).on('dblclick',".tr_list_general", function(){
    var index = $(this).index();
    //$('.tr_list_general:eq('+index+') > td:eq(0)').click();
    $('#modif_juridique').modal('show');
    return;
});

  $(document).on("click", ".graphsup", function () {
    $('#datatable_situation').html("");
    var cloture =  $("#aneselect").val() + "-"  + $('#select_mm').val();
  /*
      $('#loading').show();
            $.ajax({
              url: "route_Situation_portfeuille.php",
              type: 'POST',
              dataType:'json',
              data: {
                  param:"juridique_gloabl",
                  date_bilan: cloture,
              },
              success: function(data) {
                var corp = "";

              },
          });*/

    
    /*$('#loading').show();
      $.ajax({
        url: "route_Situation_portfeuille.php",
        type: 'POST',
        dataType:'json',
        data: {
            param:"list_general_juridique",
            id: id_equipe,
            annee: $("#aneselect").val(),
            mois: $('#select_mm').val(),
        },
        success: function(data) {
            $('#datatablesituation').DataTable().clear().destroy(); 
            valeur = "";
            valeur_virtuel = "";
            for(var i = 0; i < data.length; i++){
                valeur += "<tr class='tr_list_general'>"+
                "<td class='ndoss' style='white-space:nowrap'>" + data[i].dossier + "</td><td style='white-space:nowrap'>" + data[i].sit_dossier + "</td><td style='white-space:nowrap'>" + data[i].cloture + "</td></td>"+
                "<td style='white-space:nowrap'>" + data[i].frm_jrdq + "</td></td></td>"+
                "</td><td style='white-space:nowrap'>" + data[i].etat_bl +  "</td></td><td>" + data[i].dt_d_envoie_bl_krlt +  "</td></td>"+
                "<td class='situation_portfeuil_id in_visible'>"+data[i].situation_portfeuil_id+"</td>"+
                "<td class='id_dossier in_visible'>"+data[i].id_dossier+"</td>"+ 
                "<td class='1'>................champ encours</td>" +
                "<td class='2'>................champ encours</th>" +
                "<td class='3'>................champ encours</th>" +
                "<td class='4'>................champ encours</td>" +
                "<td class='5'>................champ encours</td>" +
                "<td class='6'>................champ encours</td>" +
                "<td class='7'>................champ encours</td>" +
                "<td class='8'>................champ encours</td>" +
                "<td class='9'>................champ encours</td>" +
                "<td class='10'>................champ encours</td>" +
                "</tr>";

                valeur = valeur.replace(/null/g,"").replace(/ 00:00:00/g,"");
            }
            
            $('#datatable_situation').html("<div style='color:red'> ============> Double click pour modifier</div>"+
                tet_datatable + valeur + "</tbody></table>");
            $('#datatable_situation').css({'zoom':'80%'});
            datatable();
            $('#datatable_situation thead:eq(1)').html("");   
            $('#datatablesituation_wrapper').show(300);
            $('#ds_export').show(300);
            $('#loading').hide();
            $('#datatablesituation_filter').hide();

        },
    });*/
  });

  function datatable(){
    // Setup - add a text input to each footer cell
    $('#datatablesituation thead tr').clone(true).appendTo( '#datatablesituation thead' );
    $('#datatablesituation thead tr:eq(1) th').each( function (i) {
        var title = $(this).text();
        $(this).html( '' );
         if (i == 0) $(this).html('<input type="text" class="txtserach"/>');
 
        $( '.txtserach,.stsearch', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                    table
                    .column(i)
                    .search( this.value )
                    .draw();
                
            }

        });
    } );
    var table = $('#datatablesituation').DataTable( {
      orderCellsTop: true,
      scrollY:        parseInt($(window).height()) - (parseInt($(window).height()) / 2.5),
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
      }
  } );

  }

  $(document).on('change', '#aneselectglobal', function(){
    $('.cloture').each(function(index){
      $(this).html(GetLastDayOfThisMonth($('#aneselectglobal').val(), (index + 1)<10?"0"+ (index + 1):(index + 1)) + "/" + ((index + 1)<10?"0"+ (index + 1):(index + 1)) + "/" + $('#aneselectglobal').val());
      $('.cloture_non_appli:eq('+index+')').html(GetLastDayOfThisMonth($('#aneselectglobal').val(), (index + 1)<10?"0"+ (index + 1):(index + 1)) + "/" + ((index + 1)<10?"0"+ (index + 1):(index + 1)) + "/" + $('#aneselectglobal').val());
      $('.cloture_offre:eq('+index+')').html(GetLastDayOfThisMonth($('#aneselectglobal').val(), (index + 1)<10?"0"+ (index + 1):(index + 1)) + "/" + ((index + 1)<10?"0"+ (index + 1):(index + 1)) + "/" + $('#aneselectglobal').val());     
    })
      selectglobal($(this).val());
  })

function selectglobal(annee){
  $('.off_default').html("0");
    $('#loading').show();
        $.ajax({
          url: "route_Situation_portfeuille.php",
          type: 'POST',
          dataType:'json',
          data: {
              param:"juridique_gloabl",
              date_bilan: annee,
          },
          success: function(data) {
            for(var i = 0; i < data.length ; i++){
              $('.dr_reviser:eq('+i+')').html(data[i].dr_reviser);
              $('.applicable:eq('+i+')').html(data[i].applicable);
              $('.appli_fait:eq('+i+')').html(data[i].applicable_fait);              
              $('.appli_restant:eq('+i+')').html(data[i].applicable - data[i].applicable_fait);

              if(data[i].applicable_fait > 0 ){
                $('.appli_pourcent:eq(' + i +')').html( ((data[i].applicable_fait * 100) / data[i].applicable).toFixed(2) + " %" );
              }else{
                  $('.appli_pourcent:eq(' + i +')').html( "0.00 %" );
              }



              $('.non_applicable_affaire:eq('+i+')').html(data[i].nomappli);  
              $('.non_applicable_fait:eq('+i+')').html(data[i].fait_nomapppli);  
              $('.non_applicable_restant:eq('+i+')').html(data[i].nomappli - data[i].fait_nomapppli);  

              if(data[i].fait_nomapppli > 0 ){
                $('.non_applicable_pourcent:eq(' + i +')').html( ((data[i].fait_nomapppli * 100) / data[i].nomappli).toFixed(2) + " %" );
              }else{
                  $('.non_applicable_pourcent:eq(' + i +')').html( "0.00 %" );
              }



              if(data[i].resultat_offre.length > 0){
                for(var x =0; x < data[i].resultat_offre.length; x++ ){
                    if(data[i].resultat_offre[x].offre == "A VENDRE"){
                      $('.a_vendre:eq('+i+')').html((data[i].resultat_offre[x].nombre));
                    }
                    if(data[i].resultat_offre[x].offre == "KEOBIZ"){
                      $('.keobiz:eq('+i+')').html((data[i].resultat_offre[x].nombre));
                    }
                    if(data[i].resultat_offre[x].offre == "SERENITE"){
                      $('.serenite:eq('+i+')').html((data[i].resultat_offre[x].nombre));
                    }
                    if(data[i].resultat_offre[x].offre == "HORIZON"){
                      $('.horizon:eq('+i+')').html((data[i].resultat_offre[x].nombre));
                    }
                    if(data[i].resultat_offre[x].offre == "INCLUS"){
                      $('.inclus:eq('+i+')').html((data[i].resultat_offre[x].nombre));
                    }
                    if(data[i].resultat_offre[x].offre == "OPTION"){
                      $('.option:eq('+i+')').html((data[i].resultat_offre[x].nombre));
                    }
                }
              }
              
            }
            $('#loading').hide();
          },
      })
  }


  $(document).on("click", "#click_parsup", function () {
    $("#optio_critere").html($(this).html());
    $(".par_sup").show(60);
    $(".par_Equipe").hide(60);
  });

  $(document).on("click", ".applicable", function () {
    var date_bl = $(this).closest('tr').find('.cloture').html();
    listapplicable(date_format(date_bl),"click_affaire_applicable_affaire","","");
  });

  
  $(document).on("click", ".non_applicable_affaire", function () {
    var date_bl = $(this).closest('tr').find('.cloture_non_appli').html();
    listapplicable(date_format(date_bl),"click_affaire_non_applicable","","");
  });  

  $(document).on("click", ".appli_fait", function () {
    var date_bl = $(this).closest('tr').find('.cloture').html();
    listapplicable(date_format(date_bl),"click_fait__applicable","editable","data-toggle='modal' data-target='#modif'");
  });  
  

$(document).on("click", ".dr_reviser", function () {
    var date_bl = $(this).closest('tr').find('.cloture_offre').html();
    listapplicable(date_format(date_bl),"click_offre","","");
  });  


  $(document).on("click", ".appli_restant", function () {
    var date_bl = $(this).closest('tr').find('.cloture').html();
    listapplicable(date_format(date_bl),"click_affaire_applicable","editable","data-toggle='modal' data-target='#modif'");
  });  

  $(document).on("click", ".non_applicable_restant", function () {
    var date_bl = $(this).closest('tr').find('.cloture_non_appli').html();
    listapplicable(date_format(date_bl),"click_restant_applicable","editable","data-toggle='modal' data-target='#modif'");
  });  

  $(document).on("click", ".non_applicable_fait", function () {
    var date_bl = $(this).closest('tr').find('.cloture_non_appli').html();
    listapplicable(date_format(date_bl),"click_fait_nonapplicable","editable","data-toggle='modal' data-target='#modif'");
  });  
  
  

  $(document).on("click", ".editable", function () {
    var id = $(this).closest('tr').find('.id_st').html();
    //alert(id);
  });  
  
  

  function listapplicable(annee,condition,editable,modal){
    $('#corp_click_affaire').html("");
        $.ajax({
          url: "route_Situation_portfeuille.php",
          type: 'POST',
          dataType:'json',
          data: {
              param:"juridique_gloabl_applicable_click",
              date_bilan:annee,
              condition:condition
          },
          success: function(data) {
            var corp ="";
            var variable = "";
            var variable2 = "";
           
            if( condition == "click_fait_nonapplicable"){ variable= data[0].nonapplicable.length;variable2 = data[0].nonapplicable; }
            if( condition == "click_restant_applicable"){ variable= data[0].nonapplicable.length;variable2 = data[0].nonapplicable; }
            if( condition == "click_fait__applicable"){ variable= data[0].applicable.length;variable2 = data[0].applicable; }
            if( condition == "click_affaire_applicable_affaire"){ variable= data[0].applicable.length;variable2 = data[0].applicable; }
            if( condition == "click_affaire_applicable"){ variable= data[0].applicable.length;variable2 = data[0].applicable; }
            if( condition == "click_affaire_non_applicable"){ variable= data[0].nonapplicable.length;variable2 = data[0].nonapplicable;}
            if( condition == "click_offre"){variable=data[0].resultat_offre.length;variable2 = data[0].resultat_offre;}
              for(var i = 0; i < variable ; i++){
                corp += "<tr class='"+editable+"'" + modal + " >"+
                "<td class='id_st' style='display:none'>"+variable2[i].id_situation+"</td>"+
                "<td>"+variable2[i].code+"</td>"+
                "<td>"+variable2[i].nomdossier+"</td>"+
                "<td>"+variable2[i].date_cloturation+"</td>"+
                "<td>"+variable2[i].idsituation_dossier+"</td>"+
                "<td>"+variable2[i].date_envoie_bilan_karlit+"</td>"+
                "</tr>";
            }
            $('#corp_click_affaire').html(corp);
          },
      })
  }

  

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
