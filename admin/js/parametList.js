$(function() {
	var idtable = 0;
   function listregimdimposition_1(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listregimdimposition1',
           },
           success: function(data){
              $('.regim1').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }

      function listregimdimposition_2(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listregimdimposition2',
           },
           success: function(data){
              $('.regim2').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }


    function listfrmjuridique(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listfrmjuridique',
           },
           success: function(data){
              $('.frmjur').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }
    
     function listdpcoala(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listdpcoala',
           },
           success: function(data){
              $('.dpcoala').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }

      function listdpcoala(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listdpcoala',
           },
           success: function(data){
              $('.dpcoala').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }

     function listtvaregime(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listtvaregime',
           },
           success: function(data){
              $('.tvaregim').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }

     function listsituationkarlit(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listsituationkarlit',
           },
           success: function(data){
              $('.stkarlit').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }
    
     function listetatbilan(){
       $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'listetatbilan',
           },
           success: function(data){
              $('.etatbilan').html("<table border='1'>"+ data + "</table>"); 
          },
       });
    }

    $(document).on('click','.edit',function(){
    	idtable = $(this).closest('tr').find('td').html();
    	 //alert('encours');
    	 $
    })




      listregimdimposition_1();

    var tab = "impo1";
    $(document).on('click','.nav-tabs > li',function(){
      var impo1 = $(this).closest('li').html().indexOf("REGIME D IMPOSITION _ 1");
      var impo2 = $(this).closest('li').html().indexOf("REGIME D IMPOSITION _ 2");
      var frmjdq = $(this).closest('li').html().indexOf("FORME JURIDIQUE");
      var dpcoala = $(this).closest('li').html().indexOf("DP COALA");
      var tvaregim = $(this).closest('li').html().indexOf("TVA REGIME");
      var stkal = $(this).closest('li').html().indexOf("SITUATION TRAITMEENT KARLIT");
      var etabl = $(this).closest('li').html().indexOf("ETAT BILAN");
      if(impo1 > 1){tab = "impo1";}
      if(impo2 > 1){tab = "impo2";}
      if(frmjdq > 1){tab = "frmjd";}
      if(dpcoala > 1){tab = "dplcoala";}
      if(tvaregim > 1){tab = "ltvargm";}
      if(stkal > 1){tab = "lstkarlt";}
      if(etabl > 1){tab = "lstetabl";}
     listregimdimposition_1();
    listregimdimposition_2();
    listfrmjuridique();
    listdpcoala();
    listtvaregime();
    listsituationkarlit();
    listetatbilan();
    })
   

    $(document).on('click','#impo1,#impo2,#frmjd,#dplcoala,#ltvargm,#lstkarlt,#lstetabl' ,function(){
      if(tab == "impo1"){
        insertlist($('.'+tab+'').val(),'regime_dimposition');
      }
      if(tab == "impo2"){
        insertlist($('.'+tab+'').val(),'regim_imposition2');
      }
      if(tab == "frmjd"){
        insertlist($('.'+tab+'').val(),'forme_juridique');
      }
      if(tab == "dplcoala"){
        insertlist($('.'+tab+'').val(),'dp_coala');
      }
      if(tab == "ltvargm"){
        insertlist($('.'+tab+'').val(),'tva_regime');
      }
      if(tab == "lstkarlt"){
        insertlist($('.'+tab+'').val(),'situation_traitement_karlit');
      }
      if(tab == "lstetabl"){
        insertlist($('.'+tab+'').val(),'etat_bilan');
      }
    })

     $(document).on('click','.edit' ,function(){
      var id = $(this).closest('tr').find('.idll').html();
      var valeur = $(this).closest('tr').find('.xnom').html();
      
      if(tab == "impo1"){
        updatelist(id,valeur,'regime_dimposition');
      }
      if(tab == "impo2"){
        updatelist(id,valeur,'regim_imposition2');
      }
      if(tab == "frmjd"){
        updatelist(id,valeur,'forme_juridique');
      }
      if(tab == "dplcoala"){
        updatelist(id,valeur,'dp_coala');
      }
      if(tab == "ltvargm"){
        updatelist(id,valeur,'tva_regime');
      }
      if(tab == "lstkarlt"){
        updatelist(id,valeur,'situation_traitement_karlit');
      }
      if(tab == "lstetabl"){
        updatelist(id,valeur,'etat_bilan');
      }
    })


    $(document).on('click','._remove_s' ,function(){
      var id = $(this).closest('tr').find('.idll').html();
     
      if(tab == "impo1"){
        deletelist(id,'regime_dimposition');
      }
      if(tab == "impo2"){
        deletelist(id,'regim_imposition2');
      }
      if(tab == "frmjd"){
        deletelist(id,'forme_juridique');
      }
      if(tab == "dplcoala"){
        deletelist(id,'dp_coala');
      }
      if(tab == "ltvargm"){
        deletelist(id,'tva_regime');
      }
      if(tab == "lstkarlt"){
        deletelist(id,'situation_traitement_karlit');
      }
      if(tab == "lstetabl"){
        deletelist(id,'etat_bilan');
      }
    })

    
    
    
    
    function insertlist(valeur,table,colone){
      $.ajax({
         url: "php/script_parametList.php",
         type:'POST',
         data:{
             param:'insertvaleur',
             tab:valeur,
             table:table,
         },
         success: function(data){
                  alert("Insertion OK");
                 listregimdimposition_1();
                  listregimdimposition_2();
                  listfrmjuridique();
                  listdpcoala();
                  listtvaregime();
                  listsituationkarlit();
                  listetatbilan();
        },
     });      
  }
    
    

    function updatelist(id,valeur,table){
        $.ajax({
           url: "php/script_parametList.php",
           type:'POST',
           data:{
               param:'udpatevaleur',
                id:id,
               valeur_modifier:valeur,
               table:table,
           },
           success: function(data){
            alert("Modification OK");
                   listregimdimposition_1();
                    listregimdimposition_2();
                    listfrmjuridique();
                    listdpcoala();
                    listtvaregime();
                    listsituationkarlit();
                    listetatbilan();
          },
       });      
    }

    
    function deletelist(id,table){
      $.ajax({
         url: "php/script_parametList.php",
         type:'POST',
         data:{
             param:'deletelist',
              id:id,
             table:table,
         },
         success: function(data){
          alert("Supression OK");
                 listregimdimposition_1();
                  listregimdimposition_2();
                  listfrmjuridique();
                  listdpcoala();
                  listtvaregime();
                  listsituationkarlit();
                  listetatbilan();
        },
     });      
  }
})