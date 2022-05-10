<?php
namespace Jss;

use App\Connection;

class Acompte_is extends Connection{
    public function insert_acompte_is($id_situation,$montant,$dt_acpt_fait_karlit,$dt_envoie_client,$dt_validation_client,$date_teletransmission,
    $dt_validation_edi,$montant_is,$commentaire,$utilisateur_id){
            if( count($this->recuereexistid($id_situation)) < 1){
                $sql = "INSERT INTO
                 suividossdb.acompte_is(id_situation,montant,dt_acpt_fait_karlit,dt_envoie_client,dt_validation_client,date_teletransmission
                 ,dt_validation_edi,montant_is,commentaire,utilisateur_id) 
                 VALUES (:id_situation,:montant,:dt_acpt_fait_karlit,:dt_envoie_client,:dt_validation_client,:date_teletransmission
                 ,:dt_validation_edi,:montant_is,:commentaire,:utilisateur_id)";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'id_situation' =>$id_situation,
                    'montant' => $montant,
                    'dt_acpt_fait_karlit' =>$dt_acpt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'date_teletransmission' =>$date_teletransmission,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'montant_is' => $montant_is,
                    'commentaire' =>$commentaire,
                    'utilisateur_id'=>$utilisateur_id
                ));
                return "insert ok";
            }else{
                $sql = "UPDATE suividossdb.acompte_is SET 
                 montant=:montant,dt_acpt_fait_karlit=:dt_acpt_fait_karlit,dt_envoie_client=:dt_envoie_client
                ,dt_validation_client=:dt_validation_client,date_teletransmission=:date_teletransmission
                 ,dt_validation_edi=:dt_validation_edi,montant_is=:montant_is,commentaire=:commentaire
                where id_situation =:id_situation";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'montant' => $montant,
                    'dt_acpt_fait_karlit' =>$dt_acpt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'date_teletransmission' =>$date_teletransmission,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'montant_is' => $montant_is,
                    'commentaire' =>$commentaire,
                    'id_situation' => $id_situation,
                ));
                return "update ok";
            }
    }

   public function recuereexistid($id_situation){
		$sql = "SELECT * FROM suividossdb.acompte_is  where id_situation =:id_situation";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('id_situation' => $id_situation,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}
}