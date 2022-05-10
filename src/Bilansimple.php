<?php
namespace Jss;

use App\Connection;

class Bilansimple extends Connection{
    public function insert_bilan($id_situation,$dt_validation_fr,$dt_fait_karlit,$dt_envoie_client,$dt_validation_client,
    $dt_teletransmision,$dt_validation_edi,$commentaire,$utilisateur_id){
            if( count($this->recuereexistid($id_situation)) < 1){
                $sql = "INSERT INTO
                 suividossdb.bilan_simple(id_situation,dt_validation_fr,dt_fait_karlit,dt_envoie_client,dt_validation_client,dt_teletransmision
                 ,dt_validation_edi,commentaire,utilisateur_id) 
                 VALUES (:id_situation,:dt_validation_fr,:dt_fait_karlit,:dt_envoie_client,:dt_validation_client,:dt_teletransmision
                 ,:dt_validation_edi,:commentaire,:utilisateur_id)";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'id_situation' =>$id_situation,
                    'dt_validation_fr' =>$dt_validation_fr,
                    'dt_fait_karlit' =>$dt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'dt_teletransmision' =>$dt_teletransmision,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'commentaire' =>$commentaire,
                    'utilisateur_id'=>$utilisateur_id
                ));
                return "insert ok";
            }else{
                $sql = "UPDATE suividossdb.bilan_simple SET 
                dt_validation_fr=:dt_validation_fr,dt_fait_karlit=:dt_fait_karlit,dt_envoie_client=:dt_envoie_client
                ,dt_validation_client=:dt_validation_client,dt_teletransmision=:dt_teletransmision
                 ,dt_validation_edi=:dt_validation_edi,commentaire=:commentaire
                where id_situation =:id_situation";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'dt_validation_fr' =>$dt_validation_fr,
                    'dt_fait_karlit' =>$dt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'dt_teletransmision' =>$dt_teletransmision,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'commentaire' =>$commentaire,
                    'id_situation' => $id_situation,
                ));
                return "update ok";
            }
    }

   public function recuereexistid($id_situation){
		$sql = "SELECT * FROM suividossdb.bilan_simple  where id_situation =:id_situation";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('id_situation' => $id_situation,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}
}