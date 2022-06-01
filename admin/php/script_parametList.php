<?php
	session_start();
	include "../class/connect.php";
	$param = $_POST['param'];
	if($param == "listregimdimposition1"){
		$clasinput = "impo1";
		$input = "<tr><td><input type='text' class='form-control ".$clasinput."'></td><td><span class='glyphicon glyphicon-save' id='".$clasinput."'></span> </td></tr>";

		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.regime_dimposition where nom <> ''";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();		
		for($i =0 ; $i < count($resultat); $i++){
			$fin_resultat .= "<tr><td class='idll' style='width:2%'>". $resultat[$i]['id']. "</td><td class='xnom' contenteditable='true'>". $resultat[$i]['nom'] ."</td><td class='edit' width='2%'><span class='glyphicon glyphicon-save
'></span></td><td class='_remove_s'><span class='glyphicon glyphicon-remove'></span> </td></tr><tr>";
		}
		
		echo  $fin_resultat.$input;
	}


	

	if($param == "cherche_manag"){

		$fin_resultat = "";
		if(isset($_POST["valeur"])){
		$sql = 'SELECT id,nom FROM utilisateur where (login LIKE "'.$_POST["valeur"].'%" or nom LIKE "'.$_POST["valeur"].'%" or prenom LIKE "'.$_POST["valeur"].'%") and pays_id = 5 and post_id = 5;';
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();		
		echo   json_encode($resultat);
	}
		
	}

	if($param == "cherche_manag_vrai"){

		$fin_resultat = "";
		$sql = "SELECT u1.id as id_fr, u1.nom as nom_fr FROM suividossdb.utilisateur u1 WHERE u1.post_id = 9 and u1.pays_id = 2 and u1.nom like '". $_POST["valeur"] ."%' ";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();		
		echo   json_encode($resultat);
		
	}

	if($param == "cherche_manag_2"){

		$fin_resultat = "";
		$sql = "SELECT u1.id as id_mada, u1.nom as nom_mada FROM suividossdb.utilisateur u1 WHERE u1.post_id = 5 and u1.pays_id = 5 and u1.login like '". $_POST["valeur"] ."%' ";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();		
		echo   json_encode($resultat);
		
	}

	if($param == "valide_sss"){

		$sql = "INSERT INTO manager_fr_lier_superviseur_mada (manager_fr,supeviseur_mada,manager_vrai) VALUES(:f,:m,:v)";
		$res = $dbo->prepare($sql);
		$res->execute(array('f' => $_POST["valeur2"], 'm' =>$_POST["valeur1"], 'v' =>$_POST["valeur3"]
));	
		echo  "valide ok";
		
	}

	
	if($param == "valide_insertion"){

		$sql = "DELETE FROM manager_fr_lier_superviseur_mada where manager_fr =:manager_fr ";
		$res = $dbo->prepare($sql);
		$res->execute(array('manager_fr' => trim($_POST["valeur1"])
		));	
		
		$sql = "INSERT INTO manager_fr_lier_superviseur_mada (manager_fr,supeviseur_mada) VALUES(:f,:m)";
		$res = $dbo->prepare($sql);
		$res->execute(array('f' => trim($_POST["valeur1"]), 'm' => trim($_POST["valeur2"])));
	}

	
	
	
	
		if($param == "listregimdimposition2"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.regim_imposition2 where nom <> ''";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();
		
		for($i =0 ; $i < count($resultat); $i++){
			$fin_resultat .= "<tr><td class='idll' style='width:2%'>". $resultat[$i]['id']. "</td><td class='xnom' contenteditable='true'>". $resultat[$i]['nom'] ."</td><td class='edit' width='2%'><span class='glyphicon glyphicon-save
'></span></td><td class='_remove_s'><span class='glyphicon glyphicon-remove'></span> </td></tr>";
		}

		$clasinput = "impo2";
		$input = "<tr><td><input type='text' class='form-control ".$clasinput."'></td><td><span class='glyphicon glyphicon-save' id='".$clasinput."'></span> </td></tr>";
		echo  $fin_resultat.$input;
	}

	if($param == "listfrmjuridique"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.forme_juridique where nom <> ''";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();
		
		for($i =0 ; $i < count($resultat); $i++){
			$fin_resultat .= "<tr><td class='idll' style='width:2%'>". $resultat[$i]['id']. "</td><td class='xnom' contenteditable='true'>". $resultat[$i]['nom'] ."</td><td class='edit' width='2%'><span class='glyphicon glyphicon-save
'></span></td><td class='_remove_s'><span class='glyphicon glyphicon-remove'></span> </td></tr>";
		}
					$clasinput = "frmjd";
		$input = "<tr><td><input type='text' class='form-control ".$clasinput."'></td><td><span class='glyphicon glyphicon-save' id='".$clasinput."'></span> </td></tr>";
		echo  $fin_resultat.$input;
	}

		if($param == "listdpcoala"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.dp_coala where nom <> ''";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();
		
		for($i =0 ; $i < count($resultat); $i++){
			$fin_resultat .= "<tr><td class='idll' style='width:2%'>". $resultat[$i]['id']. "</td><td class='xnom' contenteditable='true'>". $resultat[$i]['nom'] ."</td><td class='edit' width='2%'><span class='glyphicon glyphicon-save
'></span></td><td class='_remove_s'><span class='glyphicon glyphicon-remove'></span> </td></tr>";
		}
		$clasinput = "dplcoala";
		$input = "<tr><td><input type='text' class='form-control ".$clasinput."'></td><td><span class='glyphicon glyphicon-save' id='".$clasinput."'></span> </td></tr>";
		echo  $fin_resultat.$input;
	}

		if($param == "listtvaregime"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.tva_regime where nom <> ''";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();
		
		for($i =0 ; $i < count($resultat); $i++){
			$fin_resultat .= "<tr><td class='idll' style='width:2%'>". $resultat[$i]['id']. "</td><td class='xnom' contenteditable='true'>". $resultat[$i]['nom'] ."</td><td class='edit' width='2%'><span class='glyphicon glyphicon-save
'></span></td><td class='_remove_s'><span class='glyphicon glyphicon-remove'></span> </td></tr>";
		}
		$clasinput = "ltvargm";
		$input = "<tr><td><input type='text' class='form-control ".$clasinput."'></td><td><span class='glyphicon glyphicon-save' id='".$clasinput."'></span> </td></tr>";
		echo  $fin_resultat.$input;
	}

	if($param == "listsituationkarlit"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.situation_traitement_karlit where nom <> ''";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();
		
		for($i =0 ; $i < count($resultat); $i++){
			$fin_resultat .= "<tr><td class='idll' style='width:2%'>". $resultat[$i]['id']. "</td><td class='xnom' contenteditable='true'>". $resultat[$i]['nom'] ."</td><td class='edit' width='2%'><span class='glyphicon glyphicon-save
'></span></td><td class='_remove_s'><span class='glyphicon glyphicon-remove'></span> </td></tr>";
		}
				$clasinput = "lstkarlt";
				$input = "<tr><td><input type='text' class='form-control ".$clasinput."'></td><td><span class='glyphicon glyphicon-save' id='".$clasinput."'></span> </td></tr>";
		echo  $fin_resultat.$input;
	}


		if($param == "listetatbilan"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.etat_bilan  where nom <> ''";
		$res = $dbo->prepare($sql);
		$res->execute();
		$resultat = $res->fetchAll();
		
		for($i =0 ; $i < count($resultat); $i++){
			$fin_resultat .= "<tr><td class='idll' style='width:2%'>". $resultat[$i]['id']. "</td><td class='xnom' contenteditable='true'>". $resultat[$i]['nom'] ."</td><td class='edit' width='2%'><span class='glyphicon glyphicon-save
'></span></td><td class='_remove_s'><span class='glyphicon glyphicon-remove'></span> </td></tr>";
		}
		$clasinput = "lstetabl";
		$input = "<tr><td><input type='text' class='form-control ".$clasinput."'></td><td><span class='glyphicon glyphicon-save' id='".$clasinput."'></span> </td></td></tr>";
		echo  $fin_resultat.$input;
	}

	if($param == "insertvaleur"){
		$tab = $_POST['tab'];
		$table = $_POST['table'];
		$sql = "INSERT INTO $table (nom) VALUES(:nom)";
					$res = $dbo->prepare($sql);
					$res->execute(array('nom' => $tab,
		));
	}

	if($param == "udpatevaleur"){
		$id = $_POST['id'];
		$valeur_modifier = $_POST['valeur_modifier'];
		$table = $_POST["table"];
		$sql = "UPDATE $table SET nom=:nom WHERE id=:id";
					$res = $dbo->prepare($sql);
					$res->execute(
						array(
							'nom' => $valeur_modifier,
							'id' => $id,
		));
	}


	if($param == "deletelist"){
		$id = $_POST['id'];
		$table = $_POST["table"];
		$sql = "DELETE FROM $table WHERE id=:id";
					$res = $dbo->prepare($sql);
					$res->execute(
						array('id' => $id,));
	}
?>