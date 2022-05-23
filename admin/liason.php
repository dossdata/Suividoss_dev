


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
<title>liason</title>

<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/font-awesome.min.css">
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
<div class="card">
  <div class="card-header">
        Table
  </div>
  <div class="card-body">
    <p class="card-text">
    <?php
    include "./class/connect.php";
    $rep = "";
    $sql = "SELECT u1.id as id_fr, u1.nom as nom_fr, u2.id as id_mada, u2.nom as nom_mada FROM suividossdb.manager_fr_lier_superviseur_mada s left join utilisateur u1 on(s.manager_fr = u1.id) left join utilisateur u2 on(s.supeviseur_mada = u2.id);";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<tr class='ligne_user'><td class='idutil' style='display:none'>" . $resultat[$i]["id_fr"] . "</td><td>" . $resultat[$i]["nom_fr"] . "</td><td style='display:none'>" . $resultat[$i]["id_mada"] . "</td><td>" . $resultat[$i]["nom_mada"] ."</td><td><span class='glyphicon glyphicon-trash'></span></td></tr>";
    }
    echo "<table class='table table-bordered'><tr><th>Manager france</th><th>Superviseur mada</th></tr>".  $rep ."</table>";
    ?>
    </p>
    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#add_mss">A jout nouveau</a>
  </div>
</div>


<!-- Modal -->
<div class="modal fade" id="add_mss" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ajout</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
          manager france <input class="form-control"> &nbsp;
          sup france <input class="form-control">
       

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
        <button type="button" class="btn btn-primary">Enregistrer</button>
      </div>
    </div>
  </div>
</div>

</div>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/parametList.js"></script>
</body>
</html>                            