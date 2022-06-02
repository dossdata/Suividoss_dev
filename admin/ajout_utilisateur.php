<?php session_start(); ?>
<?php
if (mb_strtolower($_SESSION['utilisateur'][0]["nom"], 'UTF-8') != "admin") {
  header("location:/SuiviKARLIT");
} ?>
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
    body {
      background-color: #fff
    }

    .panel-body .btn:not(.btn-block) {
      width: 100%;
      margin-bottom: 10px;
    }

    #corpbody {
      width: 100%;
      height: 100%;
    }

    body {
      font-family: "trebuchet ms", sans-serif;

    }

    form {
      background-color: #fff;
      padding: 10px;

    }

    legend {
      color: #71417d;
      font-weight: bold
    }

    input,
    textarea,
    select,
    option {
      background-color: #FFF3F3;
    }

    input,
    textarea,
    select {
      padding: 1px;
      border: 1px solid #F5C5C5;
      border-radius: 5px;
      width: 100%;

    }

    select {
      margin-top: 5px;
    }

    input[type=checkbox] {
      background-color: transparent;
      border: none;
      width: 5px;
    }

    input[type=button],
    input[type=reset] {
      width: 100px;
      margin-left: 1px;
      box-shadow: 1px 1px 1px #D83F3D;
      cursor: pointer;
    }
  </style>
</head>

<body>

  <nav class="navbar navbar-inverse navtete hautdepage" style="position:fixed;top:0; width:100%;border:none">
    <div class="container-fluid" style="background-color:#130a5e;border:none;">
      <div class="navbar-header">
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
          <li><a href="/SuiviKARLIT"><span class="glyphicon glyphicon-log-in"></span> Deconnexion</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <p>
  <div style="position: absolute;top:6%;left:10%;text-align: center;zoom:85%">

    <form>
      <fieldset>

        <legend>coordonnées :</legend>
        <label for="email">Nom :</label>
        <input type="text" size="20" id="txtnom">
        <label for="email">Prenom :</label>
        <input type="text" size="20" id="txtprenom">

        <label for="email">Matricule :</label>
        <input type="text" size="20" id="txtmat" maxlength="5">

        <label for="email">Login sous form mail :</label>
        <input type="email" name="email" size="20" placeholder="Mail...." id="txtlogin" />
        <label for="email">Mot de passe :</label><input type="text" size="20" id="txtpassword" />
        <label for="utilise">Pays : </label><b class="chkpays"></b>
        <label for="email">Poste :</label><b class="chcpost"></b>
        <label for="email">Sexe :</label><select name="utilise" id="sexe"><option value=""></option><option value="M">M</option><option value="F">F</option></select>        
        <label for="email">date de naissance :</label><input type="date" name="utilise" id="date_naissance">
        <label for="email">date d'entrée :</label><input type="date" size="20" id="dt_entrer" />
        <label for="email">Supervision :</label>
        <?php
    include "./class/connect.php";
    $rep = "";
    $sql = "SELECT  id, nom FROM suividossdb.utilisateur where pays_id=5 and post_id=5";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<option value='".$resultat[$i]["id"]."'>".$resultat[$i]["nom"]."</option>";
    }
    echo "<select id='sup_select'><option></option>".$rep."</select>";
    ?>        


    <label for="email">Niveau Etp :</label><script> var rep = ""; for(var x = 1;x<11;x++){rep += "<option value='"+x+"'>"+x+"</option>";} document.write("<select id='niveau_etp'><option></option>"+rep+"</select>") </script>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btnOk">ENREGISTRER</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>

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