<?php
session_start();
include "../class/connect.php";
$param = $_POST["param"];

if ($param == "collab") {
    $supmada = "";
    $supfrance = "";
    $sql = "SELECT id,nom FROM utilisateur";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {

            $supmada .= "<tr><td  class='idcollab' style='display:none'>" . $resultat[$i]["id"] . "</td>" . "<td class='linenom'>" . $resultat[$i]["nom"] . "</td></tr>";
        }
    echo "<table class='table'>" . $supmada . "<table>";
}


if ($param == "listEquip") {
    $reponse = "";
    $sql = "SELECT code FROM equipe";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {
        $reponse .= "<tr><td class='clportfeuil'>" . $resultat[$i]["code"] . "</td><td><input type='checkbox' class='chkbox'></td></tr>";
    }
    echo "<table class='table'>" .  $reponse . "</table>";
}

if ($param == "keylistequi") {
    $reponse = "";
    $code = $_POST['code'];
    $sql = "SELECT id,code FROM equipe WHERE code LIKE '" . $code . "%'";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {
        $reponse .= "<tr><td class='id_code_id' style='display:none'>" . $resultat[$i]["id"] . "</td><td class='clportfeuil'>" . $resultat[$i]["code"] . "</td><td><input type='checkbox' class='chkbox'></td></tr>";
    }
    echo "<table class='table'>" .  $reponse . "</table>";
}

if ($param == "keycheche_nom") {
    $supmada = "";
    $nom = $_POST['nom'];
    $sql = "SELECT id,nom FROM utilisateur WHERE nom LIKE '" . $nom . "%'";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {

            $supmada .= "<tr><td  class='idcollab' style='display:none'>" . $resultat[$i]["id"] . "</td>" . "<td class='linenom'>" . $resultat[$i]["nom"] . "</td></tr>";
        }
    echo "<table class='table'>" . $supmada . "<table>";
}




if ($param == "select_nom") {
    $id = $_POST['id'];
    $resultatportfeuil = "";
    $sql = "SELECT u.id as user_id, a.* FROM suividossdb.utilisateur u left join suividossdb.acces_portfeuil a on(u.id = a.utilisateur_id) where u.id = ". $id;
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
     echo  json_encode($resultat);
}


if ($param == "envoielist") {
    $listtotal = $_POST["listtotal"];
    $listid = $_POST["listid"];
    $id_change = $_POST["id_change"];
    $id_user = $_POST["id_user"];

    if(recheche_id($id_change) > 0){
    $sql = "UPDATE suividossdb.acces_portfeuil SET tous_portfeuil_id=:tous_portfeuil_id,tous_portfeuil_nom=:tous_portfeuil_nom WHERE id=:id";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'tous_portfeuil_id' => $listid,
        'tous_portfeuil_nom' => $listtotal,
        'id' => $id_change,
    ));
    }else{
        $listtotal = $_POST["listtotal"];
        $idsup = $_POST["idsup"];        
        $sql = "INSERT INTO suividossdb.acces_portfeuil (utilisateur_id,tous_portfeuil_id,tous_portfeuil_nom) VALUES(:utilisateur_id,:tous_portfeuil_id,:tous_portfeuil_nom)";
        $res = $dbo->prepare($sql);
        $res->execute(array(
            'utilisateur_id' => $id_user,
            'tous_portfeuil_id' => $listid,
            'tous_portfeuil_nom' => $listtotal,
        ));   
    }
    
}

function recheche_id($index){
    include "../class/connect.php";
    $sql = "SELECT id FROM acces_portfeuil WHERE id =:id";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'id' => $index,
    ));
    $resultat = $res->fetchAll();
        return count($resultat);
}