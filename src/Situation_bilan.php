<?php

namespace Jss;

use App\Connection;

class Situation_bilan extends Connection
{
    public function insertion_bilan($user_id,$situation_id,$etat,$piece_manquant,$commentaire,$date_dernier_keobiz,$commentaire_g){
        if( count($this->recuereexistid($situation_id)) < 1){
        $sql = "INSERT INTO suividossdb.situation_bilan (user_id,situation_id,date_dernier_keobiz,etat,piece_manquant,commentaire,commentaire_g) 
        VALUES(:user_id,:situation_id,:date_dernier_keobiz,:etat,:piece_manquant,:commentaire,:commentaire_g)";
        $rs = $this->Getconnexion()->prepare($sql);
        $rs->execute([
            'user_id' => $user_id,
            'situation_id' => $situation_id,
            'date_dernier_keobiz' => $date_dernier_keobiz,
            'etat' => $etat,
            'piece_manquant' => $piece_manquant,
            'commentaire' => $commentaire,
            'commentaire_g' => $commentaire_g
        ]);
        }else{
            $sql = "UPDATE suividossdb.situation_bilan SET 
            user_id=:user_id
            ,date_dernier_keobiz=:date_dernier_keobiz,etat=:etat
             ,piece_manquant=:piece_manquant,commentaire=:commentaire,commentaire_g=:commentaire_g
            where situation_id =:situation_id";
            $res = $this->Getconnexion()->prepare($sql);
            $res->execute(array(
                'user_id' => $user_id,
                'situation_id' => $situation_id,
                'date_dernier_keobiz' => $date_dernier_keobiz,
                'etat' => $etat,
                'piece_manquant' => $piece_manquant,
                'commentaire' => $commentaire,
                'commentaire_g' => $commentaire_g
            ));
        }
    }

    public function recuereexistid($situation_id){
		$sql = "SELECT * FROM suividossdb.situation_bilan tva where situation_id =:situation_id";
		$res = $this->Getconnexion()->prepare($sql);
		$res->execute(array('situation_id' => $situation_id,));
		$resultat = $res->fetchAll();
		return $resultat;		
	}

    

}
