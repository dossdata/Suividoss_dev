<?php
session_start();
include "../class/connect.php";
$param = $_POST["param"];

if ($param == "collab") {
    $supmada = "";
    $supfrance = "";
    $sql = "SELECT id,code FROM equipe";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();

    for ($i = 0; $i < count($resultat); $i++) {

            $supmada .= "<tr><td  class='idcollab' style='display:none'>" . $resultat[$i]["id"] . "</td>" . "<td class='linenom'>" . $resultat[$i]["code"] . "</td></tr>";
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
    $sql = "SELECT id,code FROM equipe WHERE code LIKE '" . $nom . "%'";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {

            $supmada .= "<tr><td  class='idcollab' style='display:none'>" . $resultat[$i]["id"] . "</td>" . "<td class='linenom'>" . $resultat[$i]["code"] . "</td></tr>";
        }
    echo "<table class='table'>" . $supmada . "<table>";
}




if ($param == "select_nom") {
    $id = $_POST['id'];
    $resultatportfeuil = "";
    $sql = "SELECT p.manager,e.code,e.id FROM suividossdb.par_manager p inner join equipe e on(e.id = p.lists) where p.manager = ". $id;
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

    delete_manager($id_user);
    $list = explode("#",$listid);
    foreach($list as $key) {    
        $sql = "INSERT INTO suividossdb.par_manager (manager,lists) VALUES(:manager,:lists)";
        $res = $dbo->prepare($sql);
        $res->execute(array(
            'lists' => $key,
            'manager' => $id_user
        ));   
    }
    echo "ok";
    
}

function delete_manager($index){
    include "../class/connect.php";
    $sql = "DELETE FROM par_manager WHERE manager =:manager";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'manager' => $index,
    ));
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