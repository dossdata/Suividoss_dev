<?php
session_start();
include "../class/connect.php";;
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

if($param == "selectaccess"){
	$id = $_POST['id'];
	$sql = "SELECT  * FROM suividossdb.utilisateur where id=:id";
	$res = $dbo->prepare($sql);
	$res->execute(array('id' => $id));
	$resultat = $res->fetchAll();
	echo $resultat[0]["sitationp"].";".$resultat[0]["situationtva"].";".$resultat[0]["situationbilan"].";".$resultat[0]["tvamens"].";".$resultat[0]["tvatrim"].";".$resultat[0]["tvs"].";".$resultat[0]["acpt_is"].";".$resultat[0]["cvae"].";".$resultat[0]["bilbq"] ;
}