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
<title>Admin</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link href="css/style.css" rel="stylesheet" type="text/css" />
<style type="text/css">

body { background-color: #e6e6e6;zoom: 92%; }
.panel-body .btn:not(.btn-block) { width:100%;margin-bottom:10px; }
#corpbody{
	width:100%;
	height: 100%;
}
</style>
</head>
<body>

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
         <li><a  href="/"><span class="glyphicon glyphicon-log-in"></span> Deconnexion</a></li>        
      </ul>
    </div>
  </div>
</nav>	

    <div style="position: absolute;top:15%;left:40%">
        <div style="width: 50%;">
            <div class="panel panel-default">
                <div class="panel-heading ">
                    <h3 class="panel-title">
                        <span class="glyphicon glyphicon-bookmark"></span> Application</h3>
                </div>
                <div class="panel-body" style="background-color:#ddd;">
                    <div class="row">
                          <div >
                          <a href="access_portfeuil.php" class="btn btn-danger btn-lg" role="button"><span class="glyphicon glyphicon-user"></span> <br/>Acces portfeuil</a>
                          <a href="modif_utilisateur.php" class="btn btn-success btn-lg" role="button"><span class="glyphicon glyphicon-user"></span> <br/>Modif Utilisateurs</a>
                          <a href="ajout_utilisateur.php" class="btn btn-info btn-lg" role="button"><span class="glyphicon glyphicon-file"></span> <br/>Ajout utilisateur</a>
                          <a href="ajout_equipe.php" class="btn btn-primary btn-lg" role="button"><span class="glyphicon glyphicon-picture"></span> <br/>Ajout Equipe</a>
                          <a href="modif_equip_dossier.php" class="btn btn-info btn-lg" role="button"><span class="glyphicon glyphicon-tag"></span> <br/>Ajout nouveau Dossiers</a>
                        </div>
                    </div>
                    <a href="parametList.php" class="btn btn-default btn-lg btn-block" role="button"><span class="glyphicon glyphicon-globe"></span> Parametrage Listes deroulantes</a>
					<br>
                    <a href="parametacces.php" class="btn btn-success btn-lg" role="button"><span class="glyphicon glyphicon-tag"></span> <br/>Parametrage Acces utilisateurs</a>
                    <a href="spsuperv.php" class="btn btn-warning btn-lg" role="button"><span class="glyphicon glyphicon-tag"></span> <br/>Specification Portfeuille par SUP</a>
                    <a href="Gestion_domaine.php" class="btn btn-default btn-lg btn-block" role="button"><span class="glyphicon glyphicon-globe"></span> Gestion de domaine</a>
                    <a href="cmd.php" class="btn btn-default btn-lg btn-block" role="button"><span class="glyphicon glyphicon-globe"></span> cmd bat password</a>
                </div>
            </div>
        </div>
    </div>
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</body>
</html>                            