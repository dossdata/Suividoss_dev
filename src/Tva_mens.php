<?php
namespace Jss;

use App\Connection;

class Tva_mens extends Connection{
    public function insert_tva_mens($id_situation,$dt_fait_karlit,$dt_envoie_client,$dt_validation_client,$dt_teletransmision,
    $dt_validation_edi,$adddate,$commentaire,$utilisateur_id){
            if( count($this->recuereexistid($id_situation)) < 1){
                $sql = "INSERT INTO
                 suividossdb.tva_mensuel(id_situation,dt_fait_karlit,dt_envoie_client,dt_validation_client,dt_teletransmision
                 ,dt_validation_edi,adddate,commentaire,utilisateur_id) 
                 VALUES (:id_situation,:dt_fait_karlit,:dt_envoie_client,:dt_validation_client,:dt_teletransmision
                 ,:dt_validation_edi,:adddate,:commentaire,:utilisateur_id)";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'id_situation' =>$id_situation,
                    'dt_fait_karlit' =>$dt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'dt_teletransmision' =>$dt_teletransmision,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'adddate' => $adddate,
                    'commentaire' =>$commentaire,
                    'utilisateur_id'=>$utilisateur_id
                ));
                return "insert ok";
            }else{
                $sql = "UPDATE suividossdb.tva_mensuel SET 
                dt_fait_karlit=:dt_fait_karlit,dt_envoie_client=:dt_envoie_client
                ,dt_validation_client=:dt_validation_client,dt_teletransmision=:dt_teletransmision
                 ,dt_validation_edi=:dt_validation_edi,adddate=:adddate,commentaire=:commentaire
                where id_situation =:id_situation";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'dt_fait_karlit' =>$dt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'dt_teletransmision' =>$dt_teletransmision,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'adddate' => $adddate,
                    'commentaire' =>$commentaire,
                    'id_situation' => $id_situation,
                ));
                return "update ok";
            }
    }

   public function recuereexistid($id_situation){
		$sql = "SELECT * FROM suividossdb.tva_mensuel  where id_situation =:id_situation";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('id_situation' => $id_situation,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}
}