<?php session_start(); ?>
<?php 
    if( mb_strtolower($_SESSION['utilisateur'][0]["nom"],'UTF-8') != "admin"){
      header("location:/SuiviKARLIT");
    }?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ajout utilisateur</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link href="css/gm-date-selector.css" rel="stylesheet" />


<style type="text/css">

body { background-color: #fff }
.panel-body .btn:not(.btn-block) { width:100%;margin-bottom:10px; }
#corpbody{
  width:100%;
  height: 100%;
}

body {
 font-family:"trebuchet ms",sans-serif;

 }
form {
 background-color:#fff;
 padding:10px;

 }
fieldset {
 padding:0 20px 20px 20px;
 margin-bottom:10px;
 border:1px solid #71417d;
 }
legend {
 color:#71417d;
 font-weight:bold
 }
label {
 margin-top:10px;
 display:block;
 }
label.inline {
 display:inline;
 margin-right:50px;
 }
input, textarea, select, option {
 background-color:#FFF3F3;
 }
input, textarea, select {
 padding:3px;
 border:1px solid #F5C5C5;
 border-radius:5px;
 width:100%;
 box-shadow:1px 1px 2px #C0C0C0 inset;
 }
select {
 margin-top:10px;
 }
input[type=checkbox] {
 background-color:transparent;
 border:none;
 width:10px;
 }
input[type=button], input[type=reset] {
 width:100px;
 margin-left:5px;
 box-shadow:1px 1px 1px #D83F3D;
 cursor:pointer;
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
        <li><a href="admin.php"><span class="glyphicon glyphicon-user"></span> Admin</a></li>
        <li><a  href="/SuiviKARLIT"><span class="glyphicon glyphicon-log-in"></span> Deconnexion</a></li>
      </ul>
    </div>
  </div>
</nav>  
<p>
  <div style="position: absolute;top:6%;left:10%;text-align: center;"  > 

    <form >
<fieldset>

 <legend>coordonnées :</legend>
<label for="email">Nom :</label>
   <input type="text"  size="20" id="txtnom" >
   <label for="email">Prenom :</label>
   <input type="text"  size="20" id="txtprenom" >

  <label for="email">Login sous form mail :</label>
   <input type="email" name="email" size="20" 
   maxlength="40" placeholder="Mail...." id="txtlogin"  />
  <label for="email">Mot de passe :</label>
   <input type="password"  size="20"  maxlength="40" id="txtpassword" />
  <label for="utilise">Pays : </label>
  <b class="chkpays">

  </b>
  <label for="email">Poste :</label>
  
  <b class="chcpost">
    
  </b>
</fieldset>
 <label for="oui" class="label-primary" class="inline" style="color:#fff;font-size:12px">Autorisations</label><br/>
<table>
  <td>
    <fieldset>
 <legend> A propos des Acces sur Dossier : </legend>
   <p>Conditions : </p>
     <input type="checkbox" name="CSS" id="chkmodifdoss"/>
     <label for="oui" class="inline">Modif dossier</label>
     <input type="checkbox" name="CSS" id="chksuprdoss" />
     <label for="oui" class="inline">Supre dossier</label>
</fieldset>

  </td>
  <td>
    <fieldset>
 <legend> A propos des Acces sur Equipe : </legend>
   <p>Conditions : </p>
     <input type="checkbox" name="CSS" id="chksmodifequip" />
     <label for="oui" class="inline">Modif Equipe</label>
     <input type="checkbox" name="CSS" id="chksuprequip"/>
     <label for="oui" class="inline">Supr Equipe</label>
</fieldset>

  </td>

  <td>
    <fieldset>
 <legend> A propos des Acces sur Utilisateur : </legend>
   <p>Conditions : </p>
     <input type="checkbox" name="CSS" id="chkmodifprofil"/>
     <label for="oui" class="inline">Modif Profil</label>
     <input type="checkbox" name="CSS" id="chkvisualisation" />
     <label for="oui" class="inline">Visualisation autre utilisateur</label>
 </fieldset>

  </td>

</table>




 <p><br/>
 <input type="button" class="btn-primary" value="VALIDER" id="btnOk" />
 <input type="reset" class="btn-warning" value="Annuler" />
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Import utilisateurs
</button>
 </p>

</form>
  </div>
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"><input class="form-control" type="file" id="input" accept=".xls,.xlsx"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div style="overflow: auto;height:350px; ">
              <pre id="jsondata">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="valideimport">Valider</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>
<script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/script_utilisateur.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.2/xlsx.full.min.js"></script>
  <script src="js/Excel_utilisateur.js"></script>
</body>
</html>                            
