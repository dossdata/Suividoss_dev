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
._remove_s,.edit{
  width:3%
}
  .edit:hover,.glyphicon-save:hover,._remove_s:hover{
    background-color: gray;
    user-select: none;
  }
    .edit:active,.glyphicon-save:active,._remove_s:active{
    background-color: red;
    user-select: none;
  }
  .idll{
    display:none;
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
<p/>
  <div style="position: absolute;top:10%;text-align: center;width: 100%;background-color: #fff"> 

<div class="container">
  <h2 class="text-center">Tous les listes</h2></div>

<div id="exTab2" class="container" style="width: 100%;text-align: center;">
  <div class="panel panel-default "> 
    <div class="panel-heading">
      <div class="panel-title">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#1" data-toggle="tab">REGIME D IMPOSITION _ 1</a></li>
          <li><a href="#2" data-toggle="tab">REGIME D IMPOSITION _ 2</a></li>
          <li><a href="#3" data-toggle="tab">FORME JURIDIQUE</a></li>
           <li><a href="#4" data-toggle="tab">DP COALA</a></li>
            <li><a href="#5" data-toggle="tab">TVA REGIME</a></li>
             <li><a href="#6" data-toggle="tab">SITUATION TRAITMEENT KARLIT </a></li>
             <li><a href="#7" data-toggle="tab">ETAT BILAN </a></li>
        </ul>
      </div>
    </div>
    
    <div class="panel-body" >
      <div class="tab-content  ">
        
        <div class="tab-pane active regim1" id="1" >

        </div>
        <div class="tab-pane regim2" id="2">REGIME D IMPOSITION _ 2</div>
        <div class="tab-pane frmjur" id="3" >FORME JURIDIQUE</div>
        <div class="tab-pane dpcoala" id="4" >DP COALA</div>
        <div class="tab-pane tvaregim" id="5" >TVA REGIME</div>
        <div class="tab-pane stkarlit " id="6" >SITUATION TRAITMEENT KARLIT</div>
        <div class="tab-pane etatbilan" id="7" >ETAT BILAN</div>
        
      </div>
    </div>
  </div>
</div>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/parametList.js"></script>
</body>
</html>                            