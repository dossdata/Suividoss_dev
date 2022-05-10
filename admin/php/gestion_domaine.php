<?php
session_start();
include "../class/connect.php";
$param = $_POST["param"];

	if($param == "addaccessparam"){
		$id = $_POST["id"];
		$sitationp = $_POST["sitationp"];		
		$situationtva =$_POST["situationtva"];
		$situationbilan =$_POST["situationbilan"];
		$tvamens =$_POST["tvamens"];
		$tvatrim =$_POST["tvatrim"];
		$tvs =$_POST["tvs"];
		$acpt_is =$_POST["acpt_is"];
		$cvae =$_POST["cvae"];
		$bilbq =$_POST["bilbq"];

			$sql = "UPDATE suividossdb.utilisateur SET  sitationp=:sitationp, situationtva=:situationtva, situationbilan=:situationbilan, tvamens=:tvamens, tvatrim=:tvatrim, tvs=:tvs, acpt_is=:acpt_is, cvae=:cvae, bilbq=:bilbq WHERE id=:id;" ;
				$res = $dbo->prepare($sql);
				$res->execute(array(
					'sitationp' => $sitationp,
					'situationtva' => $situationtva,
					'situationbilan' => $situationbilan,
					'tvamens' => $tvamens,
					'tvatrim' => $tvatrim,
					'tvs' => $tvs,
					'acpt_is' => $acpt_is,
					'cvae' => $cvae,
					'bilbq' => $bilbq,
					'id' => $id,
			));
	
	}

if($param == "list_poste"){
	$sql = "SELECT nom FROM suividossdb.poste";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	echo json_encode($resultat);
}

if($param == "list_equipe"){
	$sql = "SELECT code FROM suividossdb.equipe";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	echo json_encode($resultat);
}

if($param == "list_domaine"){
	$sql = "SELECT * FROM gestion_domaine";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	echo json_encode($resultat);
}




if($param == "ajout_user"){


    if(recherche_matricule( $_POST['matricule']) < 1)
    {
    $sql = "INSERT INTO suividossdb.gestion_domaine 
    (matricule, nom, poste, equipe, mdp) VALUES 
    (:matricule, :nom, :poste, :equipe, :mdp);";
	$res = $dbo->prepare($sql);
	$res->execute([
        'matricule' => $_POST['matricule'],
        'nom' =>  $_POST['nom'],
        'poste' =>  $_POST['post'],
        'equipe' =>  $_POST['equip'],
        'mdp' =>  $_POST['mdp'],
    ]);
    echo "AJOUT";
    }else{
        echo "EXISTANT";
    }

}

if($param == "modif_user"){
    $sql = "UPDATE suividossdb.gestion_domaine SET
     matricule =:matricule, nom =:nom, poste =:poste, equipe =:equipe, mdp =:mdp WHERE (id =:id)";
	$res = $dbo->prepare($sql);
	$res->execute([
        'matricule' => $_POST['matricule'],
        'nom' =>  $_POST['nom'],
        'poste' =>  $_POST['post'],
        'equipe' =>  $_POST['equip'],
        'mdp' =>  $_POST['mdp'],
        'id' =>  $_POST['id'] 
    ]);
	echo "modif_ok";
}

function recherche_matricule($matricule){
    include "../class/connect.php";
    $sql = "SELECT * FROM suividossdb.gestion_domaine WHERE matricule=:matricule"; 
    $res = $dbo->prepare($sql);
    $res->execute([
        'matricule' => $matricule
    ]);
    $count = $res->fetchAll();
    return count($count);
}