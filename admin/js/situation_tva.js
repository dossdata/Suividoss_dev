$(function(){
	var monthName=['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
	var dayName= ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];


	var acces_sttva = $('#acces_sttva').html().split("#");



	function listdodsier(){
		$.ajax({
			url: "php/scrippt_situation_par_portfeuil.php",
			type:'POST',
			data:{
				param:'listdosiser',
			},
			success: function(data){
            //alert(data);
        },
    });
	} 

	var etatbilanbq;

	function listetabilanbq(){
		$.ajax({
			url: "php/scrippt_situation_par_portfeuil.php",
			type:'POST',
			data:{
				param:'listetabilanbq',
			},
			success: function(data){
				etatbilanbq = data;
			},
		});
	} 


	function listetatbilan(){
		$.ajax({
			url: "php/scrippt_situation_par_portfeuil.php",
			type:'POST',
			data:{
				param:'listetattva',
			},
			success: function(data){
				listetatbilan = data;

			},
		});
	}

	var listpiecemanquant;
	function listpiecemanquant(){
		$.ajax({
			url: "php/scrippt_situation_par_portfeuil.php",
			type:'POST',
			data:{
				param:'listpiecemanquant',
			},
			success: function(data){
				listpiecemanquant = data;
			},
		});
	}


	listdodsier();
	listetatbilan();
	listetabilanbq();
	listpiecemanquant();

	$(document).on('dblclick','.etat_tva',function(){
		var donnerselectionner = "";
		if($(this).html().substring(0,1) == "<"){return;}
		donnerselectionner = "<select id='etat_tv'><option>" + $(this).html() + "</option>" + listetatbilan + "</select>";
		$(this).html(donnerselectionner);
	})

	$(document).on('change','#etat_tv',function(){
		$(this).closest('.etat_tva').html($('#etat_tv option:selected').text());
		var etat = "";
		$( ".etat_tva" ).each(function(index) {
			etat += ";" +  $(this).text() + ";";
		});
		update(id_situation,"etat_g",etat);
	})

	var id_dossier = "";
	$(document).on('change','.cbdossier',function(){
		try {
			var element_input = document.getElementById('optiondoss');
			var element_datalist = document.getElementById('dossierid');
			var opSelected = element_datalist.querySelector(`[value="${element_input.value}"]`);
			var id = opSelected.getAttribute('data-value');
			id_dossier = id;
			$.ajax({
				url:'php/script_situation_tva.php',
				type:'POST',
				data:{
					param:'listdatacloture',
					id:id,
				},
				success :function(data){
					$('.animgif').fadeIn();
					$('.date_de_cloturation').html("<p/><b>date de cloture : </b>" + data  + "<p/>");
					$('.animgif').fadeOut(200);
				},
			})     
		} catch (error) {

		}

	})

	$(document).on('click','#optiondoss',function(){
		$('#listsituationbilan').html("");
	})

	var id_line ="";
	var id_situation ="";
	var regime="";

	$(document).on('change','#selectdatecloture',function(){

		if($(this).val() == "0" || $('#optiondoss').val() == "")
		{ 
			$('#listsituationbilan').html("");
			return
		};
		var element = document.getElementById('selectdatecloture');
		id_situation = $(this).val();

		var textOptSelect = element.options[ element.selectedIndex ].text;
		var maDate = new Date(textOptSelect);
    var jour = maDate.getDay(); //Jour
    var njour = maDate.getDate(); //Num�ro du jour
    var mois = maDate.getMonth(); //Mois (commence � 0, donc +1)
    var annee = maDate.getFullYear(); //Ann�e sur 2 chiffres ou getFullYear sur 4
    var nn = 0;
    var deparp = parseInt(textOptSelect.substring(5,7));
    var moisconvert;

    for(var i = 1 ; i< 13 ; i++ )
    {
    	if(deparp > 12){
    		deparp = 1;
    	}
    	if(deparp != "undefined")
    		moisconvert += deparp + ";";
    	deparp++;
    }
    finmoisresulat = moisconvert.replace("undefined","");
    var mois1 = monthName[mois] ;var mois2 =""; var mois3 ="";var mois4 ="";
    var mois5 ="";var mois6 ="";var mois7 ="";var mois8 ="";
    var mois9 ="";var mois10 ="";var mois11 ="";var mois12 ="";

    var t1 ="" ;var t2 =""; var t3 ="";var t4 ="";
    var t5 ="";var t6 ="";var t7 ="";var t8 ="";
    var t9 ="";var t10 ="";var t11 ="";var t12 ="";

    var trainindIdArray = finmoisresulat.split(';');
    var annneFind ;

    $.each(trainindIdArray, function(index, value) { 
    	if(value == ""){return;}
    	if(value == 12){annee++;value = 0}


    	if(index ==0){mois1 = monthName[value];t1 =annee;}
    	if(index ==1){mois2 = monthName[value];t2 =annee;}
    	if(index ==2){mois3 = monthName[value];t3 =annee;}
    	if(index ==3){mois4 = monthName[value];t4 =annee;}
    	if(index ==4){mois5 = monthName[value];t5 =annee;}
    	if(index ==5){mois6 = monthName[value];t6 =annee;}
    	if(index ==6){mois7 = monthName[value];t7 =annee;}
    	if(index ==7){mois8 = monthName[value];t8 =annee;}
    	if(index ==8){mois9 = monthName[value];t9 =annee;}
    	if(index ==9){mois10 = monthName[value];t10 =annee;}
    	if(index ==10){mois11 = monthName[value];t11 =annee;}
    	if(index ==11){mois12 = monthName[value];t12 =annee;}

    });

    var reponse = '<table border="1"><thead><tr><th>DOSSIER</th><th>SIT Dossier </th><th style="display:none">DATE DE CLOTURE</th>' +
    '<th>ETAT TVA</th><th colspan="7" class="text-center">ELEMENTS BLOQUANT</th><th>DATE DERNIER DEPOT KEOBIZ</th><th>DATE DERNIER PES</th>'+
    '<th>COMMENTAIRE</th><th>DATE DERNIER RELANCE</th><th>DATE DERNIER APPEL CLIENT</th></tr></thead><tbody>'+
    '<tr>'+
    '<td rowspan="14">'+ $('#optiondoss').val() +'</td>'+
    '<td rowspan="14" class="stdossier"></td>'+

    '<td rowspan="14" style="display:none">'+ textOptSelect +'</td>'+
    '<td ></td>'+
    '<td colspan="3" class="text-center" style="background: #ddd;color:red">RELEVE BANCAIRE</td>'+
    '<td colspan="2" rowspan="2">PIECES MANQUANTE</td>'+
    '<td colspan="2" rowspan="2">COMMENTAIRES</td>'+
    '<td rowspan="14" class="datedernierkeobiz"></td>'+
    '<td rowspan="14" class="dernierpes"></td>'+
    '<td rowspan="14" class="commentaireS commentaire"></td>'+
    '<td rowspan="14" class="dernierrelance"></td>'+
    '<td rowspan="14" class="dernierappelclient"></td>'+
    '</tr>'+

    '<tr>'+
    '<td></td>'+
    '<td style="background: #f5f5f5;color:red" id="t_a">MENSUEL</td>'+
    '<td style="background: #f5f5f5;color:red;display:none">ANNEE</td>'+
    '<td style="background: #f5f5f5;color:red">ETAT</td>'+
    '</tr>'+

    '<tr>'+
    '<td class="etat_tva"></td>'+
    '<td class="m1">'+ mois1 +'</td>'+
    '<td class="a1" style="display:none">'+t1+'</td>'+
    '<td class="etatbancaire etat_1" data-value="qsdfdqs"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_1"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_1"></td>'+
    '</tr>'+
    '<tr>'+
    '<td class="etat_tva"></td>'+
    '<td class="m2">'+mois2+'</td>'+
    '<td class="a2" style="display:none">'+t2+'</td>'+
    '<td class="etatbancaire etat_2"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_2"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_2"></td>'+
    '</tr>'+
    '<tr>'+
    '<td class="etat_tva"></td>'+
    '<td class="m3">'+mois3+'</td>'+
    '<td class="a3" style="display:none">'+t3+'</td>'+
    '<td class="etatbancaire etat_3"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_3"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_3"></td>'+
    '</tr>'+
    '<tr>'+
    '<td class="etat_tva"></td>'+
    '<td class="m4">'+mois4+'</td>'+
    '<td class="a4" style="display:none">'+t4+'</td>'+
    '<td class="etatbancaire etat_4"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_4"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_4"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois5+'</td>'+
    '<td style="display:none">'+t5+'</td>'+
    '<td class="etatbancaire etat_5"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_5"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_5"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois6+'</td>'+
    '<td style="display:none">'+t6+'</td>'+
    '<td class="etatbancaire etat_6"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_6"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_6"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois7+'</td>'+
    '<td style="display:none">'+t7+'</td>'+
    '<td class="etatbancaire etat_7"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_7"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_7"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois8+'</td>'+
    '<td style="display:none">'+t8+'</td>'+
    '<td class="etatbancaire etat_8"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_8"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_8"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois9+'</td>'+
    '<td style="display:none">'+t9+'</td>'+
    '<td class="etatbancaire etat_9"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_9"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_9"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois10+'</td>'+
    '<td style="display:none">'+t10+'</td>'+
    '<td class="etatbancaire etat_10"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_10"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_10"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois11+'</td>'+
    '<td style="display:none">'+t11+'</td>'+
    '<td class="etatbancaire etat_11"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_11"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_11"></td>'+
    '</tr>'+
    '<tr class="tmens">'+
    '<td class="etat_tva"></td>'+
    '<td>'+mois12+'</td>'+
    '<td style="display:none">'+t12+'</td>'+
    '<td class="etatbancaire etat_12"></td>'+
    '<td colspan="3" class="piecemanque etat_pice_12"></td>'+
    '<td colspan="2" class="cmmt etat_cmt_12"></td>'+
    '</tr>'+

    '</tbody></table>';


    $.ajax({
    	url: "php/script_situation_tva.php",
    	type:'POST',
    	data:{
    		param:'recuperVsit',
    		id:$(this).val(),
    	},
    	success: function(data){
    		$('#listsituationbilan').html(reponse);
    		if(acces_sttva[0] != "0"){$('.stdossier').addClass("classenable");}else{$('.stdossier').removeClass('classenable');}
    		if(acces_sttva[1] != "0"){
    			$('.etatbancaire').addClass("classenable");
    			$('.piecemanque').addClass("classenable");
    			$('.etat_tva').addClass("classenable");
    		}else{
    			$('.etatbancaire').removeClass('classenable');
    			$('.piecemanque').removeClass("classenable");
    			$('.etat_tva').removeClass("classenable");
    		}
    		if(acces_sttva[2] != "0"){$('.cmmt').addClass("classenable");}else{$('.cmmt').removeClass('classenable');}
    		if(acces_sttva[3] != "0"){$('.datedernierkeobiz').addClass("classenable");}else{$('#datedernierkeobiz').removeClass('classenable');}
    		if(acces_sttva[4] != "0"){$('.commentaireS').addClass("classenable");}else{$('.commentaireS').removeClass('classenable');}

    		var tvregim = data.split("#");

    		$('.stdossier').html(tvregim[1]);
    		$('.datedernierkeobiz').html(tvregim[2]);
    		$('.dernierpes').html(tvregim[3]);
    		$('.commentaireS').html(tvregim[4]);
    		$('.dernierrelance').html(tvregim[5]);
    		$('.dernierappelclient').html(tvregim[6]);

    		var etatsplit = tvregim[7].split(";");

    		$('.etat_1').html(etatsplit[1]);
    		$('.etat_2').html(etatsplit[3]);
    		$('.etat_3').html(etatsplit[5]);
    		$('.etat_4').html(etatsplit[7]);
    		$('.etat_5').html(etatsplit[9]);
    		$('.etat_6').html(etatsplit[11]);
    		$('.etat_7').html(etatsplit[13]);
    		$('.etat_8').html(etatsplit[15]);
    		$('.etat_9').html(etatsplit[17]);
    		$('.etat_10').html(etatsplit[19]);
    		$('.etat_11').html(etatsplit[21]);
    		$('.etat_12').html(etatsplit[23]);

    		var piece_manquant = tvregim[8].split(";");
    		$('.etat_pice_1').html(piece_manquant[1]);
    		$('.etat_pice_2').html(piece_manquant[3]);
    		$('.etat_pice_3').html(piece_manquant[5]);
    		$('.etat_pice_4').html(piece_manquant[7]);
    		$('.etat_pice_5').html(piece_manquant[9]);
    		$('.etat_pice_6').html(piece_manquant[11]);
    		$('.etat_pice_7').html(piece_manquant[13]);
    		$('.etat_pice_8').html(piece_manquant[15]);
    		$('.etat_pice_9').html(piece_manquant[17]);
    		$('.etat_pice_10').html(piece_manquant[19]);
    		$('.etat_pice_11').html(piece_manquant[21]);
    		$('.etat_pice_12').html(piece_manquant[23]);
    		var commentaire = tvregim[9].split(";");
    		$('.etat_cmt_1').html(commentaire[1]);
    		$('.etat_cmt_2').html(commentaire[3]);
    		$('.etat_cmt_3').html(commentaire[5]);
    		$('.etat_cmt_4').html(commentaire[7]);
    		$('.etat_cmt_5').html(commentaire[9]);
    		$('.etat_cmt_6').html(commentaire[11]);
    		$('.etat_cmt_7').html(commentaire[13]);
    		$('.etat_cmt_8').html(commentaire[15]);
    		$('.etat_cmt_9').html(commentaire[17]);
    		$('.etat_cmt_10').html(commentaire[19]);
    		$('.etat_cmt_11').html(commentaire[21]);
    		$('.etat_cmt_12').html(commentaire[23]);
    		var etat_g = tvregim[10].split(";");

    		$('.etat_tva:eq(0)').html(etat_g[1]);
    		$('.etat_tva:eq(1)').html(etat_g[3]);
    		$('.etat_tva:eq(2)').html(etat_g[5]);
    		$('.etat_tva:eq(3)').html(etat_g[7]);
    		$('.etat_tva:eq(4)').html(etat_g[9]);
    		$('.etat_tva:eq(5)').html(etat_g[11]);
    		$('.etat_tva:eq(6)').html(etat_g[13]);
    		$('.etat_tva:eq(7)').html(etat_g[15]);
    		$('.etat_tva:eq(8)').html(etat_g[17]);
    		$('.etat_tva:eq(9)').html(etat_g[19]);
    		$('.etat_tva:eq(10)').html(etat_g[21]);
    		$('.etat_tva:eq(11)').html(etat_g[23]);

    		
    		if(tvregim[0] ==  "ET" || tvregim[0] == "RT"){
    			recherche_valide_edi_dans_tvatrim_et_tvamens(id_situation,"php/script_tva_trim.php");
    			$(".tmens").hide();
    			$(".m1").html("1T");
    			$(".m2").html("2T");
    			$(".m3").html("3T");
    			$(".m4").html("4T");
    			$("#t_a").html("TRIMESTRIELE");

    		}
    		if(tvregim[0] ==  "EM" || tvregim[0] ==  "RM"){
    			recherche_valide_edi_dans_tvatrim_et_tvamens(id_situation,"php/script_tva_mensuel.php");
    			$("#t_a").html("MENSUEL");
                /*$(".m1").html(monthName[parseInt(dt1.toISOString().split('T')[0].substring(5,7)) - 1]);
                $(".m2").html(monthName[parseInt(dt2.toISOString().split('T')[0].substring(5,7)) - 1]);
                $(".m3").html(monthName[parseInt(dt3.toISOString().split('T')[0].substring(5,7)) - 1]);
                $(".m4").html(monthName[parseInt(dt4.toISOString().split('T')[0].substring(5,7)) - 1]);*/

            }

            if(tvregim[0] ==  "ST"){
            	recherche_valide_edi_dans_tvatrim_et_tvamens(id_situation,"php/script_acompt_tva_st.php");

            	$("#t_a").html("SEMESTRIEL");
            	$(".m1").html("ST 1");
            	$(".m2").html("ST 2");
            	$(".etat_3").hide();
            	$(".etat_pice_3").hide();
            	$(".etat_cmt_3").hide();
            	$(".etat_4").hide();
            	$(".etat_pice_4").hide();
            	$(".etat_cmt_4").hide();
            	$(".etat_tva:eq(2)").hide();
            	$(".etat_tva:eq(3)").hide();
            	$(".etat_tva:eq(4)").hide();

            	$(".m3").hide();
            	$(".m4").hide();
            	$(".tmens").hide();
            }
            if(tvregim[0] ==  "EXO" || tvregim[0] ==  "FDB"){
            	$('#listsituationbilan').html("");
            }             
        },
    });

})

function recherche_valide_edi_dans_tvatrim_et_tvamens(id,urlscript){
	$.ajax({
		url: urlscript,
		type:'POST',
		data:{
			param:'recuperetatt',
			idsituation:id,
		},
		success: function(datas){
			splitvalide_edi = datas.split("#")
			for(var i = 0; i < splitvalide_edi.length; i++){
				if(splitvalide_edi[i] != ""){
					$('.etat_tva:eq('+ i +')').html("FAIT<span class ='glyphicon glyphicon-ok'><span>");
					$('.etat_tva:eq('+ i +')').css('background','#56ff00');
				} 
			}
		},
	});
}

$(document).on('change','#etatbilan',function(){
	$.ajax({
		url: "php/scrippt_situation_par_portfeuil.php",
		type:'POST',
		data:{
			param:'saveetatbilan',
			id:$(this).val(),
			idligne:id_line,
		},
		success: function(data){
			$('.animgif').fadeIn();
			$('.animgif').fadeOut(200);
			return;
		},
	}); 
})



$(document).on('change','#selectsituationdoss',function(){
	$.ajax({
		url: "php/scrippt_situation_par_portfeuil.php",
		type:'POST',
		data:{
			param:'saveselectsituationdoss',
			id:$(this).val(),
			idligne:id_line,
		},
		success: function(data){
			$('.animgif').fadeIn();
			$('.animgif').fadeOut(200);

		},
	}); 
	return;
})

var etat_selectionner;
$(document).on('dblclick','.etatbancaire',function(){
	etat_selectionner = "";
	etat_selectionner =  $(this).closest('.etatbancaire').attr('class').replace("etatbancaire","");
	if($(this).html().substring(0,1) == "<"){return;}
	donnerselectionner = "<select id='etatbilanbq'><option>" + $(this).html() + "</option>" + etatbilanbq + "</select>";
	$(this).html(donnerselectionner);
    //$('#listsituationbilan').scrollTop(999999)
})


$(document).on('change','#etatbilanbq',function(){
	$(this).closest('.etatbancaire').html($('#etatbilanbq option:selected').text());
	var etat = "";
	$( ".etatbancaire" ).each(function(index) {
		etat += ";" +  $(this).text() + ";";
	});
	update(id_situation,"etat",etat);
})

$(document).on('change','#piecemanque',function(){
	$(this).closest('.piecemanque ').html($('#piecemanque option:selected').text());
	var piece = "";
	$( ".piecemanque" ).each(function(index) {
		piece += ";" +  $(this).text() + ";";
	});
	update(id_situation,"piece_manquant",piece);
})

$(document).on('click','.validcomment',function(){
	$(this).closest('.cmmt').html($('#cmmt').val());
	var cmd = "";
	$( ".cmmt" ).each(function(index) {
		cmd += ";" +  $(this).text() + ";";
	});
	update(id_situation,"commentaire",cmd);
})


function update(id,colone,valeur){
	$.ajax({
		url: "php/script_situation_tva.php",
		type:'POST',
		data:{
			param:'etatsituationTVA',
			id_situation:id,
			colone:colone,
			valeur:valeur + "&nbsp",
		},
		success: function(data){
			$('.animgif').fadeIn();
			$('.animgif').fadeOut(200);
		},
	});
}

$(document).on('dblclick','.piecemanque',function(){
	etat_selectionner = "";
	etat_selectionner =  $(this).closest('.piecemanque').attr('class').replace("piecemanque","");
	if($(this).html().substring(0,1) == "<"){return;}
	donnerselectionner = "<select id='piecemanque'><option>" + $(this).html() + "</option>" + listpiecemanquant + "</select>";
	$(this).html(donnerselectionner);
    //$('#listsituationbilan').scrollTop(999999)
})



$(document).on('dblclick','.cmmt',function(){
	etat_selectionner = "";
	etat_selectionner =  $(this).closest('.cmmt').attr('class').replace("cmmt","");
	if($(this).html().substring(0,1) == "<"){return;}
	$(this).html('<div class="form-group"><textarea class="form-control"' +
		'rows="5" id="cmmt" style="height:200px" >' + $(this).html() +'</textarea>'+
		'</div><button class="validcomment btn-primary">Enregistrer commentaire</button>');
	$('#cmmt').focus();
       // $('#listsituationbilan').scrollTop(999999)
   })    



$(document).on('dblclick','.datedernierkeobiz',function(){
	if($(this).html().substring(0,1) == "<"){return;}
	var valeur = $(this).html();
	var object = '<div class="input-group date" data-provide="datepicker">'+
	'<input class="dateInput dtdernierkeobiz" type="text" class="form-control" value="' + valeur +'">'+
	'<button  class="btn-warning Anlr">X</button><div class="input-group-addon"><span class="glyphicon glyphicon-th"></span>'+
	'</div></div>';
	$(this).html(object);
	$('.dtdernierkeobiz').focus();
})

$(document).on('click','.Anlr',function(e){ 
	$('.datepicker').hide();
	$('.dtdernierkeobiz').val("");
	update("",id_situation,"date_dernier_keobiz");
	$(this).closest('td').html("");
	$('.table-condensed').html("");
})

$(document).on('dblclick','.commentaireS',function(){
	etat_selectionner = "";
	etat_selectionner =  $(this).closest('.commentaireS').attr('class').replace("commentaireS","");
	if($(this).html().substring(0,1) == "<"){return;}
	$(this).html('<div class="form-group"><textarea class="form-control"' +
		'rows="5" id="commentaireS" style="height:350px">' + $(this).html() +'</textarea>'+
		'</div><button class="validecommentaireS btn-primary">Enregistrer commentaire</button>');
	$('#cmmt').focus();
}) 

$(document).on('click','.validecommentaireS',function(){
	update(id_situation,'commentaire_g',$('#commentaireS').val());
	$(this).closest('.commentaireS').html($('#commentaireS').val());
})


$(document).on('keyup','.dtdernierkeobiz',function(e){
	if(e.keyCode == 13){
		var startDate = new Date($(this).val());
		var endDate = new Date();

		if (startDate <= endDate){
		}else{
			$(this).closest('td').html("");
		}

		update(id_situation,"date_dernier_keobiz",$(this).val());
		$(this).closest('.datedernierkeobiz').html($(this).val());
		$('.datepicker').hide();
	}
})
})

$(document).on('click','#btn_reload_tva',function(){
	$('#selectdatecloture').change();
	$('.animgif').fadeIn();
	$('.animgif').fadeOut(200);
})