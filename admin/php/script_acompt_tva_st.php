<?php 
session_start();
include "../class/connect.php";;
$param = $_POST['param'];

if($param == 'saveligne_acompte'){
	$colomns = $_POST['colomns'];
	$valeur = $_POST['valeur'];
	
		
	if(empty(recuereexistid())){
		$sql = "INSERT INTO suividossdb.acompte_tva_st(id_situation) VALUES (:id_situation)";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' =>$_SESSION['idsituation'],));
		$sql = "UPDATE suividossdb.acompte_tva_st SET $colomns=:colomns,utilisateur_id=:utilisateur_id where id_situation =:id_situation";
		$res = $dbo->prepare($sql);
		$res->execute(array(
			'colomns' => $valeur,
			'utilisateur_id' => $_SESSION['id_login'],
			'id_situation' => $_SESSION['idsituation'],
));

	}else{
	$sql = "UPDATE suividossdb.acompte_tva_st SET $colomns=:colomns,utilisateur_id=:utilisateur_id where id_situation =:id_situation";
				$res = $dbo->prepare($sql);
				$res->execute(array(
					'colomns' => $valeur,
					'utilisateur_id' => $_SESSION['id_login'],
					'id_situation' => $_SESSION['idsituation'],
	));
	}
}


	if($param == "recupre_ligne_acompte_tva_st"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.acompte_tva_st  where id_situation =:id_situation";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' => $_SESSION['idsituation'],));
		$resultat = $res->fetchAll();
		$fin_resultat .= $resultat[0]['montant']. ";". $resultat[0]['dt_acpt_fait_karlit']. ";". $resultat[0]['dt_envoie_client']. ";". $resultat[0]['dt_validation_client']. ";". $resultat[0]['date_teletransmission']. ";". $resultat[0]['dt_validation_edi']. ";". $resultat[0]['commentaire'].";". $resultat[0]['montant_st'];
		echo  $fin_resultat;
	}

	if($param == "recuperetatt"){
		$fin_resultat = "";
		$sql = "SELECT * FROM suividossdb.acompte_tva_st  where id_situation =:id_situation";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' => $_SESSION['idsituation'],));
		$resultat = $res->fetchAll();
		echo  $resultat[0]['dt_validation_edi'];
	}
	function recuereexistid(){
		include "../class/connect.php";
		$sql = "SELECT * FROM suividossdb.acompte_tva_st  where id_situation =:id_situation";
		$res = $dbo->prepare($sql);
		$res->execute(array('id_situation' => $_SESSION['idsituation'],));
		$resultat = $res->fetchAll();
		return $resultat[0]['id'];		
	}