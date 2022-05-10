$(function () {
  //$('#ajout_envoie').hide();
  //#precompta_assd
  //variable prepa --------------------------x------------
  var envoie_p_m = "";
  var nombre_image = "";
  var serveur_m = "";
  var imag_deb_m = "";
  var imag_fin_m = "";
  var date_prep_tr = "";
  var dt_renvtrie = "";
  // ------------
  var valeur = "";
  var id_envoie = "";
  var index_click = -1;
  var image_debut = "";
  var image_fin = "";
  var tbooody = "";
  var tet_datatable_echange = '<table id="echange_p" class="table-bordered display text-center" width="100%" style="border-collapse: collapse;border: 10px solid #c7c5a0;border-radius: 1px 0 3px 4px">' + '<thead class="th_databale">' + "<tr>" + '<th class="" colspan="9">PREPARATION <div style="text-align:left!important"><button class="btn-info" id="btn-ajout_enoive"><i class="fas fa-plus-circle"></i>&nbsp;Nouveau envoie</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn-default" id="btn-rafraichir_recap"><i class="fas fa-plus-circle"></i>&nbsp;RAFRAICHIR</button></div>' + '<div class="input-group md-form form-sm form-1 pl-0">' + '<div class="input-group-prepend">' + '<span class="input-group-text purple lighten-3" id="basic-text1"><i class="fas fa-search text-white"' + 'aria-hidden="true"></i></span>' + "</div>" + '<input class="form-control my-0 py-1" type="text" id="txt_recherche_piece" placeholder="Recherche piece....." aria-label="Search">' + "</div>" + "</th>" + '<th class="" colspan="2">PRECOMPTA</th>' + '<th class="" colspan="2">REVISEUR PRECOMPTA</th>' + '<th class="" colspan="2">ASSISTANT</th>' + '<th class="" colspan="2">CHEF DE MISSION</th>' + '<th class="" colspan="2">TRIAGE</th>' + "</tr>" + '<th class="in_visible ">id</th>' + '<th class="">#</th>' + '<th class="">recap</th>' + '<th class="">Nom_envoies</th>' + '<th class="">Nombre d\'Images</th>' + '<th class="">SERVEUR</th>' + '<th class="">image_debut</th>' + '<th class="">image_fin</th>' + '<th class="">Date_trait</th>' + '<th class="">Nom_PREPA</th>' + '<th class="">Nom_OS</th>' + '<th class="">date_trait</th>' + '<th class="">Nom_revision_OS</th>' + '<th class="">date_trait</th>' + '<th class="">Nom_ASS</th>' + '<th class="">date_trait_ass</th>' + '<th class="">Nom_CDM</th>' + '<th class="">date_trait_cdm</th>' + '<th class="">Nom_tri</th>' + '<th class="">Date_triage</th>' + "</tr>" + '<tbody style="background: #343d4a;color:white;zoom:80%">';

  $("#corps_echange").html(tet_datatable_echange + valeur + "</tbody></table>");
  $(document).on("click", "#ajout_envoi_recap", function () {
    if ($("#txt_envoie").val() == "" || $("#serveur_select").val() == "" || $("#txta1").val() == "" || $("#txta2").val() == "") {
      alert("Attention Critère incomplete ! \n les champs ne doivent pas être vide ! ");
      return;
    }

    $.ajax({
      url: "route_Situation_portfeuille.php",
      type: "POST",
      data: {
        param: "ajout_envoi_recap",
        id_dossier: $("#dossier_id_voalcick").html(),
        txt_envoie: $("#txt_envoie").val(),
        serveur_select: $("#serveur_select").val(),
        nombre_images: $("#total_image_nb").html(),
        image_debut: image_debut,
        image_fin: image_fin,
        recap_envoie: "<table id='export_recap'><tbody>" + tbooody + "</tbody></table>",
        login: $("#nom_utilisateur").html()
      },
      success: function (data) {
        if (data == "ok") {
          $(".anulle-enoive").click();
          $("#btn-rafraichir_recap").click();
        }
      }
    });
  });

  $(document).on("click", ".allrecap", function () {
    var valeur_id = $(this).closest("tr").find(".id_envoie").html();
    $(".nom_envoie").html("nom envoie : " + $(".alltr_recap:eq(" + index_click + ")").find(".envoie_m").html());

    $.ajax({
      url: "route_Situation_portfeuille.php",
      type: "POST",
      dataType: "Json",
      data: {
        param: "tableau_recap",
        id_envoie: valeur_id
      },
      success: function (data) {
        $("#consultation_recap").html(data.list_recap_envoie);
      }
    });
  });

  $(document).on("click", "#suprimerenoive", function () {
    if ($("#mdpsupre").val() != "$KdV%") {
      alert("Mot de passe incorrect ! ");
      return;
    }

    $.ajax({
      url: "route_Situation_portfeuille.php",
      type: "POST",
      data: {
        param: "delete_envoie",
        id_envoie: id_envoie
      },
      success: function (data) {
        $("#btn-rafraichir_recap").click();
        $("#returnsprm").click();
      }
    });
  });

  $(document).on("click", "#btn-rafraichir_recap", function () {
    var recheche_piece = $("#txt_recherche_piece").val();
    $("#lo").show();
    $.ajax({
      url: "route_Situation_portfeuille.php",
      type: "POST",
      dataType: "json",
      data: {
        param: "recupere_recap",
        id_dossier: $("#dossier_id_voalcick").html(),
        recheche_piece: recheche_piece
      },
      success: function (data) {
        valeur = "";
        for (var i = 0; i < data.length; i++) {
          valeur += "<tr class='alltr_recap'><td class='in_visible id_envoie'>" + data[i].id + "</td>" + "<td style='background:red' class='allrecap supr_envoie_style' data-toggle='modal' data-target='#delete_envoie' data-backdrop='static' data-keyboard='false'><i class='fas fa-trash-alt'></i></td>" + "<td class='allrecap' data-toggle='modal' data-target='#recap_modal_envoie' data-backdrop='static' data-keyboard='false'><i class='fas fa-book-open'></i>&nbsp;<i class='fas fa-pen-alt click_recap'></i></td>" + "<td class='envoie_m'>" + data[i].nom_envoies + "</td><td class='myclass_prepa disabled_as nb_image_m'><input type='number' value='" + data[i].nombre_images + "'></td><td class='serveur_m'>" + data[i].serveur + "</td>" + "<td class='myclass_prepa disabled_as imag_deb_m'><input type='text' value='" + data[i].image_debut + "'></td><td class='myclass_prepa disabled_as imag_fin_m'><input type='text' value='" + data[i].image_fin + "'></td>" + "<td class='myclass_prepa disabled_as date_prep_tr'><input type='date' value='" + data[i].date_prepa_trait + "'></td><td class='resp_recp'>" + data[i].responsable_reception + "</td><td class='res_os'>" + data[i].nom_precompta + "</td>" + "<td class='myclass_os disabled_as date_os'><input type='date' value='" + data[i].date_debut_trait_pr + "'></td>" + "<td class='resp_revi_precompta'>" + data[i].nom_revision_precompta + "</td><td class='myclass_rev disabled_as date_revi_precompta'><input type='date' value='" + data[i].date_debut_trait_rev + "'></td>" + "<td class='res_assistant'>" + data[i].nom_assistant + "</td><td class='myclass_as disabled_as date_asst'><input type='date' value='" + data[i].date_debut_trait_ass + "'></td>" + "<td class='res_cdm'>" + data[i].nom_cdm + "</td><td class='myclass_cdm disabled_as date_cdm'><input type='date' value='" + data[i].date_debut_trait_cdm + "'></td><td class='responsable_tri'>" + data[i].responsable_tri + "</td><td class='myclass_prepa disabled_as m_trim dt_renvtrie'><input type='date' value='" + data[i].date_renvoie_tri + "'></td></td>" + "</tr>";
        }
        $("#corps_echange").html(tet_datatable_echange + valeur.replace(/null/g, "") + "</tbody></table>");
        $(".color_prepa").css({background: "#f7e7e7"});
        $(".edit_precomp").css({background: "rgb(160 223 200)"});
        $(".edit_rev").css({background: "rgb(241 234 188)"});
        $(".edit_ass").css({background: "#b9d3ff"});
        $(".edit_cdm").css({background: "#ffb0be"});
        $(".closeXY").show();
        $("#scroll_tiana_s").css({
          height: parseInt($(window).height())
        });
        $("#scroll_tiana_s").css({
          width: parseInt($(window).width())
        });
        $("#lo").hide();

        if ($("#nom_poste_select").html().trim() == "PREPA" || $("#nom_poste_select").html() == "CHEF PREPA") {
          $(".myclass_prepa").removeClass("disabled_as");
        }

        if ($("#nom_poste_select").html().trim() == "PRE-COMPTA") {
          $(".myclass_os").removeClass("disabled_as");
        }
        if ($("#nom_poste_select").html().trim() == "ASSISTANT") {
          $(".myclass_as").removeClass("disabled_as");
        }

        if ($("#nom_poste_select").html().trim() == "REVISEUR PRE-COMPTA" || $("#nom_poste_select").html().trim() == "REVISEUR") {
          $(".myclass_rev").removeClass("disabled_as");
        }

        if ($("#nom_poste_select").html().trim() == "CDM") {
          $(".myclass_cdm").removeClass("disabled_as");
        }

        if ($("#nom_poste_select").html() == "CHEF PREPA" || $("#nom_poste_select").html() == "PREPA" || $("#nom_poste_select").html() == "SUPERVISEUR" || $("#nom_poste_select").html() == "MANAGER") {
          $("#btn-ajout_enoive").show();
        } else {
          $("#btn-ajout_enoive").hide();
        }
        $("#txt_recherche_piece").val(recheche_piece);
        return;
      }
    });
  });

  function data_table(nom) {
    $("#" + nom + " thead tr").clone(true).appendTo("#" + nom + " thead");
    $("#" + nom + " thead tr:eq(1) th").each(function (i) {
      var title = $(this).text();
      if (nom != "echange_envoie_p") {
        $(this).html('<input type="text" class="txtechancherecherche"/>');
      } else {
        $(this).html("");
      }

      $(".txtechancherecherche", this).on("keyup change", function () {
        if (table.column(i).search() !== this.value) {
          table.column(i).search(this.value).draw();
        }
      });
    });

    var table = $("#" + nom + "").DataTable({
      orderCellsTop: true,
      scrollY: screen.height / 2,
      scrollX: screen.width * 9,
      deferRender: true,
      scroller: true,
      filter: true,
      paging: false
    });
  }

  $(document).on("keyup", "#txt_recherche_piece", function (e) {
    if (e.keyCode == 13 && $(this).val() != "") {
      $("#btn-rafraichir_recap").click();
    }
  });

  $(document).on("click", "#btn-ajout_enoive", function () {
    $(this).hide();
    $("#ajout_envoie").show(500);
    $("#echange_p").hide();
    $("#txt_envoie").focus();
    $("#reponse_table").html("");
    $("#txta1,#txta2,#txt_envoie,#serveur_select").val("");
    $("#total_image_nb").html(00);
    $(".closeXY").hide();
  });

  $(document).on("click", ".anulle-enoive", function () {
    $("#ajout_envoie").hide(200);
    $("#echange_p").show();
    $("#btn-ajout_enoive").show(100);
    $(".closeXY").show();
  });

  $(document).on("click", ".idechang", function () {
    $("#precompta_assd").show(200);
    $("#echange_p").show(200);
    $("#btn-ajout_enoive").show(200);
    $("#ajout_envoie").hide();
    $("#btn-rafraichir_recap").click();
  });

  $(document).on("click", ".close", function () {
    $("#ajout_envoie").hide(200);
    $("#precompta_assd").hide(200);
    $("#echange_p").hide();
  });

  $(document).on("keyup", "#txta1", function (e) {
    $("#txta2").val("");
  });

  $(document).on("click", ".closex", function (e) {
    $("#recap_modal_envoie").hide();
  });

  $(document).on("click", ".closeXY", function (e) {
    $("#precompta_assd").hide();
  });

  $(document).on("click", "#annuler_lamodif", function (e) {
    $("#enregistrer_modif").hide();
  });

  //----------------CONTROL S------------------------------------
  document.onkeydown = function (e) {
    if(e.keyCode == 27){
      
      CancelEvent(e);
    }
    if (e.ctrlKey && e.keyCode == 83) {
      navigator.appName.substring(0, 3) == "Mic"
        ? (event.returnValue = false)
        : e.preventDefault();
      $("#enregistrer_modif").addClass("show");
      $("#enregistrer_modif").css({display: "block"});
      $("#enregistrer_modif").removeProp("aria-hidden");
      $("#enregistrer_modif").prop("aria-modal", "true");
      if (index_click > -1) {
        if ($("#nom_poste_select").html().trim() == "PREPA" || $("#nom_poste_select").html() == "CHEF PREPA") {
          prepamodif();
        }

        if ($("#nom_poste_select").html().trim() == "PRE-COMPTA") {
          precompta();
        }

        if ($("#nom_poste_select").html().trim() == "REVISEUR PRE-COMPTA") {
          reviseur_precompta();
        }

        if ($("#nom_poste_select").html().trim() == "ASSISTANT") {
          assistant();
        }
        if ($("#nom_poste_select").html().trim() == "CDM") {
          cdm();
        }
      }

      CancelEvent(e);
    }
  };

  function CancelEvent(e) {
       if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (window.event) {
      window.event.cancelBubble = true;
      window.event.returnValue = false;
      return;
    }
  }

  $(document).on("keyup", "#txta2", function (e) {
    tbooody = "";
    if ($("#txta1").val() != "") {
      var txt1 = $("#txta1").val().trim().replace(/.PDF/g, ".pdf").replace(/.PDF.PDF/g, ".pdf").replace(/.pdf.pdf/g, ".pdf").replace(/.pdf.PDF/g, ".pdf").replace(/.PDF.pdf/g, ".pdf").replace(/.Pdf/g, ".pdf").replace(/\t/g, " ").split(".pdf");
      var txt2 = $(this).val().trim().replace(/.PDF/g, ".pdf").replace(/.PDF.PDF/g, ".pdf").replace(/.pdf.pdf/g, ".pdf").replace(/.pdf.PDF/g, ".pdf").replace(/.PDF.pdf/g, ".pdf").replace(/\t/g, " ").split(".pdf");
      if (txt1.length == txt2.length) {
        for (var i = 0; i < txt1.length; i++) {
          if (txt1[i] != "") {
            tbooody += "<tr><td style='background: #f9f3ff;' class='image_1'>" + txt1[i].replace(/ PDF/g, " PDF").replace(/ pdf/g, " pdf") + ".pdf &nbsp; </td><td class='image_2'>" + txt2[i] + ".pdf</td></tr>";
          }

          image_debut = txt2[0];
          image_fin = txt2[txt2.length - 2];
        }
      } else {
        if ($(this).val() != "") {
          alert("ATTENTION \n total image original est different total renomée");
          return;
        }
      }
    }
    $("#reponse_table").html("<table class='table-bordered display text-center' width='100%'>" + tbooody + "</table>");
    $("#reponse_table").css({overflow: "auto"});
    $("#reponse_table").css({
      height: parseInt($(window).height()) - parseInt($(window).height()) / 3.5
    });
    $("#total_image").html("TOTAL IMAGES : <b id='total_image_nb' style='color:red'>" + (
    parseInt(txt1.length) - 1) + "</b>");
  });

  $(document).on("click", "#lancer_lamodif", function (e) {
    //faire le trie si le reception est dejà terminer
    if ($("#dt_renvtrie").val() != "" && ($("#nom_poste_select").html().trim() == "PREPA" || $("#nom_poste_select").html() == "CHEF PREPA") && $(".alltr_recap:eq(" + index_click + ")").find(".resp_recp").html() != "") {
      $(".alltr_recap:eq(" + index_click + ")").find(".responsable_tri").html($("#nom_utilisateur").html());
      var data_param = 'date_renvoie_tri="' + $("#dt_renvtrie").val() + '",responsable_tri="' + $("#nom_utilisateur").html() + '" WHERE id="' + id_envoie + '"';
      envoiemodif(data_param);
    }

    //modif reception si aucune trie
    if ($("#dt_renvtrie").val() == "" && ($("#nom_poste_select").html().trim() == "PREPA" || $("#nom_poste_select").html() == "CHEF PREPA")) {
      $(".alltr_recap:eq(" + index_click + ")").find(".resp_recp").html($("#nom_utilisateur").html());
      var data_param = 'date_prepa_trait ="' + $("#date_prep_tr").val() + '", nom_envoies="' + $("#envoie_p_m").val() + '",nombre_images="' + $("#nombre_image").val() + '",image_debut="' + $("#imag_deb_m").val() + '",image_fin="' + $("#imag_fin_m").val() + '",responsable_reception="' + $("#nom_utilisateur").html() + '" WHERE id="' + id_envoie + '"';
      envoiemodif(data_param);
    }

    /* if( $('.alltr_recap:eq('+index_click+')').find('.resp_recp').html() != "" && $('.alltr_recap:eq('+index_click+')').find('.responsable_tri').html() != ""){
            alert("Vous n\'avez pas de droit pour modifier \n Veuillez contacter l\'Administrateur ");
            return;
        }
*/
    //--------------------------PREC-COMPTA-------------------------------------------
    if ($("#nom_poste_select").html().trim() == "PRE-COMPTA") {
      $(".alltr_recap:eq(" + index_click + ")").find(".resp_recp").html($("#nom_utilisateur").html());
      var data_param = 'date_debut_trait_pr="' + $("#date_standart").val() + '",nom_precompta="' + $("#nom_utilisateur").html() + '" WHERE id="' + id_envoie + '"';
      envoiemodif(data_param);
    }

    //--------------------------REVISEUR PRECOMPTA-------------------------------------------
    if ($("#nom_poste_select").html().trim() == "REVISEUR PRE-COMPTA") {
      $(".alltr_recap:eq(" + index_click + ")").find(".resp_revi_precompta").html($("#nom_utilisateur").html());
      var data_param = 'date_debut_trait_rev="' + $("#date_standart").val() + '",nom_revision_precompta="' + $("#nom_utilisateur").html() + '" WHERE id="' + id_envoie + '"';
      envoiemodif(data_param);
    }

    //---------------------------X-----------------------------------------------------

    //--------------------------ASSISTANT-------------------------------------------
    if ($("#nom_poste_select").html().trim() == "ASSISTANT") {
      $(".alltr_recap:eq(" + index_click + ")").find(".res_assistant").html($("#nom_utilisateur").html());
      var data_param = 'date_debut_trait_ass="' + $("#date_standart").val() + '",nom_assistant="' + $("#nom_utilisateur").html() + '" WHERE id="' + id_envoie + '"';
      envoiemodif(data_param);
    }

    if ($("#nom_poste_select").html().trim() == "CDM") {
      $(".alltr_recap:eq(" + index_click + ")").find(".res_assistant").html($("#nom_utilisateur").html());
      var data_param = 'date_debut_trait_cdm="' + $("#date_standart").val() + '",nom_cdm="' + $("#nom_utilisateur").html() + '" WHERE id="' + id_envoie + '"';
      envoiemodif(data_param);
    }

    //---------------------------X-----------------------------------------------------

    $("#enregistrer_modif").hide();
    $(".toast2").toast("show");
  });

  function prepamodif() {
    //--------------------prepa-----------------------------------------------
    envoie_p_m = $(".alltr_recap:eq(" + index_click + ")").find(".envoie_m").html();
    nombre_image = $(".alltr_recap:eq(" + index_click + ")").find(".nb_image_m").find("input").val();
    serveur_m = $(".alltr_recap:eq(" + index_click + ")").find(".serveur_m").html();
    date_prep_tr = $(".alltr_recap:eq(" + index_click + ")").find(".date_prep_tr").find("input").val();
    imag_deb_m = $(".alltr_recap:eq(" + index_click + ")").find(".imag_deb_m").find("input").val();
    imag_fin_m = $(".alltr_recap:eq(" + index_click + ")").find(".imag_fin_m").find("input").val();
    dt_renvtrie = $(".alltr_recap:eq(" + index_click + ")").find(".dt_renvtrie").find("input").val();

    $("#envoie_p_m").val(envoie_p_m);
    $("#nombre_image").val(nombre_image);
    $("#serveur_m").val(serveur_m);
    $("#date_prep_tr").val(date_prep_tr);
    $("#imag_deb_m").val(imag_deb_m);
    $("#imag_fin_m").val(imag_fin_m);
    $("#dt_renvtrie").val(dt_renvtrie);
  }

  function precompta() {
    //--------------------prepa-----------------------------------------------
    date_prep_tr = $(".alltr_recap:eq(" + index_click + ")").find(".date_os").find("input").val();
    $("#date_standart").val(date_prep_tr);
  }

  function reviseur_precompta() {
    //--------------------reviseur prepa-----------------------------------------------
    date_prep_tr = $(".alltr_recap:eq(" + index_click + ")").find(".date_revi_precompta").find("input").val();
    $("#date_standart").val(date_prep_tr);
  }

  function assistant() {
    //--------------------reviseur prepa-----------------------------------------------
    date_prep_tr = $(".alltr_recap:eq(" + index_click + ")").find(".date_asst").find("input").val();
    $("#date_standart").val(date_prep_tr);
  }

  function cdm() {
    //--------------------reviseur prepa-----------------------------------------------
    date_prep_tr = $(".alltr_recap:eq(" + index_click + ")").find(".date_cdm").find("input").val();
    $("#date_standart").val(date_prep_tr);
  }

  $(document).on("click", ".alltr_recap", function () {
    id_envoie = $(this).closest("tr").find(".id_envoie").html();
    index_click = $(this).closest("tr").index();
  });

  function envoiemodif(data_param) {
    $.ajax({
      url: "route_Situation_portfeuille.php",
      type: "POST",
      data: {
        param: "envoie_modif",
        data_param: data_param
      },
      success: function () {
        $("#btn-rafraichir_recap").click();
      }
    });
  }

  //--------------------------------X-----------------------------

  $(document).on("keyup", ".txt_rchrch", function () {
    var s = $(this).closest("tr").index();
    recherche_ch(this,s)
  });

  function recherche_ch(v,d){
    /*$('#nom_ch').html("");
    $('#mat_ch').html("");*/
    $('.nom_ch:eq('+d+')').html("");
    $('.mat_ch:eq('+d+')').html("");

    $(v).closest('tr').find('.id_chd').html("");
    if ($('.txt_rchrch:eq('+$(".txt_rchrch").index(v)+')').val().length > 4) {
      $.ajax({
        url: "route_Situation_portfeuille.php",
        type: "POST",
        dataType: "json",
        data: {
          param: "recherche_attribution",
          data_param: $(".txt_rchrch").index(v),
          valeur: $('.txt_rchrch:eq('+$(".txt_rchrch").index(v)+')').val().toUpperCase()
        },
        success: function (data) {
            try {
                $('.nom_ch:eq('+d+')').html(data[0].nom);
                $('.mat_ch:eq('+d+')').html(data[0].prenom);
                $(v).closest('tr').find('.id_chd').html(data[0].id)
                return;                
            } catch (error) {
                $('#nom_ch').html("");
                $('#mat_ch').html("");   
            }
           
            
        }
      });
    }else{
        $('#nom_ch').html("");
        $('#mat_ch').html("");        
    }
  }

  $(document).on("click", ".txt_rchrch", function () {
        //recherche_ch(this)
    })

    $(document).on("click", ".ch_save", function () {
        if (confirm("Voulez-vous Enregistrer ?") == true) {
            $.ajax({
                url: "route_Situation_portfeuille.php",
                type: "POST",
                dataType: "json",
                data: {
                param: "save_attrib",
                data_param: $(".ch_save").index(this),
                valeur_id: $(this).closest('tr').find('.id_chd').html(),
                iddossier:$('#iddossier_chr').html(),
                },
                success: function (data) {
                    
                }
            });
        }

    })    

    $(document).on("click", "#attribution_d", function () {
      $('.mat_ch,.nom_ch').html("")
        $('.ch_nike').hide();
            $.ajax({
                url: "route_Situation_portfeuille.php",
                type: "POST",
                dataType: "json",
                data: {
                param: "select_attrib",
                iddossier:$('#iddossier_chr').html(),
                },
                success: function (data) {
                    if(data[0].cde != null){$('.nom_ch:eq(0)').html(data[0].prenom_cde),$('.mat_ch:eq(0)').html(data[0].prenom_cde_s),$('.txt_rchrch:eq(0)').val(data[0].cde); $('.ch_nike:eq(0)').show();} ;
                    if(data[0].reference != null){$('.nom_ch:eq(1)').html(data[0].prenom_reference),$('.mat_ch:eq(1)').html(data[0].prenom_reference_s),$('.txt_rchrch:eq(1)').val(data[0].reference); $('.ch_nike:eq(1)').show();} ;
                    if(data[0].cdm_j != null){$('.nom_ch:eq(2)').html(data[0].prenom_cdm_j),$('.mat_ch:eq(2)').html(data[0].prenom_cdm_s),$('.txt_rchrch:eq(2)').val(data[0].cdm_j); $('.ch_nike:eq(2)').show();} ;
                    if(data[0].ass != null){$('.nom_ch:eq(3)').html(data[0].prenom_ass),$('.mat_ch:eq(3)').html(data[0].prenom_ass_s),$('.txt_rchrch:eq(3)').val(data[0].ass); $('.ch_nike:eq(3)').show();} ;
                    if(data[0].prepa != null){$('.nom_ch:eq(4)').html(data[0].prenom_prepa),$('.mat_ch:eq(4)').html(data[0].prenom_prepa_s),$('.txt_rchrch:eq(4)').val(data[0].prepa); $('.ch_nike:eq(4)').show();} ;
                    if(data[0].os != null){$('.nom_ch:eq(5)').html(data[0].prenom_os),$('.mat_ch:eq(5)').html(data[0].prenom_os_s),$('.txt_rchrch:eq(5)').val(data[0].os); $('.ch_nike:eq(5)').show();} ;
                    if(data[0].mg_fr != null){$('.nom_ch:eq(6)').html(data[0].prenom_manager_fr),$('.mat_ch:eq(6)').html(data[0].prenom_manager_fr_s),$('.txt_rchrch:eq(6)').val(data[0].mg_fr); $('.ch_nike:eq(6)').show();} ;
                    if(data[0].cdm_frr != null){$('.nom_ch:eq(7)').html(data[0].prenom_cdm_fr),$('.mat_ch:eq(7)').html(data[0].prenom_cdm_fr_s),$('.txt_rchrch:eq(7)').val(data[0].cdm_frr); $('.ch_nike:eq(7)').show();} ;

                }
            });

    })        

});

