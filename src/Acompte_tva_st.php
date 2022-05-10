<?php
namespace Jss;

use App\Connection;

class Acompte_tva_st extends Connection{
    public function insertacompte_tva_st($id_situation,$montant,$dt_acpt_fait_karlit,$dt_envoie_client,$dt_validation_client,
    $date_teletransmission,$dt_validation_edi,$commentaire,$montant_st,$utilisateur_id){
       if(empty($dt_acpt_fait_karlit)){$dt_acpt_fait_karlit = null;}
       if(empty($dt_envoie_client)){$dt_envoie_client = null;}
       if(empty($dt_validation_client)){$dt_validation_client = null;}
       if(empty($date_teletransmission)){$date_teletransmission = null;}
       if(empty($dt_validation_edi)){$dt_validation_edi = null;}
            if( count($this->recuereexistid($id_situation)) < 1){
                $sql = "INSERT INTO
                 suividossdb.acompte_tva_st(id_situation,montant,dt_acpt_fait_karlit,dt_envoie_client,dt_validation_client,date_teletransmission
                 ,dt_validation_edi,montant_st,commentaire,utilisateur_id) 
                 VALUES (:id_situation,:montant,:dt_acpt_fait_karlit,:dt_envoie_client,:dt_validation_client,:date_teletransmission
                 ,:dt_validation_edi,:montant_st,:commentaire,:utilisateur_id)";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'id_situation' =>$id_situation,
                    'montant' =>$montant,
                    'dt_acpt_fait_karlit' =>$dt_acpt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'date_teletransmission' =>$date_teletransmission,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'montant_st' => $montant_st,
                    'commentaire' =>$commentaire,
                    'utilisateur_id'=>$utilisateur_id
                ));
                return "insert ok";
            }else{
                $sql = "UPDATE suividossdb.acompte_tva_st SET 
                montant=:montant,dt_acpt_fait_karlit=:dt_acpt_fait_karlit,dt_envoie_client=:dt_envoie_client
                ,dt_validation_client=:dt_validation_client,date_teletransmission=:date_teletransmission
                 ,dt_validation_edi=:dt_validation_edi,montant_st=:montant_st,commentaire=:commentaire
                where id_situation =:id_situation";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'montant' =>$montant,
                    'dt_acpt_fait_karlit' =>$dt_acpt_fait_karlit,
                    'dt_envoie_client' =>$dt_envoie_client,
                    'dt_validation_client' =>$dt_validation_client,
                    'date_teletransmission' =>$date_teletransmission,
                    'dt_validation_edi' =>$dt_validation_edi,
                    'montant_st' => $montant_st,
                    'commentaire' =>$commentaire,
                    'id_situation' => $id_situation,
                ));
                return "update ok";
            }
    }

   public function recuereexistid($id_situation){
		$sql = "SELECT * FROM suividossdb.acompte_tva_st  where id_situation =:id_situation";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('id_situation' => $id_situation,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}
}