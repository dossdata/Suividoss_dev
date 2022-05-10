<?php session_start(); ?>
<?php 
    if( mb_strtolower($_SESSION['utilisateur'][0]["nom"],'UTF-8') != "admin"){
      header("location:/SuiviKARLIT");
    }?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Acompte is</title>

<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">

<style type="text/css">
  .edit,.glyphicon-save{
    cursor: pointer;
  }

    .edit:active,.glyphicon-save:active{
    background-color: #ff0000;
    user-select: none;
  }
.chcktd{
	display:none
}

.non_u:hover{
	cursor:pointer;
	color:blue;

}
a{
    text-decoration: none;
}
.non_u:active{
	color:red;
	
}
td,li,label{
user-select:none;
}
</style>
</head>
<body style="background:#dfe8f1">
<nav class="navbar navbar-inverse navtete hautdepage" style="position:fixed;top:0; width:100%;border:none"  >
  <div class="container-fluid" style="background-color:#130a5e;border:none;">
    <div class="navbar-header" >
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="admin.php"><span class="glyphicon glyphicon-user"></span> Admin</a></li>
        <li><a  href="/SuiviKARLIT"><span class="glyphicon glyphicon-log-in"></span> Deconnexion</a></li>
      </ul>
    </div>
  </div>
</nav>  
<p>

<ul style="display: inline-flex; position:absolute;top:8%;list-style:none;left:5%">
<li>
<li class="list-group-item" >Utilisateur
<div class="row">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" id="chrcnom" />
        <div class="input-group-btn">
          <button class="btn btn-primary" type="submit">
            <span class="glyphicon glyphicon-search"></span>
          </button>
        </div>
      </div>
    </div>
<div style="position:absolute;overflow:auto;height:83.5%;left:10%" id="listUser">
</div>
</li>


<li  style="position:relative;overflow:auto;height:82.3%">

  <div style="text-align: center;background-color: #fff;width:auto;list-style:none;"> 

<div id="exTab2" class="container" style="width: 100%;text-align: center;">
<h4><B>L'ACCESS SUIVIE</B></h4>
<div id="nomU"></div>

  <div class="panel panel-default" id="corpaccess"> 
    <div class="panel-heading">
      <div class="panel-title">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#1" data-toggle="tab">situation_par_portfeuil</a></li>
          <li><a href="#2" data-toggle="tab">situation_tva</a></li>
          <li><a href="#3" data-toggle="tab">situation_bilan</a></li>
           <li><a href="#4" data-toggle="tab">Tva_mensuel</a></li>
            <li><a href="#5" data-toggle="tab">Tva_trimestriel</a></li>
             <li><a href="#6" data-toggle="tab">Tvs </a></li>
             <li><a href="#7" data-toggle="tab">Acompte_is </a></li>
             <li><a href="#8" data-toggle="tab">Cvae </a></li>
             <li><a href="#9" data-toggle="tab">Bilan </a></li>
        </ul>
      </div>
    </div>
    
    <div class="panel-body" >
      <div class="tab-content  ">
        <div class="tab-pane active" id="1" >
	<ul class="list-group">
<li>
	<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" value id="exampleCheck1">
			    <label class="form-check-label lblexampleCheck1" for="exampleCheck1">Cocher tous</label>
			  </div>
            	
         
        </ul>
	</div>
	<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="situation">
  <li class="list-group-item active">SITUATION PORTFEUIL</li>
  <li class="list-group-item">SITUATION DOSSIER <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE DE CLOTURE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">REGIME D IMPOSITION <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">FORME JURIDIQUE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DP COALA <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">TVA REGIME <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ECHEANCHE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">SITUATION TRAITMEENT KARLIT <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE MISE A JOUR <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">ETAT BILAN <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE D ENVOIE BILAN KARLIT <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">OBSERVATION SUP FRANCE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE REVISION SUP FRANCE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE DERNIER APPEL <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item active">AUTRE</li>
  <li class="list-group-item">CONCTACT CLIENT  <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">CONCTACT SIE  <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">RENSEIGNEMENT JURIDIQUE  <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">PES ET RELANCE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item"> POLE JURIDIQUE <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">NOUVEAU CLOTURE  <input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">... <input class="form-check-input" type="checkbox" class="sitchk" value="option1"> </li>
	</ul>

</li>
</ul>
</div>
        <div class="tab-pane " id="2">
        		<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" id="exampleCheck3">
			    <label class="form-check-label lblexampleCheck3" for="exampleCheck3">Cocher tous</label>
			  </div>
           </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="sttva">
  <li class="list-group-item active">ST TVA</li>
  <li class="list-group-item">SITIUATION TVA&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">TOUS ELEMENT BLOQUANT TVA&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRES&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE DERNIER DEPOT KEOBIZ&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE GLOBALE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>


</div>
        <div class="tab-pane " id="3">
	<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" id="exampleCheck5">
			    <label class="form-check-label lblexampleCheck5" for="exampleCheck5">Cocher tous</label>
			  </div>
   
        </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="stbl">
  <li class="list-group-item active"> SITUATION BILAN</li>
  <li class="list-group-item">ETAT BILAN&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">PIECES MANQUANTE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRES&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE DERNIER DEPOT KEOBIZ&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE GLOBALE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>


</div>
        <div class="tab-pane " id="4">
        		<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" id="exampleCheck7">
			    <label class="form-check-label lblexampleCheck7" for="exampleCheck7">Cocher tous</label>
			  </div>
            </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="tvmens">
  <li class="list-group-item active">TVA MENS</li>
  <li class="list-group-item">DATE TVA FAIT KARLIT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ENVOIE CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE TELETRANSMISSION&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION EDI&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>


</div>
        <div class="tab-pane " id="5">
	<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" id="exampleCheck9">
			    <label class="form-check-label lblexampleCheck9" for="exampleCheck9">Cocher tous</label>
			  </div>
         </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="sttrim">
  <li class="list-group-item active">TVA TRIM</li>
  <li class="list-group-item">DATE TVA FAIT KARLIT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ENVOIE CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE TELETRANSMISSION&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION EDI&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>


</div>
        <div class="tab-pane " id="6">
        		<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input lblexampleCheck11" id="exampleCheck11">
			    <label class="form-check-label lblexampleCheck11" for="exampleCheck11">Cocher tous</label>
			  </div>
          </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="tvsst">
  <li class="list-group-item active">TVS</li>
  <li class="list-group-item">MONTANT TVS&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE TVS FAIT KARLIT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ENVOIE CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE TELETRANSMISSION&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION EDI&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>


</div>
        <div class="tab-pane " id="7">
	<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" id="exampleCheck13">
			    <label class="form-check-label lblexampleCheck13" for="exampleCheck13">Cocher tous</label>
			  </div>
        </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="stacptis">
  <li class="list-group-item active">ACOMPTE IS</li>
  <li class="list-group-item">MONTANT IS N-1&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">MONTANT ACOMPTES&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ACOMPTE FAIT KARLIT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ENVOIE CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE TELETRANSMISSION&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION EDI&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>

</div>
        <div class="tab-pane" id="8">

	<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" id="exampleCheck15">
			    <label class="form-check-label lblexampleCheck15" for="exampleCheck15">Cocher tous</label>
			  </div>
            	
        </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="acve">
  <li class="list-group-item active">ACVAE</li>
  <li class="list-group-item">MONTANT CVAE N-1&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">MONTANT ACOMPTES&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ACOMPTE CVAE FAIT KARLIT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ENVOIE CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE TELETRANSMISSION&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION EDI&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>


</div>

<div class="tab-pane" id="9">
		<div class="text-right">
        <ul style="display: inline-flex;list-style: none">
            <li> 
			  <div class="form-check">
			    <input type="checkbox" class="form-check-input" id="exampleCheck17">
			    <label class="form-check-label lblexampleCheck17" for="exampleCheck17">Cocher tous</label>
			  </div>
             </ul>
	</div>
<ul  class="list-group" style="position:relative;overflow:auto;height:460px;list-style:none" id="bqd">
  <li class="list-group-item active">BILAN</li>
  <li class="list-group-item">DATE FAIT KARLIT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION SUP FRANCE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE ENVOIE CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION CLIENT&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE TELETRANSMISSION&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">DATE VALIDATION EDI&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
  <li class="list-group-item">COMMENTAIRE&nbsp;<input class="form-check-input" type="checkbox" class="sitchk" value="option1"></li>
	</ul>
</div>

        
      </div>
    </div>
  </div>
</li>
<button class="btn btn-info" id="btn_valider">Valider</button>
</ul>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/script_acces.js"></script>

</body>
</html>                            
