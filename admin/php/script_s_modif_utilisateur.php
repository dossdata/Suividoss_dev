<?php
session_start();
include "../class/connect.php";
$param = $_POST["param"];


if ($param == "recuperList") {

    $rep = "";
    $sql = "SELECT U.id, U.nom as nom, U.login as login, U.password as password,p.nom as pays_id, pt.nom as post_id FROM suividossdb.utilisateur U LEFT JOIN pays p on(p.id = U.pays_id) left join poste pt on (pt.id = post_id) WHERE pt.nom <> 'SUPERVISEUR' and pt.nom <> 'CHEF D EQUIPE'";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<tr class='ligne_user'><td class='idutil'>" . $resultat[$i]["id"] . "</td><td>" . $resultat[$i]["nom"] . "</td><td>" . $resultat[$i]["login"] . "</td><td>" . $resultat[$i]["password"] . "</td><td>" . $resultat[$i]["pays_id"] . "</td><td>" . $resultat[$i]["post_id"] . "</td><td style='cursor:pointer;' class='iconmodif'><span class='glyphicon glyphicon-edit' aria-hidden='true' data-toggle='modal' data-target='#myModal'></span></td></tr>";
    }
    echo $rep;
}

if ($param == "recuperListlike") {
    $text = $_POST['text'];
    $rep = "";
    $sql = "SELECT U.id, U.nom as nom, U.login as login, U.password as password,p.nom as pays_id, pt.nom as post_id FROM suividossdb.utilisateur U LEFT JOIN pays p on(p.id = U.pays_id) left join poste pt on (pt.id = post_id) WHERE /*(pt.nom <> 'SUPERVISEUR' and pt.nom <> 'CHEF D EQUIPE') AND */ (U.nom LIKE '" . $text . "%' or U.login LIKE '%" . $text . "%' or U.nom LIKE '" .  $text . "%' or U.login LIKE '%" . $text . "%')";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<tr class='ligne_user'><td class='idutil'>" . $resultat[$i]["id"] . "</td><td>" . $resultat[$i]["nom"] . "</td><td>" . $resultat[$i]["login"] . "</td><td>" . $resultat[$i]["password"] . "</td><td>" . $resultat[$i]["pays_id"] . "</td><td>" . $resultat[$i]["post_id"] . "</td><td style='cursor:pointer;' class='iconmodif'><span class='glyphicon glyphicon-edit' aria-hidden='true' data-toggle='modal' data-target='#myModal'></span></td></tr>";
    }
    echo $rep;
}

if ($param == "listepays") {
    $rep = "";
    $sql = "SELECT * FROM suividossdb.pays ";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<option value='" . $resultat[$i]["id"] . "' data='".$resultat[$i]["nom"]."'>" . $resultat[$i]["nom"] . "</option>";
    }
    echo "<option value='0'></option>" . $rep;
}

if ($param == "listpost") {
    $rep = "";
    $sql = "SELECT * FROM suividossdb.poste ";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<option value='" . $resultat[$i]["id"] . "' data = '". $resultat[$i]["nom"] ."'>" . $resultat[$i]["nom"] . "</option>";
    }
    echo "<option value='0'></option>" . $rep;
}


if ($param == "updatelogin") {
    $idlogin = $_POST["idlogin"];
    $txtnom = $_POST["txtnom"];
    $txtlogin = $_POST["txtlogin"];
    $txtpassword = $_POST["txtpassword"];
    $lstpays = $_POST["lstpays"];
    $lstpost = $_POST["lstpost"];
    $sql = "UPDATE suividossdb.utilisateur SET nom=:nom, login=:login, password=:password, pays_id=:pays_id, post_id=:post_id WHERE id=:idlogin";
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'idlogin' => $idlogin,
        'nom' => $txtnom,
        'login' => $txtlogin,
        'password' => $txtpassword,
        'pays_id' => $lstpays,
        'post_id' => $lstpost,
    ));
}

if ($param == "iusupre") {
    $idlogin = $_POST["idlogin"];
	$sql = "DELETE FROM suividossdb.utilisateur where id=:id";
	$res = $dbo->prepare($sql);
	$res->execute(array(
		'id' => $idlogin,
	));
}
