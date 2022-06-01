


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
  <div class="w3-panel w3-card-4 w3-yellow"><p id="recherche_id_nm"></p></div>
  <div class="card-body">
    <p class="card-text">
    <?php
    include "./class/connect.php";
    $rep = "";
    $sql = "SELECT distinct d.manger_fr as id, upper(u.nom) as nom, u2.nom as nom_sup_karlit
    FROM dossier d  left join utilisateur u on(u.id = d.manger_fr) left join manager_fr_lier_superviseur_mada m on (d.manger_fr = m.manager_fr) 
    left join utilisateur u2 on(u2.id = m.supeviseur_mada) 
    where d.manger_fr is not null group by d.manger_fr";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<tr class='ligne_user'><td class='id_sukpr'>". $resultat[$i]["id"] ."<td>" . $resultat[$i]["nom"] ."</td><td contenteditable='true' class='td_keyup'>". $resultat[$i]["nom_sup_karlit"]."</td><td class='delet_liaison'><span class='glyphicon glyphicon-floppy-save'></span></td></tr>";
    }
    echo "<table class='table table-bordered'><tr><th>id</th><th>manger france</th><th>Superviseur mada</th><th>#</th></tr>".  $rep ."</table>";
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
        
          sup france <input class="form-control" id="cherche_manag"> &nbsp;
          <br>
          <table class="table">
          <thead class="text-center">
          <th scope="row">id</th><th scope="row">sup fr</th></thead>  
          <tbody id="recherche"></tbody></table><br>*

          manag france <input class="form-control" id="cherche_manag_vrai"> &nbsp;
          <br>
          <table class="table">
          <thead class="text-center">
          <th scope="row">id</th><th scope="row">manag fr</th></thead>  
          <tbody id="recherche_vrai"></tbody></table><br>

          sup karlit <input class="form-control" id="cherche_sup_karlit">
          <br>
          <table class="table">
          <thead class="text-center">
          <th scope="row">id</th>
                <th scope="row">nom sup karlit</th>
          </thead>  
          <tbody id="recherche2">
       
            </tbody>
            </table>
       

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
        <button type="button" class="btn btn-primary" id="valide_valide">Enregistrer</button>
      </div>
    </div>
  </div>
</div>

</div>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/liaison.js"></script>
</body>
</html>                            