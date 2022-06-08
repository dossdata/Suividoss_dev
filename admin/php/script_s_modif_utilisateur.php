<?php
session_start();
include "../class/connect.php";
$param = $_POST["param"];


if ($param == "recuperList") {

    $rep = "";
    $sql = "SELECT U.id, U.nom_mail as nom,U.prenom_mail, U.login as login, U.password as password,p.nom as pays_id, pt.nom as post_id, 
    U.mail,U.date_d_entrer,U.date_de_naissance,U.date_d_sortie,U.niveau_etp,U.sexe,usup.nom as sup, usup.id as id_sup, U.prenom as mat,
    U.date_changement_post 
    FROM suividossdb.utilisateur U LEFT JOIN pays p on(p.id = U.pays_id) 
     left join utilisateur usup on(U.son_superviseur = usup.id) 
    left join poste pt on (pt.id = U.post_id) WHERE pt.nom <> 'SUPERVISEUR' and pt.nom <> 'CHEF D EQUIPE'";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<tr class='ligne_user'><td class='idutil'>" .
         $resultat[$i]["id"] . "</td><td class='snom'>" .
          $resultat[$i]["nom"] . "</td><td class='sprenomail'>" .
          $resultat[$i]["prenom_mail"] . "</td><td class='slogin'>" .
          $resultat[$i]["login"] . "</td><td class='ssex'>".$resultat[$i]["sexe"]."</td><td class='spassword'>" . 
           $resultat[$i]["password"] . "</td><td class='sssup'>".$resultat[$i]["sup"]."</td><td class='sniveau_etp'>" . 
           $resultat[$i]["niveau_etp"] . "</td><td class='spays_id'>" .
           $resultat[$i]["pays_id"] . "</td><td class='spost'>" . 
           $resultat[$i]["post_id"] . "</td><td class='smail'>".
           $resultat[$i]["mail"] . "</td><td class='sentrer'>".
           $resultat[$i]["date_d_entrer"] . "</td><td class='ssortie'>".
           $resultat[$i]["date_d_sortie"] . "</td><td class='snaissance'>".
           $resultat[$i]["date_de_naissance"] . "</td><td class='date_poste'>".
           $resultat[$i]["date_changement_post"] . "</td>".
           "<td class='id_sups' style='display:none'>".$resultat[$i]["id_sup"] . "</td>".
           "<td class='ssmat' style='display:none'>".$resultat[$i]["mat"] . "</td>".
           "<td style='cursor:pointer;' class='iconmodif'><span class='glyphicon glyphicon-edit' aria-hidden='true' data-toggle='modal' data-target='#myModal'></span></td></tr>";
    }
    echo $rep;
}

if ($param == "recuperListlike") {
    $text = $_POST['text'];
    $rep = "";
    $sql = "SELECT U.id, U.nom_mail as nom,U.prenom_mail, U.login as login, U.password as password,p.nom as pays_id, pt.nom as post_id, 
    U.mail,U.date_d_entrer,U.date_de_naissance,U.date_d_sortie,U.niveau_etp,U.sexe,usup.nom as sup, usup.id as id_sup ,U.prenom as mat,
    U.date_changement_post 
    FROM suividossdb.utilisateur U LEFT JOIN pays p on(p.id = U.pays_id)
    left join utilisateur usup on(U.son_superviseur = usup.id) 
     left join poste pt on (pt.id = U.post_id) WHERE /*(pt.nom <> 'SUPERVISEUR' and pt.nom <> 'CHEF D EQUIPE') AND */ (U.nom LIKE '" . $text . "%' or U.login LIKE '%" . $text . "%' or U.nom LIKE '" .  $text . "%' or U.login LIKE '%" . $text . "%')";
    $res = $dbo->prepare($sql);
    $res->execute();
    $resultat = $res->fetchAll();
    for ($i = 0; $i < count($resultat); $i++) {
        $rep .= "<tr class='ligne_user'><td class='idutil'>" .
        $resultat[$i]["id"] . "</td><td class='snom'>" .
         $resultat[$i]["nom"] . "</td><td class='sprenomail'>" .
         $resultat[$i]["prenom_mail"] . "</td><td class='slogin'>" .
         $resultat[$i]["login"] . "</td><td class='ssex'>".$resultat[$i]["sexe"]."</td><td class='spassword'>" . 
         $resultat[$i]["password"] . "</td><td class='sssup'>".$resultat[$i]["sup"]."</td><td class='sniveau_etp'>" . 
          $resultat[$i]["niveau_etp"] . "</td><td class='spays_id'>" .
          $resultat[$i]["pays_id"] . "</td><td class='spost'>" . 
          $resultat[$i]["post_id"] . "</td><td class='smail'>".
          $resultat[$i]["mail"] . "</td><td class='sentrer'>".
          $resultat[$i]["date_d_entrer"] . "</td><td class='ssortie'>".
          $resultat[$i]["date_d_sortie"] . "</td><td class='snaissance'>".
          $resultat[$i]["date_de_naissance"] . "</td><td class='date_poste'>".
          $resultat[$i]["date_changement_post"] . "</td>".
          "<td class='id_sups' style='display:none'>".$resultat[$i]["id_sup"] . "</td>".
          "<td class='ssmat' style='display:none'>".$resultat[$i]["mat"] . "</td>".
          "<td style='cursor:pointer;' class='iconmodif'><span class='glyphicon glyphicon-edit' aria-hidden='true' data-toggle='modal' data-target='#myModal'></span></td></tr>";
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
    $nom= $_POST["nom"];
    $prenom= $_POST["prenom"];
    $txtmat= $_POST["txtmat"];
    $login= $_POST["login"];
    $paasword= $_POST["paasword"];
    $pays= $_POST["pays"];
    $poste= $_POST["poste"];
    $sexe= $_POST["sexe"];
    $date_de_naissance= $_POST["date_de_naissance"];
    $date_d_entree= $_POST["date_d_entree"];
    $supervision= $_POST["supervision"];
    $niveau_etp= $_POST["niveau_etp"];
    $txmail= $_POST["txmail"];
    $idlogin= $_POST["idlogin"];
    $date_poste=$_POST["date_poste"];
    if($niveau_etp == ""){$niveau_etp = null;}
    if($date_d_entree == ""){$date_d_entree = null;}
    if($date_de_naissance == ""){$date_de_naissance = null;}
    if($supervision == ""){$supervision = null;}
    if($sexe == ""){$sexe = null;}
    if($pays == ""){$pays = null;}

    $sql = "UPDATE suividossdb.utilisateur SET 
    nom=:nom,prenom=:prenom,login=:login,password=:password,pays_id=:pays_id,post_id=:post_id,sexe=:sexe,
    date_de_naissance=:date_de_naissance,date_d_entrer=:date_d_entrer,son_superviseur=:son_superviseur,
    niveau_etp=:niveau_etp,nom_mail=:nom_mail,prenom_mail=:prenom_mail,mail=:mail,date_changement_post=:date_changement_post 
    WHERE id=:idlogin";
    
    $res = $dbo->prepare($sql);
    $res->execute(array(
        'nom'=>$txtmat."_".$prenom,
        'prenom'=>$txtmat,
        'login'=>$login,
        'password'=>$paasword,
        'pays_id'=>$pays,
        'post_id'=>$poste,
        'sexe'=>$sexe,
        'date_de_naissance'=>$date_de_naissance,
        'date_d_entrer'=>$date_d_entree,
        'son_superviseur'=>$supervision,
        'niveau_etp'=>$niveau_etp,
        'nom_mail'=>$nom,
        'prenom_mail'=>$prenom,
        'mail'=>$txmail,
        'date_changement_post' => $date_poste,
        'idlogin' => $idlogin
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
