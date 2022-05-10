<?php
session_start();
$id = "0";
if(isset($_SESSION['id_login'])){
	$id = $_SESSION['id_login'];
}
include "../class/connect.php";
$param = $_POST["param"];

if($param == "ListEquipe"){
	$fin_resultat = "";
	$sql = "SELECT  id,code FROM suividossdb.equipe ORDER BY code";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<option value ='". $resultat[$i]['code'] ."' data-value = '". $resultat[$i]['id']. "'>";

	}
	echo $fin_resultat;
}

if($param == "ListUser"){
	$fin_resultat = "";
	$sql = "SELECT  id,prenom,nom FROM suividossdb.equipe";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<option value ='". $resultat[$i]['nom']. " " .$resultat[$i]['prenom'] ."' data-value = '". $resultat[$i]['id']. "'>";

	}
	echo $fin_resultat;
}




if($param == "addequipe"){
	$txtnom=$_POST["Otxtnom"];
	$txtprenom=$_POST["Otxtprenom"];
	$txtmail=$_POST["Otxtmail"];
	$txtcode=$_POST["Otxtcode"];
	
	$sql = "INSERT INTO suividossdb.equipe(nom,prenom,mail,code) VALUES (:nom,:prenom,:mail,:code)";
	$res = $dbo->prepare($sql);
		$res->execute(array(
			'nom' =>$txtnom,
			'prenom'=>$txtprenom,
			'mail'=>$txtmail,
			'code'=>$txtcode,
	));
		echo "bien enregistrer";
}

if($param == "Adddossier"){
	$nomdossier=$_POST["nomdossier"];
	$idequipe=$_POST["idequipe"];
	if(recuerp_nom_s($nomdossier) != "vide"){
	echo "<div class='close' data-dismiss='modal' aria-label='Close' style='color:white'>X</div><br><b class='blink' style='color:#fff'>LE DOSSIER DEJA EXIST DANS LE PORTFEUIL : </b><b style='color:#fff'>". recuerp_nom_s($nomdossier) . "</b>";
}else{
	$sql = "INSERT INTO suividossdb.dossier(nom,equip_id,utilisateur_id) VALUES (:nom,:equip_id,:utilisateur_id)";
	$res = $dbo->prepare($sql);
		$res->execute(array(
			'nom' =>$nomdossier,
			'equip_id'=>$idequipe,
			'utilisateur_id'=>null,
	));


		recuperidoss($nomdossier);
	}
}

function recuperidoss($nom){
	include "../class/connect.php";
	$sql = "SELECT  id,nom FROM suividossdb.dossier where nom=:nom";
	$res = $dbo->prepare($sql);
	$res->execute(array('nom' => $nom,));
	$resultat = $res->fetchAll();
	if(isset($resultat[0]['id'])){
		if(recuerp_id_s($resultat[0]['id']) == "a_inserer"){
			add_insertsituation_portfeuil(intval($resultat[0]['id']));
		}
	}
}

function add_insertsituation_portfeuil($id){
	include "../class/connect.php";
	$sql = "INSERT INTO suividossdb.situation_par_portfeuil(iddoss) VALUES (:iddoss)";
	$res = $dbo->prepare($sql);
	$res->execute(array('iddoss' =>$id,));

		recuper_max_id_portfeuil($id);
}

function recuerp_id_s($id){
	include "../class/connect.php";
	$sql = "SELECT  id,iddoss FROM suividossdb.situation_par_portfeuil where iddoss=:iddoss";
	$res = $dbo->prepare($sql);
	$res->execute(array('iddoss' => $id,));
	$resultat = $res->fetchAll();
	if(isset($resultat[0]['id'])){
		return "exist";
	}else{
		return "a_inserer";
	}
}

function recuerp_nom_s($nom){
	include "../class/connect.php";
	$sql = "SELECT d.nom,e.code FROM dossier d left join equipe e on(d.equip_id = e.id)  WHERE d.nom =:nom";
	$res = $dbo->prepare($sql);
	$res->execute(array('nom' => $nom,));
	$resultat = $res->fetchAll();
	if(isset($resultat[0]['code'])){
		return $resultat[0]['code'];
	}else{
		return "vide";
	}
}



function recuper_max_id_portfeuil($id){
	include "../class/connect.php";
	$sql = "SELECT distinct max(id) as max_id FROM suividossdb.situation_par_portfeuil WHERE iddoss = '". $id ."'";
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	if(isset($resultat[0]['max_id'])){
		echo $resultat[0]['max_id'];

		$sql = "INSERT INTO suividossdb.situation_tva(situation_id) VALUES (:situation_id)";
		$res = $dbo->prepare($sql);
		$res->execute(array('situation_id' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.situation_bilan(situation_id) VALUES (:situation_id)";
		$res = $dbo->prepare($sql);
		$res->execute(array('situation_id' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.acompte_tva_st(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.cvae(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.tvs(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.acompte_is(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.tva_trim(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.tva_mensuel(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$resultat[0]['max_id'],));

		$sql = "INSERT INTO suividossdb.bilan_simple(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$resultat[0]['max_id'],));
	}
}