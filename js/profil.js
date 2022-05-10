$(function(){
    $(document).on('click','#btn_enregistre_profile', function(){
        var id = $('#utilisateur_id_id').html();
        var mon_sup = $('#mon_sup').val();
        var matricule = $('#matricule_user').val();
        if(matricule.length != 4){
            $.ajax({
                url:'route_Situation_portfeuille.php',
                    type:'POST',
                    data:{
                        param:'updata_profile',
                        id:id,
                        matricule:matricule,
                        mon_sup:mon_sup,
                    },
                    success:function(data){
                        window.location.replace('/SuiviKARLIT');
                    }
                })
        }else{
            alert("ATTENTION \n Matricule Incomplet !");
        }
    })
})