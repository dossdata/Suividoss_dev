<?php
namespace Jss;

use App\Connection;

class Tvs extends Connection{
    public function insertTvs($id_situation,$montant,$date_cvae_karlit,$date_envoie_client,$date_de_validation_client,
    $date_teletransmission,$date_validation_edi,$commentaire,$utilisateur_id){
       if(empty($date_cvae_karlit)){$date_cvae_karlit = null;}
       if(empty($date_envoie_client)){$date_envoie_client = null;}
       if(empty($date_de_validation_client)){$date_de_validation_client = null;}
       if(empty($date_teletransmission)){$date_teletransmission = null;}
       if(empty($date_validation_edi)){$date_validation_edi = null;}
            if( count($this->recuereexistid($id_situation)) < 1){
                $sql = "INSERT INTO
                 suividossdb.tvs(id_situation,montant,date_cvae_karlit,date_envoie_client,date_de_validation_client,date_teletransmission
                 ,date_validation_edi,commentaire,utilisateur_id) 
                 VALUES (:id_situation,:montant,:date_cvae_karlit,:date_envoie_client,:date_de_validation_client,:date_teletransmission
                 ,:date_validation_edi,:commentaire,:utilisateur_id)";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'id_situation' =>$id_situation,
                    'montant' =>$montant,
                    'date_cvae_karlit' =>$date_cvae_karlit,
                    'date_envoie_client' =>$date_envoie_client,
                    'date_de_validation_client' =>$date_de_validation_client,
                    'date_teletransmission' =>$date_teletransmission,
                    'date_validation_edi' =>$date_validation_edi,
                    'commentaire' =>$commentaire,
                    'utilisateur_id'=>$utilisateur_id
                ));
                return "insert ok";
            }else{
                $sql = "UPDATE suividossdb.tvs SET 
                montant=:montant,date_cvae_karlit=:date_cvae_karlit,date_envoie_client=:date_envoie_client
                ,date_de_validation_client=:date_de_validation_client,date_teletransmission=:date_teletransmission
                 ,date_validation_edi=:date_validation_edi,commentaire=:commentaire
                where id_situation =:id_situation";
                $res = $this->Getconnexion()->prepare($sql);
                $res->execute(array(
                    'montant' =>$montant,
                    'date_cvae_karlit' =>$date_cvae_karlit,
                    'date_envoie_client' =>$date_envoie_client,
                    'date_de_validation_client' =>$date_de_validation_client,
                    'date_teletransmission' =>$date_teletransmission,
                    'date_validation_edi' =>$date_validation_edi,
                    'commentaire' =>$commentaire,
                    'id_situation' => $id_situation,
                ));
                return "update ok";
            }
    }

   public function recuereexistid($id_situation){
		$sql = "SELECT * FROM suividossdb.tvs  where id_situation =:id_situation";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('id_situation' => $id_situation,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}
}