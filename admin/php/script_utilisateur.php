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
	$Otxtnom=$_POST["Otxtnom"];
	$Otxtprenom=$_POST["Otxtprenom"];
	$Otxtlogin=$_POST["Otxtlogin"];
	$Otxtpassword=$_POST["Otxtpassword"];
	$Ochkmodifdoss =$_POST["Ochkmodifdoss"];
	$Ochksuprdoss=$_POST["Ochksuprdoss"];
	$Ochksmodifequip=$_POST["Ochksmodifequip"];
	$Ochksuprequip =$_POST["Ochksuprequip"];
	$Ochkmodifprofil=$_POST["Ochkmodifprofil"];
	$Ochkvisualisation=$_POST["Ochkvisualisation"];
	$Ochkpays=$_POST["Ochkpays"];
	$Ochcpost =$_POST["Ochcpost"];

	if($Ochkmodifdoss == "true"){$Ochkmodifdoss = 1;}else{$Ochkmodifdoss = 0;};
	if($Ochksuprdoss == "true"){$Ochksuprdoss = 1;}else{$Ochksuprdoss = 0;};
	if($Ochksmodifequip == "true"){$Ochksmodifequip = 1;}else{$Ochksmodifequip = 0;};
	if($Ochksuprequip == "true"){$Ochksuprequip = 1;}else{$Ochksuprequip = 0;};
	if($Ochkmodifprofil == "true"){$Ochkmodifprofil = 1;}else{$Ochkmodifprofil = 0;};
	if($Ochkvisualisation == "true"){$Ochkvisualisation = 1;}else{$Ochkvisualisation = 0;};
	
	
	try {
  		$sql = "INSERT INTO suividossdb.utilisateur(nom,prenom,login,password,modif_doss,supr_doss,modif_equip,supr_equip,modif_profil,visual_autre,pays_id,post_id) VALUES (:nom,:prenom,:login,:password,:modif_doss,:supr_doss,:modif_equip,:supr_equip,:modif_profil,:visual_autre,:pays_id,:post_id)";
		$res = $dbo->prepare($sql);
		$res->execute(array(
			'nom' =>trim($Otxtnom),
			'prenom'=>trim($Otxtprenom),
			'login'=>trim($Otxtlogin),
			'password'=>trim($Otxtpassword),
			'modif_doss'=>trim($Ochkmodifdoss),
			'supr_doss'=>trim($Ochksuprdoss),
			'modif_equip'=>trim($Ochksmodifequip),
			'supr_equip'=>trim($Ochksuprequip),
			'modif_profil'=>trim($Ochkmodifprofil),
			'visual_autre'=>trim($Ochkvisualisation),
			'pays_id'=>trim($Ochkpays),
			'post_id'=>trim($Ochcpost),
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