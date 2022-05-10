$(function(){

    var myVar;

    myFunction();

    function myFunction() {
        myVar = setInterval(alertFunc, 2000);
    }

    function alertFunc() {
        if ($('#nomsess').html() == "" || $('#session_id').html() == "") {
            window.location.href = 'http://suividoss.keobiz.fr/index.php';
        }
    }


    var lignesuivie = "";
    var dtmadsuiv= "";
    var namdoss= "";
    var namnombre= "";
    var nlotpiece="";
    var precisionlt= "";
    var nrelbaq= "";
    var mrequrqu= "";
    var mutilis= "";
    var metatsais= "";
    var nsaisiebq= "";
    var rvprecmt= "";
    var metatrev= "";
    var ideatatsisi;
    var nompreparateur;
    var rqremarque;
    var etarevisionm;

    var entete = '<table id="dtBasicExample" class="table   table-sm" cellspacing="0" width="100%">' +
        '<thead><tr><th></th><th style="display: none"></th><th style="display: none"></th><th style="display: none"></th><th class="th-sm">Date PREPARATION</th>' +
        '<th class="th-sm">Equipe</th>'+
        '<th class="th-sm">DOSSIERS</th><th class="th-sm">Nbre images</th>'+
        '<th class="th-sm">LOT DES PIECES</th><th class="th-sm">PRECISION LOT DES PIECES MULTI</th>'+
        '<th class="th-sm">Relevées Bancaires</th><th class="th-sm">Rémarque</th>'+
        '<th class="th-sm">Précompta</th><th class="th-sm">Saisie Banque</th>'+
        '<th class="th-sm">Etat Saisie</th><th class="th-sm">REVISION PRECOMPTA</th>'+
        '<th class="th-sm">ETAT REVISION</th><th class="th-sm" style="display: none">COMMENTAIRE</th>'+
        '<th style="display: none"></th><th style="display: none"></th><th style="display: none"></th><th class="th-sm" style="display: none">#</th><th class="th-sm" style="display: none">#</th><th class="th-sm" style="display: none">#</th><th></th><th></th></tr></thead>';

    $(".editableBox").change(function(){
       alert($(".editableBox option:selected").html());
    });

    function listequipe() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'listequipe',
            },
            success: function(data) {
                $('#listequipe').html("<select class='form-control' id='filtreequipe'><option value='0'></option>" + data + "</select>");
            },
        });
    }
    listequipe();

    function remarque() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'remarque',
            },
            success: function(data) {
                $('#remarque').html("<select class='form-control'  id='remarqumdf'>" + data + "</select>");
            },
        });
    }
    remarque();

    function etat_saisiebd() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'etat_saisiebd',
            },
            success: function(data) {
                $('#modetatsai').html("<select class='form-control' id='etat_saisimodif' disabled='disabled'>" + data + "</select>");
            },
        });
    }
    etat_saisiebd();


    function relevebanque() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'relevebanque',
            },
            success: function(data) {
                $('#relevebanque').html("<select class='form-control' id='relbq'>" + data + "</select>");
            },
        });
    }
    relevebanque();


    function lotpieces() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'lotpieces',
            },
            success: function(data) {
                $('#lotpiece').html("<select class='form-control' id='ltidpiece'><option selected class='disabled'>lot pieces</option>" + data + "</select>");
            },
        });
    }
    lotpieces();

    function touslesdossier() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'touslesdossier',
            },
            success: function(data) {
                $('#touslesdossier').html(data );
            },
        });
    }
    function saisiebanque() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'saisiebanque',
            },
            success: function(data) {
                $('#saisiebanque').html("<select id='saaisiebanqmodi' class='form-control'>" + data  + "</select>");
            },
        });
    }

    function etatrevis() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'etatrevis',
            },
            success: function(data) {
                $('#etatrevis').html("<select id='etatrevisModif' class='form-control' disabled='disabled'>" + data  + "</select>");
            },
        });
    }

    etatrevis();

    saisiebanque();

    function listdossier() {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'listdosiser',
            },
            success: function(data) {
                $('#corptable').html(entete +  data + "</table>");
                appeldatatable();
            },
        });
    }

    //listequipe();
    listdossier();
    touslesdossier();
    function appeldatatable(){
        $('#dtBasicExample').DataTable({
            "searching": true, // false to disable search (or any other option)
            "scrollY": "400px",
            "scrollX": true,
            "scrollCollapse": true,
            "lengthMenu": [ [100, 125, 250,500], [100, 125, 250,500] ],
            "iDisplayLength": -1,
        });
        $('.dataTables_length').addClass('bs-select');
    }

    $(document).on('click','#valideinsertion', function(){

        try{
        var element_input = document.getElementById('optiondoss');
        var element_datalist = document.getElementById('dossierid');
        var opSelected = element_datalist.querySelector(`[value="${element_input.value}"]`);
        var id = opSelected.getAttribute('data-value');
        }catch  {

        }
        if( $('#nbrimage').val() > 0 && $('#precisionr').val() != "" && $('#ltidpiece').val() != "lot pieces" && id > 0 && $('#relbq').val() > 1 )
        {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'insertionsuivie',
                date_entrer: $('#dta_tetvalue').val(),
                dossier : id,
                nbr_imge : $('#nbrimage').val(),
                lot_piece: $('#ltidpiece').val() ,
                presion: $('#precisionr').val(),
                relevebanque: $('#relbq').val(),
            },
            success: function(data) {
                listdossier();
                $('.close').click();
               $('#nbrimage').val('');
                   $('#ltidpiece').val('') ;
                    $('#precisionr').val('');
                  $('#relbq').val('');
                  $('#optiondoss').val('');
            },
        });
        }else{
            alert("Attention critères Incomplete !")
        }
    })

    $(document).on('click','td',function () {
        lignesuivie = $(this).closest('tr').find('.idsuivie').html();
        dtmadsuiv = $(this).closest('tr').find('.dtmadsuiv').html();
        namdoss = $(this).closest('tr').find('.namdoss').html();
        namnombre = $(this).closest('tr').find('.namnombre').html();
        nlotpiece = $(this).closest('tr').find('.nlotpiece').html();
        precisionlt = $(this).closest('tr').find('.precisionlt').html();
        nrelbaq = $(this).closest('tr').find('.nrelbaq').html();
        mrequrqu = $(this).closest('tr').find('.mrequrqu').html();
        mutilis = $(this).closest('tr').find('.mutilis').html();
        metatsais = $(this).closest('tr').find('.metatsais').html();
        rvprecmt = $(this).closest('tr').find('.rvprecmt').html();
        nsaisiebq = $(this).closest('tr').find('.idsaisiebanquemodif').html();
        metatrev = $(this).closest('tr').find('.metatrev').html();
        ideatatsisi = $(this).closest('tr').find('.ideatatsisi').html();
        nompreparateur = $(this).closest('tr').find('.nompreparateur').html();
        rqremarque = $(this).closest('tr').find('.rqremarque').html();
        etarevisionm = $(this).closest('tr').find('.etarevisionm').html();


    })

    $(document).on('click','.modif',function () {
        $('#nam2doss').val(namdoss);
        $('#nbimagemodif').val(namnombre);
        $('#lotpiecemodif').val(nlotpiece);
        $('#precisionmodif').val(precisionlt);
        $('#relbqmodif').val(nrelbaq);
        $('#dtmodif').val(dtmadsuiv);
        $('#etat_saisimodif').val(ideatatsisi);
        $('#saaisiebanqmodi').val(nsaisiebq);
        $('#etat_revmodif').val(metatrev);
        $('#nompreparateurm').val(nompreparateur);
        $('#nomprecomptamodif').val(mutilis);
        $('#remarqumdf').val(rqremarque);
        $('#etatrevisModif').val(etarevisionm);



    })

    $(document).on('keyup', '#revprecommodif', function () {
        if($(this).val() != ""){
            $('#etatrevisModif').val(3);
        }else{
            $('#etatrevisModif').val(2);
        }
    })

    $(document).on('click','#suprlinge',function () {
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'suprelinge',
               idlinge : lignesuivie,
            },
            success: function(data) {
                listdossier();
                $('.close').click();
            },
        });
    })

    $(document).on('dblclick', '#optiondoss',function () {
        $(this).val('');
    })

    $(document).on('change', '#saaisiebanqmodi',function () {
        if($(this).val() == 3 || $(this).val() == 4){
            $('#etat_saisimodif').val(3);
        }else{
            $('#etat_saisimodif').val(2);
        }
    })

    $(document).on('click','#btnfilter', function () {

        if( parseInt($('#filtreequipe').val()) > 0 && $('#dtdebut').val() != "" && $('#dtfin').val() != ""){
        $.ajax({
            url: "php/suiv.php",
            type: 'POST',
            data: {
                param: 'addfilter',
                dtdebut : $('#dtdebut').val(),
                dtfin: $('#dtfin').val(),
                flequipe: $('#filtreequipe').val(),
            },
            success: function(data) {
                $('#corptable').html(entete +  data + "</table>");
                appeldatatable();
                $('.close').click();
            },
        });
        }else{
            alert("Atention critères incomplete !");
        }
    })

    $(document).on('click','#rafraichir', function () {
        $('#corptable').fadeOut(200);
        $('#corptable').fadeIn(2000);
        listdossier();
    })

    $(document).on('click','#updateprecompta', function () {
        if( $('#nomprecomptamodif').val() != "" && $('#remarqumdf').val() > 1 && $('#saaisiebanqmodi').val() > 1) {
            $.ajax({
                url: "php/suiv.php",
                type: 'POST',
                data: {
                    param: 'updateprecompta',
                    id: lignesuivie,
                    nomprecomptamodif: $('#nomprecomptamodif').val(),
                    etat_saisimodif: $('#etat_saisimodif').val(),
                    saaisiebanqmodi: $('#saaisiebanqmodi').val(),
                    remarqumdf: $('#remarqumdf').val(),

                },
                success: function (data) {
                    if (parseInt($('#filtreequipe').val()) > 0 && $('#dtdebut').val() != "" && $('#dtfin').val() != "") {
                        $('#btnfilter').click();
                        $('#corptable').fadeOut(200);
                        $('#corptable').fadeIn(2000);
                        $('.close').click();
                    } else {
                        $('#corptable').fadeOut(200);
                        $('#corptable').fadeIn(2000);
                        listdossier();
                        $('.close').click();
                    }

                },
            });
        }else{
            alert("Atention critères incomplete !");
        }
    })

    $(document).on('click','#btnmodifrev', function () {
        if( $('#revprecommodif').val() != "" && $('#etatrevisModif').val() > 1) {
            $.ajax({
                url: "php/suiv.php",
                type: 'POST',
                data: {
                    param: 'updaterev',
                    id: lignesuivie,
                    revprecommodif: $('#revprecommodif').val(),
                    etatrevisModif: $('#etatrevisModif').val(),

                },
                success: function (data) {
                    if (parseInt($('#filtreequipe').val()) > 0 && $('#dtdebut').val() != "" && $('#dtfin').val() != "") {
                        $('#btnfilter').click();
                        $('#corptable').fadeOut(200);
                        $('#corptable').fadeIn(2000);
                        $('.close').click();
                    } else {
                        $('#corptable').fadeOut(200);
                        $('#corptable').fadeIn(2000);
                        listdossier();
                        $('.close').click();
                    }

                },
            });
        }else{
            alert("Atention critères incomplete !");
        }
    })


})