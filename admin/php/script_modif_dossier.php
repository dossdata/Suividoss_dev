<?php
session_start();
$id = "0";
if(isset($_SESSION['id_login'])){
	$id = $_SESSION['id_login'];
}

include "../class/connect.php";;
$param = $_POST["param"];


if($param == "list_dossier_select"){
	$id_equipe = $_POST['id_equipe'];
	$fin_resultat = "";
	$sql = "SELECT DISTINCT d.nom as nom,d.id as id FROM situation_par_portfeuil spp left join dossier d on(d.id = spp.iddoss) where d.equip_id =:equip_id order by d.nom,spp.id";
	$res = $dbo->prepare($sql);
	$res->execute(array('equip_id' => $id_equipe));
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<option value='". $resultat[$i]['id'] ."' class='context-menu-one'>". $resultat[$i]['nom'] . '</option>';
	}
	echo '<select size="20" id="lstdoss" multiple>'. $fin_resultat . '</select>';
     
}

if($param == "listrecherchedoss"){
	$dossierrecherche = $_POST['dossierrecherche'];
	$fin_resultat = "";
	$sql = "SELECT  * FROM suividossdb.dossier where nom LIKE '%". $dossierrecherche ."' OR nom LIKE '". $dossierrecherche ."%' " ;
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<option value='". $resultat[$i]['id'] ."' class='context-menu-one'>". $resultat[$i]['nom'] . '</option>';
	}
	echo '<select size="20" id="lstdoss" multiple>'. $fin_resultat . '</select>';
     
}


if($param == "list_utilisateur_and_dossier"){
	$iddossier = $_POST['iddossier'][0];
	$equipe___id = $_POST['equipe___id'];

	$fin_resultat = "";
	$sql = 'SELECT distinct AF.id_utilisateur as id, U.nom  FROM suividossdb.dossier D Inner join  suividossdb.affectation_dossier AF on(D.id = AF.iddossier) inner join suividossdb.utilisateur U on(U.id = AF.id_utilisateur) where D.equip_id=:equip_id group by U.nom  order by U.nom,AF.id' ;
	$res = $dbo->prepare($sql);
	$res->execute(array('equip_id' => $equipe___id));
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<tr><td class='nomU'>". $resultat[$i]['nom'] ."</td><td class='sprU' data-toggle='modal' data-target='#exampleModal' data-whatever='@mdo' ><b class='idselctUser' style='display:none'>". $resultat[$i]['id']. "</b><span class='glyphicon glyphicon-trash'></span></td><tr>";
	}
	echo '<table>'. $fin_resultat . '</table>';
     
}

if($param =="listUser"){
	$id_equipe = $_POST['id_equipe'];
	$fin_resultat = "";
	$sql = "SELECT  * FROM suividossdb.utilisateur order by nom" ;
	$res = $dbo->prepare($sql);
	$res->execute(array('equip_id' => $id_equipe));
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<tr class='idlineUser'><td class='non_u'> <span class='glyphicon glyphicon-user'></span>&nbsp;". $resultat[$i]['nom'] . " ". $resultat[$i]['prenom'] . '</td><td class="chcktd"><input type="checkbox" class="chck"></td><td class="idU" style="display:none">'.$resultat[$i]['id'].'</td></tr>';
	}
	echo '<table id="tbUser">'. $fin_resultat . '</table>';
}

if($param =="listUserSINGLE"){
	$nomequip = $_POST['nomequip'];
	$fin_resultat = "";
	$sql = "SELECT  * FROM suividossdb.utilisateur where nom like '%" . $nomequip . "%' order by nom" ;
	$res = $dbo->prepare($sql);
	$res->execute();
	$resultat = $res->fetchAll();
	
	for($i =0 ; $i < count($resultat); $i++){
		$fin_resultat .= "<tr class='idlineUser'><td class='non_u'> <span class='glyphicon glyphicon-user'></span>&nbsp;". $resultat[$i]['nom'] . " ". $resultat[$i]['prenom'] . '</td><td class="chcktd"><input type="checkbox" class="chck"></td><td class="idU" style="display:none">'.$resultat[$i]['id'].'</td></tr>';
	}
	echo '<table id="tbUser">'. $fin_resultat . '</table>';
}






if($param == "ajoutafectation"){
	$iddossier = $_POST['iddossier'];
	$array1 = explode(';', $iddossier);
	$i = 0;
	foreach ($array1 as $dossier_id)
	{
		$touidUtilisateur = $_POST['touidUtilisateur'];

	if($i < 1){
		$array = explode(';', $touidUtilisateur);
		foreach ($array as $user_id)
		{
			if(intval($user_id) > 0)
			{
				if(recheche_id_affecatation($dossier_id,$user_id) < 1)
				{
					$sql = "INSERT INTO suividossdb.affectation_dossier(iddossier,id_utilisateur) VALUES (:iddossier,:id_utilisateur)";
					$res = $dbo->prepare($sql);
						$res->execute(array(
							'iddossier' =>intval($dossier_id),
							'id_utilisateur'=>intval($user_id),
					));
										
				}
				
			}
		}

	}else{
		echo  $dossier_id;
		break;
	}
		$i++;
	}	
	
}



if($param == "ListdossierAjout"){
	$equipe_id = $_POST['equipe_id'];
	$list = $_POST['list'];
	$array = explode('<br>', $list);
	foreach ($array as $lists)
	{
		$sql = "INSERT INTO suividossdb.dossier(nom,equip_id,utilisateur_id) VALUES (:nom,:equip_id,:utilisateur_id)";
		$res = $dbo->prepare($sql);
			$res->execute(array(
				'nom' =>$lists,
				'equip_id'=>$equipe_id,
				'utilisateur_id'=>null,
		));
		recuperidoss($lists);
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



	if($param == "supreaffecatation"){
		$id_affectation = $_POST['id_affectation'];
		$idlist_doss = $_POST['idlist_doss'];
		$equipe_id = $_POST["equipe_id"];
		//$array = explode(';', $idlist_doss);
		$array = explode(';', list_dossier($equipe_id));
		$condition = "";
		foreach ($array as $doss_id)
		{
				$condition .= " OR iddossier = '". $doss_id ."'";
		}

		$sql = "DELETE FROM suividossdb.affectation_dossier where " . "(". substr("(". $condition .") AND id_utilisateur = '" . $id_affectation . "'",4);
			$res = $dbo->prepare($sql);
				$res->execute(array(
					'id' =>intval($id_affectation),
					'iddossier' =>intval($doss_id),
			));
			
		echo "OK";

	}



	function list_dossier($idequip){
		include "../class/connect.php";
		$sqls = "SELECT d.id FROM  suividossdb.dossier d left join equipe e on(e.id = d.equip_id) WHERE e.id = '". $idequip ."'";
		$sqd =  $dbo->prepare($sqls);
		$sqd->execute();
		$result = $sqd->fetchAll();
		$valeur = "";
		for($i = 0; $i < count($result); $i++){
			$valeur .= ";". $result[$i]["id"] ;
		}
		return $valeur;
	}

	function recheche_id_affecatation($iddossier,$id_utilisateur){
		include "../class/connect.php";
		$sqld = "SELECT * FROM suividossdb.affectation_dossier where iddossier =".$iddossier." and id_utilisateur=".$id_utilisateur;
		$ro = "0";
		$sqd =  $dbo->prepare($sqld);
		$result = count($sqd->fetchAll());
		if($result > 0){ 
			$ro = $result; 
		}
			return $ro;
	}

	if($param == "transfert_dossier"){
		$idlist_doss = $_POST["idlist_doss"];
		$id_equi_transfert = $_POST["id_equi_transfert"];
		$array = explode(';', $idlist_doss);
		foreach ($array as $doss_id)
		{
			$sql = "UPDATE suividossdb.dossier SET equip_id=:equip_id where id =:id" ;
				$res = $dbo->prepare($sql);
				$res->execute(array(
					'id' => $doss_id,
					'equip_id' => $id_equi_transfert,
			));

			$sql = "DELETE FROM suividossdb.affectation_dossier where iddossier=:iddossier";
			$res = $dbo->prepare($sql);
				$res->execute(array(
				'iddossier' =>intval($doss_id),
			));


		}
	
	}
