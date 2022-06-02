<?php
include "../class/connect.php";
$param = $_POST["param"];

if($param == "ListPays"){
	$fin_resultat = "";
	$sql = "SELECT  * FROM suividossdb.pays";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<option value ='". $resultat[$i]['id']. "'>". $resultat[$i]['nom']."</option>";
	}
	echo $fin_resultat;
}

if($param == "ListPostes"){
	$fin_resultat = "";
	$sql = "SELECT  * FROM suividossdb.poste";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<option value ='". $resultat[$i]['id']. "'>". $resultat[$i]['nom']."</option>";
	}
	echo $fin_resultat;
}



if($param == "add"){
	$nom=$_POST["nom"];
	$prenom=$_POST["prenom"];
	$txtmat=$_POST["txtmat"];
	$login= trim($_POST["login"]);
	$paasword=$_POST["paasword"];
	$pays=$_POST["pays"];
	$poste=$_POST["poste"];
	$sexe=$_POST["sexe"];
	$date_de_naissance=$_POST["date_de_naissance"];
	$date_d_entree=$_POST["date_d_entree"];
	$supervision=$_POST["supervision"];
	$niveau_etp=$_POST["niveau_etp"];	
	
	try {
  		$sql = "INSERT INTO suividossdb.utilisateur 
		  (nom,prenom,login,password,pays_id,post_id,sexe,date_de_naissance,date_d_entrer,son_superviseur,niveau_etp,nom_mail,prenom_mail,mail) 
		  VALUES (:nom,:prenom,:login,:paasword,:pays,:poste,:sexe,:date_de_naissance,:date_d_entree,:supervision,:niveau_etp,:nom_mail,:prenom_mail,:mail)";
		$res = $dbo->prepare($sql);
		$res->execute(array(
			 "nom"=>$txtmat."_".$prenom,
			 "prenom"=>$txtmat,
			 "login"=>$login,
			 "paasword"=>$paasword,
			 "pays"=>$pays,
			 "poste"=>$poste,
			 "sexe"=>$sexe,
			 "date_de_naissance"=>$date_de_naissance,
			 "date_d_entree"=>$date_d_entree,
			 "supervision"=>$supervision,
			 "niveau_etp"=>$niveau_etp,
			 "nom_mail" => $nom,
			 "prenom_mail" => $prenom,
			 "mail" => $login
		));
		echo "bien";
	} catch (Exception $e) {
  		  echo 'Erreur : ', "\n utilisateur deja existant";
	} finally {	
   		// echo "First finally.\n";
	}


	
}

if($param == "addinport"){
	$Otxtnom=$_POST["nom"];
	$Otxtlogin=$_POST["login"];
	$Otxtpassword=$_POST["password"];
	$Ochcpost =$_POST["poste"];
	$Ochkpays =$_POST["pays"];

	$sql = "INSERT INTO suividossdb.utilisateur(nom,login,password,post_id,pays_id) VALUES (:nom,:login,:password,:post_id,:pays_id)";
	$res = $dbo->prepare($sql);
		$res->execute(array(
			'nom' =>trim($Otxtnom),
			'login'=>trim($Otxtlogin),
			'password'=>trim($Otxtpassword),
			'post_id'=>trim($Ochcpost),
			'pays_id'=>trim($Ochkpays),
	));
}