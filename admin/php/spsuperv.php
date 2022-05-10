<?php
session_start();
include "../class/connect.php";
$param = $_POST["param"];

if ($param == "listSup") {
    $supmada = "";
    $supfrance = "";
    $sql = "SELECT id,nom,pays_id,post_id FROM utilisateur";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {

        if ($resultat[$i]["pays_id"] == "2" && $resultat[$i]["post_id"] == "5") {
            $supmada .= "<tr><td  class='idsup' style='display:none'>" . $resultat[$i]["id"] . "</td>" . "<td class='linesup'>" . $resultat[$i]["nom"] . "</td></tr>";
        }

        if ($resultat[$i]["pays_id"] == "5" && $resultat[$i]["post_id"] == "5") {
            $supfrance .= "<tr><td  class='idsup' style='display:none'>" . $resultat[$i]["id"] . "</td>" . "<td class='linesup'>" . $resultat[$i]["nom"] . "</td></tr>";
        }
    }
    echo "<table class='table'>" . $supmada . "<table>#<table class='table'>" . $supfrance . "</table>";
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
    $sql = "SELECT code FROM equipe WHERE code LIKE '" . $code . "%'";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {
        $reponse .= "<tr><td class='clportfeuil'>" . $resultat[$i]["code"] . "</td><td><input type='checkbox' class='chkbox'></td></tr>";
    }
    echo "<table class='table'>" .  $reponse . "</table>";
}


if ($param == "selectsonportfeuil") {
    $id = $_POST['id'];
    $resultatportfeuil = "";
    $sql = "SELECT sonportfeuilles FROM portfeuilsup WHERE utilisateur_id =:utilisateur_id";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'utilisateur_id' => $id,
    ));
    $resultat = $res->fetchAll();

    $array = explode('#',  $resultat[0]["sonportfeuilles"]);
    foreach ($array as $value) {
        if (!empty($value))
            $resultatportfeuil .= "<tr><td class='nomE'>" . $value . "</td><td><td class='suprln text-center'><span class='glyphicon glyphicon-trash'></span></td></tr>";
    }
    echo '<table class="table" id="prtexist">' . $resultatportfeuil . '</table>';
}


if ($param == "envoielist") {
    $listtotal = $_POST["listtotal"];
    $idsup = $_POST["idsup"];
    if(recheche_id($idsup) > 0){
    $sql = "UPDATE suividossdb.portfeuilsup SET sonportfeuilles=:sonportfeuilles WHERE utilisateur_id=:utilisateur_id";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'sonportfeuilles' => $listtotal,
        'utilisateur_id' => $idsup,
    ));
    }

    if(recheche_id($idsup) == "0"){
        $listtotal = $_POST["listtotal"];
        $idsup = $_POST["idsup"];        
        $sql = "INSERT INTO suividossdb.portfeuilsup (sonportfeuilles,utilisateur_id) VALUES(:sonportfeuilles,:utilisateur_id)";
        $res = $dbo->prepare($sql);
        $res->execute(array(
            'sonportfeuilles' => $listtotal,
            'utilisateur_id' => $idsup,
        ));   
    }
    
}

function recheche_id($index){
    include "../class/connect.php";
    $sql = "SELECT sonportfeuilles FROM portfeuilsup WHERE utilisateur_id =:utilisateur_id";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'utilisateur_id' => $index,
    ));
    $resultat = $res->fetchAll();
        return count($resultat);
}