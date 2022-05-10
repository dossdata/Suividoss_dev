$(function() {
    var idLogin = "";
    var tete = '<thead><tr><th class = "itemresize" nowrap="nowrap">id</th>' +
        '<th class = "itemresize status" nowrap="nowrap">nom</th>' +
        '<th class = "itemresize status" nowrap="nowrap">Login </th>' +
        '<th class = "itemresize status" nowrap="nowrap" id="nbr_image">Mdp</th>' +
        '<th class = "itemresize status" nowrap="nowrap" id="nbr_fact">Pays</th>' +
        '<th class = "itemresize status" nowrap="nowrap" id="nbr_autres">Poste</th>' +
        '<th class = "itemresize status" nowrap="nowrap" id="nbr_autres">#</th></tr></thead>';

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
        $('#txtnom').val($(this).closest('tr').find('td:eq(1)').html());
        $('#txtlogin').val($(this).closest('tr').find('td:eq(2)').html());
        $('#txtpassword').val($(this).closest('tr').find('td:eq(3)').html());
        $('#lstpays option[data="' + $(this).closest('tr').find('td:eq(4)').html() + '"]').attr('selected', 'selected');
        $('#lstpost option[data="' + $(this).closest('tr').find('td:eq(5)').html() + '"]').attr('selected', 'selected');
    })

    $(document).on('click', '#btnEnregistrer', function() {
        $.ajax({
            url: "php/script_s_modif_utilisateur.php",
            type: 'POST',
            data: {
                param: 'updatelogin',
                txtnom: $('#txtnom').val(),
                txtlogin: $('#txtlogin').val(),
                txtpassword: $('#txtpassword').val(),
                lstpays: $('#lstpays').val(),
                lstpost: $('#lstpost').val(),
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