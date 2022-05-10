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
<title>Gestion_domaine</title>

<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link rel="stylesheet" href='bootstrap/css/addons/datatables.min.css'>
<link  rel="stylesheet" href='bootstrap/css/addons/datatables-select.min.css'>

<style type="text/css">
  .edit,.glyphicon-save{
    cursor: pointer;

  }
  .tr_list_general:hover,.edit_line:hover{
background-color: burlywood;
  }
.save_ligne:active,.edit_line:active{
  background-color:red;
}
th{
  text-align: center;
}
    .edit:active,.glyphicon-save:active{
    background-color: red;
    user-select: none;
  }
</style>
</head>
<body>
<nav class="navbar navbar-inverse navtete hautdepage" style="position:absolute;top:0; width:100%;border:none"  >
  <div class="container-fluid" style="border:none;">
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
<p/>
  <div style="margin-top:5.5%;text-align: center;width: 100%;background-color: #fff"> 

<div class="container">
  <h2 class="text-center">GESTION DOMAINE</h2>
</div>


<div id="datatable_situation" class="container" style="width: 100%;text-align: center;">
  
</div>
<div style="display: none " class = "valeur_poste"></div>
<div style="display: none " class = "valeurequipe"></div>



<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header" style="background-color: #39c0ed;">
        <h5 class="modal-title" id="exampleModalLongTitle">MODIFIER</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <table class="table" width="100%" id="tablmodif">
      <tr><td>MATRICULE</td><td><input type="text" class="form-control m_matricule"></td></tr>
      <tr><td>NOM</td><td><input type="text" class="form-control m_nom"></td></tr>
      <tr><td>POSTE</td><td class="valeur_poste"></td></tr>
      <tr><td>EQUIPE</td><td><input type="text" class="form-control m_v_e"></td></tr>
      <tr><td>MOT DE PASSE</td><td><input type="text" class="form-control m_mdp"></td></tr>
      <tr><td>MAIL</td><td><input type="mail" class="form-control mail"></td></tr>
      <tr><td>PASSWORD MAIL ET SKYPE</td><td><input type="text" class="form-control pwdmail"></td></tr>
      <tr><td></td></tr>
    </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">FERMER</button>
        <button type="button" id="savemodif" class="btn btn-primary">ENREGISTRER LA MODIFICATION</button>
      </div>
    </div>
  </div>
</div>

<!-- Small modal -->
<button type="button" id="ajoutaffiche" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">AJOUT UTILISATEUR</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header" style="background-color:#c5d5e2;color:window-inactive">
        <h5 class="modal-title" id="exampleModalLabel">NOUVEAU COLLABORATEUR</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <table class="table" width="100%">
      <tr><td>MATRICULE</td><td><input type="text" placeholder="K0XXX" class="form-control a_matricule"></td></tr>
      <tr><td>NOM</td><td><input type="text" class="form-control a_nom"></td></tr>
      <tr><td>POSTE</td><td class="s_poste"></td></tr>
      <tr><td>EQUIPE</td><td><input type="text" class="form-control sxequip"> </td></tr>
      <tr><td>MDP</td><td><input type="text" class="form-control a_mdp"></td></tr>
      <tr><td>MAIL</td><td><input type="mail" class="form-control mail_ajout"></td></tr>
      <tr><td>PASSWORD MAIL ET SKYPE</td><td><input type="text" class="form-control pwdmail_ajout"></td></tr>
      <tr><td>COMMENTAIRE MAIL ET SKYPE</td><td><textarea></textarea></td></tr>
      <tr><td></td>
      </tr>
    </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">ANNULER</button>
        <button type="button" class="btn btn-primary" id="sav_nouveau">ENREGISTRER</button>
      </div>
    </div>
  </div>
</div>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/domaine.js"></script>
<script type="text/javascript" src="bootstrap/js/addons/datatables.min.js"></script>
<script type="text/javascript" src="bootstrap/js/addons/datatables-select.min.js"></script>
<script src="https://cdn.datatables.net/fixedheader/3.1.8/js/dataTables.fixedHeader.min.js"></script>
</body>
</html>                            