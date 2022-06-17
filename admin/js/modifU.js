$(function() {
    var idLogin = "";
    var tete = '<thead><tr><th class = "itemresize" nowrap="nowrap">id</th>' +
        '<th >nom</th>' +
        '<th class = "">Penom</th>' +
        '<th>Login </th>' +
        '<th>Sexe </th>' +
        '<th  id="">Mdp</th>' +
        '<th  id="">Supervision</th>' +
        '<th  id="">Niveau Etp</th>' +
        '<th  id="">Pays</th>' +
        '<th  id="">Poste</th>' +
        '<th class = "">Mail</th>'+
        '<th class = "">Date d entree</th>'+
        '<th class = "">Date d sortie</th>'+
        '<th class = "">Date de naissance</th>'+
        '<th>Date de poste</th>' + 
        '<th class = "">#</th>'+
        '</tr></thead>';

    function returnlist() {
        $.ajax({
            url: "php/script_s_modif_utilisateur.php",
            type: 'POST',
            data: {
                param: 'recuperList',
            },
            success: function(data) {
                $('#tablelist').html("<table>" + tete + "<tbody>" + data + "<tbody></table>");
            },
        });
    }
    returnlist();

    function returnlistpays() {
        $.ajax({
            url: "php/script_s_modif_utilisateur.php",
            type: 'POST',
            data: {
                param: 'listepays',
            },
            success: function(data) {
                $('#listpays').html("<select id='lstpays'>" + data + "</select>");
            },
        });
    }
    returnlistpays();

    function returnlistpost() {
        $.ajax({
            url: "php/script_s_modif_utilisateur.php",
            type: 'POST',
            data: {
                param: 'listpost',
            },
            success: function(data) {
                $('#listpost').html("<select id='lstpost'>" + data + "</post>");
            },
        });
    }
    returnlistpost()
    returnlistpays();


    $(document).on('keyup', '#txtrecherche', function() {
        $.ajax({
            url: "php/script_s_modif_utilisateur.php",
            type: 'POST',
            data: {
                param: 'recuperListlike',
                text: $(this).val(),
            },
            success: function(data) {
                $('#tablelist').html("<table>" + tete + "<tbody>" + data + "<tbody></table>");
            },
        });
    })

    $(document).on('click', '#btnrecherche', function() {
        $('#txtrecherche').val("");
        returnlist();
    })

    $(document).on('click', '.iconmodif', function() {
        idLogin = $(this).closest('tr').find('td:eq(0)').html();
        $('#txtnom').val($(this).closest('tr').find('.snom').html());
        $('#txtlogin').val($(this).closest('tr').find('.slogin').html());
        $('#txtprenom').val($(this).closest('tr').find('.sprenomail').html());
        $('#txtmail').val($(this).closest('tr').find('.smail').html());
        $('#txtniveauetp').val($(this).closest('tr').find('.sniveau_etp').html());
        $('#txtsexe').val($(this).closest('tr').find('.ssex').html());        
        $('#txtpassword').val($(this).closest('tr').find('.spassword').html());
        $('#txtdate_de_naissance').val($(this).closest('tr').find('.snaissance').html());
        $('#txtdateentrer').val($(this).closest('tr').find('.sentrer').html());
        $('#txtsortie').val($(this).closest('tr').find('.ssortie').html());
        $('#txtmatricule').val($(this).closest('tr').find('.ssmat').html());
        $('#txtdatepost').val($(this).closest('tr').find('.date_poste').html());
        
        
        $('#supervision option[data="' + $(this).closest('tr').find('.sssup').html() + '"]').attr('selected', 'selected');
        $('#lstpays option[data="' + $(this).closest('tr').find('.spays_id').html() + '"]').attr('selected', 'selected');
        $('#lstpost option[data="' + $(this).closest('tr').find('.spost').html() + '"]').attr('selected', 'selected');
    })

    $(document).on('click', '#btnEnregistrer', function() {

        var nom = $('#txtnom').val();
        var prenom = $('#txtprenom').val();
        var txtmat = $('#txtmatricule').val().toUpperCase();
        var login = $('#txtlogin').val();
        var txmail = $('#txtmail').val();
        var paasword = $('#txtpassword').val();
        var pays = $('#lstpays').val();
        var poste = $('#lstpost').val();
        var sexe = $('#txtsexe').val();
        var date_de_naissance = $('#txtdate_de_naissance').val();
        var date_d_entree = $('#txtdateentrer').val();
        var supervision = $('#supervision').val();
        var niveau_etp = $('#txtniveauetp').val();
        var date_poste = $('#txtdatepost').val();
        var txtsortie = $('#txtsortie').val();

        $.ajax({
            url: "php/script_s_modif_utilisateur.php",
            type: 'POST',
            data: {
                param: 'updatelogin',
                nom: nom,
                prenom: prenom,
                txtmat:txtmat,
                login: login,
                paasword: paasword,
                pays: pays,
                poste: poste,
                sexe: sexe,
                date_de_naissance: date_de_naissance,
                date_d_entree: date_d_entree,
                txtsortie:txtsortie,
                supervision: supervision,
                niveau_etp: niveau_etp,
                txmail:txmail,
                date_poste:date_poste,
                idlogin: idLogin,


            },
            success: function(data) {
                location.reload();
            },
        });
    })

     $(document).on('click', '#btn-supr', function() {
        $.ajax({
            url: "php/script_s_modif_utilisateur.php",
            type: 'POST',
            data: {
                param: 'iusupre',
                idlogin: idLogin,

            },
            success: function(data) {
                location.reload();
            },
        });
    })

})